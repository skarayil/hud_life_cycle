import React, { useState } from 'react';
interface BrandLogoProps {
  className?: string;
}
export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className={`relative flex items-center justify-center h-12 ${className}`}>
      {!imgFailed && (
        <img
          src="/logo.png"
          alt="HUD Brand Logo"
          className="h-full w-auto object-contain z-10"
          style={{ filter: 'drop-shadow(0 0 8px var(--hud-primary))' }}
          onError={() => setImgFailed(true)}
        />
      )}
      {}
      {imgFailed && (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto text-hud-cyan"
          style={{ filter: 'drop-shadow(0 0 8px var(--hud-primary))' }}
        >
          {}
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" fill="rgba(0,0,0,0.1)" />
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          {}
          <path d="M50 15 L61 40 L88 40 L66 56 L74 82 L50 66 L26 82 L34 56 L12 40 L39 40 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          {}
          <ellipse cx="50" cy="53" rx="12" ry="5" transform="rotate(30 50 53)" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <ellipse cx="50" cy="53" rx="12" ry="5" transform="rotate(-30 50 53)" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="53" r="3" fill="currentColor" />
          {}
          <circle cx="50" cy="15" r="2.5" fill="currentColor" />
          <circle cx="88" cy="40" r="2.5" fill="currentColor" />
          <circle cx="74" cy="82" r="2.5" fill="currentColor" />
          <circle cx="26" cy="82" r="2.5" fill="currentColor" />
          <circle cx="12" cy="40" r="2.5" fill="currentColor" />
        </svg>
      )}
    </div>
  );
};
