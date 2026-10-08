import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, Check, Loader2 } from 'lucide-react';
import { saveDocumentCard, loadDocumentCard, saveRequisites, loadRequisites, optimizeImage } from '../utils/idStorage';

// Color Tokens (from specification)
const pageBg        = '#FFFFFF'; // the whole screen, header included
const segTrack      = '#EEEEF0';
const segPill       = '#FFFFFF';
const hairline      = '#E5E5EA';
const textPrimary   = '#1C1C1E';
const textSecondary = '#8E8E93';
const primaryBlue   = '#1446E0'; // main button fill (deep royal blue)
const onPrimary     = '#FFFFFF';
const outlineBorder = '#A9BCF5'; // light blue (was lavender #B8B2DC, read as pink)
const outlineText   = '#1446E0'; // royal blue like the main button, also the upload icon

const fontFamily = 'system-ui, -apple-system, Roboto, sans-serif';

// 1. Back Chevron (<): APK ic_ds_chevron_left_400, glyph 8 x 14.2 in a 16 box.
//    Rendered at 22.5 → glyph ≈ 11 x 20, stroke ≈ 2, tinted via currentColor.
const BackChevronIcon = () => (
  <svg width="22.5" height="22.5" viewBox="0 0 16 16" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
    <path
      d="M10.266,14.707C10.663,15.098 11.306,15.098 11.703,14.707C12.069,14.347 12.097,13.779 11.787,13.387L11.703,13.293L6.326,8L11.703,2.707C12.069,2.347 12.097,1.779 11.787,1.387L11.703,1.293C11.336,0.932 10.76,0.905 10.362,1.21L10.266,1.293L4.387,7.081C3.905,7.555 3.873,8.303 4.291,8.814L4.387,8.919L10.266,14.707Z"
      fill="currentColor"
    />
  </svg>
);

// 2. QR-scan icon: APK ic_ds_scan_qr_500, 24 x 24, tinted via currentColor
const QrScanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M1.1,2.5C1.1,1.727 1.727,1.1 2.5,1.1H7C7.497,1.1 7.9,1.503 7.9,2C7.9,2.497 7.497,2.9 7,2.9H2.9V7C2.9,7.497 2.497,7.9 2,7.9C1.503,7.9 1.1,7.497 1.1,7V2.5Z" fill="currentColor" />
    <path d="M16.1,2C16.1,1.503 16.503,1.1 17,1.1H21.5C22.273,1.1 22.9,1.727 22.9,2.5V7C22.9,7.497 22.497,7.9 22,7.9C21.503,7.9 21.1,7.497 21.1,7V2.9H17C16.503,2.9 16.1,2.497 16.1,2Z" fill="currentColor" />
    <path d="M7.35,8.65V7.35H8.65V8.65H7.35Z" fill="currentColor" />
    <path d="M4.6,5.5C4.6,5.003 5.003,4.6 5.5,4.6H10.5C10.997,4.6 11.4,5.003 11.4,5.5V10.5C11.4,10.997 10.997,11.4 10.5,11.4H5.5C5.003,11.4 4.6,10.997 4.6,10.5V5.5ZM9.6,6.4H6.4V9.6H9.6V6.4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    <path d="M15.35,8.65V7.35H16.65V8.65H15.35Z" fill="currentColor" />
    <path d="M12.6,5.5C12.6,5.003 13.003,4.6 13.5,4.6H18.5C18.997,4.6 19.4,5.003 19.4,5.5V10.5C19.4,10.997 18.997,11.4 18.5,11.4H13.5C13.003,11.4 12.6,10.997 12.6,10.5V5.5ZM17.6,6.4H14.4V9.6H17.6V6.4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    <path d="M7.35,16.65V15.35H8.65V16.65H7.35Z" fill="currentColor" />
    <path d="M4.6,13.5C4.6,13.003 5.003,12.6 5.5,12.6H10.5C10.997,12.6 11.4,13.003 11.4,13.5V18.5C11.4,18.997 10.997,19.4 10.5,19.4H5.5C5.003,19.4 4.6,18.997 4.6,18.5V13.5ZM9.6,14.4H6.4V17.6H9.6V14.4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    <path d="M12.6,13.5C12.6,13.003 13.003,12.6 13.5,12.6H17.067V14.4H14.4V17.067H12.6V13.5Z" fill="currentColor" />
    <path d="M17.6,17.6V14.934H19.4V18.5C19.4,18.997 18.997,19.4 18.5,19.4H14.933V17.6H17.6Z" fill="currentColor" />
    <path d="M15.35,16.65V15.35H16.65V16.65H15.35Z" fill="currentColor" />
    <path d="M1.1,17C1.1,16.503 1.503,16.1 2,16.1C2.497,16.1 2.9,16.503 2.9,17V21.1H7C7.497,21.1 7.9,21.503 7.9,22C7.9,22.497 7.497,22.9 7,22.9H2.5C1.727,22.9 1.1,22.273 1.1,21.5V17Z" fill="currentColor" />
    <path d="M21.1,17C21.1,16.503 21.503,16.1 22,16.1C22.497,16.1 22.9,16.503 22.9,17V21.5C22.9,22.273 22.273,22.9 21.5,22.9H17C16.503,22.9 16.1,22.497 16.1,22C16.1,21.503 16.503,21.1 17,21.1H21.1V17Z" fill="currentColor" />
  </svg>
);

