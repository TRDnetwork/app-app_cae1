import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import contactNotification from '../../src/emails/contact-notification';
import contactConfirmation from '../../src/emails/contact-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, 'bot-field': botField } = req.body;

  // Honeypot check
  if (botField) {
    return res.status(200).json({ success: true }); // Silent success to fool bots
  }

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Simple rate limiting using Upstash Redis (if configured)
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const identifier = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    const key = `rate_limit:${identifier}`;

    try {
      const response = await fetch(`${redisUrl}/get/${key}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const count = data.result ? parseInt(data.result) : 0;

      if (count >= 5) {
        return res.status(429).json({ error: 'Too many requests' });
      }

      await fetch(`${redisUrl}/incr/${key}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (count === 0) {
        // Set TTL to 3600 seconds (1 hour) on first increment
        await fetch(`${redisUrl}/expire/${key}/3600`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error('Rate limiting failed:', err);
      // Fail open — continue with email send
    }
  }

  try {
    // Send notification to site owner
    await resend.sendEmail({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'contact@portfolio-pro.com',
      subject: `New message from ${name}`,
      html: contactNotification({ name, email, message }),
    });

    // Send confirmation to user
    await resend.sendEmail({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thank you for your message',
      html: contactConfirmation({ name }),
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}