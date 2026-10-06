import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Plus, ZoomIn, ZoomOut, Check, QrCode, Share2, ShieldCheck, Loader2 } from 'lucide-react';
import { saveDocumentCard, loadDocumentCard } from '../utils/idStorage';

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

  // Handle image upload with 100% original high-resolution preservation
  const handlePhotoUpload = (e) => {
    if (isSaved) return; // Strictly locked once saved
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setPhotoUrl(result);
        setScale(1);
        setOffset({ x: 0, y: 0 });
        setIsSaved(false);
      };
      // Read original image preserving full fidelity and detail
      reader.readAsDataURL(file);
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
    setIsSaved(true);
    setIsDragging(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F5F7',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '30px'
    }}>
      {/* Hidden file input: only active when not saved */}
      {!isSaved && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handlePhotoUpload}
        />
      )}

      {/* Header */}
      <div style={{
        height: '48px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EBEBEB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div onClick={onBack} className="touchable" style={{ padding: '6px', cursor: 'pointer' }}>
          <ArrowLeft size={22} color="#1F1F1F" />
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <span style={{ fontSize: '17px', fontWeight: '700', color: '#1F1F1F' }}>
            Удостоверение личности
          </span>
        </div>
        <div style={{ width: '34px' }} /> {/* Spacer to keep title centered */}
      </div>

      {/* Segmented Tab Bar */}
      <div style={{ padding: '12px 16px 8px 16px' }}>
        <div style={{
          backgroundColor: '#EBEBEB',
          borderRadius: '9px',
          padding: '2px',
          display: 'flex',
          height: '34px'
        }}>
          <div
            onClick={() => setActiveTab('doc')}
            className="touchable"
            style={{
              flex: 1,
              backgroundColor: activeTab === 'doc' ? '#FFFFFF' : 'transparent',
              borderRadius: '7px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: activeTab === 'doc' ? '700' : '500',
              color: '#1F1F1F',
              boxShadow: activeTab === 'doc' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              cursor: 'pointer'
            }}
          >
            Документ
          </div>

          <div
            onClick={() => setActiveTab('reqs')}
            className="touchable"
            style={{
              flex: 1,
              backgroundColor: activeTab === 'reqs' ? '#FFFFFF' : 'transparent',
              borderRadius: '7px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: activeTab === 'reqs' ? '700' : '500',
              color: '#1F1F1F',
              boxShadow: activeTab === 'reqs' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              cursor: 'pointer'
            }}
          >
            Реквизиты
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          gap: '12px'
        }}>
          <Loader2 size={32} color="#0089D0" className="animate-spin" />
          <span style={{ fontSize: '13px', color: '#757575' }}>Загрузка документа...</span>
        </div>
      ) : activeTab === 'doc' ? (
        <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Main ID Document Card Area */}
          <div
            ref={cardContainerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              width: '100%',
              aspectRatio: '1.586 / 1', // Standard ID-1 / CR80 card aspect ratio
              borderRadius: '14px',
              backgroundColor: photoUrl ? '#0F172A' : '#FFFFFF',
              border: photoUrl ? '1px solid #D1D5DB' : '2px dashed #B0BEC5',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isSaved ? 'default' : photoUrl ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
              touchAction: photoUrl && !isSaved ? 'none' : 'auto',
              userSelect: 'none'
            }}
            onClick={() => {
              if (!photoUrl && !isSaved) {
                fileInputRef.current?.click();
              }
            }}
          >
            {photoUrl ? (
              // Draggable & Zoomable Document Photo (Keeps full original resolution)
              <img
                src={photoUrl}
                alt="Удостоверение личности"
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.05s ease-out',
                  pointerEvents: 'none'
                }}
              />
            ) : (
              // Plus (+) Button to Upload
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                textAlign: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#E8F3FA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0089D0',
                  boxShadow: '0 2px 6px rgba(0, 137, 208, 0.15)'
                }}>
                  <Plus size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>
                    Загрузить документ
                  </div>
                  <div style={{ fontSize: '12px', color: '#757575', marginTop: '4px' }}>
                    Нажмите, чтобы добавить фото удостоверения личности
                  </div>
                </div>
              </div>
            )}

            {/* In edit mode (uploaded but not saved): watermark guide overlay */}
            {photoUrl && !isSaved && (
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '12px',
                right: '12px',
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(4px)'
                }}>
                  Перетаскивайте фото для выравнивания
                </div>
              </div>
            )}
          </div>

          {/* Adjustment Controls (Zoom slider & buttons) — Only shown BEFORE saving */}
          {photoUrl && !isSaved && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid #EBEBEB',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1F1F1F' }}>
                  Размер и масштаб
                </span>
                <span style={{ fontSize: '12px', color: '#757575', fontWeight: '500' }}>
                  {Math.round(scale * 100)}%
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setScale((s) => Math.max(0.4, parseFloat((s - 0.1).toFixed(2))))}
                  className="touchable"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid #E0E0E0',
                    backgroundColor: '#F7F7F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Уменьшить"
                >
                  <ZoomOut size={18} color="#555555" />
                </button>

                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  style={{
                    flex: 1,
                    accentColor: '#0089D0',
                    height: '6px',
                    cursor: 'pointer'
                  }}
                />

                <button
                  type="button"
                  onClick={() => setScale((s) => Math.min(3.5, parseFloat((s + 0.1).toFixed(2))))}
                  className="touchable"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid #E0E0E0',
                    backgroundColor: '#F7F7F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Увеличить"
                >
                  <ZoomIn size={18} color="#555555" />
                </button>
              </div>
            </div>
          )}

          {/* SAVE BUTTON — Pops up after photo is uploaded, disappears forever once saved! */}
          {photoUrl && !isSaved && (
            <button
              onClick={handleSave}
              className="touchable"
              style={{
                height: '48px',
                borderRadius: '10px',
                backgroundColor: '#0089D0',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(0, 137, 208, 0.35)',
                cursor: 'pointer',
                marginTop: '4px'
              }}
            >
              <Check size={20} color="#FFFFFF" strokeWidth={2.5} />
              Сохранить
            </button>
          )}

          {/* Action Buttons — Shown when saved and locked in place */}
          {photoUrl && isSaved && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
              {/* Blue Button: Предъявить документ */}
              <button
                className="touchable"
                style={{
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: '#0089D0',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 3px 10px rgba(0, 137, 208, 0.25)',
                  cursor: 'pointer'
                }}
              >
                <QrCode size={19} color="#FFFFFF" />
                Предъявить документ
              </button>

              {/* White Button: Отправить документ */}
              <button
                className="touchable"
                style={{
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #0089D0',
                  color: '#0089D0',
                  fontSize: '15px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}
              >
                <Share2 size={19} color="#0089D0" />
                Отправить документ
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Tab 2: Реквизиты */
        <div style={{
          backgroundColor: '#FFFFFF',
          margin: '12px 16px',
          borderRadius: '10px',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '10px'
        }}>
          <ShieldCheck size={36} color="#0089D0" />
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>
            Реквизиты документа
          </div>
          <div style={{ fontSize: '13px', color: '#757575', maxWidth: '280px', lineHeight: '18px' }}>
            {isSaved
              ? 'Документ успешно сохранен и доступен для предъявления через Kaspi QR.'
              : 'Для отображения реквизитов загрузите и сохраните фото документа.'}
          </div>
        </div>
      )}
    </div>
  );
};
