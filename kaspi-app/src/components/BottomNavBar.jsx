import React from 'react';

// B2. Главная (active) icon – house (outline style, 24.84 x 24.84 pt [-10%], stroke 2 pt, active brand red #C8392F / #E2464A)
const NavIconHome = ({ color = "#C8392F" }) => (
  <svg width="24.84" height="24.84" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 9.5L12 2.5L21 9.5V20.5C21 21.05 20.55 21.5 20 21.5H15V15.5H9V21.5H4C3.45 21.5 3 21.05 3 20.5V9.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 11.5H15" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// B3. Kaspi QR icon (24.84 x 24.84 pt [-10%], refined stroke, less bold, #4C4C4C)
const NavIconQR = ({ color = "#4C4C4C" }) => (
  <svg width="24.84" height="24.84" viewBox="0 0 24 24" fill="none">
    {/* 4 outer corners - clean refined stroke */}
    <path d="M2.5 7.5V3.8C2.5 3.08 3.08 2.5 3.8 2.5H7.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 2.5H20.2C20.92 2.5 21.5 3.08 21.5 3.8V7.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 16.5V20.2C2.5 20.92 3.08 21.5 3.8 21.5H7.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 21.5H20.2C20.92 21.5 21.5 20.92 21.5 20.2V16.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* 3 inner corner markers */}
    <rect x="5.2" y="5.2" width="5.1" height="5.1" rx="1.2" stroke={color} strokeWidth="1.5" />
    <rect x="6.9" y="6.9" width="1.7" height="1.7" rx="0.4" fill={color} />
    
    <rect x="13.7" y="5.2" width="5.1" height="5.1" rx="1.2" stroke={color} strokeWidth="1.5" />
    <rect x="15.4" y="6.9" width="1.7" height="1.7" rx="0.4" fill={color} />
    
    <rect x="5.2" y="13.7" width="5.1" height="5.1" rx="1.2" stroke={color} strokeWidth="1.5" />
    <rect x="6.9" y="15.4" width="1.7" height="1.7" rx="0.4" fill={color} />
    
    {/* Bottom-right structure */}
    <path d="M13.7 13.7H16.5V16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 16.5H19.2V19.2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="15.1" cy="18" r="0.85" fill={color} />
  </svg>
);

// B4. Сообщения icon (speech bubble with three small dots: 27.6 x 27.6 pt [+15%], stroke 2 pt, #4C4C4C)
const NavIconMessages = ({ color = "#4C4C4C" }) => (
  <svg width="27.6" height="27.6" viewBox="0 0 24 24" fill="none">
    <path
      d="M2.5 6C2.5 4.1 4.1 2.5 6 2.5H18C19.9 2.5 21.5 4.1 21.5 6V13.5C21.5 15.4 19.9 17 18 17H11L6 20.5V17H6C4.1 17 2.5 15.4 2.5 13.5V6Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="9.8" r="1.1" fill={color} />
    <circle cx="12" cy="9.8" r="1.1" fill={color} />
    <circle cx="16" cy="9.8" r="1.1" fill={color} />
  </svg>
);

// B5. Сервисы icon (hamburger: 23.7 x 18.4 pt [+15%], in line with others, three 2 pt bars, #4C4C4C)
const NavIconServices = ({ color = "#4C4C4C" }) => (
  <svg width="23.7" height="18.4" viewBox="0 0 20.6 16" fill="none">
    <line x1="1" y1="2" x2="19.6" y2="2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="8" x2="19.6" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="14" x2="19.6" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BottomNavBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Главная', IconComponent: NavIconHome, iconColor: '#C8392F', labelColor: '#E2464A' },
    { id: 'qr', label: 'Kaspi QR', IconComponent: NavIconQR, iconColor: '#4C4C4C', labelColor: '#808080' },
    { id: 'messages', label: 'Сообщения', IconComponent: NavIconMessages, iconColor: '#4C4C4C', labelColor: '#808080', badge: '32' },
    { id: 'services', label: 'Сервисы', IconComponent: NavIconServices, iconColor: '#4C4C4C', labelColor: '#808080' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      maxWidth: '430px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF',
      borderTop: '0.5px solid #EFEFEF',
      zIndex: 60,
      height: 'calc(54px + env(safe-area-inset-bottom, 30.7px))',
      paddingBottom: 'env(safe-area-inset-bottom, 30.7px)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        height: '54px',
        width: '100%',
        alignItems: 'stretch',
        position: 'relative'
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const { IconComponent } = tab;
          const iconColor = isActive ? (tab.id === 'home' ? '#C8392F' : '#E2464A') : '#4C4C4C';
          const labelColor = isActive ? '#E2464A' : '#808080';
          const isDisabled = tab.id === 'messages' || tab.id === 'services';

          return (
            <div
              key={tab.id}
              onClick={() => {
                if (isDisabled) return;
                onTabChange(tab.id);
              }}
              className={isDisabled ? '' : 'touchable'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                position: 'relative',
                height: '100%',
                cursor: isDisabled ? 'default' : 'pointer',
                fontFamily: "'Roboto', sans-serif"
              }}
            >
              {/* Icon wrapper: 27.6 x 27.6 px, centered, top: 6px for all tabs */}
              <div style={{
                position: 'absolute',
                top: '6px',
                width: '27.6px',
                height: '27.6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComponent color={iconColor} />

                {/* Messages badge: 19 x 14 pt capsule, fill #F14635, white Roboto Medium 11 pt */}
                {tab.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '15.5px',
                    width: '19px',
                    height: '14px',
                    borderRadius: '7px',
                    backgroundColor: '#F14635',
                    color: '#FFFFFF',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: '11px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: '14px',
                    boxSizing: 'border-box',
                    pointerEvents: 'none'
                  }}>
                    {tab.badge}
                  </div>
                )}
              </div>

              {/* Label: Roboto Regular 12.5px (+0.5pt), top at 38.5px */}
              <span style={{
                position: 'absolute',
                top: '38.5px',
                fontFamily: "'Roboto', sans-serif",
                fontSize: '12.5px',
                fontWeight: '400',
                color: labelColor,
                lineHeight: '14px',
                letterSpacing: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap'
              }}>
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
