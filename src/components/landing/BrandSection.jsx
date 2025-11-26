'use client';

import { BRAND_LOGOS } from '@/utils/constants';

export default function BrandSection() {
  return (
    <section style={{ padding: '3rem 0', background: 'white' }}>
      <div className="section-container">
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '2rem',
          opacity: 0.5
        }}>
          {BRAND_LOGOS.map((brand, index) => (
            <div
              key={index}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                filter: 'grayscale(1)',
                transition: 'filter 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0)'}
              onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(1)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', background: 'rgb(209 213 219)' }}></div>
                <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'rgb(107 114 128)' }}>
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}