import React, { useState, useEffect, useRef } from 'react';

// 1. Kaspi Logout Icon: 27 x 24.5 (20% larger than 22.5 x 20.5), Left edge 15.5, Centre y 62.5
const LogoutIcon = () => (
  <svg width="27" height="24.5" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
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

// 2. Kaspi Close Icon: 16 x 16, stroke 2, #212121, Right edge 19, Centre y 62.5
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}>
    <line x1="2" y1="2" x2="14" y2="14" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="2" x2="2" y2="14" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 3. Kaspi User Avatar: Diameter 80.3 (+5% larger than 76.5), Centre y 122, Ring stroke 0.45 (#C8C8C8), Silhouette fill #9B9B9B
const UserAvatarIcon = () => (
  <svg width="80.3" height="80.3" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
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

// 4. Backspace Icon: authentic Kaspi outline delete tag shape 33 x 23.5, stroke 2, #212121, "x" 9 x 9
const BackspaceIcon = () => (
  <svg width="33" height="23.5" viewBox="0 0 33 23.5" fill="none" style={{ display: 'block' }}>
    <path
      d="M9.5 1.25 L29.5 1.25 A 2.25 2.25 0 0 1 31.75 3.5 L31.75 20 A 2.25 2.25 0 0 1 29.5 22.25 L9.5 22.25 L1.7 12.55 A 1 1 0 0 1 1.7 10.95 Z"
      stroke="#212121"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="16.1" y1="7.25" x2="25.1" y2="16.25" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
    <line x1="25.1" y1="7.25" x2="16.1" y2="16.25" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
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
    }, 120);
  };

  const handleDigitPress = (d) => {
    if (digits.length >= 4) return;

    // Trigger fast 120ms orange-red touch ripple animation on pressed number
    setActiveDigit(d);
    setTimeout(() => {
      setActiveDigit(null);
    }, 120);

    const next = digits + d;
    setDigits(next);

    if (next.length === 4) {
      // Snappy fade/unlock ~120ms
      timeoutRef.current = setTimeout(() => {
        setIsDismissing(true);
        setTimeout(() => {
          onUnlock();
        }, 120);
      }, 70);
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

  // Column pitch: 100px. Column centres: 80 / 180 / 280 (screen centre - 100, centre, centre + 100)
  const colOffsets = [-100, 0, 100];

  // Keypad row bottom distances (measured on 360 x 779 baseline):
  // Row 0 (1,2,3): center 413.5 -> bottom 330.25px
  // Row 1 (4,5,6): center 492.5 -> bottom 251.25px (pitch 79.0)
  // Row 2 (7,8,9): center 571.5 -> bottom 172.25px (pitch 79.0)
  // Row 3 (0):       center 652.0 -> bottom 91.75px  (pitch 80.5, average pitch 79.5)
  const rowBottomOffsets = [330.25, 251.25, 172.25, 91.75];

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

  // Dot offsets from card center: pitch 34.5px (centres 128 / 162 / 196.5 / 231)
  const dotOffsets = [-52, -18, 16.5, 51];

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
        opacity: isDismissing ? 0 : 1,
        transform: isSlidingIn || isDismissing ? 'translateY(100%)' : 'translateY(0)',
        transition: isDismissing
          ? 'opacity 120ms ease-out, transform 120ms ease-out'
          : 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform, opacity',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        boxSizing: 'border-box',
        overflow: 'hidden',
        overscrollBehavior: 'none',
        touchAction: 'none',
        fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
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
        {/* 1. TOP ICONS (Centre y = 62.5) */}
        {/* Logout Button: 27 x 24.5 (+20% larger), Left edge 15.5, Centre y 62.5 */}
        <button
          type="button"
          onClick={onLogout || handleDismiss}
          aria-label="Выйти"
          style={{
            position: 'absolute',
            left: '15.5px',
            top: 'calc(env(safe-area-inset-top, 0px) + 10.5px)',
            width: '27px',
            height: '24.5px',
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

        {/* Close Button: 16 x 16, stroke 2, #212121, Right edge 19, Centre y 62.5 */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Закрыть"
          style={{
            position: 'absolute',
            right: '19px',
            top: 'calc(env(safe-area-inset-top, 0px) + 14.75px)',
            width: '16px',
            height: '16px',
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

        {/* 2. AVATAR (Diameter 80.3, +5% larger, Centre y 122) */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 43.85px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80.3px',
            height: '80.3px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF'
          }}
        >
          <UserAvatarIcon />
        </div>

        {/* NAME "Парасат Ж.": 15px Regular, #212121, Centre y 185.5 */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 140.5px)',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: '17px',
            color: '#212121',
            letterSpacing: '0px',
            fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
          }}
        >
          {profile?.shortName || 'Парасат Ж.'}
        </div>

        {/* TITLE "Код доступа": 14.5px Regular, #212121, Centre y 272 (Gap name->title: 86.5) */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 230px)',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '14.5px',
            fontWeight: 400,
            lineHeight: '16px',
            color: '#212121',
            letterSpacing: '0px',
            fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
          }}
        >
          Код доступа
        </div>

        {/* 3. PIN DOTS: Centre y 304.5 (32.5 below title), diameter 11.5, pitch 34.5, empty #EEEEEE, filled #F04926 */}
        {dotOffsets.map((offset, idx) => {
          const filled = digits.length > idx;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                top: 'calc(env(safe-area-inset-top, 0px) + 266.75px)',
                left: `calc(50% + ${offset}px - 5.75px)`,
                width: '11.5px',
                height: '11.5px',
                borderRadius: '50%',
                backgroundColor: filled ? '#F04926' : '#EEEEEE',
                transition: 'background-color 0.08s ease'
              }}
            />
          );
        })}

        {/* 4. KEYPAD DIGITS: Roboto Regular 28, #212121, Tap area 100 x 79.5 */}
        {/* Row centres: 413.5 / 492.5 / 571.5 / 652; Column centres: 80 / 180 / 280 (pitch 100) */}
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
                left: `calc(50% + ${leftOffset}px - 50px)`,
                width: '100px',
                height: '79.5px',
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
              {/* Orange-red touch ripple circle */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#F04926'
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
                  fontFamily: "'Roboto', system-ui, -apple-system, sans-serif",
                  letterSpacing: '0px'
                }}
              >
                {num}
              </span>
            </button>
          );
        })}

        {/* 5. BACKSPACE BUTTON: Row 3, Column 2 (Centre 280, 652), Icon 33 x 23.5 */}
        {digits.length > 0 && (
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Удалить"
            style={{
              position: 'absolute',
              bottom: `${rowBottomOffsets[3]}px`,
              left: 'calc(50% + 100px - 50px)',
              width: '100px',
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

        {/* 6. FORGOT LINK "Забыли код доступа?": 14.5px Regular, color #0089D0, Centre y 719 */}
        <div
          style={{
            position: 'absolute',
            bottom: '55px',
            left: 0,
            right: 0,
            height: '16px',
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
              fontSize: '14.5px',
              fontWeight: 400,
              lineHeight: '16px',
              color: '#0089D0',
              fontFamily: "'Roboto', system-ui, -apple-system, sans-serif",
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


