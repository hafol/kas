import React from 'react';

// EXACT HIGH-FIDELITY VECTOR ICONS FOR KASPI SERVICES
// Colors: Kaspi Red #E83D2F, Magnum Red #E30649

// 1. Магазин (Exact vector from cart-icon-red.svg)
export const IconShop = ({ size = 35.5, color = "#DF4E3E" }) => (
  <svg
    width={size}
    height={size}
    viewBox="22 10 156 138"
    fill="none"
    stroke={color}
    strokeWidth="13.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Handle and basket */}
    <path d="M36.5 25.5H47Q55 25.5 57 33L74.3 91.5Q77 100.5 86 100.5H136Q145.2 100.5 148 91.5L160.4 52.5Q162.9 44.5 155 44.5H60.3" />
    {/* Wheels */}
    <circle cx="87" cy="129.5" r="10.3" fill={color} stroke="none" />
    <circle cx="134.5" cy="129.5" r="10.3" fill={color} stroke="none" />
  </svg>
);

// 2. Мой Банк (Exact vector from devices-icon-red.svg)
export const IconMyBank = ({ size = 36, color = "#DF4E3E" }) => (
  <svg
    width={size}
    height={size}
    viewBox="50 20 162 150"
    fill="none"
    stroke={color}
    strokeWidth="12"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Monitor (outline cut away where the phone overlaps) */}
    <path d="M74 59V50a13 13 0 0 1 13-13h94a13 13 0 0 1 13 13v58a13 13 0 0 1-13 13H138" />
    {/* Monitor base */}
    <path d="M137 138h33" />
    {/* Phone */}
    <rect x="68" y="77" width="50" height="75" rx="11" />
    {/* Phone home button */}
    <path d="M90 132h7" strokeWidth="10" />
  </svg>
);

// 3. Платежи (Exact vector from receipt-icon-red.svg)
export const IconPayments = ({ size = 30.5, color = "#DF4E3E" }) => (
  <svg
    width={size}
    height={size}
    viewBox="45 30 302 286"
    fill="none"
    stroke={color}
    strokeWidth="28"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Printer slot (open where the receipt overlaps) */}
    <path d="M119 128H89a20 20 0 0 1-20-20V74a20 20 0 0 1 20-20h214a20 20 0 0 1 20 20v34a20 20 0 0 1-20 20h-34" />
    {/* Receipt with wavy bottom edge */}
    <path d="M119 290V106a8 8 0 0 1 8-8h134a8 8 0 0 1 8 8v184C257 290 257 283 245 283C232.5 283 232.5 292 220 292C207.5 292 207.5 283 195 283C182.5 283 182.5 292 170 292C157 292 157 283 144 283C131.5 283 131.5 290 119 290Z" />
    {/* Text lines */}
    <path d="M167 167.5h54M167 211.5h54" strokeWidth="24" />
  </svg>
);

// 4. Переводы (Exact vector from repeat-icon-red.svg)
export const IconTransfers = ({ size = 30.5, color = "#DF4E3E" }) => (
  <svg
    width={size}
    height={size}
    viewBox="20 20 146 142"
    fill="none"
    stroke={color}
    strokeWidth="13"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Top arrow, pointing right */}
    <path d="M36.5 90.5V80.5a28 28 0 0 1 28-28h83" />
    <path d="M129.5 34.5l18 18-18 18" />
    {/* Bottom arrow, pointing left */}
    <path d="M149.5 92.5v8a28 28 0 0 1-28 28h-84" />
    <path d="M55.5 110.5l-18 18 18 18" />
  </svg>
);

