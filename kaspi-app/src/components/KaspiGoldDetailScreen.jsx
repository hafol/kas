import React, { useState } from 'react';
import {
  IconKaspiQrGold,
  IconTransferGold,
  IconTopupGold,
  IconWebPayGold,
  IconSubscriptionsGold,
  IconOrderCashGold,
  IconReissueGold,
  IconChangePinGold,
  IconBlockCardGold,
  IconCardlessGold,
  IconCloseCardGold,
  IconAnalyticsGold,
  IconLimitsGold,
  IconRequisitesGold,
  IconCertificatesGold,
  IconConditionsGold,
  IconAtmsGold,
  IconTipsGold,
  IconVisaTopupGold,
  StatementCalendarIcon,
  StatementOperationsReceiptIcon,
  StatementBasketIcon,
  StatementPersonIcon,
  KaspiGoldMedallion
} from './KaspiGoldIcons';
import { parseAndFormatKaspiBalance } from '../utils/formatters';

// Chevron right: grey > (+30% bigger: 9 x 17, stroke 2.2)
const ChevronRightIcon = ({ color = "#C7C7CC" }) => (
  <svg width="9" height="17" viewBox="0 0 10 18" fill="none">
    <path d="M2 2L8 9L2 16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Back chevron < (20% smaller: 11 x 20.5, less bold: strokeWidth 1.8)
const BackChevronIcon = ({ color = "#FFFFFF" }) => (
  <svg width="11" height="20.5" viewBox="0 0 10 18" fill="none">
    <path d="M8.5 1.5L1.5 9L8.5 16.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Share / Export icon (square with upward right arrow, +30% bigger)
const ShareExportIcon = ({ size = 24, color = "#8E8E93" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="16 6 12 2 8 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="2" x2="12" y2="15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Search Magnifier icon (+30% bigger)
const SearchIcon = ({ size = 20, color = "#8E8E93" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7.5" stroke={color} strokeWidth="2" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const RANDOM_KASPI_NAMES = [
  'Айдос С.',
  'Динара М.',
  'Нурлан К.',
  'Мадина Б.',
  'Ерлан Т.',
  'Камила А.',
  'Азамат Б.',
  'Данияр О.',
  'Алия Ж.',
  'Руслан В.',
  'Арман К.',
  'Асель Т.'
];

const DEFAULT_STATEMENT_GROUPS = [
  {
    date: '23 октября',
    items: [
      {
        id: 'tx_1',
        title: 'Супермаркет Daily',
        category: 'Супермаркеты',
        amount: '- 1 640 ₸',
        iconType: 'basket'
      }
    ]
  },
  {
    date: '22 октября',
    items: [
      {
        id: 'tx_2',
        title: 'Алия Б.',
        category: 'Переводы',
        amount: '- 1 100 ₸',
        iconType: 'person'
      }
    ]
  },
  {
    date: '21 октября',
    items: [
      {
        id: 'tx_3',
        title: 'Magnum Daily',
        category: 'Супермаркеты',
        amount: '- 8 450 ₸',
        iconType: 'basket'
      }
    ]
  }
];

export const KaspiGoldDetailScreen = ({
  card = {
    id: "gold_4163",
    name: "Kaspi Gold",
    last4: "4163",
    cardNumberFormatted: "4400 4303 6188 4163",
    iban: "KZ54722C000021658491",
    balance: 110922.58,
    currency: "₸",
    expiry: "09/29",
    cvv: "•••"
  },
  onBack,
  onOpenTransfer,
  onUpdateBalance,
  onUpdateLast4
}) => {
  const [activeTab, setActiveTab] = useState('actions'); // 'actions' | 'info' | 'statement'
  const [sliderHeight, setSliderHeight] = useState('auto');
  const [showRequisitesModal, setShowRequisitesModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = React.useRef(null);
  const navBarRef = React.useRef(null);
  const bigHeaderRef = React.useRef(null);
  const medallionRef = React.useRef(null);
  const compactTitleRef = React.useRef(null);
  const tabBarRef = React.useRef(null);
  const sheetRef = React.useRef(null);
  const actionsPaneRef = React.useRef(null);
  const infoPaneRef = React.useRef(null);
  const statementPaneRef = React.useRef(null);
  const touchStartXRef = React.useRef(0);
  const touchStartYRef = React.useRef(0);

  const TAB_KEYS = ['actions', 'info', 'statement'];
  const tabIndex = Math.max(TAB_KEYS.indexOf(activeTab), 0);

  // Measure and adapt container height to the active tab pane
  React.useEffect(() => {
    const updateHeight = () => {
      let ref = actionsPaneRef;
      if (activeTab === 'info') ref = infoPaneRef;
      else if (activeTab === 'statement') ref = statementPaneRef;
      if (ref.current) {
        setSliderHeight(ref.current.offsetHeight);
      }
    };
    updateHeight();
    const timeout = setTimeout(updateHeight, 50);
    return () => clearTimeout(timeout);
  }, [activeTab, searchQuery]);

  // Horizontal touch swipe handling between tabs
  const handleModuleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleModuleTouchEnd = (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;
    // Trigger tab slide only if horizontal swipe dominates and exceeds 45px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX < 0) {
        // Swiped left -> advance to next tab
        if (activeTab === 'actions') setActiveTab('info');
        else if (activeTab === 'info') setActiveTab('statement');
      } else {
        // Swiped right -> return to previous tab
        if (activeTab === 'statement') setActiveTab('info');
        else if (activeTab === 'info') setActiveTab('actions');
      }
    }
  };

  React.useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    let ticking = false;

    // Dynamically measure the exact geometry of this specific device screen
    const getGeometry = () => {
      const navHeight = navBarRef.current ? navBarRef.current.offsetHeight : 48;
      const sheetTop = sheetRef.current ? sheetRef.current.offsetTop : 238;
      // Exact distance the sheet travels until it pins under the nav bar
      const pinDistance = Math.max(sheetTop - navHeight, 100);
      return { navHeight, sheetTop, pinDistance };
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const s = parent.scrollTop;
          const { pinDistance } = getGeometry();

          // 1. OVERSCROLL / PULL-DOWN WHEN AT THE TOP (s < 0):
          // User: "its only when you scroll up like i mean there is no room up to scroll and then the module with the numbers just starts to going down"
          if (s < 0) {
            if (bigHeaderRef.current) {
              bigHeaderRef.current.style.opacity = '1';
              bigHeaderRef.current.style.transform = `translate3d(0, ${-s}px, 0)`;
              bigHeaderRef.current.style.pointerEvents = 'auto';
            }
            if (medallionRef.current) {
              medallionRef.current.style.opacity = '1';
            }
            if (compactTitleRef.current) {
              compactTitleRef.current.style.opacity = '0';
              compactTitleRef.current.style.pointerEvents = 'none';
            }
            ticking = false;
            return;
          }

          // 2. NORMAL SCROLL-DOWN (s >= 0):
          // User: "when you scroll down nothing but the module down moves as it was before so i mean return how it was that scroll effect when i send you this promt as you remember # Kaspi Gold: scroll-down animation, frame by frame"
          const progress = Math.min(Math.max(s / pinDistance, 0), 2.0);

          // Reverse-engineered relative phase ratios (matched from 16 measured frames):
          // 1. Big header fades out from 13% of scroll up to 100% (pin threshold):
          const bigHeaderOpacity = Math.min(Math.max(1 - (progress - 0.13) / (1.0 - 0.13), 0), 1);

          // 2. Medallion SVG fades out smoothly as you scroll down:
          // User: "когда скролл вниз стрницы она должна начинать исчезать типа"
          const medallionOpacity = Math.min(Math.max(1 - progress / 0.85, 0), 1);

          // 3. Compact title fades in from halfway (49%) up to 94% of scroll:
          const navTitleOpacity = Math.min(Math.max((progress - 0.49) / (0.94 - 0.49), 0), 1);

          // 4. Subtle parallax drift up to 4.6px:
          const drift = Math.min(Math.max((progress - 0.13) * 4.6, 0), 4.6);

          if (bigHeaderRef.current) {
            bigHeaderRef.current.style.opacity = bigHeaderOpacity;
            bigHeaderRef.current.style.transform = `translate3d(0, -${drift}px, 0)`;
            bigHeaderRef.current.style.pointerEvents = bigHeaderOpacity < 0.1 ? 'none' : 'auto';
          }

          if (medallionRef.current) {
            medallionRef.current.style.opacity = medallionOpacity;
          }

          if (compactTitleRef.current) {
            compactTitleRef.current.style.opacity = navTitleOpacity;
            compactTitleRef.current.style.pointerEvents = navTitleOpacity > 0.5 ? 'auto' : 'none';
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Touch pull-down gesture tracking (for devices/browsers where parent.scrollTop doesn't go negative)
    let startTouchY = 0;
    let isPullingDown = false;
    let pullOffset = 0;

    const onTouchStart = (e) => {
      if (parent.scrollTop <= 0) {
        startTouchY = e.touches[0].clientY;
        isPullingDown = true;
      } else {
        isPullingDown = false;
      }
    };

    const onTouchMove = (e) => {
      if (!isPullingDown) return;
      if (parent.scrollTop > 0) {
        isPullingDown = false;
        if (pullOffset > 0) {
          pullOffset = 0;
          resetPull();
        }
        return;
      }
      const currentY = e.touches[0].clientY;
      const diffY = currentY - startTouchY;
      if (diffY > 0) {
        pullOffset = Math.pow(diffY, 0.82);
        if (bigHeaderRef.current) {
          bigHeaderRef.current.style.transition = 'none';
          bigHeaderRef.current.style.transform = `translate3d(0, ${pullOffset}px, 0)`;
        }
        if (medallionRef.current) {
          medallionRef.current.style.opacity = '1';
        }
        if (sheetRef.current) {
          sheetRef.current.style.transition = 'none';
          sheetRef.current.style.transform = `translate3d(0, ${pullOffset}px, 0)`;
        }
      }
    };

    const onTouchEnd = () => {
      if (isPullingDown && pullOffset > 0) {
        if (bigHeaderRef.current) {
          bigHeaderRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
          bigHeaderRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
        if (medallionRef.current) {
          medallionRef.current.style.opacity = '1';
        }
        if (sheetRef.current) {
          sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
          sheetRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
      }
      isPullingDown = false;
      pullOffset = 0;
    };

    const resetPull = () => {
      if (bigHeaderRef.current) {
        bigHeaderRef.current.style.transition = 'none';
        bigHeaderRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
      if (medallionRef.current) {
        medallionRef.current.style.opacity = '1';
      }
      if (sheetRef.current) {
        sheetRef.current.style.transition = 'none';
        sheetRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    parent.addEventListener('scroll', handleScroll, { passive: true });
    parent.addEventListener('touchstart', onTouchStart, { passive: true });
    parent.addEventListener('touchmove', onTouchMove, { passive: true });
    parent.addEventListener('touchend', onTouchEnd, { passive: true });
    parent.addEventListener('touchcancel', onTouchEnd, { passive: true });
    handleScroll();

    return () => {
      parent.removeEventListener('scroll', handleScroll);
      parent.removeEventListener('touchstart', onTouchStart);
      parent.removeEventListener('touchmove', onTouchMove);
      parent.removeEventListener('touchend', onTouchEnd);
      parent.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Editable balance with persistent localStorage cache & freedom of action
  const [balance, setBalance] = useState(() => {
    try {
      const saved = localStorage.getItem('kaspi_gold_balance');
      if (saved !== null && saved !== '') {
        return parseAndFormatKaspiBalance(saved);
      }
    } catch (e) {}
    return parseAndFormatKaspiBalance(card?.balance ?? '110 922,58');
  });

  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [balanceInput, setBalanceInput] = useState('');

  // Editable last 4 digits with persistent localStorage cache
  const [last4, setLast4] = useState(() => {
    try {
      const saved = localStorage.getItem('kaspi_gold_last4');
      if (saved) return saved.slice(0, 4);
    } catch (e) {}
    return card?.last4 || '4163';
  });

  const [isEditingLast4, setIsEditingLast4] = useState(false);
  const [last4Input, setLast4Input] = useState('');

  const handleStartEditLast4 = () => {
    setIsEditingLast4(true);
    setLast4Input(last4);
  };

  const handleSaveLast4 = (overrideValue) => {
    const raw = (overrideValue !== undefined ? overrideValue : last4Input).trim().replace(/\D/g, '');
    const finalVal = raw.length > 0 ? raw.slice(0, 4) : (last4 || '4163');
    setLast4(finalVal);
    try {
      localStorage.setItem('kaspi_gold_last4', finalVal);
      window.dispatchEvent(new CustomEvent('kaspi_last4_updated', { detail: finalVal }));
    } catch (e) {}
    if (onUpdateLast4) onUpdateLast4(finalVal);
    setIsEditingLast4(false);
  };

  const formattedBalance = `${balance} ₸`;
  const balanceAmount = balance;
  const balanceSymbol = '₸';

  const handleStartEditBalance = () => {
    setIsEditingBalance(true);
    setBalanceInput(String(balance).replace(/\s*₸\s*$/, '').trim());
  };

  const handleSaveBalance = () => {
    const raw = balanceInput.trim();
    if (!raw) {
      setIsEditingBalance(false);
      return;
    }
    const finalVal = parseAndFormatKaspiBalance(raw);
    setBalance(finalVal);
    try {
      localStorage.setItem('kaspi_gold_balance', finalVal);
      window.dispatchEvent(new CustomEvent('kaspi_balance_updated', { detail: finalVal }));
    } catch (e) {}
    if (onUpdateBalance) onUpdateBalance(finalVal);
    setIsEditingBalance(false);
  };

  // Editable statement groups with persistent localStorage cache
  const [statementGroups, setStatementGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('kaspi_gold_statement');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return DEFAULT_STATEMENT_GROUPS;
  });

  const saveStatementGroups = (newGroups) => {
    setStatementGroups(newGroups);
    try {
      localStorage.setItem('kaspi_gold_statement', JSON.stringify(newGroups));
    } catch (e) {}
  };

  // Editing transaction amounts / titles
  const [editingTxId, setEditingTxId] = useState(null);
  const [editingTxAmount, setEditingTxAmount] = useState('');
  const [editingTxTitleId, setEditingTxTitleId] = useState(null);
  const [editingTxTitle, setEditingTxTitle] = useState('');

  const startEditTxAmount = (tx) => {
    setEditingTxId(tx.id);
    setEditingTxAmount(tx.amount.replace('₸', '').trim());
  };

  const handleSaveTxAmount = (txId) => {
    if (!editingTxAmount.trim()) {
      setEditingTxId(null);
      return;
    }
    let val = editingTxAmount.trim();
    if (!val.endsWith('₸')) {
      val = `${val} ₸`;
    }
    const updated = statementGroups.map(group => ({
      ...group,
      items: group.items.map(item => item.id === txId ? { ...item, amount: val } : item)
    }));
    saveStatementGroups(updated);
    setEditingTxId(null);
  };

  const startEditTxTitle = (tx) => {
    setEditingTxTitleId(tx.id);
    setEditingTxTitle(tx.title);
  };

  const handleSaveTxTitle = (txId) => {
    if (!editingTxTitle.trim()) {
      setEditingTxTitleId(null);
      return;
    }
    const updated = statementGroups.map(group => ({
      ...group,
      items: group.items.map(item => item.id === txId ? { ...item, title: editingTxTitle.trim() } : item)
    }));
    saveStatementGroups(updated);
    setEditingTxTitleId(null);
  };

  const handleDeleteTx = (txId) => {
    const updated = statementGroups
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.id !== txId)
      }))
      .filter(group => group.items.length > 0);
    saveStatementGroups(updated);
  };

  const handleRandomizeAllNames = () => {
    let pool = [...RANDOM_KASPI_NAMES].sort(() => 0.5 - Math.random());
    let poolIdx = 0;
    const updated = statementGroups.map(group => ({
      ...group,
      items: group.items.map(item => {
        if (item.category === 'Переводы' || item.iconType === 'person') {
          const randName = pool[poolIdx % pool.length];
          poolIdx++;
          return { ...item, title: randName };
        }
        return item;
      })
    }));
    saveStatementGroups(updated);
  };

  // Add Operation modal state
  const [showAddTxModal, setShowAddTxModal] = useState(false);
  const [newTxDate, setNewTxDate] = useState('Сегодня');
  const [newTxTitle, setNewTxTitle] = useState('');
  const [newTxCategory, setNewTxCategory] = useState('Переводы');
  const [newTxAmount, setNewTxAmount] = useState('1 000');
  const [newTxType, setNewTxType] = useState('expense'); // 'expense' (-) | 'income' (+)

  const handleSetRandomName = () => {
    const rand = RANDOM_KASPI_NAMES[Math.floor(Math.random() * RANDOM_KASPI_NAMES.length)];
    setNewTxTitle(rand);
  };

  const handleAddNewTx = () => {
    if (!newTxTitle.trim() || !newTxAmount.trim()) return;

    const prefix = newTxType === 'income' ? '+ ' : '- ';
    const cleanAmount = newTxAmount.trim().replace(/^[+-]\s*/, '').replace('₸', '').trim();
    const formattedAmount = parseAndFormatKaspiBalance(cleanAmount);
    const finalAmount = `${prefix}${formattedAmount} ₸`;

    let iconType = 'receipt';
    if (newTxCategory === 'Переводы') iconType = 'person';
    else if (newTxCategory === 'Супермаркеты') iconType = 'basket';
    else if (newTxCategory === 'Пополнение') iconType = 'topup';

    const newTx = {
      id: `tx_${Date.now()}`,
      title: newTxTitle.trim(),
      category: newTxCategory,
      amount: finalAmount,
      iconType
    };

    const targetDate = newTxDate.trim() || 'Сегодня';
    let found = false;
    let newGroups = statementGroups.map(group => {
      if (group.date.trim().toLowerCase() === targetDate.toLowerCase()) {
        found = true;
        return {
          ...group,
          items: [newTx, ...group.items]
        };
      }
      return group;
    });

    if (!found) {
      newGroups = [
        {
          date: targetDate,
          items: [newTx]
        },
        ...newGroups
      ];
    }

    saveStatementGroups(newGroups);
    setShowAddTxModal(false);
    setNewTxTitle('');
    setNewTxAmount('1 000');
  };

  const getStatementIcon = (item) => {
    if (item.icon) return item.icon;
    switch (item.iconType) {
      case 'basket':
        return StatementBasketIcon;
      case 'person':
        return StatementPersonIcon;
      case 'topup':
        return IconTopupGold;
      case 'receipt':
      default:
        return StatementOperationsReceiptIcon;
    }
  };

  // 11 items for TAB 1: ДЕЙСТВИЯ (exact match with Right Screenshot)
  const actionsList = [
    { id: 'qr', title: 'Kaspi QR', IconComponent: IconKaspiQrGold },
    { id: 'transfer', title: 'Перевести', IconComponent: IconTransferGold, onClick: onOpenTransfer },
    { id: 'topup', title: 'Пополнить Kaspi Gold', IconComponent: IconTopupGold },
    { id: 'webpay', title: 'Оплата в интернете', IconComponent: IconWebPayGold },
    { id: 'subscriptions', title: 'Платные сервисы и подписки', IconComponent: IconSubscriptionsGold },
    { id: 'order_cash', title: 'Заказать сумму на снятие', subtitle: 'более 4 000 000 ₸', IconComponent: IconOrderCashGold },
    { id: 'reissue', title: 'Перевыпустить Kaspi Gold', IconComponent: IconReissueGold },
    { id: 'pin', title: 'Сменить ПИН-код', IconComponent: IconChangePinGold },
    { id: 'block', title: 'Заблокировать карту', IconComponent: IconBlockCardGold },
    { id: 'cardless', title: 'Снять деньги без карты', IconComponent: IconCardlessGold },
    { id: 'close', title: 'Закрыть Kaspi Gold', IconComponent: IconCloseCardGold }
  ];

  // 8 items for TAB 2: ИНФО (exact user-provided SVGs matching Screenshot 2)
  const infoList = [
    { id: 'analytics', title: 'Аналитика покупок', IconComponent: IconAnalyticsGold },
    { id: 'limits', title: 'Лимит на снятие наличных', IconComponent: IconLimitsGold },
    { id: 'requisites', title: 'Реквизиты карты и счета', IconComponent: IconRequisitesGold, onClick: () => setShowRequisitesModal(true) },
    { id: 'certificates', title: 'Справки', subtitle: 'О наличии счета, о доступном остатке', IconComponent: IconCertificatesGold },
    { id: 'conditions', title: 'Условия Kaspi Gold', IconComponent: IconConditionsGold },
    { id: 'terminals', title: 'Терминалы и банкоматы', IconComponent: IconAtmsGold },
    { id: 'tips', title: 'Полезные советы', IconComponent: IconTipsGold },
    { id: 'visa_topup', title: 'Пополнения с Visa', subtitle: 'Из другого банка по номеру телефона', IconComponent: IconVisaTopupGold }
  ];

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        minHeight: '100%',
        backgroundColor: '#D5AE6B',
        backgroundImage: 'url(/kaspi_assets/kaspi_gold_bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
        boxSizing: 'border-box'
      }}
    >
      {/* 0. STATIC MEDALLION (Stickied at top: 0, before navBar in DOM so it starts at y=0, height: 0, zIndex: 2) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          height: 0,
          zIndex: 2,
          pointerEvents: 'none',
          overflow: 'visible'
        }}
      >
        <div
          ref={medallionRef}
          style={{
            position: 'absolute',
            right: '26px',
            top: 'calc(env(safe-area-inset-top, 0px) + 72px)',
            width: '112.5px',
            height: '112.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            willChange: 'opacity'
          }}
        >
          <img
            src="/kaspi_assets/kaspi_gold_medallion.svg"
            alt="Kaspi Gold Medallion"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* 1. STICKY TOP NAV BAR (Back arrow fixed & always visible, compact title fades in) */}
      <div
        ref={navBarRef}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
        zIndex: 50,
        backgroundColor: '#D5AE6B',
        height: 'calc(48px + env(safe-area-inset-top, 0px))',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: '18px',
        paddingRight: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }}>
        {/* Back navigation button */}
        <div
          onClick={onBack}
          className="touchable"
          style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            cursor: 'pointer'
          }}
        >
          <BackChevronIcon color="#FFFFFF" />
        </div>

        {/* Compact Centered Title + Balance (Fixed in place, fades in linearly s = 85 -> 163 pt) */}
        <div
          ref={compactTitleRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            pointerEvents: 'none',
            willChange: 'opacity'
          }}
        >
          <span style={{
            fontSize: '17px',
            fontWeight: '700',
            color: '#FFFFFF',
            lineHeight: 1.2
          }}>
            Kaspi Gold *{last4}
          </span>
          <span style={{
            fontSize: '13px',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.92)',
            marginTop: '1px',
            lineHeight: 1.2
          }}>
            {formattedBalance}
          </span>
        </div>

        {/* Empty placeholder for symmetry */}
        <div style={{ width: '36px' }} />
      </div>

      {/* 2. STICKY BIG HEADER GROUP (Fades out linearly as sheet slides up) */}
      <div
        ref={bigHeaderRef}
        style={{
          position: 'sticky',
          top: 'calc(48px + env(safe-area-inset-top, 0px))',
          left: 0,
          right: 0,
          zIndex: 3,
          paddingTop: '16px',
          paddingLeft: '18px',
          paddingRight: '18px',
          paddingBottom: '24px',
          boxSizing: 'border-box',
          willChange: 'opacity, transform'
        }}
      >
        {/* Card Name: Click to edit last 4 digits */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '2px'
        }}>
          {isEditingLast4 ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <span style={{
                fontSize: 'calc(22.5px + 0.5pt)',
                fontWeight: '750',
                color: '#FFFFFF',
                fontFamily: "'Roboto Flex Kaspi', 'Roboto', -apple-system, sans-serif",
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                Kaspi Gold *
              </span>
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
                onBlur={() => handleSaveLast4()}
                style={{
                  fontSize: 'calc(22.5px + 0.5pt)',
                  fontWeight: '750',
                  color: '#FFFFFF',
                  fontFamily: "'Roboto Flex Kaspi', 'Roboto', -apple-system, sans-serif",
                  backgroundColor: 'rgba(255, 255, 255, 0.22)',
                  border: 'none',
                  borderBottom: '2.5px solid #FFFFFF',
                  borderRadius: '4px',
                  padding: '0 4px',
                  outline: 'none',
                  width: '68px',
                  boxSizing: 'border-box',
                  textAlign: 'left'
                }}
              />
            </div>
          ) : (
            <div
              onClick={handleStartEditLast4}
              className="touchable"
              title="Нажмите, чтобы изменить последние 4 цифры карты"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <span style={{
                fontSize: 'calc(22.5px + 0.5pt)',
                fontWeight: '750',
                fontVariationSettings: "'wght' 750",
                fontFamily: "'Roboto Flex Kaspi', 'Roboto', -apple-system, sans-serif",
                color: '#FFFFFF',
                letterSpacing: '0.1px',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                Kaspi Gold *{last4}
              </span>
            </div>
          )}
        </div>

        {/* Caption "Доступно" */}
        <div style={{
          fontSize: 'calc(17px + 1.5pt)',
          fontWeight: '400',
          color: 'rgba(255, 255, 255, 0.92)',
          marginTop: '34px',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          Доступно
        </div>

        {/* Big Balance: Click to edit, Enter to save cache */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: 'calc(43px + 1.2pt)',
          fontWeight: '630',
          fontVariationSettings: "'wght' 630",
          fontFamily: "'Roboto Flex Kaspi', 'Roboto', -apple-system, sans-serif",
          color: '#FFFFFF',
          letterSpacing: '0.6px',
          lineHeight: '1.05',
          marginTop: '9px',
          transform: 'scaleY(1.01)',
          transformOrigin: 'left center',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}>
          {isEditingBalance ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                autoFocus
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveBalance();
                  if (e.key === 'Escape') setIsEditingBalance(false);
                }}
                onBlur={handleSaveBalance}
                style={{
                  fontSize: 'calc(36px + 1pt)',
                  fontWeight: '630',
                  color: '#FFFFFF',
                  fontFamily: "'Roboto Flex Kaspi', 'Roboto', sans-serif",
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  border: 'none',
                  borderBottom: '2.5px solid #FFFFFF',
                  borderRadius: '6px',
                  padding: '2px 8px',
                  outline: 'none',
                  width: '260px',
                  boxSizing: 'border-box'
                }}
              />
              <span style={{ fontSize: '28px', color: '#FFFFFF', fontWeight: '400' }}>₸</span>
            </div>
          ) : (
            <div
              onClick={handleStartEditBalance}
              className="touchable"
              title="Нажмите, чтобы изменить баланс (Enter для сохранения)"
              style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                cursor: 'pointer'
              }}
            >
              <span>{balanceAmount}</span>
              {balanceSymbol && (
                <span style={{
                  fontWeight: '487',
                  fontVariationSettings: "'wght' 487",
                  marginLeft: '12px'
                }}>
                  {balanceSymbol}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. MAIN WHITE SHEET (Rounded top corners: 18px, slides up over the golden header) */}
      <div
        ref={sheetRef}
        style={{
          backgroundColor: activeTab === 'statement' ? '#F2F2F7' : '#FFFFFF',
          transition: 'background-color 0.52s cubic-bezier(0.2, 0.9, 0.25, 1)',
          borderTopLeftRadius: '18px',
          borderTopRightRadius: '18px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 10,
          paddingBottom: 'calc(180px + env(safe-area-inset-bottom, 34px))'
        }}
      >
        {/* =====================================================================
            SEGMENTED CONTROL (Действия / Инфо / Выписка) - Sticky on scroll
            - Height: 43px (tab pill), selected tab 38px (+2px taller)
            - Gap sheet top -> tab bar: 14px (+4px interval)
            - Interval to icon section: 9px (-3px interval)
            - Active text stays regular 400 (not bold)
            - Labels: calc(14px + 2pt) font
        ===================================================================== */}
        <div
          ref={tabBarRef}
          style={{
            position: 'sticky',
            top: 'calc(48px + env(safe-area-inset-top, 0px))',
            zIndex: 40,
            backgroundColor: '#FFFFFF',
            padding: '14px 14px 9px 14px',
            borderTopLeftRadius: '18px',
            borderTopRightRadius: '18px',
            boxSizing: 'border-box'
          }}>
          <div style={{
            backgroundColor: '#F0F0F2',
            height: '43px',
            borderRadius: '11px',
            padding: '2.5px',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            position: 'relative'
          }}>
            {/* Sliding white pill indicator */}
            <div
              style={{
                position: 'absolute',
                top: '2.5px',
                bottom: '2.5px',
                left: '2.5px',
                width: 'calc((100% - 5px) / 3)',
                borderRadius: '8.5px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 0.5px 1px rgba(0, 0, 0, 0.06)',
                transform: `translateX(${tabIndex * 100}%)`,
                transition: 'transform 0.52s cubic-bezier(0.2, 0.9, 0.25, 1)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {[
              { id: 'actions', label: 'Действия' },
              { id: 'info', label: 'Инфо' },
              { id: 'statement', label: 'Выписка' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="touchable"
                  style={{
                    flex: 1,
                    height: '38px',
                    borderRadius: '8.5px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 'calc(14px + 2pt)',
                    fontWeight: '400',
                    color: isActive ? '#1C1C1E' : '#8E8E93',
                    transition: 'color 0.3s ease',
                    padding: 0,
                    position: 'relative',
                    zIndex: 2,
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            SLIDING CONTENT MODULES (Действия / Инфо / Выписка)
            - 3-pane horizontal track with slow & smooth cubic-bezier transition (0.52s)
            - Slides right-to-left or left-to-right when switching tabs
            - Dynamically updates container height
            - Circles less visible: rgba(0, 0, 0, 0.02)
            - Pitch between section icons: 74px (-2px interval)
        ===================================================================== */}
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            height: sliderHeight === 'auto' ? 'auto' : `${sliderHeight}px`,
            transition: 'height 0.52s cubic-bezier(0.2, 0.9, 0.25, 1)'
          }}
          onTouchStart={handleModuleTouchStart}
          onTouchEnd={handleModuleTouchEnd}
        >
          <div
            style={{
              display: 'flex',
              width: '300%',
              transform: `translate3d(-${tabIndex * 33.333333}%, 0, 0)`,
              transition: 'transform 0.52s cubic-bezier(0.2, 0.9, 0.25, 1)',
              alignItems: 'flex-start'
            }}
          >
            {/* PANE 1: ДЕЙСТВИЯ */}
            <div
              ref={actionsPaneRef}
              style={{
                width: '33.333333%',
                flexShrink: 0,
                boxSizing: 'border-box',
                pointerEvents: activeTab === 'actions' ? 'auto' : 'none'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {actionsList.map((action) => {
                  const { IconComponent } = action;
                  return (
                    <div
                      key={action.id}
                      onClick={action.onClick}
                      className="touchable"
                      style={{
                        height: '74px',
                        padding: '0 22px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <IconComponent size={action.id === 'qr' ? 27 : 26} color="#EE3524" />
                        </div>

                        <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column' }}>
                          <span style={{
                            fontSize: '19px',
                            fontWeight: '400',
                            color: '#1C1C1E',
                            lineHeight: 1.25,
                            fontFamily: "'Roboto', sans-serif"
                          }}>
                            {action.title}
                          </span>
                          {action.subtitle && (
                            <span style={{
                              fontSize: '14.5px',
                              fontWeight: '400',
                              color: '#8E8E93',
                              marginTop: '2px',
                              lineHeight: 1.2,
                              fontFamily: "'Roboto', sans-serif"
                            }}>
                              {action.subtitle}
                            </span>
                          )}
                        </div>
                      </div>

                      <ChevronRightIcon color="#C7C7CC" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PANE 2: ИНФО */}
            <div
              ref={infoPaneRef}
              style={{
                width: '33.333333%',
                flexShrink: 0,
                boxSizing: 'border-box',
                pointerEvents: activeTab === 'info' ? 'auto' : 'none'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {infoList.map((item) => {
                  const { IconComponent } = item;
                  return (
                    <div
                      key={item.id}
                      onClick={item.onClick}
                      className="touchable"
                      style={{
                        height: '74px',
                        padding: '0 22px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <IconComponent size={26} color="#EE3524" />
                        </div>

                        <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column' }}>
                          <span style={{
                            fontSize: '19px',
                            fontWeight: '400',
                            color: '#1C1C1E',
                            lineHeight: 1.25,
                            fontFamily: "'Roboto', sans-serif"
                          }}>
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span style={{
                              fontSize: '14.5px',
                              fontWeight: '400',
                              color: '#8E8E93',
                              marginTop: '2px',
                              lineHeight: 1.2,
                              fontFamily: "'Roboto', sans-serif"
                            }}>
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>

                      <ChevronRightIcon color="#C7C7CC" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PANE 3: ВЫПИСКА */}
            <div
              ref={statementPaneRef}
              style={{
                width: '33.333333%',
                flexShrink: 0,
                boxSizing: 'border-box',
                backgroundColor: '#F2F2F7',
                paddingBottom: '24px',
                pointerEvents: activeTab === 'statement' ? 'auto' : 'none'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Top White Island Card (Search + Date Range + Summary) with curved bottom corners */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                  paddingBottom: '4px',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
                }}>
                  {/* Search Input: "Поиск по операциям" - Height 46px (+2px), margin top 6px (-4px interval) */}
                  <div style={{
                    margin: '6px 14px 12px 14px',
                    backgroundColor: '#F2F2F4',
                    height: '46px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    boxSizing: 'border-box'
                  }}>
                    <SearchIcon size={20} color="#8E8E93" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Поиск по операциям"
                      style={{
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        marginLeft: '10px',
                        width: '100%',
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: '17px',
                        color: '#000000'
                      }}
                    />
                  </div>

                  {/* Date Range Row: Red Calendar (+8% icon size: 28px, circle unchanged: 44px) + "26 сентября - 26 октября" + Share/Export */}
                  <div style={{
                    height: '62px',
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }} className="touchable">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <StatementCalendarIcon size={28} color="#EE3524" />
                      </div>
                      <span style={{
                        marginLeft: '14px',
                        fontSize: '18px',
                        fontWeight: '400',
                        color: '#000000'
                      }}>
                        26 сентября - 26 октября
                      </span>
                    </div>

                    <div className="touchable" style={{ padding: '6px' }}>
                      <ShareExportIcon size={24} color="#8E8E93" />
                    </div>
                  </div>

                  <div style={{ height: '1px', backgroundColor: '#F2F2F4', marginLeft: '74px', width: 'calc(100% - 74px)' }} />

                  {/* Summary Row: "Операции" (+8% icon: 28px) + "+ 1 059 650 ₸" (NOT bold) / "- 970 912,39 ₸" */}
                  <div style={{
                    height: '62px',
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }} className="touchable">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <StatementOperationsReceiptIcon size={28} color="#EE3524" />
                      </div>
                      <span style={{
                        marginLeft: '14px',
                        fontSize: '18px',
                        fontWeight: '400',
                        color: '#000000'
                      }}>
                        Операции
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{
                          fontSize: '18px',
                          fontWeight: '400',
                          color: '#27A13B',
                          lineHeight: 1.25
                        }}>
                          + 1 059 650 ₸
                        </span>
                        <span style={{
                          fontSize: '14.5px',
                          fontWeight: '400',
                          color: '#757575',
                          marginTop: '2px',
                          lineHeight: 1.2
                        }}>
                          - 970 912,39 ₸
                        </span>
                      </div>
                      <ChevronRightIcon color="#C7C7CC" />
                    </div>
                  </div>
                </div>

                {/* Actions row: "+ Добавить операцию" and "🎲 Случайные имена" */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  padding: '10px 12px 6px 12px'
                }}>
                  <button
                    type="button"
                    onClick={() => setShowAddTxModal(true)}
                    className="touchable"
                    style={{
                      flex: 1,
                      height: '44px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px dashed #E2464A',
                      color: '#E2464A',
                      fontSize: '15px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      boxShadow: '0 0.5px 1.5px rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span>
                    <span>Добавить операцию / дату</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRandomizeAllNames}
                    className="touchable"
                    title="Сгенерировать случайные имена для переводов"
                    style={{
                      height: '44px',
                      padding: '0 12px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #EBEBEB',
                      color: '#666666',
                      fontSize: '13.5px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      boxShadow: '0 0.5px 1.5px rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    <span>🎲</span>
                    <span>Рандом имена</span>
                  </button>
                </div>

                {/* Grouped Transactions List by Date: Date headers on grey background + Curved white cards */}
                {statementGroups
                  .map(group => ({
                    ...group,
                    items: group.items.filter(item => {
                      if (!searchQuery) return true;
                      const q = searchQuery.toLowerCase();
                      return item.title.toLowerCase().includes(q) ||
                        item.category.toLowerCase().includes(q) ||
                        item.amount.toLowerCase().includes(q);
                    })
                  }))
                  .filter(group => group.items.length > 0)
                  .map((group) => (
                  <div key={group.date} style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
                    {/* Date Header: e.g. "23 октября" sitting on the grey background */}
                    <div style={{
                      padding: '16px 16px 8px 16px',
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#000000',
                      letterSpacing: '-0.2px'
                    }}>
                      {group.date}
                    </div>

                    {/* Curved white card containing transactions */}
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      margin: '0 12px 6px 12px',
                      overflow: 'hidden',
                      boxShadow: '0 0.5px 1.5px rgba(0, 0, 0, 0.03)'
                    }}>
                      {group.items.map((tx, idx) => {
                        const Icon = getStatementIcon(tx);
                        return (
                          <React.Fragment key={tx.id}>
                            <div
                              style={{
                                minHeight: '74px',
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxSizing: 'border-box'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                                {/* Circular icon container: unchanged 44px, icon inside +8%: 28px */}
                                <div style={{
                                  width: '44px',
                                  height: '44px',
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}>
                                  <Icon size={28} color="#262626" />
                                </div>

                                <div style={{ marginLeft: '14px', display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                                  {editingTxTitleId === tx.id ? (
                                    <input
                                      type="text"
                                      autoFocus
                                      value={editingTxTitle}
                                      onChange={(e) => setEditingTxTitle(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSaveTxTitle(tx.id);
                                        if (e.key === 'Escape') setEditingTxTitleId(null);
                                      }}
                                      onBlur={() => handleSaveTxTitle(tx.id)}
                                      style={{
                                        fontSize: '17px',
                                        fontWeight: '500',
                                        color: '#000000',
                                        border: 'none',
                                        borderBottom: '1.5px solid #E2464A',
                                        outline: 'none',
                                        backgroundColor: '#FFF5F5',
                                        padding: '2px 4px',
                                        borderRadius: '4px',
                                        maxWidth: '160px'
                                      }}
                                    />
                                  ) : (
                                    <span
                                      onClick={() => startEditTxTitle(tx)}
                                      title="Нажмите, чтобы изменить имя (Enter для сохранения)"
                                      style={{
                                        fontSize: '18px',
                                        fontWeight: '400',
                                        color: '#000000',
                                        lineHeight: 1.25,
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {tx.title}
                                    </span>
                                  )}
                                  <span style={{
                                    fontSize: '14.5px',
                                    fontWeight: '400',
                                    color: '#8E8E93',
                                    marginTop: '2px',
                                    lineHeight: 1.2
                                  }}>
                                    {tx.category}
                                  </span>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '8px' }}>
                                {editingTxId === tx.id ? (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="text"
                                      autoFocus
                                      value={editingTxAmount}
                                      onChange={(e) => setEditingTxAmount(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSaveTxAmount(tx.id);
                                        if (e.key === 'Escape') setEditingTxId(null);
                                      }}
                                      onBlur={() => handleSaveTxAmount(tx.id)}
                                      style={{
                                        fontSize: '17px',
                                        fontWeight: '500',
                                        color: '#000000',
                                        border: 'none',
                                        borderBottom: '1.5px solid #E2464A',
                                        outline: 'none',
                                        backgroundColor: '#FFF5F5',
                                        padding: '2px 4px',
                                        borderRadius: '4px',
                                        width: '100px',
                                        textAlign: 'right'
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <span
                                    onClick={() => startEditTxAmount(tx)}
                                    title="Нажмите, чтобы изменить сумму трат (Enter для сохранения)"
                                    style={{
                                      fontSize: '18px',
                                      fontWeight: '400',
                                      color: tx.amount?.startsWith('+') ? '#27A13B' : '#000000',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {tx.amount}
                                  </span>
                                )}
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTx(tx.id);
                                  }}
                                  className="touchable"
                                  title="Удалить операцию"
                                  style={{
                                    padding: '4px',
                                    cursor: 'pointer',
                                    color: '#C7C7CC',
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <ChevronRightIcon color="#C7C7CC" />
                                </div>
                              </div>
                            </div>

                            {idx < group.items.length - 1 && (
                              <div style={{
                                height: '1px',
                                backgroundColor: '#F2F2F4',
                                marginLeft: '74px',
                                width: 'calc(100% - 74px)'
                              }} />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          REQUISITES MODAL (Реквизиты карты и счета)
      ===================================================================== */}
      {showRequisitesModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '430px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px 20px 0 0',
            padding: '20px 20px 36px 20px',
            boxSizing: 'border-box'
          }}>
            {/* Modal top drag pill */}
            <div style={{
              width: '36px',
              height: '4px',
              backgroundColor: '#D1D1D6',
              borderRadius: '2px',
              margin: '0 auto 16px auto'
            }} />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#000000' }}>
                Реквизиты карты и счета
              </span>
              <button
                type="button"
                onClick={() => setShowRequisitesModal(false)}
                className="touchable"
                style={{
                  background: '#F2F2F4',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#8E8E93',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Card Number */}
              <div
                className="touchable"
                style={{
                  padding: '16px 16px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#8E8E93', fontSize: '13.5px' }}>Номер карты</div>
                  <div style={{ fontWeight: '600', fontSize: '18px', color: '#000000', marginTop: '2px' }}>
                    4400 4303 6188 {last4}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      const input = window.prompt('Введите последние 4 цифры карты:', last4);
                      if (input !== null) {
                        const cleaned = input.trim().replace(/\D/g, '').slice(0, 4);
                        if (cleaned) handleSaveLast4(cleaned);
                      }
                    }}
                    style={{
                      fontSize: '14.5px',
                      color: '#0089D0',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Изменить
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(`4400 4303 6188 ${last4}`, 'card');
                    }}
                    style={{
                      fontSize: '14.5px',
                      color: copiedField === 'card' ? '#27A13B' : '#E2464A',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    {copiedField === 'card' ? 'Скопировано' : 'Скопировать'}
                  </span>
                </div>
              </div>

              {/* Cardholder Name */}
              <div style={{
                padding: '16px 16px',
                backgroundColor: '#F8F8FA',
                borderRadius: '12px'
              }}>
                <div style={{ color: '#8E8E93', fontSize: '13.5px' }}>Имя на карте</div>
                <div style={{ fontWeight: '600', fontSize: '17px', color: '#000000', marginTop: '2px' }}>
                  PARASSAT ZHUMASH
                </div>
              </div>

              {/* Expiry & CVV */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{
                  padding: '16px 16px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px'
                }}>
                  <div style={{ color: '#8E8E93', fontSize: '13.5px' }}>Срок действия</div>
                  <div style={{ fontWeight: '600', fontSize: '17px', color: '#000000', marginTop: '2px' }}>
                    09/29
                  </div>
                </div>
                <div style={{
                  padding: '16px 16px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px'
                }}>
                  <div style={{ color: '#8E8E93', fontSize: '13.5px' }}>CVV</div>
                  <div style={{ fontWeight: '600', fontSize: '17px', color: '#000000', marginTop: '2px' }}>
                    •••
                  </div>
                </div>
              </div>

              {/* IBAN */}
              <div
                onClick={() => copyToClipboard('KZ54722C000021658491', 'iban')}
                className="touchable"
                style={{
                  padding: '16px 16px',
                  backgroundColor: '#F8F8FA',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ color: '#8E8E93', fontSize: '13.5px' }}>Счет (IBAN)</div>
                  <div style={{ fontWeight: '600', fontSize: '16px', color: '#000000', marginTop: '2px' }}>
                    KZ54722C000021658491
                  </div>
                </div>
                <span style={{ fontSize: '14.5px', color: copiedField === 'iban' ? '#27A13B' : '#E2464A', fontWeight: '500' }}>
                  {copiedField === 'iban' ? 'Скопировано' : 'Скопировать'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADD TRANSACTION / SECTION MODAL
      ===================================================================== */}
      {showAddTxModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          zIndex: 350,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          backdropFilter: 'blur(2px)'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '430px',
            backgroundColor: '#FFFFFF',
            borderRadius: '22px 22px 0 0',
            padding: '20px 20px 36px 20px',
            boxSizing: 'border-box',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {/* Modal drag pill */}
            <div style={{
              width: '36px',
              height: '4px',
              backgroundColor: '#D1D1D6',
              borderRadius: '2px',
              margin: '0 auto 16px auto'
            }} />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '18px'
            }}>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#000000' }}>
                Добавить операцию / дату
              </span>
              <button
                type="button"
                onClick={() => setShowAddTxModal(false)}
                className="touchable"
                style={{
                  background: '#F2F2F4',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#8E8E93',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Date field */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13.5px', color: '#8E8E93', marginBottom: '6px' }}>
                Дата (раздел выписки)
              </div>
              <input
                type="text"
                value={newTxDate}
                onChange={(e) => setNewTxDate(e.target.value)}
                placeholder="Например: Сегодня, 24 октября, 23 октября"
                style={{
                  width: '100%',
                  height: '44px',
                  backgroundColor: '#F8F8FA',
                  border: '1px solid #EBEBEB',
                  borderRadius: '12px',
                  padding: '0 14px',
                  fontSize: '16px',
                  color: '#000000',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
              {/* Quick date chips */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                {['Сегодня', 'Вчера', '24 октября', '23 октября'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setNewTxDate(d)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: newTxDate === d ? '#FFF0F0' : '#F2F2F4',
                      color: newTxDate === d ? '#EE3524' : '#555555',
                      border: newTxDate === d ? '1px solid #EE3524' : 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Title / Name field with Random button */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px'
              }}>
                <span style={{ fontSize: '13.5px', color: '#8E8E93' }}>
                  Название / Клиент / Магазин
                </span>
                <button
                  type="button"
                  onClick={handleSetRandomName}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#EE3524',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  🎲 Случайное имя
                </button>
              </div>
              <input
                type="text"
                value={newTxTitle}
                onChange={(e) => setNewTxTitle(e.target.value)}
                placeholder="Например: Данияр К., Magnum, Coffee Shop"
                style={{
                  width: '100%',
                  height: '44px',
                  backgroundColor: '#F8F8FA',
                  border: '1px solid #EBEBEB',
                  borderRadius: '12px',
                  padding: '0 14px',
                  fontSize: '16px',
                  color: '#000000',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Category chips */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13.5px', color: '#8E8E93', marginBottom: '6px' }}>
                Категория
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Переводы', 'Супермаркеты', 'Транспорт', 'Кафе и рестораны', 'Платежи', 'Пополнение'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setNewTxCategory(cat);
                      if (cat === 'Пополнение') setNewTxType('income');
                      else if (newTxType === 'income') setNewTxType('expense');
                    }}
                    style={{
                      padding: '7px 12px',
                      backgroundColor: newTxCategory === cat ? '#EE3524' : '#F2F2F4',
                      color: newTxCategory === cat ? '#FFFFFF' : '#333333',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '13.5px',
                      fontWeight: newTxCategory === cat ? '600' : '400',
                      cursor: 'pointer'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Type & Amount */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ fontSize: '13.5px', color: '#8E8E93', marginBottom: '6px' }}>
                Тип и сумма
              </div>
              {/* Type toggle */}
              <div style={{
                display: 'flex',
                backgroundColor: '#F0F0F2',
                borderRadius: '10px',
                padding: '3px',
                marginBottom: '10px'
              }}>
                <button
                  type="button"
                  onClick={() => setNewTxType('expense')}
                  style={{
                    flex: 1,
                    height: '36px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: newTxType === 'expense' ? '#FFFFFF' : 'transparent',
                    color: newTxType === 'expense' ? '#000000' : '#8E8E93',
                    fontWeight: newTxType === 'expense' ? '600' : '400',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: newTxType === 'expense' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Списание (-)
                </button>
                <button
                  type="button"
                  onClick={() => setNewTxType('income')}
                  style={{
                    flex: 1,
                    height: '36px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: newTxType === 'income' ? '#FFFFFF' : 'transparent',
                    color: newTxType === 'income' ? '#27A13B' : '#8E8E93',
                    fontWeight: newTxType === 'income' ? '600' : '400',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: newTxType === 'income' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Пополнение (+)
                </button>
              </div>

              {/* Amount input */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={newTxAmount}
                  onChange={(e) => setNewTxAmount(e.target.value)}
                  placeholder="2 500"
                  style={{
                    width: '100%',
                    height: '46px',
                    backgroundColor: '#F8F8FA',
                    border: '1px solid #EBEBEB',
                    borderRadius: '12px',
                    padding: '0 40px 0 14px',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: newTxType === 'income' ? '#27A13B' : '#000000',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  right: '14px',
                  top: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#8E8E93'
                }}>
                  ₸
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleAddNewTx}
              className="touchable"
              style={{
                width: '100%',
                height: '48px',
                backgroundColor: '#EE3524',
                color: '#FFFFFF',
                borderRadius: '12px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              Добавить в выписку
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
