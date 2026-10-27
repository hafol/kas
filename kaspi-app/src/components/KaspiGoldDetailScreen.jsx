import React, { useState } from 'react';
import {
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

// Chevron right: grey > matching native iOS Kaspi hairline
const ChevronRightIcon = ({ size = 13, color = "#C7C7CC" }) => (
  <svg width={size} height={size} viewBox="0 0 8 13" fill="none">
    <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Back chevron < matching native iOS navigation bar
const BackChevronIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 12 20" fill="none">
    <path d="M10 2L2 10L10 18" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Share / Export icon (square with upward right arrow)
const ShareExportIcon = ({ size = 20, color = "#8E8E93" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="16 6 12 2 8 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="2" x2="12" y2="15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Search Magnifier icon
const SearchIcon = ({ size = 17, color = "#8E8E93" }) => (
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

  // 10 items for TAB 1: ДЕЙСТВИЯ (exact match with Screenshot 1)
  const actionsList = [
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
        backgroundColor: '#D4AE6D',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
        boxSizing: 'border-box'
      }}
    >
      {/* Sticky Compact Header (Screenshots 1 & 2) */}
      <div style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? '#D4AE6D' : 'transparent',
        height: 'calc(44px + max(env(safe-area-inset-top, 44px), 44px))',
        paddingTop: 'max(env(safe-area-inset-top, 44px), 44px)',
        paddingLeft: '16px',
        paddingRight: '16px',
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
          <BackChevronIcon size={20} color="#FFFFFF" />
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
            112 022,58 ₸
          </span>
        </div>

        {/* Empty placeholder for symmetry */}
        <div style={{ width: '36px' }} />
      </div>

      {/* =====================================================================
          EXPANDED GOLDEN CARD HEADER (Screenshots 3, 4, 5)
          Uses authentic user asset /kaspi_assets/kaspi_gold_card_bg.jpg
      ===================================================================== */}
      <div style={{
        marginTop: 'calc(-44px - max(env(safe-area-inset-top, 44px), 44px))',
        paddingTop: 'calc(44px + max(env(safe-area-inset-top, 44px), 44px) + 6px)',
        background: '#D4AE6D url(/kaspi_assets/kaspi_gold_card_bg.jpg) no-repeat right 0px top / cover',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '24px',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Card Name + Apple Pay badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '6px'
        }}>
          <span style={{
            fontSize: '19px',
            fontWeight: '700',
            color: '#FFFFFF',
            letterSpacing: '0.1px',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>
            Kaspi Gold *{card.last4}
          </span>
          <ApplePayBadge style={{ marginLeft: '8px' }} />
        </div>

        {/* Caption "Доступно" */}
        <div style={{
          fontSize: '14px',
          fontWeight: '400',
          color: 'rgba(255, 255, 255, 0.92)',
          marginTop: '16px',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          Доступно
        </div>

        {/* Big Balance: 112 022,58 ₸ */}
        <div style={{
          fontSize: '34px',
          fontWeight: '700',
          color: '#FFFFFF',
          letterSpacing: '-0.3px',
          lineHeight: '1.15',
          marginTop: '2px',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          112 022,58 ₸
        </div>
      </div>

      {/* =====================================================================
          MAIN WHITE SHEET (Rounded top corners: 16px)
      ===================================================================== */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        marginTop: '-12px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 2,
        paddingBottom: 'calc(180px + env(safe-area-inset-bottom, 34px))'
      }}>
        {/* =====================================================================
            SEGMENTED CONTROL (Действия / Инфо / Выписка) - Sticky on scroll
        ===================================================================== */}
        <div style={{
          position: 'sticky',
          top: 'calc(44px + max(env(safe-area-inset-top, 44px), 44px))',
          zIndex: 40,
          backgroundColor: '#FFFFFF',
          padding: '10px 16px 8px 16px',
          borderTopLeftRadius: isScrolled ? '0' : '16px',
          borderTopRightRadius: isScrolled ? '0' : '16px',
          boxSizing: 'border-box',
          transition: 'border-radius 0.15s ease'
        }}>
          <div style={{
            backgroundColor: '#F0F0F2',
            height: '36px',
            borderRadius: '10px',
            padding: '2px',
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
                  height: '32px',
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
                  fontWeight: isActive ? '500' : '400',
                  color: '#000000',
                  boxShadow: isActive ? '0 2px 4px rgba(0, 0, 0, 0.08), 0 1px 1px rgba(0, 0, 0, 0.04)' : 'none',
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
            TAB 1: ДЕЙСТВИЯ (Screenshot 1)
        ===================================================================== */}
        {activeTab === 'actions' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {actionsList.map((action, idx) => {
              const { IconComponent } = action;
              return (
                <React.Fragment key={action.id}>
                  <div
                    onClick={action.onClick}
                    className="touchable"
                    style={{
                      height: action.subtitle ? '58px' : '52px',
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={24} color="#DF4337" />
                      </div>

                      <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column' }}>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '400',
                          color: '#1A1A1A',
                          lineHeight: 1.25
                        }}>
                          {action.title}
                        </span>
                        {action.subtitle && (
                          <span style={{
                            fontSize: '12px',
                            fontWeight: '400',
                            color: '#8E8E93',
                            marginTop: '2px',
                            lineHeight: 1.2
                          }}>
                            {action.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRightIcon size={13} color="#C7C7CC" />
                  </div>

                  {idx < actionsList.length - 1 && (
                    <div style={{
                      height: '1px',
                      backgroundColor: '#F2F2F4',
                      marginLeft: '60px',
                      width: 'calc(100% - 60px)'
                    }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* =====================================================================
            TAB 2: ИНФО (Screenshot 2)
        ===================================================================== */}
        {activeTab === 'info' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {infoList.map((item, idx) => {
              const { IconComponent } = item;
              return (
                <React.Fragment key={item.id}>
                  <div
                    onClick={item.onClick}
                    className="touchable"
                    style={{
                      height: item.subtitle ? '58px' : '52px',
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={24} color="#DF4337" />
                      </div>

                      <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column' }}>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '400',
                          color: '#1A1A1A',
                          lineHeight: 1.25
                        }}>
                          {item.title}
                        </span>
                        {item.subtitle && (
                          <span style={{
                            fontSize: '12px',
                            fontWeight: '400',
                            color: '#8E8E93',
                            marginTop: '2px',
                            lineHeight: 1.2
                          }}>
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRightIcon size={13} color="#C7C7CC" />
                  </div>

                  {idx < infoList.length - 1 && (
                    <div style={{
                      height: '1px',
                      backgroundColor: '#F2F2F4',
                      marginLeft: '60px',
                      width: 'calc(100% - 60px)'
                    }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* =====================================================================
            TAB 3: ВЫПИСКА (Screenshot 3)
        ===================================================================== */}
        {activeTab === 'statement' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Search Input: "Поиск по операциям" */}
            <div style={{
              margin: '8px 16px 12px 16px',
              backgroundColor: '#F2F2F4',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '10px',
              paddingRight: '10px',
              boxSizing: 'border-box'
            }}>
              <SearchIcon size={17} color="#8E8E93" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по операциям"
                style={{
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  marginLeft: '8px',
                  width: '100%',
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: '15px',
                  color: '#000000'
                }}
              />
            </div>

            {/* Date Range Row: Red Calendar + "26 сентября - 26 октября" + Share/Export */}
            <div style={{
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }} className="touchable">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <StatementCalendarIcon size={24} color="#DF4337" />
                </div>
                <span style={{
                  marginLeft: '12px',
                  fontSize: '16px',
                  fontWeight: '400',
                  color: '#000000'
                }}>
                  26 сентября - 26 октября
                </span>
              </div>

              <div className="touchable" style={{ padding: '4px' }}>
                <ShareExportIcon size={20} color="#8E8E93" />
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#F2F2F4', marginLeft: '60px', width: 'calc(100% - 60px)' }} />

            {/* Summary Row: "Операции" + "+ 1 059 650 ₸" / "- 970 912,39 ₸" */}
            <div style={{
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }} className="touchable">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <StatementOperationsReceiptIcon size={24} color="#DF4337" />
                </div>
                <span style={{
                  marginLeft: '12px',
                  fontSize: '16px',
                  fontWeight: '400',
                  color: '#000000'
                }}>
                  Операции
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#27A13B',
                    lineHeight: 1.25
                  }}>
                    + 1 059 650 ₸
                  </span>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: '400',
                    color: '#757575',
                    marginTop: '2px',
                    lineHeight: 1.2
                  }}>
                    - 970 912,39 ₸
                  </span>
                </div>
                <ChevronRightIcon size={13} color="#C7C7CC" />
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#F2F2F4', marginLeft: '60px', width: 'calc(100% - 60px)' }} />

            {/* Grouped Transactions List by Date */}
            {statementGroups.map((group) => (
              <div key={group.date} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Date Header: e.g. "23 октября" */}
                <div style={{
                  padding: '16px 16px 8px 16px',
                  fontSize: '17px',
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
                          padding: '12px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {/* Circular icon container */}
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#F5F5F7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Icon size={20} color="#262626" />
                          </div>

                          <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column' }}>
                            <span style={{
                              fontSize: '16px',
                              fontWeight: '500',
                              color: '#000000',
                              lineHeight: 1.25
                            }}>
                              {tx.title}
                            </span>
                            <span style={{
                              fontSize: '13px',
                              fontWeight: '400',
                              color: '#8E8E93',
                              marginTop: '2px',
                              lineHeight: 1.2
                            }}>
                              {tx.category}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#000000'
                          }}>
                            {tx.amount}
                          </span>
                          <ChevronRightIcon size={13} color="#C7C7CC" />
                        </div>
                      </div>

                      {idx < group.items.length - 1 && (
                        <div style={{
                          height: '1px',
                          backgroundColor: '#F2F2F4',
                          marginLeft: '68px',
                          width: 'calc(100% - 68px)'
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
                  padding: '12px 14px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ color: '#8E8E93', fontSize: '12px' }}>Номер карты</div>
                  <div style={{ fontWeight: '600', fontSize: '16px', color: '#000000', marginTop: '2px' }}>
                    4400 4303 6188 4163
                  </div>
                </div>
                <span style={{ fontSize: '13px', color: copiedField === 'card' ? '#27A13B' : '#E2464A', fontWeight: '500' }}>
                  {copiedField === 'card' ? 'Скопировано' : 'Скопировать'}
                </span>
              </div>

              {/* Cardholder Name */}
              <div style={{
                padding: '12px 14px',
                backgroundColor: '#F8F8FA',
                borderRadius: '12px'
              }}>
                <div style={{ color: '#8E8E93', fontSize: '12px' }}>Имя на карте</div>
                <div style={{ fontWeight: '600', fontSize: '15px', color: '#000000', marginTop: '2px' }}>
                  PARASSAT ZHUMASH
                </div>
              </div>

              {/* Expiry & CVV */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{
                  padding: '12px 14px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px'
                }}>
                  <div style={{ color: '#8E8E93', fontSize: '12px' }}>Срок действия</div>
                  <div style={{ fontWeight: '600', fontSize: '15px', color: '#000000', marginTop: '2px' }}>
                    09/29
                  </div>
                </div>
                <div style={{
                  padding: '12px 14px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px'
                }}>
                  <div style={{ color: '#8E8E93', fontSize: '12px' }}>CVV</div>
                  <div style={{ fontWeight: '600', fontSize: '15px', color: '#000000', marginTop: '2px' }}>
                    •••
                  </div>
                </div>
              </div>

              {/* IBAN */}
              <div
                onClick={() => copyToClipboard('KZ54722C000021658491', 'iban')}
                className="touchable"
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ color: '#8E8E93', fontSize: '12px' }}>Счет (IBAN)</div>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#000000', marginTop: '2px' }}>
                    KZ54722C000021658491
                  </div>
                </div>
                <span style={{ fontSize: '13px', color: copiedField === 'iban' ? '#27A13B' : '#E2464A', fontWeight: '500' }}>
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
