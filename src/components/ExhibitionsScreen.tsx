import React, { useState, useEffect } from 'react';
import { SALONS, CAT_ARTISTS, ARTWORKS } from '../data/mockData';
import { playGentleChime, startCalmingAudio, stopCalmingAudio, isAudioPlaying } from '../utils/audio';
import { LincolnQuentinVignette } from './LincolnQuentinVignette';
import { SmartImage } from './common/SmartImage';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface ExhibitionsScreenProps {
  onSelectArtwork: (artworkId: string) => void;
  onSelectSalon: (theme: string) => void;
  onSelectTab: (tab: 'artworks' | 'cat-artists' | 'saved') => void;
  onOpenGuestbook: () => void;
  onToggleSave: (artworkId: string) => void;
  savedIds: Set<string>;
  onOpenBookExperience?: () => void;
}

export const ExhibitionsScreen: React.FC<ExhibitionsScreenProps> = ({
  onSelectArtwork,
  onSelectSalon,
  onSelectTab,
  onOpenGuestbook,
  onToggleSave,
  savedIds,
  onOpenBookExperience,
}) => {
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>(() =>
    storage.getItem<Record<string, boolean>>(STORAGE_KEYS.FOLLOWED_ARTISTS, {})
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showRsvpToast, setShowRsvpToast] = useState(false);

  useEffect(() => {
    storage.setItem(STORAGE_KEYS.FOLLOWED_ARTISTS, followingMap);
  }, [followingMap]);

  const heroArtwork = ARTWORKS.find((a) => a.id === 'artwork-fish') || ARTWORKS[2];
  const isHeroSaved = savedIds.has(heroArtwork.id);

  const toggleFollow = (artistId: string) => {
    playGentleChime();
    setFollowingMap((prev) => ({
      ...prev,
      [artistId]: !prev[artistId],
    }));
  };

  const handleAudioGuideToggle = () => {
    if (isAudioPlaying()) {
      stopCalmingAudio();
      setIsPlayingAudio(false);
    } else {
      startCalmingAudio();
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-xl mx-auto">
      {/* Interactive Whimsical Announcement Ribbon */}
      <div className="px-margin pt-space-xs pb-space-sm">
        <div
          onClick={() => {
            playGentleChime();
            setShowRsvpToast(true);
            setTimeout(() => setShowRsvpToast(false), 3500);
          }}
          className="bg-[#fdbe50]/30 hover:bg-[#fdbe50]/40 px-space-md py-2 rounded-full flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-space-xs min-w-0">
            <span
              className="material-symbols-outlined text-[18px] text-[#7e5700] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <p className="font-label-sm text-[11px] text-[#604100] truncate font-medium">
              New Vernissage: Summer Moon Garden opens tonight!
            </p>
          </div>
          <span className="font-label-sm text-[11px] text-[#9f3c16] font-bold ml-2 shrink-0 underline">
            RSVP
          </span>
        </div>

        {/* RSVP Toast banner */}
        {showRsvpToast && (
          <div className="mt-2 p-2.5 rounded-xl bg-[#c8ecca] text-[#03210d] font-label-md text-[12px] flex items-center justify-between shadow-md transition-all animate-bounce">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Your VIP Paw-Pass to the Summer Moon Garden is secured!</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowRsvpToast(false);
              }}
              className="font-bold text-[#2f4d35] px-1"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Hero Exhibition: The Little Masterpiece */}
      <section className="px-margin mb-space-lg">
        <div className="bg-[#ffffff] rounded-2xl overflow-hidden shadow-[0_8px_24px_-4px_rgba(78,52,46,0.08),0_2px_6px_-1px_rgba(78,52,46,0.04)] relative border border-[#d8e3fb]/60">
          {/* Image Container with soft mat framing */}
          <div className="relative w-full aspect-square bg-[#f0f3ff] p-space-xs cursor-pointer group" onClick={() => onSelectArtwork(heroArtwork.id)}>
            <SmartImage
              alt="Tabby cat artist in studio painting fish on canvas"
              className="w-full h-full object-cover rounded-xl group-hover:scale-[1.01] transition-transform duration-300"
              src={heroArtwork.image}
              fallbackIcon="palette"
              fallbackText={heroArtwork.title}
            />

            {/* Curator's Pick Floating Badge */}
            <div className="absolute top-space-md left-space-md bg-[#fdbe50] text-[#714d00] px-space-sm py-1 rounded-full flex items-center gap-1 shadow-md">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pets
              </span>
              <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider">
                Curator's Pick
              </span>
            </div>

            {/* Favorite Paw Toggle */}
            <button
              aria-label="Save exhibition"
              onClick={(e) => {
                e.stopPropagation();
                playGentleChime();
                onToggleSave(heroArtwork.id);
              }}
              className={`absolute top-space-md right-space-md w-10 h-10 rounded-full bg-[#ffffff]/90 backdrop-blur-md flex items-center justify-center shadow-sm transition-all active:scale-90 ${
                isHeroSaved ? 'text-[#9f3c16]' : 'text-[#57423b]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: isHeroSaved ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Hero Card Details */}
          <div className="p-space-md flex flex-col gap-space-xs bg-[#ffffff]">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-[12px] text-[#9f3c16] font-semibold tracking-wide">
                Solo Exhibition • Atelier 4
              </span>
              <span className="font-label-sm text-[11px] text-[#446349] flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#446349] inline-block animate-ping"></span>
                Live Now
              </span>
            </div>
            <h2 className="font-headline-md text-[22px] text-[#111c2d] font-semibold tracking-tight">
              The Little Masterpiece
            </h2>
            <p className="font-body-md text-[14px] text-[#57423b] line-clamp-2 leading-relaxed">
              Step inside Tabby Picasso's sun-drenched atelier. A playful exploration of ocean dreams, radiant pastels, and joyful paw-strokes on linen canvas.
            </p>
            <div className="pt-space-xs flex items-center gap-space-sm mt-1">
              <button
                onClick={() => onSelectArtwork(heroArtwork.id)}
                className="flex-1 bg-[#9f3c16] hover:bg-[#bf542c] text-white py-3 px-space-md rounded-xl font-label-lg text-[14px] font-semibold flex items-center justify-center gap-space-xs shadow-md active:scale-[0.98] transition-all"
              >
                <span>Explore Exhibition</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                aria-label="Audio Guide"
                onClick={handleAudioGuideToggle}
                className={`h-12 w-12 rounded-xl flex items-center justify-center active:scale-95 transition-all shadow-sm ${
                  isPlayingAudio
                    ? 'bg-[#c8ecca] text-[#03210d] ring-2 ring-[#446349]'
                    : 'bg-[#e7eeff] text-[#57423b] hover:text-[#9f3c16]'
                }`}
                title="Play Ambient Purr & Chimes"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: isPlayingAudio ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {isPlayingAudio ? 'volume_up' : 'headphones'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Curation Stats Counter (Pill Trio) */}
      <section className="px-margin mb-space-lg">
        <div className="grid grid-cols-3 gap-gutter-sm">
          <div
            onClick={() => onSelectTab('artworks')}
            className="bg-[#f0f3ff] hover:bg-[#e7eeff] rounded-xl p-space-sm flex flex-col items-center text-center shadow-sm cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[#9f3c16] text-[20px] mb-1">palette</span>
            <span className="font-headline-sm text-[18px] text-[#111c2d] leading-tight font-semibold">350+</span>
            <span className="font-label-sm text-[11px] text-[#57423b]">Purr-fect Works</span>
          </div>
          <div
            onClick={() => onSelectTab('cat-artists')}
            className="bg-[#f0f3ff] hover:bg-[#e7eeff] rounded-xl p-space-sm flex flex-col items-center text-center shadow-sm cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[#7e5700] text-[20px] mb-1">brush</span>
            <span className="font-headline-sm text-[18px] text-[#111c2d] leading-tight font-semibold">24</span>
            <span className="font-label-sm text-[11px] text-[#57423b]">Feline Masters</span>
          </div>
          <div
            onClick={() => onSelectTab('artworks')}
            className="bg-[#f0f3ff] hover:bg-[#e7eeff] rounded-xl p-space-sm flex flex-col items-center text-center shadow-sm cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[#446349] text-[20px] mb-1">auto_stories</span>
            <span className="font-headline-sm text-[18px] text-[#111c2d] leading-tight font-semibold">Daily</span>
            <span className="font-label-sm text-[11px] text-[#57423b]">Fresh Whiskers</span>
          </div>
        </div>
      </section>

      {/* Quentin & Lincoln Gallery Etiquette Vignette */}
      <LincolnQuentinVignette
        onSignGuestbookWithMeow={onOpenGuestbook}
        onViewBookCover={() => onSelectArtwork('artwork-book-cover')}
        onReadBookChapter={onOpenBookExperience}
      />

      {/* Current Salons & Showcases (Horizontal Scroller) */}
      <section className="mb-space-lg">
        <div className="px-margin flex items-center justify-between mb-space-sm">
          <div>
            <h3 className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">Current Salons</h3>
            <p className="font-label-sm text-[11px] text-[#57423b]">Curated seasonal themed galleries</p>
          </div>
          <button
            onClick={() => onSelectTab('artworks')}
            className="font-label-md text-[12px] text-[#9f3c16] font-semibold flex items-center gap-0.5 hover:underline"
          >
            See All
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Scroller Track */}
        <div className="flex gap-gutter overflow-x-auto px-margin pb-2 snap-x snap-mandatory no-scrollbar">
          {SALONS.map((salon) => (
            <div
              key={salon.id}
              onClick={() => {
                if (salon.id === 'salon-storybook-book') {
                  onSelectArtwork('artwork-book-cover');
                } else if (salon.id === 'salon-midnight') {
                  onSelectArtwork('artwork-stargazing');
                } else if (salon.id === 'salon-tea') {
                  onSelectArtwork('artwork-tea');
                } else if (salon.id === 'salon-spa') {
                  onSelectArtwork('artwork-harry');
                } else {
                  onSelectSalon(salon.theme);
                }
              }}
              className="min-w-[260px] max-w-[260px] shrink-0 snap-start bg-[#ffffff] rounded-2xl p-space-sm shadow-[0_8px_24px_-4px_rgba(78,52,46,0.08)] flex flex-col cursor-pointer hover:shadow-md transition-all border border-[#d8e3fb]/40 active:scale-[0.99]"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-space-xs bg-[#e7eeff]">
                <SmartImage
                  alt={salon.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src={salon.image}
                  fallbackIcon="museum"
                  fallbackText={salon.title}
                />
                <div className="absolute bottom-2 left-2 bg-[#111c2d]/75 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                  <span className="font-label-sm text-[11px] text-[#ffffff] font-medium">
                    {salon.artworksCount} Artworks
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 pt-1">
                <span className={`font-label-sm text-[11px] font-bold tracking-wider ${salon.badgeColor}`}>
                  {salon.badge}
                </span>
                <h4 className="font-headline-sm text-[16px] text-[#111c2d] font-semibold truncate">
                  {salon.title}
                </h4>
                <p className="font-body-sm text-[12px] text-[#57423b] line-clamp-1">
                  {salon.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Resident Cat Masters */}
      <section className="px-margin mb-space-xl">
        <div className="flex items-center justify-between mb-space-sm">
          <div>
            <h3 className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">Resident Cat Masters</h3>
            <p className="font-label-sm text-[11px] text-[#57423b]">The paw-fessionals behind the canvas</p>
          </div>
          <button
            onClick={() => onSelectTab('cat-artists')}
            className="w-8 h-8 rounded-full bg-[#e7eeff] flex items-center justify-center text-[#57423b] hover:text-[#9f3c16] transition-colors"
            title="Browse all artists"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        {/* Artist Cards List */}
        <div className="flex flex-col gap-gutter-sm">
          {CAT_ARTISTS.slice(0, 3).map((artist) => {
            const isFollowing = !!followingMap[artist.id];
            return (
              <div
                key={artist.id}
                className="bg-[#ffffff] rounded-2xl p-space-sm flex items-center justify-between shadow-sm border border-[#d8e3fb]/40 hover:border-[#9f3c16]/30 transition-all"
              >
                <div
                  className="flex items-center gap-space-sm min-w-0 cursor-pointer flex-1"
                  onClick={() => onSelectTab('cat-artists')}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#ffdbcf] shrink-0 border border-[#9f3c16]/20">
                    <SmartImage
                      className="w-full h-full object-cover"
                      alt={artist.name}
                      src={artist.avatar}
                      fallbackIcon="person"
                      fallbackText={artist.name}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h5 className="font-headline-sm text-[16px] text-[#111c2d] font-semibold truncate">
                      {artist.name}
                    </h5>
                    <div className="flex items-center gap-space-xs mt-0.5">
                      <span className="bg-[#ffdead] px-2 py-0.5 rounded-full font-label-sm text-[10px] text-[#281900] font-semibold">
                        {artist.specialty}
                      </span>
                      <span className="font-label-sm text-[11px] text-[#57423b]">
                        • {artist.worksCount} Works
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleFollow(artist.id)}
                  className={`px-space-md py-1.5 rounded-full font-label-sm text-[11px] font-semibold transition-all shrink-0 active:scale-95 ${
                    isFollowing
                      ? 'bg-[#9f3c16] text-white shadow-sm'
                      : 'bg-[#e7eeff] text-[#111c2d] hover:bg-[#9f3c16] hover:text-white'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Cozy Footer Guestbook Note */}
      <section className="px-margin mb-space-lg">
        <div className="bg-gradient-to-br from-[#fdbe50]/20 to-[#ffdbcf]/30 p-space-md rounded-2xl text-center flex flex-col items-center gap-space-xs shadow-sm border border-[#dec0b7]/40">
          <div className="w-10 h-10 rounded-full bg-[#ffffff] flex items-center justify-center text-[#9f3c16] shadow-sm">
            <span className="material-symbols-outlined text-[20px]">edit_note</span>
          </div>
          <h4 className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">
            Leave a Whisker in our Guestbook
          </h4>
          <p className="font-body-sm text-[13px] text-[#57423b] max-w-[280px] leading-relaxed">
            Enjoyed today's vernissages? Pen a warm note to our resident paws.
          </p>
          <button
            onClick={onOpenGuestbook}
            className="mt-space-xs bg-[#ffffff] hover:bg-[#f0f3ff] text-[#111c2d] px-space-lg py-2.5 rounded-full font-label-md text-[13px] font-semibold shadow-sm active:scale-95 transition-all border border-[#d8e3fb]"
          >
            Sign Guestbook 🐾
          </button>
        </div>
      </section>
    </div>
  );
};
