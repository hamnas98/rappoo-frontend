'use client';

import { useEffect, useState } from 'react';
import { testimonialsAPI } from '@/lib/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsAPI.getAll();
      setTestimonials(response.data.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section style={{ minHeight: '870px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section style={{
      width: '100%',
      padding: '80px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    }}>
      <div style={{
        maxWidth: '1440px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '60px'
      }}>
        {/* Header Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'center',
          maxWidth: '483px'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: 600,
            lineHeight: '120%',
            letterSpacing: '2%',
            color: '#23262F',
            fontFamily: 'Manrope, sans-serif',
            margin: 0
          }}>
            Our Users Feel the Transformation
          </h2>
          <p style={{
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '160%',
            letterSpacing: '1.2%',
            color: '##777E90',
            fontFamily: 'Manrope, sans-serif',
            margin: 0,
            opacity: 0.7
          }}>
            Real Stories from People Empowered by Personalized Wellness
          </p>
        </div>

        {/* Testimonial Card with Navigation */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          position: 'relative'
        }}>
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '1px solid #E5E7EB',
              background: currentIndex > 0 ? '#FFFFFF' : '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3772FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#23262F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Testimonial Card */}
          <div style={{
            maxWidth: '740px',
            width: '100%',
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '48px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px'
          }}>
            {/* Quote Text */}
            <p style={{
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '160%',
              letterSpacing: '-0.012em',
              color: '#23262F',
              fontFamily: 'Manrope, sans-serif',
              textAlign: 'center',
              margin: 0
            }}>
              "{currentTestimonial.testimonial}"
            </p>

            {/* Author Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              {/* Avatar */}
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#808080',
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              </div>

              {/* Name and Title */}
              <div style={{ textAlign: 'left' }}>
                <p style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '160%',
                  color: '#23262F',
                  fontFamily: 'Manrope, sans-serif',
                  margin: 0
                }}>
                  {currentTestimonial.name}
                </p>
                <p style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '160%',
                  color: '#909DA2',
                  fontFamily: 'Manrope, sans-serif',
                  margin: 0
                }}>
                  {
                     currentTestimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: 'none',
              background: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1D4ED8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background ="#FFFFFF";
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#23262F"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Thumbnails */}
        <div style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              style={{
                width: '240px',
                height: '90px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                opacity: index === currentIndex ? 1 : 0.5
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = index === currentIndex ? '1' : '0.5';
              }}
            >
              {/* Thumbnail Avatar */}
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: '#808080',
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
              </div>

              {/* Thumbnail Info */}
              <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '160%',
                  color: '#23262F',
                  fontFamily: 'Manrope, sans-serif',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {testimonial.name}
                </p>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '160%',
                  color: '#909DA2',
                  fontFamily: 'Manrope, sans-serif',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {testimonial.rating 
                    ? `${testimonial.rating} Star Rated` 
                    : testimonial.position}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          section {
            padding: 60px 24px !important;
          }
          
          h2 {
            font-size: 36px !important;
          }
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 32px !important;
          }
          
          p {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}