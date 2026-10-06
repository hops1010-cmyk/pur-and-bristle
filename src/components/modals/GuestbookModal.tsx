import React, { useState } from 'react';
import { GuestbookEntry } from '../../types';
import { playGentleChime } from '../../utils/audio';

interface GuestbookModalProps {
  entries: GuestbookEntry[];
  onAddEntry: (entry: Omit<GuestbookEntry, 'id' | 'timestamp'>) => void;
  onClose: () => void;
}

export const GuestbookModal: React.FC<GuestbookModalProps> = ({
  entries,
  onAddEntry,
  onClose,
}) => {
  const [author, setAuthor] = useState('');
  const [petName, setPetName] = useState('');
  const [stamp, setStamp] = useState('🐾');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const stamps = ['🐾', '🐱', '🧶', '🥐', '🎨', '✨'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setIsSubmitting(true);
    playGentleChime();
    setTimeout(() => {
      onAddEntry({
        author: author.trim(),
        petName: petName.trim() || undefined,
        stamp,
        message: message.trim(),
      });
      setIsSubmitting(false);
      setSubmittedMessage(true);
      setTimeout(() => {
        setAuthor('');
        setPetName('');
        setMessage('');
        setSubmittedMessage(false);
      }, 1500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#ffffff] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] border border-[#d8e3fb]">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#d8e3fb]/60 bg-[#f9f9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9f3c16] text-[22px]">edit_note</span>
            <h3 className="font-headline-sm text-[17px] text-[#111c2d] font-semibold">
              Guestbook of Whiskers
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

        {/* Content body */}
        <div className="overflow-y-auto p-5 flex flex-col gap-5">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#f0f3ff] p-4 rounded-2xl border border-[#d8e3fb] flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[11px] text-[#7e5700] uppercase font-bold tracking-wider">
                Leave Your Note
              </span>
              <span className="text-[12px] text-[#57423b]">Pick a stamp:</span>
            </div>

            {/* Stamp Picker */}
            <div className="flex items-center gap-1.5 pb-1">
              {stamps.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => {
                    playGentleChime();
                    setStamp(s);
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[18px] transition-transform active:scale-90 ${
                    stamp === s
                      ? 'bg-[#9f3c16] text-white ring-2 ring-[#ffdbcf] scale-110 shadow-sm'
                      : 'bg-[#ffffff] hover:bg-[#e7eeff]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Your Name (e.g. Clara)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-[#d8e3fb] text-[13px] text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#9f3c16]"
              />
              <input
                type="text"
                placeholder="Cat's Name (e.g. Mochi)"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-[#d8e3fb] text-[13px] text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#9f3c16]"
              />
            </div>

            <textarea
              required
              rows={2}
              placeholder="What did you think of the vernissage or artworks?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#d8e3fb] text-[13px] text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#9f3c16]"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-[#9f3c16] hover:bg-[#bf542c] text-white font-label-md text-[13px] font-semibold shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              {submittedMessage ? (
                <>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Whisker Inscribed!</span>
                </>
              ) : (
                <>
                  <span>Sign Guestbook</span>
                  <span className="text-[14px]">{stamp}</span>
                </>
              )}
            </button>
          </form>

          {/* Recent Notes List */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-sm text-[11px] text-[#57423b] uppercase font-bold tracking-wider">
              Recent Inscriptions ({entries.length})
            </span>

            <div className="flex flex-col gap-2.5">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#d8e3fb]/60 shadow-sm flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[18px]">{entry.stamp}</span>
                      <span className="font-label-md text-[13px] text-[#111c2d] font-semibold">
                        {entry.author}
                      </span>
                      {entry.petName && (
                        <span className="font-body-sm text-[11px] text-[#7e5700] bg-[#ffdead] px-1.5 py-0.2 rounded-full">
                          &amp; {entry.petName}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8a726a]">{entry.timestamp}</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-[#57423b] leading-relaxed pl-6 italic">
                    "{entry.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
