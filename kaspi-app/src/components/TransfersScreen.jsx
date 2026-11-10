import React, { useState, useRef } from 'react';
import { parseAndFormatKaspiBalance } from '../utils/formatters';
import { BottomNavBar, NavIconQR } from './BottomNavBar';
import { IconClientKaspi, IconOtherBank, IconScanCard, IconContact } from './TransferIcons';
import { TransferReceipt } from './TransferReceipt';

const RED = '#F14635';         // list row icons (other screens)
const PERSON = '#B1372D';      // deep-red contacts icon (per spec)
const BLUE = '#0175CC';        // Kaspi transfer-button blue
const PAGE = '#FFFFFF';
const FIELD = '#F2F2F2';       // grey input fill
const TEXT = '#131313';        // near-black body text
const SUBTLE = '#9A9AA0';
const GOLD = '#D5AE6B';        // "recipient found" box

// Synthetic recipients + sender (no real personal data)
const RECIPIENT_NAMES = ['Аружан С.', 'Данияр М.', 'Мадина Е.', 'Нұрлан Т.', 'Әсел К.', 'Бекзат Ж.', 'Жанель О.', 'Тимур А.'];
const SENDER = 'Алихан Б.';

const digitsOf = (s) => (s || '').replace(/\D/g, '');
const resolveName = (digits) =>
  RECIPIENT_NAMES[digits.split('').reduce((a, c) => a + (+c || 0), 0) % RECIPIENT_NAMES.length];
const genReceiptNo = () => Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
const nowAstana = () => {
  const d = new Date(); const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
};
// `sub` = the 10-digit subscriber number (no country code); we always prefix +7.
const formatPhone = (sub) => {
  const d = digitsOf(sub).slice(0, 10);
  let out = '+7';
  if (d.length) out += ' (' + d.slice(0, 3);
  if (d.length >= 3) out += ')';
  if (d.length > 3) out += ' ' + d.slice(3, 6);
  if (d.length > 6) out += '-' + d.slice(6, 8);
  if (d.length > 8) out += '-' + d.slice(8, 10);
  return out;
};
// Same as formatPhone, but never trails a separator after the last typed digit,
// so the caret sits right next to the numbers while typing.
const phoneTyped = (sub) => {
  const d = digitsOf(sub).slice(0, 10);
  let out = '+7 (' + d.slice(0, 3);
  if (d.length > 3) out += ') ' + d.slice(3, 6);
  if (d.length > 6) out += '-' + d.slice(6, 8);
  if (d.length > 8) out += '-' + d.slice(8, 10);
  return out;
};
// Full fixed-width template; empty digit slots are figure-spaces (digit width),
// so a transparent caret-input can overlay it exactly.
const FIGSP = ' ';
const fullTemplate = (digits) => {
  const d = (digits || '').padEnd(10, FIGSP);
  return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8, 10)}`;
};

// iOS-style back chevron
const BackChevron = () => (
  <svg width="12" height="22" viewBox="0 0 12 22" fill="none" style={{ display: 'block' }}>
    <path d="M10 1.5L1.5 11L10 20.5" stroke={TEXT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = ({ color = '#C6C6CC' }) => (
  <svg width="9" height="16" viewBox="0 0 9 16" fill="none" style={{ display: 'block' }}>
    <path d="M1.5 1.5L7.5 8L1.5 14.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronDown = ({ color = '#929292' }) => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ display: 'block' }}>
    <path d="M2 2L8 8L14 2" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
// small QR mark for the "Kaspi QR" segment
const QrMark = ({ color = TEXT, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <rect x="3" y="3" width="6" height="6" rx="1.4" stroke={color} strokeWidth="1.8" />
    <rect x="15" y="3" width="6" height="6" rx="1.4" stroke={color} strokeWidth="1.8" />
    <rect x="3" y="15" width="6" height="6" rx="1.4" stroke={color} strokeWidth="1.8" />
    <rect x="15.5" y="15.5" width="2.2" height="2.2" fill={color} />
    <rect x="19.3" y="15.5" width="1.7" height="2.2" fill={color} />
    <rect x="15.5" y="19.3" width="2.2" height="1.7" fill={color} />
  </svg>
);

// Recolourable icon rendered from an SVG file via CSS mask.
const MaskIcon = ({ src, size, color }) => (
  <div style={{
    width: size, height: size, backgroundColor: color, flexShrink: 0,
    WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`,
    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain', maskSize: 'contain',
    WebkitMaskPosition: 'center', maskPosition: 'center'
  }} />
);

