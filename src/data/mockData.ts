import { Artwork, CatArtist, Salon, GuestbookEntry } from '../types';
import purrBookCoverImg from '../assets/images/purr_book_cover_1790927245433.jpg';

export const APP_LOGO = "https://lh3.googleusercontent.com/aida-public/AB6AXuC1XF-bxCZvX9Xh_rap0XR-4blUBwLbT4YndiSF2j-eW6-WCefqjRQ49hsYO8Cap06r_zYqzHCm3U_OBw8iflo3qykazME4GK4ly_47jUTLQdUMnCzf7VQY2Nal9ndA7iu3dhYoVC-cV6jBUOBECHKJSOIcX0tePYNzzSAaF4OQhHQoSNHhJJIkGRV1enA8QRnm5cyLLIzHF4GaYumzVqUkZJM65erNCbvAZlVRze3RAjTVDcRKI15k";

export const CAT_ARTISTS: CatArtist[] = [
  {
    id: 'artist-barnaby',
    name: 'Barnaby McWhiskers',
    title: 'British Shorthair • Connoisseur',
    specialty: 'Oil & Pastel',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFx3yjvCIg81o1nV9J7Bu7uOdtWWetEKNOs-2q6KWJ3HZ_6feG2O6mIaJ6EPdtFrUCOCGvkKfymOtDSTB6b6TYYMzPEt58_x_N1jfnNeHWj5lxLx6SQUMjMAmiTpUDb4zpz9kYXHDa1EDFMosLsdiejPMMgP0-dD_zyTfNjkQrcheBXJkjhN1YL_mhxsY19mzNvkxTetuOVkwJjudB563cS872xzgM8Nca8lG5MRwQ2ZMgzt905G9X',
    worksCount: 42,
    bio: 'Distinguished painter specializing in layered pastels and atmospheric Parisian nocturnes. Known for his keen appreciation of fresh sweetgrass tea.',
    followersCount: 1240,
    signatureMedium: 'Rich oil sticks on primed linen canvas',
    atelier: 'Montmartre Studio, Paris'
  },
  {
    id: 'artist-calico',
    name: 'Madame Calico',
    title: 'Calico Dame • Botanical Virtuoso',
    specialty: 'Watercolour Dreams',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw8dmx-__LGrkaXG8pHedQ0LvUajMcefUGgNQPHIYTO1LWLcrGDULHP9NINRueLm0Cd5i9-BWEGpH-tK8x7v26OxNIfkx8OfspLNWxH2xsZYx9ghw0EhVdHd0gIP8Pa-0PUc8hJdJj86bhJF-KS29MMKHYG8d_Mnb-lbJp3wlFn9XNS4Y-4nboVkISekZNs8lhnsNErGkNFQfzY7wqWLjOyGU50M8vmUqZjv48J6SbXbW97qaLBisc',
    worksCount: 29,
    bio: 'Master of soft translucent floral washes and sunlit garden picnics. Adorns her collar with fresh lavender blossoms during morning painting sessions.',
    followersCount: 980,
    signatureMedium: 'Winsor & Newton watercolours on cold-press Arches paper',
    atelier: 'Cotswolds Rose Garden, England'
  },
  {
    id: 'artist-mittens',
    name: 'Professor Mittens',
    title: 'Distinguished Tuxedo • Scholar',
    specialty: 'Fine Nib Sketch',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7c_sveDxwhDuzYgzUcLytyDVHXeUAhXO9WpmhGik7kEOGvbbZJmF7gY77R4jEqDZGKrqPFRbY-DRFOk1if-mDhM2SmowZ7oR_FRwPO3bqZqlFCS9tL0w7RkT7fsrcRuLNEwf_R9_DeKAvW5_5qSOGxi8Ab70kzCrkuVYizYn5pqCLHxNGlBsuIGO-BQ3H7tm80cO_idtqm4jydW8R9i4qHojoal_PigZ1N0Bm16_tTe3rzbgyP0ep',
    worksCount: 18,
    bio: 'Archivist of miniature antique frames and classical ink cross-hatching. Inspects every canvas with antique wireframe spectacles.',
    followersCount: 810,
    signatureMedium: 'Sepia archival ink & illuminated gouache highlights',
    atelier: 'Bodleian Cat Library, Oxford'
  },
  {
    id: 'artist-henri',
    name: 'Henri Tux & Friends',
    title: 'Parisian Atelier Founder',
    specialty: 'Celestial Indigo & Gouache',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT4-CClBFiJl_w2mURgbH2-W87q4qApIEF5nQ2dB8P27l5O52CrvLa-h2PAYjIH6pJmQ59tyrlLng_Z6q4uVhjc35NZdX6nev3mo2PMXz6eGF09YhDyPNzpDLBZn6THXQT1yLDwZBGormHYc2bapoRag6IxgWTcz_1kGZJlfAzABLXNje-oHl6_9bRY-6gcVldCDOIwpXMcFzdJFOFdtt7dPb_9RM-7CCsVImQ_QK9sSf7SSA4f1_C',
    worksCount: 35,
    bio: 'Belleville resident who paints the quiet nighttime hours when the cobblestones gleam and shooting stars visit the Sacré-Cœur.',
    followersCount: 1650,
    signatureMedium: 'French Ultramarine wash & brass telescope reflections',
    atelier: 'Atelier de Belleville, Paris'
  },
  {
    id: 'artist-oliver',
    name: 'Oliver the Tabby',
    title: 'Sunbeam Studio Resident',
    specialty: 'Vibrant Acrylics & Pastels',
    avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1Wkx5pNUKPtbXqDpXE2oO4GDiiv_jFsrBtJKm06s97zuMwVTUpoGntmjtZN9Pi1NKdaaKOKIOu28GhCsKncRUG8SqFWX97c48cBg318y_xjt3BM-wzIqhEGRzwsB7EIz75MOR9LVrFaL1pteH4y5SDbhCiw4ORsbUSoORgQe30uKkBXAsL4SCH724Gu2xAyojKVzu2t-7Bg4oq8qZD2N9sq76Z6C3JlhM_JWxekqVmUUZQx9ZcG4gmgd7w',
    worksCount: 22,
    bio: 'Energetic painter whose apron is permanently adorned with rainbow specks. Captures playful goldfish dreams and warm afternoon light.',
    followersCount: 1120,
    signatureMedium: 'Cadmium yellows, cerulean ocean tones & joyful paw strokes',
    atelier: 'Sunbeam Loft Atelier 4'
  },
  {
    id: 'artist-lincoln',
    name: 'Lincoln the Defiant',
    title: "Curator's Nemesis • Whimsical Vocalist",
    specialty: 'Acoustic Disruption & Meows',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT4-CClBFiJl_w2mURgbH2-W87q4qApIEF5nQ2dB8P27l5O52CrvLa-h2PAYjIH6pJmQ59tyrlLng_Z6q4uVhjc35NZdX6nev3mo2PMXz6eGF09YhDyPNzpDLBZn6THXQT1yLDwZBGormHYc2bapoRag6IxgWTcz_1kGZJlfAzABLXNje-oHl6_9bRY-6gcVldCDOIwpXMcFzdJFOFdtt7dPb_9RM-7CCsVImQ_QK9sSf7SSA4f1_C',
    worksCount: 7,
    bio: "'No meowwing you lot,' strictly requested curator Quentin. Lincoln paused, tilted his chin upward, and delivered a room-echoing 'meowwww'. He specializes in vocal performance art and dramatic eye contact.",
    followersCount: 2450,
    signatureMedium: 'Resonant mezzotint meows on sunlit hardwood',
    atelier: 'The High Bookshelf, Salon 1'
  }
];

