import React, { useState } from 'react';
import {
  ArrowLeft, ChevronRight, ArrowRightLeft, User, Building2,
  PlusCircle, Globe, Search, QrCode, CreditCard, Smartphone
} from 'lucide-react';

export const TransfersScreen = ({ card, onBack, onCompleteTransfer }) => {
  const [activeTab, setActiveTab] = useState('my'); // 'my' | 'history'
  const [subMode, setSubMode] = useState('list'); // 'list' | 'client_kaspi'
  const [clientTab, setClientTab] = useState('phone'); // 'phone' | 'card' | 'qr'
  const [phone, setPhone] = useState('+7 (7');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const transferOptions = [
    { id: 'between', title: 'Между своими счетами', subtitle: null, icon: ArrowRightLeft },
    { id: 'client_kaspi', title: 'Клиенту Kaspi', subtitle: 'По номеру телефона или карты', icon: User, onClick: () => setSubMode('client_kaspi') },
    { id: 'client_other', title: 'Клиенту другого банка', subtitle: 'По номеру телефона или карты', icon: Building2 },
    { id: 'topup', title: 'Пополнить Kaspi Gold', subtitle: 'С карты другого банка', icon: PlusCircle },
    { id: 'international', title: 'Международные переводы', subtitle: 'По номеру карты или телефона', icon: Globe }
  ];

  const handleNumpad = (digit) => {
    if (amount.length < 8) {
      setAmount(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setAmount(prev => prev.slice(0, -1));
  };

  const handleExecuteTransfer = () => {
    const sum = parseInt(amount, 10);
    if (!sum || sum <= 0) return;

    setShowSuccess(true);
    setTimeout(() => {
      onCompleteTransfer({
        title: 'Клиенту Kaspi',
        category: 'Перевод',
        amount: -sum,
        currency: '₸',
        time: 'Только что',
        card: 'Kaspi Gold',
        receiptAvailable: true
      });
      setShowSuccess(false);
      setSubMode('list');
      setAmount('');
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F2F2F2',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '30px'
    }}>
      {/* Top Header */}
      <div style={{
        height: '48px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EBEBEB',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px'
      }}>
        <div
          onClick={() => {
            if (subMode === 'client_kaspi') {
              setSubMode('list');
            } else {
              onBack();
            }
          }}
          className="touchable"
          style={{ padding: '6px' }}
        >
          <ArrowLeft size={22} color="#1F1F1F" />
        </div>
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
          {subMode === 'client_kaspi' ? 'Клиенту Kaspi' : 'Переводы'}
        </span>
      </div>

      {subMode === 'list' ? (
        <>
          {/* Main Tabs: Мои Переводы / История */}
          <div style={{
            display: 'flex',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #EBEBEB',
            height: '44px'
          }}>
            <div
              onClick={() => setActiveTab('my')}
              className="touchable"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: activeTab === 'my' ? '700' : '500',
                color: activeTab === 'my' ? '#F14635' : '#757575',
                position: 'relative'
              }}
            >
              Мои Переводы
              {activeTab === 'my' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '20%',
                  right: '20%',
                  height: '2px',
                  backgroundColor: '#F14635'
                }} />
              )}
            </div>

            <div
              onClick={() => setActiveTab('history')}
              className="touchable"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: activeTab === 'history' ? '700' : '500',
                color: activeTab === 'history' ? '#F14635' : '#757575',
                position: 'relative'
              }}
            >
              История
              {activeTab === 'history' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '20%',
                  right: '20%',
                  height: '2px',
                  backgroundColor: '#F14635'
                }} />
              )}
            </div>
          </div>

          {activeTab === 'my' ? (
            /* Options list */
            <div style={{
              backgroundColor: '#FFFFFF',
              marginTop: '12px',
              borderTop: '1px solid #EBEBEB',
              borderBottom: '1px solid #EBEBEB'
            }}>
              {transferOptions.map((opt, idx) => {
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.id}
                    onClick={opt.onClick}
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
                          {opt.title}
                        </div>
                        {opt.subtitle && (
                          <div style={{ fontSize: '12px', color: '#757575', marginTop: '1px' }}>
                            {opt.subtitle}
                          </div>
                        )}
                      </div>
                    </div>

                    <ChevronRight size={18} color="#C2C2C2" />
                  </div>
                );
              })}
            </div>
          ) : (
            /* Transfers History */
            <div>
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '10px 16px',
                borderBottom: '1px solid #EBEBEB',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Search size={16} color="#969696" />
                <input
                  type="text"
                  placeholder="Поиск по переводам"
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
                />
              </div>

              <div style={{ padding: '8px 16px', fontSize: '12px', color: '#757575', fontWeight: '600' }}>
                24 СЕНТЯБРЯ
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600' }}>Kaspi Gold → Аружан М.</div>
                    <div style={{ fontSize: '12px', color: '#757575' }}>Клиенту Kaspi</div>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '15px' }}>-110 ₸</div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Submode: Клиенту Kaspi Form */
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {showSuccess ? (
            <div style={{
              padding: '60px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#00AB56',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                marginBottom: '16px',
                fontSize: '28px'
              }}>
                ✓
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>Перевод отправлен!</div>
              <div style={{ fontSize: '15px', color: '#757575', marginTop: '6px' }}>
                {parseInt(amount || '0').toLocaleString('ru-RU')} ₸
              </div>
            </div>
          ) : (
            <>
              {/* Account Selection Card */}
              <div style={{
                margin: '12px 16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '20px',
                    borderRadius: '3px',
                    background: 'linear-gradient(135deg, #ECC880 0%, #C49B4B 100%)'
                  }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>Kaspi Gold</div>
                    <div style={{ fontSize: '11px', color: '#757575' }}>*{card.last4}</div>
                  </div>
                </div>

                <div style={{ fontSize: '15px', fontWeight: '700' }}>
                  {card.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₸
                </div>
              </div>

              {/* Sub-tabs: Телефон | Карта | Kaspi QR */}
              <div style={{
                display: 'flex',
                margin: '0 16px 12px 16px',
                backgroundColor: '#EAEAEA',
                borderRadius: '8px',
                padding: '3px'
              }}>
                {[
                  { id: 'phone', label: 'Телефон', icon: Smartphone },
                  { id: 'card', label: 'Карта', icon: CreditCard },
                  { id: 'qr', label: 'Kaspi QR', icon: QrCode }
                ].map((t) => {
                  const Icon = t.icon;
                  const isSel = clientTab === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setClientTab(t.id)}
                      className="touchable"
                      style={{
                        flex: 1,
                        padding: '6px',
                        borderRadius: '6px',
                        backgroundColor: isSel ? '#FFFFFF' : 'transparent',
                        fontSize: '13px',
                        fontWeight: isSel ? '700' : '500',
                        color: isSel ? '#1F1F1F' : '#757575',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <Icon size={14} />
                      {t.label}
                    </div>
                  );
                })}
              </div>

              {/* Input: Phone */}
              <div style={{
                margin: '0 16px 12px 16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '10px 14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <div style={{ fontSize: '11px', color: '#757575' }}>Телефон получателя</div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '17px',
                    fontWeight: '600',
                    width: '100%',
                    marginTop: '4px'
                  }}
                />
              </div>

              {/* Input: Amount */}
              <div style={{
                margin: '0 16px 16px 16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '12px 14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#757575' }}>Сумма перевода</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#1F1F1F', marginTop: '2px' }}>
                    {amount ? parseInt(amount).toLocaleString('ru-RU') : '0'} ₸
                  </div>
                </div>

                <span style={{ fontSize: '13px', color: '#757575' }}>Без комиссии</span>
              </div>

              {/* Blue Action Button */}
              <div style={{ padding: '0 16px 16px 16px' }}>
                <button
                  onClick={handleExecuteTransfer}
                  disabled={!amount || parseInt(amount) <= 0}
                  className="touchable"
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: amount && parseInt(amount) > 0 ? '#007AFF' : '#B2D7FF',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '700',
                    boxShadow: amount ? '0 4px 12px rgba(0, 122, 255, 0.3)' : 'none'
                  }}
                >
                  Перевести {amount ? parseInt(amount).toLocaleString('ru-RU') + ' ₸' : '0 ₸'}
                </button>
              </div>

              {/* Bottom Numpad */}
              <div style={{
                marginTop: 'auto',
                backgroundColor: '#FFFFFF',
                borderTop: '1px solid #EBEBEB',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                rowGap: '12px',
                padding: '12px 20px 20px 20px'
              }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <div
                    key={n}
                    onClick={() => handleNumpad(n.toString())}
                    className="touchable"
                    style={{
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      fontWeight: '500',
                      userSelect: 'none'
                    }}
                  >
                    {n}
                  </div>
                ))}
                <div style={{ height: '48px' }} />
                <div
                  onClick={() => handleNumpad('0')}
                  className="touchable"
                  style={{
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: '500',
                    userSelect: 'none'
                  }}
                >
                  0
                </div>
                <div
                  onClick={handleBackspace}
                  className="touchable"
                  style={{
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ⌫
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