// 3. Upload icon (square tray + arrow up): APK ic_ds_share_ios_500, cropped to 22 x 24, tinted via currentColor
const UploadIcon = () => (
  <svg width="22" height="24" viewBox="1 0 22 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M20,18V12C20,10.895 19.105,10 18,10H16C15.448,10 15,9.552 15,9C15,8.448 15.448,8 16,8H18C20.209,8 22,9.791 22,12V18C22,20.209 20.209,22 18,22H6C3.791,22 2,20.209 2,18L2,12C2,9.791 3.791,8 6,8H8C8.552,8 9,8.448 9,9C9,9.552 8.552,10 8,10H6C4.895,10 4,10.895 4,12L4,18C4,19.105 4.895,20 6,20H18C19.105,20 20,19.105 20,18Z" fill="currentColor" />
    <path d="M12,15.5C12.552,15.5 13,15.052 13,14.5L13,4.414L14.293,5.707C14.683,6.098 15.317,6.098 15.707,5.707C16.098,5.317 16.098,4.683 15.707,4.293L12.707,1.293C12.317,0.902 11.683,0.902 11.293,1.293L8.293,4.293C7.902,4.683 7.902,5.317 8.293,5.707C8.683,6.098 9.317,6.098 9.707,5.707L11,4.414L11,14.5C11,15.052 11.448,15.5 12,15.5Z" fill="currentColor" />
  </svg>
);

// 4. Copy icon (two overlapping rounded squares): APK ic_ds_copy_500, 24 x 24, tinted via currentColor
const CopyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M12,2C10.067,2 8.5,3.567 8.5,5.5V6C8.5,6.552 8.948,7 9.5,7C10.052,7 10.5,6.552 10.5,6V5.5C10.5,4.672 11.172,4 12,4H18.5C19.328,4 20,4.672 20,5.5V12.5C20,13.052 19.552,13.5 19,13.5H18C17.448,13.5 17,13.948 17,14.5C17,15.052 17.448,15.5 18,15.5H19C20.657,15.5 22,14.157 22,12.5V5.5C22,3.567 20.433,2 18.5,2H12Z" fill="currentColor" />
    <path d="M5.5,8C3.567,8 2,9.567 2,11.5V18.5C2,20.433 3.567,22 5.5,22H12.5C14.433,22 16,20.433 16,18.5V11.5C16,9.567 14.433,8 12.5,8H5.5ZM4,11.5C4,10.672 4.672,10 5.5,10H12.5C13.328,10 14,10.672 14,11.5V18.5C14,19.328 13.328,20 12.5,20H5.5C4.672,20 4,19.328 4,18.5V11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);

