import React, { useState, useEffect, useRef, useCallback } from 'react';
import { initialUserData } from './data/userData';
import { HomeScreen } from './components/HomeScreen';
import { BottomNavBar } from './components/BottomNavBar';
import { PasscodeScreen } from './components/PasscodeScreen';
import { MyBankScreen } from './components/MyBankScreen';
import { KaspiGoldDetailScreen } from './components/KaspiGoldDetailScreen';
import { GovServicesScreen } from './components/GovServicesScreen';
import { DigitalIdScreen } from './components/DigitalIdScreen';
import { TransfersScreen } from './components/TransfersScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { KaspiQrScreen } from './components/KaspiQrScreen';
import {
  GovServicesSkeleton,
  MyBankSkeleton,
  TransfersSkeleton,
  GenericPageSkeleton
} from './components/KaspiSkeleton';

export default function App() {
  const [userData, setUserData] = useState(() => {
    try {
      const savedProfile = localStorage.getItem('kaspi_user_profile');
      const savedBalance = localStorage.getItem('kaspi_gold_balance');
      let data = { ...initialUserData };
      if (savedProfile) {
        data.profile = {
          ...data.profile,
          ...JSON.parse(savedProfile)
        };
      }
      if (savedBalance !== null && savedBalance !== '') {
        const num = parseFloat(savedBalance.replace(/\s+/g, '').replace(',', '.'));
        data.cards = {
          ...data.cards,
          gold: {
            ...data.cards.gold,
            balance: isNaN(num) ? savedBalance : num
          }
        };
      }
      return data;
    } catch (e) {}
    return initialUserData;
  });

  // Listen for balance updates from Kaspi Gold detail screen
  useEffect(() => {
    const handleBalanceUpdate = (e) => {
      const newBal = e.detail;
      setUserData(prev => ({
        ...prev,
        cards: {
          ...prev.cards,
          gold: {
            ...prev.cards.gold,
            balance: newBal
          }
        }
      }));
    };
    window.addEventListener('kaspi_balance_updated', handleBalanceUpdate);
    return () => window.removeEventListener('kaspi_balance_updated', handleBalanceUpdate);
  }, []);

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'qr' | 'messages' | 'services'
  
  // Smoothly dismiss the instant native Kaspi splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      const splash = document.getElementById('kaspi-splash');
      if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), 400);
      }
    }, 700);
  }, []);

  // Modal / Subscreen Navigation stack
  const [currentScreen, setCurrentScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('screen') === 'passcode' || window.location.hash === '#passcode') {
        return 'passcode';
      }
      if (params.get('screen') === 'gov' || window.location.hash === '#gov') {
        return 'gov';
      }
      if (params.get('screen') === 'digital_id' || window.location.hash === '#digital_id') {
        return 'digital_id';
      }
      if (params.get('screen') === 'gold_detail' || window.location.hash === '#gold_detail') {
        return 'gold_detail';
      }
      if (params.get('screen') === 'my_bank' || window.location.hash === '#my_bank') {
        return 'my_bank';
      }
    }
    return 'tab';
  });
  const [pendingSecureScreen, setPendingSecureScreen] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(null);
  // eGov splash shown for ~1.5 s before the ID card screen opens
  const [egovSplash, setEgovSplash] = useState(null); // null | 'in' | 'out'

  // Preload so the splash appears instantly on tap
  useEffect(() => {
    const img = new Image();
    img.src = '/kaspi_assets/egov_splash.png';
  }, []);

  // Screen hierarchy for parent navigation
  const PARENT_MAP = {
    digital_id: 'gov',
    gold_detail: 'my_bank',
    gov: 'tab',
    my_bank: 'tab',
    transfers: 'tab',
    settings: 'tab'
  };

  // Dynamic status bar theme-color and document background for native iOS & Android transparency
  useEffect(() => {
    const isGold = currentScreen === 'gold_detail';
    const targetColor = isGold ? '#D4AE6D' : '#FFFFFF';
    
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', targetColor);
    }
    
    // Set document background color so iOS overscroll and notch bleed seamlessly
    document.documentElement.style.backgroundColor = targetColor;
    document.body.style.backgroundColor = targetColor;
    
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.style.backgroundColor = targetColor;
    }
  }, [currentScreen]);

  // Closing screen state for slide-out animation (left to right)
  const [closingScreen, setClosingScreen] = useState(null);

  // Interactive edge swipe state (iOS style swipe-back)
  const [swipeOffset, setSwipeOffset] = useState(null);
  const [isSwipeClosing, setIsSwipeClosing] = useState(false);
  const edgeSwipeStartRef = useRef(null);
  const isEdgeSwipingRef = useRef(false);

  // Navigate to screen with Kaspi UI skeleton loading and slide-in from right
  const navigateToScreen = (screenName) => {
    if (closingScreen) return;
    setLoadingScreen(screenName);
    setCurrentScreen(screenName);
    setTimeout(() => {
      setLoadingScreen(null);
    }, 320);
  };

  // Navigate back with smooth slide out from left to right (295ms, 5% slower)
  const navigateBack = (targetScreen = null) => {
    if (closingScreen) return;
    const fromScreen = currentScreen;
    const dest = targetScreen || PARENT_MAP[fromScreen] || 'tab';
    setClosingScreen(fromScreen);
    setCurrentScreen(dest);
    setTimeout(() => {
      setClosingScreen(null);
      setSwipeOffset(null);
      setIsSwipeClosing(false);
    }, 295);
  };

  // Edge-swipe touch listeners (place finger at left edge and slide right to close)
  const handleEdgeTouchStart = (e) => {
    if (closingScreen) return;
    const touch = e.touches[0];
    if (touch.clientX <= 36) {
      edgeSwipeStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };
      isEdgeSwipingRef.current = true;
    } else {
      isEdgeSwipingRef.current = false;
    }
  };

  const handleEdgeTouchMove = (e) => {
    if (!isEdgeSwipingRef.current || closingScreen) return;
    const touch = e.touches[0];
    const dx = touch.clientX - edgeSwipeStartRef.current.x;
    const dy = touch.clientY - edgeSwipeStartRef.current.y;

    if (Math.abs(dy) > Math.abs(dx) && dx < 12) {
      isEdgeSwipingRef.current = false;
      setSwipeOffset(null);
      return;
    }

    if (dx > 0) {
      if (e.cancelable) e.preventDefault();
      setSwipeOffset(dx);
    }
  };

  const handleEdgeTouchEnd = () => {
    if (!isEdgeSwipingRef.current || closingScreen) return;
    isEdgeSwipingRef.current = false;
    const currentOffset = swipeOffset || 0;
    const dt = Math.max(1, Date.now() - (edgeSwipeStartRef.current?.time || Date.now()));
    const velocity = currentOffset / dt;

    if (currentOffset > 75 || velocity > 0.35) {
      setIsSwipeClosing(true);
      navigateBack();
    } else if (currentOffset > 0) {
      setSwipeOffset(0);
      setTimeout(() => {
        setSwipeOffset(null);
      }, 295);
    } else {
      setSwipeOffset(null);
    }
  };

  const handleOpenGovDoc = (docId) => {
    if (docId !== 'id_card') {
      navigateToScreen('digital_id');
      return;
    }
    if (egovSplash) return;
    setEgovSplash('in');
    setTimeout(() => {
      navigateToScreen('digital_id');
      setEgovSplash('out');
    }, 1500);
    setTimeout(() => setEgovSplash(null), 1750);
  };

  // Navigation handlers
  const handleOpenMyBank = () => {
    if (!isAuthenticated) {
      setPendingSecureScreen('my_bank');
      setCurrentScreen('passcode');
    } else {
      navigateToScreen('my_bank');
    }
  };

  const handleOpenGov = () => {
    if (!isAuthenticated) {
      setPendingSecureScreen('gov');
      setCurrentScreen('passcode');
    } else {
      navigateToScreen('gov');
    }
  };

  const handleUnlock = () => {
    setIsAuthenticated(true);
    const target = pendingSecureScreen || 'my_bank';
    setPendingSecureScreen(null);
    navigateToScreen(target);
  };

  const handleSelectService = (serviceId) => {
    if (serviceId === 'bank') {
      handleOpenMyBank();
    } else if (serviceId === 'transfers') {
      navigateToScreen('transfers');
    } else if (serviceId === 'gov') {
      handleOpenGov();
    } else if (serviceId === 'shop') {
      // Stay on home/services or show shop
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'qr') {
      setCurrentScreen('qr_modal');
    } else {
      setCurrentScreen('tab');
    }
  };

  const handleUpdateProfile = (updatedFields) => {
    setUserData(prev => {
      const nextProfile = {
        ...prev.profile,
        ...updatedFields
      };
      try {
        localStorage.setItem('kaspi_user_profile', JSON.stringify(nextProfile));
      } catch (err) {}
      return {
        ...prev,
        profile: nextProfile
      };
    });
  };

  const handleCompleteTransfer = (newTx) => {
    setUserData(prev => {
      const newBal = prev.cards.gold.balance + newTx.amount;
      return {
        ...prev,
        cards: {
          ...prev.cards,
          gold: {
            ...prev.cards.gold,
            balance: newBal
          }
        },
        statement: [
          {
            date: 'Сегодня',
            items: [newTx]
          },
          ...prev.statement
        ]
      };
    });
  };

  // Content renderer for all screens
  const renderScreenContent = (screenName, isUnderneath = false) => {
    switch (screenName) {
      case 'tab':
        return (
          <>
            {activeTab === 'home' && (
              <HomeScreen
                userData={userData}
                onOpenSearch={() => {}}
                onOpenQr={() => setCurrentScreen('qr_modal')}
                onOpenService={handleSelectService}
                onOpenMyBank={handleOpenMyBank}
                onOpenGov={handleOpenGov}
              />
            )}
            {activeTab === 'messages' && (
              <MessagesScreen messages={userData.messages} />
            )}
            {activeTab === 'services' && (
              <ServicesScreen
                profile={userData.profile}
                onOpenSettings={() => navigateToScreen('settings')}
                onSelectService={handleSelectService}
              />
            )}
          </>
        );

      case 'my_bank':
        return loadingScreen === 'my_bank' && !isUnderneath ? (
          <MyBankSkeleton />
        ) : (
          <MyBankScreen
            cards={userData.cards}
            onSelectCard={() => navigateToScreen('gold_detail')}
            onBack={() => navigateBack('tab')}
          />
        );

      case 'gold_detail':
        return loadingScreen === 'gold_detail' && !isUnderneath ? (
          <MyBankSkeleton />
        ) : (
          <KaspiGoldDetailScreen
            card={userData.cards.gold}
            statement={userData.statement}
            onBack={() => navigateBack('my_bank')}
            onOpenQr={() => setCurrentScreen('qr_modal')}
            onOpenTransfer={() => navigateToScreen('transfers')}
            onUpdateBalance={(newBal) => {
              setUserData(prev => ({
                ...prev,
                cards: {
                  ...prev.cards,
                  gold: {
                    ...prev.cards.gold,
                    balance: newBal
                  }
                }
              }));
            }}
          />
        );

      case 'gov':
        return loadingScreen === 'gov' && !isUnderneath ? (
          <GovServicesSkeleton />
        ) : (
          <GovServicesScreen
            govData={userData.gov}
            onOpenDoc={handleOpenGovDoc}
            onBack={() => navigateBack('tab')}
          />
        );

      case 'digital_id':
        return (
          <DigitalIdScreen
            profile={userData.profile}
            onBack={() => navigateBack('gov')}
          />
        );

      case 'transfers':
        return loadingScreen === 'transfers' && !isUnderneath ? (
          <TransfersSkeleton />
        ) : (
          <TransfersScreen
            card={userData.cards.gold}
            onBack={() => navigateBack('tab')}
            onCompleteTransfer={handleCompleteTransfer}
          />
        );

      case 'settings':
        return loadingScreen === 'settings' && !isUnderneath ? (
          <GenericPageSkeleton title="Настройки" />
        ) : (
          <SettingsScreen
            profile={userData.profile}
            onUpdateProfile={handleUpdateProfile}
            onBack={() => navigateBack('tab')}
          />
        );

      default:
        return null;
    }
  };

  // Screen that should be visible underneath during subscreen transitions or edge swipe
  const underneathScreen = closingScreen
    ? (closingScreen === currentScreen ? PARENT_MAP[closingScreen] : currentScreen)
    : (currentScreen !== 'tab' && currentScreen !== 'passcode' && currentScreen !== 'qr_modal'
        ? PARENT_MAP[currentScreen] || 'tab'
        : null);

  const isSubscreenActive = currentScreen !== 'tab' && currentScreen !== 'passcode' && currentScreen !== 'qr_modal';

  return (
    <div
      className={`app-viewport${currentScreen === 'passcode' ? ' app-viewport--lock' : ''}`}
      style={{
        backgroundColor: currentScreen === 'gold_detail' ? '#D4AE6D' : '#FFFFFF'
      }}
    >
      {/* Screen Router */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', minWidth: 0, overflowX: 'hidden', position: 'relative' }}>
        
        {/* Layer 1: Screen rendered underneath during transitions or edge swipe */}
        {underneathScreen && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              backgroundColor: '#F8F8F9',
              pointerEvents: isSubscreenActive ? 'none' : 'auto'
            }}
          >
            {renderScreenContent(underneathScreen, true)}
          </div>
        )}

        {/* Layer 2: Main Tab View if tab screen is current and not covered */}
        {currentScreen === 'tab' && !closingScreen && (
          renderScreenContent('tab')
        )}

        {/* Layer 3: Active Subscreen with entrance slide and interactive edge swipe */}
        {isSubscreenActive && (
          <div
            className={swipeOffset === null ? 'page-slide-in' : ''}
            onTouchStart={handleEdgeTouchStart}
            onTouchMove={handleEdgeTouchMove}
            onTouchEnd={handleEdgeTouchEnd}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 10,
              backgroundColor: currentScreen === 'gold_detail' ? '#D5AE6B' : '#F8F8F9',
              overflowY: currentScreen === 'digital_id' ? 'hidden' : 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              transform: swipeOffset !== null
                ? `translate3d(${isSwipeClosing ? '100%' : `${swipeOffset}px`}, 0, 0)`
                : undefined,
              transition: isSwipeClosing
                ? 'transform 295ms cubic-bezier(0.22, 1, 0.36, 1)'
                : swipeOffset === 0
                ? 'transform 295ms cubic-bezier(0.22, 1, 0.36, 1)'
                : undefined,
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.12)'
            }}
          >
            {renderScreenContent(currentScreen)}
          </div>
        )}

        {/* Layer 4: Closing Subscreen (slides from left to right when closed) */}
        {closingScreen && closingScreen !== currentScreen && (
          <div
            className="page-slide-out"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 20,
              backgroundColor: closingScreen === 'gold_detail' ? '#D5AE6B' : '#F8F8F9',
              overflowY: 'hidden',
              overflowX: 'hidden',
              pointerEvents: 'none',
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.12)'
            }}
          >
            {renderScreenContent(closingScreen, true)}
          </div>
        )}
      </div>

      {/* eGov splash (Удостоверение личности) */}
      {egovSplash && (
        <div
          className={`egov-splash${egovSplash === 'out' ? ' egov-splash--out' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <img src="/kaspi_assets/egov_splash.png" alt="" draggable={false} />
        </div>
      )}

      {/* Bottom Navigation (visible on main tabs and inside services) */}
      {(currentScreen === 'tab' || currentScreen === 'my_bank' || currentScreen === 'gov') && (
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}

      {/* Passcode / Lock Screen */}
      {currentScreen === 'passcode' && (
        <PasscodeScreen
          profile={userData.profile}
          onUpdateProfile={handleUpdateProfile}
          onUnlock={handleUnlock}
          onBack={() => {
            setPendingSecureScreen(null);
            setCurrentScreen('tab');
          }}
          onLogout={() => {
            setIsAuthenticated(false);
            setPendingSecureScreen(null);
            setCurrentScreen('tab');
          }}
        />
      )}

      {/* Kaspi QR Camera Screen */}
      {currentScreen === 'qr_modal' && (
        <KaspiQrScreen
          onClose={() => {
            setCurrentScreen('tab');
            setActiveTab('home');
          }}
        />
      )}
    </div>
  );
}
