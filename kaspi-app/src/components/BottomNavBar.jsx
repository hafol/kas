import React from 'react';

// B2. Главная (active) icon – house (outline style, 24 x 24 pt, stroke 2 pt, active brand red #C8392F / #E2464A)
const NavIconHome = ({ color = "#C8392F" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

// B3. Kaspi QR icon (24 x 24 pt, stroke 2 pt, #4C4C4C)
const NavIconQR = ({ color = "#4C4C4C" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M1.2 2.5C1.2 1.8 1.8 1.2 2.5 1.2H7C7.6 1.2 8 1.6 8 2.2C8 2.8 7.6 3.2 7 3.2H3.2V7C3.2 7.6 2.8 8 2.2 8C1.6 8 1.2 7.6 1.2 7V2.5ZM16 2.2C16 1.6 16.4 1.2 17 1.2H21.5C22.2 1.2 22.8 1.8 22.8 2.5V7C22.8 7.6 22.4 8 21.8 8C21.2 8 20.8 7.6 20.8 7V3.2H17C16.4 3.2 16 2.8 16 2.2ZM2.2 16C2.8 16 3.2 16.4 3.2 17V20.8H7C7.6 20.8 8 21.2 8 21.8C8 22.4 7.6 22.8 7 22.8H2.5C1.8 22.8 1.2 22.2 1.2 21.5V17C1.2 16.4 1.6 16 2.2 16ZM22.8 16C22.8 16.6 22.4 17 21.8 17H20.8V20.8H17C16.4 20.8 16 21.2 16 21.8C16 22.4 16.4 22.8 17 22.8H21.5C22.2 22.8 22.8 22.2 22.8 21.5V17C22.8 16.4 22.8 16 22.8 16ZM5.5 4.5C4.9 4.5 4.5 4.9 4.5 5.5V10.5C4.5 11.1 4.9 11.5 5.5 11.5H10.5C11.1 11.5 11.5 11.1 11.5 10.5V5.5C11.5 4.9 11.1 4.5 10.5 4.5H5.5ZM12.5 5.5C12.5 4.9 12.9 4.5 13.5 4.5H18.5C19.1 4.5 19.5 4.9 19.5 5.5V10.5C19.5 11.1 19.1 11.5 18.5 11.5H13.5C12.9 11.5 12.5 11.1 12.5 10.5V5.5ZM5.5 12.5C4.9 12.5 4.5 12.9 4.5 13.5V18.5C4.5 19.1 4.9 19.5 5.5 19.5H10.5C11.1 19.5 11.5 19.1 11.5 18.5V13.5C11.5 12.9 11.1 12.5 10.5 12.5H5.5ZM13.5 12.5H17.2V14.5H14.5V17.2H12.5V13.5C12.5 12.9 12.9 12.5 13.5 12.5ZM14.5 9.5V6.5H17.5V9.5H14.5ZM17.5 14.8V17.5H14.8V19.5H18.5C19.1 19.5 19.5 19.1 19.5 18.5V14.8H17.5ZM6.5 14.5V17.5H9.5V14.5H6.5ZM16.8 7.2H15.2V8.8H16.8V7.2ZM15.2 15.2H16.8V16.8H15.2V15.2ZM8.8 15.2H7.2V16.8H8.8V15.2ZM6.5 6.5V9.5H9.5V6.5H6.5ZM7.2 7.2H8.8V8.8H7.2V7.2Z"
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

// B4. Сообщения icon (speech bubble with three small dots: 24 x 24 pt, stroke 2 pt, #4C4C4C)
const NavIconMessages = ({ color = "#4C4C4C" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

// B5. Сервисы icon (hamburger: 20.6 x 16 pt, three 2 pt bars, #4C4C4C)
const NavIconServices = ({ color = "#4C4C4C" }) => (
  <svg width="20.6" height="16" viewBox="0 0 20.6 16" fill="none">
    <line x1="1" y1="2" x2="19.6" y2="2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="8" x2="19.6" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="14" x2="19.6" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BottomNavBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Главная', IconComponent: NavIconHome, iconColor: '#C8392F', labelColor: '#E2464A', iconTop: '7.7px' },
    { id: 'qr', label: 'Kaspi QR', IconComponent: NavIconQR, iconColor: '#4C4C4C', labelColor: '#808080', iconTop: '7.7px' },
    { id: 'messages', label: 'Сообщения', IconComponent: NavIconMessages, iconColor: '#4C4C4C', labelColor: '#808080', badge: '32', iconTop: '7.7px' },
    { id: 'services', label: 'Сервисы', IconComponent: NavIconServices, iconColor: '#4C4C4C', labelColor: '#808080', iconTop: '11.7px' }
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
      opacity: 1,
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      borderTop: '0.5px solid #EFEFEF',
      borderBottom: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      boxShadow: 'none',
      zIndex: 60,
      height: '84.7px',
      paddingBottom: '30.7px',
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

          return (
            <div
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="touchable"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                position: 'relative',
                height: '100%',
                cursor: 'pointer',
                fontFamily: "'Roboto', sans-serif"
              }}
            >
              {/* Icon wrapper positioned with exact top offset */}
              <div style={{
                position: 'absolute',
                top: tab.iconTop,
                width: '24px',
                height: '24px',
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
                    left: '13.5px',
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

              {/* Label: Roboto Regular 12 pt, top at y 1212 px (38.5 pt from bar top) */}
              <span style={{
                position: 'absolute',
                top: '38.5px',
                fontFamily: "'Roboto', sans-serif",
                fontSize: '12px',
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
