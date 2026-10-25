import React, { useState, useEffect, useRef } from 'react';

// 1. Kaspi Logout Icon: 20 x 19, Left edge 16, Centre y 62
const LogoutIcon = () => (
  <svg width="20" height="19" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
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

// 2. Kaspi Close Icon: 13 x 13, stroke 2, #212121, Right edge 20, Centre y 62
const CloseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}>
    <line x1="2" y1="2" x2="14" y2="14" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="2" x2="2" y2="14" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 3. Kaspi User Avatar: Diameter 75, Top 84, Centre y 121.5, Ring stroke 0.45 (#C8C8C8), Silhouette fill #9B9B9B
const UserAvatarIcon = () => (
  <svg width="75" height="75" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <defs>
      <clipPath id="avatar-clip">
        <circle cx="12" cy="12" r="11.4" />
      </clipPath>
    </defs>
    <path
      clipPath="url(#avatar-clip)"
      fill="#9B9B9B"
      d="M12 7.25C14.1 7.25 15.35 8.5 15.35 10.5V12.9C15.35 14.4 13.9 15.2 13.9 16.4V17.3C13.9 17.9 14.9 18.4 16.2 18.9C17.6 19.5 17.9 20.5 18 21.5V26H6V21.5C6.1 20.5 6.4 19.5 7.8 18.9C9.1 18.4 10.1 17.9 10.1 17.3V16.4C10.1 15.2 8.65 14.4 8.65 12.9V10.5C8.65 8.5 9.9 7.25 12 7.25z"
    />
    <circle cx="12" cy="12" r="11.5" fill="none" stroke="#C8C8C8" strokeWidth="0.45" />
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

  // Guarantee page is 100% STATIC: lock body/html scroll and block touchmove/wheel
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('wheel', preventScroll);
    };
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
      // All 4 dots filled with red: brief delay so user sees 4th dot, then unlock
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

  // Column pitch: 98.5px
  // Col 0: -98.5px, Col 1: 0px, Col 2: +98.5px
  const colOffsets = [-98.5, 0, 98.5];

  // Keypad row bottom distances (measured on 770 screen):
  // Row 0 (1,2,3): center 408.0 -> bottom 322.75px
  // Row 1 (4,5,6): center 486.5 -> bottom 244.25px
  // Row 2 (7,8,9): center 565.0 -> bottom 165.75px
  // Row 3 (0):       center 643.5 -> bottom 87.25px
  const rowBottomOffsets = [322.75, 244.25, 165.75, 87.25];

  // Keypad layout definition
  const keypadKeys = [
    { num: '1', row: 0, col: 0 },
    { num: '2', row: 0, col: 1 },
    { num: '3', row: 0, col: 2 },
    { num: '4', row: 1, col: 0 },
    { num: '5', row: 1, col: 1 },
    { num: '6', row: 1, col: 2 },
    { num: '7', row: 2, col: 0 },
    { num: '8', row: 2, col: 1 },
    { num: '9', row: 2, col: 2 },
    { num: '0', row: 3, col: 1 },
  ];

  // Dot offsets from card center: pitch 34.0px (-51, -17, 17, 51)
  const dotOffsets = [-51, -17, 17, 51];

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
        overflow: 'hidden',
        overscrollBehavior: 'none',
        touchAction: 'none',
        fontFamily: "'Roboto', sans-serif"
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          touchAction: 'none'
        }}
      >
        {/* Top Header Icons (positioned near top without awkward gap) */}
        {/* Logout Button */}
        <button
          type="button"
          onClick={onLogout || handleDismiss}
          aria-label="Выйти"
          style={{
            position: 'absolute',
            left: '16px',
            top: 'calc(env(safe-area-inset-top, 0px) + 16px)',
            width: '20px',
            height: '19px',
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

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Закрыть"
          style={{
            position: 'absolute',
            right: '20px',
            top: 'calc(env(safe-area-inset-top, 0px) + 19px)',
            width: '13px',
            height: '13px',
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

        {/* Avatar */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 48px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF'
          }}
        >
          <UserAvatarIcon />
        </div>

        {/* Name "Парасат Ж." */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 138px)',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '14px',
            color: '#212121',
            letterSpacing: '0px',
            fontFamily: "'Roboto', sans-serif"
          }}
        >
          {profile?.shortName || 'Парасат Ж.'}
        </div>

        {/* Title "Код доступа" */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 208px)',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '14px',
            color: '#212121',
            letterSpacing: '0px',
            fontFamily: "'Roboto', sans-serif"
          }}
        >
          Код доступа
        </div>

        {/* PIN dots: diameter 10, pitch 34.0, colour #EFEFEF / #F14635 */}
        {dotOffsets.map((offset, idx) => {
          const filled = digits.length > idx;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                top: 'calc(env(safe-area-inset-top, 0px) + 240px)',
                left: `calc(50% + ${offset}px - 5px)`,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: filled ? '#F14635' : '#EFEFEF',
                transform: filled ? 'scale(1.15)' : 'scale(1)',
                transition: 'background-color 0.16s ease, transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            />
          );
        })}

        {/* Keypad Digits: Roboto Regular 28, #212121, Tap area 98.5 x 78.5 */}
        {/* Row centres: 408 / 486.5 / 565 / 643.5; Column centres: -98.5, 0, +98.5 */}
        {keypadKeys.map(({ num, row, col }) => {
          const isActive = activeDigit === num;
          const bottomPos = rowBottomOffsets[row];
          const leftOffset = colOffsets[col];

          return (
            <button
              key={num}
              type="button"
              onPointerDown={() => handleDigitPress(num)}
              style={{
                position: 'absolute',
                bottom: `${bottomPos}px`,
                left: `calc(50% + ${leftOffset}px - 49.25px)`,
                width: '98.5px',
                height: '78.5px',
                border: 'none',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                padding: 0
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
                  fontSize: '28px',
                  fontWeight: 400,
                  lineHeight: '28px',
                  color: isActive ? '#FFFFFF' : '#212121',
                  fontFamily: "'Roboto', sans-serif",
                  letterSpacing: '0px'
                }}
              >
                {num}
              </span>
            </button>
          );
        })}

        {/* Backspace Button: Row 3, Column 2 (Centre x +98.5) */}
        {digits.length > 0 && (
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Удалить"
            style={{
              position: 'absolute',
              bottom: `${rowBottomOffsets[3]}px`,
              left: 'calc(50% + 98.5px - 49.25px)',
              width: '98.5px',
              height: '78.5px',
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

        {/* Forgot Link "Забыли код доступа?": 13 Regular, color #0089D0, Centre y 59 above bottom (bottom: 52px) */}
        <div
          style={{
            position: 'absolute',
            bottom: '52px',
            left: 0,
            right: 0,
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
              lineHeight: '14px',
              color: '#0089D0',
              fontFamily: "'Roboto', sans-serif",
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            Забыли код доступа?
          </button>
        </div>
      </div>
    </div>
  );
};


