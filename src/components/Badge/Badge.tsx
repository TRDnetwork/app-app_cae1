import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  const variants =
    variant === 'outline'
      ? 'bg-transparent border border-[#e66000] text-[#e66000]'
      : 'bg-[#e66000] text-white';

  return (
    <span className={`${base} ${variants} ${className}`}>{children}</span>
  );
};