export const SALONS: Salon[] = [
  {
    id: 'salon-storybook-book',
    title: 'The Secret Life of Gallery Cats Book Release',
    badge: 'NEW HARDCOVER PUBLICATION',
    badgeColor: 'text-[#9f3c16]',
    image: purrBookCoverImg,
    artworksCount: 9,
    description: 'Deluxe illustrated hardcover book covers, gilded slipcases, and illuminated frontispieces.',
    theme: 'storybook'
  },
  {
    id: 'salon-midnight',
    title: 'Midnight Stargazers Salon',
    badge: 'ROOFTOP NOCTURNE',
    badgeColor: 'text-primary',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1W8T7WqAC3BE30iQoUbUBikcCGfuEkttjdNIpTZPMhWvnpkCPEuQp90Md828bh8_ShFfQWB1eLmTu4AN1qAUhLMzBpC4TyKZluN-odrhGdXcFzy-i0-Tkllnz9gHzZWPg49WnPtxI4ULX1PudykOeolyJ491-FnFqADHIt1dHQrkKfEKijT4ddMiaeIV6iFYloKzX7OSrFDRxqQpIWkavGVZQvcPQR98sFm2_NU_WabsTFwZC_j_JIx3M4',
    artworksCount: 12,
    description: 'Velvet night skies, warm lantern glows, and telescope wonders high above Parisian rooftops.',
    theme: 'Nocturne'
  },
  {
    id: 'salon-tea',
    title: 'Tea in the Rose Pavilion',
    badge: 'GARDEN WHIMSY',
    badgeColor: 'text-tertiary',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1VpB7GuFqFkU1f09ZCT-_uzC6XyM5Aj2FdMLpIxOx5_dVl7xFTJ9AT5M_xwJ-6R2H8zMR7dY_-GIDDj_Q8rGqhATa-QJfGIqLCmMuW6Ui-PRBTapnPX4AV1MeSveokoSEh5ZrVVw3rDfnD4AbcW13ZutGsnOJpXrelicealGdRozLRCj7UCZeQo16nKq3KMnO3xrt9hxLBkOChoIlSHQX7gSHSrziW09CvMROraiJoKC18-vuStvgYHFxQ',
    artworksCount: 8,
    description: 'Earl Grey, butter scones, and botanical watercolor harmonies among English cottage roses.',
    theme: 'Botanical'
  },
  {
    id: 'salon-masterpiece',
    title: 'The Little Masterpiece & Ocean Dreams',
    badge: 'STUDIO VERNISSAGE',
    badgeColor: 'text-secondary',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1Wkx5pNUKPtbXqDpXE2oO4GDiiv_jFsrBtJKm06s97zuMwVTUpoGntmjtZN9Pi1NKdaaKOKIOu28GhCsKncRUG8SqFWX97c48cBg318y_xjt3BM-wzIqhEGRzwsB7EIz75MOR9LVrFaL1pteH4y5SDbhCiw4ORsbUSoORgQe30uKkBXAsL4SCH724Gu2xAyojKVzu2t-7Bg4oq8qZD2N9sq76Z6C3JlhM_JWxekqVmUUZQx9ZcG4gmgd7w',
    artworksCount: 16,
    description: 'Sunlit studio sessions celebrating childhood curiosity, warm easels, and fish portraits.',
    theme: 'Studio'
  },
  {
    id: 'salon-spa',
    title: 'The Calming Wellness & Dignity Suite',
    badge: 'WELLNESS ATELIER',
    badgeColor: 'text-primary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDevXe8jle-A32lK9uYCxbFnsdClR43NfGyjpNBMoe_vn88w0JcDbRc_9BMkwDQ-nLcmgjAkYf3BCNrD8hwFYz47N4IxhyL2DSouFmgUbIifUORepb-aP36QswNo6ojcFAAuttpTnNghO52DpPtlqR2jmLmUowEnn0L_fx9m8xulr_tJ4I4pSmUYwEQPfSpS0Jix7hhKqFtotQ_786PVDxwH0ec4YawP2TNUzkaEUiUBH9yXgMl52su',
    artworksCount: 6,
    description: 'Towel burrito therapy, gentle chamomile water mists, and recovery salmon flakes.',
    theme: 'Wellness'
  }
];

