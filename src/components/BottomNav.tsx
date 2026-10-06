import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'exhibitions', label: 'Exhibitions', icon: 'museum' },
    { id: 'artworks', label: 'Artworks', icon: 'palette' },
    { id: 'cat-artists', label: 'Cat Artists', icon: 'brush' },
    { id: 'saved', label: 'Saved', icon: 'bookmark' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#f9f9ff]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(78,52,46,0.06)] border-t border-[#d8e3fb]/40">
      <div className="flex justify-around items-center h-16 px-gutter max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-16 h-12 min-h-[44px] min-w-[44px] rounded-xl transition-all ${
                isActive
                  ? 'text-[#9f3c16] font-semibold scale-105'
                  : 'text-[#57423b] hover:text-[#111c2d] opacity-80'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px] transition-transform"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {tab.icon}
              </span>
              <span className="font-label-sm text-[11px] mt-0.5 tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1 rounded-full bg-[#9f3c16] mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
