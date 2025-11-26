'use client';

import { useState } from 'react';

export default function FAQForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    question: initialData?.question || '',
    answer: initialData?.answer || '',
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
      {/* Question */}
      <div>
        <label htmlFor="question" className="admin-label">
          Question *
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          className="admin-input"
          placeholder="What features does the AI Health Assistant offer?"
          required
        />
      </div>

      {/* Answer */}
      <div>
        <label htmlFor="answer" className="admin-label">
          Answer *
        </label>
        <textarea
          id="answer"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          className="admin-input"
          style={{ minHeight: '120px' }}
          placeholder="Our AI Health Assistant offers..."
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
              <span>{initialData ? 'Update' : 'Create'} FAQ</span>
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