/**
 * 🔒 LOCKED SCREEN: GovServicesScreen.jsx
 * STATUS: 100% FINALIZED & CALIBRATED (Fix List v3)
 * DO NOT MODIFY THIS SCREEN OR ITS METRICS. FURTHER CHANGES ARE NOT NEEDED.
 */
import React, { useState } from 'react';

// Color Tokens (from specification)
const pageBg        = '#EDEDED'; // grey behind the white blocks, visible as 10 pt gaps
const surface       = '#FFFFFF'; // the three white blocks
const fill          = '#F2F2F2'; // segmented track, search field, document cards, category tiles
const iconCircle    = '#F7F7F7'; // circle behind the row icons
const divider       = '#EBEBEB';
const accentRed     = '#F14635'; // selected category label + underline, NEW badge
const linkBlue      = '#2F49B5'; // "Все документы" link and its chevron
const textPrimary   = '#1E1E1E';
const textSecondary = '#8C8C8C'; // row subtitle
const placeholder   = '#A0A0A0'; // search placeholder and magnifier
const chevronGrey   = '#BDBDBD';

// Russian typography rule used by Kaspi: glue 1–2 letter words (к, в, и, по…) to the next word
// with a no-break space, so titles wrap as "Прикрепление / к медорганизации".
const glueShortWords = (text) => text.replace(/(?<=^|[\s ])([а-яё]{1,2}) /gi, '$1 ');

// 1. Back Chevron (<) SVG: glyph ≈ 8 x 16 (measured from the original), centered
const BackChevronIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <path
      d="M16.707,2.793C17.098,3.183 17.098,3.817 16.707,4.207L8.914,12L16.707,19.793C17.098,20.183 17.098,20.817 16.707,21.207C16.317,21.598 15.683,21.598 15.293,21.207L7.5,13.414C6.719,12.633 6.719,11.367 7.5,10.586L15.293,2.793C15.683,2.402 16.317,2.402 16.707,2.793Z"
      fill={textPrimary}
    />
  </svg>
);

// 2. Search Magnifier SVG: 22.5 x 22, color placeholder
const SearchMagnifierIcon = () => (
  <svg width="22.5" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <path
      d="M4,10C4,6.686 6.686,4 10,4C13.314,4 16,6.686 16,10C16,13.314 13.314,16 10,16C6.686,16 4,13.314 4,10ZM10,2C5.582,2 2,5.582 2,10C2,14.418 5.582,18 10,18C11.849,18 13.552,17.372 14.907,16.319C14.919,16.332 14.931,16.344 14.943,16.357L19.293,20.707C19.684,21.097 20.317,21.097 20.708,20.707C21.098,20.316 21.098,19.683 20.708,19.293L16.358,14.943C16.345,14.93 16.332,14.918 16.319,14.906C17.373,13.552 18,11.849 18,10C18,5.582 14.418,2 10,2Z"
      fill={placeholder}
    />
  </svg>
);

// 3. Link Chevron SVG ("Все документы"): visible glyph 9 x 15, color linkBlue
const LinkChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}>
    <path
      d="M5.734,1.293C5.337,0.902 4.694,0.902 4.298,1.293C3.931,1.653 3.903,2.221 4.213,2.613L4.298,2.707L9.674,8L4.298,13.293C3.931,13.653 3.903,14.221 4.213,14.613L4.298,14.707C4.664,15.068 5.24,15.095 5.638,14.79L5.734,14.707L11.613,8.919C12.094,8.445 12.127,7.697 11.71,7.186L11.613,7.081L5.734,1.293Z"
      fill={linkBlue}
    />
  </svg>
);

// 4. Row Chevron SVG: visible glyph 8 x 13, color chevronGrey
const RowChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}>
    <path
      d="M5.734,1.293C5.337,0.902 4.694,0.902 4.298,1.293C3.931,1.653 3.903,2.221 4.213,2.613L4.298,2.707L9.674,8L4.298,13.293C3.931,13.653 3.903,14.221 4.213,14.613L4.298,14.707C4.664,15.068 5.24,15.095 5.638,14.79L5.734,14.707L11.613,8.919C12.094,8.445 12.127,7.697 11.71,7.186L11.613,7.081L5.734,1.293Z"
      fill={chevronGrey}
    />
  </svg>
);