// 5. Magnum (Official squircle + APK vector "m" with authentic #EF1063 raspberry-pink color)
export const IconMagnum = ({ size = 36 }) => (
  <div style={{
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${size * 0.25}px`,
    backgroundColor: '#EF1063',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }}>
    <svg width={size * 0.70} height={size * 0.40} viewBox="0 2.8 14.22 8.2" fill="none">
      <path
        d="M5.098 2.97L5.183 4.147H5.217C5.712 3.227 6.411 2.8 7.298 2.8C8.423 2.8 9.023 3.26 9.412 4.147H9.446C10.145 3.073 10.963 2.8 11.68 2.8C13.806 2.8 14.22 4.267 14.22 5.783V10.983H11.492V6.414C11.492 5.681 11.526 4.965 10.742 4.965C9.923 4.965 9.787 5.612 9.787 6.362V10.983H7.058V6.414C7.058 5.681 7.093 4.965 6.308 4.965C5.49 4.965 5.353 5.612 5.353 6.362V10.983H2.66V6.175C1.978 6.192 1.245 5.8 1.279 4.777C0.512 4.727 0 4.198 0 3.21V2.97H5.098Z"
        fill="#FFFFFF"
      />
    </svg>
  </div>
);

// 6. Travel (Exact vector from suitcase-icon-red.svg)
export const IconTravel = ({ size = 36, color = "#DF4E3E" }) => (
  <svg
    width={size}
    height={size}
    viewBox="24 14 155 158"
    fill="none"
    stroke={color}
    strokeWidth="13"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Wheels */}
    <circle cx="69" cy="148" r="9.5" />
    <circle cx="133.5" cy="148" r="9.5" />
    {/* Handle */}
    <path d="M80 52.5V40a10 10 0 0 1 10-10h22a10 10 0 0 1 10 10v12.5" />
    {/* Body */}
    <rect x="40.5" y="52.5" width="121.5" height="88" rx="20" />
    {/* Smile */}
    <path d="M77 85a24 24 0 0 0 48 0" />
  </svg>
);

// 7. Госуслуги (Exact vector from capitol-icon-red.svg)
export const IconGov = ({ size = 36, color = "#DF4E3E" }) => (
  <svg
    width={size}
    height={size}
    viewBox="60 8 158 154"
    fill="none"
    stroke={color}
    strokeWidth="13"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Flag and pole */}
    <path d="M138.5 64V22.5h46v24h-46" />
    {/* Dome */}
    <path d="M106 98a33 33 0 0 1 66 0" />
    {/* Building */}
    <rect x="75.5" y="98.5" width="127" height="48" rx="7" />
    {/* Columns */}
    <path d="M114 124.5v22M139 124.5v22M164.5 124.5v22" />
  </svg>
);

// 8. Работа (Exact vector from briefcase-search-icon-red.svg)
export const IconJobs = ({ size = 34.5, color = "#DF4E3E" }) => (
  <svg
    width={size}
    height={size}
    viewBox="44 20 154 148"
    fill="none"
    stroke={color}
    strokeWidth="13"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Briefcase body (open where the magnifier overlaps) */}
    <path d="M164.5 76V66a11.5 11.5 0 0 0-11.5-11.5H71A11.5 11.5 0 0 0 59.5 66v64A11.5 11.5 0 0 0 71 141.5h34" />
    {/* Handle */}
    <path d="M98 54.5V46a11.5 11.5 0 0 1 11.5-11.5h7A11.5 11.5 0 0 1 128 46v8.5" />
    {/* Middle band */}
    <path d="M59.5 89.5h46" />
    {/* Magnifier */}
    <circle cx="146" cy="117" r="25" />
    <path d="M164 135l18.5 18.5" />
  </svg>
);


export const IconAds = IconJobs;

// Search Bar Camera with Sparkle (Exact vector from camera-sparkle-icon-grey.svg)
export const CameraSparkleIcon = ({ size = 26.5, color = "#555555" }) => (
  <svg
    width={size}
    height={size * (190 / 220)}
    viewBox="4 22 220 190"
    fill="none"
    stroke={color}
    strokeWidth="17"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, cursor: 'pointer' }}
  >
    {/* Camera body (open at the top right, where the sparkle sits) */}
    <path d="M118 44.5H89C75 44.5 73 63 57 63H49.500A28 28 0 0 0 21.500 91V166.500A28 28 0 0 0 49.500 194.500H168.500A24 24 0 0 0 192.500 170.500V131" />
    {/* Lens */}
    <circle cx="107" cy="127.5" r="34.5" />
    {/* Flash dot */}
    <circle cx="52" cy="93.5" r="7.5" fill={color} stroke="none" />
    {/* Sparkle */}
    <path
      d="M183 32.500Q192 55 214.500 64Q192 73 183 95.500Q174 73 151.500 64Q174 55 183 32.500Z"
      fill={color}
      strokeWidth="3"
    />
  </svg>
);

// Top Bar Cart (Exact vector from ic_ds_cart_500.xml in APK, lower contrast #9E9E9E)
export const TopBarCartIcon = ({ color = "#9E9E9E" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M1,4C1,3.448 1.448,3 2,3H3.875C4.986,3 5.964,3.733 6.275,4.8L6.625,6H20.558C22.196,6 23.353,7.605 22.834,9.159L21.018,14.607C20.542,16.036 19.205,17 17.698,17H10.375C8.819,17 7.451,15.973 7.015,14.48L4.355,5.36C4.293,5.147 4.097,5 3.875,5H2C1.448,5 1,4.552 1,4ZM7.208,8L8.935,13.92C9.122,14.56 9.708,15 10.375,15H17.698C18.344,15 18.917,14.587 19.121,13.974L20.937,8.526C21.023,8.267 20.831,8 20.558,8H7.208Z"
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d="M8.5,20.65C8.5,19.739 9.239,19 10.15,19C11.061,19 11.8,19.739 11.8,20.65C11.8,21.561 11.061,22.3 10.15,22.3C9.239,22.3 8.5,21.561 8.5,20.65Z"
      fill={color}
    />
    <path
      d="M17.65,19C16.739,19 16,19.739 16,20.65C16,21.561 16.739,22.3 17.65,22.3C18.561,22.3 19.3,21.561 19.3,20.65C19.3,19.739 18.561,19 17.65,19Z"
      fill={color}
    />
  </svg>
);

// Official Kaspi Bonus Symbol (Letter Б with bar above from b-bar-icon-white.svg)
export const KaspiBonusSymbol = ({ height = 9.5, color = "#FFFFFF", style = {} }) => (
  <svg
    width={Math.round(height * (30.5 / 48.5) * 10) / 10}
    height={height}
    viewBox="15.5 10 30.5 48.5"
    fill={color}
    style={{ display: 'inline-block', flexShrink: 0, ...style }}
  >
    {/* Bar above the letter */}
    <rect x="15.5" y="10" width="26.5" height="4.5" />
    {/* Letter Б */}
    <path
      fillRule="evenodd"
      d="M15.5 22.5H41.5V27.5H23.5V36H38A8 8 0 0 1 46 44V50.500A8 8 0 0 1 38 58.500H15.500ZM23.500 41V53.500H35.500A2.500 2.500 0 0 0 38 51V43.500A2.500 2.500 0 0 0 35.500 41Z"
    />
  </svg>
);

// Official Kaspi Yellow Flame Icon (from flame.svg)
export const KaspiYellowFlame = ({ size = 11, color = "#FFD21F", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
  >
    <path
      fill={color}
      d="M24 4c3 6 6 10 7 16 1.500-2 2.500-3.500 3-5 4 6 7 12 6 18s-5 10-10 11c1-5-2-10-6-13-4 3-7 8-6 13-5-1-9-5-10-11s2-12 6-18c.500 1.500 1.500 3 3 5 1-6 4-10 7-16z"
    />
  </svg>
);


// Official Kaspi Discount Badge Icon (from discount-badge-red.svg)
export const KaspiDiscountBadgeIcon = ({ size = 15, isActive = false, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="6 16 112 112"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
  >
    <path
      d="M62.0 25.8L63.6 25.6L65.3 25.2L67.0 24.5L68.8 23.6L70.7 22.8L72.6 22.1L74.5 21.7L76.4 21.6L78.3 22.0L79.9 22.8L81.4 23.9L82.7 25.4L83.9 27.1L84.9 28.9L85.9 30.6L86.9 32.2L87.9 33.5L89.2 34.6L90.6 35.4L92.2 36.0L94.0 36.5L95.9 36.9L97.9 37.3L99.9 37.9L101.7 38.7L103.3 39.7L104.6 41.1L105.4 42.7L106.0 44.5L106.2 46.5L106.1 48.5L105.9 50.6L105.7 52.6L105.5 54.4L105.6 56.1L105.9 57.7L106.6 59.2L107.6 60.6L108.8 62.1L110.1 63.5L111.5 65.0L112.7 66.7L113.7 68.4L114.4 70.2L114.6 72.0L114.4 73.8L113.7 75.6L112.7 77.3L111.5 79.0L110.1 80.5L108.8 81.9L107.6 83.4L106.6 84.8L105.9 86.3L105.6 87.9L105.5 89.6L105.7 91.4L105.9 93.4L106.1 95.5L106.2 97.5L106.0 99.5L105.4 101.3L104.6 102.9L103.3 104.3L101.7 105.3L99.9 106.1L97.9 106.7L95.9 107.1L94.0 107.5L92.2 108.0L90.6 108.6L89.2 109.4L87.9 110.5L86.9 111.8L85.9 113.4L84.9 115.1L83.9 116.9L82.7 118.6L81.4 120.1L79.9 121.2L78.3 122.0L76.4 122.4L74.5 122.3L72.6 121.9L70.7 121.2L68.8 120.4L67.0 119.5L65.3 118.8L63.6 118.4L62.0 118.2L60.4 118.4L58.7 118.8L57.0 119.5L55.2 120.4L53.3 121.2L51.4 121.9L49.5 122.3L47.6 122.4L45.7 122.0L44.1 121.2L42.6 120.1L41.3 118.6L40.1 116.9L39.1 115.1L38.1 113.4L37.1 111.8L36.1 110.5L34.8 109.4L33.4 108.6L31.8 108.0L30.0 107.5L28.1 107.1L26.1 106.7L24.1 106.1L22.3 105.3L20.7 104.3L19.4 102.9L18.6 101.3L18.0 99.5L17.8 97.5L17.9 95.5L18.1 93.4L18.3 91.4L18.5 89.6L18.4 87.9L18.1 86.3L17.4 84.8L16.4 83.4L15.2 81.9L13.9 80.5L12.5 79.0L11.3 77.3L10.3 75.6L9.6 73.8L9.4 72.0L9.6 70.2L10.3 68.4L11.3 66.7L12.5 65.0L13.9 63.5L15.2 62.1L16.4 60.6L17.4 59.2L18.1 57.7L18.4 56.1L18.5 54.4L18.3 52.6L18.1 50.6L17.9 48.5L17.8 46.5L18.0 44.5L18.6 42.7L19.4 41.1L20.7 39.7L22.3 38.7L24.1 37.9L26.1 37.3L28.1 36.9L30.0 36.5L31.8 36.0L33.4 35.4L34.8 34.6L36.1 33.5L37.1 32.2L38.1 30.6L39.1 28.9L40.1 27.1L41.3 25.4L42.6 23.9L44.1 22.8L45.7 22.0L47.6 21.6L49.5 21.7L51.4 22.1L53.3 22.8L55.2 23.6L57.0 24.5L58.7 25.2L60.4 25.6Z"
      fill={isActive ? '#FFFFFF' : '#F44336'}
    />
    <circle cx="48" cy="57.5" r="7.5" fill={isActive ? '#F14635' : '#FFFFFF'} />
    <circle cx="77" cy="86" r="7.5" fill={isActive ? '#F14635' : '#FFFFFF'} />
    <path
      d="M77.5 53L48 91"
      stroke={isActive ? '#F14635' : '#FFFFFF'}
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Official Kaspi Flame Icon (from flame-icon-orange.svg)
export const KaspiFlameIcon = ({ width = 16, height = 16, size = 16, isActive = false, color, style = {} }) => {
  const iconColor = isActive ? '#FFFFFF' : (color || '#F14635');
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="14 1 71 82"
      fill="none"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      <path
        fill={iconColor}
        d="M27 20.5C31 22 35 28 38 34C39.5 28 42 17 45 11.5C47 7.5 49 5.5 51 4.5C54 7 56.5 14 58.5 21C60.5 28 62 35 63 41C64 37 66 33 68.5 30.5C73 32.5 77 40 79.5 47C81.5 54 80.5 62 77 68C74 73 69.5 77 64.5 79.5C62 77 61.5 73 61.5 70.5C61.5 68 60 65.5 58 64C56 66.5 53.5 68.5 50.5 69.5C46.5 67.5 42 61 40.5 55C38 59 36 65 35.5 70C35.2 73.5 34.5 76.5 32 79C26 77 21 70 19 62C17.5 55 19 48 21.5 41C23.5 34 24.5 27 27 20.5Z"
      />
    </svg>
  );
};

// Official Kaspi Heart Icon (from heart.svg)
export const KaspiHeartIcon = ({ isFavorite = false, size = 24, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill={isFavorite ? '#F14635' : 'none'}
    stroke={isFavorite ? '#F14635' : '#1E1E1E'}
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block', ...style }}
  >
    <path d="M24 41L8.2 25.2a9.6 9.6 0 0 1 0-13.6 9.6 9.6 0 0 1 13.6 0L24 13.8l2.2-2.2a9.6 9.6 0 0 1 13.6 0 9.6 9.6 0 0 1 0 13.6z" />
  </svg>
);


