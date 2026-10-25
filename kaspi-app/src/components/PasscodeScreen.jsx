import React, { useState, useEffect, useRef } from 'react';

// 1. Kaspi Logout Icon: exact APK ic_ds_logout_500
const LogoutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <path
      d="M5.5,20H12.5C13.605,20 14.5,19.105 14.5,18V16C14.5,15.448 14.948,15 15.5,15C16.052,15 16.5,15.448 16.5,16V18C16.5,20.209 14.709,22 12.5,22H5.5C3.291,22 1.5,20.209 1.5,18V6C1.5,3.791 3.291,2 5.5,2H12.5C14.709,2 16.5,3.791 16.5,6V8C16.5,8.552 16.052,9 15.5,9C14.948,9 14.5,8.552 14.5,8V6C14.5,4.895 13.605,4 12.5,4H5.5C4.395,4 3.5,4.895 3.5,6V18C3.5,19.105 4.395,20 5.5,20Z"
      fill="currentColor"
    />
    <path
      d="M8.5,12C8.5,12.552 8.948,13 9.5,13L19.586,13L18.293,14.293C17.902,14.683 17.902,15.317 18.293,15.707C18.683,16.098 19.317,16.098 19.707,15.707L22.707,12.707C23.098,12.317 23.098,11.683 22.707,11.293L19.707,8.293C19.317,7.902 18.683,7.902 18.293,8.293C17.902,8.683 17.902,9.317 18.293,9.707L19.586,11L9.5,11C8.948,11 8.5,11.448 8.5,12Z"
      fill="currentColor"
    />
  </svg>
);

// 2. Kaspi Close Icon: exact APK ic_ds_close_500
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <path
      d="M5.293,5.293C5.683,4.902 6.317,4.902 6.707,5.293L12,10.586L17.293,5.293C17.683,4.902 18.317,4.902 18.707,5.293C19.098,5.683 19.098,6.317 18.707,6.707L13.414,12L18.707,17.293C19.098,17.683 19.098,18.317 18.707,18.707C18.317,19.098 17.683,19.098 17.293,18.707L12,13.414L6.707,18.707C6.317,19.098 5.683,19.098 5.293,18.707C4.902,18.317 4.902,17.683 5.293,17.293L10.586,12L5.293,6.707C4.902,6.317 4.902,5.683 5.293,5.293Z"
      fill="currentColor"
    />
  </svg>
);

// 3. Kaspi User Avatar: exact from icons-traced/01-user-avatar.svg
const UserAvatarIcon = () => (
  <svg width="78" height="78" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <defs>
      <clipPath id="avatar-clip">
        <circle cx="12" cy="12" r="11.4" />
      </clipPath>
    </defs>
    <path
      clipPath="url(#avatar-clip)"
      fill="#B5B5B5"
      d="M12 7.25C14.1 7.25 15.35 8.5 15.35 10.5V12.9C15.35 14.4 13.9 15.2 13.9 16.4V17.3C13.9 17.9 14.9 18.4 16.2 18.9C17.6 19.5 17.9 20.5 18 21.5V26H6V21.5C6.1 20.5 6.4 19.5 7.8 18.9C9.1 18.4 10.1 17.9 10.1 17.3V16.4C10.1 15.2 8.65 14.4 8.65 12.9V10.5C8.65 8.5 9.9 7.25 12 7.25z"
    />
    <circle cx="12" cy="12" r="11.5" fill="none" stroke="#C8C8C8" strokeWidth="0.5" />
  </svg>
);

