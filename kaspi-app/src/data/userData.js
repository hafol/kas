// Все данные Парасат Ж. полностью редактируемые в одном месте!
export const initialUserData = {
  profile: {
    shortName: "Парасат Ж.",
    fullName: "Жұмаш Парасат Дінмұратұлы",
    cardholderName: "PARASSAT ZHUMASH",
    iin: "100723552899",
    birthDate: "23.07.2010",
    docNumber: "064142698",
    issueDate: "14.08.2024",
    expiryDate: "13.08.2036",
    issuedBy: "ҚР ІІМ",
    phone: "+7 (707) 123-45-67",
    passcode: "2580", // 4-значный пин-код
    faceIdEnabled: true,
    avatar: null
  },

  cards: {
    gold: {
      id: "gold_4163",
      name: "Kaspi Gold",
      last4: "4163",
      cardNumberFormatted: "4400 4303 6188 4163",
      iban: "KZ54722C000021658491",
      balance: 17824.97,
      currency: "₸",
      subtitle: "1 счет",
      expiry: "09/29",
      cvv: "•••",
      cashWithdrawalLimit: "200 000 ₸",
      cashWithdrawnThisMonth: "0 ₸"
    },
    bonus: {
      id: "kaspi_bonus",
      name: "Kaspi Бонус",
      balance: 79.87,
      currency: "₸"
    }
  },

  deposits: [
    {
      id: "dep_accum",
      title: "Накопительный Депозит",
      rate: "17%",
      tag: "TS",
      badge: "Выгодно"
    },
    {
      id: "dep_standard",
      title: "Kaspi Депозит",
      rate: "15%",
      tag: "%",
      badge: null
    }
  ],

  // 8 Главных сервисов в 2 ряда (точно как на видео)
  services: [
    { id: "shop", title: "Магазин", icon: "shop" },
    { id: "bank", title: "Мой Банк", icon: "bank" },
    { id: "payments", title: "Платежи", icon: "payments" },
    { id: "transfers", title: "Переводы", icon: "transfers" },
    { id: "magnum", title: "Magnum", icon: "magnum" },
    { id: "travel", title: "Travel", icon: "travel" },
    { id: "gov", title: "Госуслуги", icon: "gov" },
    { id: "jobs", title: "Работа", icon: "jobs" }
  ],

  // Баннер со слайдером на главной (из видео)
  promoBanner: {
    tag: "Базовые джинсы",
    bonusBadge: "+ Бонусы",
    image: "/banner_jeans.png",
    currentSlide: 1,
    totalSlides: 4
  },

  // Товары «Вы недавно смотрели» (из видео: баллоны с краской)
  recentlyViewed: [
    {
      id: "p1",
      title: "ТИТАН краска А...",
      subtitle: "70 г",
      price: 1949,
      rating: "4.9",
      reviewsCount: 10,
      image: "spray1"
    },
    {
      id: "p2",
      title: "ТИТАН краска А...",
      subtitle: "150 г",
      price: 1600,
      rating: "4.9",
      reviewsCount: 14,
      image: "spray2"
    },
    {
      id: "p3",
      title: "ТИТАН краска...",
      subtitle: "400 мл",
      price: 1580,
      rating: "4.8",
      reviewsCount: 8,
      image: "spray3"
    }
  ],

  // Выписка по Kaspi Gold (точные записи с видео)
  statement: [
    {
      date: "29 сентября",
      items: [
        {
          id: "tx_1",
          title: "GOOGLE *G1A1P11M",
          category: "Супермаркеты",
          amount: -2490.00,
          currency: "₸",
          time: "19:54",
          card: "Kaspi Gold",
          receiptAvailable: true
        },
        {
          id: "tx_2",
          title: "Сети Маркет",
          category: "Супермаркеты",
          amount: -1000.00,
          currency: "₸",
          time: "14:20",
          card: "Kaspi Gold",
          receiptAvailable: true
        }
      ]
    },
    {
      date: "28 сентября",
      items: [
        {
          id: "tx_3",
          title: "ИП АНВАРОВА ЖАНАТ",
          category: "Супермаркеты",
          amount: -970.00,
          currency: "₸",
          time: "17:15",
          card: "Kaspi Gold",
          receiptAvailable: true
        },
        {
          id: "tx_4",
          title: 'TOO "LKS COMPANY"',
          category: "Супермаркеты",
          amount: -570.00,
          currency: "₸",
          time: "12:10",
          card: "Kaspi Gold",
          receiptAvailable: true
        },
        {
          id: "tx_5",
          title: "NeoLike",
          category: "Кафе и рестораны",
          amount: -430.00,
          currency: "₸",
          time: "10:04",
          card: "Kaspi Gold",
          receiptAvailable: true
        }
      ]
    }
  ],

  // Уведомления и чаты (из видео)
  messages: {
    notifications: [
      {
        id: "notif_gold",
        title: "Kaspi Gold",
        preview: "Покупка: 2 490 ₸, GOOGLE *G1A1P11M...",
        date: "19:54",
        unread: false,
        icon: "gold",
        thread: [
          {
            type: "purchase",
            amount: 570,
            merchant: 'ТОО "LKS COMPANY"',
            balanceAfter: 22284.97,
            time: "12:10",
            date: "28.09.2026"
          },
          {
            type: "purchase",
            amount: 970,
            merchant: "ИП АНВАРОВА ЖАНАТ",
            balanceAfter: 21314.97,
            time: "17:15",
            date: "28.09.2026"
          },
          {
            type: "purchase",
            amount: 1000,
            merchant: "Сети Маркет",
            balanceAfter: 20314.97,
            time: "14:20",
            date: "29.09.2026"
          },
          {
            type: "purchase",
            amount: 2490,
            merchant: "GOOGLE *G1A1P11M",
            balanceAfter: 17824.97,
            time: "19:54",
            date: "29.09.2026"
          }
        ]
      },
      {
        id: "notif_shop",
        title: "Магазин на Kaspi.kz",
        preview: "Уже в продаже на Kaspi.kz! Ответьте одним...",
        date: "19:24",
        unread: true,
        icon: "shop"
      },
      {
        id: "notif_promo",
        title: "Акции",
        preview: "Успейте купить всё нужное для школы...",
        date: "19.09.2026",
        unread: false,
        icon: "gift"
      },
      {
        id: "notif_pay",
        title: "Платежи",
        preview: "Выставлены новые квитанции за коммунальные услуги...",
        date: "12.09.2026",
        unread: false,
        icon: "pay"
      },
      {
        id: "notif_guide",
        title: "Чат с Kaspi Гид",
        preview: "Мы рады ответить на Ваши вопросы",
        date: "",
        unread: false,
        icon: "chat"
      }
    ],
    chats: [
      {
        id: "chat_topnotch",
        title: "TopNotch",
        preview: "TopNotch партерная 20 л, 20 листов...",
        date: "22.09.2026"
      }
    ]
  },

  // Госуслуги (точный список с видео)
  gov: {
    popular: [
      { id: "g1", title: "Выплата по беременности", badge: "NEW" },
      { id: "g2", title: "Прикрепление к медорганизации", badge: null },
      { id: "g3", title: "Проверка прикрепления к медорганизации", badge: "NEW" },
      { id: "g4", title: "Стать самозанятым", badge: null },
      { id: "g5", title: "Прописка", badge: null },
      { id: "g6", title: "Замена водительских прав", badge: null },
      { id: "g7", title: "Штрафы", badge: null }
    ]
  }
};
