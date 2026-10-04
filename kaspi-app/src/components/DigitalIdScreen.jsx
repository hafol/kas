import React, { useState, useRef } from 'react';
import { ArrowLeft, QrCode, Share2, Copy, Camera, Upload, Trash2, Edit3, X } from 'lucide-react';

export const DigitalIdScreen = ({ profile: initialProfile, onBack }) => {
  const [activeTab, setActiveTab] = useState('doc'); // 'doc' | 'reqs'
  const fileInputRef = useRef(null);

  // User uploaded document photo
  const [photoUrl, setPhotoUrl] = useState(() => {
    return localStorage.getItem('kaspi_custom_doc_photo') || null;
  });

  // Editable document fields (initialized from localStorage or realistic default template)
  const [docData, setDocData] = useState(() => {
    const saved = localStorage.getItem('kaspi_custom_doc_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      lastName: 'СЕРІКОВ',
      firstName: 'ДАНИЯР',
      middleName: 'ЕРЖАНҰЛЫ',
      birthDate: '15.05.1998',
      gender: 'Е',
      iin: '980515301245',
      docNumber: '051492817',
      issueDate: '12.06.2023',
      expiryDate: '11.06.2033',
      issuedBy: 'ҚР ІІМ'
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(docData);
  const [copiedKey, setCopiedKey] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setPhotoUrl(result);
        localStorage.setItem('kaspi_custom_doc_photo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    setPhotoUrl(null);
    localStorage.removeItem('kaspi_custom_doc_photo');
  };

  const handleSaveDocData = () => {
    setDocData(editForm);
    localStorage.setItem('kaspi_custom_doc_data', JSON.stringify(editForm));
    setIsEditing(false);
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F5F7',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '30px'
    }}>
      {/* Hidden file input for photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handlePhotoUpload}
      />

      {/* 1. Header (Exact from user video frame_030.png) */}
      <div style={{
        height: '48px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EBEBEB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div onClick={onBack} className="touchable" style={{ padding: '6px', cursor: 'pointer' }}>
          <ArrowLeft size={22} color="#1F1F1F" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '17px', fontWeight: '700', color: '#1F1F1F' }}>
            Удостоверение личности
          </span>
        </div>
        <div
          onClick={() => {
            setEditForm(docData);
            setIsEditing(!isEditing);
          }}
          className="touchable"
          style={{ padding: '6px', cursor: 'pointer', color: '#276EE9', display: 'flex', alignItems: 'center' }}
          title="Редактировать данные"
        >
          <Edit3 size={19} color="#276EE9" />
        </div>
      </div>

      {/* Edit Drawer / Form Modal */}
      {isEditing && (
        <div style={{
          backgroundColor: '#FFFFFF',
          margin: '12px 16px 0 16px',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #276EE9',
          boxShadow: '0 4px 12px rgba(39, 110, 233, 0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1F1F1F' }}>
              Редактирование документа
            </span>
            <div onClick={() => setIsEditing(false)} style={{ cursor: 'pointer' }}>
              <X size={18} color="#757575" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ fontSize: '10px', color: '#757575' }}>Фамилия</label>
              <input
                value={editForm.lastName}
                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value.toUpperCase() })}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E0E0E0', fontSize: '12px', fontWeight: '700' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#757575' }}>Имя</label>
              <input
                value={editForm.firstName}
                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value.toUpperCase() })}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E0E0E0', fontSize: '12px', fontWeight: '700' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#757575' }}>Отчество</label>
              <input
                value={editForm.middleName}
                onChange={(e) => setEditForm({ ...editForm, middleName: e.target.value.toUpperCase() })}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E0E0E0', fontSize: '12px', fontWeight: '700' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#757575' }}>Дата рождения</label>
              <input
                value={editForm.birthDate}
                onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E0E0E0', fontSize: '12px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#757575' }}>ИИН (12 цифр)</label>
              <input
                value={editForm.iin}
                onChange={(e) => setEditForm({ ...editForm, iin: e.target.value })}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E0E0E0', fontSize: '12px', fontWeight: '700' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#757575' }}>№ документа</label>
              <input
                value={editForm.docNumber}
                onChange={(e) => setEditForm({ ...editForm, docNumber: e.target.value })}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E0E0E0', fontSize: '12px', fontWeight: '700' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#757575' }}>Дата выдачи</label>
              <input
                value={editForm.issueDate}
                onChange={(e) => setEditForm({ ...editForm, issueDate: e.target.value })}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E0E0E0', fontSize: '12px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '10px', color: '#757575' }}>Срок действия</label>
              <input
                value={editForm.expiryDate}
                onChange={(e) => setEditForm({ ...editForm, expiryDate: e.target.value })}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E0E0E0', fontSize: '12px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button
              onClick={handleSaveDocData}
              className="touchable"
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: '#276EE9',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Сохранить изменения
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="touchable"
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#F2F2F2',
                color: '#1F1F1F',
                border: 'none',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* 2. Segmented Pill Tab Bar */}
      <div style={{ padding: '12px 16px 8px 16px' }}>
        <div style={{
          backgroundColor: '#EBEBEB',
          borderRadius: '9px',
          padding: '2px',
          display: 'flex',
          height: '34px'
        }}>
          <div
            onClick={() => setActiveTab('doc')}
            className="touchable"
            style={{
              flex: 1,
              backgroundColor: activeTab === 'doc' ? '#FFFFFF' : 'transparent',
              borderRadius: '7px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: activeTab === 'doc' ? '700' : '500',
              color: '#1F1F1F',
              boxShadow: activeTab === 'doc' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              cursor: 'pointer'
            }}
          >
            Документ
          </div>

          <div
            onClick={() => setActiveTab('reqs')}
            className="touchable"
            style={{
              flex: 1,
              backgroundColor: activeTab === 'reqs' ? '#FFFFFF' : 'transparent',
              borderRadius: '7px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: activeTab === 'reqs' ? '700' : '500',
              color: '#1F1F1F',
              boxShadow: activeTab === 'reqs' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              cursor: 'pointer'
            }}
          >
            Реквизиты
          </div>
        </div>
      </div>

      {/* 3. Content */}
      {activeTab === 'doc' ? (
        <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Card 1: FRONT (Exact reproduction of Kazakhstan Republic ID from frame_030.png) */}
          <div style={{
            backgroundColor: '#FCFCF8',
            borderRadius: '12px',
            border: '1px solid #DCE6EA',
            padding: '12px 14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            position: 'relative',
            background: 'linear-gradient(135deg, #F8FDFF 0%, #FFFDEE 100%)'
          }}>
            {/* Header with Emblem */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
              borderBottom: '1px solid rgba(0, 150, 180, 0.15)',
              paddingBottom: '6px'
            }}>
              <div style={{ fontSize: '8px', fontWeight: '700', color: '#007A8A', letterSpacing: '0.2px' }}>
                ҚАЗАҚСТАН РЕСПУБЛИКАСЫ<br />
                <span style={{ fontSize: '7.5px', color: '#558899' }}>РЕСПУБЛИКА КАЗАХСТАН</span>
              </div>

              {/* Kazakhstan Emblem SVG */}
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#00A8B5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid #FFD700'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700">
                  <circle cx="12" cy="12" r="9" stroke="#FFD700" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="12" r="3" fill="#FFD700" />
                  <path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="#FFD700" strokeWidth="1.5" />
                </svg>
              </div>

              <div style={{ fontSize: '8px', fontWeight: '700', color: '#007A8A', textAlign: 'right' }}>
                ЖЕКЕ КУӘЛІК<br />
                <span style={{ fontSize: '7.5px', color: '#558899' }}>УДОСТОВЕРЕНИЕ ЛИЧНОСТИ</span>
              </div>
            </div>

            {/* Photo & Details row */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Photo Box: Interactive User Photo Upload */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="touchable"
                style={{
                  width: '92px',
                  height: '118px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: photoUrl ? '1px solid #CADBE0' : '2px dashed #00A8B5',
                  backgroundColor: '#F0F8FA',
                  flexShrink: 0,
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Нажмите, чтобы загрузить фото"
              >
                {photoUrl ? (
                  <>
                    <img
                      src={photoUrl}
                      alt="Фото документа"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    {/* Small action chips over photo */}
                    <div
                      onClick={handleRemovePhoto}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        backgroundColor: 'rgba(0,0,0,0.65)',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Удалить фото"
                    >
                      <Trash2 size={12} color="#FFFFFF" />
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: '#FFFFFF',
                      fontSize: '8px',
                      textAlign: 'center',
                      padding: '2px 0'
                    }}>
                      Сменить
                    </div>
                  </>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '8px'
                  }}>
                    <Camera size={26} color="#00A8B5" strokeWidth={1.8} />
                    <span style={{ fontSize: '8.5px', fontWeight: '700', color: '#00838F', marginTop: '6px', lineHeight: '10px' }}>
                      Загрузить<br />фото
                    </span>
                    <span style={{ fontSize: '7px', color: '#757575', marginTop: '2px' }}>
                      Нажмите сюда
                    </span>
                  </div>
                )}
              </div>

              {/* Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                <div>
                  <div style={{ color: '#00838F', fontSize: '7.5px', fontWeight: '600' }}>ТЕГІ / ФАМИЛИЯ</div>
                  <div style={{ fontWeight: '800', color: '#1A1A1A', fontSize: '13px', lineHeight: '15px' }}>
                    {docData.lastName}
                  </div>
                </div>

                <div>
                  <div style={{ color: '#00838F', fontSize: '7.5px', fontWeight: '600' }}>АТЫ / ИМЯ</div>
                  <div style={{ fontWeight: '800', color: '#1A1A1A', fontSize: '13px', lineHeight: '15px' }}>
                    {docData.firstName}
                  </div>
                </div>

                <div>
                  <div style={{ color: '#00838F', fontSize: '7.5px', fontWeight: '600' }}>ӘКЕСІНІҢ АТЫ / ОТЧЕСТВО</div>
                  <div style={{ fontWeight: '700', color: '#1A1A1A', fontSize: '11px', lineHeight: '13px' }}>
                    {docData.middleName}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '2px' }}>
                  <div>
                    <div style={{ color: '#00838F', fontSize: '7.5px', fontWeight: '600' }}>ТУҒАН КҮНІ / ДАТА РОЖД.</div>
                    <div style={{ fontWeight: '700', color: '#1A1A1A', fontSize: '11px' }}>
                      {docData.birthDate}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#00838F', fontSize: '7.5px', fontWeight: '600' }}>ПОЛ</div>
                    <div style={{ fontWeight: '700', color: '#1A1A1A', fontSize: '11px' }}>
                      {docData.gender}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2px' }}>
                  <div style={{ color: '#00838F', fontSize: '7.5px', fontWeight: '600' }}>ЖСН / ИИН</div>
                  <div style={{ fontWeight: '800', color: '#1A1A1A', fontSize: '12px', letterSpacing: '0.5px' }}>
                    {docData.iin}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: BACK (Barcode, Chip, Validity, MRZ code from frame_030.png) */}
          <div style={{
            backgroundColor: '#FCFCF8',
            borderRadius: '12px',
            border: '1px solid #DCE6EA',
            padding: '12px 14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            background: 'linear-gradient(135deg, #F8FDFF 0%, #FFFDEE 100%)'
          }}>
            {/* Top Barcode & Doc Number */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              {/* Barcode graphic */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5px', height: '18px' }}>
                {[3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2].map((w, i) => (
                  <div key={i} style={{ width: `${w}px`, height: '18px', backgroundColor: '#1A1A1A' }} />
                ))}
              </div>

              {/* Kazakhstan Flag Emblem */}
              <div style={{
                width: '28px',
                height: '16px',
                backgroundColor: '#00A8B5',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFD700' }} />
              </div>

              {/* Document Number */}
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#1A1A1A', letterSpacing: '0.5px' }}>
                {docData.docNumber}
              </div>
            </div>

            {/* Chip & Details */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '10px' }}>
              {/* Gold Chip */}
              <div style={{
                width: '42px',
                height: '32px',
                borderRadius: '4px',
                backgroundColor: '#E5B942',
                border: '1px solid #C49726',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                padding: '3px'
              }}>
                <div style={{ borderBottom: '1px solid #A87D17' }} />
                <div style={{ borderBottom: '1px solid #A87D17' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '9px' }}>
                <div style={{ color: '#00838F', fontWeight: '700' }}>ҚАЗАҚСТАН / КАЗАХСТАН</div>
                <div style={{ color: '#1A1A1A', fontWeight: '600' }}>
                  {docData.issueDate} - {docData.expiryDate}
                </div>
                <div style={{ color: '#555555' }}>ОРГАН ВЫДАЧИ: {docData.issuedBy}</div>
              </div>
            </div>

            {/* MRZ Machine Readable Zone */}
            <div style={{
              fontFamily: 'Consolas, monospace',
              fontSize: '8.5px',
              color: '#333333',
              letterSpacing: '0.8px',
              lineHeight: '12px',
              borderTop: '1px dashed #CADBE0',
              paddingTop: '6px'
            }}>
              &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
              {docData.lastName}&lt;&lt;{docData.firstName}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
              {docData.iin}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
            </div>
          </div>

          {/* Quick Upload Button Bar */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="touchable"
              style={{
                flex: 1,
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#F2F2F2',
                border: '1px solid #E0E0E0',
                color: '#1F1F1F',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Upload size={16} color="#00A8B5" />
              {photoUrl ? 'Заменить фото документа' : 'Загрузить фото документа'}
            </button>
            {photoUrl && (
              <button
                onClick={handleRemovePhoto}
                className="touchable"
                style={{
                  height: '40px',
                  padding: '0 14px',
                  borderRadius: '8px',
                  backgroundColor: '#FFF1F0',
                  border: '1px solid #FFCCC7',
                  color: '#F14635',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={16} color="#F14635" />
              </button>
            )}
          </div>

          {/* Bottom Action Buttons (Exact colors from user video frame_030.png) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
            {/* Blue Button: Предъявить документ */}
            <button
              className="touchable"
              style={{
                height: '48px',
                borderRadius: '10px',
                backgroundColor: '#276EE9',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 3px 10px rgba(39, 110, 233, 0.3)',
                cursor: 'pointer'
              }}
            >
              <QrCode size={19} color="#FFFFFF" />
              Предъявить документ
            </button>

            {/* White Button: Отправить документ */}
            <button
              className="touchable"
              style={{
                height: '48px',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #276EE9',
                color: '#276EE9',
                fontSize: '15px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              <Share2 size={19} color="#276EE9" />
              Отправить документ
            </button>
          </div>
        </div>
      ) : (
        /* Tab 2: Реквизиты */
        <div style={{
          backgroundColor: '#FFFFFF',
          margin: '12px 16px',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {[
            { label: 'ИИН', value: docData.iin, key: 'iin' },
            { label: 'ФИО', value: `${docData.lastName} ${docData.firstName} ${docData.middleName}`.trim(), key: 'fio' },
            { label: 'Номер документа', value: docData.docNumber, key: 'docNum' },
            { label: 'Дата выдачи', value: docData.issueDate, key: 'issue' },
            { label: 'Срок действия', value: docData.expiryDate, key: 'expiry' },
            { label: 'Орган выдачи', value: docData.issuedBy, key: 'issuer' }
          ].map((item, idx) => (
            <div key={item.label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: idx < 5 ? '1px solid #F4F4F4' : 'none',
              paddingBottom: '10px'
            }}>
              <div>
                <div style={{ fontSize: '12px', color: '#757575' }}>{item.label}</div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F', marginTop: '2px' }}>
                  {item.value}
                </div>
              </div>
              <div
                onClick={() => handleCopy(item.value, item.key)}
                className="touchable"
                style={{
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: copiedKey === item.key ? '#00838F' : '#276EE9'
                }}
              >
                {copiedKey === item.key ? (
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#00838F' }}>Скопировано</span>
                ) : (
                  <Copy size={16} color="#276EE9" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
