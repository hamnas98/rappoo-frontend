'use client';

import Image from 'next/image';

export default function BrandSection() {
  const brandLogos = [
    { src: '/images/brand_logo1.png', alt: 'Brand 1' },
    { src: '/images/brand_logo2.png', alt: 'Brand 2' },
    { src: '/images/brand_logo3.png', alt: 'Brand 3' },
    { src: '/images/brand_logo4.png', alt: 'Brand 4' },
    { src: '/images/brand_logo5.png', alt: 'Brand 5' }
  ];

  return (
    <section style={{
      width: '100%',
      height: '176px',
      background: '#FCFCFD',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 1rem',
        gap: '2rem'
      }}>
        {brandLogos.map((logo, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              height: '40px',
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.6,
              transition: 'opacity 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.6';
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={40}
              style={{
                objectFit: 'contain',
                maxWidth: '100%',
                height: 'auto'
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section {
            height: auto !important;
            padding: 2rem 0 !important;
          }
          
          section > div {
            flex-wrap: wrap !important;
            height: auto !important;
            gap: 1.5rem !important;
          }
          
          section > div > div {
            flex: 1 1 45% !important;
            min-width: 120px !important;
          }
        }
      `}</style>
    </section>
  );
}