// 5. Official Kaspi Red Line Service Icons (from icons.need) - calibrated to 26 x 27.5
// 1 house-plus.svg
const HousePlusIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="3 4 42 40" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M5 20L24 6l19 14"/>
    <path d="M10 17.500V37a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V17.500"/>
    <path d="M24 22v12M18 28h12"/>
  </svg>
);

// 2 house-plus-search.svg
const HousePlusSearchIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="3 4 42 41" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M5 20L24 6l19 14"/>
    <path d="M38 17.500V26M10 17.500V37a4 4 0 0 0 4 4h11"/>
    <path d="M24 20v10M19 25h10"/>
    <circle cx="35" cy="35" r="5"/>
    <path d="M38.800 38.800l4.200 4.200"/>
  </svg>
);

// 3 person-wallet.svg
const PersonWalletIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="4 4 41 40" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <circle cx="20" cy="13" r="7"/>
    <path d="M20 41H9a3 3 0 0 1-3-3c0-7 6-12 14-12"/>
    <rect x="25" y="27" width="18" height="14" rx="3.500"/>
    <path d="M43 32h-5a2 2 0 0 0 0 4h5"/>
  </svg>
);

// 4 document-car.svg
const DocumentCarIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="4 3 40 40" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M12 22V9a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v13"/>
    <path d="M19 11.500h10M19 17h6"/>
    <path d="M10.500 38H8a2 2 0 0 1-2-2v-2a3 3 0 0 1 3-3h3.500l3.600-5.600A3 3 0 0 1 18.600 24h9.800a3 3 0 0 1 2.500 1.400L34.500 31H39a3 3 0 0 1 3 3v2a2 2 0 0 1-2 2h-2.500"/>
    <path d="M19.500 38h9"/>
    <circle cx="15" cy="38" r="3.500"/>
    <circle cx="33" cy="38" r="3.500"/>
  </svg>
);

// 5 house-list-check.svg
const HouseListCheckIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="3 4 41 42" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M5 20L24 6l19 14"/>
    <path d="M38 17.500V25M10 17.500V37a4 4 0 0 0 4 4h10"/>
    <path d="M17 23h12M17 29.500h7"/>
    <path d="M29 35.500l4.500 4.500 9-9.500"/>
  </svg>
);

// 6 licence-wheel.svg
const LicenceWheelIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="3 7 42 38" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M40 21v-8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h15"/>
    <rect x="10" y="16" width="9" height="11" rx="2"/>
    <path d="M25 18h8"/>
    <circle cx="35" cy="34" r="8.500"/>
    <circle cx="35" cy="34" r="2"/>
    <path d="M27 33h6M37 33h6M35 36v6"/>
  </svg>
);

const CapitolIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="60 8 158 154" fill="none" stroke="#DF4E3E" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M138.5 64V22.5h46v24h-46"/>
    <path d="M106 98a33 33 0 0 1 66 0"/>
    <rect x="75.5" y="98.5" width="127" height="48" rx="7"/>
    <path d="M114 124.5v22M139 124.5v22M164.5 124.5v22"/>
  </svg>
);

const RepeatIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="20 20 146 142" fill="none" stroke="#DF4E3E" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M36.5 90.5V80.5a28 28 0 0 1 28-28h83"/>
    <path d="M129.5 34.5l18 18-18 18"/>
    <path d="M149.5 92.5v8a28 28 0 0 1-28 28h-84"/>
    <path d="M55.5 110.5l-18 18 18 18"/>
  </svg>
);

const BriefcaseSearchIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="44 20 154 148" fill="none" stroke="#DF4E3E" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M164.5 76V66a11.5 11.5 0 0 0-11.5-11.5H71A11.5 11.5 0 0 0 59.5 66v64A11.5 11.5 0 0 0 71 141.5h34"/>
    <path d="M98 54.5V46a11.5 11.5 0 0 1 11.5-11.5h7A11.5 11.5 0 0 1 128 46v8.5"/>
    <path d="M59.5 89.5h46"/>
    <circle cx="146" cy="117" r="25"/>
    <path d="M164 135l18.5 18.5"/>
  </svg>
);

const ReceiptIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="45 30 302 286" fill="none" stroke="#DF4E3E" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M119 128H89a20 20 0 0 1-20-20V74a20 20 0 0 1 20-20h214a20 20 0 0 1 20 20v34a20 20 0 0 1-20 20h-34"/>
    <path d="M119 290V106a8 8 0 0 1 8-8h134a8 8 0 0 1 8 8v184C257 290 257 283 245 283C232.5 283 232.5 292 220 292C207.5 292 207.5 283 195 283C182.5 283 182.5 292 170 292C157 292 157 283 144 283C131.5 283 131.5 290 119 290Z"/>
    <path d="M167 167.5h54M167 211.5h54" strokeWidth="24"/>
  </svg>
);

const DevicesIconRed = ({ width = 26, height = 27.5, size }) => (
  <svg width={width || size} height={height || size} viewBox="50 20 162 150" fill="none" stroke="#DF4E3E" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M74 59V50a13 13 0 0 1 13-13h94a13 13 0 0 1 13 13v58a13 13 0 0 1-13 13H138"/>
    <path d="M137 138h33"/>
    <rect x="68" y="77" width="50" height="75" rx="11"/>
    <path d="M90 132h7" strokeWidth="10"/>
  </svg>
);

