'use client';

import { useEffect, useState } from 'react';
import { heroAPI } from '@/lib/api';
import HeroForm from '@/components/admin/HeroForm';

export default function HeroManagement() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await heroAPI.get();
      setHeroData(response.data.data);
    } catch (error) {
      console.error('Error fetching hero data:', error);
      setMessage({ type: 'error', text: 'Failed to load hero data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await heroAPI.update(formData);
      setMessage({ type: 'success', text: 'Hero section updated successfully!' });
      fetchHeroData();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update hero section' 
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
          Hero Section
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Manage the main hero section content
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
        <HeroForm
          initialData={heroData}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </div>
    </div>
  );
}