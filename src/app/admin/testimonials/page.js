'use client';

import { useEffect, useState } from 'react';
import { testimonialsAPI } from '@/lib/api';
import TestimonialForm from '@/components/admin/TestimonialForm';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsAPI.getAll();
      setTestimonials(response.data.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setMessage({ type: 'error', text: 'Failed to load testimonials' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      if (editingTestimonial) {
        await testimonialsAPI.update(editingTestimonial._id, formData);
        setMessage({ type: 'success', text: 'Testimonial updated successfully!' });
      } else {
        await testimonialsAPI.create(formData);
        setMessage({ type: 'success', text: 'Testimonial created successfully!' });
      }
      
      fetchTestimonials();
      setShowForm(false);
      setEditingTestimonial(null);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to save testimonial' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await testimonialsAPI.delete(id);
      setMessage({ type: 'success', text: 'Testimonial deleted successfully!' });
      fetchTestimonials();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to delete testimonial' 
      });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTestimonial(null);
    setMessage({ type: '', text: '' });
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
            Testimonials
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Manage customer testimonials
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="admin-btn admin-btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Testimonial</span>
          </button>
        )}
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
      {showForm && (
        <div className="admin-card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
            {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <TestimonialForm
            initialData={editingTestimonial}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={saving}
          />
        </div>
      )}

      {/* List */}
      {!showForm && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {testimonials.length === 0 ? (
            <div className="admin-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--color-text-secondary)' }}>No testimonials yet. Add your first one!</p>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <div key={testimonial._id} className="admin-card">
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '9999px', background: 'linear-gradient(to bottom right, rgb(251 146 60), rgb(251 191 36))', flexShrink: 0 }}></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '0.5rem', gap: '1rem' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {testimonial.name}
                          {testimonial.role && `, ${testimonial.role}`}
                        </h3>
                        {testimonial.company && (
                          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                            {testimonial.company}
                          </p>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: '0.5rem' }}
                          title="Edit"
                        >
                          <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial._id)}
                          className="admin-btn admin-btn-danger"
                          style={{ padding: '0.5rem' }}
                          title="Delete"
                        >
                          <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                      "{testimonial.testimonial}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            style={{ width: '1rem', height: '1rem', color: i < testimonial.rating ? 'rgb(251 191 36)' : 'rgb(209 213 219)' }}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '0.25rem',
                        background: testimonial.isActive ? 'rgb(220 252 231)' : 'rgb(254 226 226)',
                        color: testimonial.isActive ? 'rgb(22 101 52)' : 'rgb(220 38 38)'
                      }}>
                        {testimonial.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        Order: {testimonial.order}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}