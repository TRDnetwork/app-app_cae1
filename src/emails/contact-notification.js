export default function contactNotification({ name, email, message }) {
  return `
    <div style="font-family: 'Satoshi', sans-serif; background-color: #faf8f5; padding: 32px; border-radius: 12px; max-width: 65ch; margin: 0 auto; color: #1a2e1a;">
      <h1 style="font-family: 'Fraunces', serif; color: #1a2e1a; font-size: 1.5rem; margin-bottom: 24px;">New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #e66000;">${email}</a></p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 3px solid #e66000; padding-left: 16px; margin-left: 0; color: #4a4a4a;">${message}</blockquote>
      <hr style="border: 1px solid #e9e5dd; margin: 32px 0;" />
      <footer style="color: #4a4a4a; font-size: 0.9rem;">
        <p>Received on Portfolio Pro — your minimalist personal portfolio site.</p>
      </footer>
    </div>
  `;
}