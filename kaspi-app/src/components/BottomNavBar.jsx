import React from 'react';

// Exact vector paths extracted from Kaspi APK:
// ic_nav_tab_1 (Главная)
const NavIconHome = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M11.1,2.425L3.6,8.05C3.2223,8.3333 3,8.7779 3,9.25V20.5C3,21.3284 3.6716,22 4.5,22H8.5L8.6445,21.9931C9.4051,21.9204 10,21.2797 10,20.5V16H14V20.5C14,21.3284 14.6716,22 15.5,22H19.5C20.3284,22 21,21.3284 21,20.5V9.25C21,8.7779 20.7777,8.3333 20.4,8.05L12.9,2.425C12.3667,2.025 11.6333,2.025 11.1,2.425ZM11.999,4.249L19,9.5V20H16V15.5C16,14.6716 15.3284,14 14.5,14H9.5L9.3555,14.0069C8.5949,14.0796 8,14.7203 8,15.5V20H5V9.499L11.999,4.249ZM9,11H15C15.5523,11 16,11.4477 16,12C16,12.5523 15.5523,13 15,13H9C8.4477,13 8,12.5523 8,12C8,11.4477 8.4477,11 9,11Z"
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

// ic_nav_tab_2 (Kaspi QR)
const NavIconQR = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M1,2.5C1,1.6716 1.6716,1 2.5,1H7C7.5523,1 8,1.4477 8,2C8,2.5523 7.5523,3 7,3H3V7C3,7.5523 2.5523,8 2,8C1.4477,8 1,7.5523 1,7V2.5ZM16,2C16,1.4477 16.4477,1 17,1H21.5C22.3284,1 23,1.6716 23,2.5V7C23,7.5523 22.5523,8 22,8C21.4477,8 21,7.5523 21,7V3H17C16.4477,3 16,2.5523 16,2ZM2,16C2.5523,16 3,16.4477 3,17V21H7C7.5523,21 8,21.4477 8,22C8,22.5523 7.5523,23 7,23H2.5C1.6716,23 1,22.3284 1,21.5V17C1,16.4477 1.4477,16 2,16ZM22,16C22.5523,16 23,16.4477 23,17V21.5C23,22.3284 22.3284,23 21.5,23H17C16.4477,23 16,22.5523 16,22C16,21.4477 16.4477,21 17,21H21V17C21,16.4477 21.4477,16 22,16ZM5.5,4.5C4.9477,4.5 4.5,4.9477 4.5,5.5V10.5C4.5,11.0523 4.9477,11.5 5.5,11.5H10.5C11.0523,11.5 11.5,11.0523 11.5,10.5V5.5C11.0523,4.9477 11.0523,4.5 10.5,4.5H5.5ZM12.5,5.5C12.5,4.9477 12.9477,4.5 13.5,4.5H18.5C19.0523,4.5 19.5,4.9477 19.5,5.5V10.5C19.5,11.0523 19.0523,11.5 18.5,11.5H13.5C12.9477,11.5 12.5,11.0523 12.5,10.5V5.5ZM5.5,12.5C4.9477,12.5 4.5,12.9477 4.5,13.5V18.5C4.5,19.0523 4.9477,19.5 5.5,19.5H10.5C11.0523,19.5 11.5,19.0523 11.5,18.5V13.5C11.0523,12.9477 11.0523,12.5 10.5,12.5H5.5ZM13.5,12.5H17.1667V14.5H14.5V17.167H12.5V13.5C12.5,12.9477 12.9477,12.5 13.5,12.5ZM14.5,9.5V6.5H17.5V9.5H14.5ZM17.5,14.8337V17.5H14.8334V19.5H18.5C19.0523,19.5 19.5,19.0523 19.5,18.5V14.8337H17.5ZM6.5,14.5V17.5H9.5V14.5H6.5ZM16.75,7.25H15.25V8.75H16.75V7.25ZM15.25,15.25H16.75V16.75H15.25V15.25ZM8.75,15.25H7.25V16.75H8.75V15.25ZM6.5,6.5V9.5H9.5V6.5H6.5ZM7.25,7.25H8.75V8.75H7.25V7.25Z"
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

