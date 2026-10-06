import React, { useState } from 'react';
import { Artwork } from '../../types';
import { playGentleChime } from '../../utils/audio';

interface ViewInRoomModalProps {
  artwork: Artwork;
  onClose: () => void;
}

export const ViewInRoomModal: React.FC<ViewInRoomModalProps> = ({ artwork, onClose }) => {
  const [roomScene, setRoomScene] = useState<'living' | 'study' | 'gallery'>('living');
  const [frameStyle, setFrameStyle] = useState<'oak' | 'gold' | 'black' | 'float'>('oak');

  const getFrameClasses = () => {
    switch (frameStyle) {
      case 'gold':
        return 'p-3 bg-gradient-to-tr from-[#9e7a2b] via-[#f3d37a] to-[#886720] shadow-[0_20px_40px_rgba(0,0,0,0.35)] rounded-sm ring-1 ring-[#5c430a]';
      case 'black':
        return 'p-3 bg-[#111111] shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-sm';
      case 'float':
        return 'p-1 bg-white/70 backdrop-blur-sm shadow-[0_25px_50px_rgba(0,0,0,0.25)] rounded-md border border-white';
      case 'oak':
      default:
        return 'p-3 bg-gradient-to-b from-[#875d38] via-[#a37549] to-[#714d2e] shadow-[0_20px_40px_rgba(0,0,0,0.3)] rounded-sm ring-1 ring-[#50341b]';
    }
  };

  const getRoomBackground = () => {
    switch (roomScene) {
      case 'study':
        return 'bg-gradient-to-b from-[#3c4a3e] via-[#2d382f] to-[#1f2821]';
      case 'gallery':
        return 'bg-gradient-to-b from-[#f3f4f6] via-[#e5e7eb] to-[#d1d5db]';
      case 'living':
      default:
        return 'bg-gradient-to-b from-[#f4ece1] via-[#e7dacb] to-[#c7b299]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#ffffff] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#d8e3fb]">
        {/* Modal Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#d8e3fb]/60 bg-[#f9f9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9f3c16] text-[22px]">view_in_ar</span>
            <h3 className="font-headline-sm text-[17px] text-[#111c2d] font-semibold">
              Preview in Room
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-[#e7eeff] hover:bg-[#d8e3fb] flex items-center justify-center text-[#111c2d] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Room Stage Canvas */}
        <div className={`relative w-full h-80 flex items-center justify-center overflow-hidden transition-all duration-500 ${getRoomBackground()}`}>
          {/* Wall light spotlight */}
          <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-white/25 via-white/10 to-transparent pointer-events-none" />

          {/* Framed Artwork Element */}
          <div className={`relative transition-all duration-300 transform scale-90 ${getFrameClasses()}`}>
            <div className="p-3 bg-white shadow-inner">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-44 h-44 object-cover shadow-sm select-none"
              />
            </div>
          </div>

          {/* Furniture / Room Elements simulation */}
          {roomScene === 'living' && (
            <div className="absolute bottom-0 inset-x-0 h-16 bg-[#5c3a21] border-t-4 border-[#3d2413] opacity-80 flex items-center justify-center">
              <span className="text-[10px] text-white/50 tracking-widest font-mono uppercase">
                Solid Teak Credenza
              </span>
            </div>
          )}
          {roomScene === 'study' && (
            <div className="absolute bottom-0 inset-x-0 h-14 bg-[#231b14] border-t-2 border-[#544030] opacity-85 flex items-center justify-center">
              <span className="text-[10px] text-white/40 tracking-widest font-mono uppercase">
                Library Hearth &amp; Book Nook
              </span>
            </div>
          )}
          {roomScene === 'gallery' && (
            <div className="absolute bottom-0 inset-x-0 h-12 bg-[#9ca3af] border-t border-[#6b7280] opacity-60 flex items-center justify-center">
              <span className="text-[10px] text-black/50 tracking-widest font-mono uppercase">
                Museum Parquet Floor
              </span>
            </div>
          )}
        </div>

        {/* Controls Drawer */}
        <div className="p-5 flex flex-col gap-4 bg-[#ffffff]">
          {/* Scene Selector */}
          <div>
            <span className="font-label-sm text-[11px] text-[#57423b] uppercase tracking-wider font-bold">
              Ambient Setting
            </span>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {[
                { id: 'living', label: 'Cozy Salon' },
                { id: 'study', label: 'Library Nook' },
                { id: 'gallery', label: 'Parisian Wall' },
              ].map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    playGentleChime();
                    setRoomScene(scene.id as typeof roomScene);
                  }}
                  className={`py-2 px-2.5 rounded-xl font-label-sm text-[12px] transition-all font-semibold ${
                    roomScene === scene.id
                      ? 'bg-[#9f3c16] text-white shadow-sm'
                      : 'bg-[#f0f3ff] text-[#111c2d] hover:bg-[#e7eeff]'
                  }`}
                >
                  {scene.label}
                </button>
              ))}
            </div>
          </div>

          {/* Frame Style Selector */}
          <div>
            <span className="font-label-sm text-[11px] text-[#57423b] uppercase tracking-wider font-bold">
              Moulding &amp; Finish
            </span>
            <div className="grid grid-cols-4 gap-2 mt-1.5">
              {[
                { id: 'oak', label: 'Warm Oak' },
                { id: 'gold', label: 'Antique Gold' },
                { id: 'black', label: 'Studio Noir' },
                { id: 'float', label: 'Float Mount' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    playGentleChime();
                    setFrameStyle(f.id as typeof frameStyle);
                  }}
                  className={`py-2 px-2 rounded-xl font-label-sm text-[11px] transition-all font-semibold ${
                    frameStyle === f.id
                      ? 'bg-[#7e5700] text-white shadow-sm'
                      : 'bg-[#f0f3ff] text-[#111c2d] hover:bg-[#e7eeff]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <p className="font-body-sm text-[12px] text-[#57423b] text-center pt-1 leading-snug">
            Proportional scale based on 12" × 12" Gallery Mount with 2" museum matting.
          </p>
        </div>
      </div>
    </div>
  );
};