export const GovServicesScreen = ({ onOpenDoc, onBack }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'requests'
  const [selectedCat, setSelectedCat] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [pressedRowId, setPressedRowId] = useState(null);

  // Document Cards in Block B (Order from specification with converted 3D SVG pictures)
  const documents = [
    {
      id: 'id_card',
      label: 'Удостоверение личности',
      icon: '/kaspi_assets/document_icons/doc-id-card.svg'
    },
    {
      id: 'passport',
      label: 'Паспорт гражданина РК',
      icon: '/kaspi_assets/document_icons/doc-passport.svg'
    },
    {
      id: 'driver',
      label: 'Водительское удостоверение',
      icon: '/kaspi_assets/document_icons/doc-driver.svg'
    }
  ];

  // Category Row in Block C with exact horizontal centers x: 71.5 / 180 / 267.5 / 351.5
  const categories = [
    { id: 'popular', label: 'Популярные', icon: '/kaspi_assets/category_icons/category-popular-megaphone.svg', cx: 71.5, w: 98 },
    { id: 'certs', label: 'Справки', icon: '/kaspi_assets/category_icons/category-certs-documents.svg', cx: 180, w: 76 },
    { id: 'auto', label: 'Авто', icon: '/kaspi_assets/category_icons/category-auto-car.svg', cx: 267.5, w: 56 },
    { id: 'home', label: 'Жилье', icon: '/kaspi_assets/category_icons/category-home-house.svg', cx: 351.5, w: 56 },
    { id: 'family', label: 'Семья', icon: '/kaspi_assets/category_icons/category-family-stroller.svg', cx: 435.5, w: 60 },
    { id: 'health', label: 'Здоровье', icon: '/kaspi_assets/category_icons/category-health-heart.svg', cx: 520, w: 72 }
  ];

  // Services list grouped by category
  const servicesByCategory = {
    popular: [
      {
        id: 's1',
        title: 'Прикрепление к медорганизации',
        hasBadge: true,
        icon: HousePlusIconRed
      },
      {
        id: 's2',
        title: 'Проверка прикрепления к медорганизации',
        hasBadge: true,
        icon: HousePlusSearchIconRed
      },
      {
        id: 's3',
        title: 'Стать самозанятым',
        subtitle: 'Открыть счет и начать принимать оплату в…',
        hasBadge: false,
        icon: PersonWalletIconRed
      },
      {
        id: 's4',
        title: 'Выплата по беременности',
        hasBadge: true,
        icon: DocumentCarIconRed
      },
      {
        id: 's5',
        title: 'Прописка',
        hasBadge: false,
        icon: HouseListCheckIconRed
      },
      {
        id: 's6',
        title: 'Замена водительских прав',
        hasBadge: false,
        icon: LicenceWheelIconRed
      },
      {
        id: 's7',
        title: 'Штрафы',
        hasBadge: false,
        icon: ReceiptIconRed
      }
    ],
    certs: [
      {
        id: 'c1',
        title: 'Справка о наличии или отсутствии судимости',
        hasBadge: false,
        icon: ReceiptIconRed
      },
      {
        id: 'c2',
        title: 'Справка с наркологической организации',
        hasBadge: true,
        icon: ReceiptIconRed
      },
      {
        id: 'c3',
        title: 'Справка с психоневрологической организации',
        hasBadge: false,
        icon: ReceiptIconRed
      },
      {
        id: 'c4',
        title: 'Справка о пенсионных отчислениях',
        hasBadge: false,
        icon: ReceiptIconRed
      }
    ],
    auto: [
      {
        id: 'a1',
        title: 'Замена водительских прав',
        hasBadge: false,
        icon: LicenceWheelIconRed
      },
      {
        id: 'a2',
        title: 'Перерегистрация авто',
        hasBadge: false,
        icon: RepeatIconRed
      },
      {
        id: 'a3',
        title: 'Проверка штрафов',
        hasBadge: false,
        icon: ReceiptIconRed
      }
    ],
    home: [
      {
        id: 'h1',
        title: 'Прописка по месту жительства',
        hasBadge: false,
        icon: HouseListCheckIconRed
      },
      {
        id: 'h2',
        title: 'Снятие с прописки',
        hasBadge: false,
        icon: HouseListCheckIconRed
      },
      {
        id: 'h3',
        title: 'Справка о зарегистрированных правах',
        hasBadge: false,
        icon: ReceiptIconRed
      }
    ],
    family: [
      {
        id: 'f1',
        title: 'Выплата по беременности',
        hasBadge: true,
        icon: DocumentCarIconRed
      },
      {
        id: 'f2',
        title: 'Пособие на рождение ребенка',
        hasBadge: false,
        icon: CapitolIconRed
      },
      {
        id: 'f3',
        title: 'Справка о заключении брака',
        hasBadge: false,
        icon: ReceiptIconRed
      }
    ],
    health: [
      {
        id: 'hl1',
        title: 'Прикрепление к медорганизации',
        hasBadge: true,
        icon: HousePlusIconRed
      },
      {
        id: 'hl2',
        title: 'Проверка прикрепления к медорганизации',
        hasBadge: true,
        icon: HousePlusSearchIconRed
      }
    ]
  };

  const currentServices = servicesByCategory[selectedCat] || servicesByCategory.popular;
  const filteredServices = searchQuery.trim()
    ? currentServices.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentServices;

  // Title of the selected category section
  const sectionTitle = selectedCat === 'popular'
    ? 'Популярные и новые'
    : (categories.find(c => c.id === selectedCat)?.label || 'Услуги');

  return (
    <div style={{
      width: '100%',
      minHeight: '100%',
      backgroundColor: pageBg,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Roboto Flex Kaspi', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      paddingBottom: '80px',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* =====================================================================
          BLOCK A: Status Bar + Nav Bar + Segmented Control + Search Field
          ===================================================================== */}
      <div style={{
        width: '100%',
        backgroundColor: surface,
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        {/* Safe Area Inset */}
        <div style={{
          height: 'env(safe-area-inset-top, 0px)',
          width: '100%',
          flexShrink: 0
        }} />

        {/* Nav Bar (height 44, no divider under it) */}
        <div style={{
          height: '44px',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}>
          {/* Back button: chevron "<", tap area 44x44, center at x 29 */}
          <button
            type="button"
            onClick={onBack}
            aria-label="Назад"
            className="touchable"
            style={{
              position: 'absolute',
              left: '5.5px',
              top: 0,
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              zIndex: 2,
              outline: 'none'
            }}
          >
            <BackChevronIcon />
          </button>

          {/* Title "Госуслуги": width 86, centered */}
          <h1 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: textPrimary,
            letterSpacing: 0,
            lineHeight: '44px',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}>
            Госуслуги
          </h1>
        </div>

        {/* 1. SEGMENTED CONTROL: moved down 7.5px (marginTop 14.5px, label text top y 120.5) */}
        <div style={{
          marginTop: '14.5px',
          marginRight: '16px',
          marginLeft: '16px',
          height: '40px',
          backgroundColor: fill,
          borderRadius: '12px',
          position: 'relative',
          display: 'flex',
          boxSizing: 'border-box',
          padding: '2px'
        }}>
          {/* Sliding white pill */}
          <div style={{
            position: 'absolute',
            top: '2px',
            bottom: '2px',
            left: '2px',
            width: 'calc(50% - 2px)',
            backgroundColor: surface,
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            transform: activeTab === 'all' ? 'translateX(0%)' : 'translateX(100%)',
            transition: 'transform 200ms ease',
            pointerEvents: 'none'
          }} />

          {/* Tab 1: "Все услуги" (width ~80) */}
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            style={{
              flex: 1,
              height: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              padding: 0,
              outline: 'none'
            }}
          >
            <span style={{
              fontSize: '16px',
              fontWeight: '500',
              color: textPrimary,
              letterSpacing: 0,
              lineHeight: '36px',
              whiteSpace: 'nowrap'
            }}>
              Все услуги
            </span>
          </button>

          {/* Tab 2: "Мои заявки" (width ~91) */}
          <button
            type="button"
            onClick={() => setActiveTab('requests')}
            style={{
              flex: 1,
              height: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              padding: 0,
              outline: 'none'
            }}
          >
            <span style={{
              fontSize: '16px',
              fontWeight: '500',
              color: textPrimary,
              letterSpacing: 0,
              lineHeight: '36px',
              whiteSpace: 'nowrap'
            }}>
              Мои заявки
            </span>
          </button>
        </div>

        {/* 2. SEARCH FIELD: field top ≈ y 164 (gap under segmented control 18, height 48) */}
        <div style={{
          marginTop: '18px',
          marginLeft: '16px',
          marginRight: '16px',
          height: '48px',
          backgroundColor: fill,
          borderRadius: '12px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}>
          {/* Magnifier icon: 22.5 x 22 at x 37 (16 + 21 = 37) */}
          <div style={{
            position: 'absolute',
            left: '21px',
            top: '13px',
            width: '22.5px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}>
            <SearchMagnifierIcon />
          </div>

          {/* Placeholder: start x 77 (16 + 61 = 77), width 180.5, font 17px, text top y 180.5 */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по Госуслугам"
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              paddingLeft: '61px',
              paddingRight: '16px',
              fontSize: '17px',
              fontWeight: '400',
              color: textPrimary,
              letterSpacing: 0,
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Block A bottom padding */}
        <div style={{ height: '20px' }} />
      </div>

      {/* 12pt Grey Gap between Block A and Block B */}
      <div style={{ height: '12px', flexShrink: 0 }} />

      {/* =====================================================================
          3. DOCUMENTS BLOCK: picture top y 273.5, label line 1/2 at 328.5/353, link at 392.5
          ===================================================================== */}
      <div style={{
        width: '100%',
        backgroundColor: surface,
        borderRadius: '16px',
        paddingTop: '17px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        {/* Horizontal scroll row of document cards: gap 12 */}
        <div style={{
          display: 'flex',
          gap: '12px',
          paddingLeft: '16px',
          paddingRight: '16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          boxSizing: 'border-box'
        }}>
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onOpenDoc && onOpenDoc(doc.id)}
              className="touchable"
              style={{
                width: '158px',
                height: '116px',
                backgroundColor: fill,
                borderRadius: '16px',
                flexShrink: 0,
                position: 'relative',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              {/* Card picture: 57 x 36 at top 12 (screen top y 273.5) */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '14px',
                width: '57px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                overflow: 'hidden'
              }}>
                {doc.icon && (
                  <img
                    src={doc.icon}
                    alt={doc.label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'left center',
                      display: 'block'
                    }}
                  />
                )}
              </div>

              {/* Label: 16px tall (+1px), line pitch 24.5px, top 67px (screen tops 328.5 / 353) */}
              <div style={{
                position: 'absolute',
                top: '67px',
                left: '14px',
                right: '12px',
                fontSize: '16px',
                fontWeight: '400',
                color: textPrimary,
                lineHeight: '24.5px',
                letterSpacing: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {doc.label}
              </div>
            </div>
          ))}
        </div>

        {/* Row with link "Все документы" (text top y 392.5, width 132.5, chevron top y 392) */}
        <div
          onClick={() => onOpenDoc && onOpenDoc('all')}
          className="touchable"
          style={{
            marginTop: '8px',
            height: '44px',
            paddingLeft: '16px',
            paddingRight: '16.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxSizing: 'border-box'
          }}
        >
          {/* "Все документы": width 132.5, font 18px Regular */}
          <span style={{
            fontSize: '18px',
            fontWeight: '400',
            color: linkBlue,
            letterSpacing: 0,
            lineHeight: '44px',
            width: '132.5px'
          }}>
            Все документы
          </span>

          {/* Chevron SVG */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LinkChevronIcon />
          </div>
        </div>

        {/* Block B bottom padding (Block B bottom ≈ y 428) */}
        <div style={{ height: '4px' }} />
      </div>

      {/* 12pt Grey Gap between Block B and Block C (y 428 to 440) */}
      <div style={{ height: '12px', flexShrink: 0 }} />

      {/* =====================================================================
          4. CATEGORIES + 5. SECTION TITLE + 6. SERVICE ROWS (Block C starts y 440)
          ===================================================================== */}
      <div style={{
        width: '100%',
        backgroundColor: surface,
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingTop: '17px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        {/* 4. CATEGORIES ROW: tiles top y 457 (56x56), labels top y 521.5, centres 71.5 / 180 / 267.5 / 351.5 */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '112.5px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          boxSizing: 'border-box'
        }}>
          <div style={{
            position: 'relative',
            width: '580px',
            height: '100%'
          }}>
            {categories.map((cat) => {
              const isSelected = selectedCat === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className="touchable"
                  style={{
                    position: 'absolute',
                    left: `${cat.cx - cat.w / 2}px`,
                    top: 0,
                    width: `${cat.w}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {/* Category Tile: 56 x 56 at y 457, background fill, radius 16 */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: fill,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      {cat.icon && (
                        <img
                          src={cat.icon}
                          alt={cat.label}
                          style={{
                            width: '44px',
                            height: '44px',
                            objectFit: 'contain'
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Label: top y 521.5 (marginTop 8.5px), 16px font */}
                  <span style={{
                    marginTop: '8.5px',
                    lineHeight: '20px',
                    fontSize: '16px',
                    fontWeight: isSelected ? '500' : '400',
                    color: isSelected ? accentRed : textPrimary,
                    letterSpacing: 0,
                    whiteSpace: 'nowrap',
                    textAlign: 'center'
                  }}>
                    {cat.label}
                  </span>
                </div>
              );
            })}

            {/* Red underline: y 552.5, 2 px, solid #F14635, x 22 → 120 (as wide as "Популярные") */}
            {selectedCat === 'popular' && (
              <div style={{
                position: 'absolute',
                top: '95.5px', // 440 + 17 + 95.5 = 552.5px
                left: '22px',
                width: '98px',
                height: '2px',
                backgroundColor: accentRed,
                zIndex: 2
              }} />
            )}

            {/* 1 pt full-width divider in divider colour (#EBEBEB) directly under categories at y 554.5 */}
            <div style={{
              position: 'absolute',
              top: '97.5px', // 440 + 17 + 97.5 = 554.5px
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: divider,
              zIndex: 1
            }} />
          </div>
        </div>

        {/* 5. SECTION TITLE "Популярные и новые": strictly in ONE line, 19px Bold */}
        <div style={{
          marginTop: '22px',
          paddingLeft: '16px',
          paddingRight: '16px',
          fontSize: '19px',
          fontWeight: '700',
          color: textPrimary,
          lineHeight: '22px',
          letterSpacing: 0,
          whiteSpace: 'nowrap'
        }}>
          {sectionTitle}
        </div>

        {/* 6. SERVICE ROWS: row 1 top y 630, row 2 top y 708.5, row 3 top y 785 (row pitch 78.5) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '31.5px' // 576.5 + 22 = 598.5 -> 598.5 + 31.5 = y 630
        }}>
          {activeTab === 'requests' ? (
            <div style={{
              padding: '36px 18px',
              textAlign: 'center',
              fontSize: '16px',
              color: textSecondary
            }}>
              У вас пока нет активных заявок
            </div>
          ) : (
            filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              const isPressed = pressedRowId === service.id;

              return (
                <div
                  key={service.id}
                  onTouchStart={() => setPressedRowId(service.id)}
                  onTouchEnd={() => setPressedRowId(null)}
                  onMouseDown={() => setPressedRowId(service.id)}
                  onMouseUp={() => setPressedRowId(null)}
                  onMouseLeave={() => setPressedRowId(null)}
                  className="touchable"
                  aria-label={`${service.title}${service.hasBadge ? ', new' : ''}`}
                  style={{
                    height: '78.5px', // Exact 78.5px row pitch
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    backgroundColor: isPressed ? fill : 'transparent',
                    transition: 'background-color 100ms ease',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Line icon circle: 44 x 44, centre (39, 655) -> left 17, top 3 */}
                  <div style={{
                    position: 'absolute',
                    left: '17px',
                    top: '3px',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: iconCircle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {IconComponent ? (
                      <IconComponent width={26} height={27.5} />
                    ) : (
                      <div style={{ width: '26px', height: '27.5px' }} />
                    )}
                  </div>

                  {/* Title & subtitle text: starts at x 81, width up to 232 (313 - 81) */}
                  <div style={{
                    position: 'absolute',
                    left: '81px',
                    top: 0,
                    width: '232px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* Title: 18px Regular, line pitch 27.5px, short words glued */}
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '400',
                      color: textPrimary,
                      lineHeight: '27.5px',
                      letterSpacing: 0,
                      whiteSpace: 'pre-line'
                    }}>
                      {glueShortWords(service.title)}
                    </div>

                    {/* Subtitle (row 3 sits right above tab bar, grey subtitle tucked under tab bar) */}
                    {service.subtitle && (
                      <div style={{
                        marginTop: '2px',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: textSecondary,
                        lineHeight: '18px',
                        letterSpacing: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {service.subtitle}
                      </div>
                    )}
                  </div>

                  {/* NEW Badge: 48.5 x 22 at x 313, vertically centred on 2-line title (top 11px) */}
                  {service.hasBadge && (
                    <div style={{
                      position: 'absolute',
                      left: '313px',
                      top: '11px',
                      width: '48.5px',
                      height: '22px',
                      borderRadius: '11px',
                      backgroundColor: accentRed,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#FFFFFF',
                        letterSpacing: 0,
                        lineHeight: '22px',
                        textTransform: 'uppercase'
                      }}>
                        NEW
                      </span>
                    </div>
                  )}

                  {/* Chevron: x 383, vertically centered at top 16 */}
                  <div style={{
                    position: 'absolute',
                    left: '383px',
                    top: '16px',
                    flexShrink: 0
                  }}>
                    <RowChevronIcon />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
