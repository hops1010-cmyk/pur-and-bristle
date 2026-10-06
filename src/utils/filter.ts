import { Artwork, CatArtist } from '../types';

export type SortOrder = 'Trending Meows' | 'Newest First' | 'Most Purred' | 'Price: Low to High' | 'Price: High to Low';

export function filterArtworks(
  artworks: Artwork[],
  query: string,
  category: string,
  purrCounts: Record<string, number>,
  sortOrder: SortOrder = 'Trending Meows'
): Artwork[] {
  const cleanQuery = query.toLowerCase().trim();

  const filtered = artworks.filter((item) => {
    // Category check
    if (category !== 'all') {
      if (category === 'watercolors') {
        const isWc = item.category === 'tea' || item.category === 'nocturne' || item.mediumDetails.toLowerCase().includes('watercolour');
        if (!isWc) return false;
      } else if (item.category !== category) {
        return false;
      }
    }

    // Search query check
    if (cleanQuery) {
      const matchTitle = item.title.toLowerCase().includes(cleanQuery);
      const matchArtist = item.artistName.toLowerCase().includes(cleanQuery);
      const matchDesc = item.description.toLowerCase().includes(cleanQuery);
      const matchCollection = item.collection.toLowerCase().includes(cleanQuery);
      return matchTitle || matchArtist || matchDesc || matchCollection;
    }

    return true;
  });

  return filtered.sort((a, b) => {
    const aPurrs = purrCounts[a.id] ?? a.purrsCount;
    const bPurrs = purrCounts[b.id] ?? b.purrsCount;

    switch (sortOrder) {
      case 'Trending Meows':
      case 'Most Purred':
        return bPurrs - aPurrs;
      case 'Newest First':
        return b.title.localeCompare(a.title);
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      default:
        return 0;
    }
  });
}

export function searchArtists(artists: CatArtist[], query: string): CatArtist[] {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return artists;

  return artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(cleanQuery) ||
      artist.specialty.toLowerCase().includes(cleanQuery) ||
      artist.atelier.toLowerCase().includes(cleanQuery) ||
      artist.bio.toLowerCase().includes(cleanQuery)
  );
}
