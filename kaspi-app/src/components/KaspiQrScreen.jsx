import React, { useState } from 'react';
import { X, Image, Zap } from 'lucide-react';

export const KaspiQrScreen = ({ onClose }) => {
  const [torchOn, setTorchOn] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#000000',
      zIndex: 250,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'max(env(safe-area-inset-top), 20px) 16px 40px 16px',
      maxWidth: '440px',
      margin: '0 auto'
    }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#FFFFFF'
      }}>
        <div style={{ width: '40px' }} />

        <span style={{ fontSize: '18px', fontWeight: '700' }}>
          Kaspi QR
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="touchable" style={{ padding: '6px' }}>
            <Image size={22} color="#FFFFFF" />
          </div>
          <div onClick={onClose} className="touchable" style={{ padding: '6px' }}>
            <X size={24} color="#FFFFFF" />
          </div>
        </div>
      </div>

      {/* Center Viewfinder */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          fontSize: '15px',
          color: '#FFFFFF',
          marginBottom: '28px',
          fontWeight: '500'
        }}>
          Сканируйте QR-код
        </div>

        {/* Red Scanner Corners */}
        <div style={{
          width: '240px',
          height: '240px',
          position: 'relative'
        }}>
          {/* Top-Left */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '36px',
            height: '36px',
            borderTop: '3.5px solid #F14635',
            borderLeft: '3.5px solid #F14635',
            borderTopLeftRadius: '12px'
          }} />

          {/* Top-Right */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '36px',
            height: '36px',
            borderTop: '3.5px solid #F14635',
            borderRight: '3.5px solid #F14635',
            borderTopRightRadius: '12px'
          }} />

          {/* Bottom-Left */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '36px',
            height: '36px',
            borderBottom: '3.5px solid #F14635',
            borderLeft: '3.5px solid #F14635',
            borderBottomLeftRadius: '12px'
          }} />

          {/* Bottom-Right */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '36px',
            height: '36px',
            borderBottom: '3.5px solid #F14635',
            borderRight: '3.5px solid #F14635',
            borderBottomRightRadius: '12px'
          }} />

          {/* Red Laser Scanning Effect */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            right: '10px',
            height: '2px',
            backgroundColor: '#F14635',
            boxShadow: '0 0 12px 2px #F14635',
            animation: 'scanPulse 2s infinite ease-in-out'
          }} />
        </div>
      </div>

      {/* Bottom Torch / Flashlight Button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          onClick={() => setTorchOn(!torchOn)}
          className="touchable"
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: torchOn ? '#FFFFFF' : 'rgba(255, 255, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: torchOn ? '#000000' : '#FFFFFF',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Zap size={24} />
        </div>
      </div>
    </div>
  );
};
