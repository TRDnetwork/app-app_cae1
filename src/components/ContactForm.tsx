import { useState } from 'react';
import { useContactForm } from '@/hooks/useContactForm';
import { motion } from 'framer-motion';

export function ContactForm() {
  const { formState, submit } = useContactForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    'bot-field': '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.status === 'submitting') return;
    
    submit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-surface p-8 rounded-lg max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Honeypot field (hidden) */}
      <div className="hidden">
        <input
          type="text"
          name="bot-field"
          value={formData['bot-field']}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={formState.status === 'submitting'}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent focus-glow"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={formState.status === 'submitting'}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent focus-glow"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          disabled={formState.status === 'submitting'}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent focus-glow resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={formState.status === 'submitting'}
          className="bg-accent text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          {formState.status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {/* Success Toast */}
      {formState.status === 'success' && (
        <motion.div
          className="toast bg-text text-white"
          initial={{ opacity: 1, transform: 'translateX(-50%)' }}
          animate={{ opacity: 0 }}
          transition={{ delay: 4, duration: 0.3 }}
        >
          Message sent successfully! We'll get back to you soon.
        </motion.div>
      )}

      {/* Error Message */}
      {formState.status === 'error' && (
        <p className="text-red-600 text-sm mt-2">
          {formState.message}
        </p>
      )}
    </motion.form>
  );
}