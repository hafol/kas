import React, { useState } from 'react';
import {
  TopBarCartIcon,
  CameraSparkleIcon,
  KaspiDiscountBadgeIcon,
  KaspiBonusGradientFlame
} from './KaspiServiceIcons';

// Vector star icon: 8 pt, color #F84237
const KaspiRatingStar = ({ size = 8, color = "#F84237" }) => (
  <svg
    width={size}
    height={size}
    viewBox="1.5 1.5 21 20"
    fill={color}
    style={{ display: 'inline-block', verticalAlign: '-0.5px', flexShrink: 0 }}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

// Heart favorite button: 21 x 21 pt, white fill, #1C1C1C stroke 2 pt, thin white halo
const FeedHeartIcon = ({ isFavorite = false, size = 21 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{
      display: 'block',
      filter: 'drop-shadow(0 0 1px #FFFFFF) drop-shadow(0 0 1px #FFFFFF)'
    }}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={isFavorite ? '#F14635' : '#FFFFFF'}
      stroke={isFavorite ? '#F14635' : '#1C1C1C'}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const HomeScreen = ({
  onOpenMyBank,
  onOpenTransfers,
  onOpenGov,
  onOpenService,
  onOpenSearch
}) => {
  const [activeFilterTab, setActiveFilterTab] = useState('recommendations');
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 4 products matching the exact reference screenshots:
  // Row 1 Card 1: Leadbros fridge (ad card, 13 999 Б + 5% bonus box, 279 990 ₸, 265 991 ₸ с учетом Бонусов, 5.0 (930), 16 695 ₸ x24)
  // Row 1 Card 2: Lenovo LOQ laptop (649 437 ₸, 4.9 (12), 27 060 ₸ x24)
  // Row 2 Card 1: LG fridge (-31% discount, red 896 006 ₸, old 1 300 000 ₸ struck through, 5.0 (51), 37 334 ₸ x24)
  // Row 2 Card 2: Dyson Supersonic (bonus badge 14 500 Б, 289 990 ₸, 275 490 ₸ с учетом Бонусов, 5.0 (128), 12 083 ₸ x24)
  const feedItems = [
    {
      id: 'prod_leadbros',
      image: '/kaspi_assets/products/leadbros_fridge.jpg',
      title: 'Холодильник Leadbros HD-400RWD черный',
      price: '279 990 ₸',
      oldPrice: null,
      isAd: true,
      dotsCount: 6,
      activeDot: 0,
      bonusBadge: '13 999 Б',
      bonusPercent: '5%',
      bonusPill: {
        price: '265 991 ₸',
        caption: 'с учетом Бонусов'
      },
      rating: '5.0',
      reviews: '(930)',
      installment: '16 695 ₸',
      term: 'x24',
      tagType: 'bonuses'
    },
    {
      id: 'prod_lenovo',
      image: '/kaspi_assets/products/laptop_lenovo_white.jpg',
      title: 'Ноутбук Lenovo LOQ 15 Gaming RTX 5050 8GB / 16 ГБ / SSD 512 ГБ / Win 11',
      price: '649 437 ₸',
      oldPrice: null,
      isAd: false,
      dotsCount: 4,
      activeDot: 0,
      bonusBadge: null,
      bonusPercent: null,
      bonusPill: null,
      rating: '4.9',
      reviews: '(12)',
      installment: '27 060 ₸',
      term: 'x24',
      tagType: 'recommendations'
    },
    {
      id: 'prod_lg',
      image: '/kaspi_assets/products/fridge_lg.jpg',
      title: 'Холодильник LG GC-B257JEYV белый',
      price: '896 006 ₸',
      oldPrice: '1 300 000 ₸',
      discountBadge: '-31%',
      isAd: false,
      dotsCount: 5,
      activeDot: 0,
      bonusBadge: null,
      bonusPercent: null,
      bonusPill: null,
      rating: '5.0',
      reviews: '(51)',
      installment: '37 334 ₸',
      term: 'x24',
      tagType: 'discounts'
    },
    {
      id: 'prod_dyson',
      image: '/kaspi_assets/products/dyson.jpg',
      title: 'Фен Dyson Supersonic Nural HD16 Vinca Blue / Topaz',
      price: '289 990 ₸',
      oldPrice: null,
      isAd: false,
      dotsCount: 5,
      activeDot: 0,
      bonusBadge: '14 500 Б',
      bonusPercent: '5%',
      bonusPill: {
        price: '275 490 ₸',
        caption: 'с учетом Бонусов'
      },
      rating: '5.0',
      reviews: '(128)',
      installment: '12 083 ₸',
      term: 'x24',
      tagType: 'bonuses'
    }
  ];

  const filteredFeed = feedItems.filter((item) => {
    if (activeFilterTab === 'recommendations') return true;
    if (activeFilterTab === 'bonuses') return !!item.bonusBadge || !!item.bonusPill || item.tagType === 'bonuses';
    if (activeFilterTab === 'discounts') return !!item.oldPrice || !!item.discountBadge || item.tagType === 'discounts';
    return true;
  });

  return (
    <div style={{
      width: '100%',
      maxWidth: '393px',
      minWidth: 0,
      backgroundColor: '#FFFFFF',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 0,
      paddingBottom: 'calc(54px + max(env(safe-area-inset-bottom, 34px), 34px) + 20px)',
      overflowX: 'hidden',
      boxSizing: 'border-box',
      fontFamily: "'Roboto', sans-serif",
      position: 'relative'
    }}>
      {/* =====================================================================
          2. SEARCH BAR
          Frame: x 16.6, y 49.2, 315 x 40 pt (x 25, y 74, 474 x 60 px).
          Corner radius: 10 pt (15 px). Fill: #F2F2F2.
          No divider under search bar (reference has none).
          Magnifier: 18 x 18 pt at x 28.6, y 60 pt, #919191, stroke 2 pt.
          Placeholder: starts at x 57 pt, Roboto Regular 17 pt, #8A8A8A, vertically centered.
          Camera: 22 x 19 pt at x 296.5, y 59 pt, #494949.
          Cart icon: 28.6 x 24.6 pt at x 345.7, y 55.2 pt, #9B9B9B.
          Cart badge: red circle 14 pt diameter at (366.4, 62.5) pt, fill #F14635, white "3" Roboto Medium 11 pt.
      ===================================================================== */}
      <div style={{
        paddingTop: '49.2px',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
        border: 'none',
        borderBottom: 'none',
        boxShadow: 'none',
        outline: 'none'
      }}>
        {/* Search Field Box: x 16.6pt, width 315pt, height 40pt */}
        <div
          id="kaspi-search-field"
          onClick={onOpenSearch}
          className="touchable"
          style={{
            marginLeft: '16.6px',
            width: '315px',
            height: '40px',
            backgroundColor: '#F2F2F2',
            borderRadius: '10px',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer',
            boxSizing: 'border-box',
            flexShrink: 0
          }}
        >
          {/* Magnifier icon: 18 x 18 pt at x 28.6pt (12pt from field left), y 60pt (10.8pt from field top) */}
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '11px',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="#919191" strokeWidth="2" />
              <path d="M12 12L16.5 16.5" stroke="#919191" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Placeholder: starts at x 57pt (40.4pt inside field), Roboto Regular 17 pt, #8A8A8A, vertically centered */}
          <span style={{
            position: 'absolute',
            left: '40.4px',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '17px',
            fontWeight: '400',
            color: '#8A8A8A',
            lineHeight: '40px',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}>
            Поиск по Kaspi.kz
          </span>

          {/* Camera-with-sparkle icon: 22 x 19 pt at x 296.5pt (279.9pt inside field, 13.1pt inside field right edge), y 59pt (9.8pt from field top) */}
          <div style={{
            position: 'absolute',
            left: '279.9px',
            top: '10.5px',
            width: '22px',
            height: '19px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <CameraSparkleIcon width={22} height={19} color="#494949" />
          </div>
        </div>

        {/* Cart Icon: 28.6 x 24.6 pt at x 345.7pt, y 55.2pt */}
        <div
          onClick={() => onOpenService && onOpenService('cart')}
          className="touchable"
          style={{
            position: 'absolute',
            left: '345.7px',
            top: '55.2px',
            width: '28.6px',
            height: '24.6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <TopBarCartIcon width={28.6} height={24.6} color="#9B9B9B" />
        </div>

        {/* Cart Badge: red circle 14 pt diameter, center at (366.4, 62.5) pt -> left: 359.4pt, top: 55.5pt */}
        <div style={{
          position: 'absolute',
          left: '359.4px',
          top: '55.5px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: '#F14635',
          color: '#FFFFFF',
          fontFamily: "'Roboto', sans-serif",
          fontSize: '11px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: '14px',
          boxSizing: 'border-box',
          pointerEvents: 'none'
        }}>
          3
        </div>
      </div>

      {/* =====================================================================
          3. FILTER CHIPS ROW
          Row y: 109 pt, height: 33 pt (164–213 px).
          Gap search -> chips: 20.6 pt (31 px) from search bottom (89.2 pt) to chip top.
          Left margin: 12.6 pt (19 px), right margin: 13.3 pt (20 px).
          Gap between chips: 8.6 pt (13 px).
          All chips: radius 16.5 pt (height / 2).
          1. "Рекомендации" (selected): x 12.6 pt, width 119.7 pt, filled #F14635, white Roboto Medium 15 pt.
          2. "Скидки": x 141 pt, width 115 pt, white fill, 2 pt border #F14635, text Roboto Medium 15 pt #F14635,
             red scalloped percent icon 16 x 16 pt at x 247 px (164.2 pt), gap to text 6 pt.
          3. "Бонусы": x 264.6 pt, width 115.7 pt, white fill, 2 pt border #F14635, text Roboto Medium 15 pt #F14635,
             orange gradient flame (#FB5410 to #FFC700) 13 x 21 pt at x 434 px (288.6 pt).
      ===================================================================== */}
      <div style={{
        marginTop: '19.8px',
        height: '33px',
        paddingLeft: '12.6px',
        paddingRight: '13.3px',
        display: 'flex',
        alignItems: 'center',
        gap: '8.6px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Chip 1: Рекомендации (width 119.7 pt) */}
        <button
          onClick={() => setActiveFilterTab('recommendations')}
          className="touchable"
          style={{
            width: '119.7px',
            height: '33px',
            borderRadius: '16.5px',
            backgroundColor: activeFilterTab === 'recommendations' ? '#F14635' : '#FFFFFF',
            border: activeFilterTab === 'recommendations' ? 'none' : '2px solid #F14635',
            color: activeFilterTab === 'recommendations' ? '#FFFFFF' : '#F14635',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '15px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            boxSizing: 'border-box',
            outline: 'none',
            flexShrink: 0
          }}
        >
          Рекомендации
        </button>

        {/* Chip 2: Скидки (width 115 pt) */}
        <button
          onClick={() => setActiveFilterTab('discounts')}
          className="touchable"
          style={{
            width: '115px',
            height: '33px',
            borderRadius: '16.5px',
            backgroundColor: activeFilterTab === 'discounts' ? '#F14635' : '#FFFFFF',
            border: activeFilterTab === 'discounts' ? 'none' : '2px solid #F14635',
            color: activeFilterTab === 'discounts' ? '#FFFFFF' : '#F14635',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '15px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            padding: 0,
            boxSizing: 'border-box',
            outline: 'none',
            flexShrink: 0
          }}
        >
          <KaspiDiscountBadgeIcon size={16} isActive={activeFilterTab === 'discounts'} />
          <span>Скидки</span>
        </button>

        {/* Chip 3: Бонусы (width 115.7 pt) */}
        <button
          onClick={() => setActiveFilterTab('bonuses')}
          className="touchable"
          style={{
            width: '115.7px',
            height: '33px',
            borderRadius: '16.5px',
            backgroundColor: activeFilterTab === 'bonuses' ? '#F14635' : '#FFFFFF',
            border: activeFilterTab === 'bonuses' ? 'none' : '2px solid #F14635',
            color: activeFilterTab === 'bonuses' ? '#FFFFFF' : '#F14635',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '15px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            padding: 0,
            boxSizing: 'border-box',
            outline: 'none',
            flexShrink: 0
          }}
        >
          <KaspiBonusGradientFlame width={13} height={21} id="bonusChipFlame" />
          <span>Бонусы</span>
        </button>
      </div>

      {/* =====================================================================
          4. PRODUCT GRID
          Gap chips -> cards: 21.3 pt (32 px) from chip bottom (142 pt) to card top (163 pt / 245 px).
          Card 1 x: 1.3 pt, width 193.5 pt (2–292 px).
          Card 2 x: 197.5 pt, width 194 pt (297–588 px).
          Gap between columns: 2.7 pt (4 px).
          Side margins: 1.3 pt (2 px).
          Card height: 194 pt (292 px, square 1:1).
          Corner radius: 8 pt (12 px).
          Border: hairline (0.5 pt) #EDEDED.
          Image: full-bleed: fills the whole card, objectFit: cover, clipped to 8 pt radius, no padding.
          Row 2 card top: y 522 pt (785 px), which is 15.3 pt (23 px) below tallest column's last element.
      ===================================================================== */}
      <div style={{
        marginTop: '21px',
        paddingLeft: '1.3px',
        paddingRight: '1.3px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '193.5px 194px',
          columnGap: '2.7px',
          rowGap: '13.8px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {filteredFeed.map((item) => {
            const isFav = !!favorites[item.id];

            return (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                {/* 4. CARD CONTAINER (Only the image area, 194 pt square, 1:1) */}
                <div style={{
                  width: '100%',
                  height: '194px',
                  borderRadius: '8px',
                  border: '0.5px solid #EDEDED',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden',
                  position: 'relative',
                  boxSizing: 'border-box'
                }}>
                  {/* Full-bleed image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  {/* 4a. Heart (favorite) button: 21 x 21 pt, 11 pt from right and top */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className="touchable"
                    style={{
                      position: 'absolute',
                      top: '11px',
                      right: '11px',
                      width: '21px',
                      height: '21px',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      zIndex: 4,
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FeedHeartIcon isFavorite={isFav} size={21} />
                  </button>

                  {/* 4b. Bonus badge (green, bottom-left of image) */}
                  {item.bonusBadge && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: '19.3px',
                      backgroundColor: '#56A30A',
                      borderRadius: '0 6px 0 8px',
                      paddingLeft: '4px',
                      paddingRight: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      zIndex: 3,
                      boxSizing: 'border-box'
                    }}>
                      {/* Yellow flame icon #F9D609, ≈ 10 x 14 pt */}
                      <svg width="10" height="14" viewBox="0 0 48 48" fill="none" style={{ flexShrink: 0, marginRight: '3px' }}>
                        <path
                          fill="#F9D609"
                          d="M24 4c3 6 6 10 7 16 1.500-2 2.500-3.500 3-5 4 6 7 12 6 18s-5 10-10 11c1-5-2-10-6-13-4 3-7 8-6 13-5-1-9-5-10-11s2-12 6-18c.500 1.500 1.500 3 3 5 1-6 4-10 7-16z"
                        />
                      </svg>

                      {/* "13 999 Б": white, Roboto Bold 15 pt */}
                      <span style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        lineHeight: '19.3px',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.bonusBadge}
                      </span>

                      {/* White rounded box "5%": 30 x 15 pt, radius 4 pt, text green #518D0A, Roboto Bold 13 pt */}
                      {item.bonusPercent && (
                        <div style={{
                          marginLeft: '4px',
                          width: '30px',
                          height: '15px',
                          borderRadius: '4px',
                          backgroundColor: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <span style={{
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: '13px',
                            fontWeight: '700',
                            color: '#518D0A',
                            lineHeight: 1
                          }}>
                            {item.bonusPercent}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4c. Discount badge: 42.5 x 19.3 pt, fill #F14635, radius 0 6pt 0 8pt, "-31%" Roboto Bold 15 pt */}
                  {item.discountBadge && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '42.5px',
                      height: '19.3px',
                      backgroundColor: '#F14635',
                      borderRadius: '0 6px 0 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                      boxSizing: 'border-box'
                    }}>
                      <span style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        lineHeight: 1
                      }}>
                        {item.discountBadge}
                      </span>
                    </div>
                  )}
                </div>

                {/* =====================================================================
                    5. UNDER-CARD TEXT BLOCK
                    Spacing chain in pt (top of one to top of the next):
                    card bottom -> dots 6.6
                    dots -> Реклама 9.3
                    Реклама -> price 17.3
                    price -> green pill 19.3
                    pill -> title 25.3
                    title (last line) -> rating 19.3
                    rating -> installment 16.6
                ===================================================================== */}
                <div style={{
                  paddingLeft: '8.6px',
                  paddingRight: '8px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box'
                }}>
                  {/* 1. Carousel dots: 3.3 pt dots, pitch 7.3 pt (gap 4 pt), centered horizontally, 6.6 pt below card bottom */}
                  {item.dotsCount && (
                    <div style={{
                      marginTop: '6.6px',
                      height: '3.3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}>
                      {Array.from({ length: item.dotsCount }).map((_, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: '3.3px',
                            height: '3.3px',
                            borderRadius: '50%',
                            backgroundColor: idx === (item.activeDot || 0) ? '#030303' : '#646464',
                            flexShrink: 0
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* 2. "Реклама" label (ad cards only): Roboto Regular 13 pt, #9C9C9C.
                      Dots top to Ad top is 9.3 pt. Dots height is 3.3 pt -> marginTop: 6.0px. */}
                  {item.isAd && (
                    <div style={{
                      marginTop: '6.0px',
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: '13px',
                      fontWeight: '400',
                      color: '#9C9C9C',
                      lineHeight: '13px',
                      height: '13px'
                    }}>
                      Реклама
                    </div>
                  )}

                  {/* 3. Price: Roboto Bold 19 pt.
                      Ad top to Price top is 17.3 pt. Ad height is 13 pt -> marginTop: 4.3px.
                      Without ad: dots bottom to Price top -> marginTop: 23.3px. */}
                  <div style={{
                    marginTop: item.isAd ? '4.3px' : (item.dotsCount ? '23.3px' : '17.3px'),
                    display: 'flex',
                    alignItems: 'baseline',
                    lineHeight: '19px',
                    height: '19px'
                  }}>
                    <span style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: '19px',
                      fontWeight: '700',
                      color: item.oldPrice ? '#F14635' : '#000000',
                      lineHeight: '19px'
                    }}>
                      {item.price}
                    </span>
                    {item.oldPrice && (
                      <span style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: '19px',
                        fontWeight: '700',
                        color: '#000000',
                        textDecoration: 'line-through 2px solid #000000',
                        lineHeight: '19px',
                        marginLeft: '4px'
                      }}>
                        {item.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* 4. Green bonus pill: height 19.3 pt, width = 177 pt, fill #DEF7D2, fully rounded.
                      Price top to Pill top is 19.3 pt. Price height is 19 pt -> marginTop: 0.3px. */}
                  {item.bonusPill && (
                    <div style={{
                      marginTop: '0.3px',
                      height: '19.3px',
                      width: '100%',
                      borderRadius: '9.65px',
                      backgroundColor: '#DEF7D2',
                      paddingLeft: '4px',
                      paddingRight: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      boxSizing: 'border-box',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden'
                    }}>
                      <span style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#569202',
                        lineHeight: 1
                      }}>
                        {item.bonusPill.price}
                      </span>
                      <span style={{
                        marginLeft: '6px',
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: '15px',
                        fontWeight: '400',
                        color: '#1A1A1A',
                        lineHeight: 1
                      }}>
                        {item.bonusPill.caption}
                      </span>
                    </div>
                  )}

                  {/* 5. Title: Roboto Regular 15 pt, #000000, line height 16 pt (24 px pitch), max 2 lines.
                      Pill top to Title top is 25.3 pt. Pill height is 19.3 pt -> marginTop: 6.0px. */}
                  <div style={{
                    marginTop: item.bonusPill ? '6.0px' : '25.6px',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: '15px',
                    fontWeight: '400',
                    color: '#000000',
                    lineHeight: '16px',
                    minHeight: '16px',
                    maxHeight: '32px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.title}
                  </div>

                  {/* 6. Rating row: "5.0" in Roboto Bold 14 pt #000, star 8 pt #F84237, "(930)" in Roboto Regular 14 pt #636363.
                      Title line 2 top (450.8) to Rating top (454.1) -> marginTop: 3.3px. */}
                  {item.rating && (
                    <div style={{
                      marginTop: '3.3px',
                      height: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      lineHeight: '14px'
                    }}>
                      <span style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#000000',
                        lineHeight: 1
                      }}>
                        {item.rating}
                      </span>
                      <KaspiRatingStar size={8} color="#F84237" />
                      <span style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#636363',
                        lineHeight: 1
                      }}>
                        {item.reviews}
                      </span>
                    </div>
                  )}

                  {/* 7. Installment pill: height 20.6 pt, fill #FFD400, radius 5 pt, horizontal padding 6 pt.
                      Rating top to Installment top is 16.6 pt. Rating height is 14 pt -> marginTop: 2.6px. */}
                  {item.installment && (
                    <div style={{
                      marginTop: '2.6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <div style={{
                        height: '20.6px',
                        borderRadius: '5px',
                        backgroundColor: '#FFD400',
                        paddingLeft: '6px',
                        paddingRight: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#1C1C1C',
                        lineHeight: 1,
                        whiteSpace: 'nowrap'
                      }}>
                        {item.installment}
                      </div>
                      {item.term && (
                        <span style={{
                          fontFamily: "'Roboto', sans-serif",
                          fontSize: '15px',
                          fontWeight: '400',
                          color: '#8C8C8C',
                          lineHeight: 1
                        }}>
                          {item.term}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
