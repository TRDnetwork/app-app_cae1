import React from 'react';

export interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className = '',
}) => {
  const commonProps = {
    id,
    value,
    onChange,
    placeholder,
    required,
    className: `block w-full rounded-lg border transition-colors duration-200 px-4 py-3 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
      error
        ? 'border-red-300 bg-red-50 text-red-900 focus:ring-red-500 focus:border-red-500'
        : 'border-[#e9e5dd] bg-white text-[#1a2e1a] focus:ring-[#e66000] focus:border-[#e66000]'
    } ${className}`,
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-[#1a2e1a] font-medium">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea {...commonProps} rows={4} />
      ) : (
        <input {...commonProps} type={type} />
      )}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};