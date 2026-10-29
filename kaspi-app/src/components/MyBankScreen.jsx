import React from 'react';
import { parseAndFormatKaspiBalance } from '../utils/formatters';

export const MyBankScreen = ({ cards, onSelectCard, onBack }) => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F2F2F2',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Header */}
      <div style={{
        position: 'relative',
        height: '48px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EBEBEB',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
        boxSizing: 'border-box'
      }}>
        {/* Back Button (authentic iOS Chevron <) */}
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
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Centered Title */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <span style={{
            fontSize: '17px',
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
        {/* Kaspi Gold Item */}
        <div
          onClick={() => onSelectCard('gold')}
          className="touchable"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Gold Card Miniature (52px x 40px, rounded 6px, authentic gold color, white medallion centered) */}
            <div style={{
              width: '52px',
              height: '40px',
              borderRadius: '6px',
              backgroundColor: '#D4AF67',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden'
            }}>
              <img
                src="/kaspi_assets/icon_white.svg"
                alt="Kaspi Gold"
                style={{
                  width: '20px',
                  height: '26px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            <div>
              <div style={{
                fontSize: '17px',
                fontWeight: '400',
                color: '#1F1F1F',
                lineHeight: '21px',
                fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
              }}>
                {cards.gold.name}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#757575',
                marginTop: '3px',
                lineHeight: '17px',
                fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
              }}>
                • {cards.gold.last4 || '4163'}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{
              fontSize: '17px',
              fontWeight: '400',
              color: '#1F1F1F',
              fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
            }}>
              {parseAndFormatKaspiBalance(cards.gold.balance)} {cards.gold.currency}
            </span>
          </div>
        </div>

        {/* Открыть депозит button */}
        <div
          className="touchable"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexShrink: 0
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              backgroundColor: '#F0F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2.5V13.5M2.5 8H13.5"
                  stroke="#63666B"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
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

        {/* Kaspi Бонус Item */}
        <div
          className="touchable"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Green Bonus Card (52px x 40px) */}
            <div style={{
              width: '52px',
              height: '40px',
              borderRadius: '6px',
              flexShrink: 0,
              overflow: 'hidden',
              display: 'flex'
            }}>
              <svg
                width="52"
                height="40"
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
              {cards.bonus.name}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{
              fontSize: '17px',
              fontWeight: '400',
              color: '#1F1F1F',
              fontFamily: "'Roboto', system-ui, -apple-system, sans-serif"
            }}>
              {cards.bonus.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}
            </span>
            {/* Kaspi Bonus Dark Sign: b-dark.svg */}
            <svg
              width="8.72"
              height="16"
              viewBox="0 0 13.08 24"
              fill="none"
              style={{ display: 'inline-block', flexShrink: 0 }}
            >
              <path
                d="M1.44 1.44H10.44M10.35 6.95H1.59V22.56H7.92A3.72 3.72 0 0 0 11.64 18.84V17.37A3.72 3.72 0 0 0 7.92 13.65H1.59"
                fill="none"
                stroke="#222222"
                strokeWidth="2.89"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
