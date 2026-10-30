import React, { useState, useEffect } from 'react';
import {
  getOrCreateDeviceId,
  formatCrockford16,
  normalizeCrockford,
  isValidCrockford16,
  isIosDevice,
  isStandaloneApp
} from '../utils/deviceId';

export const ActivationScreen = ({ onActivateSuccess, initialError }) => {
  const [deviceId, setDeviceId] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(initialError || '');
  const [isActivating, setIsActivating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bypassIos, setBypassIos] = useState(false);

  useEffect(() => {
    const id = getOrCreateDeviceId();
    setDeviceId(id);
  }, []);

  const isIosBrowser = isIosDevice() && !isStandaloneApp() && !bypassIos;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(deviceId);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = deviceId;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kaspi Device ID',
          text: `Мой Kaspi Device ID для активации: ${deviceId}`
        });
        return;
      } catch (e) {
        // User cancelled or share failed, fallback to copy
      }
    }
    handleCopy();
  };

  const handleCodeChange = (e) => {
    const raw = e.target.value;
    // Normalize Crockford characters
    const clean = normalizeCrockford(raw).slice(0, 16);
    // Format into 4x4 chunks as the user types
    let formatted = '';
    for (let i = 0; i < clean.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += '-';
      formatted += clean[i];
    }
    setInputCode(formatted);
    if (error) setError('');
  };

  const handleActivate = async (e) => {
    e?.preventDefault();
    const cleanCode = normalizeCrockford(inputCode);
    const cleanDeviceId = normalizeCrockford(deviceId);

    if (cleanCode.length !== 16 || !isValidCrockford16(cleanCode)) {
      setError('Код активации должен состоять из 16 символов');
      return;
    }

    setIsActivating(true);
    setError('');

    try {
      const response = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId: cleanDeviceId, code: cleanCode })
      });

      let data = {};
      try {
        data = await response.json();
      } catch (err) {}

      if (response.ok && data.ok) {
        // Successful activation!
        try {
          localStorage.setItem('activation_code', formatCrockford16(cleanCode));
          localStorage.setItem('device_id', formatCrockford16(cleanDeviceId));
        } catch (e) {}
        if (onActivateSuccess) onActivateSuccess();
      } else if (data.error === 'expired') {
        setError('Срок действия кода активации истёк');
      } else if (response.status === 403 || data.error === 'revoked') {
        setError('Данное устройство заблокировано администратором');
      } else {
        setError('Неверный код активации для этого устройства');
      }
    } catch (networkErr) {
      setError('Нет подключения к интернету для проверки кода');
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div style={{
      minHeight: '100%',
      flex: 1,
      backgroundColor: '#F2F2F2',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
    }}>
      {/* iOS Status Bar Spacer (Kaspi Red behind clock & notch) */}
      <div style={{
        height: 'env(safe-area-inset-top, 44px)',
        backgroundColor: '#C8392F',
        width: '100%'
      }} />

      {/* Kaspi Red Header */}
      <div style={{
        height: '52px',
        backgroundColor: '#C8392F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src="/kaspi_assets/icon_white.svg"
            alt="Kaspi"
            style={{ width: '22px', height: '22px', objectFit: 'contain' }}
          />
          <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', letterSpacing: '0.2px' }}>
            Kaspi.kz
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '20px 16px calc(24px + env(safe-area-inset-bottom, 20px)) 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '430px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        {isIosBrowser ? (
          /* STEP 1 FOR IPHONE: Instruction to Add to Home Screen */
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px 20px',
            width: '100%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            boxSizing: 'border-box',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: '#FFF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="2" width="14" height="20" rx="3" stroke="#EE3524" strokeWidth="2" />
                <line x1="10" y1="18" x2="14" y2="18" stroke="#EE3524" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1F1F1F',
              margin: '0 0 10px 0'
            }}>
              Установите на экран «Домой»
            </h2>

            <p style={{
              fontSize: '14px',
              color: '#666666',
              lineHeight: '20px',
              margin: '0 0 20px 0'
            }}>
              Safari и приложение на домашнем экране используют раздельное хранилище и считаются разными устройствами. Для привязки к телефону добавьте Kaspi на рабочий стол:
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              textAlign: 'left',
              backgroundColor: '#F8F8FA',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#EE3524',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  1
                </div>
                <div style={{ fontSize: '14px', color: '#1F1F1F' }}>
                  Нажмите кнопку <strong>«Поделиться»</strong> (иконка квадрата со стрелкой вверх <span style={{ fontSize: '15px' }}>⎋</span> в Safari)
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#EE3524',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  2
                </div>
                <div style={{ fontSize: '14px', color: '#1F1F1F' }}>
                  Выберите пункт <strong>«На экран "Домой"»</strong> (со значком плюса ⊞)
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#EE3524',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  3
                </div>
                <div style={{ fontSize: '14px', color: '#1F1F1F' }}>
                  Нажмите <strong>«Добавить»</strong> и откройте Kaspi с новой иконки
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setBypassIos(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#0089D0',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Продолжить в браузере (для тестов)
            </button>
          </div>
        ) : (
          /* STEP 2: ENTER ACTIVATION CODE */
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px 20px',
            width: '100%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            boxSizing: 'border-box'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FFF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#EE3524" strokeWidth="2" />
                  <path d="M7 11V7A5 5 0 0 1 17 7V11" stroke="#EE3524" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1.5" fill="#EE3524" />
                </svg>
              </div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1F1F1F',
                margin: '0 0 6px 0'
              }}>
                Введите код активации
              </h2>
              <p style={{
                fontSize: '13.5px',
                color: '#666666',
                margin: 0,
                lineHeight: '18px'
              }}>
                Приложение привязывается к данному устройству
              </p>
            </div>

            {/* Device ID Card */}
            <div style={{
              backgroundColor: '#F8F8FA',
              border: '1px solid #EBEBEB',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#8E8E93',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                ID вашего устройства
              </div>

              <div style={{
                fontSize: '19px',
                fontWeight: '700',
                fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                color: '#1F1F1F',
                letterSpacing: '1px',
                textAlign: 'center',
                padding: '8px 0',
                userSelect: 'all',
                WebkitUserSelect: 'all'
              }}>
                {deviceId || 'ЗАГРУЗКА...'}
              </div>

              {/* One-click Telegram redirect button */}
              <a
                href={`https://t.me/larpkaspi?text=${encodeURIComponent(`Здравствуйте! Мой Device ID для активации:\n${deviceId}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="touchable"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  height: '42px',
                  backgroundColor: '#24A1DE',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  marginTop: '10px',
                  boxShadow: '0 2px 10px rgba(36, 161, 222, 0.25)',
                  boxSizing: 'border-box'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21.5 2.5L2 10.5L9.5 13.5L12 21L15.5 16L21.5 2.5Z" fill="#FFFFFF" />
                  <path d="M9.5 13.5L15.5 8L12 16" stroke="#24A1DE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Отправить ID в Telegram @larpkaspi</span>
              </a>

              {/* Copy / Share buttons */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '8px'
              }}>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="touchable"
                  style={{
                    flex: 1,
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid #DEDEDE',
                    backgroundColor: '#FFFFFF',
                    color: copied ? '#27A13B' : '#1F1F1F',
                    fontSize: '13px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {copied ? (
                    <>
                      <span>✓</span>
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Копировать</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="touchable"
                  style={{
                    flex: 1,
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid #DEDEDE',
                    backgroundColor: '#FFFFFF',
                    color: '#1F1F1F',
                    fontSize: '13px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  <span>Поделиться</span>
                </button>
              </div>

              <div style={{
                fontSize: '12px',
                color: '#757575',
                marginTop: '10px',
                lineHeight: '16px',
                textAlign: 'center'
              }}>
                Нажмите синюю кнопку выше, чтобы в один клик отправить свой Device ID в Telegram{' '}
                <a
                  href={`https://t.me/larpkaspi?text=${encodeURIComponent(`Здравствуйте! Мой Device ID для активации:\n${deviceId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#24A1DE', fontWeight: '600', textDecoration: 'none' }}
                >
                  @larpkaspi
                </a>{' '}
                для получения кода доступа.
              </div>
            </div>

            {/* Code Input Form */}
            <form onSubmit={handleActivate}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#666666',
                  letterSpacing: '0.5px',
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}>
                  Код активации
                </label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={handleCodeChange}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="characters"
                  spellCheck="false"
                  style={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#F8F8FA',
                    border: error ? '1.5px solid #EE3524' : '1px solid #EBEBEB',
                    borderRadius: '12px',
                    padding: '0 14px',
                    fontSize: '18px',
                    fontWeight: '700',
                    fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    letterSpacing: '1.2px',
                    color: '#1F1F1F',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Error Box */}
              {error && (
                <div style={{
                  backgroundColor: '#FFF2F2',
                  border: '1px solid #FFCDD2',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#EE3524',
                  fontSize: '13px',
                  lineHeight: '16px'
                }}>
                  <span style={{ fontSize: '16px' }}>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Activate Button */}
              <button
                type="submit"
                disabled={isActivating || inputCode.length < 16}
                className="touchable"
                style={{
                  width: '100%',
                  height: '50px',
                  backgroundColor: inputCode.length >= 16 ? '#EE3524' : '#E0E0E0',
                  color: inputCode.length >= 16 ? '#FFFFFF' : '#9E9E9E',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: inputCode.length >= 16 && !isActivating ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: inputCode.length >= 16 ? '0 2px 6px rgba(238, 53, 36, 0.3)' : 'none',
                  transition: 'all 200ms ease'
                }}
              >
                {isActivating ? 'Проверка кода...' : 'Активировать'}
              </button>
            </form>
          </div>
        )}

        <div style={{
          marginTop: '24px',
          fontSize: '12px',
          color: '#8E8E93',
          textAlign: 'center'
        }}>
          Kaspi.kz Mobile • Защищённая среда
        </div>
      </div>
    </div>
  );
};
