import React from 'react';

interface FlagIconProps {
  code: string;
  className?: string;
}

export function FlagIcon({ code, className = "w-7 h-5" }: FlagIconProps) {
  const norm = (code || 'fr').toLowerCase().trim();

  if (norm === 'fr' || norm === 'french') {
    return (
      <svg viewBox="0 0 3 2" className={`inline-block rounded shadow-sm align-middle overflow-hidden ${className}`}>
        <rect width="1" height="2" x="0" fill="#002395" />
        <rect width="1" height="2" x="1" fill="#FFFFFF" />
        <rect width="1" height="2" x="2" fill="#ED2939" />
      </svg>
    );
  }

  if (norm === 'de' || norm === 'german') {
    return (
      <svg viewBox="0 0 5 3" className={`inline-block rounded shadow-sm align-middle overflow-hidden ${className}`}>
        <rect width="5" height="1" y="0" fill="#000000" />
        <rect width="5" height="1" y="1" fill="#DD0000" />
        <rect width="5" height="1" y="2" fill="#FFCE00" />
      </svg>
    );
  }

  if (norm === 'es' || norm === 'spanish') {
    return (
      <svg viewBox="0 0 3 2" className={`inline-block rounded shadow-sm align-middle overflow-hidden ${className}`}>
        <rect width="3" height="2" fill="#AA151B" />
        <rect width="3" height="1" y="0.5" fill="#F1BF00" />
      </svg>
    );
  }

  if (norm === 'it' || norm === 'italian') {
    return (
      <svg viewBox="0 0 3 2" className={`inline-block rounded shadow-sm align-middle overflow-hidden ${className}`}>
        <rect width="1" height="2" x="0" fill="#009246" />
        <rect width="1" height="2" x="1" fill="#FFFFFF" />
        <rect width="1" height="2" x="2" fill="#CE2B37" />
      </svg>
    );
  }

  return <span className="text-xl">🌐</span>;
}
