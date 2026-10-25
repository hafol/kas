import React, { useState, useEffect, useRef } from 'react';

// 1. Kaspi Logout Icon: 22 x 20, center y 60.5, left edge 16.5
const LogoutIcon = () => (
  <svg width="22" height="20" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <path
      d="M5.5,20H12.5C13.605,20 14.5,19.105 14.5,18V16C14.5,15.448 14.948,15 15.5,15C16.052,15 16.5,15.448 16.5,16V18C16.5,20.209 14.709,22 12.5,22H5.5C3.291,22 1.5,20.209 1.5,18V6C1.5,3.791 3.291,2 5.5,2H12.5C14.709,2 16.5,3.791 16.5,6V8C16.5,8.552 16.052,9 15.5,9C14.948,9 14.5,8.552 14.5,8V6C14.5,4.895 13.605,4 12.5,4H5.5C4.395,4 3.5,4.895 3.5,6V18C3.5,19.105 4.395,20 5.5,20Z"
      fill="#212121"
    />
    <path
      d="M8.5,12C8.5,12.552 8.948,13 9.5,13L19.586,13L18.293,14.293C17.902,14.683 17.902,15.317 18.293,15.707C18.683,16.098 19.317,16.098 19.707,15.707L22.707,12.707C23.098,12.317 23.098,11.683 22.707,11.293L19.707,8.293C19.317,7.902 18.683,7.902 18.293,8.293C17.902,8.683 17.902,9.317 18.293,9.707L19.586,11L9.5,11C8.948,11 8.5,11.448 8.5,12Z"
      fill="#212121"
    />
  </svg>
);

