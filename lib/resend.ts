import { type EmailSendResponse, type SendEmailOptions } from 'resend/build/types';
import { z } from 'zod';

// Environment variable validation
const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
});

const env = envSchema.parse(process.env);
const API_KEY = env.RESEND_API_KEY; /* RESEND_API_KEY */

/**
 * Typed wrapper around Resend email service
 * Handles sending emails with built-in retry logic and error normalization
 */
export class ResendService {
  private readonly baseUrl = 'https://api.resend.com/emails';
  private readonly defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  };

  /**
   * Send an email with retry logic and error handling
   */
  async sendEmail(options: SendEmailOptions): Promise<EmailSendResponse> {
    const payload = this.buildPayload(options);
    const response = await this.fetchWithRetry(() =>
      fetch(this.baseUrl, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify(payload),
      })
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw this.handleError(response.status, errorData, options.to);
    }

    return response.json();
  }

  private buildPayload(options: SendEmailOptions) {
    return {
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      reply_to: options.reply_to,
    };
  }

  /**
   * Fetch with exponential backoff retry logic
   */
  private async fetchWithRetry(
    requestFn: () => Promise<Response>,
    maxRetries = 3
  ): Promise<Response> {
    let lastError: unknown;

    for (let i = 0; i <= maxRetries; i++) {
      try {
        const response = await requestFn();
        if (response.ok || ![429, 500, 502, 503, 504].includes(response.status)) {
          return response;
        }
        lastError = new Error(`HTTP ${response.status}`);
      } catch (error) {
        lastError = error;
      }

      if (i === maxRetries) break;

      // Exponential backoff with jitter
      const delay = (2 ** i) * 1000 + Math.random() * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    throw lastError;
  }

  /**
   * Normalize Resend API errors into user-friendly messages
   */
  private handleError(status: number, errorData: any, to: string | string[]) {
    const recipients = Array.isArray(to) ? to.join(', ') : to;

    switch (status) {
      case 400:
        return new Error('Invalid email data. Please check the format and try again.');
      case 401:
        return new Error('Email service unauthorized. Please contact site administrator.');
      case 402:
        return new Error('Email credits exhausted. Please contact site administrator.');
      case 429:
        return new Error('Too many requests. Please wait before sending another message.');
      case 500:
        return new Error('Temporary server error. Failed to send email to ' + recipients);
      default:
        return new Error(`Failed to send email (${status}): ${errorData.message || 'Unknown error'}`);
    }
  }
}

// Singleton instance
export const resendService = new ResendService();