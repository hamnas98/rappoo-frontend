'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      
      if (!authenticated && pathname !== '/admin/login') {
        // Not authenticated and not on login page -> redirect to login
        router.push('/admin/login');
      } else if (authenticated && pathname === '/admin/login') {
        // Authenticated but on login page -> redirect to dashboard
        router.push('/admin');
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-background)' }}>
        <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  // Login page - no sidebar
  if (pathname === '/admin/login') {
    return children;
  }

  // Admin pages - with sidebar
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-background)' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </main>
    </div>
  );
}