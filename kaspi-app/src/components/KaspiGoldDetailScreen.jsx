import React, { useState } from 'react';
import {
  ArrowLeft, ChevronRight, Eye, EyeOff, Share2, Search,
  QrCode, ArrowRightLeft, PlusCircle, Globe, BellRing,
  Banknote, RefreshCw, KeyRound, Lock, Smartphone, XCircle,
  BarChart2, CreditCard, FileText, HelpCircle, MapPin, Lightbulb
} from 'lucide-react';

export const KaspiGoldDetailScreen = ({ card, statement, onBack, onOpenQr, onOpenTransfer }) => {
  const [activeTab, setActiveTab] = useState('actions'); // 'actions' | 'info' | 'statement'
  const [showBalance, setShowBalance] = useState(true);
  const [showRequisitesModal, setShowRequisitesModal] = useState(false);

  const actionsList = [
    { id: 'qr', title: 'Kaspi QR', icon: QrCode, onClick: onOpenQr },
    { id: 'transfer', title: 'Перевести', icon: ArrowRightLeft, onClick: onOpenTransfer },
    { id: 'topup', title: 'Пополнить Kaspi Gold', icon: PlusCircle },
    { id: 'webpay', title: 'Оплата в интернете', icon: Globe },
    { id: 'subscriptions', title: 'Платные сервисы и подписки', icon: BellRing },
    { id: 'order_cash', title: 'Заказать сумму на снятие', subtitle: 'Лимит 4 000 000 ₸', icon: Banknote },
    { id: 'reissue', title: 'Перевыпустить Kaspi Gold', icon: RefreshCw },
    { id: 'pin', title: 'Сменить ПИН-код', icon: KeyRound },
    { id: 'block', title: 'Заблокировать карту', icon: Lock },
    { id: 'cardless', title: 'Снять деньги без карты', icon: Smartphone },
    { id: 'close', title: 'Закрыть Kaspi Gold', icon: XCircle }
  ];

  const infoList = [
    { id: 'analytics', title: 'Аналитика покупок', icon: BarChart2 },
    { id: 'limit', title: 'Лимит на снятие наличных', subtitle: `Осталось в этом месяце: ${card.cashWithdrawalLimit}`, icon: Banknote },
    { id: 'reqs', title: 'Реквизиты карты и счета', icon: CreditCard, onClick: () => setShowRequisitesModal(true) },
    { id: 'certificates', title: 'Справки', subtitle: 'О наличии счета, о доступном остатке', icon: FileText },
    { id: 'conditions', title: 'Условия Kaspi Gold', icon: HelpCircle },
    { id: 'atms', title: 'Терминалы и банкоматы', icon: MapPin },
    { id: 'tips', title: 'Полезные советы', icon: Lightbulb }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F2F2F2',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '40px'
    }}>
      {/* Top Gold Card Banner Header */}
      <div style={{
        background: 'linear-gradient(135deg, #E6C280 0%, #D5AE6C 50%, #C49B4B 100%)',
        padding: 'max(env(safe-area-inset-top), 12px) 16px 20px 16px',
        color: '#FFFFFF',
        position: 'relative',
        boxShadow: '0 4px 12px rgba(196, 155, 75, 0.25)'
      }}>
        {/* Navigation line */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '18px'
        }}>
          <div onClick={onBack} className="touchable" style={{ padding: '6px' }}>
            <ArrowLeft size={22} color="#FFFFFF" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              {card.name} *{card.last4}
            </span>
            <div style={{
              width: '24px',
              height: '16px',
              borderRadius: '3px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '8px', color: '#D5AE6C', fontWeight: 'bold' }}>MC</span>
            </div>
          </div>

          <div style={{ width: '32px' }} />
        </div>

        {/* Silhouette Family Logo Badge on Right */}
        <div style={{
          position: 'absolute',
          right: '16px',
          top: '52px',
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(2px)'
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>

        {/* Balance Display */}
        <div style={{ marginTop: '10px' }}>
          <div style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: '500',
            marginBottom: '4px'
          }}>
            Доступно
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '28px',
              fontWeight: '700',
              letterSpacing: '0.2px'
            }}>
              {showBalance ? card.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2 }) + ' ₸' : '•••••••• ₸'}
            </span>

            <div
              onClick={() => setShowBalance(!showBalance)}
              className="touchable"
              style={{ padding: '4px' }}
            >
              {showBalance ? <Eye size={20} color="#FFFFFF" /> : <EyeOff size={20} color="#FFFFFF" />}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Tabs Bar: Действия / Инфо / Выписка */}
      <div style={{
        display: 'flex',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EBEBEB',
        height: '46px'
      }}>
        {[
          { id: 'actions', label: 'Действия' },
          { id: 'info', label: 'Инфо' },
          { id: 'statement', label: 'Выписка' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="touchable"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#F14635' : '#757575',
                position: 'relative'
              }}
            >
              {tab.label}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '20%',
                  right: '20%',
                  height: '2.5px',
                  backgroundColor: '#F14635',
                  borderRadius: '2px 2px 0 0'
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Content for TAB 1: ДЕЙСТВИЯ */}
      {activeTab === 'actions' && (
        <div style={{
          backgroundColor: '#FFFFFF',
          marginTop: '12px',
          borderTop: '1px solid #EBEBEB',
          borderBottom: '1px solid #EBEBEB'
        }}>
          {actionsList.map((action, idx) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                onClick={action.onClick}
                className="touchable"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderTop: idx > 0 ? '1px solid #F4F4F4' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Icon size={22} color="#F14635" strokeWidth={1.75} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#1F1F1F' }}>
                      {action.title}
                    </div>
                    {action.subtitle && (
                      <div style={{ fontSize: '12px', color: '#757575', marginTop: '1px' }}>
                        {action.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                <ChevronRight size={18} color="#C2C2C2" />
              </div>
            );
          })}
        </div>
      )}

      {/* Content for TAB 2: ИНФО */}
      {activeTab === 'info' && (
        <div style={{
          backgroundColor: '#FFFFFF',
          marginTop: '12px',
          borderTop: '1px solid #EBEBEB',
          borderBottom: '1px solid #EBEBEB'
        }}>
          {infoList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.onClick}
                className="touchable"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderTop: idx > 0 ? '1px solid #F4F4F4' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Icon size={22} color="#F14635" strokeWidth={1.75} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#1F1F1F' }}>
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div style={{ fontSize: '12px', color: '#757575', marginTop: '1px' }}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                <ChevronRight size={18} color="#C2C2C2" />
              </div>
            );
          })}
        </div>
      )}

      {/* Content for TAB 3: ВЫПИСКА */}
      {activeTab === 'statement' && (
        <div>
          {/* Date Picker Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #EBEBEB'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F1F1F' }}>
              29 августа — 29 сентября
            </div>
            <Share2 size={18} color="#757575" className="touchable" />
          </div>

          {/* Search in operations */}
          <div style={{
            padding: '10px 16px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #EBEBEB',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Search size={16} color="#969696" />
            <input
              type="text"
              placeholder="Поиск по операциям"
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                width: '100%',
                color: '#1F1F1F'
              }}
            />
          </div>

          {/* Grouped Statement List */}
          {statement.map((group) => (
            <div key={group.date} style={{ marginTop: '12px' }}>
              <div style={{
                padding: '6px 16px',
                fontSize: '12px',
                color: '#757575',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {group.date}
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                borderTop: '1px solid #EBEBEB',
                borderBottom: '1px solid #EBEBEB'
              }}>
                {group.items.map((tx, idx) => (
                  <div
                    key={tx.id}
                    className="touchable"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '14px 16px',
                      borderTop: idx > 0 ? '1px solid #F4F4F4' : 'none'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>
                        {tx.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#757575', marginTop: '2px' }}>
                        {tx.category}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>
                        {tx.amount.toLocaleString('ru-RU')} ₸
                      </div>
                      <div style={{ fontSize: '11px', color: '#0089D0', marginTop: '2px' }}>
                        Чек об оплате
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Requisites Modal (Реквизиты карты и счета) */}
      {showRequisitesModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px 16px 0 0',
            padding: '20px 20px 30px 20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '18px', fontWeight: '700' }}>Реквизиты</span>
              <div
                onClick={() => setShowRequisitesModal(false)}
                className="touchable"
                style={{ padding: '6px', color: '#757575' }}
              >
                ✕
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
              <div>
                <div style={{ color: '#757575', fontSize: '12px' }}>Номер карты</div>
                <div style={{ fontWeight: '600', fontSize: '16px', letterSpacing: '0.5px' }}>{card.cardNumberFormatted}</div>
              </div>

              <div>
                <div style={{ color: '#757575', fontSize: '12px' }}>Имя на карте</div>
                <div style={{ fontWeight: '600' }}>PARASSAT ZHUMASH</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <div style={{ color: '#757575', fontSize: '12px' }}>Срок действия</div>
                  <div style={{ fontWeight: '600' }}>{card.expiry}</div>
                </div>
                <div>
                  <div style={{ color: '#757575', fontSize: '12px' }}>CVV</div>
                  <div style={{ fontWeight: '600' }}>{card.cvv}</div>
                </div>
              </div>

              <div>
                <div style={{ color: '#757575', fontSize: '12px' }}>Счет (IBAN)</div>
                <div style={{ fontWeight: '600', fontSize: '13px' }}>{card.iban}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
