import React, { useState } from 'react';
import { Artwork } from '../../types';
import { playGentleChime } from '../../utils/audio';
import { SmartImage } from '../common/SmartImage';

interface OrderPrintModalProps {
  artwork: Artwork;
  formatName: string;
  price: number;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
}

export const OrderPrintModal: React.FC<OrderPrintModalProps> = ({
  artwork,
  formatName,
  price,
  onClose,
  onSuccess,
}) => {
  const [recipient, setRecipient] = useState('');
  const [address, setAddress] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playGentleChime();
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `PB-${Math.floor(100000 + Math.random() * 900000)}`;
      onSuccess(generatedId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#ffffff] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#d8e3fb]">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#d8e3fb]/60 bg-[#f9f9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9f3c16] text-[22px]">shopping_bag</span>
            <h3 className="font-headline-sm text-[17px] text-[#111c2d] font-semibold">
              Acquire Museum Print
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

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {/* Artwork Summary */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#f0f3ff] border border-[#d8e3fb]">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white shadow-sm">
              <SmartImage
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
                fallbackIcon="palette"
                fallbackText={artwork.title}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <h4 className="font-headline-sm text-[14px] text-[#111c2d] font-semibold truncate">
                {artwork.title}
              </h4>
              <span className="font-body-sm text-[12px] text-[#57423b] truncate">
                {formatName}
              </span>
              <span className="font-label-md text-[13px] text-[#9f3c16] font-bold mt-0.5">
                ${price}.00 (Includes Archival Certificate)
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="block font-label-sm text-[11px] text-[#57423b] uppercase font-bold tracking-wider mb-1">
                Recipient / Patron Name
              </label>
              <input
                type="text"
                required
                placeholder="Lord Barnaby & Companion"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#d8e3fb] text-[13px] text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#9f3c16]"
              />
            </div>

            <div>
              <label className="block font-label-sm text-[11px] text-[#57423b] uppercase font-bold tracking-wider mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                required
                placeholder="42 Rue Lepic, Montmartre, Paris"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#d8e3fb] text-[13px] text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#9f3c16]"
              />
            </div>

            <div>
              <label className="block font-label-sm text-[11px] text-[#57423b] uppercase font-bold tracking-wider mb-1">
                Gift Dedication for Feline Companion (Optional)
              </label>
              <input
                type="text"
                placeholder="Dedicated with purrs to Sir Fluffington..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#d8e3fb] text-[13px] text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#9f3c16]"
              />
            </div>
          </div>

          <div className="bg-[#c8ecca]/30 p-2.5 rounded-xl flex items-center gap-2 border border-[#446349]/20">
            <span className="material-symbols-outlined text-[#446349] text-[18px]">eco</span>
            <span className="font-body-sm text-[11px] text-[#2f4d35]">
              Free climate-conscious courier shipping in rigid stay-flat mailers.
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-[#9f3c16] hover:bg-[#bf542c] text-white font-label-lg text-[14px] font-semibold shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Sealing with Wax...</span>
              </>
            ) : (
              <>
                <span>Confirm Acquisition (${price}.00)</span>
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
