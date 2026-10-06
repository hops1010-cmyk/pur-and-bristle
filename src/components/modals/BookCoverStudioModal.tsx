import React, { useState, useRef } from 'react';
import { playGentleChime, playLincolnMeow } from '../../utils/audio';
import { shareContent } from '../../utils/share';
import { CAT_ARTISTS } from '../../data/mockData';
import { storage } from '../../utils/storage';

interface BookCoverStudioModalProps {
  onClose: () => void;
  onSavedCover?: (coverData: CustomBookCoverData) => void;
}

export interface CustomBookCoverData {
  id: string;
  title: string;
  subtitle: string;
  protagonistName: string;
  protagonistAvatar: string;
  clothColor: string;
  foilColor: string;
  emblem: string;
  createdAt: string;
}

const CLOTH_PALETTE = [
  { id: 'burgundy', name: 'Heritage Burgundy', hex: '#581611', border: '#78221b' },
  { id: 'ultramarine', name: 'Midnight Ultramarine', hex: '#14223d', border: '#213661' },
  { id: 'sage', name: 'Cotswolds Sage', hex: '#273c2b', border: '#3b5a41' },
  { id: 'ochre', name: 'Antique Honey Ochre', hex: '#5c3e09', border: '#85590c' },
  { id: 'obsidian', name: 'Obsidian Noir', hex: '#1a191d', border: '#2e2c33' },
];

const FOIL_FINISHES = [
  { id: 'gold24k', name: '24K Gold Leaf', color: '#fdbe50', shine: 'rgba(253,190,80,0.65)' },
  { id: 'rosecopper', name: 'Rose Copper', color: '#e89078', shine: 'rgba(232,144,120,0.65)' },
  { id: 'silver', name: 'Celestial Silver', color: '#e2e8f0', shine: 'rgba(226,232,240,0.65)' },
  { id: 'pearl', name: 'Opal Holographic', color: '#c4b5fd', shine: 'rgba(196,181,253,0.65)' },
];

const EMBLEMS = [
  { id: 'paw', label: 'Paw Crest', icon: 'pets' },
  { id: 'palette', label: 'Art Guild', icon: 'palette' },
  { id: 'stars', label: 'Celestial Stars', icon: 'auto_awesome' },
  { id: 'book', label: 'Grimoire', icon: 'menu_book' },
  { id: 'crown', label: 'Royal Whiskers', icon: 'crown' },
];