// 2. Kaspi Close Icon: 20 x 20, stroke 1.8, #212121, center y 60.5, right edge 15.5
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: 'block' }}>
    <line x1="2.5" y1="2.5" x2="17.5" y2="17.5" stroke="#212121" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="17.5" y1="2.5" x2="2.5" y2="17.5" stroke="#212121" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 3. Kaspi User Avatar: Diameter 76, top 82.5, center y 120, ring width 2 (#C4C4C4), silhouette fill #9B9B9B
const UserAvatarIcon = () => (
  <svg width="76" height="76" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <defs>
      <clipPath id="avatar-clip">
        <circle cx="12" cy="12" r="11" />
      </clipPath>
    </defs>
    <path
      clipPath="url(#avatar-clip)"
      fill="#9B9B9B"
      d="M12 7.25C14.1 7.25 15.35 8.5 15.35 10.5V12.9C15.35 14.4 13.9 15.2 13.9 16.4V17.3C13.9 17.9 14.9 18.4 16.2 18.9C17.6 19.5 17.9 20.5 18 21.5V26H6V21.5C6.1 20.5 6.4 19.5 7.8 18.9C9.1 18.4 10.1 17.9 10.1 17.3V16.4C10.1 15.2 8.65 14.4 8.65 12.9V10.5C8.65 8.5 9.9 7.25 12 7.25z"
    />
    <circle cx="12" cy="12" r="11" fill="none" stroke="#C4C4C4" strokeWidth="0.63" />
  </svg>
);

// 4. Backspace Icon: authentic Kaspi delete symbol
const BackspaceIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <path
      d="M21 4H8l-6 8 6 8h13a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"
      stroke="#212121"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="18" y1="9" x2="12" y2="15" stroke="#212121" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="12" y1="9" x2="18" y2="15" stroke="#212121" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const PasscodeScreen = ({ profile, onUnlock, onBack, onLogout }) => {
  const [digits, setDigits] = useState('');
  const [activeDigit, setActiveDigit] = useState(null);
  const [isSlidingIn, setIsSlidingIn] = useState(true);
  const [isDismissing, setIsDismissing] = useState(false);
  const timeoutRef = useRef(null);

  // Trigger smooth slide-up animation on mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsSlidingIn(false);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      onBack();
    }, 280);
  };

  const handleDigitPress = (d) => {
    if (digits.length >= 4) return;

    // Trigger red filled circle ripple animation on pressed number
    setActiveDigit(d);
    setTimeout(() => {
      setActiveDigit(null);
    }, 180);

    const next = digits + d;
    setDigits(next);

    if (next.length === 4) {
      // All 4 dots filled with red: wait brief moment so user sees 4th dot, then unlock
      timeoutRef.current = setTimeout(() => {
        setIsDismissing(true);
        setTimeout(() => {
          onUnlock();
        }, 220);
      }, 140);
    }
  };

  const handleDelete = () => {
    if (digits.length > 0) {
      setDigits((prev) => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 9999,
        maxWidth: '430px',
        margin: '0 auto',
        transform: isSlidingIn || isDismissing ? 'translateY(100%)' : 'translateY(0)',
        transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        boxSizing: 'border-box',
        overflowY: 'auto',
        overflowX: 'hidden',
        fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '777px',
          height: '100%'
        }}
      >
        {/* Top Header Icons (Centre y 60.5) */}
        {/* Logout Button (Left edge 16.5, 22x20) */}
        <button
          type="button"
          onClick={onLogout || handleDismiss}
          aria-label="Выйти"
          style={{
            position: 'absolute',
            left: '16.5px',
            top: '50.5px',
            width: '22px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <LogoutIcon />
        </button>

        {/* Close Button (Right edge 15.5, 20x20, stroke 1.8, #212121) */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Закрыть"
          style={{
            position: 'absolute',
            right: '15.5px',
            top: '50.5px',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <CloseIcon />
        </button>

        {/* Avatar (Diameter 76, Top 82.5, Centre y 120, Ring width 2 #C4C4C4, Fill #9B9B9B) */}
        <div
          style={{
            position: 'absolute',
            top: '82.5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF'
          }}
        >
          <UserAvatarIcon />
        </div>

        {/* Name "Парасат Ж." (13 Regular, #212121, Top 177.5, Centre y 184) */}
        <div
          style={{
            position: 'absolute',
            top: '177.5px',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '13px',
            color: '#212121',
            letterSpacing: '0px'
          }}
        >
          {profile?.shortName || 'Парасат Ж.'}
        </div>

        {/* Title "Код доступа" (13 Regular, #212121, Top 262.5, Centre y 269) */}
        <div
          style={{
            position: 'absolute',
            top: '262.5px',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '13px',
            color: '#212121',
            letterSpacing: '0px'
          }}
        >
          Код доступа
        </div>

        {/* PIN dots (empty): diameter 12, pitch 34, Centre y 302.5, color #EFEFEF */}
        <div
          style={{
            position: 'absolute',
            top: '296.5px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '22px', // 34 - 12 = 22
            height: '12px',
            alignItems: 'center'
          }}
        >
          {[0, 1, 2, 3].map((idx) => {
            const filled = digits.length > idx;
            return (
              <div
                key={idx}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: filled ? '#F14635' : '#EFEFEF',
                  transform: filled ? 'scale(1.1)' : 'scale(1)',
                  transition: 'background-color 0.16s ease, transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              />
            );
          })}
        </div>

        {/* Keypad: Digits 29 Regular, color #212121, tap area 99 x 79.5 per key, fixed from bottom at 88px */}
        <div
          style={{
            position: 'absolute',
            bottom: '88px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '297px', // 3 * 99
            height: '318px', // 4 * 79.5
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 99px)',
            gridTemplateRows: 'repeat(4, 79.5px)',
            justifyItems: 'center',
            alignItems: 'center'
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
            const isActive = activeDigit === n.toString();
            return (
              <button
                key={n}
                type="button"
                onPointerDown={() => handleDigitPress(n.toString())}
                style={{
                  width: '99px',
                  height: '79.5px',
                  border: 'none',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  padding: 0,
                  position: 'relative'
                }}
              >
                {/* Red touch ripple circle */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: '#F14635'
                    }}
                  />
                )}
                <span
                  style={{
                    position: 'relative',
                    fontSize: '29px',
                    fontWeight: 400,
                    lineHeight: '29px',
                    color: isActive ? '#FFFFFF' : '#212121',
                    letterSpacing: '0px'
                  }}
                >
                  {n}
                </span>
              </button>
            );
          })}

          {/* Bottom row: Empty space in left column */}
          <div style={{ width: '99px', height: '79.5px' }} />

          {/* Number 0 (middle column) */}
          {(() => {
            const isActive = activeDigit === '0';
            return (
              <button
                type="button"
                onPointerDown={() => handleDigitPress('0')}
                style={{
                  width: '99px',
                  height: '79.5px',
                  border: 'none',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  padding: 0,
                  position: 'relative'
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: '#F14635'
                    }}
                  />
                )}
                <span
                  style={{
                    position: 'relative',
                    fontSize: '29px',
                    fontWeight: 400,
                    lineHeight: '29px',
                    color: isActive ? '#FFFFFF' : '#212121',
                    letterSpacing: '0px'
                  }}
                >
                  0
                </span>
              </button>
            );
          })()}

          {/* Backspace in right column (visible when digits > 0) */}
          <div
            style={{
              width: '99px',
              height: '79.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {digits.length > 0 && (
              <button
                type="button"
                onClick={handleDelete}
                aria-label="Удалить"
                style={{
                  width: '99px',
                  height: '79.5px',
                  border: 'none',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  padding: 0
                }}
              >
                <BackspaceIcon />
              </button>
            )}
          </div>
        </div>

        {/* Forgot Link "Забыли код доступа?": 13 Regular, color #0089D0, Centre y 59 above bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '52.5px',
            left: 0,
            right: 0,
            textAlign: 'center'
          }}
        >
          <button
            type="button"
            onClick={() => alert('Восстановление доступа')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '13px',
              color: '#0089D0',
              letterSpacing: '0px',
              cursor: 'pointer',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            Забыли код доступа?
          </button>
        </div>
      </div>
    </div>
  );
};
