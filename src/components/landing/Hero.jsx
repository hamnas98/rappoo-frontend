'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { heroAPI } from '@/lib/api';

export default function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await heroAPI.get();
      setHeroData(response.data.data);
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA' }}>
        <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div>
      </section>
    );
  }

  return (
    <section style={{ 
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '95.76px'
    }}>
      {/* Background Shape */}
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        height: '50%',
        zIndex: 0
      }}>
        <Image 
          src="/images/Group_1171275470.svg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'bottom' }}
          priority
        />
      </div>

      <div style={{ 
        position: 'relative',
        zIndex: 1,
        maxWidth: '1440px',
        width: '100%',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem'
      }}>
        {/* Hero Mockup Image */}
        <div style={{ 
          position: 'relative',
          width: '1237.57px',
          height: '577px',
          maxWidth: '100%',
          marginTop: '2rem'
        }}>
          <Image 
            src="/images/Group_171275468.png"
            alt="AI Health Coach App"
            width={1237.57}
            height={577}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>

        {/* Content Section */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
          paddingBottom: '4rem'
        }}>
          {/* Happy Users Badge */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            {/* User Avatars */}
            <div style={{ display: 'flex', marginLeft: '-0.5rem' }}>
              {['avatar1.png', 'avatar2.png', 'avatar3.png'].map((avatar, i) => (
                <div
                  key={i}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '2px solid white',
                    marginLeft: i === 0 ? '0' : '-0.5rem',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <Image 
                    src={`/images/${avatar}`}
                    alt={`User ${i + 1}`}
                    width={48}
                    height={48}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>

            {/* User Count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '24px',
                fontWeight: 700,
                lineHeight: '33px',
                color: '#111827',
                fontFamily: 'Manrope, sans-serif'
              }}>
                {heroData?.happyUsersCount?.toLocaleString() || '59,182'}
              </span>
              <span style={{
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '25px',
                color: '#6B7280',
                fontFamily: 'Manrope, sans-serif'
              }}>
                Happy Users
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: '56px',
            fontWeight: 700,
            lineHeight: '67px',
            color: '#111827',
            fontFamily: 'Manrope, sans-serif',
            margin: 0,
            maxWidth: '700px'
          }}>
            {heroData?.title || 'Your AI Health Coach'}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '30px',
            color: '#6B7280',
            fontFamily: 'Manrope, sans-serif',
            margin: 0,
            maxWidth: '650px'
          }}>
            {heroData?.subtitle || 'Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.'}
          </p>

          {/* Download Buttons */}
          <div style={{ 
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            {/* Apple Download Button */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '14px 28px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '94.27px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Image 
                src="/images/appleLogo.png"
                alt="Apple"
                width={24}
                height={24}
              />
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '22px',
                color: '#111827',
                fontFamily: 'Manrope, sans-serif'
              }}>
                Download
              </span>
            </button>

            {/* Google Play Download Button */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '14px 28px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '94.27px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Image 
                src="/images/playlogo.png"
                alt="Google Play"
                width={24}
                height={24}
              />
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '22px',
                color: '#111827',
                fontFamily: 'Manrope, sans-serif'
              }}>
                Download
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 36px !important;
            line-height: 44px !important;
          }
          p {
            font-size: 16px !important;
            line-height: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}