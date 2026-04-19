import { useState, useCallback } from 'react';
import { submitContactForm, type FormState } from '@/lib/api';

/**
 * Custom hook for managing contact form state and submission
 */
export function useContactForm() {
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });

  const submit = useCallback(async (formData: {
    name: string;
    email: string;
    message: string;
    'bot-field'?: string;
  }) => {
    setFormState({ status: 'submitting' });
    
    try {
      const result = await submitContactForm(formData);
      setFormState(result);
      
      // Auto-reset success state after 5 seconds
      if (result.status === 'success') {
        setTimeout(() => {
          setFormState({ status: 'idle' });
        }, 5000);
      }
    } catch {
      setFormState({ 
        status: 'error', 
        message: 'Something went wrong. Please try again.' 
      });
    }
  }, []);

  const reset = useCallback(() => {
    setFormState({ status: 'idle' });
  }, []);

  return {
    formState,
    submit,
    reset,
  };
}