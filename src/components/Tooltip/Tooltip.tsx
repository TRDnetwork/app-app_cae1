import React, { useState } from 'react';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="inline-block relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className="absolute z-10 px-2 py-1 text-xs text-white bg-[#1a2e1a] rounded shadow-lg whitespace-nowrap"
          style={{ minWidth: 'max-content' }}
          role="tooltip"
        >
          {content}
          <div
            className="absolute w-2 h-2 bg-[#1a2e1a] rotate-45"
            style={{
              [position === 'top' || position === 'bottom' ? 'left' : 'top']:
                '50%',
              transform:
                position === 'top'
                  ? 'translate(-50%, 50%) rotate(45deg)'
                  : position === 'bottom'
                  ? 'translate(-50%, -50%) rotate(45deg)'
                  : position === 'left'
                  ? 'translate(50%, -50%) rotate(45deg)'
                  : 'translate(-50%, -50%) rotate(45deg)',
            }}
          />
        </div>
      )}
    </div>
  );
};