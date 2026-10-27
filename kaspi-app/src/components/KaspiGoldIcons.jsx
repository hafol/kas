import React from 'react';

/**
 * Authentic 1:1 Vector Icons for Kaspi Gold Detail Screen
 * User-provided exact SVGs from:
 * - icons for my bank info page/
 * - icons for my bank vypiska/
 * - Decompiled APK assets
 */

const RED = "#DF4337";

// ============================================================================
// TAB 1: ДЕЙСТВИЯ (Actions)
// ============================================================================

// 1. Перевести (Transfer - two curved loop arrows)
export const IconTransferGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M17 4l3 3-3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 7h13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M7 7a4 4 0 0 0-4 4v1" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M7 20l-3-3 3-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 17H4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M17 17a4 4 0 0 0 4-4v-1" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 2. Пополнить Kaspi Gold (Top up - card with + circle badge)
export const IconTopupGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="13" rx="2.5" stroke={color} strokeWidth="1.9" />
    <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="1.5" />
    <circle cx="5.5" cy="5.5" r="3.5" fill="#FFFFFF" stroke={color} strokeWidth="1.6" />
    <line x1="5.5" y1="3.5" x2="5.5" y2="7.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="3.5" y1="5.5" x2="7.5" y2="5.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// 3. Оплата в интернете (Web pay - globe with grid)
export const IconWebPayGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.9" />
    <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke={color} strokeWidth="1.7" />
    <line x1="3.5" y1="12" x2="20.5" y2="12" stroke={color} strokeWidth="1.7" />
    <line x1="5" y1="7" x2="19" y2="7" stroke={color} strokeWidth="1.5" />
    <line x1="5" y1="17" x2="19" y2="17" stroke={color} strokeWidth="1.5" />
  </svg>
);

// 4. Платные сервисы и подписки (Subscriptions - calendar/box with sync arrows)
export const IconSubscriptionsGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="17" rx="3" stroke={color} strokeWidth="1.9" />
    <line x1="7" y1="2" x2="7" y2="5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="17" y1="2" x2="17" y2="5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M14.5 10.5A3.5 3.5 0 1 0 15.5 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <polyline points="15.5,9.5 15.5,12 13,12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 5. Заказать сумму на снятие (ATM cash dispenser with tenge symbol)
export const IconOrderCashGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.17" y="3.75" width="21.64" height="16.49" rx="2.74"/>
    <path d="M9.01 7.88H15.01M9.01 10.94H15.01M12.01 10.94V16.14"/>
  </svg>
);

// 6. Перевыпустить Kaspi Gold (Reissue - card with recycle loop)
export const IconReissueGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="6" y="6" width="15" height="12" rx="2.5" stroke={color} strokeWidth="1.9" />
    <line x1="6" y1="10" x2="21" y2="10" stroke={color} strokeWidth="1.5" />
    <path d="M3 13.5a4 4 0 0 1 4-4H5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="2.5,11.5 5,9 2.5,6.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 16.5a4 4 0 0 0 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 7. Сменить ПИН-код (Change PIN - 8-point asterisk)
export const IconChangePinGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <line x1="12" y1="4" x2="12" y2="20" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="6.3" y1="6.3" x2="17.7" y2="17.7" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="6.3" y1="17.7" x2="17.7" y2="6.3" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 8. Заблокировать карту (Block card - padlock)
export const IconBlockCardGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="9.5" width="16" height="11.5" rx="3" stroke={color} strokeWidth="1.9" />
    <path d="M7.5 9.5V6.5a4.5 4.5 0 0 1 9 0v3" stroke={color} strokeWidth="1.9" strokeLinecap="round" />
    <circle cx="12" cy="14.5" r="1.5" fill={color} />
    <line x1="12" y1="15.5" x2="12" y2="18" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

// 9. Снять деньги без карты (Cardless cash - ATM dispenser with downward banknote)
export const IconCardlessGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="7" rx="2" stroke={color} strokeWidth="1.9" />
    <line x1="6" y1="6.5" x2="18" y2="6.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    <rect x="5.5" y="8" width="13" height="13" rx="2" stroke={color} strokeWidth="1.9" fill="#FFFFFF" />
    <circle cx="12" cy="14.5" r="2.2" stroke={color} strokeWidth="1.5" />
    <line x1="8" y1="14.5" x2="9" y2="14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15" y1="14.5" x2="16" y2="14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 10. Закрыть Kaspi Gold (Close card - circle with X)
export const IconCloseCardGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.9" />
    <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" stroke={color} strokeWidth="1.9" strokeLinecap="round" />
    <line x1="15.5" y1="8.5" x2="8.5" y2="15.5" stroke={color} strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);


// ============================================================================
// TAB 2: ИНФО (Info) — Exact user SVGs from "icons for my bank info page"
// ============================================================================

