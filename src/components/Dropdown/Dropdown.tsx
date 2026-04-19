import React, { useState, useRef, useEffect } from 'react';
import { Button, ButtonProps } from '../Button/Button';

export interface DropdownOption {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: Omit<ButtonProps, 'onClick'>;
  options: DropdownOption[];
  align?: 'left' | 'right';
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  options,
  align = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button {...trigger} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div
          className="origin-top-right absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 min-w-40"
          style={{
            right: align === 'right' ? 0 : 'auto',
            left: align === 'left' ? 0 : 'auto',
          }}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, i) => (
              <button
                key={i}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                disabled={option.disabled}
                className="block w-full text-left px-4 py-2 text-sm text-[#1a2e1a] hover:bg-[#e9e5dd] disabled:opacity-50 disabled:cursor-not-allowed"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};