// One page of the sliding track: half the track width, own scroll area + footer
const paneStyle = {
  width: '50%',
  height: '100%',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0
};

const paneScrollStyle = {
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  WebkitOverflowScrolling: 'touch'
};

const footerButtonBase = {
  width: '100%',
  height: '50px',
  borderRadius: '11px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: 0,
  fontFamily,
  fontSize: '16px',
  fontWeight: 500,
  letterSpacing: 0,
  whiteSpace: 'nowrap',
  boxShadow: 'none',
  cursor: 'pointer',
  outline: 'none',
  boxSizing: 'border-box'
};

const editControlButton = {
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: segTrack,
  color: textPrimary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  cursor: 'pointer',
  flexShrink: 0
};

// Requisites rows, in order. inputMode picks the phone keyboard (digits for ИИН and number).
const requisiteFields = [
  { key: 'fullName', label: 'ФИО', inputMode: 'text' },
  { key: 'iin', label: 'ИИН', inputMode: 'numeric' },
  { key: 'birthDate', label: 'Дата рождения', inputMode: 'text' },
  { key: 'docNumber', label: 'Номер документа', inputMode: 'numeric' },
  { key: 'issueDate', label: 'Дата выдачи', inputMode: 'text' },
  { key: 'expiryDate', label: 'Срок действия', inputMode: 'text' }
];

