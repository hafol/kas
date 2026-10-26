import React from 'react';

// B2. Главная (active) icon – house (19.5 w x 21.5 h, stroke 2.2 px, darker red #C0382C)
const NavIconHome = ({ color = "#C0382C" }) => (
  <svg width="19.5" height="21.5" viewBox="0 0 19.5 21.5" fill="none">
    <path
      d="M2.3 8.8L9.75 2.2L17.2 8.8V19.4C17.2 19.95 16.75 20.4 16.2 20.4H12.2V14.8H7.3V20.4H3.3C2.75 20.4 2.3 19.95 2.3 19.4V8.8Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M7.3 10.4H12.2" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// B3. Kaspi QR icon (24.5 x 24, stroke 2 px, #535353)
const NavIconQR = ({ color = "#535353" }) => (
  <svg width="24.5" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M1.2 2.5C1.2 1.8 1.8 1.2 2.5 1.2H7C7.6 1.2 8 1.6 8 2.2C8 2.8 7.6 3.2 7 3.2H3.2V7C3.2 7.6 2.8 8 2.2 8C1.6 8 1.2 7.6 1.2 7V2.5ZM16 2.2C16 1.6 16.4 1.2 17 1.2H21.5C22.2 1.2 22.8 1.8 22.8 2.5V7C22.8 7.6 22.4 8 21.8 8C21.2 8 20.8 7.6 20.8 7V3.2H17C16.4 3.2 16 2.8 16 2.2ZM2.2 16C2.8 16 3.2 16.4 3.2 17V20.8H7C7.6 20.8 8 21.2 8 21.8C8 22.4 7.6 22.8 7 22.8H2.5C1.8 22.8 1.2 22.2 1.2 21.5V17C1.2 16.4 1.6 16 2.2 16ZM22.8 16C22.8 16.6 22.4 17 21.8 17H20.8V20.8H17C16.4 20.8 16 21.2 16 21.8C16 22.4 16.4 22.8 17 22.8H21.5C22.2 22.8 22.8 22.2 22.8 21.5V17C22.8 16.4 22.8 16 22.8 16ZM5.5 4.5C4.9 4.5 4.5 4.9 4.5 5.5V10.5C4.5 11.1 4.9 11.5 5.5 11.5H10.5C11.1 11.5 11.5 11.1 11.5 10.5V5.5C11.5 4.9 11.1 4.5 10.5 4.5H5.5ZM12.5 5.5C12.5 4.9 12.9 4.5 13.5 4.5H18.5C19.1 4.5 19.5 4.9 19.5 5.5V10.5C19.5 11.1 19.1 11.5 18.5 11.5H13.5C12.9 11.5 12.5 11.1 12.5 10.5V5.5ZM5.5 12.5C4.9 12.5 4.5 12.9 4.5 13.5V18.5C4.5 19.1 4.9 19.5 5.5 19.5H10.5C11.1 19.5 11.5 19.1 11.5 18.5V13.5C11.5 12.9 11.1 12.5 10.5 12.5H5.5ZM13.5 12.5H17.2V14.5H14.5V17.2H12.5V13.5C12.5 12.9 12.9 12.5 13.5 12.5ZM14.5 9.5V6.5H17.5V9.5H14.5ZM17.5 14.8V17.5H14.8V19.5H18.5C19.1 19.5 19.5 19.1 19.5 18.5V14.8H17.5ZM6.5 14.5V17.5H9.5V14.5H6.5ZM16.8 7.2H15.2V8.8H16.8V7.2ZM15.2 15.2H16.8V16.8H15.2V15.2ZM8.8 15.2H7.2V16.8H8.8V15.2ZM6.5 6.5V9.5H9.5V6.5H6.5ZM7.2 7.2H8.8V8.8H7.2V7.2Z"
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

// B4. Сообщения icon (speech bubble with three small dots: 26 x 24, stroke 2 px, #535353)
const NavIconMessages = ({ color = "#535353" }) => (
  <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
    <path
      d="M2.5 6.5C2.5 4.3 4.3 2.5 6.5 2.5H19.5C21.7 2.5 23.5 4.3 23.5 6.5V14.5C23.5 16.7 21.7 18.5 19.5 18.5H11.5L6.5 22V18.5H6.5C4.3 18.5 2.5 16.7 2.5 14.5V6.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Three small non-bold dots: ~2px each, gap ~2.5px */}
    <circle cx="9" cy="10.5" r="1.1" fill={color} />
    <circle cx="13" cy="10.5" r="1.1" fill={color} />
    <circle cx="17" cy="10.5" r="1.1" fill={color} />
  </svg>
);

// B5. Сервисы icon (three horizontal bars: 22 w x 17 h, 2.2 px thick with round caps, tops at 820, 827, 834.5)
const NavIconServices = ({ color = "#535353" }) => (
  <svg width="22" height="17" viewBox="0 0 22 17" fill="none">
    <line x1="1.1" y1="1.6" x2="20.9" y2="1.6" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="1.1" y1="8.5" x2="20.9" y2="8.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="1.1" y1="15.4" x2="20.9" y2="15.4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const BottomNavBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Главная', IconComponent: NavIconHome, iconColor: '#C0382C', labelColor: '#E0402F' },
    { id: 'qr', label: 'Kaspi QR', IconComponent: NavIconQR, iconColor: '#535353', labelColor: '#8A8A8E' },
    { id: 'messages', label: 'Сообщения', IconComponent: NavIconMessages, iconColor: '#535353', labelColor: '#8A8A8E', badge: 29 },
    { id: 'services', label: 'Сервисы', IconComponent: NavIconServices, iconColor: '#535353', labelColor: '#8A8A8E' }
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
      borderTop: '0.5px solid #EEEEEE',
      borderBottom: 'none',
      boxShadow: 'none',
      zIndex: 60,
      height: 'calc(54px + max(env(safe-area-inset-bottom, 34px), 34px))',
      minHeight: '88px',
      paddingBottom: 'max(env(safe-area-inset-bottom, 34px), 34px)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        height: '54px',
        width: '100%',
        alignItems: 'stretch'
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const { IconComponent } = tab;
          // B1 & B2: Inactive label #8A8A8E, active label #E0402F, active house icon #C0382C, others #535353
          const iconColor = isActive ? (tab.id === 'home' ? '#C0382C' : '#E0402F') : '#535353';
          const labelColor = isActive ? '#E0402F' : '#8A8A8E';

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
                paddingTop: '8.5px', // B6: Icon vertical centre at y 828.5 (808 + 20.5)
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }}
            >
              <div style={{
                position: 'relative',
                width: '26px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComponent color={iconColor} />

                {/* B4: Red badge 20.5 x 15 at x 258.5, y 809 (top: -7px, left: 12.5px relative to 26x24 bubble) */}
                {tab.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '-7px',
                    left: '12.5px',
                    width: '20.5px',
                    height: '15px',
                    borderRadius: '7.5px',
                    backgroundColor: '#F14635',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    boxSizing: 'border-box',
                    pointerEvents: 'none'
                  }}>
                    {tab.badge}
                  </div>
                )}
              </div>

              {/* B1: Label text top at y 848.5 (808 + 40.5) */}
              <span style={{
                fontSize: '12px',
                fontWeight: '400',
                color: labelColor,
                marginTop: '8px',
                lineHeight: '14px',
                letterSpacing: 0
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
