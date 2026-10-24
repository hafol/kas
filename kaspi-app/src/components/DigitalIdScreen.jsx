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
const textPrimary   = '#1C1C1E';
const textSecondary = '#8E8E93';
const primaryBlue   = '#1446E0';
const onPrimary     = '#FFFFFF';
const outlineBorder = '#A9BCF5';
const outlineText   = '#1446E0';

const fontFamily = "system-ui, -apple-system, Roboto, 'Segoe UI', sans-serif";
const docFontFamily = "'Roboto', Arial, -apple-system, sans-serif";
const monoFontFamily = "'SF Mono', 'Roboto Mono', Consolas, monospace";

// Back Chevron Icon
const BackChevronIcon = () => (
  <svg width="22" height="22" viewBox="0 0 16 16" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
    <path
      d="M10.266,14.707C10.663,15.098 11.306,15.098 11.703,14.707C12.069,14.347 12.097,13.779 11.787,13.387L11.703,13.293L6.326,8L11.703,2.707C12.069,2.347 12.097,1.779 11.787,1.387L11.703,1.293C11.336,0.932 10.76,0.905 10.362,1.21L10.266,1.293L4.387,7.081C3.905,7.555 3.873,8.303 4.291,8.814L4.387,8.919L10.266,14.707Z"
      fill="currentColor"
    />
  </svg>
);

// QR Scan Icon
const QrScanIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
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

// Share/Upload Icon
const ShareIcon = () => (
  <svg width="20" height="22" viewBox="1 0 22 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M20,18V12C20,10.895 19.105,10 18,10H16C15.448,10 15,9.552 15,9C15,8.448 15.448,8 16,8H18C20.209,8 22,9.791 22,12V18C22,20.209 20.209,22 18,22H6C3.791,22 2,20.209 2,18L2,12C2,9.791 3.791,8 6,8H8C8.552,8 9,8.448 9,9C9,9.552 8.552,10 8,10H6C4.895,10 4,10.895 4,12L4,18C4,19.105 4.895,20 6,20H18C19.105,20 20,19.105 20,18Z" fill="currentColor" />
    <path d="M12,15.5C12.552,15.5 13,15.052 13,14.5L13,4.414L14.293,5.707C14.683,6.098 15.317,6.098 15.707,5.707C16.098,5.317 16.098,4.683 15.707,4.293L12.707,1.293C12.317,0.902 11.683,0.902 11.293,1.293L8.293,4.293C7.902,4.683 7.902,5.317 8.293,5.707C8.683,6.098 9.317,6.098 9.707,5.707L11,4.414L11,14.5C11,15.052 11.448,15.5 12,15.5Z" fill="currentColor" />
  </svg>
);

