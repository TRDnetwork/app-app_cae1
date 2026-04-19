import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  show: boolean;
  type: ToastType;
  message: string;
  onClose: () => void;
  autoDismiss?: number; // in ms, default 4000
}

const typeClasses = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export const Toast: React.FC<ToastProps> = ({
  show,
  type,
  message,
  onClose,
  autoDismiss = 4000,
}) => {
  useEffect(() => {
    if (show && autoDismiss) {
      const timer = setTimeout(() => {
        onClose();
      }, autoDismiss);

      return () => clearTimeout(timer);
    }
  }, [show, autoDismiss, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg border max-w-md text-center shadow-lg animate-fade-in-up ${typeClasses[type]}`}
      role="alert"
      style={{ backgroundColor: '#faf8f5', borderColor: '#e9e5dd' }}
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};