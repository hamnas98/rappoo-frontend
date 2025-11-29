'use client';

import { useState, useEffect } from 'react';
import { faqAPI } from '@/lib/api';

export default function FAQManagement() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await faqAPI.getAll();
      if (response.data.success) {
        setFaqs(response.data.data);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load FAQs' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      if (editingId) {
        await faqAPI.update(editingId, formData);
        setMessage({ type: 'success', text: 'FAQ updated successfully!' });
      } else {
        await faqAPI.create(formData);
        setMessage({ type: 'success', text: 'FAQ added successfully!' });
      }
      
      await fetchFAQs();
      resetForm();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to save FAQ' });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer
    });
    setEditingId(faq._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await faqAPI.delete(id);
      setMessage({ type: 'success', text: 'FAQ deleted successfully!' });
      await fetchFAQs();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete FAQ' });
    }
  };

  const resetForm = () => {
    setFormData({ question: '', answer: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        fontFamily: 'Manrope, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #E5E7EB',
            borderTopColor: '#3772FF',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#777E90', fontSize: '14px' }}>Loading...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2.5rem',
      fontFamily: 'Manrope, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 700, 
            color: '#23262F', 
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            Frequently Asked Questions
          </h1>
          <p style={{ 
            fontSize: '16px',
            color: '#777E90',
            lineHeight: '160%'
          }}>
            Manage FAQs for your landing page ({faqs.length} total)
          </p>
        </div>
        
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '0.875rem 1.75rem',
              background: '#3772FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'Manrope, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2451CC';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(55, 114, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3772FF';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '18px' }}>+</span>
            Add FAQ
          </button>
        )}
      </div>

      {/* Message Alert */}
      {message.text && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          background: message.type === 'success' ? '#F0FDF4' : '#FEF2F2',
          border: `1px solid ${message.type === 'success' ? '#86EFAC' : '#FCA5A5'}`,
          color: message.type === 'success' ? '#16A34A' : '#DC2626',
          fontSize: '14px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '18px' }}>
            {message.type === 'success' ? '✓' : '⚠'}
          </span>
          {message.text}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E6E8EC',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#23262F',
              margin: 0
            }}>
              {editingId ? 'Edit FAQ' : 'Add New FAQ'}
            </h2>
            <button
              onClick={resetForm}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#777E90',
                cursor: 'pointer',
                padding: '0.25rem',
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: '#23262F',
                marginBottom: '0.5rem'
              }}>
                Question
              </label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                placeholder="What is your return policy?"
                style={{
                  width: '100%',
                  padding: '0.875rem 1.25rem',
                  fontSize: '15px',
                  border: '1px solid #E6E8EC',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'Manrope, sans-serif'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3772FF';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(55, 114, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E6E8EC';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: '#23262F',
                marginBottom: '0.5rem'
              }}>
                Answer
              </label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                required
                rows={5}
                placeholder="We offer a 30-day money-back guarantee..."
                style={{
                  width: '100%',
                  padding: '0.875rem 1.25rem',
                  fontSize: '15px',
                  border: '1px solid #E6E8EC',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'Manrope, sans-serif',
                  resize: 'vertical'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3772FF';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(55, 114, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E6E8EC';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                style={{
                  padding: '0.875rem 1.75rem',
                  background: '#FFFFFF',
                  color: '#23262F',
                  border: '1px solid #E6E8EC',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'Manrope, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background = '#F4F5F6';
                    e.currentTarget.style.borderColor = '#3772FF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#E6E8EC';
                  }
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: '0.875rem 1.75rem',
                  background: saving ? '#9CA3AF' : '#3772FF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'Manrope, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background = '#2451CC';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(55, 114, 255, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!saving) {
                    e.currentTarget.style.background = '#3772FF';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {saving ? 'Saving...' : editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAQs List */}
      {faqs.length === 0 ? (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '3rem',
          border: '1px solid #E6E8EC',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '1rem'
          }}>
            ❓
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#23262F',
            marginBottom: '0.5rem'
          }}>
            No FAQs yet
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#777E90',
            marginBottom: '1.5rem'
          }}>
            Add your first FAQ to get started
          </p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: '0.875rem 1.75rem',
                background: '#3772FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'Manrope, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2451CC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3772FF';
              }}
            >
              Add First FAQ
            </button>
          )}
        </div>
      ) : (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E6E8EC',
          overflow: 'hidden'
        }}>
          {faqs.map((faq, index) => (
            <div key={faq._id}>
              {index > 0 && (
                <div style={{
                  height: '1px',
                  background: '#E6E8EC'
                }}></div>
              )}
              <div style={{ padding: '1.75rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                  marginBottom: expandedId === faq._id ? '1.5rem' : 0
                }}>
                  <div style={{ flex: 1 }}>
                    <button
                      onClick={() => toggleExpand(faq._id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        textAlign: 'left',
                        cursor: 'pointer',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                    >
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: 500,
                        color: expandedId === faq._id ? '#3772FF' : '#23262F',
                        lineHeight: '140%',
                        letterSpacing: '-0.02em',
                        margin: 0,
                        transition: 'color 0.2s'
                      }}>
                        {faq.question}
                      </h3>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {expandedId === faq._id ? (
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect x="8" y="15" width="16" height="2.5" rx="1.25" fill="#23262F"/>
                          </svg>
                        ) : (
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect x="8" y="15" width="16" height="2.5" rx="1.25" fill="#23262F"/>
                            <rect x="15" y="8" width="16" height="2.5" rx="1.25" transform="rotate(90 15 8)" fill="#23262F"/>
                          </svg>
                        )}
                      </div>
                    </button>

                    {expandedId === faq._id && (
                      <div style={{
                        marginTop: '1.5rem',
                        animation: 'slideDown 0.3s ease-out'
                      }}>
                        <p style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#777E90',
                          lineHeight: '160%',
                          letterSpacing: '-0.012em',
                          margin: 0
                        }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button
                      onClick={() => handleEdit(faq)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#F0F5FF',
                        color: '#3772FF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'Manrope, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#3772FF';
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#F0F5FF';
                        e.currentTarget.style.color = '#3772FF';
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#FEF2F2',
                        color: '#DC2626',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'Manrope, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#DC2626';
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#FEF2F2';
                        e.currentTarget.style.color = '#DC2626';
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
      `}</style>
    </div>
  );
}