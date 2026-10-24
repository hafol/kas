import React, { useState, useEffect, useRef } from 'react';
import { Camera, Check } from 'lucide-react';
import {
  saveDocumentCard,
  loadDocumentCard,
  loadDocumentCardSync,
  saveRequisites,
  loadRequisites,
  loadRequisitesSync,
  optimizeImage
} from '../utils/idStorage';

// Official Kaspi Colors
const pageBg        = '#FFFFFF';
const segTrack      = '#EEEEF0';
const segPill       = '#FFFFFF';
const hairline      = '#E5E5EA';
const textPrimary   = '#1C1C1E';
const textSecondary = '#8E8E93';
const primaryBlue   = '#1446E0';
const onPrimary     = '#FFFFFF';
const outlineBorder = '#A9BCF5';
const outlineText   = '#1446E0';

const fontFamily = "'Roboto Flex Kaspi', 'Roboto', system-ui, -apple-system, sans-serif";
const docFontFamily = "'Roboto Flex Kaspi', 'Roboto', Arial, -apple-system, sans-serif";
const monoFontFamily = "'SF Mono', 'Roboto Mono', Consolas, monospace";

// Back Chevron Icon
const BackChevronIcon = () => (
  <svg width="22.5" height="22.5" viewBox="0 0 16 16" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
    <path
      d="M10.266,14.707C10.663,15.098 11.306,15.098 11.703,14.707C12.069,14.347 12.097,13.779 11.787,13.387L11.703,13.293L6.326,8L11.703,2.707C12.069,2.347 12.097,1.779 11.787,1.387L11.703,1.293C11.336,0.932 10.76,0.905 10.362,1.21L10.266,1.293L4.387,7.081C3.905,7.555 3.873,8.303 4.291,8.814L4.387,8.919L10.266,14.707Z"
      fill="currentColor"
    />
  </svg>
);

// QR Scan Icon
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

// Share Icon
const ShareIcon = () => (
  <svg width="22" height="24" viewBox="1 0 22 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M20,18V12C20,10.895 19.105,10 18,10H16C15.448,10 15,9.552 15,9C15,8.448 15.448,8 16,8H18C20.209,8 22,9.791 22,12V18C22,20.209 20.209,22 18,22H6C3.791,22 2,20.209 2,18L2,12C2,9.791 3.791,8 6,8H8C8.552,8 9,8.448 9,9C9,9.552 8.552,10 8,10H6C4.895,10 4,10.895 4,12L4,18C4,19.105 4.895,20 6,20H18C19.105,20 20,19.105 20,18Z" fill="currentColor" />
    <path d="M12,15.5C12.552,15.5 13,15.052 13,14.5L13,4.414L14.293,5.707C14.683,6.098 15.317,6.098 15.707,5.707C16.098,5.317 16.098,4.683 15.707,4.293L12.707,1.293C12.317,0.902 11.683,0.902 11.293,1.293L8.293,4.293C7.902,4.683 7.902,5.317 8.293,5.707C8.683,6.098 9.317,6.098 9.707,5.707L11,4.414L11,14.5C11,15.052 11.448,15.5 12,15.5Z" fill="currentColor" />
  </svg>
);

