import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, User, Camera } from 'lucide-react';

export const SettingsScreen = ({ profile, onUpdateProfile, onBack }) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [customSound, setCustomSound] = useState(true);
  const [kaspiAbailanyz, setKaspiAbailanyz] = useState(true);
  const [faceId, setFaceId] = useState(profile.faceIdEnabled);

  // Edit profile modal state
  const [isEditingData, setIsEditingData] = useState(false);
  const [editShortName, setEditShortName] = useState(profile.shortName);
  const [editFullName, setEditFullName] = useState(profile.fullName);
  const [editIin, setEditIin] = useState(profile.iin);

  const handleSaveProfile = () => {
    onUpdateProfile({
      shortName: editShortName,
      fullName: editFullName,
      iin: editIin
    });
    setIsEditingData(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F2F2F2',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '40px'
    }}>
      {/* Top Header */}
      <div style={{
        height: '48px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EBEBEB',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px'
      }}>
        <div onClick={onBack} className="touchable" style={{ padding: '6px' }}>
          <ArrowLeft size={22} color="#1F1F1F" />
        </div>
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F1F1F' }}>
          Настройки
        </span>
      </div>

      {/* User Avatar with "Добавить фото" */}
      <div style={{
        backgroundColor: '#2A2A2A',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FFFFFF'
      }}>
        <div style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          backgroundColor: '#3D3D3D',
          border: '2px solid #555555',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '10px'
        }}>
          <User size={40} color="#AAAAAA" />
        </div>

        <div style={{ fontSize: '17px', fontWeight: '700' }}>
          {profile.shortName}
        </div>

        <div
          onClick={() => setIsEditingData(true)}
          className="touchable"
          style={{
            fontSize: '13px',
            color: '#0089D0',
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Camera size={14} />
          <span>Редактировать данные</span>
        </div>
      </div>

      {/* Section: Основное */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ padding: '0 16px 6px 16px', fontSize: '12px', color: '#757575', fontWeight: '600' }}>
          ОСНОВНОЕ
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB' }}>
          {/* Пуш-уведомления */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            borderBottom: '1px solid #F4F4F4'
          }}>
            <span style={{ fontSize: '15px', color: '#1F1F1F' }}>Пуш-уведомления</span>
            <input
              type="checkbox"
              checked={pushEnabled}
              onChange={() => setPushEnabled(!pushEnabled)}
              style={{ width: '20px', height: '20px', accentColor: '#F14635' }}
            />
          </div>

          {/* Другой звук пополнений */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            borderBottom: '1px solid #F4F4F4'
          }}>
            <span style={{ fontSize: '15px', color: '#1F1F1F' }}>Другой звук пополнений и подарков</span>
            <input
              type="checkbox"
              checked={customSound}
              onChange={() => setCustomSound(!customSound)}
              style={{ width: '20px', height: '20px', accentColor: '#F14635' }}
            />
          </div>

          {/* Язык приложения */}
          <div className="touchable" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px'
          }}>
            <span style={{ fontSize: '15px', color: '#1F1F1F' }}>Язык приложения</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#757575', fontSize: '14px' }}>
              <span>Русский</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Section: Безопасность */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ padding: '0 16px 6px 16px', fontSize: '12px', color: '#757575', fontWeight: '600' }}>
          БЕЗОПАСНОСТЬ
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '15px', color: '#1F1F1F', fontWeight: '500' }}>Kaspi Абайлаңыз</span>
                <span style={{
                  backgroundColor: '#F14635',
                  color: '#FFFFFF',
                  fontSize: '9px',
                  fontWeight: '700',
                  padding: '1px 5px',
                  borderRadius: '4px'
                }}>
                  NEW
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#757575', marginTop: '2px' }}>
                Защита от мошенников при звонках
              </div>
            </div>

            <input
              type="checkbox"
              checked={kaspiAbailanyz}
              onChange={() => setKaspiAbailanyz(!kaspiAbailanyz)}
              style={{ width: '20px', height: '20px', accentColor: '#F14635' }}
            />
          </div>
        </div>
      </div>

      {/* Section: Вход в приложение */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ padding: '0 16px 6px 16px', fontSize: '12px', color: '#757575', fontWeight: '600' }}>
          ВХОД В ПРИЛОЖЕНИЕ
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB' }}>
          <div className="touchable" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            borderBottom: '1px solid #F4F4F4'
          }}>
            <span style={{ fontSize: '15px', color: '#1F1F1F' }}>Изменить код доступа</span>
            <ChevronRight size={16} color="#C2C2C2" />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px'
          }}>
            <span style={{ fontSize: '15px', color: '#1F1F1F' }}>Вход с Face ID</span>
            <input
              type="checkbox"
              checked={faceId}
              onChange={() => setFaceId(!faceId)}
              style={{ width: '20px', height: '20px', accentColor: '#F14635' }}
            />
          </div>
        </div>
      </div>

      {/* Edit Data Modal */}
      {isEditingData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '380px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '17px', fontWeight: '700', marginBottom: '14px' }}>
              Редактирование данных
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#757575' }}>Короткое имя</label>
                <input
                  type="text"
                  value={editShortName}
                  onChange={(e) => setEditShortName(e.target.value)}
                  style={{ width: '100%', height: '38px', borderRadius: '6px', border: '1px solid #CCC', padding: '0 10px', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#757575' }}>Полное имя (ФИО)</label>
                <input
                  type="text"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  style={{ width: '100%', height: '38px', borderRadius: '6px', border: '1px solid #CCC', padding: '0 10px', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#757575' }}>ИИН</label>
                <input
                  type="text"
                  value={editIin}
                  onChange={(e) => setEditIin(e.target.value)}
                  style={{ width: '100%', height: '38px', borderRadius: '6px', border: '1px solid #CCC', padding: '0 10px', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => setIsEditingData(false)}
                  style={{ flex: 1, height: '40px', borderRadius: '8px', border: '1px solid #CCC', backgroundColor: '#FFF', fontWeight: '600' }}
                >
                  Отмена
                </button>
                <button
                  onClick={handleSaveProfile}
                  style={{ flex: 1, height: '40px', borderRadius: '8px', border: 'none', backgroundColor: '#F14635', color: '#FFF', fontWeight: '700' }}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
