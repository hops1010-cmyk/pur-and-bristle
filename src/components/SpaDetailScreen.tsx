import React, { useState } from 'react';
import { ARTWORKS } from '../data/mockData';
import { playGentleChime } from '../utils/audio';
import { shareContent } from '../utils/share';
import { SmartImage } from './common/SmartImage';

interface SpaDetailScreenProps {
  onBack: () => void;
  onBookSuccess: (summary: string, total: number) => void;
}

export const SpaDetailScreen: React.FC<SpaDetailScreenProps> = ({ onBack, onBookSuccess }) => {
  const spaArtwork = ARTWORKS.find((a) => a.id === 'artwork-harry') || ARTWORKS[3];
  const spaData = spaArtwork.spaData!;

  const [selectedPackage, setSelectedPackage] = useState(spaData.packages[0]);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
    'addon-burrito': true,
    'addon-salmon': true,
  });
  const [bookingState, setBookingState] = useState<'idle' | 'booking' | 'booked'>('idle');
  const [shareToast, setShareToast] = useState<string | null>(null);

  const handleShareSpa = async () => {
    playGentleChime();
    const result = await shareContent({
      title: 'The Signature Tabby Bath & Towel Burrito at Purr & Bristle',
      text: `Harry the Tabby is at DEFCON: MILD HISS (2% Water Tolerance). Check out the Reluctant Tabby Special ($48) including 102°F heated Egyptian cotton swaddle and triple apology salmon flakes!`,
      url: window.location.href,
    });
    setShareToast(result.message);
    setTimeout(() => setShareToast(null), 3500);
  };

  const addonsTotal = spaData.addons.reduce((acc, addon) => {
    return acc + (selectedAddons[addon.id] ? addon.price : 0);
  }, 0);

  const grandTotal = selectedPackage.price + addonsTotal;

  const toggleAddon = (addonId: string) => {
    playGentleChime();
    setSelectedAddons((prev) => ({
      ...prev,
      [addonId]: !prev[addonId],
    }));
  };

  const handleBook = () => {
    playGentleChime();
    setBookingState('booking');
    setTimeout(() => {
      setBookingState('booked');
      onBookSuccess(
        `${selectedPackage.name} + ${addonsTotal > 0 ? 'Burrito & Treats' : 'Care'}`,
        grandTotal
      );
    }, 1000);
  };

  const getSummaryString = () => {
    const count = Object.values(selectedAddons).filter(Boolean).length;
    if (count === 2 && selectedAddons['addon-burrito'] && selectedAddons['addon-salmon']) {
      return `${selectedPackage.name.replace('The ', '')} + Burrito & Treats`;
    }
    if (count > 0) {
      return `${selectedPackage.name.replace('The ', '')} + ${count} Add-ons`;
    }
    return `${selectedPackage.name.replace('The ', '')} Only`;
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-2 max-w-xl mx-auto bg-[#f9f9ff] min-h-screen">
      {/* Top Hero Illustration Card */}
      <div className="px-margin pt-space-md">
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#f0f3ff] shadow-[0_8px_24px_-4px_rgba(78,52,46,0.08)] border border-[#d8e3fb]/60">
          <div className="relative aspect-square w-full overflow-hidden">
            <SmartImage
              alt="Harry the grumpy ginger tabby swaddled in a striped towel like a burrito after a bath"
              className="w-full h-full object-cover"
              src={spaArtwork.image}
              fallbackIcon="spa"
              fallbackText="Harry's Spa Session"
            />

            {/* Floating Badges */}
            <div className="absolute top-space-md left-space-md flex flex-wrap gap-space-xs">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-md text-[#9f3c16] font-label-md text-[12px] shadow-sm font-semibold">
                <span className="material-symbols-outlined text-[14px]">spa</span>
                Seasonal Spa Experience
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#446349] text-white font-label-md text-[12px] shadow-sm font-semibold">
                <span className="material-symbols-outlined text-[14px]">water_drop</span>
                Water-Shy Friendly
              </span>
            </div>

            <div className="absolute top-space-md right-space-md">
              <button
                aria-label="Share Spa Experience"
                onClick={handleShareSpa}
                className="w-9 h-9 rounded-full bg-[#ffffff]/90 backdrop-blur-md text-[#111c2d] hover:text-[#9f3c16] flex items-center justify-center shadow-md active:scale-95 transition-transform"
                title="Share Harry's Bath Day"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>
            </div>

            <div className="absolute bottom-space-sm right-space-sm bg-[#fdbe50]/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span
                className="material-symbols-outlined text-[#714d00] text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pets
              </span>
              <span className="font-label-sm text-[11px] text-[#714d00] uppercase tracking-wider font-bold">
                Certified Burrito Masters
              </span>
            </div>
          </div>

          {/* Service Title Box */}
          <div className="p-space-lg bg-[#ffffff]">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-md text-[12px] text-[#7e5700] uppercase tracking-wider font-bold">
                {spaData.exclusiveSubtitle}
              </span>
              <div className="flex items-center gap-1 text-[#7e5700]">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-label-lg text-[14px] text-[#111c2d] font-bold">
                  {spaData.rating}
                </span>
                <span className="text-[#57423b] font-body-sm text-[12px]">
                  ({spaData.scritchesCount} scritches)
                </span>
              </div>
            </div>

            <h2 className="font-headline-md text-[22px] text-[#111c2d] font-semibold leading-snug">
              {spaArtwork.title}
            </h2>
            <p className="font-body-md text-[14px] text-[#57423b] mt-space-xs leading-relaxed">
              {spaArtwork.description}
            </p>
          </div>
        </div>
      </div>

      {/* Humorous Harry Reluctance Meter */}
      <div className="px-margin mt-space-lg">
        <div className="bg-[#e7eeff] rounded-2xl p-space-md shadow-sm border border-[#d8e3fb]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[#9f3c16] text-[20px]">
                sentiment_very_dissatisfied
              </span>
              <span className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">
                Temperament Gauge
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-label-sm text-[11px] uppercase font-bold tracking-wider">
              {spaData.temperamentStatus}
            </span>
          </div>

          <div className="mt-space-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="font-body-sm text-[12px] text-[#57423b] font-medium">
                Harry's Water Tolerance
              </span>
              <span className="font-label-md text-[12px] text-[#9f3c16] font-bold">
                {spaData.toleranceLabel}
              </span>
            </div>
            {/* Playful Meter Bar */}
            <div className="h-3.5 w-full bg-[#d8e3fb] rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-[#9f3c16] rounded-full transition-all duration-700 animate-pulse"
                style={{ width: `${spaData.waterTolerancePercent * 3.5}%` }}
              />
            </div>
          </div>

          {/* Calming reassurance chips */}
          <div className="mt-space-md pt-space-sm flex flex-col gap-space-xs bg-[#ffffff]/85 rounded-xl p-space-sm border border-[#d8e3fb]/40">
            {spaData.reassurances.map((text, i) => (
              <div key={i} className="flex items-center gap-space-xs text-[#57423b]">
                <span className="material-symbols-outlined text-[16px] text-[#446349]">
                  check_circle
                </span>
                <span className="font-body-sm text-[12px] font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spa Service Packages Section */}
      <div className="px-margin mt-space-xl">
        <div className="flex items-center justify-between mb-space-sm">
          <h3 className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">
            Curated Care Packages
          </h3>
          <span className="font-label-sm text-[11px] text-[#9f3c16] uppercase font-bold tracking-wider">
            Select One
          </span>
        </div>

        {/* Package Radio Cards Group */}
        <div className="flex flex-col gap-space-sm">
          {spaData.packages.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => {
                  playGentleChime();
                  setSelectedPackage(pkg);
                }}
                className={`relative p-space-md rounded-2xl bg-[#ffffff] cursor-pointer transition-all border ${
                  isSelected
                    ? 'ring-2 ring-[#9f3c16] border-[#9f3c16] shadow-md'
                    : 'border-[#d8e3fb] shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-space-xs">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#9f3c16] text-white'
                          : 'bg-[#d8e3fb] text-[#57423b]'
                      }`}
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-label-lg text-[14px] text-[#111c2d] font-semibold">
                        {pkg.name}
                      </h4>
                      {pkg.popular && (
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-[#ffdead] text-[#281900] font-label-sm text-[10px] font-bold">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`font-headline-sm text-[18px] font-bold ${
                      isSelected ? 'text-[#9f3c16]' : 'text-[#111c2d]'
                    }`}
                  >
                    ${pkg.price}
                  </span>
                </div>
                <p className="font-body-sm text-[12px] text-[#57423b] mt-space-sm pl-8 leading-relaxed">
                  {pkg.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customized Comfort Add-ons */}
      <div className="px-margin mt-space-xl">
        <div className="flex items-center justify-between mb-space-sm">
          <div>
            <h3 className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">
              Custom Dignity Add-ons
            </h3>
            <p className="font-body-sm text-[12px] text-[#57423b]">
              Small peace offerings for emotional restoration
            </p>
          </div>
          <span className="material-symbols-outlined text-[#7e5700] text-[22px]">
            card_giftcard
          </span>
        </div>

        <div className="grid grid-cols-1 gap-space-xs">
          {spaData.addons.map((addon) => {
            const isChecked = !!selectedAddons[addon.id];
            return (
              <label
                key={addon.id}
                className="flex items-center justify-between p-space-md rounded-2xl bg-[#ffffff] shadow-sm cursor-pointer select-none border border-[#d8e3fb]/60 hover:border-[#9f3c16]/30 transition-all"
              >
                <div className="flex items-center gap-space-sm min-w-0">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAddon(addon.id)}
                    className="w-5 h-5 rounded accent-[#9f3c16] text-white cursor-pointer"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-[13px] text-[#111c2d] font-medium truncate">
                      {addon.name}
                    </span>
                    <span className="font-body-sm text-[11px] text-[#57423b]">
                      {addon.detail}
                    </span>
                  </div>
                </div>
                <span className="font-label-lg text-[13px] text-[#9f3c16] font-bold ml-2 shrink-0">
                  +${addon.price}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Feline Reviews & Testimonials Carousel */}
      <div className="mt-space-xl px-margin">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[#7e5700] text-[20px]">
              format_quote
            </span>
            <h3 className="font-headline-sm text-[18px] text-[#111c2d] font-semibold">
              Client Purrs &amp; Grievances
            </h3>
          </div>
          <span className="font-label-sm text-[11px] text-[#57423b] font-medium">
            Verified Guests
          </span>
        </div>

        <div className="flex flex-col gap-space-sm">
          {spaData.testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-space-md rounded-2xl bg-[#f0f3ff] shadow-sm border border-[#d8e3fb]/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-headline-sm text-[18px] shadow-sm ${t.avatarBg}`}
                  >
                    {t.avatarEmoji}
                  </div>
                  <div>
                    <h4 className="font-label-lg text-[14px] text-[#111c2d] font-semibold">
                      {t.name}
                    </h4>
                    <p className="font-body-sm text-[11px] text-[#57423b]">
                      {t.breed} • {t.ageOrRole}
                    </p>
                  </div>
                </div>

                <div className="flex text-[#7e5700] text-sm">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: s <= t.stars ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-space-sm font-body-md text-[13px] text-[#111c2d] italic leading-relaxed">
                {t.review}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Comfort Note */}
      <div className="px-margin mt-space-lg mb-space-md">
        <div className="p-space-md rounded-2xl bg-[#c8ecca]/40 flex items-start gap-space-sm border border-[#446349]/20">
          <span className="material-symbols-outlined text-[#446349] text-[22px] mt-0.5 shrink-0">
            verified_user
          </span>
          <div className="text-[#111c2d]">
            <h5 className="font-label-lg text-[14px] font-semibold">
              Purr &amp; Bristle Care Commitment
            </h5>
            <p className="font-body-sm text-[12px] text-[#57423b] mt-0.5 leading-relaxed">
              Felines are never immersed without consent. If stress signals surpass mild grumpiness, we immediately pivot to cuddle and dry grooming protocols.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#f9f9ff]/95 backdrop-blur-xl shadow-[0_-8px_24px_rgba(78,52,46,0.08)] pb-safe border-t border-[#d8e3fb]">
        <div className="max-w-xl mx-auto px-margin py-3 flex items-center justify-between gap-space-md">
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md text-[22px] text-[#9f3c16] font-bold">
                ${grandTotal.toFixed(2)}
              </span>
              <span className="font-body-sm text-[12px] text-[#57423b]">total</span>
            </div>
            <span className="font-label-sm text-[11px] text-[#57423b] truncate font-medium">
              {getSummaryString()}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-[240px]">
            <button
              onClick={handleShareSpa}
              aria-label="Share Spa Experience"
              className="w-12 h-12 rounded-xl bg-[#e7eeff] hover:bg-[#d8e3fb] text-[#111c2d] hover:text-[#9f3c16] flex items-center justify-center shadow-sm active:scale-95 transition-all shrink-0"
              title="Share Harry's Bath Day with friends"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>

            <button
              onClick={handleBook}
              disabled={bookingState !== 'idle'}
              className={`flex-1 py-3.5 px-3 rounded-xl font-label-lg text-[13px] font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                bookingState === 'booked'
                  ? 'bg-[#446349] text-white'
                  : 'bg-[#9f3c16] hover:bg-[#bf542c] text-white'
              }`}
            >
              {bookingState === 'booking' ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Securing...</span>
                </>
              ) : bookingState === 'booked' ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Booked!</span>
                </>
              ) : (
                <>
                  <span>Book Spa Day</span>
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share Toast Banner */}
        {shareToast && (
          <div className="px-margin pb-1">
            <div className="p-2 rounded-lg bg-[#c8ecca] border border-[#446349]/30 text-[#03210d] font-label-sm text-[11px] flex items-center justify-between shadow-sm animate-fade-in">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#446349]">
                  check_circle
                </span>
                {shareToast}
              </span>
              <button onClick={() => setShareToast(null)} className="font-bold px-1">
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Gentle Promise Badge inside footer */}
        <div className="bg-[#f0f3ff] py-1 px-margin flex items-center justify-center gap-1.5 text-center border-t border-[#d8e3fb]/40">
          <span className="material-symbols-outlined text-[#446349] text-[14px]">
            chevron_left
          </span>
          <span className="font-label-sm text-[11px] text-[#57423b] font-medium">
            Gentle Paws Promise • Never Forcefully Submerged
          </span>
        </div>
      </div>
    </div>
  );
};
