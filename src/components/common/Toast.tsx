import React from 'react';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info' | 'paw';
  text: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'paw':
        return 'pets';
      case 'info':
        return 'info';
      case 'success':
      default:
        return 'check_circle';
    }
  };

  return (
    <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm pointer-events-none animate-bounce">
      <div className="pointer-events-auto bg-[#111c2d]/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-white/10 text-[13px]">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="material-symbols-outlined text-[18px] text-[#fdbe50] shrink-0">
            {getIcon()}
          </span>
          <span className="font-label-md text-[12px] truncate">{toast.text}</span>
        </div>
        <button
          onClick={onDismiss}
          className="text-white/60 hover:text-white px-1 text-sm font-bold shrink-0"
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
