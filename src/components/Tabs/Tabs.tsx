import React, { useState } from 'react';

export interface Tab {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  if (tabs.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex border-b border-[#e9e5dd] mb-4">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`py-2 px-4 font-medium text-sm transition-colors duration-200 ${
              activeIndex === i
                ? 'text-[#e66000] border-b-2 border-[#e66000]'
                : 'text-[#4a4a4a] hover:text-[#1a2e1a]'
            }`}
            onClick={() => setActiveIndex(i)}
            role="tab"
            aria-selected={activeIndex === i}
            tabIndex={activeIndex === i ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content" role="tabpanel">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};