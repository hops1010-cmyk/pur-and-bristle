import React, { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { playGentleChime, startCalmingAudio, stopCalmingAudio } from '../utils/audio';
import { SmartImage } from './common/SmartImage';
import { shareContent } from '../utils/share';

interface ArtworkDetailScreenProps {
  artwork: Artwork;
  onBack: () => void;
  onOpenInRoom: () => void;
  onOpenZoom: () => void;
  onOrderPrint: (formatName: string, price: number) => void;
  onToggleSave: (artworkId: string) => void;
  isSaved: boolean;
  onOpenBookExperience?: () => void;
  onOpenBookStudio?: () => void;
}

export const ArtworkDetailScreen: React.FC<ArtworkDetailScreenProps> = ({
  artwork,
  onBack,
  onOpenInRoom,
  onOpenZoom,
  onOrderPrint,
  onToggleSave,
  isSaved,
  onOpenBookExperience,
  onOpenBookStudio,
}) => {
  const [selectedFormat, setSelectedFormat] = useState(artwork.formats[1] || artwork.formats[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioTimer, setAudioTimer] = useState('0:00');
  const [activeHueToast, setActiveHueToast] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const handleShare = async () => {
    playGentleChime();
    const shareText = `"${artwork.title}" by ${artwork.artistName}\n${artwork.collection} • ${artwork.collectionNumber}\n\n${artwork.mediumDetails}\n\n"${artwork.description}"`;
    const shareTitle = `${artwork.title} by ${artwork.artistName} | Purr & Bristle`;

    const result = await shareContent({
      title: shareTitle,
      text: shareText,
    });
    setShareFeedback(result.message);
    setTimeout(() => setShareFeedback(null), 3500);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      startCalmingAudio();
      let seconds = 0;
      interval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        setAudioTimer(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
      }, 1000);
    } else {
      stopCalmingAudio();
    }
    return () => {
      clearInterval(interval);
      stopCalmingAudio();
    };
  }, [isPlayingAudio]);

  const toggleAudio = () => {
    playGentleChime();
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleHueClick = (hue: { name: string; label: string; description: string }) => {
    playGentleChime();
    setActiveHueToast(`${hue.name} (${hue.label}): ${hue.description}`);
    setTimeout(() => {
      setActiveHueToast(null);
    }, 3800);
  };

  return (
    <div className="flex flex-col w-full pb-safe bg-[#f9f9ff] min-h-screen max-w-xl mx-auto pt-2">
      {/* Immersive Artwork Stage */}
      <div className="relative w-full px-margin pt-space-xs">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#f0f3ff] border border-[#d8e3fb]/60">
          {/* Framed Artwork Canvas */}
          <div className="relative aspect-square w-full">
            <div className="w-full h-full cursor-pointer" onClick={onOpenZoom}>
              <SmartImage
                className="w-full h-full object-cover select-none"
                alt={artwork.title}
                src={artwork.image}
                fallbackIcon="palette"
                fallbackText={artwork.title}
              />
            </div>

            {/* Subtle Canvas Vignette Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#263143]/50 via-transparent to-transparent pointer-events-none" />

            {/* Ambient Starlight Glow Floating Badge */}
            <div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-[#ffffff]/85 backdrop-blur-md shadow-sm">
              <span
                className="material-symbols-outlined text-[15px] text-[#7e5700]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="font-label-sm text-[11px] text-[#111c2d] font-semibold">
                Curator's Spotlight
              </span>
            </div>

            {/* Floating Quick Tools */}
            <div className="absolute top-space-sm right-space-sm flex flex-col gap-space-xs">
              <button
                aria-label="View in Room Augmented Reality"
                onClick={onOpenInRoom}
                className="h-9 px-space-sm rounded-full bg-[#ffffff]/95 backdrop-blur-md text-[#111c2d] hover:text-[#9f3c16] flex items-center gap-1 shadow-md active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px] text-[#9f3c16]">
                  view_in_ar
                </span>
                <span className="font-label-sm text-[11px] font-semibold">View in Room</span>
              </button>
              {onOpenBookExperience && (
                <button
                  aria-label="Read 3D Storybook"
                  onClick={onOpenBookExperience}
                  className="h-9 px-space-sm rounded-full bg-[#ffffff]/95 backdrop-blur-md text-[#111c2d] hover:text-[#9f3c16] flex items-center gap-1 shadow-md active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#9f3c16]">
                    menu_book
                  </span>
                  <span className="font-label-sm text-[11px] font-semibold">Read Book</span>
                </button>
              )}
              <button
                aria-label="Share Artwork to Social Media"
                onClick={handleShare}
                className="h-9 px-space-sm rounded-full bg-[#ffffff]/95 backdrop-blur-md text-[#111c2d] hover:text-[#9f3c16] flex items-center gap-1 shadow-md active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px] text-[#9f3c16]">
                  share
                </span>
                <span className="font-label-sm text-[11px] font-semibold">Share</span>
              </button>
            </div>

            {/* Bottom Controls Overlay */}
            <div className="absolute bottom-space-sm inset-x-space-sm flex items-center justify-between pointer-events-none">
              <button
                onClick={onOpenZoom}
                className="pointer-events-auto flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-[#263143]/80 text-[#ecf1ff] backdrop-blur-md shadow-sm active:scale-95 transition-transform hover:bg-[#263143]"
              >
                <span className="material-symbols-outlined text-[14px]">pinch</span>
                <span className="font-label-sm text-[11px]">Pinch to zoom • 4K Archival</span>
              </button>
              <div className="flex items-center gap-1.5 pointer-events-auto">
                <button
                  aria-label="Share Artwork"
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-[#ffffff]/95 text-[#57423b] hover:text-[#9f3c16] flex items-center justify-center shadow-md active:scale-90 transition-transform"
                  title="Share artwork details"
                >
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
                <button
                  aria-label="Save to Favourites"
                  onClick={() => {
                    playGentleChime();
                    onToggleSave(artwork.id);
                  }}
                  className={`w-10 h-10 rounded-full bg-[#ffffff]/95 flex items-center justify-center shadow-md active:scale-90 transition-transform ${
                    isSaved ? 'text-[#9f3c16]' : 'text-[#57423b]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content & Artwork Information */}
      <div className="px-margin flex flex-col gap-space-lg pt-space-md pb-space-xl">
        {/* Title and Metadata Section */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-[12px] text-[#7e5700] uppercase tracking-wider font-semibold">
              {artwork.collection} • {artwork.collectionNumber}
            </span>
            <div className="flex items-center gap-1 text-[#446349]">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="font-label-sm text-[11px] font-semibold">Verified Original</span>
            </div>
          </div>

          <h1 className="font-headline-lg text-[28px] text-[#111c2d] font-semibold leading-tight">
            {artwork.title}
          </h1>

          {/* Artist Row */}
          <div className="flex items-center justify-between pt-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="relative w-11 h-11 rounded-full bg-[#bf542c] p-0.5 overflow-hidden shadow-sm flex items-center justify-center shrink-0">
                <SmartImage
                  className="w-full h-full object-cover rounded-full"
                  alt={artwork.artistName}
                  src={artwork.artistAvatar}
                  fallbackIcon="person"
                  fallbackText={artwork.artistName}
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#fdbe50] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[10px] text-[#714d00]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    pets
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-label-lg text-[14px] text-[#111c2d] font-semibold">
                    {artwork.artistName}
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#9f3c16]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    pets
                  </span>
                </div>
                <span className="font-body-sm text-[12px] text-[#57423b]">
                  {artwork.artistLocation}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                playGentleChime();
                setIsFollowing(!isFollowing);
              }}
              className={`px-space-md py-1.5 rounded-full transition-all font-label-sm text-[11px] font-semibold active:scale-95 ${
                isFollowing
                  ? 'bg-[#9f3c16] text-white shadow-sm'
                  : 'bg-[#e7eeff] text-[#111c2d] hover:bg-[#d8e3fb]'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Medium & Dimensions Details Tag */}
          <div className="mt-space-xs p-space-sm rounded-xl bg-[#f0f3ff] flex items-start gap-space-sm border border-[#d8e3fb]/40">
            <span className="material-symbols-outlined text-[#7e5700] text-[20px] shrink-0 mt-0.5">
              brush
            </span>
            <p className="font-body-sm text-[12px] text-[#57423b] leading-relaxed">
              <strong className="font-semibold text-[#111c2d]">2024 Archival Masterpiece</strong> • {artwork.mediumDetails}
            </p>
          </div>

          {/* Special Hardcover Book Cover Showcase Card */}
          {(artwork.isBookCover || artwork.category === 'storybook') && (
            <div className="mt-space-sm p-4 rounded-2xl bg-gradient-to-br from-[#3a1306] via-[#63220e] to-[#3a1306] text-white shadow-lg border border-[#822801]/40 flex flex-col gap-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="bg-[#fdbe50] text-[#281900] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                  Official Hardcover Edition
                </span>
                <span className="text-[#dec0b7] text-[11px] font-mono font-semibold">
                  Vol. I • Gilded Foil
                </span>
              </div>
              <div>
                <h3 className="font-serif text-[17px] font-bold text-[#ffdbcf] leading-snug">
                  The Secret Life of Gallery Cats
                </h3>
                <p className="font-serif italic text-[12px] text-[#dec0b7] mt-0.5">
                  The complete illustrated chronicle of Quentin's strict salon rules and Lincoln's defiant meows.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                {onOpenBookExperience && (
                  <button
                    onClick={() => {
                      playGentleChime();
                      onOpenBookExperience();
                    }}
                    className="flex-1 py-2.5 px-3 bg-[#fdbe50] hover:bg-[#e8b654] text-[#281900] rounded-xl font-label-md text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    <span>Read 3D Hardcover Book</span>
                  </button>
                )}
                {onOpenBookStudio && (
                  <button
                    onClick={() => {
                      playGentleChime();
                      onOpenBookStudio();
                    }}
                    className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-[#ffdbcf] rounded-xl font-label-md text-[12px] font-semibold border border-white/20 flex items-center justify-center gap-1 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">draw</span>
                    <span>Cover Studio</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Curator Story Audio Guide */}
        <div className="p-space-md rounded-2xl bg-[#e7eeff] shadow-sm flex flex-col gap-space-sm relative overflow-hidden border border-[#d8e3fb]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#fdbe50]/30 via-transparent to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-full bg-[#fdbe50] text-[#714d00] flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[16px]">headphones</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-[13px] text-[#111c2d] font-semibold">
                  Curator Audio Journey
                </span>
                <span className="font-body-sm text-[11px] text-[#57423b]">
                  Narrated by {artwork.audioGuide.narrator}
                </span>
              </div>
            </div>
            <span className="font-label-sm text-[12px] text-[#7e5700] font-bold">
              {isPlayingAudio ? audioTimer : artwork.audioGuide.duration}
            </span>
          </div>

          {/* Sound Waveform & Play Trigger */}
          <div className="flex items-center gap-space-md pt-space-xs">
            <button
              aria-label="Play Audio Guide"
              onClick={toggleAudio}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0 ${
                isPlayingAudio ? 'bg-[#446349] text-white ring-2 ring-[#c8ecca]' : 'bg-[#9f3c16] text-white hover:bg-[#bf542c]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlayingAudio ? 'pause' : 'play_arrow'}
              </span>
            </button>

            {/* Simulated Organic Watercolor Waveform Bars */}
            <div className="flex-1 flex items-center gap-1.5 h-9 px-space-xs">
              {[3, 6, 8, 4, 7, 5, 9, 6, 4, 7, 3, 5, 8, 3, 2].map((height, idx) => {
                const dynamicHeight = isPlayingAudio
                  ? `${Math.max(8, ((idx * 6 + Math.floor(Math.random() * 8)) % 28) + 6)}px`
                  : `${height * 3}px`;
                return (
                  <div
                    key={idx}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isPlayingAudio
                        ? 'bg-[#9f3c16]'
                        : idx < 4
                        ? 'bg-[#9f3c16]'
                        : 'bg-[#9f3c16]/30'
                    }`}
                    style={{ height: dynamicHeight }}
                  />
                );
              })}
            </div>
          </div>

          {isPlayingAudio && (
            <p className="font-body-sm text-[11px] text-[#446349] italic animate-pulse">
              ♫ Soothing feline purr and gentle French harp melody playing...
            </p>
          )}
        </div>

        {/* Curator Story Notes */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[#7e5700] text-[20px]">
              auto_stories
            </span>
            <h2 className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">
              Curator's Notes
            </h2>
          </div>
          <p className="font-body-md text-[14px] text-[#57423b] leading-relaxed">
            {artwork.curatorNotes}
          </p>
        </div>

        {/* Color Harmony Palette Swatches */}
        <div className="flex flex-col gap-space-sm p-space-md rounded-2xl bg-[#f0f3ff] shadow-sm border border-[#d8e3fb]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-[#446349]">palette</span>
              <span className="font-label-lg text-[14px] text-[#111c2d] font-semibold">
                Pigment Palette
              </span>
            </div>
            <span className="font-label-sm text-[11px] text-[#57423b]">
              {artwork.pigments.length} Natural Hues (Tap to inspect)
            </span>
          </div>

          <div className="grid grid-cols-5 gap-space-xs pt-space-xs">
            {artwork.pigments.map((hue) => (
              <div
                key={hue.name}
                onClick={() => handleHueClick(hue)}
                className="flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform"
              >
                <div
                  className="w-full aspect-square rounded-xl shadow-sm flex items-center justify-center text-white transition-transform group-hover:scale-105 border border-black/10"
                  style={{ backgroundColor: hue.hex }}
                >
                  <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">
                    lens
                  </span>
                </div>
                <span className="font-label-sm text-[10px] text-[#57423b] text-center truncate w-full font-medium">
                  {hue.name}
                </span>
              </div>
            ))}
          </div>

          {/* Active Hue Toast banner */}
          {activeHueToast && (
            <div className="mt-1 p-2.5 rounded-xl bg-[#ffffff] border border-[#9f3c16]/30 text-[#111c2d] font-label-sm text-[11px] shadow-sm animate-fade-in">
              <span className="font-bold text-[#9f3c16]">🎨 Pigment Story:</span> {activeHueToast}
            </div>
          )}
        </div>

        {/* Collector Edition & Certificate Details Card */}
        <div className="p-space-md rounded-2xl bg-[#ffffff] shadow-sm flex items-center justify-between border border-[#d8e3fb]/60">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-[#c8ecca] text-[#03210d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-[14px] text-[#111c2d] font-semibold">
                Artist Certified Archival
              </span>
              <span className="font-body-sm text-[12px] text-[#57423b]">
                Includes Embossed Wax Seal &amp; Numbered Certificate
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#dec0b7]">info</span>
        </div>

        {/* Size Format Selector & Ordering Section */}
        <div className="flex flex-col gap-space-sm pt-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">
              Select Print Format
            </span>
            <button
              onClick={() => onOpenInRoom()}
              className="font-label-sm text-[11px] text-[#9f3c16] flex items-center gap-0.5 hover:underline font-bold"
            >
              <span>Framing Guide</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          {/* Size Chips Group */}
          <div className="grid grid-cols-2 gap-space-sm">
            {artwork.formats.map((fmt) => {
              const isSelected = selectedFormat.id === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => {
                    playGentleChime();
                    setSelectedFormat(fmt);
                  }}
                  className={`p-space-sm rounded-2xl text-left flex flex-col gap-1 transition-all active:scale-[0.98] border ${
                    isSelected
                      ? 'bg-[#fdbe50]/20 border-[#9f3c16] shadow-sm ring-1 ring-[#9f3c16]'
                      : 'bg-[#f0f3ff] border-transparent hover:bg-[#e7eeff]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="font-label-lg text-[13px] font-semibold text-[#111c2d]">
                        {fmt.name}
                      </span>
                      {fmt.popular && (
                        <span className="px-1.5 py-0.5 rounded-full bg-[#9f3c16] text-white text-[9px] font-bold uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </div>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isSelected
                          ? 'bg-[#9f3c16] text-white'
                          : 'bg-[#dec0b7]/40'
                      }`}
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-[12px]">check</span>
                      )}
                    </span>
                  </div>
                  <span className="font-body-sm text-[11px] text-[#57423b]">
                    {fmt.size}
                  </span>
                  <span className="font-headline-sm text-[18px] text-[#9f3c16] pt-0.5 font-bold">
                    ${fmt.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Purchase Action Buttons */}
        <div className="flex flex-col gap-space-xs pt-space-xs pb-4">
          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => onOrderPrint(selectedFormat.name, selectedFormat.price)}
              className="flex-1 h-14 py-3.5 px-space-lg rounded-xl bg-[#9f3c16] hover:bg-[#bf542c] text-white font-headline-sm text-[16px] font-semibold shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>Order Museum Print (${selectedFormat.price})</span>
            </button>
            <button
              aria-label="Share Artwork to Social Media"
              onClick={handleShare}
              className="w-14 h-14 rounded-xl flex items-center justify-center active:scale-95 shadow-sm border transition-colors bg-[#e7eeff] text-[#111c2d] hover:text-[#9f3c16] hover:bg-[#d8e3fb] border-[#d8e3fb]"
              title="Share artwork details to social media"
            >
              <span className="material-symbols-outlined text-[22px]">share</span>
            </button>
            <button
              onClick={() => {
                playGentleChime();
                onToggleSave(artwork.id);
              }}
              className={`w-14 h-14 rounded-xl flex items-center justify-center active:scale-95 shadow-sm border transition-colors ${
                isSaved
                  ? 'bg-[#ffdbcf] text-[#9f3c16] border-[#9f3c16]/30'
                  : 'bg-[#e7eeff] text-[#111c2d] hover:text-[#9f3c16] border-[#d8e3fb]'
              }`}
              title="Add to Collection Folder"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
              >
                bookmark_add
              </span>
            </button>
          </div>

          {/* Social Media Share Toast Feedback */}
          {shareFeedback && (
            <div className="p-3 rounded-xl bg-[#c8ecca] border border-[#446349]/30 text-[#03210d] font-label-md text-[12px] flex items-center justify-between shadow-md transition-all animate-bounce">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#446349]">
                  check_circle
                </span>
                <span>{shareFeedback}</span>
              </div>
              <button
                onClick={() => setShareFeedback(null)}
                className="font-bold text-[#03210d] px-1"
              >
                ✕
              </button>
            </div>
          )}

          <p className="font-label-sm text-[11px] text-[#57423b] text-center pt-space-xs">
            🌿 Printed with archival vegetable inks • Shipped in biodegradable flat-mailers
          </p>
        </div>
      </div>
    </div>
  );
};
