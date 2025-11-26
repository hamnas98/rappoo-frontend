'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { token, user } = response.data.data;

      setToken(token);
      setUser(user);

      router.push('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: '3rem', height: '3rem', background: 'var(--color-primary)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1.5rem' }}>R</span>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Rappoo</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Admin Login</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Sign in to manage your content</p>
        </div>

        <div className="admin-card">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {error && (
              <div style={{ padding: '1rem', background: 'rgb(254 242 242)', border: '1px solid rgb(254 226 226)', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'rgb(220 38 38)' }}>{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="admin-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="admin-input"
                placeholder="admin@rappoo.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="admin-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="admin-input"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="admin-btn admin-btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem' }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ borderColor: 'white', borderTopColor: 'transparent' }}></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgb(239 246 255)', border: '1px solid rgb(191 219 254)', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgb(30 64 175)', fontWeight: 500, marginBottom: '0.5rem' }}>Default Credentials:</p>
            <p style={{ fontSize: '0.75rem', color: 'rgb(37 99 235)' }}>Email: admin@rappoo.com</p>
            <p style={{ fontSize: '0.75rem', color: 'rgb(37 99 235)' }}>Password: Admin@123</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/" style={{ fontSize: '0.875rem', color: 'var(--color-primary)', textDecoration: 'none' }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}