import React, { useState } from 'react';
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
  
  // Modal / Subscreen Navigation stack
  const [currentScreen, setCurrentScreen] = useState('tab'); // 'tab' | 'passcode' | 'my_bank' | 'gold_detail' | 'gov' | 'digital_id' | 'transfers' | 'settings' | 'qr_modal'
  const [pendingSecureScreen, setPendingSecureScreen] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
            onOpenDoc={() => setCurrentScreen('digital_id')}
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

      {/* Bottom Navigation (visible on main tabs and inside services) */}
      {(currentScreen === 'tab' || currentScreen === 'my_bank' || currentScreen === 'gov') && (
        <BottomNavBar
          activeTab={activeTab}
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
