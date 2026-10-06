import React, { useEffect, useRef, useState } from 'react';

// All sizes are measured from the original Kaspi QR screen at 336px width
// and scaled to the real screen width (max 430px).
const u = (n) => `calc(min(100vw, 430px) * ${n / 336})`;

const RED = '#F14635';
const ARM = 46;
const STROKE = 3.5;
const RADIUS = 8;

const Corner = ({ pos }) => {
  const top = pos[0] === 't';
  const left = pos[1] === 'l';
  return (
    <div style={{
      position: 'absolute',
      [top ? 'top' : 'bottom']: 0,
      [left ? 'left' : 'right']: 0,
      width: u(ARM),
      height: u(ARM),
      boxSizing: 'border-box',
      [top ? 'borderTop' : 'borderBottom']: `${u(STROKE)} solid ${RED}`,
      [left ? 'borderLeft' : 'borderRight']: `${u(STROKE)} solid ${RED}`,
      [`border${top ? 'Top' : 'Bottom'}${left ? 'Left' : 'Right'}Radius`]: u(RADIUS)
    }} />
  );
};

export const KaspiQrScreen = ({ onClose }) => {
  const videoRef = useRef(null);
  const trackRef = useRef(null);
  const [torchOn, setTorchOn] = useState(false);

  // Open the phone's rear camera
  useEffect(() => {
    let stream = null;
    let cancelled = false;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }
      }).then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = s;
        trackRef.current = s.getVideoTracks()[0] || null;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play().catch(() => {});
        }
      }).catch(() => {});
    }
    return () => {
      cancelled = true;
      if (stream) stream.getTracks().forEach((t) => t.stop());
      trackRef.current = null;
    };
  }, []);

  const toggleTorch = () => {
    const next = !torchOn;
    setTorchOn(next);
    const track = trackRef.current;
    if (track && track.applyConstraints) {
      track.applyConstraints({ advanced: [{ torch: next }] }).catch(() => {});
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '430px',
      backgroundColor: '#999999',
      zIndex: 250,
      overflow: 'hidden'
    }}>
      {/* Live camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Safe-area offset so the overlay sits below the status bar */}
      <div style={{ position: 'absolute', inset: 0, top: 'env(safe-area-inset-top, 0px)' }}>
        {/* Clear viewfinder window; everything around it is dimmed */}
        <div style={{
          position: 'absolute',
          top: u(157),
          left: '50%',
          transform: 'translateX(-50%)',
          width: u(262),
          height: u(262),
          borderRadius: u(RADIUS),
          boxShadow: '0 0 0 200vmax rgba(0, 0, 0, 0.4)'
        }}>
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />
        </div>

        {/* Title */}
        <div style={{
          position: 'absolute',
          top: u(16),
          left: 0,
          right: 0,
          height: u(20),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: u(16),
          fontWeight: 600,
          letterSpacing: u(0.2)
        }}>
          Kaspi QR
        </div>

        {/* Close */}
        <div
          onClick={onClose}
          className="touchable"
          style={{
            position: 'absolute',
            top: u(3),
            right: u(-3),
            width: u(44),
            height: u(44),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: u(29),
            height: u(29),
            borderRadius: u(7),
            backgroundColor: 'rgba(0, 0, 0, 0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width={u(14)} height={u(14)} viewBox="0 0 14 14" style={{ width: u(14), height: u(14) }}>
              <path d="M1.5 1.5 L12.5 12.5 M12.5 1.5 L1.5 12.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <div style={{
          position: 'absolute',
          top: u(95),
          left: 0,
          right: 0,
          height: u(20),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: u(16),
          fontWeight: 500,
          letterSpacing: u(0.6)
        }}>
          Сканируйте QR-код
        </div>

        {/* Torch */}
        <div
          onClick={toggleTorch}
          className="touchable"
          style={{
            position: 'absolute',
            top: u(434 - 3),
            left: '50%',
            transform: 'translateX(-50%)',
            width: u(45),
            height: u(45),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: u(39),
            height: u(39),
            borderRadius: '50%',
            backgroundColor: torchOn ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.15s ease'
          }}>
            <svg viewBox="0 0 12 21" style={{ width: u(12), height: u(21), display: 'block' }}>
              <path d="M0 0 H12 V2.5 L9.5 6.5 V20 Q9.5 21 8.5 21 H3.5 Q2.5 21 2.5 20 V6.5 L0 2.5 Z" fill="#2B2B2B" />
              <circle cx="6" cy="9.5" r="1.1" fill={torchOn ? '#FFFFFF' : '#C2C2C2'} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
