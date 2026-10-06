import React, { useState } from 'react';
import { Artwork } from '../../types';

interface ZoomInspectModalProps {
  artwork: Artwork;
  onClose: () => void;
}

export const ZoomInspectModal: React.FC<ZoomInspectModalProps> = ({ artwork, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1.5);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-xl animate-fade-in text-white">
      {/* Top Bar */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[#fdbe50] text-[20px]">zoom_in</span>
          <span className="font-headline-sm text-[16px] truncate font-semibold">
            {artwork.title}
          </span>
          <span className="bg-white/20 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ml-1">
            4K Archival
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Canvas Viewport */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4 cursor-grab active:cursor-grabbing">
        <div
          className="relative transition-transform duration-200 ease-out origin-center rounded-lg overflow-hidden shadow-2xl"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            className="max-h-[65vh] max-w-[85vw] object-contain select-none pointer-events-none rounded"
          />
        </div>
      </div>

      {/* Zoom Slider Dock */}
      <div className="p-4 bg-black/60 border-t border-white/10 flex flex-col items-center gap-2 max-w-md mx-auto w-full">
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
            className="flex-1 accent-[#9f3c16] cursor-pointer"
          />
          <button
            onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
          <span className="text-[12px] font-mono w-12 text-right">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>
        <p className="text-[11px] text-white/60 text-center">
          Pinch or drag to inspect pigment granulations and cold-pressed cotton textures.
        </p>
      </div>
    </div>
  );
};
