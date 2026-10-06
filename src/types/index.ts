export type TabType = 'exhibitions' | 'artworks' | 'cat-artists' | 'saved';

export type ScreenType = 
  | { type: 'main'; tab: TabType }
  | { type: 'artwork-detail'; artworkId: string; returnTab?: TabType }
  | { type: 'spa-detail'; artworkId: string; returnTab?: TabType };

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  artistRole: string;
  artistLocation: string;
  artistAvatar: string;
  collection: string;
  collectionNumber: string;
  image: string;
  tag: string;
  tagType: 'masterwork' | 'cottage' | 'staff' | 'seasonal' | 'exclusive';
  price: number;
  printEditionLabel: string;
  purrsCount: number;
  isLiked?: boolean;
  category: 'storybook' | 'nocturne' | 'tea' | 'studio' | 'watercolors';
  description: string;
  mediumDetails: string;
  curatorNotes: string;
  audioGuide: {
    narrator: string;
    duration: string;
    description: string;
  };
  pigments: {
    name: string;
    label: string;
    hex: string;
    description: string;
  }[];
  isSpaExperience?: boolean;
  isBookCover?: boolean;
  spaData?: SpaExperienceData;
  formats: {
    id: string;
    name: string;
    size: string;
    price: number;
    popular?: boolean;
  }[];
}

export interface SpaExperienceData {
  exclusiveSubtitle: string;
  rating: number;
  scritchesCount: number;
  temperamentStatus: string;
  waterTolerancePercent: number;
  toleranceLabel: string;
  reassurances: string[];
  packages: {
    id: string;
    name: string;
    price: number;
    popular?: boolean;
    description: string;
  }[];
  addons: {
    id: string;
    name: string;
    detail: string;
    price: number;
    checkedByDefault?: boolean;
  }[];
  testimonials: {
    name: string;
    breed: string;
    ageOrRole: string;
    avatarEmoji: string;
    avatarBg: string;
    stars: number;
    review: string;
  }[];
}

export interface CatArtist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
  worksCount: number;
  bio: string;
  followersCount: number;
  isFollowing?: boolean;
  signatureMedium: string;
  atelier: string;
}

export interface Salon {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  image: string;
  artworksCount: number;
  description: string;
  theme: string;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  petName?: string;
  stamp: string;
  message: string;
  timestamp: string;
}
