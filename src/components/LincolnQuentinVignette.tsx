import React, { useState } from 'react';
import { playLincolnMeow, playGentleChime } from '../utils/audio';

interface LincolnQuentinVignetteProps {
  onSignGuestbookWithMeow?: () => void;
  onViewBookCover?: () => void;
  onReadBookChapter?: () => void;
}

export const LincolnQuentinVignette: React.FC<LincolnQuentinVignetteProps> = ({
  onSignGuestbookWithMeow,
  onViewBookCover,
  onReadBookChapter,
}) => {
  const [meowCount, setMeowCount] = useState(1);
  const [isMeowing, setIsMeowing] = useState(false);
  const [quentinReaction, setQuentinReaction] = useState<string | null>(null);

  const quentinQuotes = [
    "Lincoln, hush! The connoisseurs are admiring the deckled edges!",
    "I said NO meowing, you cheeky ginger rascal!",
    "One more 'meowwww' and you're going into the towel burrito with Harry!",
    "At least meow in a muted pastel tone, Lincoln...",
    "Quentin pinches the bridge of his spectacles in defeat.",
  ];

  const handleLincolnMeow = () => {
    setIsMeowing(true);
    playLincolnMeow();
    setMeowCount((prev) => prev + 1);

    const randomReaction = quentinQuotes[meowCount % quentinQuotes.length];
    setQuentinReaction(randomReaction);

    setTimeout(() => {
      setIsMeowing(false);
    }, 750);
  };

  return (
    <div className="mx-margin mb-space-lg bg-gradient-to-br from-[#ffdbcf]/50 via-[#ffffff] to-[#fdbe50]/30 rounded-2xl p-space-md shadow-md border border-[#dec0b7] relative overflow-hidden">
      {/* Decorative corner stamp */}
      <div className="absolute top-2 right-3 text-[#9f3c16]/20 font-headline-lg select-none text-[32px] pointer-events-none">
        🐾
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#9f3c16] text-[18px]">
            campaign
          </span>
          <span className="font-label-sm text-[11px] text-[#9f3c16] uppercase font-bold tracking-wider">
            Gallery Etiquette • Rule No. 1
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#7e5700] bg-[#ffdead] px-2 py-0.5 rounded-full font-bold">
          {meowCount} Defiant Meows
        </span>
      </div>

      {/* Story Dialogue Box */}
      <div className="flex flex-col gap-2 bg-[#ffffff]/90 p-3.5 rounded-xl border border-[#dec0b7]/50 shadow-sm">
        {/* Quentin */}
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#390c00] text-white flex items-center justify-center shrink-0 text-[14px] shadow-sm">
            🧐
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-[11px] text-[#822801] font-bold">
              Quentin (Head Curator)
            </span>
            <p className="font-body-md text-[13px] text-[#111c2d] italic">
              "No meowwing you lot."
            </p>
          </div>
        </div>

        {/* Lincoln */}
        <div className="flex items-start gap-2.5 pl-4 border-l-2 border-[#9f3c16]/30">
          <div
            className={`w-9 h-9 rounded-full bg-[#fdbe50] text-[#714d00] flex items-center justify-center shrink-0 text-[16px] shadow-sm transition-transform duration-200 ${
              isMeowing ? 'scale-125 rotate-6' : 'scale-100'
            }`}
          >
            🐱
          </div>
          <div className="flex flex-col flex-1">
            <span className="font-label-sm text-[11px] text-[#714d00] font-bold flex items-center gap-1">
              <span>Lincoln</span>
              <span className="text-[10px] text-[#8a726a] font-normal">(looks right up)</span>
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`font-headline-md text-[16px] text-[#9f3c16] font-bold transition-all ${
                  isMeowing ? 'scale-110 text-[#bf542c]' : ''
                }`}
              >
                'meowwww'
              </span>
              {isMeowing && (
                <span className="text-[12px] animate-ping text-[#9f3c16]">♫</span>
              )}
            </div>
          </div>
        </div>

        {/* Quentin's live exasperation */}
        {quentinReaction && (
          <div className="mt-1 pt-1.5 border-t border-[#dec0b7]/30 text-[11px] text-[#822801] italic flex items-center gap-1.5 bg-[#f0f3ff]/60 px-2 py-1 rounded-lg">
            <span className="material-symbols-outlined text-[14px] text-[#9f3c16]">
              sentiment_dissatisfied
            </span>
            <span>Quentin: "{quentinReaction}"</span>
          </div>
        )}
      </div>

      {/* Interactive Actions */}
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleLincolnMeow}
          className="flex-1 py-2.5 px-3 bg-[#9f3c16] hover:bg-[#bf542c] active:scale-95 text-white rounded-xl font-label-md text-[12px] font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">volume_up</span>
          <span>Tap to Meow with Lincoln</span>
          <span className="text-[13px]">🐾</span>
        </button>

        {onSignGuestbookWithMeow && (
          <button
            onClick={() => {
              playGentleChime();
              onSignGuestbookWithMeow();
            }}
            className="py-2.5 px-3 bg-[#ffffff] hover:bg-[#f0f3ff] text-[#111c2d] rounded-xl font-label-sm text-[11px] font-medium border border-[#dec0b7] shadow-sm transition-all active:scale-95"
            title="Log Lincoln's Meow in Guestbook"
          >
            Log in Guestbook
          </button>
        )}
      </div>

      {/* Book Cover Art & Chapter Reader Access */}
      {(onViewBookCover || onReadBookChapter) && (
        <div className="mt-2.5 pt-2.5 border-t border-[#dec0b7]/50 flex items-center gap-2">
          {onViewBookCover && (
            <button
              onClick={() => {
                playGentleChime();
                onViewBookCover();
              }}
              className="flex-1 py-2 px-3 bg-[#ffffff] hover:bg-[#fff6f2] text-[#9f3c16] rounded-xl font-label-sm text-[11px] font-bold border border-[#9f3c16]/30 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">auto_stories</span>
              <span>View Book Cover Art</span>
            </button>
          )}
          {onReadBookChapter && (
            <button
              onClick={() => {
                playGentleChime();
                onReadBookChapter();
              }}
              className="py-2 px-3 bg-[#fdbe50]/30 hover:bg-[#fdbe50]/50 text-[#714d00] rounded-xl font-label-sm text-[11px] font-bold border border-[#f5dc99] flex items-center gap-1 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">menu_book</span>
              <span>Read Ch. 1</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