// Переводы list icons — masked copies of the project's traced SVGs (public/icons),
// all at stroke-width 2.1 so the whole list matches in weight. These are local to
// this screen; the shared Kaspi Gold detail screen keeps its own KaspiGoldIcons.
const IconListSwap  = ({ size = 27, color }) => <MaskIcon src="/icons/swap.svg" size={size} color={color} />;
const IconListTopup = ({ size = 27, color }) => <MaskIcon src="/icons/card-add.svg" size={size} color={color} />;
const IconListGlobe = ({ size = 27, color }) => <MaskIcon src="/icons/globe.svg" size={size} color={color} />;

// Segmented control with a white pill that slides smoothly to the active item.
const Segmented = ({ items, value, onChange, dark, height = 38 }) => {
  const n = items.length;
  const idx = Math.max(0, items.findIndex((i) => i.id === value));
  const labelColor = (sel) => (dark ? TEXT : (sel ? TEXT : '#6E6E73'));
  return (
    <div style={{
      position: 'relative', display: 'flex', backgroundColor: dark ? '#F2F2F2' : '#EDEDEF',
      borderRadius: '11px', padding: '3px', boxSizing: 'border-box'
    }}>
      {/* sliding pill */}
      <div style={{
        position: 'absolute', top: '3px', bottom: '3px', left: '3px',
        width: `calc((100% - 6px) / ${n})`,
        transform: `translateX(${idx * 100}%)`,
        transition: 'transform 420ms cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: '#FFFFFF', borderRadius: '9px', boxShadow: '0 1px 3px rgba(0,0,0,0.13)'
      }} />
      {items.map((it) => {
        const sel = it.id === value;
        return (
          <div
            key={it.id}
            onClick={() => onChange(it.id)}
            className="touchable"
            style={{
              position: 'relative', zIndex: 1, flex: 1, height: `${height}px`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              fontSize: dark ? '15px' : '15px', fontWeight: dark ? '500' : (sel ? '500' : '400'),
              color: labelColor(sel), cursor: 'pointer', transition: 'color 220ms ease'
            }}
          >
            {it.qr && <MaskIcon src="/icons/qr-scan.svg" size={dark ? 19 : 16} color={labelColor(sel)} />}
            {it.label}
          </div>
        );
      })}
    </div>
  );
};