export const ARTWORKS: Artwork[] = [
  {
    id: 'artwork-book-cover',
    title: 'The Secret Life of Gallery Cats (Collector Book Cover)',
    artistId: 'artist-lincoln',
    artistName: 'Quentin & Lincoln the Defiant',
    artistRole: 'Gallery Chronicles',
    artistLocation: 'The High Bookshelf, Salon 1',
    artistAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT4-CClBFiJl_w2mURgbH2-W87q4qApIEF5nQ2dB8P27l5O52CrvLa-h2PAYjIH6pJmQ59tyrlLng_Z6q4uVhjc35NZdX6nev3mo2PMXz6eGF09YhDyPNzpDLBZn6THXQT1yLDwZBGormHYc2bapoRag6IxgWTcz_1kGZJlfAzABLXNje-oHl6_9bRY-6gcVldCDOIwpXMcFzdJFOFdtt7dPb_9RM-7CCsVImQ_QK9sSf7SSA4f1_C',
    collection: 'ILLUSTRATED STORYBOOK EDITION',
    collectionNumber: 'VOL. I',
    image: purrBookCoverImg,
    tag: 'Official Book Cover',
    isBookCover: true,
    tagType: 'masterwork',
    price: 38,
    printEditionLabel: '$38 Hardcover Edition',
    purrsCount: 1420,
    category: 'storybook',
    description: 'Official storybook cover art depicting Quentin the tweed curator cat and Lincoln looking up in vocal defiance amidst towering antique bookcases and golden salon frames.',
    mediumDetails: '2024 Storybook Edition • Archival watercolor & gold leaf embossing on 350gsm linen clothbound hardcover.',
    curatorNotes: 'Commissioned as the official retrospective cover for Purr & Bristle Gallery. Notice the tiny cat paw prints subtly embossed in gold leaf along the bottom margin and Lincoln looking right up at Quentin with unforgettable cheeky confidence.',
    audioGuide: {
      narrator: 'Quentin (Senior Curator)',
      duration: '2:05',
      description: 'The harrowing and heartwarming tale of maintaining gallery silence amidst three dozen curious felines.'
    },
    pigments: [
      { name: 'Cloth Burgundy', label: 'Vintage Cover', hex: '#682129', description: 'Deep red woven linen cloth binding.' },
      { name: 'Filigree Gold', label: '24K Leaf', hex: '#d8a23d', description: 'Illuminated border ornamentation.' },
      { name: 'Leaded Glass', label: 'Sunbeam Amber', hex: '#e8b654', description: 'Warm morning light streaming through windows.' },
      { name: 'Tweed Olive', label: 'Curator Coat', hex: '#4e5c43', description: "Quentin's tailored gallery tweed vest." },
      { name: 'Lincoln Ginger', label: 'Defiant Coat', hex: '#d46a2a', description: "Lincoln's vibrant orange striped fur." }
    ],
    formats: [
      { id: 'hardcover', name: 'Illustrated Hardcover', size: '9" × 12" Clothbound Book', price: 38, popular: true },
      { id: 'deluxe', name: 'Deluxe Gilded Slipcase', size: 'Numbered Collector Box + Print', price: 64 }
    ]
  },
  {
    id: 'artwork-stargazing',
    title: 'Stargazing on Montmartre',
    artistId: 'artist-henri',
    artistName: 'Henri Tux & Friends',
    artistRole: 'Parisian Atelier',
    artistLocation: 'Atelier de Belleville, Paris',
    artistAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT4-CClBFiJl_w2mURgbH2-W87q4qApIEF5nQ2dB8P27l5O52CrvLa-h2PAYjIH6pJmQ59tyrlLng_Z6q4uVhjc35NZdX6nev3mo2PMXz6eGF09YhDyPNzpDLBZn6THXQT1yLDwZBGormHYc2bapoRag6IxgWTcz_1kGZJlfAzABLXNje-oHl6_9bRY-6gcVldCDOIwpXMcFzdJFOFdtt7dPb_9RM-7CCsVImQ_QK9sSf7SSA4f1_C',
    collection: 'NOCTURNE COLLECTION',
    collectionNumber: 'NO. 04',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuCLUJt6qO3gWErpJy7yWm5PheAGMv6YqxwTIb-6Kmm6soyH50saFIn3AYAfhijN2V_Lp350yaO7SbiQU9_xNTR3X4HxcoN1p4j8DTy3D_6oHdB_QJqNKeAY8kde4DSJ2COgFIc-wGkdxxzfY4IzSzCPrS_xpzUy7UJAFh13l_2hYhFVmCZw5wdGuX6ca9iDK1pdUuV6p5qUCn6Auc51TEfafWdDyC_7rTBPUCQPx5dxH6h7heZlCw',
    tag: 'Masterwork',
    tagType: 'masterwork',
    price: 48,
    printEditionLabel: '$45 Print Edition',
    purrsCount: 428,
    category: 'nocturne',
    description: 'Gouache on deckled cotton, celestial indigo wash & warm lantern pigment.',
    mediumDetails: '2024 Archival Masterpiece • Storybook Watercolour & Indigo Ink on 300gsm Cold-Pressed Arches Cotton Paper.',
    curatorNotes: 'A heartwarming rooftop nocturne capturing three inquisitive feline companions discovering constellations through a vintage brass telescope amidst blooming hydrangeas and glowing fairy lanterns. Henri uses deep French ultramarine washes with hand-speckled gouache stars to convey the boundless silence of the Parisian night.',
    audioGuide: {
      narrator: 'Madame Claudine',
      duration: '1:45',
      description: 'Discover how Henri captured the Parisian midnight breeze and the gentle breathing of sleeping companions.'
    },
    pigments: [
      { name: 'Deep Sky', label: 'Indigo Night', hex: '#1a2d52', description: 'Deep French ultramarine wash with midnight blue layers.' },
      { name: 'Moon Gold', label: 'Crescent Glow', hex: '#fdbe50', description: 'Warm honey gold inspired by the crescent moon.' },
      { name: 'Clay Tile', label: 'Terracotta Clay', hex: '#9f3c16', description: 'Sun-baked Parisian terracotta chimney tiles.' },
      { name: 'Hydrangea', label: 'Hydrangea Mist', hex: '#d8e3fb', description: 'Soft periwinkle pastel reflecting starlight.' },
      { name: 'Sage Leaf', label: 'Veranda Flora', hex: '#5c7c61', description: 'Muted botanicals flourishing in balcony planters.' }
    ],
    formats: [
      { id: 'petite', name: 'Square Petite', size: '8" × 8" Studio Print', price: 34 },
      { id: 'gallery', name: 'Gallery Mount', size: '12" × 12" Cotton Giclée', price: 48, popular: true }
    ]
  },
  {
    id: 'artwork-tea',
    title: 'Afternoon Tea with Calico',
    artistId: 'artist-calico',
    artistName: 'Lady Penelope & Crew',
    artistRole: 'Tea Guild',
    artistLocation: 'Cotswolds Rose Garden, England',
    artistAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw8dmx-__LGrkaXG8pHedQ0LvUajMcefUGgNQPHIYTO1LWLcrGDULHP9NINRueLm0Cd5i9-BWEGpH-tK8x7v26OxNIfkx8OfspLNWxH2xsZYx9ghw0EhVdHd0gIP8Pa-0PUc8hJdJj86bhJF-KS29MMKHYG8d_Mnb-lbJp3wlFn9XNS4Y-4nboVkISekZNs8lhnsNErGkNFQfzY7wqWLjOyGU50M8vmUqZjv48J6SbXbW97qaLBisc',
    collection: 'GARDEN WHIMSY COLLECTION',
    collectionNumber: 'NO. 08',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1VpB7GuFqFkU1f09ZCT-_uzC6XyM5Aj2FdMLpIxOx5_dVl7xFTJ9AT5M_xwJ-6R2H8zMR7dY_-GIDDj_Q8rGqhATa-QJfGIqLCmMuW6Ui-PRBTapnPX4AV1MeSveokoSEh5ZrVVw3rDfnD4AbcW13ZutGsnOJpXrelicealGdRozLRCj7UCZeQo16nKq3KMnO3xrt9hxLBkOChoIlSHQX7gSHSrziW09CvMROraiJoKC18-vuStvgYHFxQ',
    tag: 'English Cottage',
    tagType: 'cottage',
    price: 42,
    printEditionLabel: '$42 Giclée Print',
    purrsCount: 612,
    category: 'tea',
    description: 'Watercolour on cold-press paper, botanical rose glaze, and macaron tints.',
    mediumDetails: '2024 Botanical Series • Natural mineral pigments, honey binder, and fine botanical brushwork.',
    curatorNotes: 'Painted beneath a trellised rose arbor, three cats share a delightful afternoon tea banquet. Note the tiny porcelain teapot with hand-painted forget-me-nots and the freshly baked scones crowned with clotted cream.',
    audioGuide: {
      narrator: 'Lady Penelope',
      duration: '1:32',
      description: 'The secret recipe behind the catnip biscuits and the delicate etiquette of garden tea parties.'
    },
    pigments: [
      { name: 'Rose Glaze', label: 'Cottage Petal', hex: '#de7289', description: 'Fresh tea rose pigment with soft watercolor dispersion.' },
      { name: 'Earl Amber', label: 'Brewed Tea', hex: '#c57832', description: 'Steeped black tea and warm honey.' },
      { name: 'Plaid Moss', label: 'Picnic Plaid', hex: '#587a5f', description: 'Vintage tartan picnic blanket weave.' },
      { name: 'Porcelain White', label: 'China Teacup', hex: '#f4f6fa', description: 'Lustrous glazed porcelain bone china.' },
      { name: 'Macaron Mint', label: 'Pistachio Crumbs', hex: '#a6cfb1', description: 'Delicate pastel treat crumbs.' }
    ],
    formats: [
      { id: 'petite', name: 'Square Petite', size: '8" × 8" Studio Print', price: 32 },
      { id: 'gallery', name: 'Gallery Mount', size: '12" × 12" Cotton Giclée', price: 42, popular: true }
    ]
  },
  {
    id: 'artwork-fish',
    title: 'The Joy of Painting Fish',
    artistId: 'artist-oliver',
    artistName: 'Oliver the Tabby',
    artistRole: 'Sunbeam Studio',
    artistLocation: 'Atelier 4, Paris',
    artistAvatar: 'https://lh3.googleusercontent.com/aida/AEtjO1Wkx5pNUKPtbXqDpXE2oO4GDiiv_jFsrBtJKm06s97zuMwVTUpoGntmjtZN9Pi1NKdaaKOKIOu28GhCsKncRUG8SqFWX97c48cBg318y_xjt3BM-wzIqhEGRzwsB7EIz75MOR9LVrFaL1pteH4y5SDbhCiw4ORsbUSoORgQe30uKkBXAsL4SCH724Gu2xAyojKVzu2t-7Bg4oq8qZD2N9sq76Z6C3JlhM_JWxekqVmUUZQx9ZcG4gmgd7w',
    collection: 'STUDIO LIFE COLLECTION',
    collectionNumber: 'NO. 02',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1Wkx5pNUKPtbXqDpXE2oO4GDiiv_jFsrBtJKm06s97zuMwVTUpoGntmjtZN9Pi1NKdaaKOKIOu28GhCsKncRUG8SqFWX97c48cBg318y_xjt3BM-wzIqhEGRzwsB7EIz75MOR9LVrFaL1pteH4y5SDbhCiw4ORsbUSoORgQe30uKkBXAsL4SCH724Gu2xAyojKVzu2t-7Bg4oq8qZD2N9sq76Z6C3JlhM_JWxekqVmUUZQx9ZcG4gmgd7w',
    tag: 'Staff Choice',
    tagType: 'staff',
    price: 48,
    printEditionLabel: '$48 Archival Canvas',
    purrsCount: 890,
    category: 'studio',
    description: 'Mixed media & acrylics, sunny cadmium yellow, and energetic paw splatters.',
    mediumDetails: '2024 Atelier Solo Series • Heavy body acrylics, bright pastel tempera, and linen canvas.',
    curatorNotes: 'Oliver is radiant in his paint-smeared apron as he completes his magnum opus: colorful goldfish swimming above blossoming flowerbeds. This work is an exuberant reminder of the simple happiness found in imagination and sunny studio rooms.',
    audioGuide: {
      narrator: 'Oliver (Translated)',
      duration: '2:10',
      description: 'Oliver explains why the fish wear sparkles and why orange paint tastes surprisingly pleasant.'
    },
    pigments: [
      { name: 'Cadmium Gold', label: 'Sunbeam Ochre', hex: '#f5a623', description: 'Pure midday sunlight filling the apartment window.' },
      { name: 'Coral Goldfish', label: 'Koi Scales', hex: '#f05a38', description: 'Gleaming fins dancing through imagined waters.' },
      { name: 'Teal Sofa', label: 'Velvet Cushion', hex: '#329ea8', description: 'Cozy corduroy reading armchair.' },
      { name: 'Tabby Ginger', label: 'Orange Fur', hex: '#d96e2a', description: 'Vibrant striped fur glowing with energy.' },
      { name: 'Leaf Green', label: 'Potted Pothos', hex: '#589153', description: 'Houseplants trailing from high shelves.' }
    ],
    formats: [
      { id: 'petite', name: 'Square Petite', size: '8" × 8" Studio Print', price: 34 },
      { id: 'gallery', name: 'Gallery Mount', size: '12" × 12" Cotton Giclée', price: 48, popular: true }
    ]
  },
  {
    id: 'artwork-harry',
    title: 'The Signature "Tabby Bath" & Purr Polish',
    artistId: 'artist-amelia',
    artistName: 'Amelia the Groomer & Harry',
    artistRole: 'Wellness Atelier',
    artistLocation: 'Bathhouse Alley, Edinburgh',
    artistAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDevXe8jle-A32lK9uYCxbFnsdClR43NfGyjpNBMoe_vn88w0JcDbRc_9BMkwDQ-nLcmgjAkYf3BCNrD8hwFYz47N4IxhyL2DSouFmgUbIifUORepb-aP36QswNo6ojcFAAuttpTnNghO52DpPtlqR2jmLmUowEnn0L_fx9m8xulr_tJ4I4pSmUYwEQPfSpS0Jix7hhKqFtotQ_786PVDxwH0ec4YawP2TNUzkaEUiUBH9yXgMl52su',
    collection: 'WELLNESS & GROOMING COLLECTION',
    collectionNumber: 'NO. 01',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDevXe8jle-A32lK9uYCxbFnsdClR43NfGyjpNBMoe_vn88w0JcDbRc_9BMkwDQ-nLcmgjAkYf3BCNrD8hwFYz47N4IxhyL2DSouFmgUbIifUORepb-aP36QswNo6ojcFAAuttpTnNghO52DpPtlqR2jmLmUowEnn0L_fx9m8xulr_tJ4I4pSmUYwEQPfSpS0Jix7hhKqFtotQ_786PVDxwH0ec4YawP2TNUzkaEUiUBH9yXgMl52su',
    tag: 'Seasonal Spa Experience',
    tagType: 'seasonal',
    price: 48,
    printEditionLabel: '$48 Spa Package',
    purrsCount: 1042,
    category: 'storybook',
    isSpaExperience: true,
    description: 'Specially formulated for dramatic water skeptics like Harry (who strictly demanded a post-bath towel burrito and three apology treats).',
    mediumDetails: 'Storybook watercolour, ink wash, and archival bubble glaze.',
    curatorNotes: 'Harry embodies the eternal struggle of the clean feline: furious during the sponge misting, yet undeniably smug once cocooned in a pre-warmed Egyptian cotton burrito with triple salmon flakes in sight.',
    audioGuide: {
      narrator: 'Amelia the Groomer',
      duration: '1:50',
      description: 'The science of defusing grumpy cats using warmed towels and bribery salmon flakes.'
    },
    pigments: [
      { name: 'Bath Foam', label: 'Lavender Bubble', hex: '#e8f0fe', description: 'Hypoallergenic soothing cloud foam.' },
      { name: 'Towel Stripe', label: 'Warm Flannel', hex: '#6b9cb8', description: 'Cozy absorbent Egyptian cotton.' },
      { name: 'Duck Gold', label: 'Rubber Duck', hex: '#f7c325', description: 'Emotional support bath duck companion.' },
      { name: 'Displeased Red', label: 'Grumpy Nose', hex: '#d45d5d', description: 'Tiny pink nose scrunched in mild defiance.' },
      { name: 'Cedar Bench', label: 'Aroma Cedar', hex: '#946644', description: 'Steamed cedar wood drying bench.' }
    ],
    spaData: {
      exclusiveSubtitle: 'EXCLUSIVE STUDIO SESSION',
      rating: 4.92,
      scritchesCount: 128,
      temperamentStatus: 'DEFCON: MILD HISS',
      waterTolerancePercent: 2,
      toleranceLabel: '2% (Deeply Offended)',
      reassurances: [
        'Hypoallergenic Lavender Cloud Foam',
        'Stress-Free Warm Misting (No direct faucet blast)',
        '100% Guaranteed Dry-Towel Cuddles afterwards'
      ],
      packages: [
        {
          id: 'pkg-reluctant',
          name: 'The Reluctant Tabby Special',
          price: 48,
          popular: true,
          description: 'Warm herbal sponge bath (no immersion!), heated flannel burrito wrap, gentle chin scritches, and organic catnip calming mist.'
        },
        {
          id: 'pkg-royal',
          name: 'Full Royal Suds & Blow-Fluff',
          price: 65,
          popular: false,
          description: 'Warm soak with milk thistle & oat soothing bubbles, paw pad botanical balm, and gentle whisper-quiet ultrasonic drying.'
        },
        {
          id: 'pkg-dryfoam',
          name: 'Quick Dry-Foam & Whisker Polish',
          price: 32,
          popular: false,
          description: 'Zero-water enzymatic foam massage, soothing boar bristle de-shedding session, and elderflower ear freshening.'
        }
      ],
      addons: [
        {
          id: 'addon-burrito',
          name: 'Extra Warm Towel Burrito Swaddle',
          detail: 'Heavy Egyptian cotton pre-warmed to 102°F',
          price: 6,
          checkedByDefault: true
        },
        {
          id: 'addon-salmon',
          name: 'Apology Salmon Flakes Treat (Triple Portion)',
          detail: 'Wild Alaskan freeze-dried treats',
          price: 4,
          checkedByDefault: true
        },
        {
          id: 'addon-wand',
          name: 'Distraction Feather Wand Therapy',
          detail: 'Dedicated play assistant during drying',
          price: 5,
          checkedByDefault: false
        },
        {
          id: 'addon-suite',
          name: 'Private Soundproof Bath Suite',
          detail: 'Zero barking dogs, soft classical harp music',
          price: 12,
          checkedByDefault: false
        }
      ],
      testimonials: [
        {
          name: 'Harry the Tabby',
          breed: 'Scottish Fold',
          ageOrRole: '6 yrs old',
          avatarEmoji: '😾',
          avatarBg: 'bg-primary-fixed text-primary',
          stars: 2,
          review: '"I hated every single second of the water, but the heated towel burrito and dried bonito flakes were acceptable. 2/5 stars for water, 5/5 stars for dignity recovery."'
        },
        {
          name: 'Barnaby McWhiskers',
          breed: 'British Shorthair',
          ageOrRole: 'Connoisseur',
          avatarEmoji: '😸',
          avatarBg: 'bg-tertiary-fixed text-tertiary',
          stars: 5,
          review: '"My whiskers have never looked more distinguished. The herbal mist was exquisite and smelled of fresh sweetgrass."'
        }
      ]
    },
    formats: [
      { id: 'spa-single', name: 'Single Feline Session', size: 'Full Spa Experience', price: 48, popular: true },
      { id: 'spa-duo', name: 'Bonded Pair Session', size: 'Dual Grooming Suite', price: 85 }
    ]
  }
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-lincoln',
    author: 'Quentin (Senior Curator)',
    petName: 'Lincoln the Defiant',
    stamp: '🐱',
    message: "'No meowwing you lot,' I whispered strictly during the varnishing hour. Lincoln looked up directly into my soul and bellowed 'meowwww'. I have framed his defiance.",
    timestamp: 'Just now'
  },
  {
    id: 'gb-1',
    author: 'Clara & Mochi',
    petName: 'Mochi (Snowshoe)',
    stamp: '🐾',
    message: 'We adore the Montmartre nocturne! The little sleeping tabby looks just like my Mochi snoozing on winter evenings.',
    timestamp: '2 hours ago'
  },
  {
    id: 'gb-2',
    author: 'Julian Thorne',
    petName: 'Galahad (Maine Coon)',
    stamp: '🎨',
    message: 'The detail in Tabby Picasso’s fish painting brought such a bright smile to my face today. Thank you for this magical space.',
    timestamp: '5 hours ago'
  },
  {
    id: 'gb-3',
    author: 'Sophie Dubois',
    petName: 'Barnaby & Fig',
    stamp: '🥐',
    message: 'Booked the Reluctant Tabby bath for Fig. He was skeptical, but the burrito swaddle works wonders!',
    timestamp: 'Yesterday'
  }
];
