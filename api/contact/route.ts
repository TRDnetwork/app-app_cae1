import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resendService } from '@/lib/resend';
import { RateLimiter } from '@/lib/rate-limit';
import contactNotification from '@/emails/contact-notification';
import contactConfirmation from '@/emails/contact-confirmation';
import DOMPurify from 'isomorphic-dompurify';

// Input validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  'bot-field': z.string().optional(), // Honeypot field
});

// Reuse same rate limiter instance
const rateLimiter = new RateLimiter({
  limit: 5,
  windowMs: 3600000, // 1 hour
});

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }

  // Honeypot check
  if (body['bot-field']) {
    // Return success to fool bots but don't process
    return NextResponse.json({ success: true });
  }

  // Validate input
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid request data', details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, message } = result.data;

  // Sanitize input
  const cleanName = DOMPurify.sanitize(name);
  const cleanEmail = DOMPurify.sanitize(email);
  const cleanMessage = DOMPurify.sanitize(message);

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
             request.headers.get('x-real-ip') ||
             'unknown';
  
  const allowed = await rateLimiter.isAllowed(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    // Send notification to site owner
    await resendService.sendEmail({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'contact@portfolio-pro.com',
      subject: `New message from ${cleanName}`,
      html: contactNotification({ name: cleanName, email: cleanEmail, message: cleanMessage }),
    });

    // Send confirmation to user
    await resendService.sendEmail({
      from: 'onboarding@resend.dev',
      to: cleanEmail,
      subject: 'Thank you for your message',
      html: contactConfirmation({ name: cleanName }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Contact form submission failed:', error);
    
    // Return generic error message to avoid leaking system details
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Optional: Health check
export function GET() {
  return NextResponse.json({ status: 'ok' });
}