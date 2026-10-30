import React, { useState, useEffect, useRef } from 'react';

// 1. Kaspi Logout Icon: 20% bigger (28.2 x 27, viewBox 24x24)
const LogoutIcon = () => (
  <svg width="28.2" height="27" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
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

// 2. Kaspi Close Icon: 15.5 x 15.5, stroke ~2, #212121
const CloseIcon = () => (
  <svg width="15.5" height="15.5" viewBox="0 0 15.5 15.5" fill="none" style={{ display: 'block' }}>
    <line x1="1.75" y1="1.75" x2="13.75" y2="13.75" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
    <line x1="13.75" y1="1.75" x2="1.75" y2="13.75" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 3. Kaspi User Avatar: 5% bigger (Diameter 93px, viewBox 88.5), Ring ~2.5px #CCCCCC, silhouette #9B9B9B
const UserAvatarIcon = () => (
  <svg width="93" height="93" viewBox="0 0 88.5 88.5" fill="none" style={{ display: 'block' }}>
    <defs>
      <clipPath id="avatar-clip">
        <circle cx="44.25" cy="44.25" r="43" />
      </clipPath>
    </defs>
    <g clipPath="url(#avatar-clip)">
      <path
        fill="#9B9B9B"
        d="M44.25 26.7C52 26.7 56.6 31.3 56.6 38.7V47.5C56.6 53 51.3 56 51.3 60.4V63.7C51.3 65.9 55 67.8 59.8 69.6C64.9 71.8 66 75.5 66.4 79.2V95.7H22.1V79.2C22.5 75.5 23.6 71.8 28.7 69.6C33.5 67.8 37.2 65.9 37.2 63.7V60.4C37.2 56 31.9 53 31.9 47.5V38.7C31.9 31.3 36.5 26.7 44.25 26.7Z"
      />
    </g>
    <circle cx="44.25" cy="44.25" r="43" fill="none" stroke="#CCCCCC" strokeWidth="2.5" />
  </svg>
);

// 4. Backspace Icon: 38 x 27 outline delete-tag icon, stroke ~2, #212121
const BackspaceIcon = () => (
  <svg width="38" height="27" viewBox="0 0 38 27" fill="none" style={{ display: 'block' }}>
    <path
      d="M11 1.5 L34.5 1.5 A 2.5 2.5 0 0 1 37 4 L37 23 A 2.5 2.5 0 0 1 34.5 25.5 L11 25.5 L2 13.5 Z"
      stroke="#212121"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="18.5" y1="8.5" x2="29.5" y2="18.5" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
    <line x1="29.5" y1="8.5" x2="18.5" y2="18.5" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const PasscodeScreen = ({ profile, onUnlock, onBack, onLogout, onUpdateProfile }) => {
  const [digits, setDigits] = useState('');
  const [activeDigit, setActiveDigit] = useState(null);
  const [isSlidingIn, setIsSlidingIn] = useState(true);
  const [isDismissing, setIsDismissing] = useState(false);
  const timeoutRef = useRef(null);

  // Editable Name & Avatar upload feature
  const [shortName, setShortName] = useState(() => {
    try {
      const saved = localStorage.getItem('kaspi_user_shortname');
      if (saved) return saved;
    } catch (e) {}
    return profile?.shortName || 'Парасат Ж.';
  });
  const [avatarUrl, setAvatarUrl] = useState(() => {
    try {
      const saved = localStorage.getItem('kaspi_user_avatar');
      if (saved) return saved;
    } catch (e) {}
    return profile?.avatar || null;
  });
  const avatarInputRef = useRef(null);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setShortName(val);
    try {
      localStorage.setItem('kaspi_user_shortname', val);
    } catch (err) {}
    if (onUpdateProfile) {
      onUpdateProfile({ shortName: val });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target?.result;
        if (dataUrl) {
          setAvatarUrl(dataUrl);
          try {
            localStorage.setItem('kaspi_user_avatar', dataUrl);
          } catch (err) {}
          if (onUpdateProfile) {
            onUpdateProfile({ avatar: dataUrl });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger smooth slide-up animation on mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsSlidingIn(false);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Lock scroll
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
    }, 260);
  };

  const handleDigitPress = (d) => {
    if (digits.length >= 4) return;

    setActiveDigit(d);
    setTimeout(() => {
      setActiveDigit(null);
    }, 70);

    const next = digits + d;
    setDigits(next);

    if (next.length === 4) {
      timeoutRef.current = setTimeout(() => {
        setIsDismissing(true);
        setTimeout(() => {
          onUnlock();
        }, 260);
      }, 100);
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

  // Keypad specifications on 414 x 896 screen:
  // Columns (centres): x = 92.5 / 207 / 321
  // Rows (centres N-offsets): N = 427.5 / 518.5 / 609.5 / 701.5 (moved down 1.5 px)
  // Each button area: 100 x 80 (topOffset = cy - 40)
  const keypadKeys = [
    { num: '1', cx: 92.5, topOffset: 427.5 - 40 },
    { num: '2', cx: 207, topOffset: 427.5 - 40 },
    { num: '3', cx: 321, topOffset: 427.5 - 40 },
    { num: '4', cx: 92.5, topOffset: 518.5 - 40 },
    { num: '5', cx: 207, topOffset: 518.5 - 40 },
    { num: '6', cx: 321, topOffset: 518.5 - 40 },
    { num: '7', cx: 92.5, topOffset: 609.5 - 40 },
    { num: '8', cx: 207, topOffset: 609.5 - 40 },
    { num: '9', cx: 321, topOffset: 609.5 - 40 },
    { num: '0', cx: 207, topOffset: 701.5 - 40 },
  ];

  // 4 PIN dots: diameter 13, centre N = 303 (topOffset = 303 - 6.5 = 296.5), centres x = 147.5 / 187 / 226.75 / 266.5
  const pinDotCentres = [147.5, 187, 226.75, 266.5];

  return (
    <div
      className="passcode-screen hide-scrollbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        padding: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 9999,
        width: '100%',
        opacity: isDismissing ? 0 : 1,
        transform: isSlidingIn || isDismissing ? 'translate3d(0, 100%, 0)' : 'translate3d(0, 0, 0)',
        transition: isDismissing
          ? 'opacity 260ms cubic-bezier(0.25, 1, 0.5, 1), transform 260ms cubic-bezier(0.25, 1, 0.5, 1)'
          : 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease',
        willChange: 'transform, opacity',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        boxSizing: 'border-box',
        overflow: 'hidden',
        overscrollBehavior: 'none',
        touchAction: 'none',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
      }}
    >
      <div
        className="hide-scrollbar"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '430px',
          height: '100%',
          margin: '0 auto',
          overflow: 'hidden',
          touchAction: 'none',
          padding: 0,
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* 1. TOP LEFT: Logout Icon (28.2 x 27, left x 19.5, top N = 13.5, 20% bigger) */}
        <button
          type="button"
          onClick={onLogout || handleDismiss}
          aria-label="Выйти"
          style={{
            position: 'absolute',
            left: '19.5px',
            top: 'calc(var(--sat, 0px) + 13.5px)',
            width: '28.2px',
            height: '27px',
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

        {/* 2. TOP RIGHT: Close X (15.5 x 15.5, opposite to logout: right x 19.5, on same horizontal line: height 27px, top N = 13.5) */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Закрыть"
          style={{
            position: 'absolute',
            right: '19.5px',
            top: 'calc(var(--sat, 0px) + 13.5px)',
            width: '28.2px',
            height: '27px',
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

        {/* Hidden file input for uploading avatar photo */}
        <input
          type="file"
          ref={avatarInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleAvatarChange}
        />

        {/* 3. AVATAR: Diameter 93px (5% bigger), centre x 207, top N = 49 (tap to upload picture) */}
        <div
          onClick={() => avatarInputRef.current?.click()}
          title="Нажмите, чтобы загрузить фото"
          style={{
            position: 'absolute',
            left: 'calc(50% - 46.5px)',
            top: 'calc(var(--sat, 0px) + 49px)',
            width: '93px',
            height: '93px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Аватар"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2.5px solid #CCCCCC',
                boxSizing: 'border-box'
              }}
            />
          ) : (
            <UserAvatarIcon />
          )}
        </div>

        {/* 4. NAME: 17 px Regular (1px smaller), #212121, editable just like uploading picture, text top N = 158.5 */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(var(--sat, 0px) + 155px)',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '17px'
          }}
        >
          <input
            type="text"
            value={shortName}
            onChange={handleNameChange}
            aria-label="Имя пользователя"
            autoComplete="off"
            spellCheck={false}
            style={{
              width: '100%',
              maxWidth: '340px',
              textAlign: 'center',
              fontSize: '17px',
              fontWeight: 400,
              lineHeight: '17px',
              height: '17px',
              color: '#212121',
              letterSpacing: '0px',
              fontFamily: "'Roboto', system-ui, -apple-system, sans-serif",
              border: 'none',
              outline: 'none',
              background: 'transparent',
              padding: 0,
              margin: 0,
              cursor: 'text',
              WebkitAppearance: 'none'
            }}
          />
        </div>

        {/* 5. TITLE "Код доступа": 17 px Regular (+1pt / 1px bigger), #212121, text top N = 257 */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(var(--sat, 0px) + 253px)',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '17px',
            fontWeight: 400,
            lineHeight: '17px',
            height: '17px',
            color: '#212121',
            letterSpacing: '0px',
            fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
          }}
        >
          Код доступа
        </div>

        {/* 6. 4 PIN DOTS: diameter 13, centre N = 303 (topOffset = 296.5px), centres x = 147.5 / 187 / 226.75 / 266.5 */}
        {pinDotCentres.map((cx, idx) => {
          const filled = digits.length > idx;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                top: 'calc(var(--sat, 0px) + 296.5px)',
                left: `${cx - 6.5}px`,
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                backgroundColor: filled ? '#F04926' : '#F2F2F2',
                transition: 'background-color 0.08s ease'
              }}
            />
          );
        })}

        {/* 7. KEYPAD DIGITS: 390 weight, digit height 24.5 (≈ 34 px font), #212121 */}
        {/* Row centre N: 427.5 / 518.5 / 609.5 / 701.5 (moved down 1.5 px) */}
        {keypadKeys.map(({ num, cx, topOffset }) => {
          const isActive = activeDigit === num;

          return (
            <button
              key={num}
              type="button"
              onPointerDown={() => handleDigitPress(num)}
              style={{
                position: 'absolute',
                left: `${cx - 50}px`,
                top: `calc(var(--sat, 0px) + ${topOffset}px)`,
                width: '100px',
                height: '80px',
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
              {/* Active ripple circle: 15% bigger (74px) and faster */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    backgroundColor: '#F04926',
                    pointerEvents: 'none'
                  }}
                />
              )}
              <span
                style={{
                  position: 'relative',
                  fontSize: '34px',
                  fontWeight: 390,
                  lineHeight: '34px',
                  color: isActive ? '#FFFFFF' : '#212121',
                  fontFamily: "'Roboto Flex Kaspi', 'Roboto', -apple-system, sans-serif",
                  letterSpacing: '0px'
                }}
              >
                {num}
              </span>
            </button>
          );
        })}

        {/* 8. BACKSPACE BUTTON: centre (321, row centre N = 701.5 -> topOffset = 661.5px) */}
        {digits.length > 0 && (
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Удалить"
            style={{
              position: 'absolute',
              left: `${321 - 50}px`,
              top: 'calc(var(--sat, 0px) + 661.5px)',
              width: '100px',
              height: '80px',
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

        {/* 9. FORGOT LINK "Забыли код доступа?": 17.5 px (+2px bigger), text top N = 767.5, centred. Colour #1F6FA3 */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(var(--sat, 0px) + 767.5px)',
            left: 0,
            right: 0,
            height: '18px',
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
              fontSize: '17.5px',
              fontWeight: 400,
              lineHeight: '18px',
              color: '#1F6FA3',
              textDecoration: 'none',
              WebkitTextDecoration: 'none',
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
