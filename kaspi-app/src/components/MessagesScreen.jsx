import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export const MessagesScreen = ({ messages, onBack }) => {
  const [activeCategory, setActiveCategory] = useState('notifications'); // 'notifications' | 'chats'
  const [selectedThread, setSelectedThread] = useState(null);

  // Exact icons matching user video frame_075.png
  const renderItemIcon = (type) => {
    switch (type) {
      case 'gold':
        return (
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#FFBE2E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="#FFFFFF" strokeWidth="2.2" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="7" cy="14" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
        );
      case 'shop':
        return (
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#0084F4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 5h2.5l2.2 10.5a1.2 1.2 0 0 0 1.2.9h9.8a1.2 1.2 0 0 0 1.2-.9L22 8H6.5"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="19.5" r="1.5" fill="#FFFFFF" />
              <circle cx="18" cy="19.5" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
        );
      case 'gift':
        return (
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#FF6433',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="8" width="18" height="13" rx="2" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="21" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="3" y1="13" x2="21" y2="13" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M12 8C12 5.5 8.5 5 8.5 7.5S12 8 12 8z" stroke="#FFFFFF" strokeWidth="1.8" />
              <path d="M12 8C12 5.5 15.5 5 15.5 7.5S12 8 12 8z" stroke="#FFFFFF" strokeWidth="1.8" />
            </svg>
          </div>
        );
      case 'pay':
        return (
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#FFCC00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 4h14a1 1 0 0 1 1 1v15l-3-1.5-3 1.5-3-1.5-3 1.5-3-1.5V5a1 1 0 0 1 1-1z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <line x1="8" y1="8.5" x2="16" y2="8.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="12.5" x2="13" y2="12.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'guide':
      default:
        return (
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#F14635',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V5z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <line x1="8" y1="9" x2="16" y2="9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="13" x2="13" y2="13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '40px'
    }}>
      {/* 1. Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 'calc(48px + env(safe-area-inset-top, 0px))',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #F0F0F0',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
        boxSizing: 'border-box',
        gap: '12px'
      }}>
        {selectedThread ? (
          <>
            <div onClick={() => setSelectedThread(null)} className="touchable" style={{ padding: '6px' }}>
              <ArrowLeft size={22} color="#1F1F1F" />
            </div>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
              {selectedThread.title}
            </span>
          </>
        ) : (
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
            Сообщения
          </span>
        )}
      </div>

      {!selectedThread ? (
        <>
          {/* 2. Top Category Buttons (Exact from user video frame_075.png) */}
          <div style={{
            display: 'flex',
            gap: '24px',
            padding: '16px 20px',
            borderBottom: '8px solid #F7F7F7'
          }}>
            {/* Button 1: Уведомления */}
            <div
              onClick={() => setActiveCategory('notifications')}
              className="touchable"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#F14635',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: activeCategory === 'notifications' ? '0 2px 8px rgba(241, 70, 53, 0.35)' : 'none'
                }}>
                  {/* Official Kaspi Logo silhouette */}
                  <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                    <path
                      d="M18,6c6.508,0 11.806,5.133 11.994,11.537l0.005,0.301v0.103c-0.012,2.909 -1.083,5.57 -2.846,7.63 -0.064,-0.032 -0.18,-0.137 -0.392,-0.453 -0.22,-0.318 -2.106,-3.222 -2.106,-6.55 0,-0.653 0.942,-1.673 1.775,-2.568 0.622,-0.674 1.212,-1.31 1.43,-1.81 0.276,-0.644 0.082,-1.094 -0.224,-1.247 -0.277,-0.135 -0.693,-0.036 -0.985,0.482 -0.479,0.84 -0.632,0.996 -1.331,1.558 -0.688,0.561 -1.781,1.126 -1.781,0.395 0,-0.395 0.609,-1.29 0.91,-1.916 0.307,-0.634 -0.024,-1.093 -0.659,-1.093 -1.245,0 -2.072,1.587 -2.072,2.136 0,0.55 0.266,0.628 0.266,1.268 0,0.644 -1.367,1.48 -2.654,1.48 -1.22,0 -1.935,-0.243 -2.241,-0.924l-0.053,-0.133 -0.086,-0.254c-0.306,-0.893 -0.525,-1.54 -0.906,-2.217 -0.203,-0.358 -0.515,-0.606 -0.785,-0.824 -0.353,-0.274 -0.537,-0.527 -0.575,-0.715 -0.035,-0.187 -0.054,-0.54 0.55,-1.351 0.602,-0.807 0.687,-1.417 0.385,-1.732 -0.11,-0.112 -0.296,-0.184 -0.535,-0.184 -0.423,0 -1.01,0.225 -1.617,0.84 -0.942,0.966 -0.407,1.882 -0.407,2.284 0,0.402 -0.173,0.63 -0.738,1.177 -0.57,0.55 -0.766,1.02 -0.831,2.913 -0.025,0.976 -0.197,1.537 -0.351,2.035 -0.133,0.436 -0.256,0.846 -0.262,1.44 -0.01,0.656 0.098,1.08 0.226,1.568 0.125,0.451 0.258,0.968 0.344,1.834 0.132,1.306 0.09,2.414 -0.14,3.54l-0.084,0.377 -0.016,0.083c-0.05,0.203 -0.11,0.45 -0.191,0.543C7.98,25.395 6,21.873 6,17.89 6,11.324 11.373,6 18,6z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </div>

                {/* Badge 2 */}
                <div style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-5px',
                  backgroundColor: '#F14635',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '10px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid #FFFFFF'
                }}>
                  2
                </div>
              </div>

              <span style={{
                fontSize: '12px',
                fontWeight: activeCategory === 'notifications' ? '700' : '500',
                color: activeCategory === 'notifications' ? '#F14635' : '#757575',
                marginTop: '6px'
              }}>
                Уведомления
              </span>
            </div>

            {/* Button 2: Чаты */}
            <div
              onClick={() => setActiveCategory('chats')}
              className="touchable"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#0084F4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: activeCategory === 'chats' ? '0 2px 8px rgba(0, 132, 244, 0.35)' : 'none'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="15" rx="3" fill="#FFFFFF" />
                  <path d="M7 18l-3 4V18H7z" fill="#FFFFFF" />
                  <circle cx="8" cy="10.5" r="1.3" fill="#0084F4" />
                  <circle cx="12" cy="10.5" r="1.3" fill="#0084F4" />
                  <circle cx="16" cy="10.5" r="1.3" fill="#0084F4" />
                </svg>
              </div>

              <span style={{
                fontSize: '12px',
                fontWeight: activeCategory === 'chats' ? '700' : '500',
                color: activeCategory === 'chats' ? '#0084F4' : '#757575',
                marginTop: '6px'
              }}>
                Чаты
              </span>
            </div>
          </div>

          {/* 3. Messages List */}
          <div style={{ backgroundColor: '#FFFFFF' }}>
            {messages.notifications.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => item.thread && setSelectedThread(item)}
                className="touchable"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '14px 16px',
                  borderBottom: '1px solid #F4F4F4',
                  gap: '12px',
                  cursor: item.thread ? 'pointer' : 'default'
                }}
              >
                {renderItemIcon(item.icon)}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2px'
                  }}>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: '12px', color: '#969696' }}>
                      {item.date}
                    </span>
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: '#757575',
                    lineHeight: '17px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.preview}
                  </div>
                </div>

                {item.unread && (
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#F14635',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    {item.unreadCount || 1}
                  </div>
                )}
              </div>
            ))}

            {/* Chat with Kaspi Guide Item */}
            <div
              className="touchable"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '14px 16px',
                borderBottom: '1px solid #F4F4F4',
                gap: '12px'
              }}
            >
              {renderItemIcon('guide')}

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2px'
                }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>
                    Чат с Kaspi Гид
                  </span>
                </div>

                <div style={{
                  fontSize: '13px',
                  color: '#757575',
                  lineHeight: '17px'
                }}>
                  Мы рады ответить на Ваши вопросы.
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Conversation Thread View for Kaspi Gold transactions */
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {selectedThread.thread && selectedThread.thread.map((msg, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '14px 16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                border: '1px solid #EBEBEB'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: '#757575' }}>
                  {msg.date}, {msg.time}
                </span>
                <span style={{ fontSize: '12px', color: '#0089D0', fontWeight: '500', cursor: 'pointer' }}>
                  Чек об оплате
                </span>
              </div>

              <div style={{ fontSize: '16px', fontWeight: '700', color: '#1F1F1F' }}>
                Покупка: {msg.amount.toLocaleString('ru-RU')} ₸
              </div>
              <div style={{ fontSize: '14px', color: '#1F1F1F', marginTop: '2px' }}>
                {msg.merchant}
              </div>
              <div style={{ fontSize: '13px', color: '#757575', marginTop: '4px' }}>
                Доступно: {msg.balanceAfter.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₸
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
