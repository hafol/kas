import React from 'react';

// Reusable shimmer block component
export const SkeletonBlock = ({ width = '100%', height = '16px', borderRadius = '8px', style = {} }) => (
  <div
    className="kaspi-skeleton"
    style={{
      width,
      height,
      borderRadius,
      flexShrink: 0,
      ...style
    }}
  />
);

// 1. GovServicesSkeleton (matching GovServicesScreen UI 1:1)
export const GovServicesSkeleton = () => (
  <div style={{
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#F2F2F2',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  }}>
    {/* Block A: Header + Segmented Control + Search */}
    <div style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderBottomLeftRadius: '16px',
      borderBottomRightRadius: '16px',
      paddingTop: '12px',
      paddingBottom: '20px',
      paddingLeft: '16px',
      paddingRight: '16px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Title bar */}
      <div style={{ height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <SkeletonBlock width="12px" height="20px" borderRadius="3px" style={{ position: 'absolute', left: '9px' }} />
        <SkeletonBlock width="95px" height="20px" borderRadius="6px" />
      </div>

      {/* Segmented control track */}
      <div style={{ marginTop: '14px', width: '100%', height: '43px', backgroundColor: '#F2F2F2', borderRadius: '12px', padding: '2px', display: 'flex', boxSizing: 'border-box' }}>
        <SkeletonBlock width="50%" height="39px" borderRadius="10px" style={{ backgroundColor: '#FFFFFF' }} />
        <div style={{ width: '50%', height: '39px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SkeletonBlock width="80px" height="16px" borderRadius="4px" />
        </div>
      </div>

      {/* Search field */}
      <div style={{ marginTop: '15px', width: '100%', height: '48px', backgroundColor: '#F2F2F2', borderRadius: '12px', display: 'flex', alignItems: 'center', paddingLeft: '21.5px', paddingRight: '16px', boxSizing: 'border-box' }}>
        <SkeletonBlock width="22px" height="21.5px" borderRadius="50%" />
        <SkeletonBlock width="170px" height="18px" borderRadius="4px" style={{ marginLeft: '18px' }} />
      </div>
    </div>

    {/* Gap 12px */}
    <div style={{ height: '12px', flexShrink: 0 }} />

    {/* Block B: Documents */}
    <div style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      paddingTop: '15.5px',
      paddingBottom: '8px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Cards row */}
      <div style={{ display: 'flex', gap: '13.5px', paddingLeft: '17.5px', paddingRight: '17.5px', overflowX: 'hidden' }}>
        {[1, 2].map((i) => (
          <div key={i} style={{ width: '168px', height: '115.5px', backgroundColor: '#F2F2F2', borderRadius: '16px', padding: '14px', boxSizing: 'border-box', flexShrink: 0 }}>
            <SkeletonBlock width="58px" height="37.5px" borderRadius="6px" />
            <SkeletonBlock width="110px" height="14px" borderRadius="4px" style={{ marginTop: '14px' }} />
            <SkeletonBlock width="70px" height="14px" borderRadius="4px" style={{ marginTop: '6px' }} />
          </div>
        ))}
      </div>

      {/* Link row */}
      <div style={{ marginTop: '12px', height: '32px', paddingLeft: '17.5px', paddingRight: '17px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SkeletonBlock width="130px" height="18px" borderRadius="4px" />
        <SkeletonBlock width="14px" height="14px" borderRadius="3px" />
      </div>
    </div>

    {/* Gap 25px */}
    <div style={{ height: '25px', flexShrink: 0 }} />

    {/* Block C: Categories & Services */}
    <div style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      paddingTop: '16px',
      paddingLeft: '16px',
      paddingRight: '16px',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Category tiles */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #F0F0F0' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <SkeletonBlock width="56.5px" height="56.5px" borderRadius="16px" />
            <SkeletonBlock width="50px" height="12px" borderRadius="4px" />
          </div>
        ))}
      </div>

      {/* Section title */}
      <div style={{ marginTop: '22px' }}>
        <SkeletonBlock width="180px" height="22px" borderRadius="6px" />
      </div>

      {/* Service rows */}
      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <SkeletonBlock width="44px" height="44px" borderRadius="50%" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <SkeletonBlock width="75%" height="16px" borderRadius="4px" />
              <SkeletonBlock width="45%" height="14px" borderRadius="4px" />
            </div>
            <SkeletonBlock width="14px" height="14px" borderRadius="3px" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 2. MyBankSkeleton (matching MyBankScreen UI)
export const MyBankSkeleton = () => (
  <div style={{
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#F2F2F2',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  }}>
    {/* Nav Header */}
    <div style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '16px',
      paddingRight: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <SkeletonBlock width="12px" height="20px" borderRadius="3px" style={{ position: 'absolute', left: '16px' }} />
      <SkeletonBlock width="80px" height="20px" borderRadius="6px" />
    </div>

    {/* Main Kaspi Gold Card */}
    <div style={{ margin: '16px', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <SkeletonBlock width="120px" height="24px" borderRadius="6px" />
        <SkeletonBlock width="54px" height="34px" borderRadius="8px" />
      </div>
      <SkeletonBlock width="160px" height="30px" borderRadius="8px" style={{ marginTop: '24px' }} />
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <SkeletonBlock width="50%" height="40px" borderRadius="10px" />
        <SkeletonBlock width="50%" height="40px" borderRadius="10px" />
      </div>
    </div>

    {/* Deposit Block */}
    <div style={{ margin: '0 16px 16px 16px', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px' }}>
      <SkeletonBlock width="140px" height="20px" borderRadius="6px" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '16px' }}>
        <SkeletonBlock width="56px" height="44px" borderRadius="6px" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SkeletonBlock width="60%" height="16px" borderRadius="4px" />
          <SkeletonBlock width="40%" height="14px" borderRadius="4px" />
        </div>
      </div>
    </div>
  </div>
);

// 3. TransfersSkeleton
export const TransfersSkeleton = () => (
  <div style={{
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#F2F2F2',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  }}>
    <div style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <SkeletonBlock width="12px" height="20px" borderRadius="3px" style={{ position: 'absolute', left: '16px' }} />
      <SkeletonBlock width="90px" height="20px" borderRadius="6px" />
    </div>

    <div style={{ margin: '16px', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px' }}>
      <SkeletonBlock width="100%" height="48px" borderRadius="12px" />
      <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <SkeletonBlock width="50px" height="50px" borderRadius="50%" />
            <SkeletonBlock width="44px" height="12px" borderRadius="4px" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Generic skeleton fallback
export const GenericPageSkeleton = ({ title = '' }) => (
  <div style={{
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#F2F2F2',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  }}>
    <div style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <SkeletonBlock width="12px" height="20px" borderRadius="3px" style={{ position: 'absolute', left: '16px' }} />
      <SkeletonBlock width={title ? '100px' : '80px'} height="20px" borderRadius="6px" />
    </div>

    <div style={{ margin: '16px', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <SkeletonBlock width="100%" height="90px" borderRadius="12px" />
      <SkeletonBlock width="70%" height="18px" borderRadius="6px" />
      <SkeletonBlock width="90%" height="14px" borderRadius="4px" />
    </div>
  </div>
);
