'use client';

import { useEffect, useState } from 'react';
import { heroAPI } from '@/lib/api';
import { DOWNLOAD_LINKS } from '@/utils/constants';

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
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-background)' }}>
        <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div>
      </section>
    );
  }

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'var(--color-background)', paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="section-container">
        <div style={{ display: 'grid', gap: '3rem', alignItems: 'center' }} className="hero-grid">
          {/* Left Content */}
          <div className="animate-fade-in" style={{ textAlign: 'center' }} className="hero-content">
            {/* Happy Users Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', marginLeft: '-0.5rem' }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '9999px',
                      background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-400))',
                      border: '2px solid white',
                      marginLeft: '-0.5rem'
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                {heroData?.happyUsersCount?.toLocaleString() || '59,182'} Happy Users
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="heading-xl" style={{ marginBottom: '1.5rem' }}>
              {heroData?.title || 'Your AI Health Coach'}
            </h1>

            {/* Subtitle */}
            <p className="text-body" style={{ marginBottom: '2rem', maxWidth: '36rem', margin: '0 auto' }}>
              {heroData?.subtitle || 'Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.'}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }} className="cta-buttons">
              <a href={DOWNLOAD_LINKS.ios} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                Download
              </a>
              <a href={DOWNLOAD_LINKS.android} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Download
              </a>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="animate-slide-up" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="hero-mockup">
            <div style={{ position: 'relative', width: '100%', maxWidth: '28rem' }}>
              {/* Decorative Elements */}
              <div style={{ position: 'absolute', top: '-2.5rem', right: '-2.5rem', width: '18rem', height: '18rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '9999px', filter: 'blur(60px)' }}></div>
              <div style={{ position: 'absolute', bottom: '-2.5rem', left: '-2.5rem', width: '18rem', height: '18rem', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '9999px', filter: 'blur(60px)' }}></div>
              
              {/* Phone Mockup */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '1rem' }}>
                  <div style={{ 
                    aspectRatio: '9 / 19', 
                    background: 'linear-gradient(to bottom right, rgba(37, 99, 235, 0.2), rgba(96, 165, 250, 0.2))', 
                    borderRadius: '1rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>App Preview</span>
                  </div>
                </div>
              </div>

              {/* Floating Card - Day Off */}
              <div className="card animate-fade-in" style={{ position: 'absolute', left: '-1rem', top: '25%', padding: '1rem', maxWidth: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', background: 'rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.5rem' }}>📅</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600 }}>Day Off</p>
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '0.5rem', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>20</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>OUT OF 45</p>
                </div>
              </div>

              {/* Floating Card - Work Hours */}
              <div className="card animate-fade-in" style={{ position: 'absolute', right: '-1rem', top: '33%', padding: '1rem', maxWidth: '160px', animationDelay: '0.2s' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>Work Hour Analysis</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary)' }}>45 Hours</p>
                <div style={{ marginTop: '0.5rem', height: '2rem', background: 'rgb(243 244 246)', borderRadius: '0.5rem' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-content {
            text-align: left !important;
          }
          .cta-buttons {
            flex-direction: row !important;
            justify-content: flex-start !important;
          }
          .hero-mockup {
            justify-content: flex-end !important;
          }
        }
      `}</style>
    </section>
  );
}