// 4. Backspace Icon: authentic Kaspi delete symbol
const BackspaceIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <path
      d="M21 4H8l-6 8 6 8h13a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="18" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="12" y1="9" x2="18" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
    // Start at translateY(100%), transition to translateY(0) on next frame
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '430px',
        margin: '0 auto',
        transform: isSlidingIn || isDismissing ? 'translateY(100%)' : 'translateY(0)',
        transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 44px) + 6px)',
          paddingLeft: '18px',
          paddingRight: '18px',
          height: '44px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        {/* Logout / Exit Button (left) */}
        <button
          type="button"
          onClick={onLogout || handleDismiss}
          aria-label="Выйти"
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            padding: 0,
            color: '#1F1F1F',
            cursor: 'pointer',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <LogoutIcon />
        </button>

        {/* Close Button (right) */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Закрыть"
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            padding: 0,
            color: '#1F1F1F',
            cursor: 'pointer',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Profile & Code Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10px',
          flexShrink: 0
        }}
      >
        {/* Avatar Silhouette Circle */}
        <div
          style={{
            width: '78px',
            height: '78px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            marginBottom: '12px'
          }}
        >
          <UserAvatarIcon />
        </div>

        {/* User Name */}
        <div
          style={{
            fontSize: '17px',
            fontWeight: 600,
            color: '#1F1F1F',
            fontFamily: "'Roboto Flex Kaspi', 'Roboto', sans-serif",
            letterSpacing: '-0.1px'
          }}
        >
          {profile?.shortName || 'Парасат Ж.'}
        </div>

        {/* "Код доступа" Title */}
        <div
          style={{
            marginTop: '34px',
            fontSize: '15px',
            fontWeight: 400,
            color: '#757575',
            fontFamily: "'Roboto Flex Kaspi', 'Roboto', sans-serif"
          }}
        >
          Код доступа
        </div>

        {/* 4 Dots indicator */}
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            height: '16px'
          }}
        >
          {[0, 1, 2, 3].map((idx) => {
            const filled = digits.length > idx;
            return (
              <div
                key={idx}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: filled ? '#F14635' : '#D6D6DC',
                  transform: filled ? 'scale(1.1)' : 'scale(1)',
                  transition: 'background-color 0.16s ease, transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Numeric Keypad Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          margin: '0 auto',
          padding: '0 16px',
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            rowGap: '12px',
            columnGap: '26px',
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
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  border: 'none',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isActive ? '#F14635' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#1F1F1F',
                  fontSize: '32px',
                  fontWeight: 400,
                  fontFamily: "'Roboto Flex Kaspi', 'Roboto', sans-serif",
                  cursor: 'pointer',
                  transform: isActive ? 'scale(0.95)' : 'scale(1)',
                  transition: 'background-color 0.1s ease, color 0.1s ease, transform 0.1s ease',
                  WebkitTapHighlightColor: 'transparent',
                  padding: 0
                }}
              >
                {n}
              </button>
            );
          })}

          {/* Bottom row: Empty space on left */}
          <div style={{ width: '74px', height: '74px' }} />

          {/* Number 0 */}
          {(() => {
            const isActive = activeDigit === '0';
            return (
              <button
                type="button"
                onPointerDown={() => handleDigitPress('0')}
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  border: 'none',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isActive ? '#F14635' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#1F1F1F',
                  fontSize: '32px',
                  fontWeight: 400,
                  fontFamily: "'Roboto Flex Kaspi', 'Roboto', sans-serif",
                  cursor: 'pointer',
                  transform: isActive ? 'scale(0.95)' : 'scale(1)',
                  transition: 'background-color 0.1s ease, color 0.1s ease, transform 0.1s ease',
                  WebkitTapHighlightColor: 'transparent',
                  padding: 0
                }}
              >
                0
              </button>
            );
          })()}

          {/* Backspace on right (visible when digits > 0) */}
          <div
            style={{
              width: '74px',
              height: '74px',
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
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  border: 'none',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  color: '#757575',
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
      </div>

      {/* Bottom Link: "Забыли код доступа?" */}
      <div
        style={{
          textAlign: 'center',
          paddingBottom: 'calc(max(env(safe-area-inset-bottom, 20px), 24px) + 12px)',
          flexShrink: 0
        }}
      >
        <button
          type="button"
          onClick={() => alert('Восстановление доступа')}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px 16px',
            fontSize: '15px',
            fontWeight: 400,
            color: '#0089D0',
            fontFamily: "'Roboto Flex Kaspi', 'Roboto', sans-serif",
            cursor: 'pointer',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          Забыли код доступа?
        </button>
      </div>
    </div>
  );
};
