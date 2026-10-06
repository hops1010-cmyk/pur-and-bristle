import React, { useState, useEffect } from 'react';
import { CAT_ARTISTS, ARTWORKS } from '../data/mockData';
import { playGentleChime } from '../utils/audio';
import { SmartImage } from './common/SmartImage';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface CatArtistsScreenProps {
  onSelectArtwork: (artworkId: string) => void;
}

export const CatArtistsScreen: React.FC<CatArtistsScreenProps> = ({ onSelectArtwork }) => {
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>(() =>
    storage.getItem<Record<string, boolean>>(STORAGE_KEYS.FOLLOWED_ARTISTS, {})
  );
  const [activeMedium, setActiveMedium] = useState<string>('all');

  useEffect(() => {
    storage.setItem(STORAGE_KEYS.FOLLOWED_ARTISTS, followingMap);
  }, [followingMap]);

  const toggleFollow = (id: string) => {
    playGentleChime();
    setFollowingMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredArtists = CAT_ARTISTS.filter((artist) => {
    if (activeMedium === 'all') return true;
    if (activeMedium === 'pastel') return artist.specialty.includes('Pastel');
    if (activeMedium === 'watercolour') return artist.specialty.includes('Watercolour');
    if (activeMedium === 'sketch') return artist.specialty.includes('Sketch');
    if (activeMedium === 'acrylics') return artist.specialty.includes('Acrylics');
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-xl mx-auto px-margin">
      {/* Header Intro */}
      <div className="py-space-sm flex flex-col gap-1">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[#9f3c16] text-[22px]">brush</span>
          <h2 className="font-headline-md text-[22px] text-[#111c2d] font-semibold">
            Resident Cat Masters
          </h2>
        </div>
        <p className="font-body-sm text-[13px] text-[#57423b] leading-relaxed">
          The distinguished feline storybook illustrators, water-colorists, and pastel masters of Purr &amp; Bristle.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar pb-space-sm">
        {[
          { id: 'all', label: 'All Masters' },
          { id: 'pastel', label: 'Oil & Pastel' },
          { id: 'watercolour', label: 'Watercolour' },
          { id: 'sketch', label: 'Fine Nib Sketch' },
          { id: 'acrylics', label: 'Vibrant Acrylics' },
        ].map((chip) => {
          const isActive = activeMedium === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => {
                setActiveMedium(chip.id);
                playGentleChime();
              }}
              className={`font-label-md text-[12px] px-3.5 py-1.5 rounded-full transition-all shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-[#9f3c16] text-white font-semibold shadow-sm'
                  : 'bg-[#e7eeff] text-[#111c2d] hover:bg-[#d8e3fb]'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Artists Cards */}
      <div className="flex flex-col gap-space-md mt-space-xs">
        {filteredArtists.map((artist) => {
          const isFollowing = !!followingMap[artist.id];
          const artistArtworks = ARTWORKS.filter(
            (a) => a.artistId === artist.id || a.artistName.includes(artist.name.split(' ')[0])
          );

          return (
            <div
              key={artist.id}
              className="bg-[#ffffff] rounded-2xl p-space-md shadow-sm border border-[#d8e3fb]/60 flex flex-col gap-space-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#ffdbcf] shrink-0 border-2 border-[#9f3c16]/30">
                    <SmartImage
                      className="w-full h-full object-cover"
                      alt={artist.name}
                      src={artist.avatar}
                      fallbackIcon="person"
                      fallbackText={artist.name}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-headline-sm text-[17px] text-[#111c2d] font-semibold truncate">
                      {artist.name}
                    </h3>
                    <span className="font-body-sm text-[12px] text-[#57423b] truncate">
                      {artist.title}
                    </span>
                    <span className="font-label-sm text-[11px] text-[#7e5700] font-medium mt-0.5">
                      📍 {artist.atelier}
                    </span>
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

              <p className="font-body-sm text-[13px] text-[#57423b] leading-relaxed">
                {artist.bio}
              </p>

              {/* Medium & stats bar */}
              <div className="bg-[#f0f3ff] p-2.5 rounded-xl flex items-center justify-between font-label-sm text-[11px] text-[#57423b]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-[16px] text-[#446349]">
                    format_paint
                  </span>
                  <span className="truncate">{artist.signatureMedium}</span>
                </div>
                <span className="font-bold text-[#111c2d] shrink-0 ml-2">
                  {artist.worksCount} Works
                </span>
              </div>

              {/* Works Thumbnails if available */}
              {artistArtworks.length > 0 && (
                <div className="pt-space-xs flex items-center gap-2">
                  <span className="font-label-sm text-[11px] text-[#8a726a] font-medium">Featured:</span>
                  {artistArtworks.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => onSelectArtwork(art.id)}
                      className="flex items-center gap-1.5 bg-[#e7eeff] hover:bg-[#d8e3fb] px-2.5 py-1 rounded-lg text-[#111c2d] font-label-sm text-[11px] transition-colors"
                    >
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-4 h-4 rounded object-cover"
                      />
                      <span className="truncate max-w-[120px]">{art.title}</span>
                      <span className="material-symbols-outlined text-[12px] text-[#9f3c16]">
                        arrow_forward
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
