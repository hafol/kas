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

// Filled vector star icon, 9 pt, color #F14635
const KaspiRatingStar = ({ size = 9, color = "#F14635" }) => (
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
      bonusPercent: '5%',
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
      bonusPercent: '3%',
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
          F1: No grey line under header.
          F2: Magnifier 18.5 x 18.5 at x 30.5, y 63.5.
          F3: Placeholder "Поиск по Kaspi.kz": 144.5 wide, starts x 60, top y 66.5.
          F4: Camera icon: 24 x 20 at x 312.5, y 62.5.
          F5: Cart icon: 21.5 x 20.5 at x 365, y 63.
          F6: Cart badge: 15.5 x 15 at x 378.5, y 59 (cart left + 13.5, cart top - 4).
      ===================================================================== */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 45,
        backgroundColor: '#FFFFFF',
        border: 'none',
        borderBottom: 'none',
        boxShadow: 'none',
        outline: 'none',
        paddingTop: 'max(env(safe-area-inset-top, 0px), 2px)',
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
          id="kaspi-search-field"
          onClick={onOpenSearch}
          className="touchable"
          style={{
            flex: 1,
            height: '42.5px',
            backgroundColor: '#F2F2F2',
            borderRadius: '10px',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '13px',
            paddingRight: '13.5px',
            cursor: 'pointer',
            boxSizing: 'border-box'
          }}
        >
          {/* F2: Magnifier 18.5 x 18.5 at x 30.5, y 63.5 */}
          <svg width="18.5" height="18.5" viewBox="0 0 18.5 18.5" fill="none" style={{ flexShrink: 0, display: 'block' }}>
            <circle cx="7.75" cy="7.75" r="6.5" stroke="#8E8E8E" strokeWidth="2.1" />
            <path d="M12.5 12.5L17.25 17.25" stroke="#8E8E8E" strokeWidth="2.1" strokeLinecap="round" />
          </svg>

          {/* F3: Placeholder "Поиск по Kaspi.kz": 144.5 wide, starts at x 60, top y 66.5 */}
          <span style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: '17px',
            fontWeight: '400',
            color: '#8E8E8E',
            marginLeft: '11px',
            flex: 1,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: '0.2px',
            lineHeight: '22px'
          }}>
            Поиск по Kaspi.kz
          </span>

          {/* F4: Camera icon box: 24 x 20 at x 312.5, y 62.5 */}
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

        {/* F5: Cart icon box: ~10% bigger (24 x 23) */}
        <div
          onClick={() => onOpenService('cart')}
          className="touchable"
          style={{
            marginLeft: '14px',
            width: '24px',
            height: '23px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <TopBarCartIcon width={24} height={23} color="#9E9E9E" />
          {/* F6: Cart badge "3": 15.5 x 15 at cart left + 14.5, cart top - 4 */}
          <div style={{
            position: 'absolute',
            top: '-4px',
            left: '14.5px',
            width: '15.5px',
            height: '15px',
            borderRadius: '7.5px',
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
              touchAction: 'pan-x',
              overscrollBehaviorX: 'contain',
              overscrollBehaviorY: 'none'
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
          Row 1 icons: tops y 236.5–238.5.
          Row 1 labels: top y 280.
          Row 2 icons: line icons tops y 315–316; Magnum tile top y 313 (size 35.5 x 36).
          Row 2 labels: top y 359.5.
          Grid divider: top y 388.5.
          Label font: 15.2 px Regular, letter-spacing 0.15px.
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
          rowGap: '17.5px',
          width: '100%'
        }}>
          {/* Row 1 */}
          {/* 1. Магазин */}
          <div
            onClick={() => onOpenService('shop')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '38px', height: '34px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <IconShop size={37.5} color="#F14635" />
            </div>
            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: '15.2px', fontWeight: '400', color: '#000000', marginTop: '8.5px', lineHeight: '18px', letterSpacing: '0.15px' }}>
              Магазин
            </span>
          </div>

          {/* 2. Мой Банк */}
          <div
            onClick={onOpenMyBank}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '38px', height: '34px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <IconMyBank size={37.5} color="#F14635" />
            </div>
            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: '15.2px', fontWeight: '400', color: '#000000', marginTop: '8.5px', lineHeight: '18px', letterSpacing: '0.15px' }}>
              Мой Банк
            </span>
          </div>

          {/* 3. Платежи */}
          <div
            onClick={() => onOpenService('payments')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '38px', height: '34px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <IconPayments size={34} color="#F14635" />
            </div>
            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: '15.2px', fontWeight: '400', color: '#000000', marginTop: '8.5px', lineHeight: '18px', letterSpacing: '0.15px' }}>
              Платежи
            </span>
          </div>

          {/* 4. Переводы */}
          <div
            onClick={onOpenTransfers}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '38px', height: '34px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <IconTransfers size={34.5} color="#F14635" />
            </div>
            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: '15.2px', fontWeight: '400', color: '#000000', marginTop: '8.5px', lineHeight: '18px', letterSpacing: '0.15px' }}>
              Переводы
            </span>
          </div>

          {/* Row 2 */}
          {/* 5. Magnum: tile 35.5 x 36, radius 8, moved down 1.5px (top y 314.5) */}
          <div
            onClick={() => onOpenService('magnum')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '35.5px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-1px' }}>
              <IconMagnum width={35.5} height={36} />
            </div>
            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: '15.2px', fontWeight: '400', color: '#000000', marginTop: '9px', lineHeight: '18px', letterSpacing: '0.15px' }}>
              Magnum
            </span>
          </div>

          {/* 6. Travel */}
          <div
            onClick={() => onOpenService('travel')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '38px', height: '34px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <IconTravel size={37.5} color="#F14635" />
            </div>
            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: '15.2px', fontWeight: '400', color: '#000000', marginTop: '10px', lineHeight: '18px', letterSpacing: '0.15px' }}>
              Travel
            </span>
          </div>

          {/* 7. Госуслуги */}
          <div
            onClick={onOpenGov}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '38px', height: '34px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <IconGov size={37.5} color="#F14635" />
            </div>
            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: '15.2px', fontWeight: '400', color: '#000000', marginTop: '10px', lineHeight: '18px', letterSpacing: '0.15px' }}>
              Госуслуги
            </span>
          </div>

          {/* 8. Работа */}
          <div
            onClick={() => onOpenService('jobs')}
            className="touchable"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '38px', height: '34px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <IconJobs size={37.5} color="#F14635" />
            </div>
            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: '15.2px', fontWeight: '400', color: '#000000', marginTop: '10px', lineHeight: '18px', letterSpacing: '0.15px' }}>
              Работа
            </span>
          </div>
        </div>
      </div>

      {/* Divider 1: full width, 0.5 pt, #EBEBEB at y 388.5 */}
      <div style={{
        marginTop: '11px',
        height: '0.5px',
        backgroundColor: '#EBEBEB',
        width: '100%',
        display: 'block',
        flexShrink: 0
      }} />

      {/* =====================================================================
          4. DEPOSIT ROWS
          D1. Tile 1 top y 411.5, Tile 2 top y 465. Size 56.5 x 44, gap 9.5 px.
          D2. Coin glyph (tile 1): 21.5 w x 23 h, stroke 2.35 px, offset x 17.5, y 10.5.
          D3. "₸$" glyph (tile 2): 28.5 w x 19 h, stroke 2.7 px, offset x 14.5, y 12.5.
          D4. Text starts at x 88.5 (marginLeft: 13.5px). 18 px Regular, colour #000.
              "Накопительный" capital top y 411.5, "Депозит" top y 435.5, line pitch 24 px.
              "Kaspi Депозит 15%" top y 479 (14 px below tile 2 top).
          D5. "18%" yellow pill: 40 x 23 at x 166.5, y 432.5, 6.5 px after "Депозит".
      ===================================================================== */}
      <div style={{
        marginTop: '22.5px',
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

          {/* D4: Text starts at x 88.5 (marginLeft: 13.5px), capital top y 411.5 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '13.5px',
            marginTop: '-2px'
          }}>
            <div style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '18px',
              fontWeight: '400',
              color: '#000000',
              lineHeight: '24px',
              letterSpacing: '0.45px'
            }}>
              Накопительный
            </div>
            <div style={{ display: 'flex', alignItems: 'center', lineHeight: '24px' }}>
              <span style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '18px',
                fontWeight: '400',
                color: '#000000',
                lineHeight: '24px',
                letterSpacing: '0.45px'
              }}>
                Депозит
              </span>
              {/* D5: Rate pill: 40 x 23 at x 166.5, y 432.5, 6.5 px after "Депозит" */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFD302',
                borderRadius: '11.5px',
                width: '40px',
                height: '23px',
                marginLeft: '6.5px',
                marginTop: '-4.5px',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#000000',
                  lineHeight: 1,
                  transform: 'translateY(-0.5px)'
                }}>
                  18%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Kaspi Депозит 15% */}
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

          {/* D4: Kaspi Депозит 15%: starts at x 88.5, top y 479 (14 px below tile 2 top at 465) */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginLeft: '13.5px',
            marginTop: '14px'
          }}>
            <span style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '18px',
              fontWeight: '400',
              color: '#000000',
              lineHeight: '24px',
              letterSpacing: '0.45px'
            }}>
              Kaspi Депозит 15%
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          5. "ВЫ НЕДАВНО СМОТРЕЛИ" CAROUSEL
          C1. Title top y 535.5, width 189.5 px (17.5 px Bold 700, letter-spacing 0).
          C2. Tile top y 567 (tile bottom y 677). Gap from title text bottom = 14.5 px.
          A1. hide-scrollbar removes any faint line at y 775.
          C3. Price text top y 685 (7.5 px under tile bottom).
          C4. Green bonus box: box top y 705.5 (20.5 px under price top). 111 x 39, #E5F5D2.
              padding-left 5 px, green price 5.5 px under box top, "с учетом Бонусов" 24 px under box top (font 11.5 px, width 99.5 px).
          C5. Product name: text top 44 px under box top (y 749.5).
          C6. Rating row: text top 18.5 px under name top (y 768). Star 9 x 9.
          C7. Cards without bonus box: name 21.5 px under price top.
          A2. Divider at y 799 (18.5 px under rating bottom, marginTop 23.5 px, #F3F3F3, 0.5 px).
          A3. Next section starts at y 813+, hidden behind opaque white tab bar.
      ===================================================================== */}
      {/* =====================================================================
          5. "ВЫ НЕДАВНО СМОТРЕЛИ" CAROUSEL
          Title: top y 535.5 (18 px Bold 700).
          Image tiles: top y 567 (110 x 110).
          Price: top y 685 (8 px under tile bottom).
          Bonus box: top y 705.5 (111 x 39, #DEF9D0 mint, padding-left 5 px).
            Green price: top y 711 (padding-top 5.5 px).
            "с учетом Бонусов": top y 729.5 (width 99.5 px).
          Product name: top y 749.5 (with bonus) / 707 (without bonus).
          Rating: top y 768 (with bonus) / 726.5 (without bonus). Star 9 x 9 #F14635.
          Chips: pinned bottom-left (0 gap), radius 4px 6px 0 10px, height 20 px, 12 px Semibold.
            Red chip "-32%": #EC473A.
            Green chip: #589F07, flame 8x11 #FFC400, white percent pill [3%] / [5%].
          Divider 2: y 799, 1 px, #F3F3F3, full width.
      ===================================================================== */}
      <div style={{
        marginTop: '26.5px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Section Title: 18 Bold #000, top y 535.5 */}
        <div style={{
          paddingLeft: '18.5px',
          paddingRight: '18.5px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", sans-serif',
          fontSize: '18px',
          fontWeight: '700',
          color: '#000000',
          lineHeight: '22px',
          letterSpacing: 0
        }}>
          Вы недавно смотрели
        </div>

        {/* Horizontal Carousel: tile top y 567, hide-scrollbar & carousel class removes horizontal scrollbar line */}
        <div
          className="hide-scrollbar carousel"
          style={{
            marginTop: '9.5px',
            display: 'flex',
            gap: '9.5px',
            overflowX: 'auto',
            paddingLeft: '17.5px',
            paddingRight: '17.5px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
            overscrollBehaviorX: 'contain',
            overscrollBehaviorY: 'none',
            alignItems: 'flex-start'
          }}
        >
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

                {/* Section 4: Image chip (pinned to bottom-left with zero gap, radius: 4px 6px 0 10px, height 20 px) */}
                {(item.discountChip || item.bonusChip) && (
                  item.discountChip ? (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: '20px',
                      borderRadius: '4px 6px 0 10px',
                      backgroundColor: '#EC473A',
                      padding: '0 6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      boxSizing: 'border-box'
                    }}>
                      <span style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#FFFFFF',
                        lineHeight: 1,
                        whiteSpace: 'nowrap'
                      }}>
                        {item.discountChip}
                      </span>
                    </div>
                  ) : (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: '20px',
                      borderRadius: '4px 6px 0 10px',
                      backgroundColor: '#589F07',
                      padding: '0 6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      zIndex: 2,
                      boxSizing: 'border-box'
                    }}>
                      {item.hasFlame && (
                        <svg width="8" height="11" viewBox="14 1 71 82" fill="none" style={{ marginRight: '4px', flexShrink: 0 }}>
                          <path
                            fill="#FFC400"
                            d="M27 20.5C31 22 35 28 38 34C39.5 28 42 17 45 11.5C47 7.5 49 5.5 51 4.5C54 7 56.5 14 58.5 21C60.5 28 62 35 63 41C64 37 66 33 68.5 30.5C73 32.5 77 40 79.5 47C81.5 54 80.5 62 77 68C74 73 69.5 77 64.5 79.5C62 77 61.5 73 61.5 70.5C61.5 68 60 65.5 58 64C56 66.5 53.5 68.5 50.5 69.5C46.5 67.5 42 61 40.5 55C38 59 36 65 35.5 70C35.2 73.5 34.5 76.5 32 79C26 77 21 70 19 62C17.5 55 19 48 21.5 41C23.5 34 24.5 27 27 20.5Z"
                          />
                        </svg>
                      )}
                      <span style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#FFFFFF',
                        lineHeight: 1,
                        whiteSpace: 'nowrap'
                      }}>
                        {item.bonusChip}
                      </span>
                      {item.bonusPercent && (
                        <span style={{
                          marginLeft: '4.5px',
                          backgroundColor: '#FFFFFF',
                          height: '14px',
                          borderRadius: '4px',
                          padding: '0 2.5px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#589F07',
                          lineHeight: 1,
                          whiteSpace: 'nowrap'
                        }}>
                          {item.bonusPercent}
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Price: 8 px under tile bottom (y 685), 15 Bold */}
              <div style={{
                marginTop: '8px',
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

              {/* Green bonus box: 111 x 39, radius 8, #DEF9D0 mint, top 20.5 below price text top (box top y 705.5) */}
              {item.bonusBox && (
                <div style={{
                  marginTop: '2.5px',
                  width: '111px',
                  height: '39px',
                  borderRadius: '8px',
                  backgroundColor: '#DEF9D0',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  paddingTop: '5.5px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#589F07',
                    lineHeight: '13px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}>
                    {item.bonusBox.price}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '400',
                    color: '#000000',
                    lineHeight: '13px',
                    marginTop: '5.5px',
                    letterSpacing: '-0.1px',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.bonusBox.caption}
                  </div>
                </div>
              )}

              {/* Product name: text top 44 px under box top (y 749.5) / 707 without box */}
              <div style={{
                marginTop: item.bonusBox ? '5px' : '4px',
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

              {/* Rating row: text top 18.5 below name text top (y 768 / 726.5 without box). Value 13 Semibold, star 9x9 #F14635, count 13 Regular #8E8E8E */}
              <div style={{
                marginTop: item.bonusBox ? '2.5px' : '3.5px',
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
                <KaspiRatingStar size={9} color="#F14635" />
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

      {/* 3c: Divider 2: full width, 1 px, #F3F3F3 at y 799 (16 px under rating bottom at 783) */}
      <div style={{
        marginTop: '16px',
        height: '1px',
        backgroundColor: '#F3F3F3',
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
