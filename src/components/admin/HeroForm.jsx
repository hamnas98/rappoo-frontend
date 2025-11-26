'use client';

import { useState } from 'react';

export default function HeroForm({ initialData, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    happyUsersCount: initialData?.happyUsersCount || 59182,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Title */}
      <div>
        <label htmlFor="title" className="admin-label">
          Main Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="admin-input"
          placeholder="Your AI Health Coach"
          required
        />
      </div>

      {/* Subtitle */}
      <div>
        <label htmlFor="subtitle" className="admin-label">
          Subtitle *
        </label>
        <textarea
          id="subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          className="admin-input"
          style={{ minHeight: '100px' }}
          placeholder="Transform your wellness journey..."
          required
        />
      </div>

      {/* Happy Users Count */}
      <div>
        <label htmlFor="happyUsersCount" className="admin-label">
          Happy Users Count
        </label>
        <input
          type="number"
          id="happyUsersCount"
          name="happyUsersCount"
          value={formData.happyUsersCount}
          onChange={handleChange}
          className="admin-input"
          placeholder="59182"
        />
      </div>

      {/* Submit Button */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {loading ? (
            <>
              <div className="spinner" style={{ borderColor: 'white', borderTopColor: 'transparent' }}></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}