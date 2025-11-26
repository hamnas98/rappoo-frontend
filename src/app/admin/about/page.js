'use client';

import { useEffect, useState } from 'react';
import { aboutAPI } from '@/lib/api';
import AboutForm from '@/components/admin/AboutForm';

export default function AboutManagement() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await aboutAPI.get();
      setAboutData(response.data.data);
    } catch (error) {
      console.error('Error fetching about data:', error);
      setMessage({ type: 'error', text: 'Failed to load about data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await aboutAPI.update(formData);
      setMessage({ type: 'success', text: 'About section updated successfully!' });
      fetchAboutData();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update about section' 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
          About Section
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Manage the about section content
        </p>
      </div>

      {/* Message */}
      {message.text && (
        <div style={{ 
          marginBottom: '1.5rem', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          background: message.type === 'success' ? 'rgb(240 253 244)' : 'rgb(254 242 242)',
          border: `1px solid ${message.type === 'success' ? 'rgb(187 247 208)' : 'rgb(254 226 226)'}`
        }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: message.type === 'success' ? 'rgb(22 101 52)' : 'rgb(220 38 38)' 
          }}>
            {message.text}
          </p>
        </div>
      )}

      {/* Form */}
      <div className="admin-card">
        <AboutForm
          initialData={aboutData}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </div>
    </div>
  );
}