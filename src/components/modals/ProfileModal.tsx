import React, { useState } from 'react';
import { isAudioPlaying, startCalmingAudio, stopCalmingAudio, playGentleChime } from '../../utils/audio';

interface ProfileModalProps {
  onClose: () => void;
  savedCount: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, savedCount }) => {
  const [ambientAudio, setAmbientAudio] = useState(isAudioPlaying());

  const handleToggleAmbient = () => {
    playGentleChime();
    if (ambientAudio) {
      stopCalmingAudio();
      setAmbientAudio(false);
    } else {
      startCalmingAudio();
      setAmbientAudio(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#ffffff] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#d8e3fb]">
        {/* Pass Top Banner */}
        <div className="bg-gradient-to-br from-[#9f3c16] to-[#bf542c] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            ✕
          </button>
          <div className="w-16 h-16 rounded-full bg-white/20 p-1 mx-auto flex items-center justify-center mb-2 shadow-inner">
            <span className="material-symbols-outlined text-[36px] text-white">person</span>
          </div>
          <h3 className="font-headline-sm text-[18px] font-semibold">
            Feline Connoisseur Pass
          </h3>
          <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#fdbe50] text-[#714d00] font-label-sm text-[11px] font-bold">
            Gold Patron Tier
          </span>
        </div>

        {/* Pass Details */}
        <div className="p-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-[#f0f3ff] border border-[#d8e3fb]">
              <span className="font-headline-sm text-[20px] text-[#9f3c16] font-bold block">
                {savedCount}
              </span>
              <span className="font-label-sm text-[11px] text-[#57423b]">Saved Works</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#f0f3ff] border border-[#d8e3fb]">
              <span className="font-headline-sm text-[20px] text-[#446349] font-bold block">
                VIP
              </span>
              <span className="font-label-sm text-[11px] text-[#57423b]">Vernissage Pass</span>
            </div>
          </div>

          {/* Audio Synthesizer Toggle */}
          <div className="p-3.5 rounded-2xl bg-[#e7eeff] border border-[#d8e3fb] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#9f3c16] text-[20px]">
                graphic_eq
              </span>
              <div className="flex flex-col">
                <span className="font-label-md text-[13px] text-[#111c2d] font-semibold">
                  Atelier Ambient Purr
                </span>
                <span className="font-body-sm text-[11px] text-[#57423b]">
                  Calming cat purr &amp; harp chimes
                </span>
              </div>
            </div>
            <button
              onClick={handleToggleAmbient}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                ambientAudio ? 'bg-[#446349]' : 'bg-[#dec0b7]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  ambientAudio ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Barcode representation */}
          <div className="text-center pt-2">
            <div className="h-9 w-48 mx-auto flex items-stretch justify-between gap-1 opacity-60">
              {[2, 4, 1, 3, 2, 5, 2, 1, 4, 2, 3, 1, 2, 4, 2, 1].map((w, idx) => (
                <div key={idx} className="bg-black" style={{ width: `${w * 2}px` }} />
              ))}
            </div>
            <span className="font-mono text-[10px] text-[#8a726a] tracking-widest mt-1 block">
              PB-8842-PARIS-2024
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
