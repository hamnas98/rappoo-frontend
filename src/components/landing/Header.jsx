'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
      router.push('/');
    }
  };

  const handleAvatarClick = () => {
    if (user) {
      router.push('/admin');
    }
  };

  return (
    <header style={{ 
      width: '100%', 
      borderBottom: '1px solid #F9F9F9'
    }}>
      <div style={{ 
        maxWidth: '1440px', 
        margin: '0 auto', 
        padding: '0 1rem'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          minHeight: '95.76px',
          gap: '0.625rem'
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Image 
                src="/images/logo-64.svg" 
                alt="Reppoo Logo"
                width={30}
                height={30}
                priority
              />
              <span style={{ 
                fontSize: '24px', 
                fontWeight: 600, 
                lineHeight: '33px', 
                color: '#111827',
                fontFamily: 'Manrope, sans-serif'
              }}>
                Reppoo
              </span>
            </div>
          </Link>

          {/* Desktop - User Profile or Login Button */}
          <div style={{ display: 'none' }} className="desktop-nav">
            {isAuthenticated && user ? (
              // Logged In User Profile
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* User Avatar - Clickable */}
                  <div 
                    onClick={handleAvatarClick}
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '50%', 
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <Image 
                      src="/images/user.png" 
                      alt="User Avatar"
                      width={48}
                      height={48}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  {/* User Info */}
                  <div>
                    <p style={{ 
                      fontSize: '18px', 
                      fontWeight: 600, 
                      lineHeight: '25px', 
                      color: '#111827',
                      fontFamily: 'Manrope, sans-serif',
                      margin: 0
                    }}>
                      {user.name || user.email?.split('@')[0] || 'Admin User'}
                    </p>
                    <p style={{ 
                      fontSize: '14px', 
                      fontWeight: 400, 
                      lineHeight: '19px', 
                      color: '#6B7280',
                      fontFamily: 'Manrope, sans-serif',
                      margin: 0
                    }}>
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '12px 30px',
                    background: '#FFFFFF',
                    border: '2px solid #2563EB',
                    borderRadius: '26px',
                    fontSize: '18px',
                    fontWeight: 700,
                    lineHeight: '25px',
                    color: '#2563EB',
                    fontFamily: 'Manrope, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2563EB';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.color = '#2563EB';
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              // Not Logged In - Admin Login Button
              <Link href="/admin/login" style={{ textDecoration: 'none' }}>
                <button 
                  style={{
                    padding: '12px 30px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.07)',
                    borderRadius: '26px',
                    fontSize: '18px',
                    fontWeight: 700,
                    lineHeight: '25px',
                    color: '#000000',
                    fontFamily: 'Manrope, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                >
                  Admin login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ 
              display: 'flex',
              padding: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <>
                  <path d="M3 12H21" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 6H21" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 18H21" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div 
            style={{ 
              borderTop: '1px solid #E5E7EB',
              paddingTop: '1rem',
              paddingBottom: '1rem'
            }}
            className="mobile-menu animate-slide-down"
          >
            {isAuthenticated && user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Mobile User Profile - Clickable */}
                <div 
                  onClick={handleAvatarClick}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    padding: '0.5rem',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <Image 
                      src="/images/user.png" 
                      alt="User Avatar"
                      width={40}
                      height={40}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <p style={{ 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      color: '#111827',
                      margin: 0,
                      fontFamily: 'Manrope, sans-serif'
                    }}>
                      {user.name || user.email?.split('@')[0] || 'Admin User'}
                    </p>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#6B7280',
                      margin: 0,
                      fontFamily: 'Manrope, sans-serif'
                    }}>
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Mobile Logout Button */}
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '10px 24px',
                    background: '#FFFFFF',
                    border: '2px solid #2563EB',
                    borderRadius: '26px',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#2563EB',
                    fontFamily: 'Manrope, sans-serif',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/admin/login" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    width: '100%',
                    padding: '10px 24px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.07)',
                    borderRadius: '26px',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#000000',
                    fontFamily: 'Manrope, sans-serif',
                    cursor: 'pointer'
                  }}
                >
                  Admin login
                </button>
              </Link>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}