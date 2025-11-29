'use client';

import { useState, useEffect } from 'react';
import { testimonialsAPI } from '@/lib/api';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    testimonial: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsAPI.getAll();
      if (response.data.success) {
        setTestimonials(response.data.data);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load testimonials' });
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
        await testimonialsAPI.update(editingId, formData);
        setMessage({ type: 'success', text: 'Testimonial updated successfully!' });
      } else {
        await testimonialsAPI.create(formData);
        setMessage({ type: 'success', text: 'Testimonial added successfully!' });
      }
      
      await fetchTestimonials();
      resetForm();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to save testimonial' });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      company: testimonial.company,
      testimonial: testimonial.testimonial
    });
    setEditingId(testimonial._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await testimonialsAPI.delete(id);
      setMessage({ type: 'success', text: 'Testimonial deleted successfully!' });
      await fetchTestimonials();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete testimonial' });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', company: '', testimonial: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            Testimonials
          </h1>
          <p style={{ 
            fontSize: '16px',
            color: '#777E90',
            lineHeight: '160%'
          }}>
            Manage customer testimonials ({testimonials.length} total)
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
            Add Testimonial
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
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
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
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
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
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="Acme Corp"
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
                Testimonial
              </label>
              <textarea
                name="testimonial"
                value={formData.testimonial}
                onChange={handleChange}
                required
                rows={5}
                placeholder="This product has transformed my life..."
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

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
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
            💬
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#23262F',
            marginBottom: '0.5rem'
          }}>
            No testimonials yet
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#777E90',
            marginBottom: '1.5rem'
          }}>
            Add your first testimonial to get started
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
              Add First Testimonial
            </button>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '1.75rem',
                border: '1px solid #E6E8EC',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: '#FFBC99',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#FFFFFF'
                  }}>
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#23262F',
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {testimonial.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#909DA2',
                      margin: 0
                    }}>
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(testimonial)}
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
                    onClick={() => handleDelete(testimonial._id)}
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

              <p style={{
                fontSize: '15px',
                color: '#23262F',
                lineHeight: '160%',
                letterSpacing: '-0.012em',
                margin: 0
              }}>
                "{testimonial.testimonial}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}