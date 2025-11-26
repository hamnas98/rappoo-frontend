'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { testimonialsAPI, faqAPI } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    testimonials: 0,
    faqs: 0,
  });

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
    }
  };

  const statCards = [
    {
      label: 'Hero Section',
      value: '1',
      href: '/admin/hero',
      icon: (
        <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      color: '#2563EB',
    },
    {
      label: 'About Section',
      value: '1',
      href: '/admin/about',
      icon: (
        <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#10B981',
    },
    {
      label: 'Testimonials',
      value: stats.testimonials,
      href: '/admin/testimonials',
      icon: (
        <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: '#F59E0B',
    },
    {
      label: 'FAQs',
      value: stats.faqs,
      href: '/admin/faq',
      icon: (
        <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#8B5CF6',
    },
  ];

  const quickActions = [
    { label: 'Add Testimonial', href: '/admin/testimonials', icon: '➕' },
    { label: 'Add FAQ', href: '/admin/faq', icon: '➕' },
    { label: 'View Website', href: '/', icon: '🌐' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Welcome back! Manage your content from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2rem' }} className="stats-grid">
        {statCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            style={{ textDecoration: 'none' }}
          >
            <div 
              className="admin-card" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ 
                width: '4rem', 
                height: '4rem', 
                borderRadius: '0.75rem', 
                background: `${card.color}15`,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: card.color
              }}>
                {card.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
                  {card.label}
                </p>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {card.value}
                </p>
              </div>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: 'var(--color-text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="admin-btn admin-btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
              target={action.href === '/' ? '_blank' : undefined}
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}