export const DigitalIdScreen = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('doc'); // 'doc' | 'reqs'
  const fileInputRef = useRef(null);
  const cardContainerRef = useRef(null);

  // Document photo state
  const [photoUrl, setPhotoUrl] = useState(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Dragging & gesture interaction state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialOffsetX: 0, initialOffsetY: 0 });
  const touchStartDistRef = useRef(null);
  const touchStartScaleRef = useRef(1);

  // Requisites typed in by the user (start empty)
  const [reqValues, setReqValues] = useState({});
  const reqEditedRef = useRef(false);

  // Load cached requisites (IndexedDB); never overwrite what the user already started typing
  useEffect(() => {
    let isMounted = true;
    loadRequisites().then((saved) => {
      if (isMounted && saved && !reqEditedRef.current) setReqValues(saved);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Load saved document from persistent cache (IndexedDB)
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const saved = await loadDocumentCard();
        if (isMounted && saved && saved.photoUrl) {
          setPhotoUrl(saved.photoUrl);
          setScale(saved.scale || 1);
          setOffset({ x: saved.offsetX || 0, y: saved.offsetY || 0 });
          setIsSaved(Boolean(saved.isSaved));
        }
      } catch (err) {
        console.warn('Error loading document card:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle image upload with auto-optimization (ensures 100% reliable persistence)
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const optimized = await optimizeImage(file);
        if (optimized) {
          setPhotoUrl(optimized);
          setScale(1);
          setOffset({ x: 0, y: 0 });
          setIsSaved(false); // Allow framing and show "Сохранить" button in top right corner
        }
      } catch (err) {
        console.warn('Error optimizing photo:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Mouse pan handlers (when not saved)
  const handleMouseDown = (e) => {
    if (isSaved || !photoUrl) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialOffsetX: offset.x,
      initialOffsetY: offset.y
    };
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || isSaved || !photoUrl) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setOffset({
      x: dragStartRef.current.initialOffsetX + dx,
      y: dragStartRef.current.initialOffsetY + dy
    });
  }, [isDragging, isSaved, photoUrl]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  // Touch pan & pinch-zoom handlers for mobile
  const handleTouchStart = (e) => {
    if (isSaved || !photoUrl) return;
    if (e.touches.length === 1) {
      // Single finger pan
      const touch = e.touches[0];
      setIsDragging(true);
      dragStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        initialOffsetX: offset.x,
        initialOffsetY: offset.y
      };
    } else if (e.touches.length === 2) {
      // Two finger pinch to zoom
      setIsDragging(false);
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      touchStartDistRef.current = dist;
      touchStartScaleRef.current = scale;
    }
  };

  const handleTouchMove = (e) => {
    if (isSaved || !photoUrl) return;
    if (e.touches.length === 1 && isDragging) {
      // Prevent screen vertical scrolling during image alignment
      e.preventDefault();
      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.x;
      const dy = touch.clientY - dragStartRef.current.y;
      setOffset({
        x: dragStartRef.current.initialOffsetX + dx,
        y: dragStartRef.current.initialOffsetY + dy
      });
    } else if (e.touches.length === 2 && touchStartDistRef.current) {
      // Pinch zoom
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const factor = currentDist / touchStartDistRef.current;
      const newScale = Math.min(3.5, Math.max(0.4, touchStartScaleRef.current * factor));
      setScale(parseFloat(newScale.toFixed(2)));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartDistRef.current = null;
  };

  useEffect(() => {
    const onWindowMouseUp = () => setIsDragging(false);
    const onWindowMouseMove = (e) => {
      if (isDragging && !isSaved) {
        handleMouseMove(e);
      }
    };
    window.addEventListener('mouseup', onWindowMouseUp);
    window.addEventListener('mousemove', onWindowMouseMove);
    return () => {
      window.removeEventListener('mouseup', onWindowMouseUp);
      window.removeEventListener('mousemove', onWindowMouseMove);
    };
  }, [isDragging, isSaved, handleMouseMove]);

  // Save document permanently
  const handleSave = async () => {
    if (!photoUrl) return;
    const docData = {
      photoUrl,
      scale,
      offsetX: offset.x,
      offsetY: offset.y,
      isSaved: true,
      savedAt: Date.now()
    };
    await saveDocumentCard(docData);
    if (reqValues && Object.keys(reqValues).length > 0) {
      await saveRequisites(reqValues);
    }
    setIsSaved(true);
    setIsDragging(false);
  };

  const isDocTab = activeTab === 'doc';

  // Requisites rows: empty until the user fills them in; values are cached in IndexedDB
  const requisites = requisiteFields.map((field) => ({ ...field, value: reqValues[field.key] ?? '' }));

  const handleRequisiteChange = (key, value) => {
    reqEditedRef.current = true;
    const next = { ...reqValues, [key]: value };
    setReqValues(next);
    saveRequisites(next);
  };

  const copyToClipboard = (value) => {
    try {
      navigator.clipboard?.writeText(value).catch(() => {});
    } catch {
      // Clipboard unavailable (insecure context): nothing to show
    }
  };

  // Pinned footer of each page. Документ: hairline + two buttons; Реквизиты: one button, no hairline
  const renderFooter = (tab) => (
    <div style={{
      flexShrink: 0,
      position: 'relative',
      backgroundColor: pageBg,
      padding: '14px 18px calc(14px + max(env(safe-area-inset-bottom, 0px), 28px)) 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {tab === 'doc' && (
        <>
          {/* Hairline: full width, 0.5 pt on retina */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 0,
            borderTop: `0.5px solid ${hairline}`
          }} />

          {/* Primary: "Предъявить документ" */}
          <button
            type="button"
            className="did-btn-primary"
            style={{
              ...footerButtonBase,
              backgroundColor: primaryBlue,
              border: 'none',
              color: onPrimary
            }}
          >
            <QrScanIcon />
            Предъявить документ
          </button>
        </>
      )}

      {/* Secondary: "Отправить документ" / "Отправить реквизиты" */}
      <button
        type="button"
        className="did-btn-secondary"
        style={{
          ...footerButtonBase,
          backgroundColor: pageBg,
          // 1.5 border drawn as an inset ring: Chrome rounds 1.5px borders down to 1px
          border: 'none',
          boxShadow: `inset 0 0 0 1.5px ${outlineBorder}`,
          color: outlineText
        }}
      >
        <UploadIcon />
        {tab === 'doc' ? 'Отправить документ' : 'Отправить реквизиты'}
      </button>
    </div>
  );

  return (
    <div className="screen-fill" style={{
      width: '100%',
      backgroundColor: pageBg,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily,
      letterSpacing: 0
    }}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handlePhotoUpload}
      />

      {/* Safe Area Inset */}
      <div style={{ height: 'env(safe-area-inset-top, 0px)', flexShrink: 0 }} />

      {/* Nav Bar: height 52, white, no divider */}
      <div style={{
        height: '52px',
        flexShrink: 0,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Back button: tap area 44 x 44, chevron glyph left edge at x 24, centred at y 74 */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Назад"
          style={{
            position: 'absolute',
            left: '7.6px', // box centre 29.6 − glyph half-width 5.6 = glyph left edge 24
            top: '4px',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            padding: 0,
            color: textPrimary,
            cursor: 'pointer',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <BackChevronIcon />
        </button>

        {/* Title: 17 Semibold, centred on the screen */}
        <h1 style={{
          margin: 0,
          fontSize: '17px',
          fontWeight: 600,
          color: textPrimary,
          lineHeight: '52px',
          whiteSpace: 'nowrap',
          textAlign: 'center'
        }}>
          Удостоверение личности
        </h1>

        {/* Top-right Save button: appears after photo is loaded until saved */}
        {photoUrl && !isSaved && (
          <button
            type="button"
            onClick={handleSave}
            className="touchable"
            style={{
              position: 'absolute',
              right: '14px',
              top: '4px',
              height: '44px',
              padding: '0 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              fontFamily,
              fontSize: '16px',
              fontWeight: 600,
              color: primaryBlue,
              cursor: 'pointer',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            Сохранить
          </button>
        )}
      </div>

      {/* Segmented Control: top y 115, margins 18, height 40, radius 12 */}
      <div style={{
        marginTop: '15px',
        marginLeft: '18px',
        marginRight: '18px',
        height: '40px',
        flexShrink: 0,
        backgroundColor: segTrack,
        borderRadius: '12px',
        position: 'relative',
        display: 'flex'
      }}>
        {/* Sliding white pill: inset 2, height 36, radius 10 */}
        <div style={{
          position: 'absolute',
          top: '2px',
          bottom: '2px',
          left: '2px',
          width: 'calc(50% - 4px)',
          backgroundColor: segPill,
          borderRadius: '10px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
          transform: isDocTab ? 'translateX(0)' : 'translateX(calc(100% + 4px))',
          transition: 'transform 200ms ease'
        }} />
        {[
          { id: 'doc', label: 'Документ' },
          { id: 'reqs', label: 'Реквизиты' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              position: 'relative',
              zIndex: 1,
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily,
              fontSize: '15px',
              fontWeight: 400,
              color: textPrimary,
              letterSpacing: 0,
              cursor: 'pointer',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pages: Документ | Реквизиты side by side; the track slides over on tab change.
          Each page carries its own scroll area and pinned footer. */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          display: 'flex',
          width: '200%',
          height: '100%',
          transform: isDocTab ? 'translateX(0)' : 'translateX(-50%)',
          transition: 'transform 320ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          willChange: 'transform'
        }}>
          {/* Page 1: Документ */}
          <section aria-label="Документ" inert={!isDocTab} style={paneStyle}>
            <div className="hide-scrollbar" style={paneScrollStyle}>
              {isLoading ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '60px 20px',
                  gap: '12px'
                }}>
                  <Loader2 size={32} color={primaryBlue} className="animate-spin" />
                  <span style={{ fontSize: '13px', color: textSecondary }}>Загрузка документа...</span>
                </div>
              ) : (
                <div style={{ padding: '16px 16px 20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Document picture slot: no frame, no border, no shadow, radius 8 */}
                  <div
                    ref={cardContainerRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onClick={() => {
                      if (!photoUrl && !isSaved) {
                        fileInputRef.current?.click();
                      }
                    }}
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: isSaved ? 'default' : photoUrl ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
                      touchAction: photoUrl && !isSaved ? 'none' : 'pan-y',
                      userSelect: 'none'
                    }}
                  >
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt="Удостоверение личности"
                        draggable={false}
                        style={{
                          display: 'block',
                          width: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                          objectPosition: 'center center',
                          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                          transformOrigin: 'center center',
                          transition: isDragging ? 'none' : 'transform 0.05s ease-out',
                          pointerEvents: 'none'
                        }}
                      />
                    ) : (
                      // Empty slot: tap to pick the document image
                      <div style={{
                        height: '456px',
                        backgroundColor: segTrack,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '20px',
                        textAlign: 'center',
                        boxSizing: 'border-box'
                      }}>
                        <span style={{ fontSize: '15px', fontWeight: 500, color: textPrimary }}>
                          Загрузить документ
                        </span>
                        <span style={{ fontSize: '13px', color: textSecondary }}>
                          Нажмите, чтобы добавить фото удостоверения личности
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Adjustment controls — only before saving (first upload) */}
                  {photoUrl && !isSaved && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          type="button"
                          onClick={() => setScale((s) => Math.max(0.3, parseFloat((s - 0.1).toFixed(2))))}
                          style={editControlButton}
                          aria-label="Уменьшить"
                        >
                          <ZoomOut size={18} />
                        </button>
                        <input
                          type="range"
                          min="0.5"
                          max="5.0"
                          step="0.02"
                          value={scale}
                          onChange={(e) => setScale(parseFloat(e.target.value))}
                          style={{ flex: 1, minWidth: 0, accentColor: primaryBlue, cursor: 'pointer' }}
                        />
                        <button
                          type="button"
                          onClick={() => setScale((s) => Math.min(5.0, parseFloat((s + 0.1).toFixed(2))))}
                          style={editControlButton}
                          aria-label="Увеличить"
                        >
                          <ZoomIn size={18} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleSave}
                        className="did-btn-primary touchable"
                        style={{
                          ...footerButtonBase,
                          height: '44px',
                          backgroundColor: primaryBlue,
                          border: 'none',
                          color: onPrimary,
                          fontSize: '15.5px',
                          fontWeight: 600
                        }}
                      >
                        <Check size={19} strokeWidth={2.5} />
                        Сохранить
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            {renderFooter('doc')}
          </section>

          {/* Page 2: Реквизиты — 6 rows from y 164 (9 below the segmented control), no card, no dividers */}
          <section aria-label="Реквизиты" inert={isDocTab} style={paneStyle}>
            <div className="hide-scrollbar" style={paneScrollStyle}>
              <div style={{ paddingTop: '9px' }}>
                {requisites.map((row) => (
                  <div
                    key={row.label}
                    style={{
                      height: '71px',
                      padding: '14px 18px 14px 30px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 400,
                        lineHeight: '16px',
                        color: textSecondary,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {row.label}
                      </div>
                      {/* Value: filled in by the user, looks like plain text (no field chrome) */}
                      <input
                        type="text"
                        inputMode={row.inputMode}
                        value={row.value}
                        onChange={(e) => handleRequisiteChange(row.key, e.target.value)}
                        aria-label={row.label}
                        autoComplete="off"
                        spellCheck={false}
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '22px',
                          marginTop: '5px',
                          padding: 0,
                          border: 'none',
                          outline: 'none',
                          background: 'transparent',
                          fontFamily,
                          fontSize: '17px',
                          fontWeight: 400,
                          lineHeight: '22px',
                          letterSpacing: 0,
                          color: textPrimary,
                          textOverflow: 'ellipsis',
                          boxSizing: 'border-box',
                          WebkitAppearance: 'none',
                          borderRadius: 0
                        }}
                      />

                    </div>

                    {/* Copy icon box 24 x 24, top at row top + 20, tap area 44 x 44 centred on it */}
                    <div style={{ width: '24px', height: '24px', marginTop: '6px', flexShrink: 0, position: 'relative' }}>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(row.value)}
                        aria-label={`Скопировать: ${row.label}`}
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          left: '-10px',
                          width: '44px',
                          height: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          color: textSecondary,
                          cursor: 'pointer',
                          outline: 'none',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        <CopyIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {renderFooter('reqs')}
          </section>
        </div>
      </div>
    </div>
  );
};