// 1. Аналитика покупок (card-tap.svg)
export const IconAnalyticsGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.51 19.76L12.02 16.13Q12.9 13.35 14.78 14.08L19.06 18.34V7.08Q19.06 4.24 16.22 4.24H3.85Q1.01 4.24 1.01 7.08V15.49Q1.01 18.33 3.85 18.33H9.46"/>
    <path d="M1.01 8.7H19.06"/>
    <path d="M18.92 8.21L21.12 10.65Q22.09 10.81 22.98 17.55V18.28"/>
  </svg>
);

// 2. Лимит на снятие наличных (tenge-box.svg)
export const IconLimitsGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.17" y="3.75" width="21.64" height="16.49" rx="2.74"/>
    <path d="M9.01 7.88H15.01M9.01 10.94H15.01M12.01 10.94V16.14"/>
  </svg>
);

// 3. Реквизиты карты и счета (list-box.svg)
export const IconRequisitesGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.75" y="2.75" width="16.5" height="18.5" rx="3"/>
    <path d="M7.83 8.4h0.01M7.83 11.42V15.57M12.07 10.44H15.98M12.07 14.56H15.98"/>
  </svg>
);

// 4. Справки (document.svg)
export const IconCertificatesGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.18 2.75H7.4Q3.75 2.75 3.75 6.4V17.6Q3.75 21.25 7.4 21.25H16.6Q20.25 21.25 20.25 17.6V7.75Z"/>
    <path d="M15.18 2.75V7.39Q15.18 7.75 15.54 7.75H20.25"/>
    <path d="M7.93 12.09H16.03M7.93 16.18H10.84"/>
  </svg>
);

// 5. Условия Kaspi Gold (checklist-document.svg)
export const IconConditionsGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.75" y="2.74" width="16.5" height="18.5" rx="3"/>
    <path d="M7.97 6.8H16.06M7.97 10.95H10.39M8.91 15.48L11.07 17.62L16.03 12.64"/>
  </svg>
);

// 6. Терминалы и банкоматы (location-pin.svg)
export const IconAtmsGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22.81L5.6 16.08A8.83 8.83 0 1 1 18.4 16.08Z"/>
    <circle cx="12" cy="9.88" r="4.13"/>
  </svg>
);

// 7. Полезные советы (star.svg)
export const IconTipsGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.76L15.02 8.82L21.71 9.82L16.89 14.56L18 21.24L12 18.11L6 21.24L7.11 14.56L2.29 9.82L8.98 8.82Z"/>
  </svg>
);

// 8. Пополнения с Visa (phone-sign-in.svg)
export const IconVisaTopupGold = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.89 10.03V4.74Q7.89 1.7 10.93 1.7H17.17Q20.21 1.7 20.21 4.74V19.26Q20.21 22.3 17.17 22.3H10.93Q7.89 22.3 7.89 19.26V18.16"/>
    <path d="M13.1 4.8H15.02"/>
    <path d="M3.77 10.41L4.19 12.25Q5.83 14.05 6.71 14.05H15.85M12.34 10.38L15.85 14.05L12.34 17.73"/>
  </svg>
);


// ============================================================================
// TAB 3: ВЫПИСКА (Statement) — Exact user SVGs from "icons for my bank vypiska"
// ============================================================================

// Календарь даты (calendar.svg)
export const StatementCalendarIcon = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.74" y="5.09" width="16.53" height="15.55" rx="2.75"/>
    <path d="M8.27 3.36V6.69M15.65 3.36V6.69M7.68 10.57H16.29"/>
  </svg>
);

