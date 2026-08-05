import React from 'react';

interface FlagIconProps {
  code: string;
  className?: string;
}

export function FlagIcon({ code, className = "w-7 h-5" }: FlagIconProps) {
  const norm = (code || 'fr').toLowerCase().trim();

  if (norm === 'fr' || norm === 'french') {
    return (
      <div className={`inline-flex items-center justify-center overflow-hidden shrink-0 select-none ${className}`}>
        <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
          <rect width="1" height="2" x="0" fill="#00209F" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#F02334" />
        </svg>
      </div>
    );
  }

  if (norm === 'de' || norm === 'german') {
    return (
      <div className={`inline-flex items-center justify-center overflow-hidden shrink-0 select-none ${className}`}>
        <svg viewBox="0 0 5 3" className="w-full h-full object-cover">
          <rect width="5" height="1" y="0" fill="#111111" />
          <rect width="5" height="1" y="1" fill="#DD0000" />
          <rect width="5" height="1" y="2" fill="#FFCE00" />
        </svg>
      </div>
    );
  }

  if (norm === 'es' || norm === 'spanish') {
    return (
      <div className={`inline-flex items-center justify-center overflow-hidden shrink-0 select-none ${className}`}>
        <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
          <rect width="3" height="2" fill="#AA151B" />
          <rect width="3" height="1" y="0.5" fill="#F1BF00" />
        </svg>
      </div>
    );
  }

  if (norm === 'it' || norm === 'italian') {
    return (
      <div className={`inline-flex items-center justify-center overflow-hidden shrink-0 select-none ${className}`}>
        <svg viewBox="0 0 3 2" className="w-full h-full object-cover">
          <rect width="1" height="2" x="0" fill="#009246" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#CE2B37" />
        </svg>
      </div>
    );
  }

  return <span className="text-xl">🌐</span>;
}
