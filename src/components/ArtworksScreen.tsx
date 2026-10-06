import React, { useState, useRef, useEffect } from 'react';
import { ARTWORKS } from '../data/mockData';
import { Artwork } from '../types';
import { playGentleChime } from '../utils/audio';
import { SmartImage } from './common/SmartImage';
import { filterArtworks, SortOrder } from '../utils/filter';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface ArtworksScreenProps {
  onSelectArtwork: (artworkId: string) => void;
  onAcquireArtwork: (artwork: Artwork) => void;
  onInspectArtwork: (artwork: Artwork) => void;
  onToggleSave: (artworkId: string) => void;
  savedIds: Set<string>;
}

export const ArtworksScreen: React.FC<ArtworksScreenProps> = ({
  onSelectArtwork,
  onAcquireArtwork,
  onInspectArtwork,
  onToggleSave,
  savedIds,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOrder>('Trending Meows');
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [purrCounts, setPurrCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    ARTWORKS.forEach((a) => {
      initial[a.id] = a.purrsCount;
    });
    return storage.getItem<Record<string, number>>(STORAGE_KEYS.PURR_COUNTS, initial);
  });
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(() =>
    storage.getItem<Record<string, boolean>>(STORAGE_KEYS.LIKED_ARTWORKS, {})
  );

  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    storage.setItem(STORAGE_KEYS.PURR_COUNTS, purrCounts);
  }, [purrCounts]);

  useEffect(() => {
    storage.setItem(STORAGE_KEYS.LIKED_ARTWORKS, likedMap);
  }, [likedMap]);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    playGentleChime();
    const isLiked = !!likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isLiked }));
    setPurrCounts((prev) => ({
      ...prev,
      [id]: isLiked ? Math.max(0, (prev[id] || 0) - 1) : (prev[id] || 0) + 1,
    }));
  };

  const filteredArtworks = filterArtworks(ARTWORKS, '', activeFilter, purrCounts, sortOption);

  const handleSurpriseMe = () => {
    playGentleChime();
    if (filteredArtworks.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredArtworks.length);
    const randomArt = filteredArtworks[randomIndex];
    const el = cardRefs.current[randomArt.id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-[#9f3c16]', 'scale-[1.02]');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-[#9f3c16]', 'scale-[1.02]');
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-2 max-w-xl mx-auto relative">
      {/* Interactive Whimsical Ambient Header Strip */}
      <div className="px-margin pt-space-xs pb-space-sm flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[#9f3c16] text-[20px]">palette</span>
          <span className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">Salon Archive</span>
          <span className="bg-[#fdbe50] text-[#714d00] font-label-sm text-[11px] px-2 py-0.5 rounded-full ml-1 font-semibold">
            142 Works
          </span>
        </div>

        {/* Sort Dropdown Trigger */}
        <div className="relative">
          <button
            aria-label="Sort Collection"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-1.5 bg-[#e7eeff] text-[#111c2d] px-space-sm py-1.5 rounded-full font-label-md text-[12px] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[16px] text-[#9f3c16]">swap_vert</span>
            <span>{sortOption}</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>

          {/* Dropdown Modal */}
          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-[#ffffff] rounded-xl shadow-xl p-1.5 z-30 flex flex-col gap-0.5 border border-[#d8e3fb]">
              {(['Trending Meows', 'Newest First', 'Most Purred'] as SortOrder[]).map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortOption(option);
                    setIsSortOpen(false);
                    playGentleChime();
                  }}
                  className={`text-left px-3 py-2 rounded-lg font-label-md text-[12px] flex items-center justify-between transition-colors ${
                    sortOption === option
                      ? 'text-[#9f3c16] bg-[#ffdbcf]/40 font-semibold'
                      : 'text-[#111c2d] hover:bg-[#e7eeff]'
                  }`}
                >
                  <span>{option}</span>
                  {sortOption === option && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Scroll Filter Pills */}
      <div className="w-full overflow-x-auto no-scrollbar px-margin pb-space-sm">
        <div className="flex items-center gap-space-xs whitespace-nowrap">
          {[
            { id: 'all', label: 'All Works' },
            { id: 'storybook', label: 'Storybook' },
            { id: 'nocturne', label: 'Nocturne & Sky' },
            { id: 'tea', label: 'Cozy Teas' },
            { id: 'studio', label: 'Studio Life' },
            { id: 'watercolors', label: 'Watercolors' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  playGentleChime();
                }}
                className={`font-label-md text-[12px] px-3.5 py-1.5 rounded-full transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#9f3c16] text-white shadow-sm font-semibold'
                    : 'bg-[#e7eeff] text-[#111c2d] hover:bg-[#d8e3fb]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Curated Collection Gallery Feed */}
      <div className="px-margin flex flex-col gap-space-md pt-space-xs">
        {filteredArtworks.map((artwork) => {
          const isLiked = !!likedMap[artwork.id];
          const purrs = purrCounts[artwork.id] || artwork.purrsCount;

          return (
            <article
              key={artwork.id}
              ref={(el) => { cardRefs.current[artwork.id] = el; }}
              className="bg-[#ffffff] rounded-2xl shadow-md overflow-hidden flex flex-col group relative transition-all duration-300 border border-[#d8e3fb]/40 hover:shadow-xl"
            >
              {/* Image Container with Tag & Like Overlay */}
              <div
                className="relative w-full aspect-square bg-[#e7eeff] overflow-hidden cursor-pointer"
                onClick={() => onSelectArtwork(artwork.id)}
              >
                <SmartImage
                  alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  src={artwork.image}
                  fallbackIcon="palette"
                  fallbackText={artwork.title}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                {/* Top Status Tags */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="bg-[#ffffff]/90 backdrop-blur-md text-[#111c2d] font-label-sm text-[11px] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[14px] text-[#7e5700]">
                      {artwork.tagType === 'masterwork' ? 'auto_awesome' : artwork.tagType === 'cottage' ? 'yard' : 'local_fire_department'}
                    </span>
                    {artwork.tag}
                  </span>
                </div>

                {/* Like / Purr Button */}
                <button
                  aria-label={`Favorite ${artwork.title}`}
                  onClick={(e) => handleLike(e, artwork.id)}
                  className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-[#ffffff]/90 backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-transform ${
                    isLiked ? 'text-[#9f3c16]' : 'text-[#57423b]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px] transition-colors"
                    style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>

                {/* Edition Tag Bottom Right */}
                <div className="absolute bottom-3 right-3 bg-[#ffffff]/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">
                  <span className="font-label-sm text-[11px] text-[#9f3c16] font-bold">
                    {artwork.printEditionLabel}
                  </span>
                </div>
              </div>

              {/* Card Details Canvas Mat */}
              <div className="p-space-md flex flex-col gap-space-xs bg-[#ffffff]">
                <div
                  className="flex items-start justify-between gap-space-sm cursor-pointer"
                  onClick={() => onSelectArtwork(artwork.id)}
                >
                  <div>
                    <h2 className="font-headline-sm text-[18px] text-[#111c2d] leading-snug font-semibold hover:text-[#9f3c16] transition-colors">
                      {artwork.title}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-[#446349]">brush</span>
                      <span className="font-label-md text-[12px] text-[#57423b] font-medium">
                        {artwork.artistName}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#dec0b7]" />
                      <span className="font-body-sm text-[12px] text-[#8a726a]">
                        {artwork.artistRole}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="font-body-sm text-[13px] text-[#57423b] line-clamp-1 italic">
                  {artwork.description}
                </p>

                {/* Social Proof & Actions Strip */}
                <div className="mt-space-xs pt-space-xs flex items-center justify-between bg-[#f0f3ff] p-2 rounded-xl">
                  <div className="flex items-center gap-1.5 pl-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-[#9f3c16]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      pets
                    </span>
                    <span className="font-label-sm text-[11px] text-[#111c2d] font-semibold">
                      {purrs} Purrs
                    </span>
                  </div>

                  <div className="flex items-center gap-space-xs">
                    <button
                      aria-label="Inspect painting canvas"
                      onClick={() => onInspectArtwork(artwork)}
                      className="bg-[#e7eeff] text-[#57423b] hover:text-[#9f3c16] hover:bg-[#d8e3fb] px-3 py-1.5 rounded-full font-label-sm text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                      <span>Inspect</span>
                    </button>
                    <button
                      aria-label="Acquire print"
                      onClick={() => onAcquireArtwork(artwork)}
                      className="bg-[#9f3c16] hover:bg-[#bf542c] text-white px-3.5 py-1.5 rounded-full font-label-sm text-[11px] font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                      <span>Acquire</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Botanical Illustrated Storybook Footer Note */}
      <div className="px-margin my-space-lg flex flex-col items-center text-center">
        <div className="w-12 h-1 rounded-full bg-[#dec0b7] mb-space-sm" />
        <span className="material-symbols-outlined text-[#9f3c16] text-[28px] mb-1">auto_stories</span>
        <p className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">
          Carefully Curated for Cat Devotees
        </p>
        <p className="font-body-sm text-[13px] text-[#57423b] max-w-xs mt-1 leading-relaxed">
          Each original work supports local feline shelters &amp; storybook illustrators worldwide.
        </p>
      </div>

      {/* Floating Quick Curator Pill (Sticky above shell navigation) */}
      <div className="sticky bottom-20 z-30 px-margin flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-[#263143]/95 backdrop-blur-lg text-[#ecf1ff] px-space-md py-2.5 rounded-full shadow-2xl flex items-center gap-space-sm border border-white/10">
          <button
            onClick={() => setActiveFilter(activeFilter === 'all' ? 'storybook' : 'all')}
            className="flex items-center gap-1.5 font-label-md text-[12px] text-[#ecf1ff] hover:text-[#fabc4d] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#fabc4d]">tune</span>
            <span>Curator Filter</span>
          </button>
          <span className="w-px h-4 bg-white/20" />
          <button
            onClick={handleSurpriseMe}
            className="flex items-center gap-1.5 font-label-md text-[12px] text-[#ecf1ff] hover:text-[#fabc4d] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffdbcf]">casino</span>
            <span>Surprise Me</span>
          </button>
        </div>
      </div>
    </div>
  );
};