// ic_nav_tab_3 (Сообщения)
const NavIconMessages = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M6.0741,2C3.8229,2 2,3.824 2,6.0741V14.2222C2,16.3475 3.6262,18.0925 5.7037,18.2797V20.2223C5.7037,21.26 6.8871,21.8523 7.7176,21.2296L11.6296,18.2963H17.9259C20.1771,18.2963 22,16.4723 22,14.2222V6.0741C22,3.824 20.1771,2 17.9259,2H6.0741ZM4.2222,6.0741C4.2222,5.0514 5.0527,4.2222 6.0741,4.2222H17.9259C18.9473,4.2222 19.7778,5.0514 19.7778,6.0741V14.2222C19.7778,15.2449 18.9473,16.0741 17.9259,16.0741H11.3084C11.0365,16.0741 10.7703,16.1625 10.5532,16.326L7.9259,18.2963V17.3333C7.9259,16.6379 7.3617,16.0741 6.6673,16.0741H6.0741C5.0527,16.0741 4.2222,15.2449 4.2222,14.2222V6.0741ZM12,12C12.8189,12 13.4815,11.3367 13.4815,10.5185C13.4815,9.7004 12.8189,9.037 12,9.037C11.1811,9.037 10.5185,9.7004 10.5185,10.5185C10.5185,11.3367 11.1811,12 12,12ZM17.5382,11.5184C17.2662,11.8145 16.8785,12 16.4444,12C15.6256,12 14.963,11.3367 14.963,10.5185C14.963,9.7004 15.6256,9.037 16.4444,9.037C16.8756,9.037 17.2662,9.2219 17.5353,9.5168C17.7784,9.7805 17.9259,10.1322 17.9259,10.5185C17.9259,10.9039 17.7784,11.2549 17.5382,11.5184ZM7.5556,12C8.3744,12 9.037,11.3367 9.037,10.5185C9.037,9.7004 8.3744,9.037 7.5556,9.037C6.7367,9.037 6.0741,9.7004 6.0741,10.5185C6.0741,11.3367 6.7367,12 7.5556,12Z"
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

// ic_nav_tab_4 (Сервисы)
const NavIconServices = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M2.0586,4H21.9986V6H2.0586V4ZM2.0586,11H21.9986V13H2.0586V11ZM21.9986,18H2.0586V20H21.9986V18Z"
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export const BottomNavBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Главная', IconComponent: NavIconHome },
    { id: 'qr', label: 'Kaspi QR', IconComponent: NavIconQR },
    { id: 'messages', label: 'Сообщения', IconComponent: NavIconMessages, badge: 17 },
    { id: 'services', label: 'Сервисы', IconComponent: NavIconServices }
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
      borderTop: '0.5px solid #E0E0E0',
      boxShadow: 'none',
      zIndex: 60,
      height: 'calc(53.5px + env(safe-area-inset-bottom, 34px))',
      paddingBottom: 'env(safe-area-inset-bottom, 34px)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        height: '53.5px',
        width: '100%',
        alignItems: 'stretch'
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const { IconComponent } = tab;
          const iconColor = isActive ? '#F14635' : '#5A5A5A';
          const labelColor = isActive ? '#F14635' : '#8E8E8E';

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
                paddingTop: '8.5px', // Icon box (24px) top is 8.5; icon centre is 8.5 + 12 = 20.5 below bar top (y 829 on 414)
                cursor: 'pointer',
                fontFamily: 'system-ui, -apple-system, Roboto, sans-serif'
              }}
            >
              <div style={{
                position: 'relative',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComponent color={iconColor} />

                {/* Messages badge: pill 20.5 x 14.5, radius 7.25, #F14635, 11 Semibold white, left edge at icon center (12px), top 2 above icon top (-2px) */}
                {tab.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '12px',
                    width: '20.5px',
                    height: '14.5px',
                    borderRadius: '7.25px',
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

              {/* Label: 12 Regular, label cap top 40.5 below bar top (y 849) */}
              <span style={{
                fontSize: '12px',
                fontWeight: '400',
                color: labelColor,
                marginTop: '4px',
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
