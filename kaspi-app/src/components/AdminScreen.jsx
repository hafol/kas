import React, { useState, useEffect } from 'react';
import {
  normalizeCrockford,
  isValidCrockford16,
  formatCrockford16
} from '../utils/deviceId';

export const AdminScreen = () => {
  const [password, setPassword] = useState(() => {
    try {
      return localStorage.getItem('kaspi_admin_pwd') || '';
    } catch (e) {
      return '';
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Generator form state
  const [deviceIdInput, setDeviceIdInput] = useState('');
  const [durationMode, setDurationMode] = useState('forever'); // 'forever' | '30' | '7' | 'custom'
  const [customDays, setCustomDays] = useState('14');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState('');
  const [lastGenerated, setLastGenerated] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // History state
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('kaspi_admin_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Auto-login if password is saved in localStorage
  useEffect(() => {
    if (password) {
      handleLogin(null, password);
    }
  }, []);

  const handleLogin = async (e, pwdToUse) => {
    e?.preventDefault();
    const pwd = pwdToUse || password;
    if (!pwd) {
      setAuthError('Введите пароль');
      return;
    }

    setIsVerifying(true);
    setAuthError('');

    try {
      // Test password against dummy test ID to verify authorization
      const res = await fetch('/api/admin-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: pwd,
          deviceId: '0000000000000000',
          days: null
        })
      });

      if (res.status === 401) {
        setAuthError('Неверный пароль администратора');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        try {
          localStorage.setItem('kaspi_admin_pwd', pwd);
        } catch (e) {}
      }
    } catch (err) {
      // If offline or network issue
      setAuthError('Ошибка сети при проверке пароля');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('kaspi_admin_pwd');
    } catch (e) {}
    setPassword('');
    setIsAuthenticated(false);
    setLastGenerated(null);
  };

  const handlePasteDeviceId = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          const clean = normalizeCrockford(text);
          if (clean.length === 16) {
            setDeviceIdInput(formatCrockford16(clean));
            setGenError('');
            return;
          }
        }
      }
    } catch (e) {}
  };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    const cleanId = normalizeCrockford(deviceIdInput);
    if (!isValidCrockford16(cleanId)) {
      setGenError('Неверный Device ID. Ожидается 16 символов (например ABCD-EFGH-JKMN-PQRS)');
      return;
    }

    let days = null;
    if (durationMode === '30') days = 30;
    else if (durationMode === '7') days = 7;
    else if (durationMode === 'custom') {
      const parsed = parseInt(customDays, 10);
      if (isNaN(parsed) || parsed <= 0) {
        setGenError('Введите корректное число дней');
        return;
      }
      days = parsed;
    }

    setIsGenerating(true);
    setGenError('');
    setCopiedCode(false);
    setCopiedTemplate(false);

    try {
      const res = await fetch('/api/admin-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          deviceId: cleanId,
          days
        })
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        const item = {
          id: Date.now(),
          deviceId: data.deviceId,
          code: data.code,
          isForever: data.isForever,
          days: data.days,
          expiryDate: data.expiryDate,
          createdDate: new Date().toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        setLastGenerated(item);

        // Update history
        const updatedHistory = [item, ...history.filter(h => h.deviceId !== item.deviceId)].slice(0, 10);
        setHistory(updatedHistory);
        try {
          localStorage.setItem('kaspi_admin_history', JSON.stringify(updatedHistory));
        } catch (e) {}
      } else {
        setGenError(data.error || 'Ошибка генерации кода');
      }
    } catch (err) {
      setGenError('Ошибка подключения к серверу');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text, setFlag) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setFlag(true);
      setTimeout(() => setFlag(false), 2500);
    } catch (e) {
      setFlag(true);
      setTimeout(() => setFlag(false), 2500);
    }
  };

  // 1. Password Lock View
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100dvh',
        backgroundColor: '#0F1216',
        color: '#FFFFFF',
        fontFamily: "'Roboto', -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: '#181D24',
          borderRadius: '20px',
          padding: '28px 24px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          border: '1px solid #28303C'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(238, 53, 36, 0.12)',
              color: '#EE3524',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
              fontSize: '26px'
            }}>
              🔐
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 6px 0', color: '#FFFFFF' }}>
              Панель администратора
            </h1>
            <p style={{ fontSize: '13px', color: '#8E9AA8', margin: 0 }}>
              Введите пароль для генерации кодов
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '18px' }}>
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#0F1216',
                  border: '1px solid #28303C',
                  borderRadius: '12px',
                  padding: '0 16px',
                  fontSize: '15px',
                  color: '#FFFFFF',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {authError && (
              <div style={{
                backgroundColor: 'rgba(238, 53, 36, 0.15)',
                color: '#FF6B6B',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              style={{
                width: '100%',
                height: '48px',
                backgroundColor: '#EE3524',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isVerifying ? 'Проверка...' : 'Войти в панель'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Generator Dashboard View
  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#0F1216',
      color: '#FFFFFF',
      fontFamily: "'Roboto', -apple-system, sans-serif",
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        
        {/* Top bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid #222933'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
            <span style={{ fontSize: '17px', fontWeight: '700' }}>Генератор кодов Kaspi</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #2C3542',
              color: '#8E9AA8',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Выйти
          </button>
        </div>

        {/* Generator Card */}
        <div style={{
          backgroundColor: '#181D24',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #28303C',
          marginBottom: '20px'
        }}>
          <form onSubmit={handleGenerate}>
            {/* Device ID Input */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', color: '#8E9AA8', fontWeight: '500' }}>
                  Device ID покупателя:
                </label>
                <button
                  type="button"
                  onClick={handlePasteDeviceId}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#4DA6FF',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  📋 Вставить
                </button>
              </div>
              <input
                type="text"
                placeholder="ABCD-EFGH-JKMN-PQRS"
                value={deviceIdInput}
                onChange={(e) => {
                  const clean = normalizeCrockford(e.target.value).slice(0, 16);
                  let formatted = '';
                  for (let i = 0; i < clean.length; i++) {
                    if (i > 0 && i % 4 === 0) formatted += '-';
                    formatted += clean[i];
                  }
                  setDeviceIdInput(formatted);
                  if (genError) setGenError('');
                }}
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#0F1216',
                  border: '1px solid #28303C',
                  borderRadius: '12px',
                  padding: '0 14px',
                  fontSize: '16px',
                  fontFamily: 'monospace',
                  color: '#FFFFFF',
                  letterSpacing: '1px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Duration Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', color: '#8E9AA8', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                Срок доступа:
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px'
              }}>
                <button
                  type="button"
                  onClick={() => setDurationMode('forever')}
                  style={{
                    height: '42px',
                    borderRadius: '10px',
                    border: durationMode === 'forever' ? '1.5px solid #00D084' : '1px solid #28303C',
                    backgroundColor: durationMode === 'forever' ? 'rgba(0, 208, 132, 0.12)' : '#0F1216',
                    color: durationMode === 'forever' ? '#00D084' : '#C1CAD4',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  🟢 Навсегда
                </button>

                <button
                  type="button"
                  onClick={() => setDurationMode('30')}
                  style={{
                    height: '42px',
                    borderRadius: '10px',
                    border: durationMode === '30' ? '1.5px solid #FFB800' : '1px solid #28303C',
                    backgroundColor: durationMode === '30' ? 'rgba(255, 184, 0, 0.12)' : '#0F1216',
                    color: durationMode === '30' ? '#FFB800' : '#C1CAD4',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  🟡 30 дней
                </button>

                <button
                  type="button"
                  onClick={() => setDurationMode('7')}
                  style={{
                    height: '42px',
                    borderRadius: '10px',
                    border: durationMode === '7' ? '1.5px solid #4DA6FF' : '1px solid #28303C',
                    backgroundColor: durationMode === '7' ? 'rgba(77, 166, 255, 0.12)' : '#0F1216',
                    color: durationMode === '7' ? '#4DA6FF' : '#C1CAD4',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  🔵 7 дней
                </button>

                <button
                  type="button"
                  onClick={() => setDurationMode('custom')}
                  style={{
                    height: '42px',
                    borderRadius: '10px',
                    border: durationMode === 'custom' ? '1.5px solid #A78BFA' : '1px solid #28303C',
                    backgroundColor: durationMode === 'custom' ? 'rgba(167, 139, 250, 0.12)' : '#0F1216',
                    color: durationMode === 'custom' ? '#A78BFA' : '#C1CAD4',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  ⚪ Свой срок
                </button>
              </div>

              {durationMode === 'custom' && (
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    placeholder="Дней"
                    style={{
                      width: '100px',
                      height: '40px',
                      backgroundColor: '#0F1216',
                      border: '1px solid #A78BFA',
                      borderRadius: '8px',
                      padding: '0 10px',
                      fontSize: '14px',
                      color: '#FFFFFF',
                      outline: 'none'
                    }}
                  />
                  <span style={{ fontSize: '13px', color: '#8E9AA8' }}>дней доступа</span>
                </div>
              )}
            </div>

            {genError && (
              <div style={{
                backgroundColor: 'rgba(238, 53, 36, 0.15)',
                color: '#FF6B6B',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                marginBottom: '16px'
              }}>
                {genError}
              </div>
            )}

            <button
              type="submit"
              disabled={isGenerating}
              style={{
                width: '100%',
                height: '50px',
                backgroundColor: '#EE3524',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(238, 53, 36, 0.35)'
              }}
            >
              {isGenerating ? 'Создание кода...' : '⚡ Сгенерировать код'}
            </button>
          </form>
        </div>

        {/* Result Card */}
        {lastGenerated && (
          <div style={{
            backgroundColor: '#1E252E',
            borderRadius: '16px',
            padding: '20px',
            border: '1.5px solid #00D084',
            marginBottom: '24px',
            boxShadow: '0 8px 30px rgba(0, 208, 132, 0.12)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#8E9AA8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Код активации для клиента:
              </span>
              <span style={{
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: lastGenerated.isForever ? 'rgba(0, 208, 132, 0.2)' : 'rgba(255, 184, 0, 0.2)',
                color: lastGenerated.isForever ? '#00D084' : '#FFB800',
                fontWeight: '600'
              }}>
                {lastGenerated.isForever ? 'Навсегда' : `${lastGenerated.days} дней`}
              </span>
            </div>

            <div style={{
              fontSize: '22px',
              fontWeight: '700',
              fontFamily: 'monospace',
              color: '#FFFFFF',
              letterSpacing: '2px',
              textAlign: 'center',
              padding: '12px 0',
              backgroundColor: '#0F1216',
              borderRadius: '10px',
              marginBottom: '10px',
              userSelect: 'all'
            }}>
              {lastGenerated.code}
            </div>

            <div style={{ fontSize: '12px', color: '#8E9AA8', textAlign: 'center', marginBottom: '16px' }}>
              {lastGenerated.isForever
                ? 'Бессрочный доступ к приложению'
                : `Доступ активен до: ${lastGenerated.expiryDate} (включительно)`}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => copyToClipboard(lastGenerated.code, setCopiedCode)}
                style={{
                  width: '100%',
                  height: '42px',
                  backgroundColor: copiedCode ? '#00D084' : '#2A3442',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {copiedCode ? '✓ Скопировано!' : '📋 Скопировать только код'}
              </button>

              <button
                type="button"
                onClick={() => {
                  const text = `Здравствуйте! Ваш код активации:\n\n${lastGenerated.code}\n\nСрок: ${lastGenerated.isForever ? 'Бессрочно (Навсегда)' : `${lastGenerated.days} дней (до ${lastGenerated.expiryDate})`}\n\nВставьте этот код в приложении и нажмите «Активировать».`;
                  copyToClipboard(text, setCopiedTemplate);
                }}
                style={{
                  width: '100%',
                  height: '42px',
                  backgroundColor: copiedTemplate ? '#00D084' : 'rgba(77, 166, 255, 0.15)',
                  color: copiedTemplate ? '#FFFFFF' : '#4DA6FF',
                  border: '1px solid #4DA6FF',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {copiedTemplate ? '✓ Сообщение скопировано!' : '💬 Скопировать готовый ответ для клиента'}
              </button>
            </div>
          </div>
        )}

        {/* History of recent codes */}
        {history.length > 0 && (
          <div>
            <div style={{ fontSize: '13px', color: '#8E9AA8', fontWeight: '600', marginBottom: '10px' }}>
              История сгенерированных кодов:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {history.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#181D24',
                    border: '1px solid #28303C',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '700', color: '#FFFFFF' }}>
                      {item.code}
                    </div>
                    <div style={{ fontSize: '11px', color: '#8E9AA8', marginTop: '2px' }}>
                      ID: {item.deviceId} • {item.isForever ? 'Навсегда' : `${item.days} дн.`}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.code, () => {})}
                    style={{
                      background: 'none',
                      border: '1px solid #2C3542',
                      color: '#C1CAD4',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    Копировать
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
