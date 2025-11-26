'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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

  if (loading) {
    return (
      <section style={{ minHeight: '568.89px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FCFCFD' }}>
        <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div>
      </section>
    );
  }

  return (
    <section style={{
      width: '100%',
      minHeight: '568.89px',
      background: '#FCFCFD',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1300px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '3rem'
      }} className="about-container">
        {/* Left Section - Text Content */}
        <div style={{
          width: '533px',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px'
        }} className="text-content">
          {/* Title and Subtitle */}
          <div>
            {/* Main Title */}
            <h2 style={{
              fontSize: '48px',
              fontWeight: 600,
              lineHeight: '120%',
              color: '#111827',
              fontFamily: 'Manrope, sans-serif',
              margin: '0 0 16px 0',
              letterSpacing:'-2%'
            }}>
              {aboutData?.title || 'Maximizing Your Health Potential Together'}
            </h2>

            {/* Subtitle Label */}
            <p style={{
              fontSize: '18px',
              fontWeight: 550,
              lineHeight: '100%',
              color: '#111827',
              fontFamily: 'Manrope, sans-serif',
              letterSpacing:'-1.2%',
              margin: 0
            }}>
              {aboutData?.subtitle || 'Smart Nutrition Planning'}
            </p>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '18px',
            fontWeight: 500,
            width: '429px',
            lineHeight: '160%',
            color: '#6B7280',
            fontFamily: 'Manrope, sans-serif',
            letterSpacing:'-1.2%',
            margin: '-25px 0 0 0',
          }}>
            {aboutData?.description || 'Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized.'}
          </p>

          {/* Read More Button */}
          <button style={{
            width: 'fit-content',
            padding: '14px 32px',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '94.27px',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '22px',
            color: '#111827',
            fontFamily: 'Manrope, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s'
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
          }}>
            Read More
          </button>
        </div>

        {/* Right Section - Time Tracker Card */}
        <div style={{
          width: '544px',
          maxWidth: '100%',
          background: '#F4F5F6',
          borderRadius: '20px',
          padding: '42px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }} className="tracker-card">
          {/* Time Tracker Image */}
          <div style={{
            position: 'relative',
            width: '460px',
            height: '324.89px',
            maxWidth: '100%',
            borderRadius: '23.84px',
            overflow: 'hidden'
          }}>
            <Image
              src="/images/timer_tracker.png"
              alt="Time Tracker"
              width={460}
              height={324.89}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .about-container {
            flex-direction: column !important;
            gap: 3rem !important;
          }

          .text-content {
            width: 100% !important;
          }

          .tracker-card {
            width: 100% !important;
          }

          h2 {
            font-size: 36px !important;
            line-height: 44px !important;
          }
        }

        @media (max-width: 640px) {
          .text-content {
            gap: 32px !important;
          }

          h2 {
            font-size: 32px !important;
            line-height: 40px !important;
          }

          p {
            font-size: 16px !important;
            line-height: 26px !important;
          }

          .tracker-card {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}