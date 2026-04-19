import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-[#e9e5dd] p-6 transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] ${className}`}
    >
      {children}
    </div>
  );
};