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
          Search field: x 18, width = screen - 64 (332 on 414), height 42,
          corner radius 10, fill #F2F2F2. No border.
          Magnifier 19 x 19, left edge 12 inside field, vertically centred, #8E8E8E.
          Placeholder "Поиск по Kaspi.kz": 17 Regular, #8E8E8E, starts x 60 (11 after magnifier).
          Camera icon box enlarged with sparkle.
          Cart icon 26 x 25, left edge 14.5 after field.
          Cart badge: circle 15.5, #F14635, number 11 Semibold white, top-right.
      ===================================================================== */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 45,
        backgroundColor: '#FFFFFF',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)',
        paddingBottom: '6px',
        paddingLeft: '18px',
        paddingRight: '23.5px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Search Field */}
        <div
          onClick={onOpenSearch}
          className="touchable"
          style={{
            flex: 1,
            height: '42px',
            backgroundColor: '#F2F2F2',
            borderRadius: '10px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '12px',
            paddingRight: '12px',
            cursor: 'pointer',
            boxSizing: 'border-box'
          }}
        >
          {/* Magnifier 19 x 19, #8E8E8E */}
          <Search size={19} color="#8E8E8E" strokeWidth={2.2} style={{ flexShrink: 0 }} />

          {/* Placeholder: 17 Regular, #8E8E8E, 11 after magnifier */}
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

          {/* Camera icon box enlarged with sparkle */}
          <div style={{
            width: '30px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <CameraSparkleIcon size={27} color="#555555" />
          </div>
        </div>

        {/* Cart icon 26 x 25, 14.5 after field */}
        <div
          onClick={() => onOpenService('cart')}
          className="touchable"
          style={{
            marginLeft: '14.5px',
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
          {/* Cart badge: circle 15.5, #F14635, number 11 Semibold white */}
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
          2. BANNER
          6 below sticky search bar (giving total 12px from search field).
          Box x 17, width = screen - 34 (380), height 111.5. Aspect ratio 3.40 : 1, radius 10.
          Page indicator: capsule 39 x 7.5, radius 3.75, fill white 30%, bottom 6 above banner bottom.
          4 dots, 4 pt each, centre-to-centre 8.75. Active pure white, others white 50%.
      ===================================================================== */}
      <div style={{
        marginTop: '6px',
        paddingLeft: '17px',
        paddingRight: '17px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          aspectRatio: '3.40 / 1',
          maxHeight: '111.5px',
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

          {/* Page indicator: capsule 39 x 7.5, radius 3.75, fill white 30%, bottom 6 above banner bottom */}
          <div style={{
            position: 'absolute',
            bottom: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '39px',
            height: '7.5px',
            borderRadius: '3.75px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4.75px',
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
          4 equal columns, centres x 63.5 / 159.5 / 256 / 353.
          Icon box 34 x 34. Magnum tile 34 x 34, radius 8. Line icons #F14635.
          Row 1 icon top 20 below banner (y 237.5).
          Label: 15 Regular #000, centred, cap top 13.5 below icon box bottom.
          Row pitch 77.5 (icon top to icon top).
          Divider: full width, 0.5 pt, #EBEBEB, 14 below row 2 labels (y 389).
      ===================================================================== */}
      <div style={{
        marginTop: '20px',
        paddingLeft: '15.5px',
        paddingRight: '15.5px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          rowGap: '12px', // icon 34 + label 13.5 + text 18 = 65.5; 65.5 + 12 = 77.5 pitch!
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '13.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '13.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '13.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '13.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '13.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '13.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '13.5px', lineHeight: '18px', letterSpacing: 0 }}>
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
            <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000', marginTop: '13.5px', lineHeight: '18px', letterSpacing: 0 }}>
              Работа
            </span>
          </div>
        </div>
      </div>

      {/* Divider 1: full width, 1px, #D0D0D0, between service icons and deposit tiles */}
      <div style={{
        marginTop: '14px',
        marginBottom: '16px',
        height: '1px',
        minHeight: '1px',
        backgroundColor: '#D0D0D0',
        width: '100%',
        display: 'block',
        flexShrink: 0
      }} />

      {/* =====================================================================
          4. DEPOSIT ROWS
          Tiles: 53 x 42, radius 6, #FFD302.
          Text starts 12px after tile, 18 Regular #000, height 42px matching tile.
          Row 1: "Накопительный" / "Депозит" + pill "18%".
          Row 2: "Kaspi Депозит 15%" one line, vertically centred on tile.
      ===================================================================== */}
      <div style={{
        marginTop: '0px',
        paddingLeft: '18px',
        paddingRight: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Row 1: Накопительный Депозит 18% */}
        <div className="touchable" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {/* Yellow tile: 53 x 42, radius 6, #FFD302 */}
          <div style={{
            width: '53px',
            height: '42px',
            borderRadius: '6px',
            backgroundColor: '#FFD302',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            <svg viewBox="26 20 243 188" width="53" height="42">
              <g transform="translate(148, 115) scale(1.10) translate(-148, -115)" fill="none" stroke="#FFFFFF" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="148" cy="91.75" rx="43" ry="22.75" />
                <path d="M105 92Q110.5 103.5 106 115Q110.5 127 105 139" />
                <path d="M191 92Q188 103.5 190.5 115Q188 127 191 139" />
                <path d="M106 115a42 22.5 0 0 0 84 0" />
                <path d="M105 139a43 22.5 0 0 0 86 0" />
              </g>
            </svg>
          </div>

          {/* Text starts 12 after tile */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: '12px',
            height: '42px'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '400',
              color: '#000000',
              lineHeight: '21px',
              letterSpacing: 0
            }}>
              Накопительный
            </div>
            <div style={{ display: 'flex', alignItems: 'center', lineHeight: '21px' }}>
              <span style={{
                fontSize: '18px',
                fontWeight: '400',
                color: '#000000',
                lineHeight: '21px',
                letterSpacing: 0
              }}>
                Депозит
              </span>
              {/* Rate pill: 6 after "Депозит", 39 x 21, radius 10.5, #FFD302, 18% 15.5 Semibold #000 */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFD302',
                borderRadius: '10.5px',
                width: '39px',
                height: '21px',
                marginLeft: '6px',
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
          {/* Yellow tile: 53 x 42, radius 6, #FFD302 */}
          <div style={{
            width: '53px',
            height: '42px',
            borderRadius: '6px',
            backgroundColor: '#FFD302',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            <svg viewBox="17 15 243 189" width="53" height="42">
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

          {/* Text — Row 2: 12 after tile, vertically centred on tile */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '12px',
            height: '42px'
          }}>
            <span style={{
              fontSize: '18px',
              fontWeight: '400',
              color: '#000000',
              lineHeight: '21px',
              letterSpacing: 0
            }}>
              Kaspi Депозит 15%
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          5. "ВЫ НЕДАВНО СМОТРЕЛИ" CAROUSEL
          Title: 18 Bold #000, x 18, top 26 below tile 2 bottom.
          Images start 15.5 below title bottom.
          Card: image 110 x 110, radius 10, white fill, 1 px border #EFEFEF, x of first card 18.
          Card pitch 119.5, gap between cards 9.5.
          Image chip: height 19.5, radius 6, 13 Bold white, pinned bottom-left, 1 inside image.
          Price: 15 Bold #000, 7.5 below image. Discount: price #F14635, old price 12 Regular #8E8E8E, 4 after it.
          Bonus box: 8 below price bottom. Size 110 x 38, radius 8, fill #E6F8D0, padding 5 left, 4 top.
            Line 1: bonus price 13 Bold #54A000.
            Line 2: "с учетом Бонусов" 12 Regular #000.
          Product name: 13 Regular #000, 1 line, tail ellipsis, 5.5 below box (or 8 below price if no bonus box).
          Rating row: top 18.5 below name top (y 767.5). Value 13 Semibold #000, star 12 #F14635, count 13 Regular #8E8E8E.
          Divider 0.5 #EBEBEB at y 799 (17.5 under rating row), full width.
      ===================================================================== */}
      <div style={{
        marginTop: '26px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Section Title: 18 Bold #000, x 18 */}
        <div style={{
          paddingLeft: '18px',
          paddingRight: '18px',
          fontSize: '18px',
          fontWeight: '700',
          color: '#000000',
          lineHeight: '22px'
        }}>
          Вы недавно смотрели
        </div>

        {/* Horizontal Carousel: images start 15.5 below title bottom */}
        <div style={{
          marginTop: '15.5px',
          display: 'flex',
          gap: '9.5px',
          overflowX: 'auto',
          paddingLeft: '18px',
          paddingRight: '18px',
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

                {/* Image chip: pinned flush to bottom-left corner with card-matching border radius */}
                {(item.discountChip || item.bonusChip) && (
                  <div style={{
                    position: 'absolute',
                    left: '0px',
                    bottom: '0px',
                    height: '19.5px',
                    borderTopLeftRadius: '3px',
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',
                    borderBottomLeftRadius: '9px',
                    padding: '0 6px',
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

              {/* Price: 15 Bold #000, 7.5 below image */}
              <div style={{
                marginTop: '7.5px',
                display: 'flex',
                alignItems: 'baseline',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%'
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

              {/* Bonus box: 8 below price bottom, 110 x 38, radius 8, fill #E6F8D0, padding 5 left, 4 top */}
              {item.bonusBox && (
                <div style={{
                  marginTop: '8px',
                  width: '110px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: '#E6F8D0',
                  padding: '4px 5px',
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

              {/* Product name: 13 Regular #000, 1 line, tail ellipsis, 5.5 below box (or 8 below price if no bonus box) */}
              <div style={{
                marginTop: item.bonusBox ? '5.5px' : '8px',
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

              {/* Rating row: top 18.5 below name top (y 767.5). Value 13 Semibold #000, star 12 #F14635, count 13 Regular #8E8E8E */}
              <div style={{
                marginTop: '2.5px',
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

      {/* Divider 2: full width, 1px, #D0D0D0, between product carousel and filter pills */}
      <div style={{
        marginTop: '16px',
        height: '1px',
        minHeight: '1px',
        backgroundColor: '#D0D0D0',
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
