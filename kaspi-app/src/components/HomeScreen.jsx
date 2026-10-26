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
      paddingTop: 0,
      paddingBottom: 'calc(53.5px + env(safe-area-inset-bottom, 34px) + 20px)',
      overflowX: 'hidden',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, Roboto, sans-serif',
      letterSpacing: 0
    }}>
      {/* =====================================================================
          1. HEADER (search + cart) — STICKY WITH SCROLL
          Search field top: 51.5 (item 1). Height: 42.5 (item 2).
          Search field right edge: x 350, left edge: 17.5, width: 332.5 on 414 (item 3).
          Magnifier: 19 x 19 at x 30.5 (left edge 13 inside field) (item 4).
          Placeholder "Поиск по Kaspi.kz": 17 Regular, starts x 60.5 (item 5).
          Camera icon: 24 x 20, right edge 13 inside field (item 6).
          Cart icon: 29.5 x 25, centred vertically on search field (item 7).
          Cart badge: 15 x 15 circle, 11 Semibold (item 8).
      ===================================================================== */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 45,
        backgroundColor: '#FFFFFF',
        paddingTop: '3.5px',
        paddingBottom: '0px',
        paddingLeft: '17.5px',
        paddingRight: '20px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Search Field: height 42.5, width = screen - 81.5 (332.5 on 414) */}
        <div
          onClick={onOpenSearch}
          className="touchable"
          style={{
            flex: 1,
            height: '42.5px',
            backgroundColor: '#F2F2F2',
            borderRadius: '10px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '13px',
            paddingRight: '13px',
            cursor: 'pointer',
            boxSizing: 'border-box'
          }}
        >
          {/* Magnifier 19 x 19 at x 30.5 (left edge 13 inside field) */}
          <Search size={19} color="#8E8E8E" strokeWidth={2.2} style={{ flexShrink: 0 }} />

          {/* Placeholder: 17 Regular, starts x 60.5 (11 after magnifier) */}
          <span style={{
            fontSize: '17px',
            fontWeight: '400',
            color: '#8E8E8E',
            marginLeft: '11px',
            flex: 1,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: 0,
            lineHeight: '22px'
          }}>
            Поиск по Kaspi.kz
          </span>

          {/* Camera icon box: 24 x 20, right edge 13 inside field */}
          <div style={{
            width: '24px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <CameraSparkleIcon width={24} height={20} color="#555555" />
          </div>
        </div>

        {/* Cart icon box: 29.5 x 25, centred vertically on search field, starts x 364.5 */}
        <div
          onClick={() => onOpenService('cart')}
          className="touchable"
          style={{
            marginLeft: '14.5px',
            width: '29.5px',
            height: '25px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <TopBarCartIcon width={29.5} height={25} color="#9E9E9E" />
          {/* Cart badge: 15 x 15 circle, number 11 Semibold */}
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: '#F14635',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '15px',
            boxSizing: 'border-box',
            pointerEvents: 'none'
          }}>
            3
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. BANNER
          Keep 380 x 112 (item 9). Top 105 (gap 11 below search field at 94).
          Page indicator capsule: dots 4.5, centre-to-centre 8.75, bottom 4.5.
      ===================================================================== */}
      <div style={{
        marginTop: '11px',
        paddingLeft: '17px',
        paddingRight: '17px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          aspectRatio: '380 / 112',
          maxHeight: '112px',
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

          {/* Page indicator: capsule, dots 4.5, pitch 8.75, bottom 4.5 above banner bottom */}
          <div style={{
            position: 'absolute',
            bottom: '4.5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '39px',
            height: '7.5px',
            borderRadius: '3.75px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4.25px',
            zIndex: 2,
            pointerEvents: 'none'
          }}>
            {topBanners.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: '4.5px',
                  height: '4.5px',
                  borderRadius: '50%',
                  backgroundColor: activeBannerIndex === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                  transition: 'background-color 0.2s ease',
                  flexShrink: 0
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. SHORTCUT GRID (2 x 4)
          Gap from banner bottom to first icon row top: 20 (item 10; row 1 top y 237).
          Gap from icon bottom to label text top: 13.5 (item 11; label marginTop 7.5).
          Icon row pitch: 78.5 (item 12; row 2 top y 315.5; rowGap 18.5).
          Grid labels: font 15 Regular (item 13).
          Magnum tile: 34.5 x 35, radius 8 (item 14).
          Gap from row 2 labels to divider: 14 (item 15; divider y 388.5).
      ===================================================================== */}
      <div style={{
        marginTop: '20px',
        paddingLeft: '14px',
        paddingRight: '12px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          rowGap: '18.5px',
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '7.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '7.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
              <IconPayments size={30.5} color="#F14635" />
            </div>
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '7.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
              <IconTransfers size={30.5} color="#F14635" />
            </div>
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '7.5px', lineHeight: '18px', letterSpacing: 0 }}>
              Переводы
            </span>
          </div>

          {/* Row 2 */}
          {/* 5. Magnum: tile 34.5 x 35, radius 8 */}
          <div
            onClick={() => onOpenService('magnum')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '34.5px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconMagnum width={34.5} height={35} />
            </div>
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '6.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '7.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '7.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '7.5px', lineHeight: '18px', letterSpacing: 0 }}>
              Работа
            </span>
          </div>
        </div>
      </div>

      {/* Divider 1: full width, 0.5 pt, #EBEBEB, 14 below row 2 labels (y 388.5) (item 15) */}
      <div style={{
        marginTop: '14px',
        height: '0.5px',
        backgroundColor: '#EBEBEB',
        width: '100%',
        display: 'block',
        flexShrink: 0
      }} />

      {/* =====================================================================
          4. DEPOSIT ROWS
          Gap from divider to tile 1: 23.5 (item 16; tile 1 top y 412).
          Deposit tiles: 56.5 x 44, radius 6 (item 17).
          Gap between two tiles: 9.5 (row pitch 53.5) (item 18; tile 2 top y 465).
          Deposit text x: 95 (20 after tile) (item 19).
          Deposit text font: 18 Regular (item 20).
          Line 1 "Накопительный" text top: level with tile top (item 21).
          Pill: 39 x 22.5, radius 11.25, 5 after "Депозит", "18%" 15.5 Semibold (item 22).
      ===================================================================== */}
      <div style={{
        marginTop: '23.5px',
        paddingLeft: '18.5px',
        paddingRight: '18.5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '9.5px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Row 1: Накопительный Депозит 18% */}
        <div className="touchable" style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
          {/* Yellow tile: 56.5 x 44, radius 6, #FFD302 */}
          <div style={{
            width: '56.5px',
            height: '44px',
            borderRadius: '6px',
            backgroundColor: '#FFD302',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            <svg viewBox="26 20 243 188" width="56.5" height="44">
              <g transform="translate(148, 115) scale(1.10) translate(-148, -115)" fill="none" stroke="#FFFFFF" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="148" cy="91.75" rx="43" ry="22.75" />
                <path d="M105 92Q110.5 103.5 106 115Q110.5 127 105 139" />
                <path d="M191 92Q188 103.5 190.5 115Q188 127 191 139" />
                <path d="M106 115a42 22.5 0 0 0 84 0" />
                <path d="M105 139a43 22.5 0 0 0 86 0" />
              </g>
            </svg>
          </div>

          {/* Text: starts 20 after tile (x 95), line 1 text top level with tile top */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '20px',
            marginTop: '-2.5px'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '400',
              color: '#000000',
              lineHeight: '23px',
              letterSpacing: 0
            }}>
              Накопительный
            </div>
            <div style={{ display: 'flex', alignItems: 'center', lineHeight: '23px', marginTop: '1px' }}>
              <span style={{
                fontSize: '18px',
                fontWeight: '400',
                color: '#000000',
                lineHeight: '23px',
                letterSpacing: 0
              }}>
                Депозит
              </span>
              {/* Rate pill: 39 x 22.5, radius 11.25, 5 after "Депозит", "18%" 15.5 Semibold */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFD302',
                borderRadius: '11.25px',
                width: '39px',
                height: '22.5px',
                marginLeft: '5px',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: '15.5px',
                  fontWeight: '600',
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
        <div className="touchable" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {/* Yellow tile: 56.5 x 44, radius 6, #FFD302 */}
          <div style={{
            width: '56.5px',
            height: '44px',
            borderRadius: '6px',
            backgroundColor: '#FFD302',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            <svg viewBox="17 15 243 189" width="56.5" height="44">
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

          {/* Text — Row 2: 20 after tile (x 95), vertically centred on tile */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '20px',
            height: '44px'
          }}>
            <span style={{
              fontSize: '18px',
              fontWeight: '400',
              color: '#000000',
              lineHeight: '24px',
              letterSpacing: 0
            }}>
              Kaspi Депозит 15%
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          5. "ВЫ НЕДАВНО СМОТРЕЛИ" CAROUSEL
          Gap from tile 2 bottom to title text top: 26 (item 23; y 535).
          Section title: 18 Bold #000 (item 24; 189 wide).
          Gap from title text bottom to images: 14.5 (item 25; images y 566.5).
          Product image tile: 110 x 110, radius 10, 1 pt border #EFEFEF (item 26).
          Card pitch: 119.5 (gap 9.5), first card x 17.5 (item 27).
          Image chip: height 19.5, text 13 Bold, radius 6, pinned bottom-left 1 inside (item 28).
          Gap from image bottom to price text top: 7 (item 29; price y 684).
          Price: 15 Bold #000, old price 12 Regular #8E8E8E (item 30).
          Bonus box: 110 x 38, radius 8, top 21 below price text top (y 705 to 743) (item 31).
          Name: 13 Regular, text top 5 below box (y 748) (item 32).
          Rating: 13 Semibold/Regular, text top 19 below name text top (y 767) (item 32).
          Divider: 0.5 #EBEBEB at y 798, full width (item 33).
      ===================================================================== */}
      <div style={{
        marginTop: '26px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Section Title: 18 Bold #000, x 18.5 */}
        <div style={{
          paddingLeft: '18.5px',
          paddingRight: '18.5px',
          fontSize: '18px',
          fontWeight: '700',
          color: '#000000',
          lineHeight: '22px'
        }}>
          Вы недавно смотрели
        </div>

        {/* Horizontal Carousel: images start 14.5 below title text bottom (y 566.5) */}
        <div style={{
          marginTop: '14.5px',
          display: 'flex',
          gap: '9.5px',
          overflowX: 'auto',
          paddingLeft: '17.5px',
          paddingRight: '17.5px',
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
                width: '110px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                cursor: 'pointer'
              }}
            >
              {/* Image box: 110 x 110, radius 10, white fill, 1 px border #EFEFEF */}
              <div style={{
                width: '110px',
                height: '110px',
                minWidth: '110px',
                minHeight: '110px',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EFEFEF',
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

                {/* Image chip: height 19.5, radius 6, text 13 Bold white, pinned bottom-left, 1 pt inset */}
                {(item.discountChip || item.bonusChip) && (
                  <div style={{
                    position: 'absolute',
                    left: '1px',
                    bottom: '1px',
                    height: '19.5px',
                    borderRadius: '6px',
                    padding: '0 5px',
                    backgroundColor: item.discountChip ? '#F14635' : '#54A000',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
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
                          fontSize: '13px',
                          fontWeight: '700',
                          color: '#FFFFFF',
                          lineHeight: '19.5px',
                          display: 'inline-flex',
                          alignItems: 'baseline',
                          gap: '2px'
                        }}>
                          <span>{item.bonusChip.replace(/\s*[БB]$/i, '').trim()}</span>
                          <KaspiBonusSymbol height={8} color="#FFFFFF" />
                        </span>
                      </div>
                    ) : (
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        lineHeight: '19.5px'
                      }}>
                        {item.discountChip}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Price: 7 below image bottom (y 684), 15 Bold #000 */}
              <div style={{
                marginTop: '5.5px',
                display: 'flex',
                alignItems: 'baseline',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%',
                lineHeight: '18px'
              }}>
                <span style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: item.oldPrice ? '#F14635' : '#000000',
                  lineHeight: '18px',
                  flexShrink: 0
                }}>
                  {item.price}
                </span>
                {item.oldPrice && (
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#8E8E8E',
                    textDecoration: 'line-through',
                    lineHeight: '15px',
                    marginLeft: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}>
                    {item.oldPrice}
                  </span>
                )}
              </div>

              {/* Bonus box: 110 x 38, radius 8, #E6F8D0, top 21 below price text top (y 705) */}
              {item.bonusBox && (
                <div style={{
                  marginTop: '3px',
                  width: '110px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: '#E6F8D0',
                  padding: '4px 6px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#54A000',
                    lineHeight: '15px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}>
                    {item.bonusBox.price}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#000000',
                    lineHeight: '14px',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.bonusBox.caption}
                  </div>
                </div>
              )}

              {/* Product name: 13 Regular #000, 1 line, tail ellipsis, text top 5 below box (y 748) */}
              <div style={{
                marginTop: item.bonusBox ? '4px' : '6px',
                fontSize: '13px',
                fontWeight: '400',
                color: '#000000',
                width: '110px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '16px'
              }}>
                {item.title}
              </div>

              {/* Rating row: text top 19 below name text top (y 767). Value 13 Semibold, star 12 #F14635, count 13 Regular #8E8E8E */}
              <div style={{
                marginTop: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#000000',
                  lineHeight: '15px'
                }}>
                  {item.rating}
                </span>
                <KaspiRatingStar size={12} color="#F14635" />
                <span style={{
                  fontSize: '13px',
                  fontWeight: '400',
                  color: '#8E8E8E',
                  lineHeight: '15px'
                }}>
                  {item.reviews}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider 2: full width, 0.5 pt, #EBEBEB at y 798 (item 33) */}
      <div style={{
        marginTop: '16px',
        height: '0.5px',
        backgroundColor: '#EBEBEB',
        width: '100%',
        display: 'block',
        flexShrink: 0
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