export const TransfersScreen = ({ card, sender, onBack, onCompleteTransfer, onOpenQr }) => {
  const [activeTab, setActiveTab] = useState('my');       // 'my' | 'history'
  const [subMode, setSubMode] = useState('list');         // 'list' | 'client_kaspi' | 'receipt'
  const [clientTab, setClientTab] = useState('phone');    // 'phone' | 'card' | 'qr'
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [receiptData, setReceiptData] = useState(null);
  const [formAnim, setFormAnim] = useState(null);         // 'in' | 'out' | null
  const [customName, setCustomName] = useState('');       // user-edited recipient name
  const [nameEdited, setNameEdited] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const phoneRef = useRef(null);

  const amountNum = parseInt(amount.replace(/\D/g, ''), 10) || 0;
  const amountLabel = amountNum ? amountNum.toLocaleString('ru-RU') : '0';

  // Available balance cap — the amount can't exceed your own balance.
  const balanceNum = typeof card?.balance === 'number'
    ? card.balance
    : parseFloat(String(card?.balance ?? '').replace(/\s/g, '').replace(',', '.')) || 0;
  const maxAmount = Math.floor(balanceNum);

  const recipientDigits = digitsOf(recipient);
  const phoneDisplay = formatPhone(recipient);
  // recipient is "found" once enough digits are entered (phone: 11, card: 16)
  const recipientReady =
    clientTab === 'phone' ? recipientDigits.length >= 10
      : clientTab === 'card' ? recipientDigits.length >= 16
        : false;
  const resolvedName = nameEdited
    ? customName
    : (recipientDigits ? resolveName(recipientDigits) : 'Получатель');

  const options = [
    { id: 'between', title: 'Между своими счетами', subtitle: null, Icon: IconListSwap },
    { id: 'client_kaspi', title: 'Клиенту Kaspi', subtitle: 'На карту Kaspi Gold', Icon: IconClientKaspi, onClick: () => openForm() },
    { id: 'client_other', title: 'Клиенту другого банка', subtitle: 'По номеру телефона или карты', Icon: IconOtherBank },
    { id: 'topup', title: 'Пополнить Kaspi Gold', subtitle: 'С карты другого банка', Icon: IconListTopup, iconSize: 29 },
    { id: 'international', title: 'Международные переводы', subtitle: 'По номеру карты или телефона', Icon: IconListGlobe }
  ];

  const recipientPlaceholder =
    clientTab === 'phone' ? 'Номер телефона получателя'
      : clientTab === 'qr' ? 'Отсканируйте Kaspi QR'
        : 'Kaspi Gold получателя';

  const resetForm = () => { setAmount(''); setRecipient(''); setMessage(''); setCustomName(''); setNameEdited(false); setEditingName(false); setPhoneFocused(false); };
  const openForm = () => { setFormAnim('in'); setSubMode('client_kaspi'); };
  const closeForm = () => {
    setFormAnim('out');
    setTimeout(() => { setSubMode('list'); setFormAnim(null); }, 360);
  };

  const handleTransfer = () => {
    if (amountNum <= 0) return;
    const name = resolvedName;
    onCompleteTransfer && onCompleteTransfer({
      title: 'Клиенту Kaspi',
      category: 'Переводы',
      amount: -amountNum,
      currency: '₸',
      time: 'Только что',
      card: 'Kaspi Gold',
      receiptAvailable: true
    });
    setReceiptData({
      amount: `${amountNum.toLocaleString('ru-RU')},00`,
      recipientName: name,
      recipientPhone: clientTab === 'phone' ? phoneDisplay : 'Kaspi Gold',
      receiptNo: genReceiptNo(),
      dateStr: nowAstana(),
      sender: sender || SENDER,
      source: 'Kaspi Gold'
    });
    setSubMode('receipt');
  };

  // ── Shared sticky header ──────────────────────────────────────────────
  const Header = ({ title }) => (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      backgroundColor: PAGE, width: '100%', boxSizing: 'border-box'
    }}>
      <div style={{ height: 'var(--sat, 0px)', width: '100%', backgroundColor: PAGE }} />
      <div style={{ position: 'relative', height: '44px', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }}>
        <div
          onClick={() => (subMode === 'client_kaspi' ? closeForm() : onBack())}
          className="touchable"
          style={{ position: 'absolute', left: '17px', top: '11.5px', padding: '0 6px', cursor: 'pointer', zIndex: 2 }}
        >
          <BackChevron />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: '17px', fontWeight: '600', color: TEXT, letterSpacing: '0.1px' }}>{title}</span>
        </div>
      </div>
    </div>
  );

  // ── LIST VIEW (reference #8) ─────────────────────────────────────────
  const listView = (
      <div style={{ minHeight: '100%', backgroundColor: PAGE, display: 'flex', flexDirection: 'column' }}>
        <Header title="Переводы" />

        {/* Segmented control: Мои Переводы / История */}
        <div style={{ margin: '13px 16px 18px' }}>
          <Segmented
            height={33}
            items={[{ id: 'my', label: 'Мои Переводы' }, { id: 'history', label: 'История' }]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {activeTab === 'my' ? (
          <div style={{ paddingBottom: 'calc(54px + var(--sab, 34px) + 12px)' }}>
            {options.map((opt) => {
              const { Icon } = opt;
              return (
                <div
                  key={opt.id}
                  onClick={opt.onClick}
                  className="touchable"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '13px',
                    padding: '14.25px 16px', cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#FBFBFC',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Icon size={opt.iconSize || 27} color="#B0423D" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '16px', fontWeight: '400', color: TEXT, letterSpacing: '0.1px' }}>
                      {opt.title}
                    </div>
                    {opt.subtitle && (
                      <div style={{ fontSize: '13px', color: '#8E8E93', marginTop: '1px' }}>{opt.subtitle}</div>
                    )}
                  </div>
                  <ChevronRight />
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ padding: '40px 24px', textAlign: 'center', color: SUBTLE, fontSize: '15px' }}>
            Здесь появится история ваших переводов
          </div>
        )}

        <BottomNavBar activeTab="home" onTabChange={() => onBack && onBack()} />
      </div>
  );

  // ── RECEIPT (synthetic data + visible watermark) ─────────────────────
  if (subMode === 'receipt' && receiptData) {
    return (
      <TransferReceipt
        data={receiptData}
        onClose={() => { setSubMode('list'); resetForm(); }}
        onRepeat={() => { resetForm(); openForm(); }}
      />
    );
  }

  // ── CLIENT KASPI FORM (reference #7) ─────────────────────────────────
  const formView = (
    <>
      <Header title="Клиенту Kaspi" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: 0 }}>
          {/* From-account card */}
          <div style={{
            margin: '14px 14.5px 0', backgroundColor: '#FFFFFF', borderRadius: '16px',
            padding: '14px 16.5px', height: '70.6px', boxSizing: 'border-box',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Gold card miniature — 37 × 28.4, radius 4.5 (spec) */}
              <div style={{
                width: '38.85px', height: '29.82px', borderRadius: '4.73px', backgroundColor: '#D4AF67',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden'
              }}>
                <img src="/kaspi_assets/icon_white.svg" alt="Kaspi Gold" style={{ width: '18.69px', height: '24.15px', objectFit: 'contain', display: 'block' }} />
              </div>
              <span style={{ fontSize: '17px', fontWeight: '400', color: TEXT }}>Kaspi Gold</span>
            </div>
            <span style={{ fontSize: '17px', fontWeight: '400', color: TEXT }}>
              {parseAndFormatKaspiBalance(card?.balance)} ₸
            </span>
          </div>

          {/* Grey gap with the chevron circle centred in it (two-panel header) */}
          <div style={{ position: 'relative', height: '12.5px', backgroundColor: '#F2F2F2', marginTop: '17px' }}>
            <div style={{
              position: 'absolute', left: '50%', top: '-10.6px', transform: 'translateX(-50%)',
              width: '33.7px', height: '33.7px', borderRadius: '50%', backgroundColor: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.12)'
            }}>
              <ChevronDown />
            </div>
          </div>

          {/* Segmented: Телефон / Карта / Kaspi QR (all black; QR opens the scanner) */}
          <div style={{ margin: '16px 16.5px 0' }}>
            <Segmented
              dark
              height={34.6}
              items={[
                { id: 'phone', label: 'Телефон' },
                { id: 'card', label: 'Карта' },
                { id: 'qr', label: 'Kaspi QR', qr: true }
              ]}
              value={clientTab}
              onChange={(id) => (id === 'qr' ? (onOpenQr && onOpenQr()) : setClientTab(id))}
            />
          </div>

          {/* Recipient field + animated "found" box */}
          <div style={{ margin: '25px 16.5px 0' }}>
            <div style={{
              position: 'relative',
              backgroundColor: FIELD,
              borderRadius: recipientReady ? '13.5px 13.5px 0 0' : '13.5px',
              height: '69px', overflow: 'hidden'
            }}>
              {clientTab === 'phone' ? (
                <>
                  {/* Floating label: centred when empty → up + blue when active */}
                  <div style={{
                    position: 'absolute', left: '16.5px', pointerEvents: 'none',
                    transition: 'top 170ms ease, font-size 170ms ease, color 170ms ease, transform 170ms ease',
                    ...((phoneFocused || recipient)
                      ? { top: '13px', fontSize: '12.5px', color: '#007AFF', transform: 'none' }
                      : { top: '50%', fontSize: '17px', color: '#8E8E93', transform: 'translateY(-50%)' })
                  }}>Телефон получателя</div>

                  {/* Masked template (dark, always shown) + transparent caret-input on top */}
                  {(phoneFocused || recipient) && (
                    <>
                      <div style={{
                        position: 'absolute', left: '16.5px', top: '33px', fontSize: '16.5px', color: TEXT,
                        pointerEvents: 'none', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.5px'
                      }}>{fullTemplate(recipient)}</div>
                      <input
                        ref={phoneRef}
                        value={phoneTyped(recipient)}
                        onChange={(e) => setRecipient(digitsOf(e.target.value.replace(/^\+7\s*/, '')).slice(0, 10))}
                        onFocus={() => setPhoneFocused(true)}
                        onBlur={() => setPhoneFocused(false)}
                        inputMode="tel"
                        style={{
                          position: 'absolute', left: '16.5px', top: '33px', right: '50px',
                          fontSize: '16.5px', color: 'transparent', caretColor: '#007AFF',
                          background: 'transparent', border: 'none', outline: 'none', padding: 0,
                          fontVariantNumeric: 'tabular-nums', letterSpacing: '0.5px'
                        }}
                      />
                    </>
                  )}

                  {/* Tap-to-focus when empty + unfocused */}
                  {!(phoneFocused || recipient) && (
                    <div
                      onClick={() => { setPhoneFocused(true); setTimeout(() => phoneRef.current && phoneRef.current.focus(), 0); }}
                      style={{ position: 'absolute', inset: 0, right: '46px', cursor: 'text' }}
                    />
                  )}

                  {/* Blue underline while actively focused */}
                  {phoneFocused && !recipientReady && (
                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '2px', backgroundColor: '#007AFF' }} />
                  )}

                  {/* Avatar icon (traced asset) */}
                  <div className="touchable" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex', cursor: 'pointer' }}>
                    <img src="/icons/user-avatar-trans.svg" alt="" width="25" height="25" style={{ display: 'block' }} />
                  </div>
                </>
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', padding: '0 14px 0 16.5px' }}>
                  <input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    inputMode="numeric"
                    placeholder={recipientPlaceholder}
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '17px', color: TEXT, padding: 0 }}
                  />
                  <div className="touchable" style={{ padding: '4px', display: 'flex', cursor: 'pointer' }}>
                    <img src="/icons/scan.svg" alt="" width="26" height="26" style={{ display: 'block' }} />
                  </div>
                </div>
              )}
            </div>

            {recipientReady && (
              <div className="tx-dropin" style={{ backgroundColor: GOLD, borderRadius: '0 0 13.5px 13.5px', padding: '12px 16.5px' }}>
                {editingName ? (
                  <input
                    autoFocus
                    value={nameEdited ? customName : (recipientDigits ? resolveName(recipientDigits) : '')}
                    onChange={(e) => { setCustomName(e.target.value); setNameEdited(true); }}
                    onBlur={() => setEditingName(false)}
                    onKeyDown={(e) => { if (e.key === 'Enter') setEditingName(false); }}
                    placeholder="Имя получателя"
                    style={{ border: 'none', outline: 'none', background: 'transparent', color: '#FFFFFF', fontSize: '18px', fontWeight: '400', width: '100%', padding: 0 }}
                  />
                ) : (
                  <div onClick={() => setEditingName(true)} className="touchable" style={{ fontSize: '18px', fontWeight: '400', color: '#FFFFFF', cursor: 'text' }}>
                    {resolvedName}
                  </div>
                )}
                <div style={{ fontSize: '14.5px', color: '#FFFFFF', marginTop: '3px' }}>
                  Деньги поступят на карту Kaspi Gold
                </div>
              </div>
            )}
          </div>

          {/* Amount field — "0 ₸" black, editable, capped at balance */}
          <div style={{
            margin: '25px 16.5px 0', backgroundColor: FIELD, borderRadius: '16px',
            height: '66.6px', display: 'flex', alignItems: 'center', padding: '0 16.5px'
          }}>
            <input
              value={amount ? amountLabel : '0'}
              onChange={(e) => {
                let d = e.target.value.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 9);
                if (parseInt(d, 10) > maxAmount) d = String(maxAmount);
                setAmount(d === '0' ? '' : d);
              }}
              inputMode="numeric"
              style={{
                border: 'none', outline: 'none', background: 'transparent',
                fontSize: '20px', fontWeight: '390', color: TEXT,
                fontFamily: "'Roboto Flex Kaspi', 'Roboto', -apple-system, sans-serif",
                width: `${(amount ? amountLabel : '0').length + 0.1}ch`, padding: 0
              }}
            />
            <span style={{ fontSize: '20px', color: TEXT, marginLeft: '2px' }}>₸</span>
          </div>

          {/* Message field */}
          <div style={{
            margin: '24px 16.5px 0', backgroundColor: FIELD, borderRadius: '13.5px',
            height: '94.8px', padding: '15px 16.5px', display: 'flex', boxSizing: 'border-box'
          }}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 50))}
              placeholder="Сообщение получателю"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent', resize: 'none',
                fontSize: '17px', color: TEXT, fontFamily: 'inherit'
              }}
            />
          </div>
          {/* Counter — outside the field, right-aligned (spec) */}
          <div style={{ margin: '6.5px 16.5px 0', textAlign: 'right', fontSize: '13px', color: '#8C8C8C' }}>
            {message.length}/50
          </div>

          {/* Quick-reply chips */}
          <div style={{ display: 'flex', gap: '8px', margin: '15px 16.5px 0', flexWrap: 'wrap' }}>
            {['Рақмет!', 'За обед', 'Возвращаю :)'].map((chip) => (
              <div
                key={chip}
                onClick={() => setMessage(chip)}
                className="touchable"
                style={{
                  height: '34.3px', padding: '0 14px', borderRadius: '17px', backgroundColor: '#EAF2FC',
                  color: '#25689E', fontSize: '16px', display: 'flex', alignItems: 'center', cursor: 'pointer'
                }}
              >
                {chip}
              </div>
            ))}
          </div>

          {/* Transfer button (pinned near the bottom, ~49pt above screen edge) */}
          <div style={{
            position: 'sticky', bottom: 0, marginTop: 'auto',
            padding: '20px 16.5px calc(var(--sab, 34px) + 15px)', backgroundColor: PAGE
          }}>
            <button
              onClick={handleTransfer}
              disabled={amountNum <= 0}
              className="touchable"
              style={{
                width: '100%', height: '57.4px', borderRadius: '13.5px', border: 'none',
                backgroundColor: BLUE, color: '#FFFFFF',
                fontSize: '17px', fontWeight: '500', cursor: amountNum > 0 ? 'pointer' : 'default'
              }}
            >
              Перевести <span style={{ fontWeight: 390, fontSize: '16px' }}>{amountLabel}</span> ₸
            </button>
          </div>
      </div>
    </>
  );

  // ── COMBINED RENDER — form slides in/out over the list ───────────────
  return (
    <div style={{ position: 'relative', minHeight: '100%', backgroundColor: PAGE, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {listView}
      {subMode === 'client_kaspi' && (
        <div
          className={formAnim === 'out' ? 'tx-page-out' : 'tx-page-in'}
          style={{
            position: 'absolute', inset: 0, zIndex: 70, backgroundColor: PAGE,
            display: 'flex', flexDirection: 'column', overflowY: 'auto', WebkitOverflowScrolling: 'touch'
          }}
        >
          {formView}
        </div>
      )}
    </div>
  );
};
