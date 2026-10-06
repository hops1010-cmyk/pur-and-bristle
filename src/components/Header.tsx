import React from 'react';
import { APP_LOGO } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  isDetail: boolean;
  onBack: () => void;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  onOpenProfile: () => void;
  savedCount: number;
  onShare?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  isDetail,
  onBack,
  onOpenSearch,
  onOpenSaved,
  onOpenProfile,
  savedCount,
  onShare,
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'exhibitions':
        return 'Exhibitions';
      case 'artworks':
        return 'Artworks';
      case 'cat-artists':
        return 'Cat Artists';
      case 'saved':
        return 'Saved Collection';
      default:
        return 'Exhibitions';
    }
  };

  if (isDetail) {
    return (
      <header className="fixed top-0 w-full z-50 bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(78,52,46,0.05)] pt-safe">
        <div className="h-16 px-margin flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-space-sm">
            <button
              aria-label="Back"
              onClick={onBack}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#111c2d] hover:text-[#9f3c16] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="Purr & Bristle Logo"
              className="h-8 w-auto object-contain cursor-pointer"
              src={APP_LOGO}
              onClick={onBack}
            />
            <h1 className="font-headline-sm text-[18px] font-semibold text-[#111c2d]">
              Artwork Detail
            </h1>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              aria-label="Share"
              onClick={() => {
                if (onShare) {
                  onShare();
                } else if (navigator.share) {
                  navigator.share({
                    title: 'Purr & Bristle Feline Masterwork Gallery',
                    text: 'Explore enchanting storybook cat artworks and salons at Purr & Bristle Gallery.',
                    url: window.location.href,
                  }).catch(() => {});
                } else if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#57423b] hover:text-[#9f3c16] active:scale-95 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">share</span>
            </button>
            <button
              onClick={onOpenProfile}
              aria-label="Visitor Profile"
              className="w-8 h-8 rounded-full bg-[#9f3c16] flex items-center justify-center ml-space-xs hover:opacity-90 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(78,52,46,0.05)] pt-safe">
      <div className="h-16 px-margin flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            alt="Purr & Bristle Logo"
            className="h-8 w-auto object-contain"
            src={APP_LOGO}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-[18px] text-[#9f3c16] leading-none font-semibold">
              Purr &amp; Bristle
            </span>
            <span className="font-label-sm text-[11px] text-[#57423b] font-medium tracking-wide">
              {getTabTitle()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs">
          <button
            aria-label="Search"
            onClick={onOpenSearch}
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#57423b] hover:text-[#9f3c16] active:scale-95 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
          <button
            aria-label="Saved Favorites"
            onClick={onOpenSaved}
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#57423b] hover:text-[#9f3c16] active:scale-95 transition-colors relative"
          >
            <span className={`material-symbols-outlined text-[22px] ${savedCount > 0 ? 'text-[#9f3c16]' : ''}`}>
              favorite
            </span>
            {savedCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#9f3c16] text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenProfile}
            aria-label="Visitor Profile"
            className="w-8 h-8 rounded-full bg-[#9f3c16] flex items-center justify-center ml-space-xs hover:opacity-90 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
