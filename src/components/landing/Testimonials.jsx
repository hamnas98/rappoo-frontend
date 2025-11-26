'use client';

import { useEffect, useState } from 'react';
import { testimonialsAPI } from '@/lib/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

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
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <section id="testimonials" className="section-padding" style={{ background: 'white' }}>
        <div className="section-container" style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent', margin: '0 auto' }}></div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-padding" style={{ background: 'white' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Our Users Feel the Transformation
          </h2>
          <p className="text-body" style={{ maxWidth: '42rem', margin: '0 auto' }}>
            Real Stories from People Empowered by Personalized Wellness
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div style={{ position: 'relative', maxWidth: '56rem', margin: '0 auto' }}>
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: '50%', 
              transform: 'translate(-1rem, -50%)',
              width: '3rem', 
              height: '3rem', 
              borderRadius: '9999px', 
              border: '2px solid rgb(209 213 219)', 
              background: 'white',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.2s'
            }}
            className="nav-btn-left"
            aria-label="Previous testimonial"
          >
            <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            style={{ 
              position: 'absolute', 
              right: 0, 
              top: '50%', 
              transform: 'translate(1rem, -50%)',
              width: '3rem', 
              height: '3rem', 
              borderRadius: '9999px', 
              background: 'var(--color-primary)',
              border: 'none',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.2s'
            }}
            className="nav-btn-right"
            aria-label="Next testimonial"
          >
            <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonial Card */}
          <div className="card animate-fade-in" key={currentIndex} style={{ padding: '2rem' }} className="testimonial-card">
            <div style={{ textAlign: 'center' }}>
              {/* Quote */}
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-primary)', lineHeight: '1.75', marginBottom: '2rem' }} className="testimonial-text">
                "{currentTestimonial.testimonial}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', background: 'linear-gradient(to bottom right, rgb(251 146 60), rgb(251 191 36))' }}></div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {currentTestimonial.name}
                    {currentTestimonial.role && `, ${currentTestimonial.role}`}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {currentTestimonial.company || 'Empowered by AI Wellness Journeys'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <button
                key={testimonial._id}
                onClick={() => setCurrentIndex(index)}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.75rem', 
                  borderRadius: '0.5rem',
                  background: index === currentIndex ? 'rgb(243 244 246)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(243 244 246)'}
                onMouseLeave={(e) => e.currentTarget.style.background = index === currentIndex ? 'rgb(243 244 246)' : 'transparent'}
              >
                <div style={{ width: '3rem', height: '3rem', borderRadius: '9999px', background: 'linear-gradient(to bottom right, rgb(251 146 60), rgb(251 191 36))' }}></div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    {testimonial.name.split(',')[0]}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    {testimonial.rating} Star Rated
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .nav-btn-left {
            transform: translate(-4rem, -50%) !important;
          }
          .nav-btn-right {
            transform: translate(4rem, -50%) !important;
          }
          .testimonial-card {
            padding: 3rem !important;
          }
          .testimonial-text {
            font-size: 1.25rem !important;
          }
        }
        .nav-btn-left:hover,
        .nav-btn-right:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .nav-btn-right:hover {
          background: var(--color-primary-600);
        }
      `}</style>
    </section>
  );
}