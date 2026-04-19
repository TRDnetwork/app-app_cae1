import DOMPurify from 'isomorphic-dompurify';

interface ContactConfirmationProps {
  name: string;
}

export default function contactConfirmation({ name }: ContactConfirmationProps) {
  const cleanName = DOMPurify.sanitize(name);

  return `
    <div style="font-family: 'Satoshi', sans-serif; background-color: #faf8f5; padding: 32px; border-radius: 12px; max-width: 65ch; margin: 0 auto; color: #1a2e1a;">
      <h1 style="font-family: 'Fraunces', serif; color: #1a2e1a; font-size: 1.5rem; margin-bottom: 24px;">Thank You, ${cleanName}!</h1>
      <p>We’ve received your message and will get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore more of our work or reach out directly at <a href="mailto:contact@portfolio-pro.com" style="color: #e66000;">contact@portfolio-pro.com</a>.</p>
      <hr style="border: 1px solid #e9e5dd; margin: 32px 0;" />
      <footer style="color: #4a4a4a; font-size: 0.9rem;">
        <p>Portfolio Pro — crafted with care, focused on calm clarity.</p>
        <p><a href="#" style="color: #e66000;">Unsubscribe</a> from future updates.</p>
      </footer>
    </div>
  `;
}