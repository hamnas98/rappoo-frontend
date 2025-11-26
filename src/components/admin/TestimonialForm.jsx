'use client';

import { useState } from 'react';

export default function TestimonialForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    company: initialData?.company || '',
    testimonial: initialData?.testimonial || '',
    rating: initialData?.rating || 5,
    order: initialData?.order || 0,
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.type === 'number' 
        ? parseInt(e.target.value) 
        : e.target.value;
    
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
      {/* Name */}
      <div>
        <label htmlFor="name" className="admin-label">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="admin-input"
          placeholder="Ava L."
          required
        />
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="admin-label">
          Role
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="admin-input"
          placeholder="Marketing Executive"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="admin-label">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="admin-input"
          placeholder="AI Wellness Journeys"
        />
      </div>

      {/* Testimonial */}
      <div>
        <label htmlFor="testimonial" className="admin-label">
          Testimonial *
        </label>
        <textarea
          id="testimonial"
          name="testimonial"
          value={formData.testimonial}
          onChange={handleChange}
          className="admin-input"
          style={{ minHeight: '120px' }}
          placeholder="I've tried countless health apps..."
          required
        />
      </div>

      {/* Rating */}
      <div>
        <label htmlFor="rating" className="admin-label">
          Rating (1-5) *
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          className="admin-input"
          required
        />
      </div>

      {/* Order */}
      <div>
        <label htmlFor="order" className="admin-label">
          Display Order
        </label>
        <input
          type="number"
          id="order"
          name="order"
          value={formData.order}
          onChange={handleChange}
          className="admin-input"
          placeholder="0"
        />
      </div>

      {/* Is Active */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          style={{ width: '1rem', height: '1rem' }}
        />
        <label htmlFor="isActive" className="admin-label" style={{ marginBottom: 0 }}>
          Active (visible on website)
        </label>
      </div>

      {/* Submit Buttons */}
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
              <span>{initialData ? 'Update' : 'Create'} Testimonial</span>
            </>
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="admin-btn admin-btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}