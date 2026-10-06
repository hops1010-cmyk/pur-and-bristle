import React, { useState } from 'react';
import { ARTWORKS } from '../data/mockData';
import { Artwork } from '../types';
import { playGentleChime } from '../utils/audio';
import { SmartImage } from './common/SmartImage';
import { shareContent } from '../utils/share';

interface SavedScreenProps {
  savedIds: Set<string>;
  onSelectArtwork: (artworkId: string) => void;
  onRemoveSaved: (artworkId: string) => void;
  onAcquireArtwork: (artwork: Artwork) => void;
  onBrowseArtworks: () => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedIds,
  onSelectArtwork,
  onRemoveSaved,
  onAcquireArtwork,
  onBrowseArtworks,
}) => {
  const savedArtworks = ARTWORKS.filter((a) => savedIds.has(a.id));
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const handleShareSaved = async (artwork: Artwork, e: React.MouseEvent) => {
    e.stopPropagation();
    playGentleChime();
    const result = await shareContent({
      title: `${artwork.title} by ${artwork.artistName} | Purr & Bristle`,
      text: `Saved in my Purr & Bristle Folio: "${artwork.title}" by ${artwork.artistName}. ${artwork.description}`,
      url: window.location.href,
    });
    setShareFeedback(result.message);
    setTimeout(() => setShareFeedback(null), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-xl mx-auto px-margin">
      {/* Header */}
      <div className="py-space-sm flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[#9f3c16] text-[22px]">bookmark</span>
          <h2 className="font-headline-md text-[22px] text-[#111c2d] font-semibold">
            Saved Collection
          </h2>
          <span className="bg-[#fdbe50] text-[#714d00] font-label-sm text-[11px] px-2 py-0.5 rounded-full ml-1 font-bold">
            {savedArtworks.length}
          </span>
        </div>
      </div>

      {shareFeedback && (
        <div className="mb-3 p-2.5 rounded-xl bg-[#c8ecca] border border-[#446349]/30 text-[#03210d] font-label-sm text-[11px] flex items-center justify-between shadow-sm animate-fade-in">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#446349]">
              check_circle
            </span>
            {shareFeedback}
          </span>
          <button onClick={() => setShareFeedback(null)} className="font-bold px-1">
            ✕
          </button>
        </div>
      )}

      {savedArtworks.length === 0 ? (
        <div className="bg-[#ffffff] rounded-2xl p-space-xl text-center flex flex-col items-center gap-space-sm my-space-md border border-[#d8e3fb]/60 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#9f3c16] mb-1">
            <span className="material-symbols-outlined text-[32px]">favorite_border</span>
          </div>
          <h3 className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">
            Your Cat Folio is Empty
          </h3>
          <p className="font-body-sm text-[13px] text-[#57423b] max-w-xs leading-relaxed">
            Tap the heart or bookmark icon on any artwork or spa session to save your favorite whiskers here.
          </p>
          <button
            onClick={onBrowseArtworks}
            className="mt-space-sm bg-[#9f3c16] hover:bg-[#bf542c] text-white px-space-lg py-2.5 rounded-full font-label-md text-[13px] font-semibold shadow-md active:scale-95 transition-all"
          >
            Explore Gallery Works
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-space-md mt-space-xs">
          {savedArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-[#ffffff] rounded-2xl p-space-sm shadow-sm border border-[#d8e3fb]/60 flex items-center justify-between gap-space-sm hover:shadow-md transition-shadow"
            >
              <div
                className="flex items-center gap-space-sm flex-1 min-w-0 cursor-pointer"
                onClick={() => onSelectArtwork(artwork.id)}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#e7eeff] shrink-0 border border-[#d8e3fb]">
                  <SmartImage
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                    fallbackIcon="palette"
                    fallbackText={artwork.title}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-[10px] text-[#7e5700] uppercase font-bold tracking-wider">
                    {artwork.collection}
                  </span>
                  <h4 className="font-headline-sm text-[15px] text-[#111c2d] font-semibold truncate hover:text-[#9f3c16] transition-colors">
                    {artwork.title}
                  </h4>
                  <span className="font-body-sm text-[12px] text-[#57423b] truncate">
                    {artwork.artistName}
                  </span>
                  <span className="font-label-md text-[12px] text-[#9f3c16] font-bold mt-0.5">
                    ${artwork.price}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  onClick={() => onAcquireArtwork(artwork)}
                  className="bg-[#9f3c16] hover:bg-[#bf542c] text-white px-3 py-1.5 rounded-xl font-label-sm text-[11px] font-semibold shadow-sm active:scale-95 transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                  <span>Acquire</span>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleShareSaved(artwork, e)}
                    className="flex-1 bg-[#e7eeff] hover:bg-[#d8e3fb] text-[#111c2d] px-2 py-1.5 rounded-xl font-label-sm text-[11px] font-medium transition-colors flex items-center justify-center"
                    title="Share saved work"
                  >
                    <span className="material-symbols-outlined text-[14px]">share</span>
                  </button>
                  <button
                    onClick={() => {
                      playGentleChime();
                      onRemoveSaved(artwork.id);
                    }}
                    className="bg-[#f0f3ff] hover:bg-[#ffdad6] text-[#57423b] hover:text-[#93000a] px-2 py-1.5 rounded-xl font-label-sm text-[11px] font-medium transition-colors flex items-center justify-center"
                    title="Remove from saved"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
