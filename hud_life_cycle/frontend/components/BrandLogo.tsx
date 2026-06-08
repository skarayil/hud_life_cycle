import React from 'react';
import logoUrl from '../assets/logo.png';

interface BrandLogoProps {
  className?: string;
}
export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center h-12 w-12 ${className}`}>
      <div
        className="h-full w-full z-10"
        style={{
          backgroundColor: 'var(--hud-primary)',
          WebkitMaskImage: `url(${logoUrl})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskImage: `url(${logoUrl})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          filter: 'drop-shadow(0 0 8px var(--hud-primary))'
        }}
      />
    </div>
  );
};
