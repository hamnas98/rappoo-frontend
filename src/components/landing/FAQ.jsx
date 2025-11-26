'use client';

import { useEffect, useState } from 'react';
import { faqAPI } from '@/lib/api';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await faqAPI.getAll();
      setFaqs(response.data.data);
      // Set first FAQ as open by default
      if (response.data.data.length > 0) {
        setOpenIndex(0);
      }
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
      <section id="faq" className="section-padding" style={{ background: 'var(--color-background)' }}>
        <div className="section-container" style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent', margin: '0 auto' }}></div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="section-padding" style={{ background: 'var(--color-background)' }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-body" style={{ maxWidth: '42rem', margin: '0 auto' }}>
            Get answers to common questions about our AI health assistant app
          </p>
        </div>

        {/* FAQ List */}
        <div style={{ maxWidth: '48rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <div
              key={faq._id}
              className="card"
              style={{ overflow: 'hidden', transition: 'all 0.3s' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                style={{ 
                  width: '100%', 
                  padding: '1.25rem 1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgb(249 250 251)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span
                  style={{ 
                    fontWeight: 600, 
                    fontSize: '1.125rem',
                    color: openIndex === index ? 'var(--color-primary)' : 'var(--color-text-primary)',
                    transition: 'color 0.2s'
                  }}
                >
                  {faq.question}
                </span>
                <div
                  style={{ 
                    flexShrink: 0,
                    marginLeft: '1rem',
                    width: '2rem', 
                    height: '2rem', 
                    borderRadius: '9999px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: openIndex === index ? 'var(--color-primary)' : 'rgb(243 244 246)',
                    color: openIndex === index ? 'white' : 'var(--color-text-secondary)',
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'all 0.3s'
                  }}
                >
                  <svg
                    style={{ width: '1.25rem', height: '1.25rem' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                style={{ 
                  maxHeight: openIndex === index ? '24rem' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s'
                }}
              >
                <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', paddingTop: '0.5rem' }}>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.75' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}