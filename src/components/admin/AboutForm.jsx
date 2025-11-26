'use client';

import { useState } from 'react';

export default function AboutForm({ initialData, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    description: initialData?.description || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Subtitle */}
      <div>
        <label htmlFor="subtitle" className="admin-label">
          Section Label
        </label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          className="admin-input"
          placeholder="Smart Nutrition Planning"
        />
      </div>

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
          placeholder="Maximizing Your Health Potential Together"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="admin-label">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="admin-input"
          style={{ minHeight: '120px' }}
          placeholder="Your AI-powered health companion transforms..."
          required
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