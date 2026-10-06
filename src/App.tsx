import React, { useState, useEffect } from 'react';
import { ARTWORKS, INITIAL_GUESTBOOK } from './data/mockData';
import { TabType, ScreenType, Artwork, GuestbookEntry } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ExhibitionsScreen } from './components/ExhibitionsScreen';
import { ArtworksScreen } from './components/ArtworksScreen';
import { ArtworkDetailScreen } from './components/ArtworkDetailScreen';
import { SpaDetailScreen } from './components/SpaDetailScreen';
import { CatArtistsScreen } from './components/CatArtistsScreen';
import { SavedScreen } from './components/SavedScreen';
import { ViewInRoomModal } from './components/modals/ViewInRoomModal';
import { ZoomInspectModal } from './components/modals/ZoomInspectModal';
import { GuestbookModal } from './components/modals/GuestbookModal';
import { OrderPrintModal } from './components/modals/OrderPrintModal';
import { SearchModal } from './components/modals/SearchModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { BookingSuccessModal } from './components/modals/BookingSuccessModal';
import { Toast, ToastMessage } from './components/common/Toast';
import { storage, STORAGE_KEYS } from './utils/storage';
import { shareContent } from './utils/share';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>({
    type: 'main',
    tab: 'exhibitions',
  });

  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    const raw = storage.getItem<string[]>(STORAGE_KEYS.SAVED_ARTWORKS, ['artwork-stargazing']);
    return new Set(raw);
  });

  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(() =>
    storage.getItem<GuestbookEntry[]>(STORAGE_KEYS.GUESTBOOK_ENTRIES, INITIAL_GUESTBOOK)
  );

  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'paw' = 'success') => {
    setToast({ id: `toast-${Date.now()}`, text, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    storage.setItem(STORAGE_KEYS.SAVED_ARTWORKS, Array.from(savedIds));
  }, [savedIds]);

  useEffect(() => {
    storage.setItem(STORAGE_KEYS.GUESTBOOK_ENTRIES, guestbookEntries);
  }, [guestbookEntries]);

  // Modals state
  const [activeRoomArtwork, setActiveRoomArtwork] = useState<Artwork | null>(null);
  const [activeZoomArtwork, setActiveZoomArtwork] = useState<Artwork | null>(null);
  const [activeOrderArtwork, setActiveOrderArtwork] = useState<{
    artwork: Artwork;
    formatName: string;
    price: number;
  } | null>(null);

  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    title: string;
    subtitle: string;
    code: string;
    details: string[];
  } | null>(null);

  const handleToggleSave = (artworkId: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(artworkId)) {
        next.delete(artworkId);
        showToast('Removed from your saved collection', 'info');
      } else {
        next.add(artworkId);
        showToast('Saved to your feline collection!', 'paw');
      }
      return next;
    });
  };

  const handleSelectArtwork = (artworkId: string) => {
    const targetArt = ARTWORKS.find((a) => a.id === artworkId);
    const returnTab = currentScreen.type === 'main' ? currentScreen.tab : 'artworks';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetArt?.isSpaExperience) {
      setCurrentScreen({
        type: 'spa-detail',
        artworkId,
        returnTab,
      });
    } else {
      setCurrentScreen({
        type: 'artwork-detail',
        artworkId,
        returnTab,
      });
    }
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentScreen.type === 'artwork-detail' || currentScreen.type === 'spa-detail') {
      setCurrentScreen({
        type: 'main',
        tab: currentScreen.returnTab || 'exhibitions',
      });
    } else {
      setCurrentScreen({
        type: 'main',
        tab: 'exhibitions',
      });
    }
  };

  const handleTabChange = (tab: TabType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen({
      type: 'main',
      tab,
    });
  };

  const handleAddGuestbookEntry = (
    entryData: Omit<GuestbookEntry, 'id' | 'timestamp'>
  ) => {
    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      ...entryData,
      timestamp: 'Just now',
    };
    setGuestbookEntries((prev) => [newEntry, ...prev]);
    showToast('Your whisker was inscribed in the guestbook!', 'paw');
  };

  const isDetailScreen =
    currentScreen.type === 'artwork-detail' || currentScreen.type === 'spa-detail';

  const currentTab =
    currentScreen.type === 'main' ? currentScreen.tab : currentScreen.returnTab || 'exhibitions';

  const currentArtwork =
    currentScreen.type === 'artwork-detail'
      ? ARTWORKS.find((a) => a.id === currentScreen.artworkId) || ARTWORKS[0]
      : ARTWORKS[0];

  const handleHeaderShare = async () => {
    if (currentScreen.type === 'artwork-detail') {
      const res = await shareContent({
        title: `${currentArtwork.title} by ${currentArtwork.artistName} | Purr & Bristle`,
        text: `"${currentArtwork.title}" by ${currentArtwork.artistName} (${currentArtwork.collection}). ${currentArtwork.description}`,
      });
      showToast(res.message, 'info');
    } else if (currentScreen.type === 'spa-detail') {
      const res = await shareContent({
        title: 'The Signature Tabby Bath & Towel Burrito at Purr & Bristle',
        text: `Harry's Bath Day: DEFCON MILD HISS (2% water tolerance). Certified Burrito Masters session!`,
      });
      showToast(res.message, 'info');
    } else {
      const res = await shareContent({
        title: 'Purr & Bristle - Feline Fine Art & Whimsical Exhibitions',
        text: 'Explore whimsical storybook feline exhibitions and masterworks at Purr & Bristle Gallery.',
      });
      showToast(res.message, 'info');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d] flex flex-col items-center">
      {/* Toast Notification */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Container wrapper ensuring faithful display */}
      <div className="w-full max-w-md min-h-screen bg-[#f9f9ff] relative shadow-2xl flex flex-col">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          isDetail={isDetailScreen}
          onBack={handleBack}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenSaved={() => handleTabChange('saved')}
          onOpenProfile={() => setIsProfileOpen(true)}
          savedCount={savedIds.size}
          onShare={handleHeaderShare}
        />

        {/* Main Body View */}
        <main className="flex-1 w-full pt-16">
          {currentScreen.type === 'main' && currentScreen.tab === 'exhibitions' && (
            <ExhibitionsScreen
              onSelectArtwork={handleSelectArtwork}
              onSelectSalon={() => handleTabChange('artworks')}
              onSelectTab={handleTabChange}
              onOpenGuestbook={() => setIsGuestbookOpen(true)}
              onToggleSave={handleToggleSave}
              savedIds={savedIds}
            />
          )}

          {currentScreen.type === 'main' && currentScreen.tab === 'artworks' && (
            <ArtworksScreen
              onSelectArtwork={handleSelectArtwork}
              onAcquireArtwork={(art) =>
                setActiveOrderArtwork({
                  artwork: art,
                  formatName: art.formats[0].name,
                  price: art.price,
                })
              }
              onInspectArtwork={(art) => setActiveZoomArtwork(art)}
              onToggleSave={handleToggleSave}
              savedIds={savedIds}
            />
          )}

          {currentScreen.type === 'main' && currentScreen.tab === 'cat-artists' && (
            <CatArtistsScreen onSelectArtwork={handleSelectArtwork} />
          )}

          {currentScreen.type === 'main' && currentScreen.tab === 'saved' && (
            <SavedScreen
              savedIds={savedIds}
              onSelectArtwork={handleSelectArtwork}
              onRemoveSaved={handleToggleSave}
              onAcquireArtwork={(art) =>
                setActiveOrderArtwork({
                  artwork: art,
                  formatName: art.formats[0].name,
                  price: art.price,
                })
              }
              onBrowseArtworks={() => handleTabChange('artworks')}
            />
          )}

          {currentScreen.type === 'artwork-detail' && (
            <ArtworkDetailScreen
              artwork={currentArtwork}
              onBack={handleBack}
              onOpenInRoom={() => setActiveRoomArtwork(currentArtwork)}
              onOpenZoom={() => setActiveZoomArtwork(currentArtwork)}
              onOrderPrint={(formatName, price) =>
                setActiveOrderArtwork({
                  artwork: currentArtwork,
                  formatName,
                  price,
                })
              }
              onToggleSave={handleToggleSave}
              isSaved={savedIds.has(currentArtwork.id)}
            />
          )}

          {currentScreen.type === 'spa-detail' && (
            <SpaDetailScreen
              onBack={handleBack}
              onBookSuccess={(summary, total) => {
                setBookingSuccess({
                  title: 'Tabby Spa Session Secured!',
                  subtitle: `Harry's appointment has been reserved for ${summary}`,
                  code: `BURRITO-${Math.floor(1000 + Math.random() * 9000)}`,
                  details: [
                    'Pre-warmed Egyptian cotton burrito prepared at 102°F',
                    'Triple portion Alaskan salmon treats on standby',
                    `Total paid: $${total.toFixed(2)} with Gentle Paws Guarantee`,
                  ],
                });
              }}
            />
          )}
        </main>

        {/* Bottom Navigation (Only visible on main tabs) */}
        {!isDetailScreen && (
          <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />
        )}
      </div>

      {/* Interactive Modals */}
      {activeRoomArtwork && (
        <ViewInRoomModal
          artwork={activeRoomArtwork}
          onClose={() => setActiveRoomArtwork(null)}
        />
      )}

      {activeZoomArtwork && (
        <ZoomInspectModal
          artwork={activeZoomArtwork}
          onClose={() => setActiveZoomArtwork(null)}
        />
      )}

      {activeOrderArtwork && (
        <OrderPrintModal
          artwork={activeOrderArtwork.artwork}
          formatName={activeOrderArtwork.formatName}
          price={activeOrderArtwork.price}
          onClose={() => setActiveOrderArtwork(null)}
          onSuccess={(orderId) => {
            setActiveOrderArtwork(null);
            setBookingSuccess({
              title: 'Archival Print Order Confirmed!',
              subtitle: `Thank you for supporting feline storybook illustrators.`,
              code: orderId,
              details: [
                `${activeOrderArtwork.artwork.title} (${activeOrderArtwork.formatName})`,
                'Printed with archival vegetable inks on 300gsm Arches paper',
                'Shipped in protective biodegradable flat-mailer',
              ],
            });
          }}
        />
      )}

      {isGuestbookOpen && (
        <GuestbookModal
          entries={guestbookEntries}
          onAddEntry={handleAddGuestbookEntry}
          onClose={() => setIsGuestbookOpen(false)}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelectArtwork={handleSelectArtwork}
          onSelectTab={handleTabChange}
        />
      )}

      {isProfileOpen && (
        <ProfileModal
          onClose={() => setIsProfileOpen(false)}
          savedCount={savedIds.size}
        />
      )}

      {bookingSuccess && (
        <BookingSuccessModal
          title={bookingSuccess.title}
          subtitle={bookingSuccess.subtitle}
          code={bookingSuccess.code}
          details={bookingSuccess.details}
          onClose={() => setBookingSuccess(null)}
        />
      )}
    </div>
  );
}
