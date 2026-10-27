import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, Check, Loader2 } from 'lucide-react';
import {
  saveDocumentCard,
  loadDocumentCard,
  loadDocumentCardSync,
  saveRequisites,
  loadRequisites,
  loadRequisitesSync,
  optimizeImage
} from '../utils/idStorage';

// Color Tokens (from FIX LIST v2 specification)
const pageBg        = '#FFFFFF';
const segTrack      = '#F2F2F2'; // target: #F2F2F2
const segPill       = '#FFFFFF';
const hairlineColor = '#EFEFEF'; // target: hairline at y 689, full width, 1 px, ≈ #EFEFEF
const textPrimary   = '#1C1C1E';
const textSecondary = '#8E8E93';
const primaryBlue   = '#0175CC'; // target: clear medium blue (was #2155DC)
const onPrimary     = '#FFFFFF';
const outlineBorder = '#B2C8E7'; // target: border ≈ 2.5 px light blue #B2C8E7
const outlineText   = '#1665A2'; // target: text colour #1665A2

const fontFamily = "'Roboto Flex Kaspi', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif";

// 1. Back Chevron (<): 11.5 x 21 at x 25, top y 62.5, stroke ≈ 2 px
const BackChevronIcon = () => (
  <svg width="11.5" height="21" viewBox="0 0 11.5 21" fill="none" style={{ display: 'block' }}>
    <polyline points="10 1.5 1 10.5 10 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 2. QR-scan icon: +5% bigger (27.3 x 25.7)
const QrScanIcon = () => (
  <svg width="27.3" height="25.7" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
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

// 3. Upload/share icon: +5% bigger (24.2 x 26.3)
const UploadIcon = () => (
  <svg width="24.2" height="26.3" viewBox="1 0 22 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M20,18V12C20,10.895 19.105,10 18,10H16C15.448,10 15,9.552 15,9C15,8.448 15.448,8 16,8H18C20.209,8 22,9.791 22,12V18C22,20.209 20.209,22 18,22H6C3.791,22 2,20.209 2,18L2,12C2,9.791 3.791,8 6,8H8C8.552,8 9,8.448 9,9C9,9.552 8.552,10 8,10H6C4.895,10 4,10.895 4,12L4,18C4,19.105 4.895,20 6,20H18C19.105,20 20,19.105 20,18Z" fill="currentColor" />
    <path d="M12,15.5C12.552,15.5 13,15.052 13,14.5L13,4.414L14.293,5.707C14.683,6.098 15.317,6.098 15.707,5.707C16.098,5.317 16.098,4.683 15.707,4.293L12.707,1.293C12.317,0.902 11.683,0.902 11.293,1.293L8.293,4.293C7.902,4.683 7.902,5.317 8.293,5.707C8.683,6.098 9.317,6.098 9.707,5.707L11,4.414L11,14.5C11,15.052 11.448,15.5 12,15.5Z" fill="currentColor" />
  </svg>
);

// 4. Copy icon: +4% bigger (25 x 25)
const CopyIcon = () => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M12,2C10.067,2 8.5,3.567 8.5,5.5V6C8.5,6.552 8.948,7 9.5,7C10.052,7 10.5,6.552 10.5,6V5.5C10.5,4.672 11.172,4 12,4H18.5C19.328,4 20,4.672 20,5.5V12.5C20,13.052 19.552,13.5 19,13.5H18C17.448,13.5 17,13.948 17,14.5C17,15.052 17.448,15.5 18,15.5H19C20.657,15.5 22,14.157 22,12.5V5.5C22,3.567 20.433,2 18.5,2H12Z" fill="currentColor" />
    <path d="M5.5,8C3.567,8 2,9.567 2,11.5V18.5C2,20.433 3.567,22 5.5,22H12.5C14.433,22 16,20.433 16,18.5V11.5C16,9.567 14.433,8 12.5,8H5.5ZM4,11.5C4,10.672 4.672,10 5.5,10H12.5C13.328,10 14,10.672 14,11.5V18.5C14,19.328 13.328,20 12.5,20H5.5C4.672,20 4,19.328 4,18.5V11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);

const editControlButton = {
  width: '38px',
  height: '38px',
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

// Requisites rows
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

  // Synchronous initial restore from localStorage
  const syncDoc = loadDocumentCardSync();
  const syncReqs = loadRequisitesSync();

  // Document photo state
  const [photoUrl, setPhotoUrl] = useState(() => syncDoc?.photoUrl || null);
  const [scale, setScale] = useState(() => syncDoc?.scale || 1);
  const [offset, setOffset] = useState(() => ({ x: syncDoc?.offsetX || 0, y: syncDoc?.offsetY || 0 }));
  const [isSaved, setIsSaved] = useState(() => Boolean(syncDoc?.isSaved));
  const [isLoading, setIsLoading] = useState(() => !syncDoc);

  // Dragging & gesture interaction state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialOffsetX: 0, initialOffsetY: 0 });
  const touchStartDistRef = useRef(null);
  const touchStartScaleRef = useRef(1);
  const offsetRef = useRef(offset);
  offsetRef.current = offset;
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  // Requisites state
  const [reqValues, setReqValues] = useState(() => syncReqs || {});
  const reqEditedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    loadRequisites().then((saved) => {
      if (isMounted && saved && !reqEditedRef.current) setReqValues((prev) => ({ ...saved, ...prev }));
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const saved = await loadDocumentCard();
        if (isMounted && saved && saved.photoUrl) {
          if (!photoUrl) {
            setPhotoUrl(saved.photoUrl);
            setScale(saved.scale || 1);
            setOffset({ x: saved.offsetX || 0, y: saved.offsetY || 0 });
            setIsSaved(Boolean(saved.isSaved));
          }
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
  }, [photoUrl]);

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
          setIsSaved(false);
        }
      } catch (err) {
        console.warn('Error optimizing photo:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const persistCardPosition = useCallback(() => {
    if (!photoUrl) return;
    saveDocumentCard({
      photoUrl,
      scale: scaleRef.current,
      offsetX: offsetRef.current.x,
      offsetY: offsetRef.current.y,
      isSaved: true,
      savedAt: Date.now()
    }).catch(() => {});
  }, [photoUrl]);

  const handleMouseDown = (e) => {
    if (!photoUrl) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialOffsetX: offsetRef.current.x,
      initialOffsetY: offsetRef.current.y
    };
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !photoUrl) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setOffset({
      x: dragStartRef.current.initialOffsetX + dx,
      y: dragStartRef.current.initialOffsetY + dy
    });
  }, [isDragging, photoUrl]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      persistCardPosition();
    }
  }, [isDragging, persistCardPosition]);

  const handleTouchStart = (e) => {
    if (!photoUrl) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      dragStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        initialOffsetX: offsetRef.current.x,
        initialOffsetY: offsetRef.current.y
      };
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      touchStartDistRef.current = dist;
      touchStartScaleRef.current = scaleRef.current;
    }
  };

  const handleTouchMove = (e) => {
    if (!photoUrl) return;
    if (e.touches.length === 1 && isDragging) {
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.x;
      const dy = touch.clientY - dragStartRef.current.y;
      setOffset({
        x: dragStartRef.current.initialOffsetX + dx,
        y: dragStartRef.current.initialOffsetY + dy
      });
    } else if (e.touches.length === 2 && touchStartDistRef.current) {
      if (e.cancelable) e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const factor = currentDist / touchStartDistRef.current;
      const newScale = Math.min(3.5, Math.max(0.4, touchStartScaleRef.current * factor));
      setScale(parseFloat(newScale.toFixed(2)));
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
    }
    touchStartDistRef.current = null;
    persistCardPosition();
  };

  useEffect(() => {
    const onWindowMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        persistCardPosition();
      }
    };
    const onWindowMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };
    window.addEventListener('mouseup', onWindowMouseUp);
    window.addEventListener('mousemove', onWindowMouseMove);
    return () => {
      window.removeEventListener('mouseup', onWindowMouseUp);
      window.removeEventListener('mousemove', onWindowMouseMove);
    };
  }, [isDragging, handleMouseMove, persistCardPosition]);

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
    } catch {}
  };

  return (
    <div className="screen-fill" style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundColor: pageBg,
      overflowY: 'auto',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
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

      {/* =====================================================================
          1. NAV BAR (starts right at the top of the page, no status bar gap)
          - back chevron: top 14.5px, x 25px, size 11.5 x 21, stroke ≈ 2 px
          - title: top 17.5px, 218 wide (font ≈ 18.5 px Semibold), centred on screen
          ===================================================================== */}
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        aria-label="Назад"
        style={{
          position: 'absolute',
          left: '25px',
          top: '14.5px', // 62.5 - 48 = 14.5px
          width: '11.5px',
          height: '21px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          padding: 0,
          color: textPrimary,
          cursor: 'pointer',
          outline: 'none',
          zIndex: 20,
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <BackChevronIcon />
      </button>

      {/* Title "Удостоверение личности": 218 wide, text top 14.5px (up 1px), centred */}
      <h1 style={{
        position: 'absolute',
        top: '14.5px', // up by 1px (was 15.5px)
        left: 'calc(50% - 109px)',
        width: '218px',
        margin: 0,
        padding: 0,
        fontFamily,
        fontSize: '18.5px',
        fontWeight: 600,
        color: textPrimary,
        lineHeight: 1.15,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        letterSpacing: '-0.2px',
        zIndex: 10
      }}>
        Удостоверение личности
      </h1>

      {/* Save checkmark button if photo uploaded and not saved */}
      {photoUrl && !isSaved && (
        <button
          type="button"
          onClick={handleSave}
          aria-label="Сохранить"
          className="touchable"
          style={{
            position: 'absolute',
            right: '16px',
            top: '8px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#0175CC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            zIndex: 20
          }}
        >
          <Check size={20} strokeWidth={2.4} />
        </button>
      )}

      {/* =====================================================================
          2. SEGMENTED CONTROL (Документ / Реквизиты)
          - height: 39px (decreased by 2px)
          - label font: 16.5px (smaller by 1px)
          ===================================================================== */}
      <div style={{
        position: 'absolute',
        top: '67px',
        left: '17.5px',
        right: '17.5px',
        height: '39px', // decreased by 2px (was 41px)
        backgroundColor: segTrack,
        borderRadius: '10px',
        zIndex: 15,
        display: 'flex'
      }}>
        {/* Selected white pill */}
        <div style={{
          position: 'absolute',
          top: '2px',
          bottom: '2px',
          left: '2px',
          width: 'calc(50% - 4px)',
          backgroundColor: segPill,
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
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
              height: '39px', // 39px
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              background: 'none',
              border: 'none',
              padding: 0,
              paddingTop: '12px',
              fontFamily,
              fontSize: '16.5px', // smaller by 1px (was 17.5px)
              fontWeight: 500,
              color: textPrimary,
              lineHeight: 1,
              letterSpacing: 0,
              cursor: 'pointer',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
              userSelect: 'none',
              textAlign: 'center'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =====================================================================
          TAB 1: ДОКУМЕНТ
          ===================================================================== */}
      {isDocTab && (
        <>
          {/* =====================================================================
              3. DOCUMENT PICTURE (front + back of the card)
              - left / right edge: x 29.5 / 386.5 (357 wide, side margins ≈ 29)
              - front side: y 196 → 428.5
              - back side: y 431.5 → 655.5 (gap between the two sides 3 px)
              - Scale down to 357 wide keeping its proportions; do not stretch it.
              ===================================================================== */}
          <div
            ref={cardContainerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => {
              if (!photoUrl) {
                fileInputRef.current?.click();
              }
            }}
            onDoubleClick={() => {
              fileInputRef.current?.click();
            }}
            style={{
              position: 'absolute',
              top: '148px', // 196 - 48 = 148px
              left: '28.5px', // x 28.5 → 385.5 (357 wide, side margins ≈ 29 on 414px page)
              width: '357px',
              height: '459.5px',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: photoUrl ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
              touchAction: photoUrl ? 'none' : 'pan-y',
              userSelect: 'none',
              zIndex: 5
            }}
          >
            <img
              src={photoUrl || '/kaspi_assets/documents/kz_id_clean.jpg'}
              alt="Удостоверение личности"
              draggable={false}
              style={{
                display: 'block',
                width: '357px',
                height: '459.5px',
                objectFit: 'contain',
                objectPosition: 'center center',
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.05s ease-out',
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Adjustment controls when editing upload */}
          {photoUrl && !isSaved && (
            <div style={{
              position: 'absolute',
              top: '610px', // 658 - 48 = 610px
              left: '28.5px',
              width: '357px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 15
            }}>
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
          )}

          {/* =====================================================================
              4. FOOTER (pinned to the bottom)
              - hairline: y 689, full width, 1 px, ≈ #EFEFEF
              - button 1: y 706.5 → 770.5 (64 tall), x 17 → 397, colour #0175CC
              - button 1 text: 193 wide (font +2 px, white), icon ≈ 26 x 24.5
              - gap: 11.5
              - button 2: y 782 → 844.5 (62.5 tall), x 17 → 397, white, border ≈ 2.5 px #B2C8E7
              - button 2 text: 175 wide, colour #1665A2 (font +1.5 px)
              - button 2 share icon: ≈ 23 wide, colour #1665A2
              ===================================================================== */}
          {/* Hairline: y 641 (689 - 48), full width, 1 px, ≈ #EFEFEF */}
          <div style={{
            position: 'absolute',
            top: '641px',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: hairlineColor,
            zIndex: 10
          }} />

          {/* Button 1 "Предъявить документ" */}
          <button
            type="button"
            className="did-btn-primary touchable"
            style={{
              position: 'absolute',
              top: '658.5px', // 706.5 - 48 = 658.5px
              left: '17px',
              right: '17px',
              height: '64px',
              backgroundColor: primaryBlue, // #0175CC
              borderRadius: '12px',
              border: 'none',
              color: onPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontFamily,
              fontSize: '18px', // +2 px
              fontWeight: 500,
              letterSpacing: 0,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              outline: 'none',
              boxSizing: 'border-box',
              zIndex: 10
            }}
          >
            <QrScanIcon />
            Предъявить документ
          </button>

          {/* Button 2 "Отправить документ" */}
          <button
            type="button"
            className="did-btn-secondary touchable"
            style={{
              position: 'absolute',
              top: '734px', // 782 - 48 = 734px
              left: '17px',
              right: '17px',
              height: '62.5px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: 'none',
              boxShadow: `inset 0 0 0 2.5px ${outlineBorder}`, // 2.5 px light blue #B2C8E7
              color: outlineText, // #1665A2
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontFamily,
              fontSize: '17.5px', // +1.5 px
              fontWeight: 500,
              letterSpacing: 0,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              outline: 'none',
              boxSizing: 'border-box',
              zIndex: 10
            }}
          >
            <UploadIcon />
            Отправить документ
          </button>
        </>
      )}

      {/* =====================================================================
          TAB 2: РЕКВИЗИТЫ
          ===================================================================== */}
      {!isDocTab && (
        <>
          <div
            className="hide-scrollbar"
            style={{
              position: 'absolute',
              top: '112px', // moved 2px up closer to toggler (was 114px)
              bottom: '80px',
              left: 0,
              right: 0,
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              zIndex: 5
            }}
          >
            <div style={{ paddingTop: '8px' }}>
              {requisites.map((row) => (
                <div
                  key={row.label}
                  style={{
                    height: '73px',
                    padding: '13px 18px 13px 30px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '14.5px', // +1.5pt bigger (was 13px)
                      fontWeight: 400,
                      lineHeight: '18px',
                      color: textSecondary,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {row.label}
                    </div>
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
                        height: '24px',
                        marginTop: '4px',
                        padding: 0,
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        fontFamily,
                        fontSize: '18.5px', // +1.5pt bigger (was 17px)
                        fontWeight: 400,
                        lineHeight: '24px',
                        letterSpacing: 0,
                        color: textPrimary,
                        textOverflow: 'ellipsis',
                        boxSizing: 'border-box',
                        WebkitAppearance: 'none',
                        borderRadius: 0
                      }}
                    />
                  </div>

                  <div style={{ width: '25px', height: '25px', marginTop: '6px', flexShrink: 0, position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(row.value)}
                      aria-label={`Скопировать: ${row.label}`}
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '-10px',
                        width: '45px',
                        height: '45px',
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

          {/* Button 2 "Отправить реквизиты" */}
          <button
            type="button"
            className="did-btn-secondary touchable"
            style={{
              position: 'absolute',
              top: '734px', // 782 - 48 = 734px
              left: '17px',
              right: '17px',
              height: '62.5px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: 'none',
              boxShadow: `inset 0 0 0 2.5px ${outlineBorder}`,
              color: outlineText,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontFamily,
              fontSize: '19px', // +1.5pt bigger (was 17.5px)
              fontWeight: 500,
              letterSpacing: 0,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              outline: 'none',
              boxSizing: 'border-box',
              zIndex: 10
            }}
          >
            <UploadIcon />
            Отправить реквизиты
          </button>
        </>
      )}
    </div>
  );
};
