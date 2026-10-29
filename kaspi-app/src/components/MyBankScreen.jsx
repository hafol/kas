import React from 'react';
import { ArrowLeft, ChevronRight, Plus } from 'lucide-react';
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
        height: '48px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EBEBEB',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
        boxSizing: 'border-box',
        gap: '12px'
      }}>
        <div onClick={onBack} className="touchable" style={{ padding: '6px' }}>
          <ArrowLeft size={22} color="#1F1F1F" />
        </div>
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
          Мой Банк
        </span>
      </div>

      {/* Accounts List Container */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Kaspi Gold Item */}
        <div
          onClick={() => onSelectCard('gold')}
          className="touchable"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '20px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Gold Card Miniature */}
            <div style={{
              width: '46px',
              height: '28px',
              borderRadius: '5px',
              background: 'linear-gradient(135deg, #ECC880 0%, #C49B4B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '6px',
              boxShadow: '0 1px 3px rgba(196, 155, 75, 0.3)'
            }}>
              <span style={{ fontSize: '10px', color: '#FFFFFF', fontWeight: 'bold' }}>MC</span>
            </div>

            <div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#1F1F1F' }}>
                {cards.gold.name}
              </div>
              <div style={{ fontSize: '13.5px', color: '#757575', marginTop: '2px' }}>
                {cards.gold.subtitle}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
              {parseAndFormatKaspiBalance(cards.gold.balance)} {cards.gold.currency}
            </span>
            <ChevronRight size={20} color="#C2C2C2" />
          </div>
        </div>

        {/* Открыть депозит button */}
        <div
          className="touchable"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '18px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#DEF8CF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#42760D'
          }}>
            <Plus size={22} strokeWidth={2.5} />
          </div>

          <span style={{ fontSize: '18px', fontWeight: '600', color: '#0089D0' }}>
            Открыть депозит
          </span>
        </div>

        {/* Kaspi Бонус Item */}
        <div
          className="touchable"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '20px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#58A000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '18px'
            }}>
              Б
            </div>

            <div style={{ fontSize: '18px', fontWeight: '600', color: '#1F1F1F' }}>
              {cards.bonus.name}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
              {cards.bonus.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} {cards.bonus.currency}
            </span>
            <ChevronRight size={20} color="#C2C2C2" />
          </div>
        </div>
      </div>
    </div>
  );
};
