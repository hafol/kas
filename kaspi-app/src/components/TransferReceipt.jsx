import React from 'react';

// Transfer receipt screen. Original UI; all values come in as props (synthetic
// demo data only). A visible "THIS IS NOT REAL" watermark is rendered near the
// bottom so the receipt can never be mistaken for a genuine document.

const PAGE = '#F2F2F7';       // iOS system grey background
const GREEN = '#00824B';
const GREEN_BG = '#E5F6ED';
const TEXT = '#111111';
const LABEL = '#8E8E93';

// ── action-bar icons (generic outline glyphs) ────────────────────────────
const AC = '#2E2E2E';
const ShareIcon = () => (
  <svg width="27" height="27" viewBox="0 0 24 24" fill="none">
    <path d="M12 3.5V15" stroke={AC} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8.2 7.2 12 3.4l3.8 3.8" stroke={AC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10.5H5.2A1.7 1.7 0 0 0 3.5 12.2v6.6A1.7 1.7 0 0 0 5.2 20.5h13.6a1.7 1.7 0 0 0 1.7-1.7v-6.6a1.7 1.7 0 0 0-1.7-1.7H18" stroke={AC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const RepeatIcon = () => (
  <svg width="27" height="27" viewBox="0 0 24 24" fill="none">
    <path d="M20 11a8 8 0 1 0-.9 4.6" stroke={AC} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M20 4.5V11h-6.5" stroke={AC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CancelIcon = () => (
  <svg width="27" height="27" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.6" stroke={AC} strokeWidth="1.8" />
    <path d="M6.2 6.2 17.8 17.8" stroke={AC} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const StarIcon = () => (
  <svg width="27" height="27" viewBox="0 0 24 24" fill="none">
    <path d="M12 3.6l2.6 5.3 5.8.85-4.2 4.1 1 5.8L12 17.9 6.8 19.65l1-5.8L3.6 9.75l5.8-.85z"
      stroke={AC} strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);

// avatar placeholder (grey person)
const AvatarPlaceholder = ({ size = 50 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', backgroundColor: '#E3E3E6',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden'
  }}>
    <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="#AFAFB4">
      <circle cx="12" cy="8.3" r="4" />
      <path d="M4 20.5c0-4.2 3.6-7 8-7s8 2.8 8 7z" />
    </svg>
  </div>
);

const DetailRow = ({ label, value, truncate }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px',
    padding: '12px 0', borderTop: '1px solid #E5E5EA'
  }}>
    <span style={{ fontSize: '14px', color: LABEL, maxWidth: '130px', lineHeight: '1.3' }}>{label}</span>
    <span style={{
      fontSize: '14px', color: TEXT, fontWeight: '500', textAlign: 'right', maxWidth: '120px', lineHeight: '1.3',
      ...(truncate
        ? { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
        : { wordBreak: 'break-word' })
    }}>{value}</span>
  </div>
);

// scalloped edge strip (grey half-discs punched into the white card)
const ScallopEdge = ({ side }) => (
  <div style={{
    position: 'absolute', left: 0, right: 0, height: '12px',
    [side]: 0,
    background: `radial-gradient(circle 7px at 10px ${side === 'top' ? '0' : '12px'}, ${PAGE} 7px, transparent 7.5px)`,
    backgroundSize: '20px 12px', backgroundRepeat: 'repeat-x', pointerEvents: 'none'
  }} />
);

export const TransferReceipt = ({ data, onClose, onRepeat }) => {
  const { amount, recipientName, recipientPhone, receiptNo, dateStr, sender, source } = data;

  return (
    <div style={{ minHeight: '100%', backgroundColor: PAGE, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar: status spacer + close X */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, backgroundColor: PAGE }}>
        <div style={{ height: 'var(--sat, 0px)' }} />
        <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 18px' }}>
          <div onClick={onClose} className="touchable" style={{ padding: '6px', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5L19 19M19 5L5 19" stroke={TEXT} strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Receipt card */}
      <div style={{ padding: '4px 16px 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          position: 'relative', backgroundColor: '#FFFFFF', borderRadius: '14px', overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 10px 28px rgba(0,0,0,0.07)'
        }}>
          <ScallopEdge side="top" />

          {/* Logo — red Kaspi figure (own asset, recoloured), left-aligned, no circle */}
          <div style={{ padding: '26px 20px 18px' }}>
            <div style={{
              width: '52px', height: '65px', backgroundColor: '#C8392F',
              WebkitMaskImage: 'url(/kaspi_assets/icon_white.svg)', maskImage: 'url(/kaspi_assets/icon_white.svg)',
              WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
              WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
              WebkitMaskPosition: 'left center', maskPosition: 'left center'
            }} />
          </div>

          {/* Green success band */}
          <div style={{ backgroundColor: GREEN_BG, padding: '22px 20px' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: GREEN }}>Перевод успешно совершен</div>
            <div style={{ fontSize: '33px', fontWeight: '700', color: GREEN, marginTop: '6px', lineHeight: '1.15', letterSpacing: '0.2px' }}>
              {amount} ₸
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '20px 16px 6px' }}>
            {/* Recipient */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '18px' }}>
              <AvatarPlaceholder size={50} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: TEXT }}>{recipientName}</div>
                <div style={{ fontSize: '14px', color: LABEL, marginTop: '3px' }}>{recipientPhone}</div>
              </div>
            </div>

            {/* Details */}
            <DetailRow label="Тип перевода" value="Перевод клиенту Kaspi" truncate />
            <DetailRow label="№ квитанции" value={receiptNo} />
            <DetailRow label="Дата и время по Астане" value={dateStr} />
            <DetailRow label="Комиссия" value="0 ₸" />
            <DetailRow label="Отправитель" value={sender} />
            <DetailRow label="Откуда" value={source} />

            {/* Visible, semi-transparent watermark (anti-misuse) */}
            <div style={{
              position: 'relative', height: '46px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            }}>
              <span style={{
                transform: 'rotate(-6deg)', color: 'rgba(90,90,95,0.32)', fontSize: '19px',
                fontWeight: '800', letterSpacing: '2px', whiteSpace: 'nowrap', userSelect: 'none'
              }}>
                THIS IS NOT REAL
              </span>
            </div>
          </div>

          <ScallopEdge side="bottom" />
        </div>
      </div>

      {/* Action bar */}
      <div style={{
        marginTop: 'auto', display: 'flex', justifyContent: 'space-around',
        padding: '10px 10px calc(var(--sab, 34px) + 10px)'
      }}>
        {[
          { label: ['Поделиться'], Icon: ShareIcon, onClick: () => {} },
          { label: ['Повторить', 'перевод'], Icon: RepeatIcon, onClick: onRepeat },
          { label: ['Запросить', 'отмену'], Icon: CancelIcon, onClick: () => {} },
          { label: ['Сохранить', 'в Частые'], Icon: StarIcon, onClick: () => {} }
        ].map((a, i) => {
          const { Icon } = a;
          return (
            <div key={i} onClick={a.onClick} className="touchable"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', width: '76px' }}>
              <div style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon />
              </div>
              <div style={{ textAlign: 'center', fontSize: '12.5px', color: '#3A3A3C', lineHeight: '15px' }}>
                {a.label.map((l) => <div key={l}>{l}</div>)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
