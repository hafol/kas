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

// 2. Search Magnifier SVG: 20 x 20, color placeholder
const SearchMagnifierIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
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

// 5. Official Kaspi Red Line Service Icons (from icons.need) - calibrated to match ReceiptIconRed (Штрафы)
// 1 house-plus.svg
const HousePlusIconRed = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="3 4 42 40" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M5 20L24 6l19 14"/>
    <path d="M10 17.500V37a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V17.500"/>
    <path d="M24 22v12M18 28h12"/>
  </svg>
);

// 2 house-plus-search.svg
const HousePlusSearchIconRed = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="3 4 42 41" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M5 20L24 6l19 14"/>
    <path d="M38 17.500V26M10 17.500V37a4 4 0 0 0 4 4h11"/>
    <path d="M24 20v10M19 25h10"/>
    <circle cx="35" cy="35" r="5"/>
    <path d="M38.800 38.800l4.200 4.200"/>
  </svg>
);

// 3 person-wallet.svg
const PersonWalletIconRed = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="4 4 41 40" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <circle cx="20" cy="13" r="7"/>
    <path d="M20 41H9a3 3 0 0 1-3-3c0-7 6-12 14-12"/>
    <rect x="25" y="27" width="18" height="14" rx="3.500"/>
    <path d="M43 32h-5a2 2 0 0 0 0 4h5"/>
  </svg>
);

// 4 document-car.svg
const DocumentCarIconRed = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="4 3 40 40" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M12 22V9a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v13"/>
    <path d="M19 11.500h10M19 17h6"/>
    <path d="M10.500 38H8a2 2 0 0 1-2-2v-2a3 3 0 0 1 3-3h3.500l3.600-5.600A3 3 0 0 1 18.600 24h9.800a3 3 0 0 1 2.500 1.400L34.500 31H39a3 3 0 0 1 3 3v2a2 2 0 0 1-2 2h-2.500"/>
    <path d="M19.500 38h9"/>
    <circle cx="15" cy="38" r="3.500"/>
    <circle cx="33" cy="38" r="3.500"/>
  </svg>
);

// 5 house-list-check.svg
const HouseListCheckIconRed = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="3 4 41 42" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M5 20L24 6l19 14"/>
    <path d="M38 17.500V25M10 17.500V37a4 4 0 0 0 4 4h10"/>
    <path d="M17 23h12M17 29.500h7"/>
    <path d="M29 35.500l4.500 4.500 9-9.500"/>
  </svg>
);

// 6 licence-wheel.svg
const LicenceWheelIconRed = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="3 7 42 38" fill="none" stroke="#F14635" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M40 21v-8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h15"/>
    <rect x="10" y="16" width="9" height="11" rx="2"/>
    <path d="M25 18h8"/>
    <circle cx="35" cy="34" r="8.500"/>
    <circle cx="35" cy="34" r="2"/>
    <path d="M27 33h6M37 33h6M35 36v6"/>
  </svg>
);

const CapitolIconRed = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="60 8 158 154" fill="none" stroke="#DF4E3E" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M138.5 64V22.5h46v24h-46"/>
    <path d="M106 98a33 33 0 0 1 66 0"/>
    <rect x="75.5" y="98.5" width="127" height="48" rx="7"/>
    <path d="M114 124.5v22M139 124.5v22M164.5 124.5v22"/>
  </svg>
);

const RepeatIconRed = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="20 20 146 142" fill="none" stroke="#DF4E3E" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M36.5 90.5V80.5a28 28 0 0 1 28-28h83"/>
    <path d="M129.5 34.5l18 18-18 18"/>
    <path d="M149.5 92.5v8a28 28 0 0 1-28 28h-84"/>
    <path d="M55.5 110.5l-18 18 18 18"/>
  </svg>
);

const BriefcaseSearchIconRed = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="44 20 154 148" fill="none" stroke="#DF4E3E" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M164.5 76V66a11.5 11.5 0 0 0-11.5-11.5H71A11.5 11.5 0 0 0 59.5 66v64A11.5 11.5 0 0 0 71 141.5h34"/>
    <path d="M98 54.5V46a11.5 11.5 0 0 1 11.5-11.5h7A11.5 11.5 0 0 1 128 46v8.5"/>
    <path d="M59.5 89.5h46"/>
    <circle cx="146" cy="117" r="25"/>
    <path d="M164 135l18.5 18.5"/>
  </svg>
);

const ReceiptIconRed = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="45 30 302 286" fill="none" stroke="#DF4E3E" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M119 128H89a20 20 0 0 1-20-20V74a20 20 0 0 1 20-20h214a20 20 0 0 1 20 20v34a20 20 0 0 1-20 20h-34"/>
    <path d="M119 290V106a8 8 0 0 1 8-8h134a8 8 0 0 1 8 8v184C257 290 257 283 245 283C232.5 283 232.5 292 220 292C207.5 292 207.5 283 195 283C182.5 283 182.5 292 170 292C157 292 157 283 144 283C131.5 283 131.5 290 119 290Z"/>
    <path d="M167 167.5h54M167 211.5h54" strokeWidth="24"/>
  </svg>
);

