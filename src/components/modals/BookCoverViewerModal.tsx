import React, { useState, useRef } from 'react';
import { Artwork } from '../../types';
import { playGentleChime, playLincolnMeow } from '../../utils/audio';
import { shareContent } from '../../utils/share';
import { SmartImage } from '../common/SmartImage';
import { storage, STORAGE_KEYS } from '../../utils/storage';

interface BookCoverViewerModalProps {
  artwork: Artwork;
  onClose: () => void;
  onOrderBook: (formatName: string, price: number) => void;
  onOpenStudio?: () => void;
}

type BookTab = 'cover' | 'chapter1' | 'chapter2' | 'chapter3' | 'back';

export const BookCoverViewerModal: React.FC<BookCoverViewerModalProps> = ({
  artwork,
  onClose,
  onOrderBook,
  onOpenStudio,
}) => {
  const [activeTab, setActiveTab] = useState<BookTab>('cover');
  const [hasRibbonBookmark, setHasRibbonBookmark] = useState<boolean>(() =>
    storage.getItem<boolean>('purr_book_ribbon_bookmarked', false)
  );
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [isLincolnMeowing, setIsLincolnMeowing] = useState(false);

  // 3D tilt tracking state
  const [tilt, setTilt] = useState<{ x: number; y: number; shineX: number; shineY: number }>({
    x: 0,
    y: 0,
    shineX: 50,
    shineY: 50,
  });

  const bookCardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bookCardRef.current) return;
    const rect = bookCardRef.current.getBoundingClientRect();
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

  const toggleRibbonBookmark = () => {
    playGentleChime();
    const next = !hasRibbonBookmark;
    setHasRibbonBookmark(next);
    storage.setItem('purr_book_ribbon_bookmarked', next);
  };

  const handlePlayMeow = () => {
    setIsLincolnMeowing(true);
    playLincolnMeow();
    setTimeout(() => setIsLincolnMeowing(false), 900);
  };

  const handleShareBook = async () => {
    playGentleChime();
    const result = await shareContent({
      title: 'The Secret Life of Gallery Cats — Official Hardcover Edition',
      text: 'Discover the illustrated chronicles of Quentin the curator and Lincoln the defiant cat at Purr & Bristle Gallery!',
    });
    setShareFeedback(result.message);
    setTimeout(() => setShareFeedback(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c1421]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#ffffff] rounded-3xl shadow-2xl overflow-hidden border border-[#dec0b7] my-auto flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#3a1306] via-[#63220e] to-[#3a1306] text-white flex items-center justify-between shrink-0 border-b border-[#822801]/30">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#fdbe50]">
              menu_book
            </span>
            <div>
              <h3 className="font-headline-sm text-[16px] font-bold text-[#ffdbcf] leading-tight">
                Storybook Hardcover Experience
              </h3>
              <p className="font-label-sm text-[11px] text-[#dec0b7]">
                Deluxe Clothbound Edition • Vol. I
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShareBook}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#ffdbcf] flex items-center justify-center transition-all"
              title="Share Book Cover Art"
            >
              <span className="material-symbols-outlined text-[17px]">share</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              aria-label="Close Book Experience"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Share Feedback Toast */}
        {shareFeedback && (
          <div className="bg-[#281900] text-[#fdbe50] text-[12px] px-4 py-2 font-medium flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">info</span>
              {shareFeedback}
            </span>
            <button onClick={() => setShareFeedback(null)} className="text-[#fdbe50]/70 hover:text-[#fdbe50]">✕</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-[#e7eeff] bg-[#f9f9ff] px-2 py-1.5 overflow-x-auto no-scrollbar gap-1 shrink-0">
          {[
            { id: 'cover', label: 'Hardcover & Foil', icon: 'auto_awesome' },
            { id: 'chapter1', label: 'Ch. 1: Lincoln’s Meow', icon: 'campaign' },
            { id: 'chapter2', label: 'Ch. 2: Stargazers', icon: 'nightlight' },
            { id: 'chapter3', label: 'Ch. 3: Towel Burrito', icon: 'bathtub' },
            { id: 'back', label: 'Back Cover Reviews', icon: 'reviews' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playGentleChime();
                setActiveTab(tab.id as BookTab);
              }}
              className={`px-3 py-1.5 rounded-xl font-label-sm text-[11px] font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#9f3c16] text-white shadow-sm'
                  : 'text-[#57423b] hover:bg-[#ffdbcf]/50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-gradient-to-b from-[#f9f9ff] to-[#f0f3ff]">
          {/* TAB 1: 3D HARDCOVER WITH TILT & SPECULAR FOIL */}
          {activeTab === 'cover' && (
            <div className="flex flex-col items-center">
              {/* Interactive 3D Perspective Card Container */}
              <div
                className="relative perspective-[1000px] py-4 w-full flex justify-center cursor-pointer select-none"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  ref={bookCardRef}
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: 'transform 0.15s ease-out',
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative w-64 sm:w-72 aspect-[3/4] rounded-r-2xl rounded-l-md shadow-[0_20px_40px_-10px_rgba(78,28,12,0.45),0_0_0_1px_rgba(159,60,22,0.15)] overflow-hidden bg-[#531810]"
                >
                  {/* Spine edge illusion on the left */}
                  <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-[#2e0b06] via-[#48140c] to-[#6d2015] border-r border-[#8d2a1c]/60 z-20 flex flex-col justify-between py-6 items-center shadow-inner">
                    <span className="text-[#fdbe50]/70 text-[9px] font-serif font-bold tracking-widest [writing-mode:vertical-rl] rotate-180">
                      PURR & BRISTLE PRESS
                    </span>
                    <span className="text-[#fdbe50] text-[12px]">🐾</span>
                    <span className="text-[#fdbe50]/70 text-[9px] font-mono [writing-mode:vertical-rl] rotate-180">
                      VOL. I
                    </span>
                  </div>

                  {/* Main Book Cover Artwork */}
                  <div className="absolute inset-0 pl-6 bg-[#63220e]">
                    <SmartImage
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                      fallbackIcon="menu_book"
                      fallbackText={artwork.title}
                    />

                    {/* Rich clothbound grain texture overlay */}
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                      style={{
                        backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                        backgroundSize: '4px 4px',
                      }}
                    />

                    {/* Gold Foil Shimmer Specular Light Beam */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                      style={{
                        background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(253, 190, 80, 0.45) 0%, rgba(255, 240, 200, 0.2) 28%, transparent 65%)`,
                        mixBlendMode: 'overlay',
                      }}
                    />

                    {/* Gold Filigree Embossed Framing */}
                    <div className="absolute inset-2 border-2 border-[#fdbe50]/80 rounded-r-xl pointer-events-none shadow-[inset_0_0_8px_rgba(253,190,80,0.5)]">
                      <div className="absolute top-1.5 left-1.5 text-[10px] text-[#fdbe50]">❦</div>
                      <div className="absolute top-1.5 right-1.5 text-[10px] text-[#fdbe50]">❦</div>
                      <div className="absolute bottom-1.5 left-1.5 text-[10px] text-[#fdbe50]">❦</div>
                      <div className="absolute bottom-1.5 right-1.5 text-[10px] text-[#fdbe50]">❦</div>
                    </div>

                    {/* Top Gold Foil Title Plate */}
                    <div className="absolute top-4 inset-x-9 text-center bg-[#280c05]/85 backdrop-blur-sm border border-[#fdbe50]/70 py-1.5 px-2 rounded-lg shadow-md pointer-events-none">
                      <span className="block font-serif text-[11px] font-bold text-[#fdbe50] tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        The Secret Life
                      </span>
                      <span className="block font-serif text-[9px] text-[#ffdbcf] tracking-wide">
                        OF GALLERY CATS
                      </span>
                    </div>

                    {/* Bottom Author Foil Plate */}
                    <div className="absolute bottom-4 inset-x-9 text-center bg-[#280c05]/85 backdrop-blur-sm border border-[#fdbe50]/70 py-1 px-2 rounded-lg shadow-md pointer-events-none">
                      <span className="font-serif text-[9px] text-[#fdbe50] tracking-wider uppercase font-semibold">
                        Quentin & Lincoln the Defiant
                      </span>
                    </div>
                  </div>

                  {/* Satin Ribbon Bookmark dangles below the book */}
                  {hasRibbonBookmark && (
                    <div className="absolute -bottom-6 left-16 w-3.5 h-12 bg-gradient-to-b from-[#b22222] to-[#800000] shadow-md z-30 rounded-b-sm border-x border-[#ff69b4]/20 flex items-end justify-center pb-1">
                      <span className="text-[7px] text-[#fdbe50]">♦</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Ribbon & Tilt Hint */}
              <div className="mt-3 flex items-center justify-between w-full max-w-sm px-2 text-[12px] text-[#57423b]">
                <span className="flex items-center gap-1 text-[11px] text-[#7e5700]">
                  <span className="material-symbols-outlined text-[15px]">touch_app</span>
                  Tilt pointer to shine 24K gold foil
                </span>
                <button
                  onClick={toggleRibbonBookmark}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                    hasRibbonBookmark
                      ? 'bg-[#ffebee] text-[#9f3c16] border-[#ffcdd2]'
                      : 'bg-white text-[#57423b] border-[#d8e3fb] hover:bg-[#f0f3ff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {hasRibbonBookmark ? 'bookmark_added' : 'bookmark_add'}
                  </span>
                  {hasRibbonBookmark ? 'Ribbon Placed' : 'Place Ribbon'}
                </button>
              </div>

              {/* Book Metadata Sheet */}
              <div className="mt-4 w-full bg-white rounded-2xl p-4 border border-[#dec0b7]/60 shadow-sm flex flex-col gap-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#f0f3ff]">
                  <span className="font-label-md text-[12px] text-[#9f3c16] font-bold">
                    Colophon & Specifications
                  </span>
                  <span className="font-mono text-[11px] text-[#57423b] bg-[#f0f3ff] px-2 py-0.5 rounded-md font-semibold">
                    ISBN 978-0-PURR-2024
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <div>
                    <span className="text-[#8a726a] block text-[11px]">Binding:</span>
                    <span className="font-semibold text-[#111c2d]">Linen Hardcover + 24K Foil</span>
                  </div>
                  <div>
                    <span className="text-[#8a726a] block text-[11px]">Paper Stock:</span>
                    <span className="font-semibold text-[#111c2d]">170gsm Deckled Munken Pure</span>
                  </div>
                  <div>
                    <span className="text-[#8a726a] block text-[11px]">Pagination:</span>
                    <span className="font-semibold text-[#111c2d]">144 Color Plates + Slipcase</span>
                  </div>
                  <div>
                    <span className="text-[#8a726a] block text-[11px]">Edition:</span>
                    <span className="font-semibold text-[#111c2d]">First Limited Print (500 copies)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHAPTER 1: THE SALON ETIQUETTE & MEOW DIALOGUE */}
          {activeTab === 'chapter1' && (
            <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-[#dec0b7]/60 shadow-sm">
              <div className="text-center pb-3 border-b border-[#dec0b7]/40">
                <span className="font-serif text-[11px] uppercase tracking-widest text-[#9f3c16] font-bold">
                  Chapter I
                </span>
                <h4 className="font-serif text-[20px] font-bold text-[#2b1009] mt-0.5">
                  The Forbidden Meow of Salon 1
                </h4>
                <p className="font-label-sm text-[11px] text-[#8a726a] italic">
                  Recorded in the High Bookshelf Archives by Quentin
                </p>
              </div>

              {/* Story text with drop cap */}
              <div className="font-serif text-[14px] leading-relaxed text-[#2c201d] space-y-3">
                <p>
                  <span className="float-left text-4xl font-serif text-[#9f3c16] pr-2.5 pt-1 font-bold leading-none">
                    T
                  </span>
                  he afternoon sunlight slanted through the stained-glass arches of the Grand Gallery,
                  illuminating dozens of polished cedar frames. In the velvet hush of the vernissage,
                  patrons spoke only in hushed whispers, mindful of the delicate gold leaf on the
                  cornices.
                </p>
                <p>
                  It was at this precise juncture that Quentin adjusted his tortoiseshell spectacles,
                  glanced sternly over his wool waistcoat, and issued the house directive:
                </p>
              </div>

              {/* Interactive Story Callout */}
              <div className="bg-[#fff6f2] border-l-4 border-[#9f3c16] p-4 rounded-r-xl shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] font-bold text-[#822801]">
                    Curator’s Decree:
                  </span>
                  <span className="text-[11px] text-[#8a726a]">Atelier 4, 3:14 PM</span>
                </div>
                <blockquote className="font-serif text-[15px] italic text-[#111c2d]">
                  "No meowwing you lot," says Quentin.
                </blockquote>
                <div className="pt-2 border-t border-[#dec0b7]/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[20px]">🐱</span>
                    <span className="font-serif text-[14px] font-bold text-[#9f3c16]">
                      Lincoln looks up, 'meowwww'
                    </span>
                  </div>
                  <button
                    onClick={handlePlayMeow}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95 ${
                      isLincolnMeowing
                        ? 'bg-[#fdbe50] text-[#281900] animate-bounce'
                        : 'bg-[#9f3c16] text-white hover:bg-[#bf542c]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">volume_up</span>
                    <span>{isLincolnMeowing ? 'Meowing!' : 'Play Meow'}</span>
                  </button>
                </div>
              </div>

              <div className="font-serif text-[14px] leading-relaxed text-[#2c201d]">
                <p>
                  The sound was neither shrill nor timid; it was a pure, resonant tenor that bounced
                  harmoniously against the 18th-century plaster moldings. Three art critics paused mid-sip,
                  smiled warmly, and promptly offered the ginger tabby their highest ratings.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CHAPTER 2: STARGAZERS ON MONTMARTRE */}
          {activeTab === 'chapter2' && (
            <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-[#dec0b7]/60 shadow-sm">
              <div className="text-center pb-3 border-b border-[#dec0b7]/40">
                <span className="font-serif text-[11px] uppercase tracking-widest text-[#1a2d52] font-bold">
                  Chapter II
                </span>
                <h4 className="font-serif text-[20px] font-bold text-[#111c2d] mt-0.5">
                  Telescopes Above Belleville
                </h4>
                <p className="font-label-sm text-[11px] text-[#8a726a] italic">
                  Chronicles of Henri Tux & The Rooftop Guild
                </p>
              </div>

              <div className="font-serif text-[14px] leading-relaxed text-[#2c201d] space-y-3">
                <p>
                  <span className="float-left text-4xl font-serif text-[#1a2d52] pr-2.5 pt-1 font-bold leading-none">
                    W
                  </span>
                  hen the Paris bells tolled midnight, the studio lights were extinguished, leaving only
                  the sapphire blue glow of the starlight. Henri Tux led the expedition to the copper
                  roof tiles.
                </p>
                <p>
                  Through the polished brass lens of the telescope, they searched not for distant galaxies,
                  but for the great Celestial Fish constellation that swims endlessly across the Orion nebula.
                </p>
              </div>

              <div className="bg-[#f0f3ff] p-3.5 rounded-xl border border-[#d8e3fb] flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#1a2d52]">
                  telescope
                </span>
                <div className="flex-1 text-[12px]">
                  <span className="font-bold text-[#1a2d52] block">Nocturne Palette Discovery</span>
                  <span className="text-[#57423b]">
                    French Ultramarine layered with pulverized lapis lazuli creates the silent depth of Montmartre.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CHAPTER 3: THE TOWEL BURRITO */}
          {activeTab === 'chapter3' && (
            <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-[#dec0b7]/60 shadow-sm">
              <div className="text-center pb-3 border-b border-[#dec0b7]/40">
                <span className="font-serif text-[11px] uppercase tracking-widest text-[#7e5700] font-bold">
                  Chapter III
                </span>
                <h4 className="font-serif text-[20px] font-bold text-[#2b1009] mt-0.5">
                  The Great Towel Burrito Protocol
                </h4>
                <p className="font-label-sm text-[11px] text-[#8a726a] italic">
                  Harry’s Water Tolerance: DEFCON MILD HISS (2%)
                </p>
              </div>

              <div className="font-serif text-[14px] leading-relaxed text-[#2c201d] space-y-3">
                <p>
                  <span className="float-left text-4xl font-serif text-[#7e5700] pr-2.5 pt-1 font-bold leading-none">
                    B
                  </span>
                  athing a feline connoisseur is an art form comparable to restoring a 16th-century fresco
                  in the pouring rain. When Harry approached the marble clawfoot tub, his tail assumed the
                  posture of an inverted question mark.
                </p>
                <p>
                  Only through the sacred ancient technique—the Egyptian Linen Wrap, known colloquially
                  as the "Towel Burrito"—could dignity and ear tufts be preserved simultaneously.
                </p>
              </div>

              <div className="bg-[#fff9eb] border border-[#f5dc99] p-3 rounded-xl flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="text-[18px]">🌯</span>
                  <span className="font-bold text-[#714d00]">Calming Burrito Master Certification</span>
                </div>
                <span className="bg-[#fdbe50] text-[#281900] px-2 py-0.5 rounded-full text-[10px] font-bold">
                  100% Succeeded
                </span>
              </div>
            </div>
          )}

          {/* TAB 5: BACK COVER & REVIEWS */}
          {activeTab === 'back' && (
            <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl border border-[#dec0b7]/60 shadow-sm">
              <div className="text-center pb-3 border-b border-[#dec0b7]/40">
                <span className="font-serif text-[11px] uppercase tracking-widest text-[#9f3c16] font-bold">
                  Acclaim & Testimonials
                </span>
                <h4 className="font-serif text-[18px] font-bold text-[#111c2d] mt-0.5">
                  What Distinguished Felines Are Saying
                </h4>
              </div>

              <div className="space-y-3">
                {[
                  {
                    reviewer: 'Madame Calico',
                    title: 'Botanical Watercolor Virtuoso',
                    quote: '“A triumph of pastel, impudence, and sheer literary swagger. The chapters on rose water etiquette changed my life.”',
                    stars: 5,
                  },
                  {
                    reviewer: 'Barnaby McWhiskers',
                    title: 'British Shorthair Connoisseur',
                    quote: '“I knocked this hardcover volume off the high mahogany shelf twice to test its binding durability. It survived with pristine corners.”',
                    stars: 5,
                  },
                  {
                    reviewer: 'Professor Mittens',
                    title: 'Bodleian Ink Scholar',
                    quote: '“The gold leaf filigree is of superlative quality. Lincoln’s defiant meow is transcribed in perfect pitch.”',
                    stars: 5,
                  },
                ].map((review, i) => (
                  <div key={i} className="p-3 bg-[#f9f9ff] rounded-xl border border-[#e7eeff] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[12px] text-[#111c2d]">{review.reviewer}</span>
                      <span className="text-[#fdbe50] text-[12px]">{'★'.repeat(review.stars)}</span>
                    </div>
                    <span className="text-[10px] text-[#8a726a]">{review.title}</span>
                    <p className="font-serif italic text-[12px] text-[#57423b] mt-1 leading-snug">
                      {review.quote}
                    </p>
                  </div>
                ))}
              </div>

              {/* Barcode & publisher mark */}
              <div className="pt-3 border-t border-[#f0f3ff] flex items-center justify-between text-[11px] text-[#8a726a]">
                <div className="flex items-center gap-1.5 font-mono">
                  <span>||||||| | ||||| |||||||</span>
                  <span>978-0-2024</span>
                </div>
                <span className="font-serif">Purr & Bristle Gallery Press</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions Dock */}
        <div className="p-4 bg-white border-t border-[#e7eeff] flex items-center justify-between gap-2 shrink-0">
          {onOpenStudio && (
            <button
              onClick={() => {
                playGentleChime();
                onOpenStudio();
              }}
              className="py-2.5 px-3 bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#9f3c16] rounded-xl font-label-md text-[12px] font-bold border border-[#d8e3fb] flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">draw</span>
              <span>Design Custom Cover</span>
            </button>
          )}

          <button
            onClick={() => {
              playGentleChime();
              onOrderBook('Illustrated Hardcover Book (9" × 12")', 38);
            }}
            className="flex-1 py-3 px-4 bg-[#9f3c16] hover:bg-[#bf542c] text-white rounded-xl font-label-lg text-[13px] font-bold shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Order Hardcover Edition • $38</span>
          </button>
        </div>
      </div>
    </div>
  );
};
