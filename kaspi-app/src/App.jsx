import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [userData, setUserData] = useState(initialUserData);
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
    return () => clearTimeout(timer);
  }, []);

  // Modal / Subscreen Navigation stack
  const [currentScreen, setCurrentScreen] = useState('tab'); // 'tab' | 'passcode' | 'my_bank' | 'gold_detail' | 'gov' | 'digital_id' | 'transfers' | 'settings' | 'qr_modal'
  const [pendingSecureScreen, setPendingSecureScreen] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eGov splash shown for ~1.5 s before the ID card screen opens
  const [egovSplash, setEgovSplash] = useState(null); // null | 'in' | 'out'

  // Preload so the splash appears instantly on tap
  useEffect(() => {
    const img = new Image();
    img.src = '/kaspi_assets/egov_splash.png';
  }, []);

  const handleOpenGovDoc = (docId) => {
    if (docId !== 'id_card') {
      setCurrentScreen('digital_id');
      return;
    }
    if (egovSplash) return;
    setEgovSplash('in');
    setTimeout(() => {
      setCurrentScreen('digital_id');
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
      setCurrentScreen('my_bank');
    }
  };

  const handleUnlock = () => {
    setIsAuthenticated(true);
    if (pendingSecureScreen) {
      setCurrentScreen(pendingSecureScreen);
      setPendingSecureScreen(null);
    } else {
      setCurrentScreen('my_bank');
    }
  };

  const handleSelectService = (serviceId) => {
    if (serviceId === 'bank') {
      handleOpenMyBank();
    } else if (serviceId === 'transfers') {
      setCurrentScreen('transfers');
    } else if (serviceId === 'gov') {
      setCurrentScreen('gov');
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
    setUserData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updatedFields
      }
    }));
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

  return (
    <div className="app-viewport">
      {/* Native Safe Area (Uses real OS status bar, no fake web status bar) */}
      <div style={{
        height: 'env(safe-area-inset-top, 0px)',
        backgroundColor: currentScreen === 'gold_detail' ? '#D5AE6C' : '#FFFFFF',
        transition: 'background-color 0.2s ease'
      }} />

      {/* Screen Router */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', minWidth: 0, overflowX: 'hidden' }}>
        {/* Main Tab Bar Views */}
        {currentScreen === 'tab' && (
          <>
            {activeTab === 'home' && (
              <HomeScreen
                userData={userData}
                onOpenSearch={() => {}}
                onOpenQr={() => setCurrentScreen('qr_modal')}
                onOpenService={handleSelectService}
                onOpenMyBank={handleOpenMyBank}
                onOpenGov={() => setCurrentScreen('gov')}
              />
            )}

            {activeTab === 'messages' && (
              <MessagesScreen messages={userData.messages} />
            )}

            {activeTab === 'services' && (
              <ServicesScreen
                profile={userData.profile}
                onOpenSettings={() => setCurrentScreen('settings')}
                onSelectService={handleSelectService}
              />
            )}
          </>
        )}

        {/* Subscreens */}
        {currentScreen === 'my_bank' && (
          <MyBankScreen
            cards={userData.cards}
            onSelectCard={() => setCurrentScreen('gold_detail')}
            onBack={() => setCurrentScreen('tab')}
          />
        )}

        {currentScreen === 'gold_detail' && (
          <KaspiGoldDetailScreen
            card={userData.cards.gold}
            statement={userData.statement}
            onBack={() => setCurrentScreen('my_bank')}
            onOpenQr={() => setCurrentScreen('qr_modal')}
            onOpenTransfer={() => setCurrentScreen('transfers')}
          />
        )}

        {currentScreen === 'gov' && (
          <GovServicesScreen
            govData={userData.gov}
            onOpenDoc={handleOpenGovDoc}
            onBack={() => setCurrentScreen('tab')}
          />
        )}

        {currentScreen === 'digital_id' && (
          <DigitalIdScreen
            profile={userData.profile}
            onBack={() => setCurrentScreen('gov')}
          />
        )}

        {currentScreen === 'transfers' && (
          <TransfersScreen
            card={userData.cards.gold}
            onBack={() => setCurrentScreen('tab')}
            onCompleteTransfer={handleCompleteTransfer}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            profile={userData.profile}
            onUpdateProfile={handleUpdateProfile}
            onBack={() => setCurrentScreen('tab')}
          />
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
          activeTab={currentScreen === 'gov' ? 'services' : activeTab} // Госуслуги lives under «Сервисы»
          onTabChange={handleTabChange}
        />
      )}

      {/* Passcode / Face ID Screen */}
      {currentScreen === 'passcode' && (
        <PasscodeScreen
          profile={userData.profile}
          onUnlock={handleUnlock}
          onBack={() => {
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
