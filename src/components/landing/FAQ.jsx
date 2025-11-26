'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { faqAPI } from '@/lib/api';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await faqAPI.getAll();
      setFaqs(response.data.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <section style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div>
      </section>
    );
  }

  return (
    <section style={{
      width: '100%',
      padding: '80px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
          width: '483px',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: 600,
            lineHeight: '120%',
            letterSpacing: '-0.02em',
            color: '#23262F',
            fontFamily: 'Manrope, sans-serif',
            margin: 0
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '160%',
            letterSpacing: '-0.012em',
            color: '#777E90',
            fontFamily: 'Manrope, sans-serif',
            margin: 0
          }}>
            Get answers to common questions about our AI health assistant app
          </p>
        </div>

        {/* FAQ List */}
        <div style={{
          width: '100%',
          maxWidth: '996px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Top Border */}
          <div style={{
            width: '100%',
            height: '1px',
            background: '#E6E8EC'
          }}></div>

          {faqs.map((faq, index) => (
            <div key={faq._id || index}>
              {/* FAQ Item */}
              <div
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  padding: '32px 0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {/* Question */}
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: 500,
                  lineHeight: '140%',
                  letterSpacing: '-0.02em',
                  color: openIndex === index ? '#3772FF' : '#23262F',
                  fontFamily: 'Manrope, sans-serif',
                  margin: 0,
                  flex: 1,
                  transition: 'color 0.3s'
                }}>
                  {faq.question}
                </h3>

                {/* Plus/Minus Button */}
                <button
                  style={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    padding: 0
                  }}
                >
                  {openIndex === index ? (
                    // Minus Icon
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M8 16H24" stroke="#23262F" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    // Plus Icon
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M16 8V24M8 16H24" stroke="#23262F" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Answer (Expandable) */}
              {openIndex === index && (
                <div style={{
                  paddingBottom: '32px',
                  animation: 'slideDown 0.3s ease-out'
                }}>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '140%',
                    letterSpacing: '-0.012em',
                    color: '#777E90',
                    fontFamily: 'Manrope, sans-serif',
                    margin: 0
                  }}>
                    {faq.answer}
                  </p>
                </div>
              )}

              {/* Bottom Border */}
              <div style={{
                width: '100%',
                height: '1px',
                background: '#E6E8EC'
              }}></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          section {
            padding: 60px 24px !important;
          }
          
          h2 {
            font-size: 36px !important;
          }

          h3 {
            font-size: 24px !important;
          }

          p {
            font-size: 18px !important;
          }
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 32px !important;
          }

          h3 {
            font-size: 20px !important;
          }

          p {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
