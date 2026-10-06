import React from 'react';

interface BookingSuccessModalProps {
  title: string;
  subtitle: string;
  code: string;
  details: string[];
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  title,
  subtitle,
  code,
  details,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#ffffff] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#d8e3fb] p-6 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#c8ecca] text-[#03210d] flex items-center justify-center mx-auto mb-3 shadow-sm">
          <span className="material-symbols-outlined text-[32px]">check_circle</span>
        </div>

        <h3 className="font-headline-sm text-[20px] text-[#111c2d] font-bold">
          {title}
        </h3>
        <p className="font-body-sm text-[13px] text-[#57423b] mt-1">
          {subtitle}
        </p>

        {/* Confirmation Code Card */}
        <div className="my-4 p-3 rounded-2xl bg-[#f0f3ff] border border-[#d8e3fb]">
          <span className="font-label-sm text-[11px] text-[#7e5700] uppercase font-bold tracking-wider block">
            Confirmation Reference
          </span>
          <span className="font-mono text-[16px] text-[#9f3c16] font-bold tracking-wider">
            {code}
          </span>
        </div>

        {/* Details list */}
        <div className="flex flex-col gap-1.5 text-left bg-[#f9f9ff] p-3 rounded-xl border border-[#d8e3fb]/40 mb-4">
          {details.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-[12px] text-[#57423b]">
              <span className="material-symbols-outlined text-[16px] text-[#446349]">
                verified
              </span>
              <span>{d}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#9f3c16] hover:bg-[#bf542c] text-white font-label-md text-[13px] font-semibold shadow-md active:scale-95 transition-all"
        >
          Return to Gallery
        </button>
      </div>
    </div>
  );
};
