'use client';

import { useEffect, useState } from 'react';
import { aboutAPI } from '@/lib/api';

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await aboutAPI.get();
      setAboutData(response.data.data);
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log(aboutData)

  if (loading) {
    return (
      <section id="about" className="section-padding" style={{ background: 'var(--color-background)' }}>
        <div className="section-container" style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent', margin: '0 auto' }}></div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--color-background)' }}>
      <div className="section-container">
        <div style={{ display: 'grid', gap: '3rem', alignItems: 'center' }} className="about-grid">
          {/* Left Content */}
          <div>
            {aboutData?.subtitle && (
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  color: 'var(--color-primary)', 
                  fontWeight: 600, 
                  fontSize: '0.875rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}>
                  {aboutData.subtitle}
                </span>
              </div>
            )}
            <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>
              {aboutData?.title || 'Maximizing Your Health Potential Together'}
            </h2>
            <p className="text-body" style={{ marginBottom: '2rem' }}>
              {aboutData?.description || 'Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized.'}
            </p>
          </div>

          {/* Right Content - Time Tracker Card */}
          <div style={{ position: 'relative' }}>
            {/* Main Card */}
            <div className="card" style={{ padding: '2rem', maxWidth: '28rem', margin: '0 auto' }} className="about-card">
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Time Tracker</span>
                </div>
                <button style={{ color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>

              {/* Project Name */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Design System</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>10:34</span>
                  <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-primary)' }}>:00</span>
                  <button style={{ 
                    marginLeft: '1rem', 
                    width: '3rem', 
                    height: '3rem', 
                    background: 'var(--color-primary)', 
                    borderRadius: '9999px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-600)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                  >
                    <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Previous Tasks */}
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>Previous Tasks</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'rgb(249 250 251)', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>⚡</span>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>Loom UI Design System</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>1:20:35</p>
                      </div>
                    </div>
                    <button style={{ color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'rgb(249 250 251)', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>⚡</span>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>Loom UI / UX Designer</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>1:45:35</p>
                      </div>
                    </div>
                    <button style={{ color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .about-card {
            margin-left: auto !important;
          }
        }
      `}</style>
    </section>
  );
}