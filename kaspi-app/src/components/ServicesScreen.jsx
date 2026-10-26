import React, { useState } from 'react';
import { ChevronRight, User } from 'lucide-react';
import {
  ServiceShopIcon,
  ServiceMyBankIcon,
  ServicePaymentsIcon,
  ServiceTransfersIcon,
  ServicePromosIcon,
  ServiceTravelIcon,
  ServiceGovIcon,
  ServiceAdsIcon,
  ServiceMapsIcon,
  ServiceGuideIcon,
  ServiceCertsIcon,
  ServiceJobsIcon,
  ServiceMagnumIcon,
  ServiceGlovoIcon,
  ServiceAlipayIcon
} from './ServiceIcons';

export const ServicesScreen = ({ profile, onOpenSettings, onSelectService }) => {
  const [lang, setLang] = useState('ru'); // 'kz' | 'ru'

  // The authentic 12 core Kaspi services in exact order
  const allServices = [
    { id: 'shop', title: 'Магазин', icon: ServiceShopIcon },
    { id: 'bank', title: 'Мой Банк', icon: ServiceMyBankIcon },
    { id: 'payments', title: 'Платежи', icon: ServicePaymentsIcon },
    { id: 'transfers', title: 'Переводы', icon: ServiceTransfersIcon },
    { id: 'promos', title: 'Акции', icon: ServicePromosIcon },
    { id: 'travel', title: 'Travel', icon: ServiceTravelIcon },
    { id: 'gov', title: 'Госуслуги', icon: ServiceGovIcon },
    { id: 'ads', title: 'Объявления', icon: ServiceAdsIcon },
    { id: 'maps', title: 'Kaspi Maps', icon: ServiceMapsIcon },
    { id: 'guide', title: 'Гид', icon: ServiceGuideIcon },
    { id: 'certificates', title: 'Сертификаты', icon: ServiceCertsIcon },
    { id: 'jobs', title: 'Работа', icon: ServiceJobsIcon }
  ];

  // Authentic Partner Services
  const partnerServices = [
    {
      id: 'magnum',
      title: 'Magnum',
      subtitle: 'Продукты с бесплатной доставкой',
      icon: ServiceMagnumIcon
    },
    {
      id: 'glovo',
      title: 'Glovo',
      subtitle: 'Сервис доставки еды',
      icon: ServiceGlovoIcon
    },
    {
      id: 'alipay',
      title: 'Alipay+',
      subtitle: 'Оплата за границей через QR',
      icon: ServiceAlipayIcon
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F2F2F2',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '80px',
      WebkitFontSmoothing: 'antialiased'
    }}>
      {/* Top Profile & Language Header (Kaspi Ds.Back.Layer1) */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '12px 16px 12px 16px',
        borderBottom: '1px solid #EBEBEB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* User profile button */}
        <div
          onClick={onOpenSettings}
          className="touchable"
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#F2F2F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8A8A8E'
          }}>
            <User size={22} />
          </div>

          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#1F1F1F',
              fontFamily: 'Roboto Flex Kaspi, Roboto, sans-serif',
              letterSpacing: '-0.2px'
            }}>
              {profile?.shortName || 'Пользователь'}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#8A8A8E',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              marginTop: '1px'
            }}>
              <span>Настройки</span>
              <ChevronRight size={13} strokeWidth={2.2} />
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
              padding: '4px 10px',
              borderRadius: '14px',
              backgroundColor: lang === 'kz' ? '#F14635' : 'transparent',
              color: lang === 'kz' ? '#FFFFFF' : '#757575',
              fontSize: '12px',
              fontWeight: '600',
              transition: 'all 0.15s ease'
            }}
          >
            Қаз
          </div>
          <div
            onClick={() => setLang('ru')}
            className="touchable"
            style={{
              padding: '4px 10px',
              borderRadius: '14px',
              backgroundColor: lang === 'ru' ? '#F14635' : 'transparent',
              color: lang === 'ru' ? '#FFFFFF' : '#757575',
              fontSize: '12px',
              fontWeight: '600',
              transition: 'all 0.15s ease'
            }}
          >
            Рус
          </div>
        </div>
      </div>

      {/* Grid of 12 Services (Authentic Red Outline Vector Icons on White Background) */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '16px 8px 18px 8px',
        borderBottom: '1px solid #EBEBEB'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          rowGap: '20px',
          columnGap: '4px'
        }}>
          {allServices.map((s) => {
            const IconComponent = s.icon;
            return (
              <div
                key={s.id}
                onClick={() => onSelectService && onSelectService(s.id)}
                className="touchable"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent size={38} color="#F14635" />
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#1F1F1F',
                  marginTop: '4px',
                  maxWidth: '75px',
                  lineHeight: '14px',
                  fontFamily: 'Roboto Flex Kaspi, Roboto, sans-serif'
                }}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Partner Services Section (service_page_list_item2_redesign) */}
      <div style={{ marginTop: '16px' }}>
        <div style={{
          padding: '0 16px 8px 16px',
          fontSize: '14px',
          fontWeight: '700',
          color: '#1F1F1F',
          fontFamily: 'Roboto Flex Kaspi, Roboto, sans-serif',
          letterSpacing: '-0.2px'
        }}>
          Партнерские сервисы
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #EBEBEB',
          borderBottom: '1px solid #EBEBEB'
        }}>
          {partnerServices.map((p, idx) => {
            const PartnerIcon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => onSelectService && onSelectService(p.id)}
                className="touchable"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderTop: idx > 0 ? '1px solid #F4F4F4' : 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <PartnerIcon size={38} />

                  <div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#1F1F1F',
                      fontFamily: 'Roboto Flex Kaspi, Roboto, sans-serif'
                    }}>
                      {p.title}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#757575',
                      marginTop: '2px',
                      fontFamily: 'Roboto Flex Kaspi, Roboto, sans-serif'
                    }}>
                      {p.subtitle}
                    </div>
                  </div>
                </div>

                <ChevronRight size={18} color="#C2C2C2" strokeWidth={2} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
