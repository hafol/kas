import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, Check, Loader2, X, Share2, Download } from 'lucide-react';
import QRCode from 'qrcode';
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

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.65-.53.81-1.08.51l-3-2.21-1.45 1.39c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.22-.05-.34-.38-.13l-6.87 4.33-2.96-.92c-.64-.2-.66-.64.13-.95l11.57-4.46c.54-.2 1.01.13.88.92z" />
  </svg>
);

const SmsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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

  // Bottom Sheet Modal & button press state
  const [activeModal, setActiveModal] = useState(null); // null | 'qr' | 'share_target'
  const [pressedBtn, setPressedBtn] = useState(null); // 'present' | 'send'
  const [randomCode, setRandomCode] = useState('577642');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);
  const cachedFileRef = useRef(null);

  // Pre-generate PNG file blob in memory for instant native sharing without delays
  useEffect(() => {
    let isMounted = true;
    const src = photoUrl || '/kaspi_assets/documents/kz_id_clean.jpg';
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 750;
      canvas.height = img.naturalHeight || 960;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (isMounted && blob) {
          cachedFileRef.current = new File([blob], 'udostoverenie_lichnosti.png', { type: 'image/png' });
        }
      }, 'image/png');
    };
    img.src = src;
    return () => {
      isMounted = false;
    };
  }, [photoUrl]);

  // Generate dynamic QR code based on user's requisites and new random 6-digit code
  const openQrModal = useCallback(async () => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setRandomCode(code);

    const fio = reqValues.fullName || 'ЖҰМАШ ПАРАСАТ ДІЛМҰРАТҰЛЫ';
    const payload = [
      'KZ_DIGITAL_ID',
      `IIN:${reqValues.iin || '100723552859'}`,
      `FIO:${fio}`,
      `DOC:${reqValues.docNumber || '064142808'}`,
      `BIRTH:${reqValues.birthDate || '23.07.2010'}`,
      `EXP:${reqValues.expiryDate || '23.07.2030'}`,
      `CODE:${code}`,
      `TS:${Date.now()}`
    ].join(';');

    try {
      const url = await QRCode.toDataURL(payload, {
        margin: 0,
        width: 160, // 160px generation for crisp 145px display (+15% bigger)
        errorCorrectionLevel: 'M',
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrDataUrl(url);
    } catch (err) {
      console.warn('QR generation error:', err);
    }

    setActiveModal('qr');
  }, [reqValues]);

  const handlePresentClick = () => {
    setPressedBtn('present');
    setTimeout(() => {
      setPressedBtn(null);
      openQrModal();
    }, 150);
  };

  // Stage 2 recipient selection immediately upon clicking "Отправить"
  const handleSendClick = async () => {
    setPressedBtn('send');
    setTimeout(() => {
      setPressedBtn(null);
    }, 150);

    // On mobile devices supporting native file sharing, open the system "choose who" sheet directly
    if (navigator.canShare && cachedFileRef.current && navigator.canShare({ files: [cachedFileRef.current] })) {
      try {
        await navigator.share({
          files: [cachedFileRef.current],
          title: 'Удостоверение личности',
          text: 'Цифровой документ'
        });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // Otherwise (desktop/web or fallback): immediately show the "Кому отправить" stage
    setActiveModal('share_target');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const getRequisitesSummary = () => {
    const fio = reqValues.fullName || 'ЖҰМАШ ПАРАСАТ ДІЛМҰРАТҰЛЫ';
    return [
      'Удостоверение личности',
      `ФИО: ${fio}`,
      `ИИН: ${reqValues.iin || '100723552859'}`,
      `Дата рождения: ${reqValues.birthDate || '23.07.2010'}`,
      `Номер документа: ${reqValues.docNumber || '064142808'}`,
      `Дата выдачи: ${reqValues.issueDate || '23.07.2024'}`,
      `Срок действия: ${reqValues.expiryDate || '23.07.2030'}`
    ].join('\n');
  };

  const handleShareWhatsApp = () => {
    const text = getRequisitesSummary();
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareTelegram = () => {
    const text = getRequisitesSummary();
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareSms = () => {
    const text = getRequisitesSummary();
    window.location.href = `sms:?&body=${encodeURIComponent(text)}`;
  };

  const handleCopyAllRequisites = () => {
    const text = getRequisitesSummary();
    copyToClipboard(text);
  };

  const handleDownloadPng = () => {
    const src = photoUrl || '/kaspi_assets/documents/kz_id_clean.jpg';
    const a = document.createElement('a');
    a.href = src;
    a.download = 'udostoverenie_lichnosti.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(value).catch(() => {});
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 1800);
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
      letterSpacing: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Sticky Header with iOS Status Bar Spacer */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: pageBg,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* iOS Status Bar Spacer (pageBg behind clock & battery) */}
        <div style={{
          height: 'env(safe-area-inset-top, 47px)',
          minHeight: '44px',
          width: '100%',
          backgroundColor: pageBg,
          flexShrink: 0
        }} />

        {/* 44px Navigation Bar (Back chevron + Title + Save Checkmark) */}
        <div style={{
          position: 'relative',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: pageBg,
          boxSizing: 'border-box'
        }}>
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            aria-label="Назад"
            style={{
              position: 'absolute',
              left: '25px',
              top: '11.5px',
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

          {/* Title "Удостоверение личности" */}
          <h1 style={{
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
                top: '4px',
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
        </div>
      </div>

      {/* Relative container holding screen content with status bar offset */}
      <div style={{
        position: 'relative',
        width: '100%',
        flex: 1,
        minHeight: '820px',
        marginTop: '-44px'
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
            onClick={handlePresentClick}
            className={`did-btn-primary touchable ${pressedBtn === 'present' ? 'is-pressed' : ''}`}
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
            onClick={handleSendClick}
            className={`did-btn-secondary touchable ${pressedBtn === 'send' ? 'is-pressed' : ''}`}
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
            onClick={handleSendClick}
            className={`did-btn-secondary touchable ${pressedBtn === 'send' ? 'is-pressed' : ''}`}
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

      {/* =====================================================================
          BOTTOM SHEET MODAL (Предъявить документ QR / Отправить документ PNG)
          ===================================================================== */}
      {activeModal && (
        <div
          className="bottom-sheet-overlay"
          onClick={handleCloseModal}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            overflow: 'hidden'
          }}
        >
          <div
            className="bottom-sheet-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              width: '100%',
              maxWidth: '430px',
              boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              boxSizing: 'border-box',
              paddingTop: '6px',
              paddingBottom: '46px' // +10px higher (was 36px)
            }}
          >
            {/* Top pill drag bar */}
            <div
              style={{
                width: '38px',
                height: '4px',
                backgroundColor: '#D8D8DC',
                borderRadius: '2px',
                margin: '6px auto 1px' // moved 1px up, modal height preserved
              }}
            />

            {/* Header row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px 4px 24px'
              }}
            >
              <h2
                style={{
                  fontFamily,
                  fontSize: activeModal === 'share_target' ? '22px' : '24px',
                  fontWeight: 600,
                  color: '#1C1C1E',
                  margin: 0,
                  letterSpacing: '-0.3px',
                  position: 'relative',
                  top: '-2.5px', // moved 1.5px down (from -4px)
                  left: '-3px' // moved 1px left (from -2px)
                }}
              >
                {activeModal === 'share_target' ? 'Кому отправить' : 'Удостоверение личности'}
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Закрыть"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px',
                  cursor: 'pointer',
                  color: '#1C1C1E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <X size={24} strokeWidth={2.2} />
              </button>
            </div>

            {/* Modal Content: QR Code */}
            {activeModal === 'qr' && (
              <div>
                <p
                  style={{
                    fontFamily,
                    fontSize: '18.5px', // +1pt bigger (was 17px)
                    fontWeight: 400,
                    color: '#1C1C1E',
                    textAlign: 'center',
                    marginTop: '19px', // +3px interval below title (was 16px)
                    marginBottom: '18px',
                    letterSpacing: '-0.1px'
                  }}
                >
                  Покажите QR-код сотруднику
                </p>

                {/* QR Code container: +15% bigger (145px x 145px) */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto',
                    width: '145px',
                    height: '145px'
                  }}
                >
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="QR-код удостоверения личности"
                      draggable={false}
                      style={{
                        width: '145px',
                        height: '145px',
                        display: 'block',
                        imageRendering: 'pixelated'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '145px',
                        height: '145px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F5F5F7',
                        borderRadius: '12px'
                      }}
                    >
                      <Loader2 size={30} className="animate-spin" color="#0175CC" />
                    </div>
                  )}
                </div>

                <p
                  style={{
                    fontFamily,
                    fontSize: '19.5px', // +2pt bigger (was 17px)
                    fontWeight: 400,
                    color: '#1C1C1E',
                    textAlign: 'center',
                    marginTop: '20px',
                    marginBottom: '6px',
                    letterSpacing: '-0.1px'
                  }}
                >
                  или скажите код
                </p>

                <div
                  style={{
                    fontFamily,
                    fontSize: '29px', // -2pt smaller (was 32px)
                    fontWeight: 600, // bolder (was 400)
                    color: '#000000',
                    textAlign: 'center',
                    letterSpacing: '1px',
                    marginTop: '4px',
                    paddingBottom: '34px' // +10px higher (was 24px)
                  }}
                >
                  {randomCode}
                </div>
              </div>
            )}

            {/* Modal Content: Stage 2 Choose Recipient ("Кому отправить") */}
            {activeModal === 'share_target' && (
              <div style={{ padding: '12px 18px 8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* WhatsApp */}
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="touchable"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px 14px',
                      backgroundColor: '#F8F9FA',
                      border: 'none',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#25D366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      flexShrink: 0
                    }}>
                      <WhatsAppIcon />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily, fontSize: '16.5px', fontWeight: 600, color: '#1C1C1E' }}>
                        WhatsApp
                      </div>
                      <div style={{ fontFamily, fontSize: '13px', color: '#8E8E93', marginTop: '2px' }}>
                        Отправить в чат
                      </div>
                    </div>
                  </button>

                  {/* Telegram */}
                  <button
                    type="button"
                    onClick={handleShareTelegram}
                    className="touchable"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px 14px',
                      backgroundColor: '#F8F9FA',
                      border: 'none',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#2AABEE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      flexShrink: 0
                    }}>
                      <TelegramIcon />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily, fontSize: '16.5px', fontWeight: 600, color: '#1C1C1E' }}>
                        Telegram
                      </div>
                      <div style={{ fontFamily, fontSize: '13px', color: '#8E8E93', marginTop: '2px' }}>
                        Поделиться в Telegram
                      </div>
                    </div>
                  </button>

                  {/* SMS / Messages */}
                  <button
                    type="button"
                    onClick={handleShareSms}
                    className="touchable"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px 14px',
                      backgroundColor: '#F8F9FA',
                      border: 'none',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#34C759',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      flexShrink: 0
                    }}>
                      <SmsIcon />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily, fontSize: '16.5px', fontWeight: 600, color: '#1C1C1E' }}>
                        Сообщения (SMS)
                      </div>
                      <div style={{ fontFamily, fontSize: '13px', color: '#8E8E93', marginTop: '2px' }}>
                        Отправить текст реквизитов
                      </div>
                    </div>
                  </button>

                  {/* Скопировать реквизиты */}
                  <button
                    type="button"
                    onClick={handleCopyAllRequisites}
                    className="touchable"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px 14px',
                      backgroundColor: '#F8F9FA',
                      border: 'none',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#E5E5EA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1C1C1E',
                      flexShrink: 0
                    }}>
                      <CopyIcon />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily, fontSize: '16.5px', fontWeight: 600, color: '#1C1C1E' }}>
                        Скопировать данные
                      </div>
                      <div style={{ fontFamily, fontSize: '13px', color: '#8E8E93', marginTop: '2px' }}>
                        ФИО, ИИН, номер документа в буфер
                      </div>
                    </div>
                  </button>

                  {/* Сохранить фото (PNG) */}
                  <button
                    type="button"
                    onClick={handleDownloadPng}
                    className="touchable"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px 14px',
                      backgroundColor: '#F8F9FA',
                      border: 'none',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: '#0175CC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      flexShrink: 0
                    }}>
                      <Download size={22} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily, fontSize: '16.5px', fontWeight: 600, color: '#1C1C1E' }}>
                        Сохранить на устройство (PNG)
                      </div>
                      <div style={{ fontFamily, fontSize: '13px', color: '#8E8E93', marginTop: '2px' }}>
                        Скачать фото удостоверения
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast notification when copied */}
      {copiedToast && (
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(28, 28, 30, 0.92)',
          color: '#FFFFFF',
          padding: '10px 22px',
          borderRadius: '24px',
          fontSize: '14.5px',
          fontFamily,
          fontWeight: 500,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
          zIndex: 999,
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          Скопировано в буфер обмена
        </div>
      )}
      </div>
    </div>
  );
};
