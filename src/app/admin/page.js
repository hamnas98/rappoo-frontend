'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { testimonialsAPI, faqAPI } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    testimonials: 0,
    faqs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [testimonialsRes, faqsRes] = await Promise.all([
        testimonialsAPI.getAll(),
        faqAPI.getAll(),
      ]);
      
      setStats({
        testimonials: testimonialsRes.data.data.length,
        faqs: faqsRes.data.data.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Hero Section',
      value: '1',
      href: '/admin/hero',
      icon: '🎨',
      color: '#3772FF',
      bgColor: '#F0F5FF'
    },
    {
      label: 'About Section',
      value: '1',
      href: '/admin/about',
      icon: 'ℹ️',
      color: '#10B981',
      bgColor: '#F0FDF4'
    },
    {
      label: 'Testimonials',
      value: stats.testimonials,
      href: '/admin/testimonials',
      icon: '💬',
      color: '#F59E0B',
      bgColor: '#FFFBEB'
    },
    {
      label: 'FAQs',
      value: stats.faqs,
      href: '/admin/faq',
      icon: '❓',
      color: '#8B5CF6',
      bgColor: '#F5F3FF'
    },
  ];

  return (
    <div style={{ 
      padding: '2.5rem',
      fontFamily: 'Manrope, sans-serif'
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
          Dashboard
        </h1>
        <p style={{ 
          fontSize: '16px',
          color: '#777E90',
          lineHeight: '160%'
        }}>
          Welcome back! Here's what's happening with your content.
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #E5E7EB',
            borderTopColor: '#3772FF',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {statCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              style={{ textDecoration: 'none' }}
            >
              <div 
                style={{ 
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '1.75rem',
                  border: '1px solid #E6E8EC',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = card.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#E6E8EC';
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: card.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '1.25rem'
                }}>
                  {card.icon}
                </div>
                <p style={{ 
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#777E90',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase'
                }}>
                  {card.label}
                </p>
                <p style={{ 
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#23262F',
                  letterSpacing: '-0.02em',
                  margin: 0
                }}>
                  {card.value}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid #E6E8EC'
      }}>
        <h2 style={{ 
          fontSize: '20px',
          fontWeight: 600,
          color: '#23262F',
          marginBottom: '1.5rem',
          letterSpacing: '-0.01em'
        }}>
          Quick Actions
        </h2>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <Link
            href="/admin/testimonials"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem 1.5rem',
              background: '#3772FF',
              color: '#FFFFFF',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2451CC';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3772FF';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>➕</span>
            Add Testimonial
          </Link>

          <Link
            href="/admin/faq"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem 1.5rem',
              background: '#FFFFFF',
              color: '#23262F',
              border: '1px solid #E6E8EC',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F4F5F6';
              e.currentTarget.style.borderColor = '#3772FF';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#E6E8EC';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>➕</span>
            Add FAQ
          </Link>

          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem 1.5rem',
              background: '#FFFFFF',
              color: '#23262F',
              border: '1px solid #E6E8EC',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F4F5F6';
              e.currentTarget.style.borderColor = '#3772FF';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#E6E8EC';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>🌐</span>
            View Website
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}