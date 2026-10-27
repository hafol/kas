import React, { useState } from 'react';
import {
  IconKaspiQrGold,
  IconTransferGold,
  IconTopupGold,
  IconWebPayGold,
  IconSubscriptionsGold,
  IconOrderCashGold,
  IconReissueGold,
  IconChangePinGold,
  IconBlockCardGold,
  IconCardlessGold,
  IconCloseCardGold,
  IconAnalyticsGold,
  IconLimitsGold,
  IconRequisitesGold,
  IconCertificatesGold,
  IconConditionsGold,
  IconAtmsGold,
  IconTipsGold,
  IconVisaTopupGold,
  StatementCalendarIcon,
  StatementOperationsReceiptIcon,
  StatementBasketIcon,
  StatementPersonIcon,
  ApplePayBadge,
  KaspiGoldMedallion
} from './KaspiGoldIcons';

// Chevron right: grey > (+30% bigger: 9 x 17, stroke 2.2)
const ChevronRightIcon = ({ color = "#C7C7CC" }) => (
  <svg width="9" height="17" viewBox="0 0 10 18" fill="none">
    <path d="M2 2L8 9L2 16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Back chevron < matching right card measurement (8 x 15, sits 37px higher)
const BackChevronIcon = ({ color = "#FFFFFF" }) => (
  <svg width="9" height="17" viewBox="0 0 10 18" fill="none">
    <path d="M8.5 1.5L1.5 9L8.5 16.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Share / Export icon (square with upward right arrow, +30% bigger)
const ShareExportIcon = ({ size = 24, color = "#8E8E93" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="16 6 12 2 8 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="2" x2="12" y2="15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Search Magnifier icon (+30% bigger)
const SearchIcon = ({ size = 20, color = "#8E8E93" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7.5" stroke={color} strokeWidth="2" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const KaspiGoldDetailScreen = ({
  card = {
    id: "gold_4163",
    name: "Kaspi Gold",
    last4: "4163",
    cardNumberFormatted: "4400 4303 6188 4163",
    iban: "KZ54722C000021658491",
    balance: 112022.58,
    currency: "₸",
    expiry: "09/29",
    cvv: "•••"
  },
  onBack,
  onOpenTransfer
}) => {
  const [activeTab, setActiveTab] = useState('actions'); // 'actions' | 'info' | 'statement'
  const [showRequisitesModal, setShowRequisitesModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;
    const handleParentScroll = () => {
      const top = parent.scrollTop;
      if (top > 35) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    parent.addEventListener('scroll', handleParentScroll, { passive: true });
    return () => parent.removeEventListener('scroll', handleParentScroll);
  }, []);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formattedBalance = typeof card.balance === 'number'
    ? card.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\u00a0/g, ' ') + ' ₸'
    : (card.balance || '110 922,58 ₸');

  // 11 items for TAB 1: ДЕЙСТВИЯ (exact match with Right Screenshot)
  const actionsList = [
    { id: 'qr', title: 'Kaspi QR', IconComponent: IconKaspiQrGold },
    { id: 'transfer', title: 'Перевести', IconComponent: IconTransferGold, onClick: onOpenTransfer },
    { id: 'topup', title: 'Пополнить Kaspi Gold', IconComponent: IconTopupGold },
    { id: 'webpay', title: 'Оплата в интернете', IconComponent: IconWebPayGold },
    { id: 'subscriptions', title: 'Платные сервисы и подписки', IconComponent: IconSubscriptionsGold },
    { id: 'order_cash', title: 'Заказать сумму на снятие', subtitle: 'более 4 000 000 ₸', IconComponent: IconOrderCashGold },
    { id: 'reissue', title: 'Перевыпустить Kaspi Gold', IconComponent: IconReissueGold },
    { id: 'pin', title: 'Сменить ПИН-код', IconComponent: IconChangePinGold },
    { id: 'block', title: 'Заблокировать карту', IconComponent: IconBlockCardGold },
    { id: 'cardless', title: 'Снять деньги без карты', IconComponent: IconCardlessGold },
    { id: 'close', title: 'Закрыть Kaspi Gold', IconComponent: IconCloseCardGold }
  ];

  // 8 items for TAB 2: ИНФО (exact user-provided SVGs matching Screenshot 2)
  const infoList = [
    { id: 'analytics', title: 'Аналитика покупок', IconComponent: IconAnalyticsGold },
    { id: 'limits', title: 'Лимит на снятие наличных', IconComponent: IconLimitsGold },
    { id: 'requisites', title: 'Реквизиты карты и счета', IconComponent: IconRequisitesGold, onClick: () => setShowRequisitesModal(true) },
    { id: 'certificates', title: 'Справки', subtitle: 'О наличии счета, о доступном остатке', IconComponent: IconCertificatesGold },
    { id: 'conditions', title: 'Условия Kaspi Gold', IconComponent: IconConditionsGold },
    { id: 'terminals', title: 'Терминалы и банкоматы', IconComponent: IconAtmsGold },
    { id: 'tips', title: 'Полезные советы', IconComponent: IconTipsGold },
    { id: 'visa_topup', title: 'Пополнения с Visa', subtitle: 'Из другого банка по номеру телефона', IconComponent: IconVisaTopupGold }
  ];

  // Transactions list for TAB 3: ВЫПИСКА (exact user-provided SVGs matching Screenshot 3)
  const statementGroups = [
    {
      date: '23 октября',
      items: [
        {
          id: 'tx_1',
          title: 'ИП МАЙМАХОВА',
          category: 'Супермаркеты',
          amount: '- 1 640 ₸',
          icon: StatementBasketIcon
        }
      ]
    },
    {
      date: '22 октября',
      items: [
        {
          id: 'tx_2',
          title: 'Әнел Ш.',
          category: 'Переводы',
          amount: '- 1 100 ₸',
          icon: StatementPersonIcon
        }
      ]
    },
    {
      date: '21 октября',
      items: [
        {
          id: 'tx_3',
          title: 'Magnum',
          category: 'Супермаркеты',
          amount: '- 8 450 ₸',
          icon: StatementBasketIcon
        }
      ]
    }
  ];

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        minHeight: '100%',
        backgroundColor: '#D5AE6B',
        backgroundImage: 'url(/kaspi_assets/kaspi_gold_bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
        boxSizing: 'border-box'
      }}
    >
      {/* 1. STATIC STICKY MEDALLION (Pinned to top: 0, DOES NOT MOVE on scroll, below white sheet) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          height: 0,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '16px',
            top: 'calc(env(safe-area-inset-top, 0px) + 24px)',
            width: '124px',
            height: '124px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/kaspi_assets/kaspi_gold_medallion.svg"
            alt="Kaspi Gold Medallion"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* 2. STICKY COMPACT HEADER (Back arrow static on left, compact balance on scroll) */}
      <div style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? '#D5AE6B' : 'transparent',
        height: 'calc(48px + env(safe-area-inset-top, 0px))',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: '18px',
        paddingRight: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        boxShadow: isScrolled ? '0 2px 8px rgba(138, 98, 30, 0.25)' : 'none',
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease'
      }}>
        {/* Back navigation button */}
        <div
          onClick={onBack}
          className="touchable"
          style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            cursor: 'pointer'
          }}
        >
          <BackChevronIcon color="#FFFFFF" />
        </div>

        {/* Compact Centered Title + Balance (visible on scroll) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          pointerEvents: isScrolled ? 'auto' : 'none'
        }}>
          <span style={{
            fontSize: '17px',
            fontWeight: '700',
            color: '#FFFFFF',
            lineHeight: 1.2
          }}>
            Kaspi Gold *{card.last4}
          </span>
          <span style={{
            fontSize: '13px',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.92)',
            marginTop: '1px',
            lineHeight: 1.2
          }}>
            {formattedBalance}
          </span>
        </div>

        {/* Empty placeholder for symmetry */}
        <div style={{ width: '36px' }} />
      </div>

      {/* 3. EXPANDED GOLDEN CARD HEADER (Restored authentic spacing: 238px minHeight) */}
      <div style={{
        marginTop: 'calc(-48px - env(safe-area-inset-top, 0px))',
        paddingTop: 'calc(48px + env(safe-area-inset-top, 0px) + 18px)',
        paddingLeft: '18px',
        paddingRight: '18px',
        paddingBottom: '28px',
        position: 'relative',
        zIndex: 3,
        boxSizing: 'border-box',
        overflow: 'hidden',
        minHeight: '250px'
      }}>
        {/* Card Name + Apple Pay badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '19.5px',
            fontWeight: '700',
            color: '#FFFFFF',
            letterSpacing: '0.1px',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>
            Kaspi Gold *{card.last4}
          </span>
          <ApplePayBadge style={{ marginLeft: '8px' }} />
        </div>

        {/* Caption "Доступно" (gap from title: 34-36px) */}
        <div style={{
          fontSize: '14px',
          fontWeight: '400',
          color: 'rgba(255, 255, 255, 0.92)',
          marginTop: '34px',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          Доступно
        </div>

        {/* Big Balance: 110 922,58 ₸ (gap from label: 8px, font: 38px bold) */}
        <div style={{
          fontSize: '38px',
          fontWeight: '700',
          color: '#FFFFFF',
          letterSpacing: '-0.4px',
          lineHeight: '1.1',
          marginTop: '6px',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          {formattedBalance}
        </div>
      </div>

      {/* 4. MAIN WHITE SHEET (Rounded top corners: 18px, starts at y 238, cuts off medallion bottom) */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: '18px',
        borderTopRightRadius: '18px',
        marginTop: '-12px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 10,
        paddingBottom: 'calc(180px + env(safe-area-inset-bottom, 34px))'
      }}>
        {/* =====================================================================
            SEGMENTED CONTROL (Действия / Инфо / Выписка) - Sticky on scroll
            - Height: 36px (tab pill), selected tab 31px
            - Gap sheet top -> tab bar: 10px
            - Labels: 14px font
        ===================================================================== */}
        <div style={{
          position: 'sticky',
          top: 'calc(48px + env(safe-area-inset-top, 0px))',
          zIndex: 40,
          backgroundColor: '#FFFFFF',
          padding: '10px 14px 12px 14px',
          borderTopLeftRadius: isScrolled ? '0' : '18px',
          borderTopRightRadius: isScrolled ? '0' : '18px',
          boxSizing: 'border-box',
          transition: 'border-radius 0.15s ease'
        }}>
          <div style={{
            backgroundColor: '#F0F0F2',
            height: '36px',
            borderRadius: '10px',
            padding: '2.5px',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}>
          {[
            { id: 'actions', label: 'Действия' },
            { id: 'info', label: 'Инфо' },
            { id: 'statement', label: 'Выписка' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="touchable"
                style={{
                  flex: 1,
                  height: '31px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? '#1C1C1E' : '#8E8E93',
                  boxShadow: isActive ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
                  transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
                  padding: 0
                }}
              >
                {tab.label}
              </button>
            );
          })}
          </div>
        </div>

        {/* =====================================================================
            TAB 1: ДЕЙСТВИЯ (Exact Right Screenshot + 30% Scale Specification)
            - 11 items starting with Kaspi QR
            - Row pitch: 76px (+30% larger, spacious & comfortable)
            - Icon size: 29px in 36x36px container (+30%)
            - Main text: 19px, subtitle 14.5px (+30%)
            - Chevron: 9x17px (+30%)
            - NO DIVIDERS (separation comes from airy 76px spacing)
        ===================================================================== */}
        {activeTab === 'actions' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {actionsList.map((action) => {
              const { IconComponent } = action;
              return (
                <div
                  key={action.id}
                  onClick={action.onClick}
                  className="touchable"
                  style={{
                    height: '76px',
                    padding: '0 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComponent size={29} color="#DF4337" />
                    </div>

                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        fontSize: '19px',
                        fontWeight: '400',
                        color: '#1C1C1E',
                        lineHeight: 1.25,
                        fontFamily: "'Roboto', sans-serif"
                      }}>
                        {action.title}
                      </span>
                      {action.subtitle && (
                        <span style={{
                          fontSize: '14.5px',
                          fontWeight: '400',
                          color: '#8E8E93',
                          marginTop: '2px',
                          lineHeight: 1.2,
                          fontFamily: "'Roboto', sans-serif"
                        }}>
                          {action.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRightIcon color="#C7C7CC" />
                </div>
              );
            })}
          </div>
        )}

        {/* =====================================================================
            TAB 2: ИНФО (8 items, 76px pitch, 29px icons, 19px title, no dividers)
        ===================================================================== */}
        {activeTab === 'info' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {infoList.map((item) => {
              const { IconComponent } = item;
              return (
                <div
                  key={item.id}
                  onClick={item.onClick}
                  className="touchable"
                  style={{
                    height: '76px',
                    padding: '0 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComponent size={29} color="#DF4337" />
                    </div>

                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        fontSize: '19px',
                        fontWeight: '400',
                        color: '#1C1C1E',
                        lineHeight: 1.25,
                        fontFamily: "'Roboto', sans-serif"
                      }}>
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <span style={{
                          fontSize: '14.5px',
                          fontWeight: '400',
                          color: '#8E8E93',
                          marginTop: '2px',
                          lineHeight: 1.2,
                          fontFamily: "'Roboto', sans-serif"
                        }}>
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRightIcon color="#C7C7CC" />
                </div>
              );
            })}
          </div>
        )}

        {/* =====================================================================
            TAB 3: ВЫПИСКА (+30% Larger Spacious Sections)
        ===================================================================== */}
        {activeTab === 'statement' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Search Input: "Поиск по операциям" */}
            <div style={{
              margin: '10px 18px 14px 18px',
              backgroundColor: '#F2F2F4',
              height: '44px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '12px',
              paddingRight: '12px',
              boxSizing: 'border-box'
            }}>
              <SearchIcon size={20} color="#8E8E93" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по операциям"
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  marginLeft: '10px',
                  width: '100%',
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: '17px',
                  color: '#000000'
                }}
              />
            </div>

            {/* Date Range Row: Red Calendar + "26 сентября - 26 октября" + Share/Export */}
            <div style={{
              height: '62px',
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }} className="touchable">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <StatementCalendarIcon size={29} color="#DF4337" />
                </div>
                <span style={{
                  marginLeft: '16px',
                  fontSize: '19px',
                  fontWeight: '400',
                  color: '#000000'
                }}>
                  26 сентября - 26 октября
                </span>
              </div>

              <div className="touchable" style={{ padding: '6px' }}>
                <ShareExportIcon size={24} color="#8E8E93" />
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#F2F2F4', marginLeft: '72px', width: 'calc(100% - 72px)' }} />

            {/* Summary Row: "Операции" + "+ 1 059 650 ₸" / "- 970 912,39 ₸" */}
            <div style={{
              height: '62px',
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }} className="touchable">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <StatementOperationsReceiptIcon size={29} color="#DF4337" />
                </div>
                <span style={{
                  marginLeft: '16px',
                  fontSize: '19px',
                  fontWeight: '400',
                  color: '#000000'
                }}>
                  Операции
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{
                    fontSize: '19px',
                    fontWeight: '600',
                    color: '#27A13B',
                    lineHeight: 1.25
                  }}>
                    + 1 059 650 ₸
                  </span>
                  <span style={{
                    fontSize: '15px',
                    fontWeight: '400',
                    color: '#757575',
                    marginTop: '2px',
                    lineHeight: 1.2
                  }}>
                    - 970 912,39 ₸
                  </span>
                </div>
                <ChevronRightIcon color="#C7C7CC" />
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#F2F2F4', marginLeft: '72px', width: 'calc(100% - 72px)' }} />

            {/* Grouped Transactions List by Date */}
            {statementGroups.map((group) => (
              <div key={group.date} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Date Header: e.g. "23 октября" */}
                <div style={{
                  padding: '18px 20px 8px 20px',
                  fontSize: '19px',
                  fontWeight: '700',
                  color: '#000000',
                  letterSpacing: '-0.2px'
                }}>
                  {group.date}
                </div>

                {group.items.map((tx, idx) => {
                  const Icon = tx.icon;
                  return (
                    <React.Fragment key={tx.id}>
                      <div
                        className="touchable"
                        style={{
                          height: '76px',
                          padding: '0 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {/* Circular icon container (+30% bigger: 50x50px) */}
                          <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: '#F5F5F7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Icon size={26} color="#262626" />
                          </div>

                          <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column' }}>
                            <span style={{
                              fontSize: '19px',
                              fontWeight: '500',
                              color: '#000000',
                              lineHeight: 1.25
                            }}>
                              {tx.title}
                            </span>
                            <span style={{
                              fontSize: '15px',
                              fontWeight: '400',
                              color: '#8E8E93',
                              marginTop: '2px',
                              lineHeight: 1.2
                            }}>
                              {tx.category}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            fontSize: '19px',
                            fontWeight: '600',
                            color: '#000000'
                          }}>
                            {tx.amount}
                          </span>
                          <ChevronRightIcon color="#C7C7CC" />
                        </div>
                      </div>

                      {idx < group.items.length - 1 && (
                        <div style={{
                          height: '1px',
                          backgroundColor: '#F2F2F4',
                          marginLeft: '86px',
                          width: 'calc(100% - 86px)'
                        }} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =====================================================================
          REQUISITES MODAL (Реквизиты карты и счета)
      ===================================================================== */}
      {showRequisitesModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '430px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px 20px 0 0',
            padding: '20px 20px 36px 20px',
            boxSizing: 'border-box'
          }}>
            {/* Modal top drag pill */}
            <div style={{
              width: '36px',
              height: '4px',
              backgroundColor: '#D1D1D6',
              borderRadius: '2px',
              margin: '0 auto 16px auto'
            }} />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#000000' }}>
                Реквизиты карты и счета
              </span>
              <button
                type="button"
                onClick={() => setShowRequisitesModal(false)}
                className="touchable"
                style={{
                  background: '#F2F2F4',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#8E8E93',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Card Number */}
              <div
                onClick={() => copyToClipboard('4400 4303 6188 4163', 'card')}
                className="touchable"
                style={{
                  padding: '16px 16px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ color: '#8E8E93', fontSize: '13.5px' }}>Номер карты</div>
                  <div style={{ fontWeight: '600', fontSize: '18px', color: '#000000', marginTop: '2px' }}>
                    4400 4303 6188 4163
                  </div>
                </div>
                <span style={{ fontSize: '14.5px', color: copiedField === 'card' ? '#27A13B' : '#E2464A', fontWeight: '500' }}>
                  {copiedField === 'card' ? 'Скопировано' : 'Скопировать'}
                </span>
              </div>

              {/* Cardholder Name */}
              <div style={{
                padding: '16px 16px',
                backgroundColor: '#F8F8FA',
                borderRadius: '12px'
              }}>
                <div style={{ color: '#8E8E93', fontSize: '13.5px' }}>Имя на карте</div>
                <div style={{ fontWeight: '600', fontSize: '17px', color: '#000000', marginTop: '2px' }}>
                  PARASSAT ZHUMASH
                </div>
              </div>

              {/* Expiry & CVV */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{
                  padding: '16px 16px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px'
                }}>
                  <div style={{ color: '#8E8E93', fontSize: '13.5px' }}>Срок действия</div>
                  <div style={{ fontWeight: '600', fontSize: '17px', color: '#000000', marginTop: '2px' }}>
                    09/29
                  </div>
                </div>
                <div style={{
                  padding: '16px 16px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px'
                }}>
                  <div style={{ color: '#8E8E93', fontSize: '13.5px' }}>CVV</div>
                  <div style={{ fontWeight: '600', fontSize: '17px', color: '#000000', marginTop: '2px' }}>
                    •••
                  </div>
                </div>
              </div>

              {/* IBAN */}
              <div
                onClick={() => copyToClipboard('KZ54722C000021658491', 'iban')}
                className="touchable"
                style={{
                  padding: '16px 16px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ color: '#8E8E93', fontSize: '13.5px' }}>Счет (IBAN)</div>
                  <div style={{ fontWeight: '600', fontSize: '16px', color: '#000000', marginTop: '2px' }}>
                    KZ54722C000021658491
                  </div>
                </div>
                <span style={{ fontSize: '14.5px', color: copiedField === 'iban' ? '#27A13B' : '#E2464A', fontWeight: '500' }}>
                  {copiedField === 'iban' ? 'Скопировано' : 'Скопировать'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
