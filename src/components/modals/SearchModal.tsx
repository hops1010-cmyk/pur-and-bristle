import React, { useState } from 'react';
import { ARTWORKS, CAT_ARTISTS, SALONS } from '../../data/mockData';
import { playGentleChime } from '../../utils/audio';
import { SmartImage } from '../common/SmartImage';

interface SearchModalProps {
  onClose: () => void;
  onSelectArtwork: (id: string) => void;
  onSelectTab: (tab: 'artworks' | 'cat-artists' | 'saved') => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onClose,
  onSelectArtwork,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  const cleanQuery = query.toLowerCase().trim();

  const matchedArtworks = ARTWORKS.filter(
    (a) =>
      a.title.toLowerCase().includes(cleanQuery) ||
      a.artistName.toLowerCase().includes(cleanQuery) ||
      a.description.toLowerCase().includes(cleanQuery)
  );

  const matchedArtists = CAT_ARTISTS.filter(
    (artist) =>
      artist.name.toLowerCase().includes(cleanQuery) ||
      artist.specialty.toLowerCase().includes(cleanQuery)
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col p-4 bg-black/60 backdrop-blur-md animate-fade-in items-center justify-start pt-16">
      <div className="relative w-full max-w-lg bg-[#ffffff] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] border border-[#d8e3fb]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#d8e3fb] flex items-center gap-3 bg-[#f9f9ff]">
          <span className="material-symbols-outlined text-[#9f3c16] text-[22px]">search</span>
          <input
            type="text"
            autoFocus
            placeholder="Search artworks, feline masters, or salons..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[14px] text-[#111c2d] placeholder-[#8a726a] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8a726a] hover:text-[#111c2d]"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#e7eeff] hover:bg-[#d8e3fb] flex items-center justify-center text-[#111c2d] text-[18px]"
          >
            ✕
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-4 flex flex-col gap-4">
          {cleanQuery === '' ? (
            <div className="flex flex-col gap-3 py-2">
              <span className="font-label-sm text-[11px] text-[#57423b] uppercase tracking-wider font-bold">
                Suggested Curations
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Stargazing on Montmartre',
                  'Oliver the Tabby',
                  'Tabby Bath Burrito',
                  'Madame Calico',
                  'Tea in the Rose Pavilion',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      playGentleChime();
                      setQuery(item);
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#111c2d] font-label-md text-[12px] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Artworks */}
              {matchedArtworks.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-[11px] text-[#7e5700] uppercase tracking-wider font-bold">
                    Artworks ({matchedArtworks.length})
                  </span>
                  {matchedArtworks.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => {
                        onSelectArtwork(art.id);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl hover:bg-[#f0f3ff] flex items-center gap-3 cursor-pointer transition-colors border border-transparent hover:border-[#d8e3fb]"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#d8e3fb]">
                        <SmartImage
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover"
                          fallbackIcon="palette"
                          fallbackText={art.title}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h5 className="font-headline-sm text-[14px] text-[#111c2d] font-semibold truncate">
                          {art.title}
                        </h5>
                        <span className="font-body-sm text-[12px] text-[#57423b]">
                          {art.artistName} • ${art.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cat Artists */}
              {matchedArtists.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-[11px] text-[#446349] uppercase tracking-wider font-bold">
                    Cat Masters ({matchedArtists.length})
                  </span>
                  {matchedArtists.map((artist) => (
                    <div
                      key={artist.id}
                      onClick={() => {
                        onSelectTab('cat-artists');
                        onClose();
                      }}
                      className="p-2.5 rounded-xl hover:bg-[#f0f3ff] flex items-center gap-3 cursor-pointer transition-colors border border-transparent hover:border-[#d8e3fb]"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#9f3c16]/30">
                        <SmartImage
                          src={artist.avatar}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                          fallbackIcon="person"
                          fallbackText={artist.name}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h5 className="font-headline-sm text-[14px] text-[#111c2d] font-semibold truncate">
                          {artist.name}
                        </h5>
                        <span className="font-body-sm text-[12px] text-[#57423b]">
                          {artist.specialty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {matchedArtworks.length === 0 && matchedArtists.length === 0 && (
                <div className="text-center py-8 text-[#57423b] font-body-sm text-[13px]">
                  No feline masterworks found for "{query}". Try another search term!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
