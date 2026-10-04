import React, { useState } from 'react';
import {
  ChevronRight, User, ShoppingBag, Landmark, Wallet, ArrowRightLeft,
  Percent, Luggage, Building2, Megaphone, HelpCircle, MapPin, Award, Briefcase
} from 'lucide-react';

export const ServicesScreen = ({ profile, onOpenSettings, onSelectService }) => {
  const [lang, setLang] = useState('ru'); // 'kz' | 'ru'

  const allServices = [
    { id: 'shop', title: 'Магазин', icon: ShoppingBag },
    { id: 'bank', title: 'Мой Банк', icon: Landmark },
    { id: 'payments', title: 'Платежи', icon: Wallet },
    { id: 'transfers', title: 'Переводы', icon: ArrowRightLeft },
    { id: 'promos', title: 'Акции', icon: Percent },
    { id: 'travel', title: 'Travel', icon: Luggage },
    { id: 'gov', title: 'Госуслуги', icon: Building2 },
    { id: 'ads', title: 'Объявления', icon: Megaphone },
    { id: 'guide', title: 'Гид', icon: HelpCircle },
    { id: 'maps', title: 'Kaspi Maps', icon: MapPin },
    { id: 'certificates', title: 'Сертификаты', icon: Award },
    { id: 'jobs', title: 'Работа', icon: Briefcase }
  ];

  const partnerServices = [
    {
      id: 'magnum',
      title: 'Magnum',
      subtitle: 'Продукты с бесплатной доставкой',
      color: '#F50F64',
      badge: 'M'
    },
    {
      id: 'glovo',
      title: 'Glovo',
      subtitle: 'Сервис доставки еды',
      color: '#FEC436',
      badge: 'G'
    },
    {
      id: 'alipay',
      title: 'Alipay+',
      subtitle: 'Оплата за границей через QR',
      color: '#1677FF',
      badge: 'A'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F2F2F2',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '40px'
    }}>
      {/* Top Profile & Language Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '12px 16px',
        borderBottom: '1px solid #EBEBEB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* User profile button */}
        <div
          onClick={onOpenSettings}
          className="touchable"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#EAEAEA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#757575'
          }}>
            <User size={20} />
          </div>

          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#1F1F1F' }}>
              {profile.shortName}
            </div>
            <div style={{ fontSize: '12px', color: '#757575', display: 'flex', alignItems: 'center' }}>
              <span>Настройки</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        {/* Language Switch: Қаз | Рус */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F2F2F2',
          borderRadius: '16px',
          padding: '2px'
        }}>
          <div
            onClick={() => setLang('kz')}
            className="touchable"
            style={{
              padding: '4px 8px',
              borderRadius: '14px',
              backgroundColor: lang === 'kz' ? '#F14635' : 'transparent',
              color: lang === 'kz' ? '#FFFFFF' : '#757575',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            Қаз
          </div>
          <div
            onClick={() => setLang('ru')}
            className="touchable"
            style={{
              padding: '4px 8px',
              borderRadius: '14px',
              backgroundColor: lang === 'ru' ? '#F14635' : 'transparent',
              color: lang === 'ru' ? '#FFFFFF' : '#757575',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            Рус
          </div>
        </div>
      </div>

      {/* Grid of 12 Services (Red outline icons on white background) */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '16px 8px',
        borderBottom: '1px solid #EBEBEB'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          rowGap: '18px',
          columnGap: '4px'
        }}>
          {allServices.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                onClick={() => onSelectService(s.id)}
                className="touchable"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F14635'
                }}>
                  <Icon size={30} strokeWidth={1.75} />
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#1F1F1F',
                  marginTop: '4px',
                  maxWidth: '75px',
                  lineHeight: '14px'
                }}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Partner Services Section */}
      <div style={{ marginTop: '16px' }}>
        <div style={{
          padding: '0 16px 8px 16px',
          fontSize: '14px',
          fontWeight: '700',
          color: '#1F1F1F'
        }}>
          Партнерские сервисы
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #EBEBEB',
          borderBottom: '1px solid #EBEBEB'
        }}>
          {partnerServices.map((p, idx) => (
            <div
              key={p.id}
              className="touchable"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderTop: idx > 0 ? '1px solid #F4F4F4' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: p.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: '900',
                  fontSize: '16px'
                }}>
                  {p.badge}
                </div>

                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F1F1F' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#757575', marginTop: '2px' }}>
                    {p.subtitle}
                  </div>
                </div>
              </div>

              <ChevronRight size={18} color="#C2C2C2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
