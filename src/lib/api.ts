import { z } from 'zod';

// Response types
const ContactFormResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});

export type ContactFormResponse = z.infer<typeof ContactFormResponseSchema>;

// Form state types
export type FormState = 
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string };

/**
 * Submit contact form data to the server
 * Returns a promise that resolves to a form state
 */
export async function submitContactForm(
  formData: {
    name: string;
    email: string;
    message: string;
    'bot-field'?: string;
  }
): Promise<FormState> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // Parse and validate response
    const result = ContactFormResponseSchema.safeParse(data);
    if (!result.success) {
      console.error('Invalid API response:', result.error);
      return { 
        status: 'error', 
        message: 'Something went wrong. Please try again.' 
      };
    }

    if (result.data.success) {
      return { status: 'success' };
    } else {
      return { 
        status: 'error', 
        message: data.error || 'Failed to send message. Please try again.' 
      };
    }
  } catch (error: any) {
    // Handle different types of errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return { 
        status: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      };
    }
    
    if (error.message?.includes('429')) {
      return { 
        status: 'error', 
        message: 'Too many requests. Please wait before trying again.' 
      };
    }

    return { 
      status: 'error', 
      message: 'Something went wrong. Please try again.' 
    };
  }
}