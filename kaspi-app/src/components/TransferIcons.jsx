import React from 'react';

// Original, generic line glyphs for the Переводы screen, drawn to match the
// reference's thin red style. These are plain functional UI icons (people /
// bank building / scan frame) — not brand logos.

const RED = '#F14635';

// "Клиенту Kaspi" — the project's own traced person asset (user-family.svg) as
// the main figure, plus the Kaspi figure asset (icon_white.svg) kept as the small
// mark at lower-right. Both recoloured via CSS mask (assets referenced, not drawn).
export const IconClientKaspi = ({ size = 24, color = RED }) => (
  <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
    {/* main person */}
    <div style={{
      width: size, height: size, backgroundColor: color,
      WebkitMaskImage: 'url(/icons/user-family.svg)', maskImage: 'url(/icons/user-family.svg)',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain', maskSize: 'contain',
      WebkitMaskPosition: 'center', maskPosition: 'center'
    }} />
    {/* Kaspi mark, lower-right */}
    <div style={{
      position: 'absolute', right: 0, bottom: '-0.5px',
      width: size * 0.5, height: size * 0.64,
      backgroundColor: color,
      WebkitMaskImage: 'url(/kaspi_assets/icon_white.svg)', maskImage: 'url(/kaspi_assets/icon_white.svg)',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain', maskSize: 'contain',
      WebkitMaskPosition: 'center bottom', maskPosition: 'center bottom'
    }} />
  </div>
);

// "Клиенту другого банка" — the project's own traced bank asset, recoloured via mask.
export const IconOtherBank = ({ size = 24, color = RED }) => (
  <div style={{
    width: size, height: size, backgroundColor: color, flexShrink: 0,
    WebkitMaskImage: 'url(/icons/bank.svg)', maskImage: 'url(/icons/bank.svg)',
    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain', maskSize: 'contain',
    WebkitMaskPosition: 'center', maskPosition: 'center'
  }} />
);

// Contacts icon used in the phone recipient field — filled person inside a ring.
export const IconContact = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    {/* filled head + torso */}
    <circle cx="12" cy="9.7" r="3.2" fill={color} />
    <path d="M5.8 18.4c0.8-3.2 3.1-4.9 6.2-4.9s5.4 1.7 6.2 4.9z" fill={color} />
  </svg>
);

// Scan icon used in the recipient field — corner brackets around a card.
export const IconScanCard = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* 4 corner brackets */}
    <path d="M3 8V5.3C3 4.05 4.05 3 5.3 3H8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3h2.7C19.95 3 21 4.05 21 5.3V8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 16v2.7C3 19.95 4.05 21 5.3 21H8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 21h2.7C19.95 21 21 19.95 21 18.7V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* card body + slot line */}
    <rect x="6.6" y="9" width="10.8" height="6" rx="1.6" stroke={color} strokeWidth="1.8" />
    <path d="M9 12h6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