// Иконка строки Операции (tenge-receipt.svg)
export const StatementOperationsReceiptIcon = ({ size = 24, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4.65" y="2.83" width="14.7" height="18.35" rx="2.45"/>
    <path d="M9.43 6.5H14.45M9.43 9.25H14.45M11.94 9.25V13.65M8.35 17.5h0.01M12 17.5h0.01M15.65 17.5h0.01"/>
  </svg>
);

// Корзина покупок (basket.svg)
export const StatementBasketIcon = ({ size = 20, color = "#2E2E2E" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.75 8.5H22.24L20.44 20.7H3.76Z"/>
    <path d="M5.85 11.59L8.96 3.29M15.05 3.29L18.14 11.59"/>
  </svg>
);

// Перевод клиенту (person.svg)
export const StatementPersonIcon = ({ size = 20, color = "#929292" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12.01" cy="7.84" r="4.2"/>
    <path d="M2.99 20.36V18.98A9.01 5.55 0 0 1 21 18.98V20.36Z"/>
  </svg>
);


// ============================================================================
// HEADER ELEMENTS (Apple Pay badge & Kaspi Gold Medallion)
// ============================================================================

// Apple Pay badge pill: 36 x 18 px, white background, black Apple logo + "Pay"
export const ApplePayBadge = ({ style = {} }) => (
  <div style={{
    width: '36px',
    height: '18px',
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 3px',
    boxSizing: 'border-box',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    verticalAlign: 'middle',
    ...style
  }}>
    <svg width="10" height="12" viewBox="0 0 170 170" fill="#000000" style={{ marginRight: '1px' }}>
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.68-7.85-11.96-14.43-5.77-8.91-10.29-19.12-13.56-30.64-3.27-11.52-4.9-22.37-4.9-32.55 0-14.68 3.7-26.68 11.1-36 7.4-9.32 16.59-14.07 27.56-14.25 4.35 0 9.4 1.15 15.15 3.45 5.75 2.3 9.4 3.51 10.95 3.63 1.99-.24 5.86-1.56 11.61-3.95 5.76-2.39 10.74-3.48 14.95-3.28 11.31.5 20.46 4.9 27.46 13.2-9.8 5.89-14.6 14.04-14.4 24.45.2 8.01 3.28 14.71 9.25 20.1 5.96 5.39 13.06 8.52 21.3 9.38-2.32 7.18-5.46 14.24-9.4 21.18zM119.22 33.15c0-6.72 2.45-13.07 7.35-19.05 4.9-5.98 10.92-9.94 18.06-11.88.54 1.52.82 3.03.82 4.53 0 6.6-2.6 13.04-7.8 19.32-5.2 6.28-11.33 9.94-18.43 10.98-.07-1.3-.0-2.6-.0-3.9z"/>
    </svg>
    <span style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Roboto", sans-serif',
      fontSize: '8.5px',
      fontWeight: '600',
      color: '#000000',
      lineHeight: 1
    }}>
      Pay
    </span>
  </div>
);

// Authentic Kaspi Gold Circular Medallion Emblem with Parent & Child Silhouette
export const KaspiGoldMedallion = ({ size = 110, style = {} }) => (
  <div style={{
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: '#DFB76C',
    boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(138, 98, 30, 0.3), 0 4px 10px rgba(138, 98, 30, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
    ...style
  }}>
    <div style={{
      position: 'absolute',
      inset: '3px',
      borderRadius: '50%',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      pointerEvents: 'none'
    }} />
    
    <svg
      width={Math.round(size * 0.78)}
      height={Math.round(size * 0.78)}
      viewBox="0 0 44 34"
      fill="none"
      style={{
        filter: 'drop-shadow(0 1px 1px rgba(255, 255, 255, 0.35)) drop-shadow(0 -1px 1px rgba(138, 98, 30, 0.25))',
        opacity: 0.85
      }}
    >
      <path
        fill="#B48738"
        fillRule="evenodd"
        d="M25.69,27.05C25.71,26.99 25.73,26.9 25.74,26.78C25.76,26.67 25.76,26.53 25.76,26.38C25.76,25.75 25.67,24.85 25.56,23.96C25.44,23.06 25.31,22.18 25.22,21.61L25.17,21.31L25.13,21.01L25.12,20.95L25.11,20.89C25.04,20.36 24.96,19.79 24.65,19.32C24.34,18.85 23.81,18.47 22.83,18.32C22.57,18.28 22.34,18.27 22.15,18.31C21.96,18.35 21.8,18.42 21.66,18.54C21.32,18.83 21.15,19.39 21.06,20.11C20.98,20.82 20.99,21.71 21,22.66L21,22.93L21,23.19C21,24.13 21.01,25.01 21.07,25.74C21.13,26.47 21.24,27.06 21.46,27.42C21.56,27.57 21.71,27.7 21.91,27.8C22,27.84 22.11,27.88 22.22,27.91C22.31,27.91 22.4,27.92 22.49,27.92C23.37,27.92 24.21,27.81 25.03,27.61C25.12,27.57 25.21,27.52 25.29,27.47C25.49,27.34 25.63,27.2 25.69,27.05"
      />
      <path
        fill="#B48738"
        fillRule="evenodd"
        d="M29.04,25.38C29.09,25.14 28.82,24.33 28.45,23.62C28.07,22.9 27.61,22.29 27.27,22.45C27.01,22.57 26.93,23.34 26.99,24.18C27.04,25.03 27.22,25.96 27.49,26.41C27.54,26.49 27.63,26.51 27.74,26.5C27.75,26.5 27.77,26.5 27.78,26.5C28.19,26.26 28.57,26.01 28.93,25.72C28.94,25.71 28.95,25.7 28.96,25.68C28.99,25.6 29.02,25.5 29.04,25.38"
      />
      <path
        fill="#B48738"
        fillRule="evenodd"
        d="M19.39,25.72C19.36,24.95 19.28,24.07 19.16,23.38C19.04,22.69 18.87,22.19 18.66,22.2C18.44,22.21 18.29,22.79 18.22,23.56C18.14,24.33 18.15,25.29 18.25,26.06C18.28,26.34 18.33,26.59 18.39,26.79C18.44,26.93 18.49,27.05 18.54,27.15C18.74,27.23 18.94,27.3 19.14,27.37C19.21,27.3 19.28,27.19 19.32,26.99C19.38,26.73 19.41,26.33 19.39,25.72"
      />
      <path
        fill="#B48738"
        fillRule="evenodd"
        d="M29.9,10.16C28,8.28 25.38,7.13 22.49,7.13C19.6,7.13 16.97,8.29 15.07,10.17C13.17,12.05 12,14.65 12,17.52C12,20.39 13.17,22.99 15.07,24.87C15.48,25.27 15.92,25.64 16.39,25.97C16.42,25.94 16.44,25.88 16.47,25.81C16.5,25.72 16.53,25.6 16.56,25.5L16.56,25.46L16.57,25.43C16.7,24.88 16.78,24.34 16.81,23.78C16.85,23.22 16.83,22.64 16.76,22C16.73,21.62 16.68,21.32 16.63,21.06C16.57,20.81 16.52,20.59 16.46,20.4C16.41,20.18 16.36,19.98 16.32,19.77C16.28,19.55 16.26,19.31 16.27,19.03C16.27,18.77 16.3,18.55 16.34,18.35C16.38,18.14 16.44,17.96 16.5,17.77C16.56,17.55 16.63,17.32 16.69,17.03C16.75,16.75 16.79,16.41 16.8,15.99C16.83,15.16 16.89,14.64 17,14.27C17.11,13.9 17.28,13.68 17.53,13.44C17.78,13.2 17.94,13.03 18.04,12.88C18.14,12.72 18.17,12.59 18.17,12.41C18.17,12.24 18.06,11.95 18.04,11.6C18.03,11.25 18.12,10.84 18.53,10.41C18.79,10.14 19.06,9.96 19.3,9.84C19.54,9.73 19.76,9.68 19.94,9.68C20.05,9.68 20.14,9.7 20.22,9.72C20.3,9.75 20.36,9.79 20.41,9.84C20.54,9.98 20.59,10.18 20.54,10.44C20.49,10.69 20.34,11 20.07,11.35C19.81,11.71 19.68,11.96 19.62,12.15C19.57,12.34 19.58,12.45 19.59,12.54C19.61,12.62 19.66,12.71 19.74,12.82C19.82,12.93 19.94,13.04 20.1,13.16C20.21,13.26 20.34,13.36 20.46,13.48C20.58,13.59 20.69,13.73 20.78,13.88C20.95,14.18 21.08,14.47 21.2,14.78C21.33,15.09 21.44,15.43 21.58,15.82L21.61,15.93L21.65,16.04C21.77,16.39 21.99,16.62 22.32,16.76C22.65,16.91 23.09,16.97 23.66,16.97C24.22,16.97 24.8,16.78 25.24,16.53C25.68,16.28 25.98,15.95 25.98,15.67C25.98,15.39 25.92,15.24 25.86,15.09C25.8,14.94 25.74,14.8 25.74,14.56C25.74,14.32 25.92,13.86 26.24,13.45C26.56,13.04 27.01,12.7 27.56,12.7C27.83,12.7 28.04,12.8 28.15,12.97C28.26,13.14 28.27,13.37 28.13,13.65C28,13.93 27.8,14.26 27.63,14.57C27.47,14.87 27.34,15.15 27.34,15.33C27.34,15.65 27.57,15.68 27.89,15.58C28.2,15.47 28.59,15.23 28.89,14.98C29.2,14.74 29.38,14.58 29.55,14.39C29.71,14.2 29.85,13.99 30.06,13.62C30.18,13.39 30.34,13.26 30.49,13.19C30.65,13.13 30.8,13.14 30.92,13.2C31.05,13.26 31.16,13.4 31.21,13.58C31.25,13.77 31.23,14.01 31.11,14.29C31.02,14.51 30.84,14.76 30.62,15.02C30.4,15.29 30.14,15.58 29.86,15.87C29.5,16.26 29.11,16.68 28.81,17.07C28.52,17.47 28.31,17.83 28.31,18.12C28.31,19.57 28.72,20.94 29.16,21.97C29.6,23 30.06,23.71 30.15,23.84C30.27,24.02 30.35,24.12 30.41,24.18C30.45,24.21 30.47,24.23 30.5,24.24C32.04,22.44 32.97,20.11 32.98,17.57L32.98,17.52L32.98,17.48C32.97,14.62 31.79,12.03 29.9,10.16"
      />
    </svg>
  </div>
);
