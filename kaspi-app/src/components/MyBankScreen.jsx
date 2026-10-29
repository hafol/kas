import React, { useState } from 'react';
import { parseAndFormatKaspiBalance } from '../utils/formatters';

export const MyBankScreen = ({ cards, onSelectCard, onBack, onUpdateBonus, onUpdateLast4 }) => {
  // Editable Kaspi Bonus state
  const [isEditingBonus, setIsEditingBonus] = useState(false);
  const [bonusInput, setBonusInput] = useState('');

  // Editable Last 4 digits state
  const [isEditingLast4, setIsEditingLast4] = useState(false);
  const [last4Input, setLast4Input] = useState('');

  const currentBonus = cards?.bonus?.balance ?? 79.97;
  const currentLast4 = cards?.gold?.last4 || '0000';

  const handleStartEditBonus = (e) => {
    e?.stopPropagation();
    setBonusInput(String(currentBonus));
    setIsEditingBonus(true);
  };

  const handleSaveBonus = () => {
    const cleaned = String(bonusInput).trim().replace(/\s/g, '').replace(',', '.');
    const parsed = parseFloat(cleaned);
    const finalVal = !isNaN(parsed) && parsed >= 0 ? parsed : currentBonus;
    try {
      localStorage.setItem('kaspi_bonus_balance', String(finalVal));
      window.dispatchEvent(new CustomEvent('kaspi_bonus_updated', { detail: finalVal }));
    } catch (e) {}
    if (onUpdateBonus) onUpdateBonus(finalVal);
    setIsEditingBonus(false);
  };

  const handleStartEditLast4 = (e) => {
    e?.stopPropagation();
    setLast4Input(currentLast4);
    setIsEditingLast4(true);
  };

  const handleSaveLast4 = () => {
    const raw = String(last4Input).trim().replace(/\D/g, '');
    const finalVal = raw.length > 0 ? raw.slice(0, 4) : currentLast4;
    try {
      localStorage.setItem('kaspi_gold_last4', finalVal);
      window.dispatchEvent(new CustomEvent('kaspi_last4_updated', { detail: finalVal }));
    } catch (e) {}
    if (onUpdateLast4) onUpdateLast4(finalVal);
    setIsEditingLast4(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F2F2F2',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Native iOS Status Bar Safe Area Spacer (Белое пространство под часы/батарею) */}
      <div style={{
        height: 'env(safe-area-inset-top, 44px)',
        minHeight: '44px',
        backgroundColor: '#FFFFFF',
        width: '100%',
        flexShrink: 0
      }} />

      {/* Top Header: 47px */}
      <div style={{
        position: 'relative',
        height: '47px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EBEBEB',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
        boxSizing: 'border-box'
      }}>
        {/* Back Button (iOS Chevron <, strokeWidth 2.4) */}
        <div
          onClick={onBack}
          className="touchable"
          style={{
            padding: '8px 10px',
            marginLeft: '-8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            cursor: 'pointer'
          }}
        >
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none" style={{ display: 'block' }}>
            <path
              d="M10 1.5L1.5 11L10 20.5"
              stroke="#1F1F1F"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Centered Title: 19px */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <span style={{
            fontSize: '19px',
            fontWeight: '600',
            color: '#1F1F1F',
            fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
          }}>
            Мой Банк
          </span>
        </div>
      </div>

      {/* Accounts List Container */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* 1. Kaspi Gold Item: padding 21px 16px (+5px block height) */}
        <div
          onClick={() => onSelectCard('gold')}
          className="touchable"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '21px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            cursor: 'pointer'
          }}
        >
          {/* Gold Card Miniature: 47px x 36px (-10%), rounded 5.5px */}
          <div style={{
            width: '47px',
            height: '36px',
            borderRadius: '5.5px',
            backgroundColor: '#D4AF67',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            {/* Medallion: 21.8px x 28.35px (+5% bigger) */}
            <img
              src="/kaspi_assets/icon_white.svg"
              alt="Kaspi Gold"
              style={{
                width: '21.8px',
                height: '28.35px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          {/* Right info: Line 1 = Kaspi Gold + Money Balance in the SAME line; Line 2 = • 0000 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }}>
              <div style={{
                fontSize: '17px',
                fontWeight: '400',
                color: '#1F1F1F',
                lineHeight: '21px',
                fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
              }}>
                {cards?.gold?.name || 'Kaspi Gold'}
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: '400',
                color: '#1F1F1F',
                lineHeight: '21px',
                fontFamily: "'Roboto', system-ui, -apple-system, sans-serif",
                textAlign: 'right',
                whiteSpace: 'nowrap',
                marginLeft: '8px'
              }}>
                {parseAndFormatKaspiBalance(cards?.gold?.balance)} {cards?.gold?.currency || '₸'}
              </div>
            </div>

            <div
              onClick={handleStartEditLast4}
              title="Нажмите, чтобы изменить последние 4 цифры"
              style={{
                fontSize: '14px',
                color: '#757575',
                marginTop: '3px',
                lineHeight: '17px',
                fontFamily: "'Roboto', system-ui, -apple-system, sans-serif",
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              {isEditingLast4 ? (
                <div
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>•</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    autoFocus
                    value={last4Input}
                    onChange={(e) => setLast4Input(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveLast4();
                      if (e.key === 'Escape') setIsEditingLast4(false);
                    }}
                    onBlur={handleSaveLast4}
                    style={{
                      fontSize: '14px',
                      color: '#1F1F1F',
                      fontFamily: "'Roboto', system-ui, -apple-system, sans-serif",
                      border: 'none',
                      borderBottom: '1.5px solid #0089D0',
                      outline: 'none',
                      width: '46px',
                      padding: '0 2px',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
              ) : (
                <span>• {currentLast4}</span>
              )}
            </div>
          </div>
        </div>

        {/* 2. Открыть депозит button: padding 16px 16px (+3px block height) */}
        <div
          className="touchable"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            cursor: 'pointer'
          }}
        >
          {/* Plus Icon Container: same size & shape as gold card (47px x 36px, rounded 5.5px) */}
          <div style={{
            width: '47px',
            height: '36px',
            borderRadius: '5.5px',
            backgroundColor: '#F0F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2.5V13.5M2.5 8H13.5"
                stroke="#63666B"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span style={{
            fontSize: '17px',
            fontWeight: '400',
            color: '#0089D0',
            fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
          }}>
            Открыть депозит
          </span>
        </div>

        {/* 3. Kaspi Бонус Item: padding 20.5px 16px (+5px block height) with editing support */}
        <div
          onClick={handleStartEditBonus}
          className="touchable"
          title="Нажмите, чтобы изменить количество бонусов"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '20.5px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Green Bonus Card: 47px x 36px (-10%), rounded 5.5px */}
            <div style={{
              width: '47px',
              height: '36px',
              borderRadius: '5.5px',
              flexShrink: 0,
              overflow: 'hidden',
              display: 'flex'
            }}>
              <svg
                width="47"
                height="36"
                viewBox="0 0 51.90 40"
                fill="none"
                style={{ width: '100%', height: '100%', display: 'block' }}
              >
                <rect width="51.90" height="40" rx="5.60" fill="#589F01" />
                <path
                  d="M20.6 10.5H31.62M31.7 15.2H20.6V29.53H28.65A3.8 3.8 0 0 0 32.45 25.73V25.38A3.8 3.8 0 0 0 28.65 21.58H20.6"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div style={{
              fontSize: '17px',
              fontWeight: '400',
              color: '#1F1F1F',
              fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
            }}>
              {cards?.bonus?.name || 'Kaspi Бонус'}
            </div>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              handleStartEditBonus(e);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {isEditingBonus ? (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  inputMode="decimal"
                  autoFocus
                  value={bonusInput}
                  onChange={(e) => setBonusInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveBonus();
                    if (e.key === 'Escape') setIsEditingBonus(false);
                  }}
                  onBlur={handleSaveBonus}
                  style={{
                    fontSize: '18px',
                    fontWeight: '400',
                    color: '#1F1F1F',
                    fontFamily: "'Roboto', system-ui, -apple-system, sans-serif",
                    border: 'none',
                    borderBottom: '1.5px solid #589F01',
                    outline: 'none',
                    width: '90px',
                    textAlign: 'right',
                    padding: '0 2px',
                    backgroundColor: 'transparent'
                  }}
                />
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSaveBonus();
                  }}
                  style={{
                    backgroundColor: '#589F01',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    padding: '2px 6px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}
                >
                  ✓
                </button>
              </div>
            ) : (
              <>
                {/* Bonus Numbers: 18px */}
                <span style={{
                  fontSize: '18px',
                  fontWeight: '400',
                  color: '#1F1F1F',
                  fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
                }}>
                  {Number(currentBonus).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {/* Kaspi Bonus Dark Sign: 14.5px height x 7.9px width */}
                <svg
                  width="7.9"
                  height="14.5"
                  viewBox="0 0 13.08 24"
                  fill="none"
                  style={{ display: 'inline-block', flexShrink: 0 }}
                >
                  <path
                    d="M1.44 1.44H10.44M10.35 6.95H1.59V22.56H7.92A3.72 3.72 0 0 0 11.64 18.84V17.37A3.72 3.72 0 0 0 7.92 13.65H1.59"
                    fill="none"
                    stroke="#222222"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
