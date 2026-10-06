import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackIcon?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt = 'Feline artwork illustration',
  className = '',
  fallbackText = 'Artwork in Atelier',
  fallbackIcon = 'palette',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-[#ffdbcf]/60 via-[#f0f3ff] to-[#d8e3fb]/70 flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-[#9f3c16] mb-1.5">
          <span className="material-symbols-outlined text-[20px]">{fallbackIcon}</span>
        </div>
        <span className="font-label-sm text-[11px] text-[#57423b] font-medium line-clamp-1">
          {alt || fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-[#e7eeff] animate-pulse flex items-center justify-center">
          <span className="material-symbols-outlined text-[#d8e3fb] text-[24px]">
            image
          </span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...rest}
      />
    </div>
  );
};
