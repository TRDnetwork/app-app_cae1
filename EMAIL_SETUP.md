# 📨 Email Setup for Portfolio Pro

This app uses [Resend](https://resend.com) to send transactional emails via a Vercel serverless function at `api/contact.ts`.

## ✅ Step 1: Get Your Resend API Key
1. Go to [resend.com](https://resend.com) and sign up or log in.
2. Create an API key (e.g., `re_12345...`).
3. **Do not commit this key** — store it securely in Vercel environment variables.

## ✅ Step 2: Configure Vercel Environment Variables
In your Vercel project dashboard, add these environment variables:

```env
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=contact@yourdomain.com
```

> 🔐 Never use `VITE_RESEND_API_KEY` — that would expose the key to the browser. All email sending happens server-side.

## ✅ Step 3: Verify Your Sending Domain
1. In the Resend dashboard, verify your sending domain (e.g., `portfolio-pro.com`).
2. Once verified, emails will send from addresses like `hello@portfolio-pro.com`.
3. Until verified, Resend uses `onboarding@resend.dev` as the sender (may land in spam).

## ✅ Step 4: Frontend Integration
The frontend submits the contact form like this:

```ts
await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message, 'bot-field': botFieldValue }),
});
```

- No client-side email library is needed.
- The honeypot field (`bot-field`) helps block spam bots.
- Rate limiting is handled via Upstash Redis (optional — configure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel env if enabled).

## ✅ Step 5: Test & Monitor
1. Submit a test message through the contact form.
2. Check Vercel logs (`vercel logs`) for any errors.
3. Confirm both the notification (to you) and confirmation (to user) emails arrive.

## 🛡️ Security & Deliverability Notes
- Input is sanitized server-side using `isomorphic-dompurify` (not shown — integrate as needed).
- Errors return generic messages to avoid leaking system details.
- All sensitive operations occur server-side — no Resend SDK on the client.

Need help? Visit [Resend Docs](https://resend.com/docs) or check Vercel logs for detailed error messages.