const DevicesIconRed = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="50 20 162 150" fill="none" stroke="#DF4E3E" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
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

  // Category Row in Block C (Order from specification with converted 3D SVG icons)
  const categories = [
    { id: 'popular', label: 'Популярные', icon: '/kaspi_assets/category_icons/category-popular-megaphone.svg' },
    { id: 'certs', label: 'Справки', icon: '/kaspi_assets/category_icons/category-certs-documents.svg' },
    { id: 'auto', label: 'Авто', icon: '/kaspi_assets/category_icons/category-auto-car.svg' },
    { id: 'home', label: 'Жилье', icon: '/kaspi_assets/category_icons/category-home-house.svg' },
    { id: 'family', label: 'Семья', icon: '/kaspi_assets/category_icons/category-family-stroller.svg' },
    { id: 'health', label: 'Здоровье', icon: '/kaspi_assets/category_icons/category-health-heart.svg' }
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
      fontFamily: 'system-ui, -apple-system, Roboto, sans-serif',
      paddingBottom: '90px',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* =====================================================================
          0. PAGE STRUCTURE: Three white blocks (surface) separated by 10pt gaps
          ===================================================================== */}

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
              left: '5.5px', // glyph center at x 27.5 (original) - 22px half-width
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

          {/* Title "Госуслуги": 18pt Semibold (text width 83/390 W in original), centered horizontally */}
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

        {/* Segmented Control ("Все услуги" | "Мои заявки"): 7 below nav bar, height 40 */}
        <div style={{
          marginTop: '7px',
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
          {/* Sliding white pill (inset 2 on all sides, height 36, radius 10) */}
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

          {/* Tab 1: "Все услуги" */}
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
              fontSize: '15px',
              fontWeight: '500',
              color: textPrimary,
              letterSpacing: 0,
              lineHeight: '36px',
              whiteSpace: 'nowrap'
            }}>
              Все услуги
            </span>
          </button>

          {/* Tab 2: "Мои заявки" */}
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
              fontSize: '15px',
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

        {/* Search Field (16 below segmented, height 48, background fill, radius 12) */}
        <div style={{
          marginTop: '16px',
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
          {/* Magnifier SVG 20 x 20, left edge at 17 inside the field (x 33 on screen) */}
          <div style={{
            position: 'absolute',
            left: '17px',
            top: '14px',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}>
            <SearchMagnifierIcon />
          </div>

          {/* Search Input: placeholder starts at 54 from left edge (x 70 on screen), 17pt Regular (iOS search size) */}
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
              paddingLeft: '54px',
              paddingRight: '16px',
              fontSize: '17px',
              fontWeight: '400',
              color: textPrimary,
              letterSpacing: 0,
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Block A bottom padding below search field: 16 */}
        <div style={{ height: '16px' }} />
      </div>

      {/* 10pt Gap between Block A and Block B */}
      <div style={{ height: '10px', flexShrink: 0 }} />

      {/* =====================================================================
          BLOCK B: Documents Carousel + "Все документы" Link
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
        {/* Horizontal scroll row of document cards: padding left 16, gap 12 (3rd card peeks ~34 pt) */}
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
                height: '109px',
                backgroundColor: fill,
                borderRadius: '16px',
                flexShrink: 0,
                position: 'relative',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              {/* Document picture: 58 x 38 box (art ≈ 56 x 37 in original), flush with text */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '14px',
                width: '58px',
                height: '38px',
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

              {/* Label: 15 pt Regular, textPrimary, line height 19, max 2 lines, flush with icon left */}
              <div style={{
                position: 'absolute',
                top: '62px',
                left: '14px',
                right: '12px',
                fontSize: '15px',
                fontWeight: '400',
                color: textPrimary,
                lineHeight: '19px',
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

        {/* Row with link "Все документы" on left and chevron on right (margin top 1, height 44:
            link centre sits 23 below the cards, as in the original) */}
        <div
          onClick={() => onOpenDoc && onOpenDoc('all')}
          className="touchable"
          style={{
            marginTop: '1px',
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
          {/* "Все документы": 17 pt Medium, linkBlue */}
          <span style={{
            fontSize: '17px',
            fontWeight: '500',
            color: linkBlue,
            letterSpacing: 0,
            lineHeight: '44px'
          }}>
            Все документы
          </span>

          {/* Chevron SVG: visible glyph 9 x 15, colour linkBlue, glyph right edge 21 from screen edge */}
          <LinkChevronIcon />
        </div>

        {/* Block B bottom padding: 3 after the link row */}
        <div style={{ height: '3px' }} />
      </div>

      {/* 10pt Gap between Block B and Block C */}
      <div style={{ height: '10px', flexShrink: 0 }} />

      {/* =====================================================================
          BLOCK C: Category Row + Section Title + Service List Rows
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
        {/* Category Row (Horizontal scroll row, padding left 20, gap 25 → 5th category peeks past "Жилье") */}
        <div style={{
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{
            display: 'flex',
            gap: '25px',
            paddingLeft: '20px',
            paddingRight: '20px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            boxSizing: 'border-box'
          }}>
            {categories.map((cat) => {
              const isSelected = selectedCat === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className="touchable"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    position: 'relative'
                  }}
                >
                  {/* Category Tile: 54 x 54, background fill, radius 16 */}
                  <div style={{
                    width: '54px',
                    height: '54px',
                    backgroundColor: fill,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                  }}>
                    {/* 3D SVG icon box 44 x 44 (art fills ~65–75% of the tile, as in the original) */}
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

                  {/* Label: margin top 4, 15pt / 20 line height, single line, centered under tile */}
                  <span style={{
                    marginTop: '4px',
                    lineHeight: '20px',
                    fontSize: '15px',
                    fontWeight: isSelected ? '500' : '400',
                    color: isSelected ? accentRed : textPrimary,
                    letterSpacing: 0,
                    whiteSpace: 'nowrap',
                    textAlign: 'center'
                  }}>
                    {cat.label}
                  </span>

                  {/* Selected Underline: 2 pt tall, accentRed, 11 below label, square ends, sits on divider */}
                  {isSelected && (
                    <div style={{
                      marginTop: '11px',
                      height: '2px',
                      width: '100%',
                      backgroundColor: accentRed,
                      borderRadius: 0,
                      position: 'relative',
                      zIndex: 2
                    }} />
                  )}

                  {!isSelected && (
                    <div style={{
                      marginTop: '11px',
                      height: '2px',
                      width: '100%',
                      backgroundColor: 'transparent'
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* 1 pt full-width divider in divider colour (#EBEBEB) directly under categories */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: divider,
            zIndex: 1
          }} />
        </div>

        {/* Section Title: "Популярные и новые", 17 pt Semibold, left 16, margin top 16 below divider, margin bottom 17 */}
        <div style={{
          marginTop: '16px',
          marginBottom: '17px',
          paddingLeft: '16px',
          fontSize: '17px',
          fontWeight: '600',
          color: textPrimary,
          lineHeight: '22px',
          letterSpacing: 0
        }}>
          {sectionTitle}
        </div>

        {/* Service List Rows (NO dividers between rows, NO cards, NO background) */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'requests' ? (
            <div style={{
              padding: '36px 18px',
              textAlign: 'center',
              fontSize: '15px',
              color: textSecondary
            }}>
              У вас пока нет активных заявок
            </div>
          ) : (
            filteredServices.map((service) => {
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
                    minHeight: '72px',
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    paddingLeft: '15px',
                    paddingRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: isPressed ? fill : 'transparent',
                    transition: 'background-color 100ms ease',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* [IconCircle]: 44 x 44 circle, background iconCircle #F7F7F7, center at x 37 */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: iconCircle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {/* Red line icon placed centered at 24 x 24 */}
                    {IconComponent ? (
                      <IconComponent size={24} />
                    ) : (
                      <div style={{ width: '24px', height: '24px' }} />
                    )}
                  </div>

                  {/* Gap 16 to text column */}
                  <div style={{ width: '16px', flexShrink: 0 }} />

                  {/* [Text column, flex 1]: starts at x 75; its centre sits 2 above the icon/badge centre
                      (marginTop -4 in a centred flex row), as measured on the original */}
                  <div style={{
                    flex: 1,
                    minWidth: 0,
                    marginTop: '-4px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    {/* Title: 15 pt Regular, textPrimary, line height 22, max 2 lines, short words glued forward */}
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '400',
                      color: textPrimary,
                      lineHeight: '22px',
                      letterSpacing: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {glueShortWords(service.title)}
                    </div>

                    {/* Optional subtitle: margin top 2, 13 pt Regular, textSecondary, line height 17 */}
                    {service.subtitle && (
                      <div style={{
                        marginTop: '2px',
                        fontSize: '13px',
                        fontWeight: '400',
                        color: textSecondary,
                        lineHeight: '17px',
                        letterSpacing: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {service.subtitle}
                      </div>
                    )}
                  </div>

                  {/* NEW Badge: height 21, horizontal padding 10, radius 10.5, background accentRed */}
                  {service.hasBadge && (
                    <div style={{
                      marginLeft: '12px',
                      height: '21px',
                      padding: '0 10px',
                      borderRadius: '10.5px',
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
                        lineHeight: '21px',
                        textTransform: 'uppercase'
                      }}>
                        NEW
                      </span>
                    </div>
                  )}

                  {/* Gap 16 to Chevron box (visible glyph starts 20 after the badge) */}
                  <div style={{ width: '16px', flexShrink: 0 }} />

                  {/* Chevron: visible glyph 8 x 13, color chevronGrey, glyph right edge 20 from screen edge */}
                  <div style={{ flexShrink: 0 }}>
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