// Copy Icon
const CopyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M12,2C10.067,2 8.5,3.567 8.5,5.5V6C8.5,6.552 8.948,7 9.5,7C10.052,7 10.5,6.552 10.5,6V5.5C10.5,4.672 11.172,4 12,4H18.5C19.328,4 20,4.672 20,5.5V12.5C20,13.052 19.552,13.5 19,13.5H18C17.448,13.5 17,13.948 17,14.5C17,15.052 17.448,15.5 18,15.5H19C20.657,15.5 22,14.157 22,12.5V5.5C22,3.567 20.433,2 18.5,2H12Z" fill="currentColor" />
    <path d="M5.5,8C3.567,8 2,9.567 2,11.5V18.5C2,20.433 3.567,22 5.5,22H12.5C14.433,22 16,20.433 16,18.5V11.5C16,9.567 14.433,8 12.5,8H5.5ZM4,11.5C4,10.672 4.672,10 5.5,10H12.5C13.328,10 14,10.672 14,11.5V18.5C14,19.328 13.328,20 12.5,20H5.5C4.672,20 4,19.328 4,18.5V11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);

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

  // Synchronous initial restore from localStorage so page reload NEVER resets
  const syncDoc = loadDocumentCardSync() || {};
  const syncReqs = loadRequisitesSync() || {};

  // 3x4 Portrait Photo
  const [photoUrl, setPhotoUrl] = useState(() => syncDoc.photoUrl || null);

  // Card text values (defaulting to the authentic Kazak ID card shown in the original screenshot if empty)
  const [cardValues, setCardValues] = useState(() => {
    return {
      lastName: syncDoc.lastName || 'ЖҰМАШ',
      firstName: syncDoc.firstName || 'ПАРАСАТ',
      middleName: syncDoc.middleName || 'ДІЛМҰРАТҰЛЫ',
      birthDate: syncDoc.birthDate || syncReqs.birthDate || '23.07.2010',
      gender: syncDoc.gender || 'E',
      iin: syncDoc.iin || syncReqs.iin || '100723552859',
      docNumber: syncDoc.docNumber || syncReqs.docNumber || '064142898',
      validity: syncDoc.validity || '14.08.2026 - 13.08.2036',
      issueDate: syncDoc.issueDate || syncReqs.issueDate || '14.08.2026',
      expiryDate: syncDoc.expiryDate || syncReqs.expiryDate || '13.08.2036'
    };
  });

  // Requisites values synced with card values
  const [reqValues, setReqValues] = useState(() => {
    const fn = [syncDoc.lastName || 'ЖҰМАШ', syncDoc.firstName || 'ПАРАСАТ', syncDoc.middleName || 'ДІЛМҰРАТҰЛЫ'].filter(Boolean).join(' ');
    return {
      fullName: syncReqs.fullName || fn,
      iin: syncReqs.iin || syncDoc.iin || '100723552859',
      birthDate: syncReqs.birthDate || syncDoc.birthDate || '23.07.2010',
      docNumber: syncReqs.docNumber || syncDoc.docNumber || '064142898',
      issueDate: syncReqs.issueDate || syncDoc.issueDate || '14.08.2026',
      expiryDate: syncReqs.expiryDate || syncDoc.expiryDate || '13.08.2036',
      ...syncReqs
    };
  });

  const [savedMessage, setSavedMessage] = useState('');

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
        console.warn('Error restoring ID data:', err);
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
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(''), 2000);
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

  // Authentic printed document text style
  const cardInputStyle = {
    fontFamily: docFontFamily,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#1A1D20',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    margin: 0,
    lineHeight: 1.1,
    letterSpacing: '0.2px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: pageBg,
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      fontFamily,
      userSelect: 'none',
      position: 'relative',
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

      {/* 1. LEFT COLUMN: Nav back, Title, Vertical Segmented Control */}
      <div style={{
        width: '160px',
        flexShrink: 0,
        height: '100%',
        padding: '16px 12px 16px 14px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Header row: < Back Chevron + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={onBack}
              aria-label="Назад"
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                padding: 0,
                color: textPrimary,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <BackChevronIcon />
            </button>
            <h1 style={{
              margin: 0,
              fontSize: '15px',
              fontWeight: 600,
              color: textPrimary,
              whiteSpace: 'nowrap'
            }}>
              Удостоверение личности
            </h1>
          </div>

          {/* Vertical Segmented Control: Документ / Реквизиты */}
          <div style={{
            marginTop: '22px',
            backgroundColor: segTrack,
            borderRadius: '12px',
            padding: '2px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            position: 'relative'
          }}>
            {[
              { id: 'doc', label: 'Документ' },
              { id: 'reqs', label: 'Реквизиты' }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    height: '36px',
                    width: '100%',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: active ? segPill : 'transparent',
                    boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    fontFamily,
                    fontSize: '14px',
                    fontWeight: active ? 500 : 400,
                    color: active ? textPrimary : textSecondary,
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save feedback indicator */}
        {savedMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#059669',
            padding: '4px 0'
          }}>
            <Check size={14} />
            {savedMessage}
          </div>
        )}
      </div>

      {/* 2. CENTER AREA: Both Cards side-by-side OR Requisites List */}
      <div style={{
        flex: 1,
        minWidth: 0,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 8px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {isDocTab ? (
          /* BOTH CARDS SIDE BY SIDE (Front on left, Back on right) */
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            maxWidth: '680px'
          }}>

            {/* CARD 1: FRONT SIDE (Лицевая сторона) */}
            <div style={{
              flex: 1,
              maxWidth: '335px',
              aspectRatio: '1036 / 660',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              backgroundImage: "url('/kaspi_assets/documents/kz_id_front.jpg')",
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#E7F2F6',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)'
            }}>

              {/* 3x4 Portrait Photo Slot */}
              <div
                onClick={() => fileInputRef.current?.click()}
                title="Нажмите, чтобы загрузить фото 3×4"
                style={{
                  position: 'absolute',
                  left: '4.8%',
                  top: '15.5%',
                  width: '28.5%',
                  height: '60.5%',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: photoUrl ? 'transparent' : 'rgba(238, 244, 255, 0.85)',
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
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '4px' }}>
                    <Camera size={16} color="#1446E0" style={{ margin: '0 auto 2px' }} />
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#1446E0', lineHeight: 1 }}>
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
                  left: '38.5%',
                  top: '36.5%',
                  width: '58%',
                  height: '8.5%',
                  fontSize: 'clamp(9.5px, 1.4vw, 12px)'
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
                  left: '38.5%',
                  top: '49.5%',
                  width: '58%',
                  height: '8.5%',
                  fontSize: 'clamp(9.5px, 1.4vw, 12px)'
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
                  left: '38.5%',
                  top: '62.8%',
                  width: '58%',
                  height: '8.5%',
                  fontSize: 'clamp(9.5px, 1.4vw, 12px)'
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
                  left: '38.5%',
                  top: '75.8%',
                  width: '30%',
                  height: '8.5%',
                  fontSize: 'clamp(8.5px, 1.2vw, 11px)'
                }}
              />

              {/* ЖЫНЫСЫ / ПОЛ */}
              <input
                type="text"
                value={cardValues.gender || ''}
                onChange={(e) => handleCardFieldChange('gender', e.target.value.toUpperCase())}
                style={{
                  ...cardInputStyle,
                  position: 'absolute',
                  left: '70.0%',
                  top: '75.8%',
                  width: '26%',
                  height: '8.5%',
                  fontSize: 'clamp(8.5px, 1.2vw, 11px)'
                }}
              />

              {/* ЖСН / ИИН */}
              <input
                type="text"
                inputMode="numeric"
                maxLength={12}
                value={cardValues.iin || ''}
                onChange={(e) => handleCardFieldChange('iin', e.target.value)}
                style={{
                  ...cardInputStyle,
                  position: 'absolute',
                  left: '17.0%',
                  top: '88.5%',
                  width: '45%',
                  height: '8.5%',
                  fontSize: 'clamp(8.5px, 1.2vw, 11px)',
                  letterSpacing: '0.4px'
                }}
              />
            </div>

            {/* CARD 2: BACK SIDE (Оборотная сторона) */}
            <div style={{
              flex: 1,
              maxWidth: '335px',
              aspectRatio: '1036 / 660',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              backgroundImage: "url('/kaspi_assets/documents/kz_id_back.jpg')",
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#E7F2F6',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)'
            }}>

              {/* НОМЕР ДОКУМЕНТА (вверху) */}
              <input
                type="text"
                value={cardValues.docNumber || ''}
                onChange={(e) => handleCardFieldChange('docNumber', e.target.value)}
                style={{
                  ...cardInputStyle,
                  position: 'absolute',
                  left: '45.0%',
                  top: '6.5%',
                  width: '40%',
                  height: '8.5%',
                  fontSize: 'clamp(9.5px, 1.3vw, 12px)'
                }}
              />

              {/* Vertical Barcode on left */}
              <div style={{
                position: 'absolute',
                left: '4.2%',
                top: '22%',
                width: '16px',
                height: '52%',
                display: 'flex',
                gap: '1.5px',
                alignItems: 'stretch',
                opacity: 0.85
              }}>
                <div style={{ flex: 2, background: '#111' }} />
                <div style={{ flex: 1, background: 'transparent' }} />
                <div style={{ flex: 3, background: '#111' }} />
                <div style={{ flex: 1, background: 'transparent' }} />
                <div style={{ flex: 1, background: '#111' }} />
                <div style={{ flex: 2, background: 'transparent' }} />
                <div style={{ flex: 4, background: '#111' }} />
                <div style={{ flex: 1, background: 'transparent' }} />
                <div style={{ flex: 2, background: '#111' }} />
                <div style={{ flex: 1, background: 'transparent' }} />
                <div style={{ flex: 3, background: '#111' }} />
              </div>

              {/* ДАТА ВЫДАЧИ - СРОК ДЕЙСТВИЯ */}
              <input
                type="text"
                value={cardValues.validity || ''}
                onChange={(e) => handleCardFieldChange('validity', e.target.value)}
                style={{
                  ...cardInputStyle,
                  position: 'absolute',
                  left: '28.5%',
                  top: '59.5%',
                  width: '68%',
                  height: '8.5%',
                  fontSize: 'clamp(8.5px, 1.1vw, 10.5px)'
                }}
              />

              {/* MRZ Machine-readable lines at bottom */}
              <div style={{
                position: 'absolute',
                left: '5%',
                right: '5%',
                bottom: '4.5%',
                height: '24%',
                fontFamily: monoFontFamily,
                fontSize: 'clamp(7.5px, 0.95vw, 9.5px)',
                lineHeight: 1.25,
                fontWeight: 700,
                color: '#222',
                letterSpacing: '1px',
                pointerEvents: 'none',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}>
                <div>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                <div>{cardValues.lastName || 'ZHUMASH'}&lt;&lt;{cardValues.firstName || 'PARASSAT'}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                <div>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
              </div>
            </div>
          </div>
        ) : (
          /* REQUISITES TAB */
          <div style={{
            width: '100%',
            maxWidth: '520px',
            maxHeight: '100%',
            overflowY: 'auto',
            padding: '4px 12px'
          }}>
            {requisites.map((row) => (
              <div
                key={row.key}
                style={{
                  height: '54px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: `0.5px solid ${segTrack}`
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '11.5px', color: textSecondary }}>{row.label}</div>
                  <input
                    type="text"
                    inputMode={row.inputMode}
                    value={row.value}
                    onChange={(e) => handleRequisiteChange(row.key, e.target.value)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontFamily,
                      fontSize: '15px',
                      fontWeight: 500,
                      color: textPrimary,
                      padding: 0
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(row.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px',
                    color: textSecondary,
                    cursor: 'pointer'
                  }}
                >
                  <CopyIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. RIGHT COLUMN: Action Buttons */}
      <div style={{
        width: '175px',
        flexShrink: 0,
        height: '100%',
        padding: '16px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '12px',
        boxSizing: 'border-box'
      }}>
        {isDocTab && (
          <button
            type="button"
            className="touchable"
            style={{
              width: '100%',
              height: '50px',
              borderRadius: '11px',
              backgroundColor: primaryBlue,
              border: 'none',
              color: onPrimary,
              fontFamily,
              fontSize: '14.5px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxSizing: 'border-box'
            }}
          >
            <QrScanIcon />
            Предъявить документ
          </button>
        )}

        <button
          type="button"
          className="touchable"
          style={{
            width: '100%',
            height: '50px',
            borderRadius: '11px',
            backgroundColor: pageBg,
            boxShadow: `inset 0 0 0 1.5px ${outlineBorder}`,
            border: 'none',
            color: outlineText,
            fontFamily,
            fontSize: '14.5px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box'
          }}
        >
          <ShareIcon />
          {isDocTab ? 'Отправить документ' : 'Отправить реквизиты'}
        </button>
      </div>
    </div>
  );
};
