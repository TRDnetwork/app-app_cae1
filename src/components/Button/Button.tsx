import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantClasses = {
  primary: 'bg-[#e66000] text-white hover:bg-[#d45900] focus:ring-[#e66000]/50',
  secondary:
    'bg-[#1a2e1a] text-white hover:bg-[#2d462d] focus:ring-[#1a2e1a]/50',
  outline:
    'border border-[#e66000] text-[#e66000] bg-transparent hover:bg-[#e66000]/10 focus:ring-[#e66000]/50',
  ghost:
    'text-[#e66000] hover:bg-[#e66000]/10 focus:ring-[#e66000]/50 bg-transparent',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50 border-0',
};

const sizeClasses = {
  sm: 'text-sm px-3 py-1.5 min-h-8 text-sm',
  md: 'text-base px-4 py-2 min-h-10',
  lg: 'text-lg px-6 py-3 min-h-12',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
};