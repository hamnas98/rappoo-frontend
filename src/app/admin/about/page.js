'use client';

import { useState, useEffect } from 'react';
import { aboutAPI } from '@/lib/api';

export default function AboutManagement() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await aboutAPI.get();
      if (response.data.success) {
        setFormData(response.data.data);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load about data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await aboutAPI.update(formData);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'About section updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update about section' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      fontFamily: 'Manrope, sans-serif',
      maxWidth: '900px'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 700, 
          color: '#23262F', 
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          About Section
        </h1>
        <p style={{ 
          fontSize: '16px',
          color: '#777E90',
          lineHeight: '160%'
        }}>
          Manage the about section content of your landing page
        </p>
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

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E6E8EC',
          marginBottom: '2rem'
        }}>
          {/* Title */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#23262F',
              marginBottom: '0.5rem',
              letterSpacing: '0.01em'
            }}>
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Maximizing Your Health Potential Together"
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

          {/* Subtitle */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#23262F',
              marginBottom: '0.5rem',
              letterSpacing: '0.01em'
            }}>
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              required
              placeholder="Smart Nutrition Planning"
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

          {/* Description */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#23262F',
              marginBottom: '0.5rem',
              letterSpacing: '0.01em'
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Our AI-powered health coach provides personalized recommendations..."
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
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            onClick={fetchAboutData}
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
            Reset
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
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}