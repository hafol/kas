import React, { useState } from 'react';
import { ArrowLeft, X, ScanFace, Delete } from 'lucide-react';

export const PasscodeScreen = ({ profile, onUnlock, onBack }) => {
  const [digits, setDigits] = useState('');
  const [showFaceId, setShowFaceId] = useState(profile.faceIdEnabled);
  const [faceIdError, setFaceIdError] = useState(false);

  const handleDigit = (d) => {
    if (digits.length < 4) {
      const next = digits + d;
      setDigits(next);
      if (next.length === 4) {
        setTimeout(() => {
          onUnlock();
        }, 150);
      }
    }
  };

  const handleDelete = () => {
    setDigits(prev => prev.slice(0, -1));
  };

  const handleTriggerFaceId = () => {
    setShowFaceId(true);
    setFaceIdError(false);
  };

  const handleFaceIdSuccess = () => {
    setShowFaceId(false);
    onUnlock();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#FFFFFF',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'max(env(safe-area-inset-top), 20px) 24px 30px 24px',
      maxWidth: '440px',
      margin: '0 auto'
    }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '44px'
      }}>
        <div onClick={onBack} className="touchable" style={{ padding: '8px' }}>
          <ArrowLeft size={22} color="#1F1F1F" />
        </div>
        <div onClick={onBack} className="touchable" style={{ padding: '8px' }}>
          <X size={22} color="#757575" />
        </div>
      </div>

      {/* Profile & Code Dots */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px'
      }}>
        {/* User Avatar Circle */}
        <div style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          backgroundColor: '#EAEAEA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#999999">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        {/* Short Name: "Парасат Ж." */}
        <div style={{
          fontSize: '17px',
          fontWeight: '600',
          color: '#1F1F1F',
          marginBottom: '28px'
        }}>
          {profile.shortName}
        </div>

        {/* Title */}
        <div style={{
          fontSize: '15px',
          color: '#757575',
          marginBottom: '16px'
        }}>
          Код доступа
        </div>

        {/* 4 Dots indicator */}
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          height: '24px'
        }}>
          {[0, 1, 2, 3].map((idx) => {
            const filled = digits.length > idx;
            return (
              <div
                key={idx}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: filled ? '#F14635' : '#D1D1D1',
                  transition: 'background-color 0.15s ease'
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Numeric Keypad */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        rowGap: '20px',
        columnGap: '24px',
        padding: '0 20px',
        marginBottom: '20px'
      }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div
            key={n}
            onClick={() => handleDigit(n.toString())}
            className="touchable"
            style={{
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              fontWeight: '400',
              color: '#1F1F1F',
              userSelect: 'none'
            }}
          >
            {n}
          </div>
        ))}

        {/* Bottom row: Face ID, 0, Backspace */}
        <div
          onClick={handleTriggerFaceId}
          className="touchable"
          style={{
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ScanFace size={28} color="#1F1F1F" />
        </div>

        <div
          onClick={() => handleDigit('0')}
          className="touchable"
          style={{
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px',
            fontWeight: '400',
            color: '#1F1F1F',
            userSelect: 'none'
          }}
        >
          0
        </div>

        <div
          onClick={handleDelete}
          className="touchable"
          style={{
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Delete size={24} color="#757575" />
        </div>
      </div>

      {/* Bottom Link */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', color: '#0089D0', fontWeight: '500' }}>
          Забыли код доступа?
        </span>
      </div>

      {/* Face ID System Modal simulation */}
      {showFaceId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300
        }}>
          <div style={{
            width: '180px',
            height: '180px',
            backgroundColor: 'rgba(35, 35, 35, 0.94)',
            borderRadius: '24px',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)'
          }}>
            {!faceIdError ? (
              <>
                <div
                  onClick={handleFaceIdSuccess}
                  className="touchable"
                  style={{
                    width: '64px',
                    height: '64px',
                    border: '2.5px solid #FFFFFF',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}
                  title="Нажмите для подтверждения Face ID"
                >
                  <ScanFace size={44} color="#FFFFFF" strokeWidth={1.5} />
                </div>
                <span style={{ fontSize: '15px', fontWeight: '600' }}>Face ID</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                  (нажмите для входа)
                </span>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Лицо не распознано
                </div>
                <button
                  onClick={() => setFaceIdError(false)}
                  style={{
                    backgroundColor: '#007AFF',
                    border: 'none',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    marginBottom: '6px'
                  }}
                >
                  Повторить Face ID
                </button>
                <div
                  onClick={() => setShowFaceId(false)}
                  style={{ fontSize: '12px', color: '#999', cursor: 'pointer' }}
                >
                  Отменить
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
