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

// Filled vector star icon (SF Symbol "star.fill" / Material "star"), 13 pt, color #F14635
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
      alt: 'Куда же без рюкзака? 🔥 Бонусы'
    },
    {
      id: 2,
      src: '/kaspi_assets/banners/banner_home_appliances.png',
      alt: 'Для важных дел по дому. Скидки до 20%'
    },
    {
      id: 3,
      src: '/kaspi_assets/banners/banner_wardrobe_basics.png',
      alt: 'База гардероба. 🔥 Бонусы'
    },
    {
      id: 4,
      src: '/kaspi_assets/banners/banner_basic_jeans.png',
      alt: 'Базовые джинсы. 🔥 Бонусы'
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

  // Auto-advance banner every 4.5 seconds (pauses when dragging)
  useEffect(() => {
    if (isDraggingBanner) return;
    const timer = setInterval(() => {
      if (!bannerScrollRef.current) return;
      const nextIdx = (activeBannerIndex + 1) % topBanners.length;
      scrollToBanner(nextIdx);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeBannerIndex, isDraggingBanner]);

  // Desktop mouse drag handlers with global listeners
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

  // Products for the 2-column feed matching exact reference specification
  const allFeedProducts = [
    {
      id: 'prod_castom',
      title: 'Castom GS-D16 16" / 32 ГБ / SSD 1000 ГБ / Win 11 / D16',
      price: '519 900 ₸',
      bonusBadge: '15 597 Б',
      bonusDiscountPrice: '504 303 ₸',
      installmentPrice: '30 999 ₸',
      installmentTerm: 'x24',
      rating: '4.9',
      reviews: '113',
      dotsCount: 6,
      activeDot: 0,
      image: '/kaspi_assets/products/laptop_industria.jpg',
      tagType: 'bonuses'
    },
    {
      id: 'prod_macbook',
      title: 'Apple MacBook Neo 13 2026 13" / 8 ГБ / SSD 512 ГБ /...',
      price: '488 000 ₸',
      bonusBadge: '14 640 Б',
      bonusDiscountPrice: '473 360 ₸',
      installmentPrice: '29 097 ₸',
      installmentTerm: 'x24',
      rating: '5.0',
      reviews: '55',
      dotsCount: 3,
      activeDot: 0,
      image: '/kaspi_assets/products/laptop_lenovo_white.jpg',
      tagType: 'bonuses'
    },
    {
      id: 'prod_socket',
      title: 'Умная розетка Wi-Fi 16A с разъемами Type-C и USB белый',
      price: '3 600 ₸',
      isAd: true,
      installmentPrice: '300 ₸',
      installmentTerm: 'x12',
      rating: '4.8',
      reviews: '42',
      dotsCount: 5,
      activeDot: 0,
      image: '/kaspi_assets/products/charger_pd20.jpg',
      tagType: 'recommendations'
    },
    {
      id: 'prod_cable',
      title: 'Кабель YARIUM Type-C - Type-C 1 м белый быстрая зарядка',
      price: '2 059 ₸',
      isAd: true,
      bonusBadge: '308 Б',
      hasFlame: true,
      installmentPrice: '172 ₸',
      installmentTerm: 'x12',
      rating: '4.9',
      reviews: '128',
      dotsCount: 6,
      activeDot: 0,
      image: '/kaspi_assets/products/spray_kudo.png',
      tagType: 'bonuses'
    },
    {
      id: 'prod_iphone16',
      title: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
      price: '799 990 ₸',
      oldPrice: '889 990 ₸',
      discountBadge: '-10%',
      installmentPrice: '33 333 ₸',
      installmentTerm: 'x24',
      rating: '5.0',
      reviews: '142',
      dotsCount: 5,
      activeDot: 0,
      image: '/kaspi_assets/products/iphone16.jpg',
      tagType: 'discounts'
    },
    {
      id: 'prod_leadbros',
      title: 'Холодильник Leadbros 400 л No Frost серый',
      price: '279 990 ₸',
      bonusBadge: '20 399 Б',
      bonusDiscountPrice: '259 591 ₸',
      installmentPrice: '11 666 ₸',
      installmentTerm: 'x24',
      rating: '5.0',
      reviews: '18',
      dotsCount: 4,
      activeDot: 0,
      image: '/kaspi_assets/products/leadbros_fridge.jpg',
      tagType: 'bonuses'
    },
    {
      id: 'prod_dyson',
      title: 'Стайлер Dyson Airwrap Multi-Styler Complete Long Copper',
      price: '319 990 ₸',
      bonusBadge: '15 999 Б',
      bonusDiscountPrice: '303 991 ₸',
      installmentPrice: '13 333 ₸',
      installmentTerm: 'x24',
      rating: '4.9',
      reviews: '88',
      dotsCount: 4,
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
      id: 'prod_lenovo',
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

  // "Вы недавно смотрели" - 102 pt cards matching exact specifications
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
      paddingBottom: '90px',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* 1. Official Header / Search Bar */}
      <div style={{
        padding: '10px 16px 8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#FFFFFF'
      }}>
        {/* Search Input Box */}
        <div
          onClick={onOpenSearch}
          className="touchable"
          style={{
            flex: 1,
            height: '40px',
            backgroundColor: '#F2F2F4',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <Search size={18} color="#757575" strokeWidth={2.2} />
          <span style={{
            fontSize: '14.5px',
            color: '#757575',
            fontWeight: '400',
            flex: 1,
            userSelect: 'none'
          }}>
            Поиск по Kaspi.kz
          </span>
          <CameraSparkleIcon size={26.5} color="#555555" />
        </div>

        {/* Cart Icon with red badge */}
        <div
          onClick={() => onOpenService('cart')}
          className="touchable"
          style={{
            position: 'relative',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <TopBarCartIcon />
          <div style={{
            position: 'absolute',
            top: '1px',
            right: '0px',
            backgroundColor: '#EB3B2C',
            color: '#FFFFFF',
            borderRadius: '50%',
            width: '14px',
            height: '14px',
            fontSize: '9.5px',
            fontWeight: '500',
            fontFamily: '-apple-system, "SF Pro Text", Roboto, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1
          }}>
            3
          </div>
        </div>
      </div>

      {/* 2. Top Banner Carousel (4 authentic 1024x341 banners with smooth scroll & indicators) */}
      <div style={{ padding: '2px 16px 10px 16px', width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            userSelect: 'none',
            position: 'relative'
          }}
        >
          {/* Scrollable track with native CSS scroll-snap */}
          <div
            ref={bannerScrollRef}
            onScroll={handleBannerScroll}
            onMouseDown={handleBannerMouseDown}
            className="hide-scrollbar"
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: isDraggingBanner ? 'none' : 'x mandatory',
              scrollBehavior: isDraggingBanner ? 'auto' : 'smooth',
              cursor: isDraggingBanner ? 'grabbing' : 'grab',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
              width: '100%',
              minWidth: 0
            }}
          >
            {topBanners.map((banner) => (
              <div
                key={banner.id}
                style={{
                  flex: '0 0 100%',
                  width: '100%',
                  minWidth: '100%',
                  maxWidth: '100%',
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
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Authentic Kaspi 4 indicator dots centered horizontally at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 2,
              pointerEvents: 'auto'
            }}
          >
            {topBanners.map((_, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToBanner(idx);
                }}
                style={{
                  width: activeBannerIndex === idx ? '6px' : '5px',
                  height: activeBannerIndex === idx ? '6px' : '5px',
                  borderRadius: '50%',
                  backgroundColor: activeBannerIndex === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
                  boxShadow: activeBannerIndex === idx ? '0 1px 3px rgba(0,0,0,0.45)' : '0 1px 2px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. 8 Main Services Grid (Exact 36x36 size, responsive spacing, bolder font) */}
      <div style={{
        padding: '6px 18px 14px 18px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          rowGap: '16px',
          columnGap: '8px'
        }}>
          {/* Row 1 */}
          {/* 1. Магазин */}
          <div
            onClick={() => onOpenService('shop')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconShop size={35.5} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', marginTop: '5px', letterSpacing: '-0.2px' }}>
              Магазин
            </span>
          </div>

          {/* 2. Мой Банк */}
          <div
            onClick={onOpenMyBank}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconMyBank size={36} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', marginTop: '5px', letterSpacing: '-0.2px' }}>
              Мой Банк
            </span>
          </div>

          {/* 3. Платежи */}
          <div
            onClick={() => onOpenService('payments')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconPayments size={35} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', marginTop: '5px', letterSpacing: '-0.2px' }}>
              Платежи
            </span>
          </div>

          {/* 4. Переводы */}
          <div
            onClick={onOpenTransfers}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconTransfers size={34} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', marginTop: '5px', letterSpacing: '-0.2px' }}>
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
            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconMagnum size={36} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', marginTop: '5px', letterSpacing: '-0.2px' }}>
              Magnum
            </span>
          </div>

          {/* 6. Travel */}
          <div
            onClick={() => onOpenService('travel')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconTravel size={36} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', marginTop: '5px', letterSpacing: '-0.2px' }}>
              Travel
            </span>
          </div>

          {/* 7. Госуслуги */}
          <div
            onClick={onOpenGov}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconGov size={36} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', marginTop: '5px', letterSpacing: '-0.2px' }}>
              Госуслуги
            </span>
          </div>

          {/* 8. Работа (Briefcase with magnifying glass) */}
          <div
            onClick={() => onOpenService('jobs')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconJobs size={34.5} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#1A1A1A', marginTop: '5px', letterSpacing: '-0.2px' }}>
              Работа
            </span>
          </div>
        </div>
      </div>

      {/* Full-width thin line divider spanning edge-to-edge without cut */}
      <div style={{ height: '1px', backgroundColor: '#ECECED', width: '100%' }} />

      {/* 4. Deposits Section (Exact 1:1 size, proportions, and colors from real Kaspi app) */}
      <div style={{
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {/* Row 1: Накопительный Депозит 19% */}
        <div className="touchable" style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
          {/* Yellow rounded card with 3 stacked coins from coins-card-yellow.svg (53px × 41px) */}
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
              {/* Stack of three coins */}
              <g fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '1px' }}>
              <span style={{ fontSize: '15px', fontWeight: '400', color: '#1F1F1F', lineHeight: '20px' }}>
                Депозит
              </span>
              <span style={{
                backgroundColor: '#FFD302',
                color: '#1F1F1F',
                fontSize: '11px',
                fontWeight: '700',
                padding: '1px 6.5px',
                borderRadius: '9px',
                lineHeight: '14px',
                letterSpacing: '0.2px'
              }}>
                19%
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Kaspi Депозит 15% */}
        <div className="touchable" style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
          {/* Yellow rounded card with ₸$ from currency-card-yellow.svg (53px × 41px) */}
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
              {/* Tenge sign: square-cut bars and stem */}
              <g fill="#FFFFFF">
                <rect x="76" y="74" width="63" height="9.5" />
                <rect x="76" y="91.5" width="63" height="9.5" />
                <rect x="101" y="96" width="11" height="51" />
              </g>
              {/* Dollar sign: square-cut ends */}
              <g fill="none" stroke="#FFFFFF" strokeLinecap="butt" strokeLinejoin="miter">
                <path d="M197.5 99C197.5 89.5 190 84 180.5 84C169 84 160.5 88.5 160.5 97C160.5 106 170 109.5 180.5 113C191 116.5 198.5 120 198.5 128.5C198.5 137.5 190 142 180 142C169 142 159 137.5 159 125" strokeWidth="12" />
                <path d="M180.5 68v14M180 144v9" strokeWidth="9.5" />
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

      {/* 5. "Вы недавно смотрели" - no divider above it, brought slightly closer to yellow cards */}
      <div style={{
        padding: '6px 0 16px 0',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        fontFamily: '-apple-system, "SF Pro Text", Inter, sans-serif'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#1E1E1E',
          marginBottom: '12px',
          paddingLeft: '16px',
          paddingRight: '16px'
        }}>
          Вы недавно смотрели
        </div>

        {/* Horizontal Carousel of Viewed Products */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingLeft: '16px',
          paddingRight: '16px',
          scrollbarWidth: 'none',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
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
                cursor: 'pointer',
                fontFamily: '-apple-system, "SF Pro Text", Inter, sans-serif'
              }}
            >
              {/* Image Box: 102 x 102 pt, corner radius 10 pt, white fill, 1px solid #ECECEC border, aspect fit, centered */}
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

                {/* Chips at bottom-left corner (rounded with card shape) */}
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

              {/* Price row: 4 pt from image */}
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

              {/* Bonus box: 3 pt from price, height 28 pt, full width, fill #E6F8D0, radius 5 pt, padding 2px 5px */}
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

              {/* Name: 3 pt from bonus box (or price), 11.5 pt Regular, #1F1F1F, 1 line ellipsis */}
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

              {/* Rating row: 2 pt from name */}
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

      {/* Full-width thin line divider spanning edge-to-edge without cut */}
      <div style={{ height: '1px', backgroundColor: '#ECECED', width: '100%' }} />

      {/* 6. Filter Chips Row: 3 equal-size buttons with bold outline, equal side margins */}
      <div style={{
        padding: '16px 16px 16px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        maxWidth: '100%',
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
                border: '2px solid #F14635',
                backgroundColor: isActive ? '#F14635' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#F14635',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '-0.2px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease'
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

      {/* 7. Two-Column Store Feed: 4px side padding, 4px column gap, 16px row gap */}
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
                aria-label={`${item.title}, ${item.price} tenge${item.bonusBadge ? `, bonus ${item.bonusBadge}` : ''}${item.rating ? `, rating ${item.rating}` : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* 3.1 ImageTile: square 1:1, radius 8, border 1 #F2F2F2, contain with 8px padding */}
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

                  {/* 3.2 Favorite (heart) button: top 12, right 12 to icon, 44x44 tap area, no background/circle/blur */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(item.id, e)}
                    aria-label={isFav ? "Удалить из избранного" : "Добавить в избранное"}
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
                    <KaspiHeartIcon
                      size={24}
                      isFavorite={isFav}
                    />
                  </button>

                  {/* 3.3 Bonus / discount badge: anchored bottom-left (flush 0, 0), height 22, radius 0 8px 0 8px */}
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

                {/* 3.4 Dots (photo carousel indicator): 4x4 circles, gap 4, max 6 dots */}
                {item.dotsCount && item.dotsCount > 1 && (
                  <div style={{
                    marginTop: '8px',
                    height: '4px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {Array.from({ length: Math.min(item.dotsCount, 6) }).map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: idx === (item.activeDot || 0) ? '#1E1E1E' : '#D0D0D0'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Text Block: horizontal inset 8 from column's edges */}
                <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column' }}>
                  {/* 3.5 AdLabel: only for sponsored items, 13pt Regular textSecondary, margin top 6 */}
                  {item.isAd && (
                    <div style={{
                      marginTop: '6px',
                      fontSize: '13px',
                      fontWeight: '400',
                      color: '#9A9A9A',
                      lineHeight: '16px'
                    }}>
                      Реклама
                    </div>
                  )}

                  {/* 3.6 PriceRow: margin top 8 (from dots) or 12 (from tile), 19pt Bold textPrimary, old price strikethrough 13pt Regular */}
                  <div style={{
                    marginTop: (item.isAd || (item.dotsCount && item.dotsCount > 1)) ? '6px' : '12px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '6px',
                    lineHeight: '23px'
                  }}>
                    <span style={{
                      fontSize: '19px',
                      fontWeight: '700',
                      color: '#1E1E1E',
                      lineHeight: '23px',
                      letterSpacing: '-0.3px'
                    }}>
                      {item.price}
                    </span>
                    {item.oldPrice && (
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '400',
                        color: '#9A9A9A',
                        textDecoration: 'line-through',
                        lineHeight: '23px'
                      }}>
                        {item.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* 3.7 BonusBox: margin top 6, height 22, bg bonusBg #E6F7CC, radius 8, single line */}
                  {item.bonusDiscountPrice && (
                    <div style={{
                      marginTop: '6px',
                      height: '22px',
                      width: '100%',
                      backgroundColor: '#E6F7CC',
                      borderRadius: '8px',
                      padding: '0 6px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden'
                    }}>
                      <span style={{
                        fontSize: '12.5px',
                        fontWeight: '700',
                        color: '#54A000',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.bonusDiscountPrice}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '400',
                        color: '#333333',
                        whiteSpace: 'nowrap',
                        marginLeft: '4px'
                      }}>
                        с учетом Бонусов
                      </span>
                    </div>
                  )}

                  {/* 3.8 Title: margin top 8, 14.5pt Regular textPrimary, line height 17, max 2 lines, tail ellipsis */}
                  <div style={{
                    marginTop: '8px',
                    fontSize: '14.5px',
                    fontWeight: '400',
                    color: '#1E1E1E',
                    lineHeight: '17px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.title}
                  </div>

                  {/* 3.9 RatingRow: margin top 6, height 17, 13pt Semibold textPrimary, star 12x12 accentRed, (reviews) 13pt Regular textSecondary */}
                  {item.rating && (
                    <div style={{
                      marginTop: '6px',
                      height: '17px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E1E1E', lineHeight: '17px' }}>
                        {item.rating}
                      </span>
                      <KaspiRatingStar size={12} color="#F14635" />
                      <span style={{ fontSize: '13px', fontWeight: '400', color: '#9A9A9A', lineHeight: '17px' }}>
                        ({item.reviews})
                      </span>
                    </div>
                  )}

                  {/* 3.10 InstallmentRow: ALWAYS the last element of the card, margin top 6, yellow chip + outside x24 */}
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
                          color: '#9A9A9A',
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