// Copy Icon
const CopyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M12,2C10.067,2 8.5,3.567 8.5,5.5V6C8.5,6.552 8.948,7 9.5,7C10.052,7 10.5,6.552 10.5,6V5.5C10.5,4.672 11.172,4 12,4H18.5C19.328,4 20,4.672 20,5.5V12.5C20,13.052 19.552,13.5 19,13.5H18C17.448,13.5 17,13.948 17,14.5C17,15.052 17.448,15.5 18,15.5H19C20.657,15.5 22,14.157 22,12.5V5.5C22,3.567 20.433,2 18.5,2H12Z" fill="currentColor" />
    <path d="M5.5,8C3.567,8 2,9.567 2,11.5V18.5C2,20.433 3.567,22 5.5,22H12.5C14.433,22 16,20.433 16,18.5V11.5C16,9.567 14.433,8 12.5,8H5.5ZM4,11.5C4,10.672 4.672,10 5.5,10H12.5C13.328,10 14,10.672 14,11.5V18.5C14,19.328 13.328,20 12.5,20H5.5C4.672,20 4,19.328 4,18.5V11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);

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

  // Synchronous initial restore from localStorage so data NEVER resets on page reload
  const syncDoc = loadDocumentCardSync() || {};
  const syncReqs = loadRequisitesSync() || {};

  // 3x4 Portrait Photo
  const [photoUrl, setPhotoUrl] = useState(() => syncDoc.photoUrl || null);

  // Card text values (starts empty unless user already entered and saved data)
  const [cardValues, setCardValues] = useState(() => {
    return {
      lastName: syncDoc.lastName || '',
      firstName: syncDoc.firstName || '',
      middleName: syncDoc.middleName || '',
      birthDate: syncDoc.birthDate || syncReqs.birthDate || '',
      gender: syncDoc.gender || '',
      iin: syncDoc.iin || syncReqs.iin || '',
      docNumber: syncDoc.docNumber || syncReqs.docNumber || '',
      validity: syncDoc.validity || '',
      issueDate: syncDoc.issueDate || syncReqs.issueDate || '',
      expiryDate: syncDoc.expiryDate || syncReqs.expiryDate || ''
    };
  });

  // Requisites values synced with card values
  const [reqValues, setReqValues] = useState(() => {
    const fn = [syncDoc.lastName, syncDoc.firstName, syncDoc.middleName].filter(Boolean).join(' ');
    return {
      fullName: syncReqs.fullName || fn || '',
      iin: syncReqs.iin || syncDoc.iin || '',
      birthDate: syncReqs.birthDate || syncDoc.birthDate || '',
      docNumber: syncReqs.docNumber || syncDoc.docNumber || '',
      issueDate: syncReqs.issueDate || syncDoc.issueDate || '',
      expiryDate: syncReqs.expiryDate || syncDoc.expiryDate || '',
      ...syncReqs
    };
  });

  const [savedFeedback, setSavedFeedback] = useState('');

  // Asynchronous backup restore from IndexedDB
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const savedDoc = await loadDocumentCard();
        const savedReqs = await loadRequisites();
        if (isMounted) {
          if (savedDoc) {
            if (savedDoc.photoUrl && !photoUrl) setPhotoUrl(savedDoc.photoUrl);
            setCardValues((prev) => ({ ...prev, ...savedDoc }));
          }
          if (savedReqs) {
            setReqValues((prev) => ({ ...prev, ...savedReqs }));
          }
        }
      } catch (err) {
        console.warn('Error restoring ID data from IndexedDB:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save all changes immediately to localStorage + IndexedDB
  const persistAll = async (nextPhoto, nextCard, nextReqs) => {
    const photo = nextPhoto !== undefined ? nextPhoto : photoUrl;
    const card = nextCard !== undefined ? nextCard : cardValues;
    const reqs = nextReqs !== undefined ? nextReqs : reqValues;

    const docPayload = {
      ...card,
      photoUrl: photo,
      isSaved: true,
      updatedAt: Date.now()
    };

    await saveDocumentCard(docPayload);
    await saveRequisites(reqs);
  };

  // Upload 3x4 portrait photo
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const optimized = await optimizeImage(file);
        if (optimized) {
          setPhotoUrl(optimized);
          await persistAll(optimized, cardValues, reqValues);
          triggerSaveFeedback('Фото 3×4 сохранено');
        }
      } catch (err) {
        console.warn('Error uploading photo:', err);
      }
    }
  };

  const triggerSaveFeedback = (msg = 'Сохранено') => {
    setSavedFeedback(msg);
    setTimeout(() => setSavedFeedback(''), 2000);
  };

  // Update field and sync with requisites & auto-save
  const handleCardFieldChange = (key, value) => {
    const nextCard = { ...cardValues, [key]: value };
    setCardValues(nextCard);

    const nextReqs = { ...reqValues };
    if (key === 'lastName' || key === 'firstName' || key === 'middleName') {
      const parts = [
        key === 'lastName' ? value : nextCard.lastName,
        key === 'firstName' ? value : nextCard.firstName,
        key === 'middleName' ? value : nextCard.middleName
      ].filter(Boolean);
      nextReqs.fullName = parts.join(' ');
    } else if (key === 'iin') {
      nextReqs.iin = value;
    } else if (key === 'birthDate') {
      nextReqs.birthDate = value;
    } else if (key === 'docNumber') {
      nextReqs.docNumber = value;
    } else if (key === 'validity') {
      const parts = value.split('-').map(s => s.trim());
      if (parts[0]) nextReqs.issueDate = parts[0];
      if (parts[1]) nextReqs.expiryDate = parts[1];
    }

    setReqValues(nextReqs);
    persistAll(photoUrl, nextCard, nextReqs);
  };

  // Update requisite row and sync with card
  const handleRequisiteChange = (key, value) => {
    const nextReqs = { ...reqValues, [key]: value };
    setReqValues(nextReqs);

    const nextCard = { ...cardValues };
    if (key === 'fullName') {
      const parts = value.trim().split(/\s+/);
      nextCard.lastName = (parts[0] || '').toUpperCase();
      nextCard.firstName = (parts[1] || '').toUpperCase();
      nextCard.middleName = (parts.slice(2).join(' ') || '').toUpperCase();
    } else if (key === 'iin') {
      nextCard.iin = value;
    } else if (key === 'birthDate') {
      nextCard.birthDate = value;
    } else if (key === 'docNumber') {
      nextCard.docNumber = value;
    } else if (key === 'issueDate' || key === 'expiryDate') {
      const iDate = key === 'issueDate' ? value : nextReqs.issueDate;
      const eDate = key === 'expiryDate' ? value : nextReqs.expiryDate;
      if (iDate && eDate) nextCard.validity = `${iDate} - ${eDate}`;
    }

    setCardValues(nextCard);
    persistAll(photoUrl, nextCard, nextReqs);
  };

  const copyToClipboard = (value) => {
    if (value) {
      navigator.clipboard?.writeText(value).catch(() => {});
      triggerSaveFeedback('Скопировано');
    }
  };

  const isDocTab = activeTab === 'doc';
  const requisites = requisiteFields.map((field) => ({ ...field, value: reqValues[field.key] ?? '' }));

  // Authentic printed document text style matching real Kaspi screenshot
  const cardInputStyle = {
    fontFamily: docFontFamily,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#111111',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    margin: 0,
    lineHeight: 1,
    letterSpacing: '0.2px',
    boxSizing: 'border-box'
  };

  // Pinned footer of each tab
  const renderFooter = (tab) => (
    <div style={{
      flexShrink: 0,
      position: 'relative',
      backgroundColor: pageBg,
      padding: '12px 16px calc(12px + max(env(safe-area-inset-bottom, 0px), 20px)) 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {tab === 'doc' && (
        <>
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
            className="did-btn-primary touchable"
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
        className="did-btn-secondary touchable"
        style={{
          ...footerButtonBase,
          backgroundColor: pageBg,
          border: 'none',
          boxShadow: `inset 0 0 0 1.5px ${outlineBorder}`,
          color: outlineText
        }}
      >
        <ShareIcon />
        {tab === 'doc' ? 'Отправить документ' : 'Отправить реквизиты'}
      </button>
    </div>
  );

  return (
    <div className="screen-fill" style={{
      width: '100%',
      height: '100%',
      backgroundColor: pageBg,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily,
      letterSpacing: 0,
      boxSizing: 'border-box'
    }}>
      {/* Hidden file picker for 3x4 portrait photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handlePhotoUpload}
      />

      {/* Safe Area Inset Top */}
      <div style={{ height: 'env(safe-area-inset-top, 0px)', flexShrink: 0 }} />

      {/* 1. Header Nav Bar */}
      <div style={{
        height: '52px',
        flexShrink: 0,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Назад"
          style={{
            position: 'absolute',
            left: '7.6px',
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

        {/* Title */}
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

        {/* Save feedback indicator */}
        {savedFeedback && (
          <div style={{
            position: 'absolute',
            right: '16px',
            top: '4px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12.5px',
            fontWeight: 500,
            color: '#059669'
          }}>
            <Check size={14} />
            {savedFeedback}
          </div>
        )}
      </div>

      {/* 2. Horizontal Segmented Control */}
      <div style={{
        marginTop: '6px',
        marginLeft: '16px',
        marginRight: '16px',
        height: '40px',
        flexShrink: 0,
        backgroundColor: segTrack,
        borderRadius: '12px',
        position: 'relative',
        display: 'flex'
      }}>
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
              cursor: 'pointer',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Track Pages: Документ | Реквизиты */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          display: 'flex',
          width: '200%',
          height: '100%',
          transform: isDocTab ? 'translateX(0)' : 'translateX(-50%)',
          transition: 'transform 320ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          willChange: 'transform'
        }}>

          {/* PAGE 1: Документ (Большое изображение без лишнего белого контейнера) */}
          <section aria-label="Документ" inert={!isDocTab} style={paneStyle}>
            <div className="hide-scrollbar" style={paneScrollStyle}>
              <div style={{ padding: '12px 14px 20px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Vertical Official Kazakhstan ID Template — без рамки-контейнера, крупно */}
                <div style={{
                  width: '100%',
                  aspectRatio: '1036 / 1322',
                  position: 'relative',
                  backgroundImage: "url('/kaspi_assets/documents/kz_id_clean.jpg')",
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '6px',
                  userSelect: 'none'
                }}>

                  {/* 3x4 Portrait Photo Slot (на лицевой стороне слева) */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    title="Нажмите, чтобы загрузить фото 3×4"
                    style={{
                      position: 'absolute',
                      left: '4.8%',
                      top: '7.6%',
                      width: '28.5%',
                      height: '30.4%',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: photoUrl ? 'transparent' : 'rgba(238, 244, 255, 0.7)',
                      border: photoUrl ? 'none' : '1px dashed #2563EB',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      boxSizing: 'border-box'
                    }}
                  >
                    {photoUrl ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                          src={photoUrl}
                          alt="Фото 3×4"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: '3px',
                          right: '3px',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          borderRadius: '3px',
                          padding: '2px 3px',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <Camera size={9} color="#FFFFFF" />
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '4px' }}>
                        <Camera size={16} color="#1446E0" style={{ margin: '0 auto 2px' }} />
                        <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#1446E0', lineHeight: 1 }}>
                          3×4
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ТЕГІ / ФАМИЛИЯ */}
                  <input
                    type="text"
                    value={cardValues.lastName || ''}
                    onChange={(e) => handleCardFieldChange('lastName', e.target.value.toUpperCase())}
                    style={{
                      ...cardInputStyle,
                      position: 'absolute',
                      left: '39.0%',
                      top: '18.5%',
                      width: '55%',
                      height: '3.8%',
                      fontSize: 'clamp(11px, 3.4vw, 13.5px)'
                    }}
                  />

                  {/* АТЫ / ИМЯ */}
                  <input
                    type="text"
                    value={cardValues.firstName || ''}
                    onChange={(e) => handleCardFieldChange('firstName', e.target.value.toUpperCase())}
                    style={{
                      ...cardInputStyle,
                      position: 'absolute',
                      left: '39.0%',
                      top: '25.0%',
                      width: '55%',
                      height: '3.8%',
                      fontSize: 'clamp(11px, 3.4vw, 13.5px)'
                    }}
                  />

                  {/* ӘКЕСІНІҢ АТЫ / ОТЧЕСТВО */}
                  <input
                    type="text"
                    value={cardValues.middleName || ''}
                    onChange={(e) => handleCardFieldChange('middleName', e.target.value.toUpperCase())}
                    style={{
                      ...cardInputStyle,
                      position: 'absolute',
                      left: '39.0%',
                      top: '31.5%',
                      width: '55%',
                      height: '3.8%',
                      fontSize: 'clamp(11px, 3.4vw, 13.5px)'
                    }}
                  />

                  {/* ТУҒАН КҮНІ / ДАТА РОЖДЕНИЯ */}
                  <input
                    type="text"
                    value={cardValues.birthDate || ''}
                    onChange={(e) => handleCardFieldChange('birthDate', e.target.value)}
                    style={{
                      ...cardInputStyle,
                      position: 'absolute',
                      left: '39.0%',
                      top: '38.0%',
                      width: '28%',
                      height: '3.8%',
                      fontSize: 'clamp(10px, 3.0vw, 12px)'
                    }}
                  />

                  {/* ЖЫНЫСЫ / ПОЛ (по центру под ЖЫНЫСЫ/ПОЛ) */}
                  <input
                    type="text"
                    value={cardValues.gender || ''}
                    onChange={(e) => handleCardFieldChange('gender', e.target.value.toUpperCase())}
                    style={{
                      ...cardInputStyle,
                      position: 'absolute',
                      left: '69.5%',
                      top: '38.0%',
                      width: '18%',
                      height: '3.8%',
                      textAlign: 'center',
                      fontSize: 'clamp(10px, 3.0vw, 12px)'
                    }}
                  />

                  {/* ЖСН / ИИН (сразу после надписи ЖСН/ИИН) */}
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={12}
                    value={cardValues.iin || ''}
                    onChange={(e) => handleCardFieldChange('iin', e.target.value)}
                    style={{
                      ...cardInputStyle,
                      position: 'absolute',
                      left: '19.5%',
                      top: '45.4%',
                      width: '35%',
                      height: '3.8%',
                      fontSize: 'clamp(10px, 3.0vw, 12px)',
                      letterSpacing: '0.4px'
                    }}
                  />

                  {/* ОБОРОТНАЯ СТОРОНА: Номер документа (вверху справа) */}
                  <input
                    type="text"
                    value={cardValues.docNumber || ''}
                    onChange={(e) => handleCardFieldChange('docNumber', e.target.value)}
                    style={{
                      ...cardInputStyle,
                      position: 'absolute',
                      left: '63.0%',
                      top: '53.5%',
                      width: '32%',
                      height: '3.8%',
                      textAlign: 'center',
                      fontSize: 'clamp(11px, 3.3vw, 13.5px)'
                    }}
                  />

                  {/* ОБОРОТНАЯ СТОРОНА: Дата выдачи - срок действия */}
                  <input
                    type="text"
                    value={cardValues.validity || ''}
                    onChange={(e) => handleCardFieldChange('validity', e.target.value)}
                    style={{
                      ...cardInputStyle,
                      position: 'absolute',
                      left: '29.5%',
                      top: '76.5%',
                      width: '45%',
                      height: '3.8%',
                      fontSize: 'clamp(9.5px, 2.9vw, 11.5px)'
                    }}
                  />
                </div>
              </div>
            </div>
            {renderFooter('doc')}
          </section>

          {/* PAGE 2: Реквизиты */}
          <section aria-label="Реквизиты" inert={isDocTab} style={paneStyle}>
            <div className="hide-scrollbar" style={paneScrollStyle}>
              <div style={{ paddingTop: '9px' }}>
                {requisites.map((row) => (
                  <div
                    key={row.key}
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
                      <input
                        type="text"
                        inputMode={row.inputMode}
                        value={row.value}
                        onChange={(e) => handleRequisiteChange(row.key, e.target.value)}
                        placeholder="Не указано"
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

                    {/* Copy icon */}
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
