import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import {
  IconShop,
  IconMyBank,
  IconPayments,
  IconTransfers,
  IconMagnum,
  IconTravel,
  IconGov,
  IconJobs,
  TopBarCartIcon,
  CameraSparkleIcon,
  KaspiBonusSymbol,
  KaspiDiscountBadgeIcon,
  KaspiFlameIcon,
  KaspiYellowFlame,
  KaspiHeartIcon
} from './KaspiServiceIcons';

// Filled vector star icon, 13 pt, color #F14635
const KaspiRatingStar = ({ size = 13, color = "#F14635" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ display: 'inline-block', verticalAlign: '-1px', flexShrink: 0 }}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const HomeScreen = ({
  onOpenMyBank,
  onOpenTransfers,
  onOpenGov,
  onOpenService,
  onOpenSearch
}) => {
  // 4 Authentic Kaspi Top Banners
  const topBanners = [
    {
      id: 1,
      src: '/kaspi_assets/banners/banner_backpacks.png',
      alt: 'Рюкзаки'
    },
    {
      id: 2,
      src: '/kaspi_assets/banners/banner_home_appliances.png',
      alt: 'Бытовая техника'
    },
    {
      id: 3,
      src: '/kaspi_assets/banners/banner_wardrobe_basics.png',
      alt: 'Одежда'
    },
    {
      id: 4,
      src: '/kaspi_assets/banners/banner_basic_jeans.png',
      alt: 'Джинсы'
    }
  ];

  const bannerScrollRef = useRef(null);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [isDraggingBanner, setIsDraggingBanner] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragScrollLeft, setDragScrollLeft] = useState(0);

  const [activeFilterTab, setActiveFilterTab] = useState('recommendations');
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Synchronize active dot with scroll position
  const handleBannerScroll = () => {
    if (!bannerScrollRef.current) return;
    const { scrollLeft, clientWidth } = bannerScrollRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / clientWidth);
      if (idx >= 0 && idx < topBanners.length && idx !== activeBannerIndex) {
        setActiveBannerIndex(idx);
      }
    }
  };

  const scrollToBanner = (index) => {
    if (!bannerScrollRef.current) return;
    const clientWidth = bannerScrollRef.current.clientWidth;
    bannerScrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth'
    });
    setActiveBannerIndex(index);
  };

  // Auto-advance banner every 4.5 seconds
  useEffect(() => {
    if (isDraggingBanner) return;
    const timer = setInterval(() => {
      if (!bannerScrollRef.current) return;
      const nextIdx = (activeBannerIndex + 1) % topBanners.length;
      scrollToBanner(nextIdx);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeBannerIndex, isDraggingBanner]);

  // Mouse drag handlers for desktop emulation
  const handleBannerMouseDown = (e) => {
    if (!bannerScrollRef.current) return;
    setIsDraggingBanner(true);
    setDragStartX(e.pageX);
    setDragScrollLeft(bannerScrollRef.current.scrollLeft);
  };

  useEffect(() => {
    if (!isDraggingBanner) return;
    const onMouseMove = (e) => {
      if (!bannerScrollRef.current) return;
      const walk = (e.pageX - dragStartX) * 1.15;
      bannerScrollRef.current.scrollLeft = dragScrollLeft - walk;
    };
    const onMouseUp = () => {
      setIsDraggingBanner(false);
      if (bannerScrollRef.current) {
        const { scrollLeft, clientWidth } = bannerScrollRef.current;
        const nearest = Math.round(scrollLeft / clientWidth);
        scrollToBanner(nearest);
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDraggingBanner, dragStartX, dragScrollLeft]);

  // "Вы недавно смотрели" carousel items
  const viewedProducts = [
    {
      id: 'viewed_leadbros',
      title: 'Leadbros HD-40...',
      price: '279 990 ₸',
      oldPrice: null,
      discountChip: null,
      bonusChip: '13 999 Б',
      hasFlame: true,
      bonusBox: {
        price: '265 991 ₸',
        caption: 'с учетом Бонусов'
      },
      rating: '5.0',
      reviews: '(898)',
      image: '/kaspi_assets/products/leadbros_fridge.jpg'
    },
    {
      id: 'viewed_lenovo',
      title: 'Lenovo LOQ 15A...',
      price: '649 437 ₸',
      oldPrice: '759 999 ₸',
      discountChip: '-15%',
      bonusChip: null,
      bonusBox: null,
      rating: '4.9',
      reviews: '(12)',
      image: '/kaspi_assets/products/laptop_lenovo_white.jpg'
    },
    {
      id: 'viewed_lg',
      title: 'LG GC-L257CBE...',
      price: '879 957 ₸',
      oldPrice: null,
      discountChip: null,
      bonusChip: '26 398 Б',
      hasFlame: true,
      bonusBox: {
        price: '853 559 ₸',
        caption: 'с учетом Бонусов'
      },
      rating: '5.0',
      reviews: '(51)',
      image: '/kaspi_assets/products/fridge_lg.jpg'
    },
    {
      id: 'viewed_charger',
      title: 'PD20W U...',
      price: '658 ₸',
      oldPrice: null,
      discountChip: null,
      bonusChip: null,
      bonusBox: null,
      rating: '4.5',
      reviews: '(361)',
      image: '/kaspi_assets/products/charger_pd20.jpg'
    },
    {
      id: 'viewed_kudo',
      title: 'Kudo 10095 ral...',
      price: '1 800 ₸',
      oldPrice: null,
      discountChip: null,
      bonusChip: null,
      bonusBox: null,
      rating: '4.6',
      reviews: '(15)',
      image: '/kaspi_assets/products/spray_kudo.png'
    },
    {
      id: 'viewed_g2100',
      title: 'G2100 эмаль С...',
      price: '1 420 ₸',
      oldPrice: null,
      discountChip: null,
      bonusChip: null,
      bonusBox: null,
      rating: '5.0',
      reviews: '(16)',
      image: '/kaspi_assets/products/spray_g2100.png'
    },
    {
      id: 'viewed_tytan',
      title: 'TYTAN Хром 40...',
      price: '2 970 ₸',
      oldPrice: null,
      discountChip: null,
      bonusChip: null,
      bonusBox: null,
      rating: '4.6',
      reviews: '(2)',
      image: '/kaspi_assets/products/spray_tytan.png'
    }
  ];

  // Feed items below the divider
  const allFeedProducts = [
    {
      id: 'prod_castom',
      title: 'Castom GS-D16 16" / 32 ГБ / SSD 1000 ГБ / Win 11 / D16',
      price: '209 990 ₸',
      installmentPrice: '8 750 ₸',
      installmentTerm: 'x24',
      rating: '4.8',
      reviews: '64',
      dotsCount: 4,
      activeDot: 0,
      image: '/kaspi_assets/products/laptop_castom.jpg',
      tagType: 'recommendations'
    },
    {
      id: 'prod_dyson',
      title: 'Фен Dyson Supersonic Nural HD16 Vinca Blue / Topaz',
      price: '289 990 ₸',
      bonusBadge: '14 500 Б',
      bonusDiscountPrice: '275 490 ₸',
      installmentPrice: '12 083 ₸',
      installmentTerm: 'x24',
      rating: '5.0',
      reviews: '128',
      hasFlame: true,
      dotsCount: 5,
      activeDot: 0,
      image: '/kaspi_assets/products/dyson.jpg',
      tagType: 'bonuses'
    },
    {
      id: 'prod_ps5',
      title: 'Игровая приставка Sony PlayStation 5 Slim 1TB White',
      price: '264 990 ₸',
      installmentPrice: '11 041 ₸',
      installmentTerm: 'x24',
      rating: '5.0',
      reviews: '312',
      dotsCount: 5,
      activeDot: 0,
      image: '/kaspi_assets/products/ps5.jpg',
      tagType: 'recommendations'
    },
    {
      id: 'prod_lenovo_feed',
      title: 'Ноутбук Lenovo LOQ 15 Gaming RTX 5050 8GB / 16 ГБ',
      price: '649 874 ₸',
      oldPrice: '759 999 ₸',
      discountBadge: '-14%',
      installmentPrice: '27 078 ₸',
      installmentTerm: 'x24',
      rating: '4.9',
      reviews: '10',
      dotsCount: 4,
      activeDot: 0,
      image: '/kaspi_assets/products/laptop_lenovo.jpg',
      tagType: 'discounts'
    }
  ];

  const filteredFeed = allFeedProducts.filter((item) => {
    if (activeFilterTab === 'recommendations') return true;
    if (activeFilterTab === 'bonuses') return !!item.bonusBadge || !!item.bonusDiscountPrice || item.tagType === 'bonuses';
    if (activeFilterTab === 'discounts') return !!item.oldPrice || !!item.discountBadge || item.tagType === 'discounts';
    return true;
  });

  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
      minWidth: 0,
      backgroundColor: '#FFFFFF',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '52.5px', // Exact search field top is 52.5 from the top of the screen (4.5 below 48 pt status bar)
      paddingBottom: 'calc(87.5px + 20px)', // Scroll content clears the fixed bottom tab bar (87.5 pt)
      overflowX: 'hidden',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, Roboto, sans-serif',
      letterSpacing: 0
    }}>
      {/* =====================================================================
          1. HEADER (search + cart)
          Search field: x 18, width = screen - 18 - 64.5 (331.5 on 414), height 40.5, radius 8, fill searchBg #F2F2F2, no border.
          Magnifier: 20 x 20, colour textSecondary #8E8E8E, left edge 11 inside field, vertically centred.
          Placeholder: 17 pt Regular, colour #8E8E8E, 10 pt after magnifier.
          Camera/scan icon: box 28.5 x 22, right edge 12 inside field.
          Cart icon: 26 x 25, colour #9E9E9E, 15.5 right of field, vertically centred.
          Badge: 15.5 circle accentRed #F14635, number 11 Semibold white, top-right of cart.
      ===================================================================== */}
      <div style={{
        paddingLeft: '18px',
        paddingRight: '23px',
        display: 'flex',
        alignItems: 'center',
        height: '40.5px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Search Field */}
        <div
          onClick={onOpenSearch}
          className="touchable"
          style={{
            flex: 1,
            height: '40.5px',
            backgroundColor: '#F2F2F2',
            borderRadius: '8px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '11px',
            paddingRight: '12px',
            cursor: 'pointer',
            boxSizing: 'border-box'
          }}
        >
          {/* Magnifier: 20 x 20, #8E8E8E */}
          <Search size={20} color="#8E8E8E" strokeWidth={2.2} style={{ flexShrink: 0 }} />

          {/* Placeholder: 17 pt Regular, 10 pt after magnifier */}
          <span style={{
            fontSize: '17px',
            fontWeight: '400',
            color: '#8E8E8E',
            marginLeft: '10px',
            flex: 1,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: 0
          }}>
            Поиск по Kaspi.kz
          </span>

          {/* Camera/scan icon: box 28.5 x 22, right edge 12 inside field */}
          <div style={{ width: '28.5px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CameraSparkleIcon size={25} color="#555555" />
          </div>
        </div>

        {/* 15.5 right of the field: Cart icon 26 x 25 */}
        <div
          onClick={() => onOpenService('cart')}
          className="touchable"
          style={{
            marginLeft: '15.5px',
            width: '26px',
            height: '25px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <TopBarCartIcon color="#9E9E9E" />
          {/* Badge: 15.5 circle accentRed, number 11 Semibold white, top-right */}
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: '15.5px',
            height: '15.5px',
            borderRadius: '50%',
            backgroundColor: '#F14635',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '15.5px',
            boxSizing: 'border-box',
            pointerEvents: 'none'
          }}>
            3
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. PROMO BANNER
          8 pt below search field.
          Box: x 17, width = screen - 33 (381), height 117.5. Aspect ratio 3.23 : 1, radius 10.
          ONE supplied image, object-fit: cover, NO text/chips on top in code.
          Page dots: 4 pt dots, 6 pt apart, centred horizontally, 6 pt above banner bottom; active white, others white 50 %.
      ===================================================================== */}
      <div style={{
        marginTop: '8px',
        paddingLeft: '17px',
        paddingRight: '16px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          height: '117.5px',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
          userSelect: 'none',
          boxSizing: 'border-box'
        }}>
          {/* Scrollable track */}
          <div
            ref={bannerScrollRef}
            onScroll={handleBannerScroll}
            onMouseDown={handleBannerMouseDown}
            className="hide-scrollbar"
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              overflowX: 'auto',
              scrollSnapType: isDraggingBanner ? 'none' : 'x mandatory',
              scrollBehavior: isDraggingBanner ? 'auto' : 'smooth',
              cursor: isDraggingBanner ? 'grabbing' : 'grab',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
          >
            {topBanners.map((banner) => (
              <div
                key={banner.id}
                style={{
                  flex: '0 0 100%',
                  width: '100%',
                  height: '100%',
                  minWidth: '100%',
                  scrollSnapAlign: 'start',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={banner.src}
                  alt={banner.alt}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Page dots: 4 pt dots, 6 pt apart, centred horizontally, 6 pt above bottom; active white, others white 50 % */}
          <div style={{
            position: 'absolute',
            bottom: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 2,
            pointerEvents: 'none'
          }}>
            {topBanners.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: activeBannerIndex === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                  transition: 'background-color 0.2s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. SHORTCUT GRID (2 rows x 4)
          4 equal columns, centres at 62.5 / 159.5 / 256.5 / 353.5 on 414. Row pitch 78.5.
          First icon row top 17 below banner.
          Icon box 34 x 34. Colour accentRed #F14635. Magnum tile 34 x 34, radius 8.
          Label: 16 pt Regular textPrimary #000, centred under icon, label top 8 below icon.
          Hairline divider (full width, 0.5, divider #E8E8E8) 14 below second row labels.
      ===================================================================== */}
      <div style={{
        marginTop: '17px',
        paddingLeft: '14px',
        paddingRight: '12px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          rowGap: '16.5px', // 34px icon + 8px gap + ~20px label = 62px cell. 62px + 16.5px = 78.5px row pitch!
          width: '100%'
        }}>
          {/* Row 1 */}
          {/* 1. Магазин */}
          <div
            onClick={() => onOpenService('shop')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconShop size={34} color="#F14635" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '400', color: '#000000', marginTop: '8px', lineHeight: '20px', letterSpacing: 0 }}>
              Магазин
            </span>
          </div>

          {/* 2. Мой Банк */}
          <div
            onClick={onOpenMyBank}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconMyBank size={34} color="#F14635" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '400', color: '#000000', marginTop: '8px', lineHeight: '20px', letterSpacing: 0 }}>
              Мой Банк
            </span>
          </div>

          {/* 3. Платежи */}
          <div
            onClick={() => onOpenService('payments')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconPayments size={34} color="#F14635" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '400', color: '#000000', marginTop: '8px', lineHeight: '20px', letterSpacing: 0 }}>
              Платежи
            </span>
          </div>

          {/* 4. Переводы */}
          <div
            onClick={onOpenTransfers}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconTransfers size={34} color="#F14635" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '400', color: '#000000', marginTop: '8px', lineHeight: '20px', letterSpacing: 0 }}>
              Переводы
            </span>
          </div>

          {/* Row 2 */}
          {/* 5. Magnum */}
          <div
            onClick={() => onOpenService('magnum')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconMagnum size={34} />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '400', color: '#000000', marginTop: '8px', lineHeight: '20px', letterSpacing: 0 }}>
              Magnum
            </span>
          </div>

          {/* 6. Travel */}
          <div
            onClick={() => onOpenService('travel')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconTravel size={34} color="#F14635" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '400', color: '#000000', marginTop: '8px', lineHeight: '20px', letterSpacing: 0 }}>
              Travel
            </span>
          </div>

          {/* 7. Госуслуги */}
          <div
            onClick={onOpenGov}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconGov size={34} color="#F14635" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '400', color: '#000000', marginTop: '8px', lineHeight: '20px', letterSpacing: 0 }}>
              Госуслуги
            </span>
          </div>

          {/* 8. Работа */}
          <div
            onClick={() => onOpenService('jobs')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconJobs size={34} color="#F14635" />
            </div>
            <span style={{ fontSize: '16px', fontWeight: '400', color: '#000000', marginTop: '8px', lineHeight: '20px', letterSpacing: 0 }}>
              Работа
            </span>
          </div>
        </div>
      </div>

      {/* Hairline divider (full width, 0.5, #E8E8E8) 14 below second row labels */}
      <div style={{
        marginTop: '14px',
        height: '0.5px',
        backgroundColor: '#E8E8E8',
        width: '100%'
      }} />

      {/* =====================================================================
          4. DEPOSIT ROWS
      ===================================================================== */}
      <div style={{
        marginTop: '23px',
        paddingLeft: '17px',
        paddingRight: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '9px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Row 1: Накопительный Депозит 18% */}
        <div className="touchable" style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
          {/* Yellow card with exact proportional 3 stacked coins SVG */}
          <div style={{
            width: '53px',
            height: '41px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg viewBox="26 20 243 188" width="53" height="41">
              {/* Yellow card */}
              <rect x="26" y="20" width="243" height="188" rx="26" fill="#FFD302" />
              {/* Stack of three coins - exact ratio matching reference screenshot */}
              <g transform="translate(148, 115) scale(1.10) translate(-148, -115)" fill="none" stroke="#FFFFFF" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round">
                {/* top coin face */}
                <ellipse cx="148" cy="91.75" rx="43" ry="22.75" />
                {/* sides, pinched in between the coins */}
                <path d="M105 92Q110.5 103.5 106 115Q110.5 127 105 139" />
                <path d="M191 92Q188 103.5 190.5 115Q188 127 191 139" />
                {/* lower rims of the second and third coins */}
                <path d="M106 115a42 22.5 0 0 0 84 0" />
                <path d="M105 139a43 22.5 0 0 0 86 0" />
              </g>
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: '400', color: '#1F1F1F', lineHeight: '20px' }}>
              Накопительный
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1px' }}>
              <span style={{ fontSize: '15px', fontWeight: '400', color: '#1F1F1F', lineHeight: '20px' }}>
                Депозит
              </span>
              {/* 18% pill: exact compact dimensions from reference screenshot */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFD302',
                borderRadius: '9px',
                height: '17px',
                padding: '0 6px',
                marginLeft: '6px'
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#000000',
                  lineHeight: 1
                }}>
                  18%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Kaspi Депозит 15% */}
        <div className="touchable" style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
          {/* Yellow card with exact proportional ₸$ SVG */}
          <div style={{
            width: '53px',
            height: '41px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg viewBox="17 15 243 189" width="53" height="41">
              {/* Yellow card */}
              <rect x="17" y="15" width="243" height="189" rx="24" fill="#FFD302" />
              {/* Tenge sign & Dollar sign - exact ratio matching reference screenshot */}
              <g transform="translate(138, 109) scale(1.05) translate(-138, -109)">
                <g fill="#FFFFFF">
                  <rect x="76" y="74" width="63" height="9.5" />
                  <rect x="76" y="91.5" width="63" height="9.5" />
                  <rect x="101" y="96" width="11" height="51" />
                </g>
                <g fill="none" stroke="#FFFFFF" strokeLinecap="butt" strokeLinejoin="miter">
                  <path d="M197.5 99C197.5 89.5 190 84 180.5 84C169 84 160.5 88.5 160.5 97C160.5 106 170 109.5 180.5 113C191 116.5 198.5 120 198.5 128.5C198.5 137.5 190 142 180 142C169 142 159 137.5 159 125" strokeWidth="10" />
                  <path d="M180.5 68v14M180 144v9" strokeWidth="9" />
                </g>
              </g>
            </svg>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: '400', color: '#1F1F1F', lineHeight: '20px' }}>
              Kaspi Депозит 15%
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          5. "ВЫ НЕДАВНО СМОТРЕЛИ" CAROUSEL
      ===================================================================== */}
      <div style={{
        marginTop: '22px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Section Title */}
        <div style={{
          paddingLeft: '16px',
          paddingRight: '16px',
          fontSize: '18px',
          fontWeight: '700',
          color: '#1E1E1E',
          lineHeight: '22px',
          marginBottom: '10px'
        }}>
          Вы недавно смотрели
        </div>

        {/* Horizontal Carousel */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingLeft: '16px',
          paddingRight: '16px',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
          alignItems: 'flex-start'
        }}>
          {viewedProducts.map((item) => (
            <div
              key={item.id}
              className="touchable"
              style={{
                flexShrink: 0,
                width: '102px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                cursor: 'pointer'
              }}
            >
              {/* Image box: 102 x 102, radius 10, 1px border #ECECEC, white fill, objectFit cover */}
              <div style={{
                width: '102px',
                height: '102px',
                minWidth: '102px',
                minHeight: '102px',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #ECECEC',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}>
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

                {/* Chips at bottom-left corner */}
                <div style={{
                  position: 'absolute',
                  left: '0px',
                  bottom: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  zIndex: 2
                }}>
                  {(item.discountChip || item.bonusChip) && (
                    <div style={{
                      height: '16px',
                      padding: '0 5px',
                      borderTopLeftRadius: '3px',
                      borderTopRightRadius: '4px',
                      borderBottomRightRadius: '4px',
                      borderBottomLeftRadius: '9px',
                      backgroundColor: item.discountChip ? '#F14635' : '#54A000',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.bonusChip ? (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}>
                          {item.hasFlame && (
                            <KaspiYellowFlame size={10} style={{ marginRight: '1px' }} />
                          )}
                          <span style={{
                            fontSize: '9.5px',
                            fontWeight: '700',
                            color: '#FFFFFF',
                            lineHeight: '16px',
                            letterSpacing: '-0.2px',
                            display: 'inline-flex',
                            alignItems: 'baseline',
                            gap: '2px'
                          }}>
                            <span>{item.bonusChip.replace(/\s*[БB]$/i, '').trim()}</span>
                            <KaspiBonusSymbol height={7} color="#FFFFFF" />
                          </span>
                        </div>
                      ) : (
                        <span style={{
                          fontSize: '9.5px',
                          fontWeight: '700',
                          color: '#FFFFFF',
                          lineHeight: '16px',
                          letterSpacing: '-0.2px'
                        }}>
                          {item.discountChip}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Price row */}
              <div style={{
                marginTop: '4px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%'
              }}>
                <span style={{
                  fontSize: '14.5px',
                  fontWeight: '700',
                  color: item.oldPrice ? '#F14635' : '#000000',
                  lineHeight: '17px',
                  flexShrink: 0
                }}>
                  {item.price}
                </span>
                {item.oldPrice && (
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: '400',
                    color: '#757575',
                    textDecoration: 'line-through',
                    lineHeight: '13px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}>
                    {item.oldPrice}
                  </span>
                )}
              </div>

              {/* Bonus box */}
              {item.bonusBox && (
                <div style={{
                  marginTop: '3px',
                  height: '28px',
                  width: '100%',
                  padding: '2px 5px',
                  borderRadius: '5px',
                  backgroundColor: '#E6F8D0',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    fontSize: '11.5px',
                    fontWeight: '700',
                    color: '#54A000',
                    lineHeight: '13px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}>
                    {item.bonusBox.price}
                  </div>
                  <div style={{
                    fontSize: '9px',
                    fontWeight: '400',
                    color: '#1F1F1F',
                    lineHeight: '11px',
                    marginTop: '1px',
                    letterSpacing: '-0.25px',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.bonusBox.caption}
                  </div>
                </div>
              )}

              {/* Product name */}
              <div style={{
                marginTop: '3px',
                fontSize: '11.5px',
                fontWeight: '400',
                color: '#1F1F1F',
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '14px'
              }}>
                {item.title}
              </div>

              {/* Rating row */}
              <div style={{
                marginTop: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#1F1F1F',
                  lineHeight: '13px'
                }}>
                  {item.rating}
                </span>
                <KaspiRatingStar size={10} color="#F14635" />
                <span style={{
                  fontSize: '10.5px',
                  fontWeight: '400',
                  color: '#757575',
                  lineHeight: '13px'
                }}>
                  {item.reviews}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hairline divider 0.5 under the carousel, #E8E8E8 */}
      <div style={{
        marginTop: '16px',
        height: '0.5px',
        backgroundColor: '#E8E8E8',
        width: '100%'
      }} />

      {/* =====================================================================
          6. FILTER PILLS (part of scroll content below divider, not pinned to bottom)
          Followed by the two-column product feed.
      ===================================================================== */}
      <div style={{
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {[
          { key: 'recommendations', label: 'Рекомендации', icon: null },
          { key: 'discounts', label: 'Скидки', icon: KaspiDiscountBadgeIcon },
          { key: 'bonuses', label: 'Бонусы', icon: KaspiFlameIcon }
        ].map((tab) => {
          const isActive = activeFilterTab === tab.key;
          const IconComp = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilterTab(tab.key)}
              className="touchable"
              style={{
                flex: 1,
                minWidth: 0,
                height: '36px',
                padding: '0 4px',
                borderRadius: '18px',
                border: '1.5px solid #F14635',
                backgroundColor: isActive ? '#F14635' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#F14635',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
                letterSpacing: 0
              }}
            >
              {IconComp && (
                <IconComp
                  size={16}
                  width={16}
                  height={16}
                  isActive={isActive}
                />
              )}
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Two-Column Store Feed */}
      <div style={{ padding: '0 4px 20px 4px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          columnGap: '4px',
          rowGap: '16px'
        }}>
          {filteredFeed.map((item) => {
            const isFav = !!favorites[item.id];
            return (
              <div
                key={item.id}
                className="touchable"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Image Tile */}
                <div style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: '8px',
                  border: '1px solid #F2F2F2',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '8px',
                      boxSizing: 'border-box'
                    }}
                  />

                  {/* Favorite button */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(item.id, e)}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
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
                    <KaspiHeartIcon size={24} isFavorite={isFav} />
                  </button>

                  {/* Badge */}
                  {(item.discountBadge || item.bonusBadge) && (
                    <div style={{
                      position: 'absolute',
                      left: '0px',
                      bottom: '0px',
                      height: '22px',
                      padding: '0 6px',
                      width: 'fit-content',
                      boxSizing: 'border-box',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      backgroundColor: item.discountBadge ? '#F14635' : '#54A000',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: '700',
                      borderRadius: '0 8px 0 8px',
                      zIndex: 1,
                      lineHeight: '22px'
                    }}>
                      {item.discountBadge ? (
                        item.discountBadge
                      ) : (
                        <>
                          {item.hasFlame && (
                            <KaspiYellowFlame size={13} style={{ marginRight: '1px' }} />
                          )}
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'baseline',
                            gap: '3px'
                          }}>
                            <span>{item.bonusBadge.replace(/\s*[БB]$/i, '').trim()}</span>
                            <KaspiBonusSymbol height={9.5} color="#FFFFFF" />
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Text Block */}
                <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column' }}>
                  {/* Price */}
                  <div style={{
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '6px',
                    lineHeight: '23px'
                  }}>
                    <span style={{
                      fontSize: '19px',
                      fontWeight: '700',
                      color: '#1E1E1E',
                      lineHeight: '23px'
                    }}>
                      {item.price}
                    </span>
                    {item.oldPrice && (
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '400',
                        color: '#8E8E8E',
                        textDecoration: 'line-through',
                        lineHeight: '23px'
                      }}>
                        {item.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div style={{
                    marginTop: '6px',
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#000000',
                    lineHeight: '18px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.title}
                  </div>

                  {/* Rating */}
                  {item.rating && (
                    <div style={{
                      marginTop: '4px',
                      height: '17px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E1E1E', lineHeight: '17px' }}>
                        {item.rating}
                      </span>
                      <KaspiRatingStar size={12} color="#F14635" />
                      <span style={{ fontSize: '13px', fontWeight: '400', color: '#8E8E8E', lineHeight: '17px' }}>
                        ({item.reviews})
                      </span>
                    </div>
                  )}

                  {/* Installment */}
                  {item.installmentPrice && (
                    <div style={{
                      marginTop: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <div style={{
                        height: '24px',
                        borderRadius: '6px',
                        backgroundColor: '#FFD302',
                        padding: '0 6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14.5px',
                        fontWeight: '700',
                        color: '#1E1E1E',
                        lineHeight: '24px',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.installmentPrice}
                      </div>
                      {item.installmentTerm && (
                        <span style={{
                          fontSize: '14.5px',
                          fontWeight: '400',
                          color: '#8E8E8E',
                          lineHeight: '24px'
                        }}>
                          {item.installmentTerm}
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