export const BookCoverStudioModal: React.FC<BookCoverStudioModalProps> = ({
  onClose,
  onSavedCover,
}) => {
  const [title, setTitle] = useState("The Defiant Meow");
  const [subtitle, setSubtitle] = useState("A Retrospective in Tweed & Whiskers");
  const [selectedProtagonist, setSelectedProtagonist] = useState(CAT_ARTISTS[5] || CAT_ARTISTS[0]); // Lincoln
  const [selectedCloth, setSelectedCloth] = useState(CLOTH_PALETTE[0]);
  const [selectedFoil, setSelectedFoil] = useState(FOIL_FINISHES[0]);
  const [selectedEmblem, setSelectedEmblem] = useState(EMBLEMS[0]);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Tilt effect for preview
  const [tilt, setTilt] = useState<{ x: number; y: number; shineX: number; shineY: number }>({
    x: 0,
    y: 0,
    shineX: 50,
    shineY: 50,
  });

  const previewCardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!previewCardRef.current) return;
    const rect = previewCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({
      x: rotateX,
      y: rotateY,
      shineX: (x / rect.width) * 100,
      shineY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, shineX: 50, shineY: 50 });
  };

  const handleSaveCover = () => {
    playGentleChime();
    const coverData: CustomBookCoverData = {
      id: `custom-cover-${Date.now()}`,
      title,
      subtitle,
      protagonistName: selectedProtagonist.name,
      protagonistAvatar: selectedProtagonist.avatar,
      clothColor: selectedCloth.hex,
      foilColor: selectedFoil.color,
      emblem: selectedEmblem.icon,
      createdAt: new Date().toLocaleDateString(),
    };

    const existing = storage.getItem<CustomBookCoverData[]>('purr_custom_book_covers', []);
    storage.setItem('purr_custom_book_covers', [coverData, ...existing]);

    if (onSavedCover) onSavedCover(coverData);
    setFeedback('Custom book cover art saved to your collection!');
    setTimeout(() => {
      setFeedback(null);
      onClose();
    }, 1800);
  };

  const handleShareCover = async () => {
    playGentleChime();
    const res = await shareContent({
      title: `${title} (Feline Book Cover Art)`,
      text: `Behold my bespoke book cover art: "${title} - ${subtitle}", starring ${selectedProtagonist.name} with ${selectedFoil.name} foil stamping!`,
    });
    setFeedback(res.message);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c1421]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#dec0b7] my-auto flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#9f3c16] via-[#bf542c] to-[#9f3c16] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#fdbe50]">
              draw
            </span>
            <div>
              <h3 className="font-headline-sm text-[16px] font-bold text-white leading-tight">
                Feline Book Cover Art Studio
              </h3>
              <p className="font-label-sm text-[11px] text-[#ffdbcf]">
                Craft bespoke clothbound hardcover editions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            aria-label="Close Studio"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="bg-[#281900] text-[#fdbe50] text-[12px] px-4 py-2 font-medium flex items-center gap-1.5 animate-fadeIn">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>{feedback}</span>
          </div>
        )}

        {/* Scrollable Studio Workspace */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col md:flex-row gap-5 bg-gradient-to-b from-[#f9f9ff] to-[#f0f3ff]">
          {/* Left Column: Interactive 3D Cover Live Canvas */}
          <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
            <div
              className="relative perspective-[1000px] py-2 w-full flex justify-center cursor-pointer select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={previewCardRef}
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                  transformStyle: 'preserve-3d',
                  backgroundColor: selectedCloth.hex,
                }}
                className="relative w-56 aspect-[3/4.2] rounded-r-2xl rounded-l-md shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden"
              >
                {/* Spine Strip */}
                <div className="absolute top-0 bottom-0 left-0 w-5 bg-black/40 border-r border-white/10 z-20 flex flex-col justify-between py-4 items-center">
                  <span
                    className="text-[8px] font-serif font-bold tracking-widest [writing-mode:vertical-rl] rotate-180"
                    style={{ color: selectedFoil.color }}
                  >
                    PURR & BRISTLE
                  </span>
                  <span className="text-[10px]" style={{ color: selectedFoil.color }}>🐾</span>
                </div>

                {/* Cloth Texture Overlay */}
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                    backgroundSize: '4px 4px',
                  }}
                />

                {/* Foil Specular Beam */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                  style={{
                    background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, ${selectedFoil.shine} 0%, transparent 65%)`,
                    mixBlendMode: 'overlay',
                  }}
                />

                {/* Gilded Border Filigree */}
                <div
                  className="absolute inset-2 border-2 rounded-r-xl pointer-events-none pl-4"
                  style={{ borderColor: selectedFoil.color }}
                >
                  <div className="absolute top-1 left-4 text-[8px]" style={{ color: selectedFoil.color }}>❦</div>
                  <div className="absolute top-1 right-1 text-[8px]" style={{ color: selectedFoil.color }}>❦</div>
                  <div className="absolute bottom-1 left-4 text-[8px]" style={{ color: selectedFoil.color }}>❦</div>
                  <div className="absolute bottom-1 right-1 text-[8px]" style={{ color: selectedFoil.color }}>❦</div>
                </div>

                {/* Content Inside Cover */}
                <div className="absolute inset-0 pl-6 pr-3 py-4 flex flex-col items-center justify-between text-center">
                  {/* Top Header Plate */}
                  <div className="w-full">
                    <span
                      className="text-[9px] uppercase tracking-widest font-serif block drop-shadow-sm font-bold"
                      style={{ color: selectedFoil.color }}
                    >
                      THE OFFICIAL CHRONICLES
                    </span>
                    <h4
                      className="font-serif text-[14px] font-bold leading-tight mt-1 drop-shadow-sm"
                      style={{ color: selectedFoil.color }}
                    >
                      {title || 'Untitled Masterpiece'}
                    </h4>
                  </div>

                  {/* Center Protagonist Medallion */}
                  <div className="relative my-auto flex flex-col items-center">
                    <div
                      className="w-18 h-18 rounded-full border-2 overflow-hidden shadow-lg p-0.5 bg-black/30"
                      style={{ borderColor: selectedFoil.color }}
                    >
                      <img
                        src={selectedProtagonist.avatar}
                        alt={selectedProtagonist.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    {/* Emblem Badge under medallion */}
                    <div
                      className="mt-1 px-2 py-0.5 rounded-full bg-black/50 text-[10px] flex items-center gap-1 font-semibold border"
                      style={{ color: selectedFoil.color, borderColor: `${selectedFoil.color}55` }}
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {selectedEmblem.icon}
                      </span>
                      <span className="truncate max-w-[100px]">{selectedProtagonist.name}</span>
                    </div>
                  </div>

                  {/* Subtitle & Publisher Footer */}
                  <div className="w-full">
                    <p
                      className="font-serif italic text-[9px] leading-snug line-clamp-2 px-1"
                      style={{ color: `${selectedFoil.color}dd` }}
                    >
                      "{subtitle}"
                    </p>
                    <span
                      className="text-[8px] tracking-wider block mt-1 uppercase font-mono font-semibold"
                      style={{ color: selectedFoil.color }}
                    >
                      Atelier Press • Paris
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <span className="text-[11px] text-[#7e5700] flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[13px]">swipe</span>
              Move cursor to tilt & illuminate foil
            </span>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="flex-1 flex flex-col gap-3.5">
            {/* Title & Subtitle Inputs */}
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-[11px] font-bold text-[#822801]">
                Book Title & Subtitle:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={45}
                placeholder="Book title..."
                className="w-full px-3 py-1.5 rounded-xl border border-[#dec0b7] bg-white text-[13px] font-semibold text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#9f3c16]"
              />
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                maxLength={60}
                placeholder="Subtitle or tag..."
                className="w-full px-3 py-1.5 rounded-xl border border-[#dec0b7] bg-white text-[12px] text-[#57423b] focus:outline-none focus:ring-2 focus:ring-[#9f3c16]"
              />
            </div>

            {/* Protagonist Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-[11px] font-bold text-[#822801]">
                Feline Star:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {CAT_ARTISTS.map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => {
                      playGentleChime();
                      setSelectedProtagonist(artist);
                      if (artist.id === 'artist-lincoln') {
                        playLincolnMeow();
                      }
                    }}
                    className={`p-1.5 rounded-xl border flex items-center gap-1.5 text-left transition-all ${
                      selectedProtagonist.id === artist.id
                        ? 'border-[#9f3c16] bg-[#ffdbcf]/50 ring-1 ring-[#9f3c16]'
                        : 'border-[#dec0b7]/50 bg-white hover:bg-[#f0f3ff]'
                    }`}
                  >
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <span className="font-label-sm text-[10px] font-bold truncate text-[#111c2d]">
                      {artist.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cloth Binding Color Palette */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-[11px] font-bold text-[#822801]">
                Cloth Binding Weave:
              </label>
              <div className="flex items-center gap-2">
                {CLOTH_PALETTE.map((cloth) => (
                  <button
                    key={cloth.id}
                    onClick={() => {
                      playGentleChime();
                      setSelectedCloth(cloth);
                    }}
                    style={{ backgroundColor: cloth.hex }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform active:scale-90 ${
                      selectedCloth.id === cloth.id
                        ? 'scale-110 ring-2 ring-[#9f3c16] ring-offset-2 border-white'
                        : 'border-white/50 opacity-80'
                    }`}
                    title={cloth.name}
                  />
                ))}
                <span className="font-label-sm text-[11px] text-[#57423b] ml-1">
                  {selectedCloth.name}
                </span>
              </div>
            </div>

            {/* Foil Stamping Finish */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-[11px] font-bold text-[#822801]">
                Metallic Foil Stamping:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {FOIL_FINISHES.map((foil) => (
                  <button
                    key={foil.id}
                    onClick={() => {
                      playGentleChime();
                      setSelectedFoil(foil);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-2 text-left transition-all ${
                      selectedFoil.id === foil.id
                        ? 'border-[#9f3c16] bg-white ring-1 ring-[#9f3c16]'
                        : 'border-[#dec0b7]/50 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: foil.color }}
                    />
                    <span className="text-[11px] font-semibold text-[#111c2d]">
                      {foil.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Emblem / Badge Icon */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-[11px] font-bold text-[#822801]">
                Gallery Crest Emblem:
              </label>
              <div className="flex items-center gap-1.5">
                {EMBLEMS.map((emblem) => (
                  <button
                    key={emblem.id}
                    onClick={() => {
                      playGentleChime();
                      setSelectedEmblem(emblem);
                    }}
                    className={`flex-1 py-1 px-1.5 rounded-xl border flex flex-col items-center gap-0.5 text-center transition-all ${
                      selectedEmblem.id === emblem.id
                        ? 'border-[#9f3c16] bg-[#ffdbcf]/50 text-[#9f3c16]'
                        : 'border-[#dec0b7]/50 bg-white text-[#57423b] hover:bg-[#f0f3ff]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {emblem.icon}
                    </span>
                    <span className="text-[9px] font-semibold truncate w-full">
                      {emblem.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Dock Actions */}
        <div className="p-4 bg-white border-t border-[#e7eeff] flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={handleShareCover}
            className="py-2.5 px-3 bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#9f3c16] rounded-xl font-label-md text-[12px] font-bold border border-[#d8e3fb] flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
            <span>Share Cover</span>
          </button>

          <button
            onClick={handleSaveCover}
            className="flex-1 py-2.5 px-4 bg-[#9f3c16] hover:bg-[#bf542c] text-white rounded-xl font-label-lg text-[13px] font-bold shadow-md flex items-center justify-center gap-1.5 active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
            <span>Save Custom Cover Art</span>
          </button>
        </div>
      </div>
    </div>
  );
};
