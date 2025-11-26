'use client';

import Image from 'next/image';

export default function CTA() {
  return (
    <section style={{ 
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 40px'
    }}>
      {/* Background Shape */}
      <div style={{ 
        position: 'absolute',
        top: -100,
        left: 10,
        right: 10,
        height: '50%',
        zIndex: 0
      }}>
        <Image 
          src="/images/Group_1171275470.svg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          priority
        />
      </div>


      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1440px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem'
      }}>
        {/* Floating Icons - Top Left */}
        <div style={{
          position: 'absolute',
          top: '135px',
          left: '199px',
          width: '100px',
          height: '100px',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
        }}
        className="floating-icon">
          <Image 
            src="/images/Icon_Four.png"
            alt=""
            width={48}
            height={48}
          />
        </div>

        {/* Floating Icons - Top Right */}
        <div style={{
          position: 'absolute',
          top: '135px',
          right: '199px',
          width: '100px',
          height: '100px',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
        }}
        className="floating-icon">
          <Image 
            src="/images/Icon Two.png"
            alt=""
            width={48}
            height={48}
          />
        </div>

        {/* Floating Icons - Bottom Left */}
        <div style={{
          position: 'absolute',
          bottom: '135px',
          left: '199px',
          width: '100px',
          height: '100px',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
        }}
        className="floating-icon">
          <Image 
            src="/images/Icon Three.png"
            alt=""
            width={48}
            height={48}
          />
        </div>

        {/* Floating Icons - Bottom Right */}
        <div style={{
          position: 'absolute',
          bottom: '135px',
          right: '199px',
          width: '100px',
          height: '100px',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
        }}
        className="floating-icon">
          <Image 
            src="/images/Icon One.png"
            alt=""
            width={48}
            height={48}
          />
        </div>

        {/* Content Section */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          maxWidth: '900px',
          width: '100%',
          textAlign: 'center',
          paddingTop: '4rem',
          paddingBottom: '4rem'
        }}>
          
          {/* Special Launch Offer Label */}
          <p style={{
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '170%',
            letterSpacing: '0px',
            color: '#23262F',
            fontFamily: 'Manrope, sans-serif',
            textTransform: 'uppercase',
            margin: 0
          }}>
            SPECIAL LAUNCH OFFER
          </p>

          {/* Main Heading */}
          <h2 style={{
            fontSize: '64px',
            fontWeight: 500,
            lineHeight: '110%',
            letterSpacing: '-0.03em',
            color: '#23262F',
            fontFamily: 'Manrope, sans-serif',
            margin: 0,
            maxWidth: '850px'
          }}>
            Your journey to better health starts now
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '160%',
            letterSpacing: '-0.012em',
            color: '#777E90',
            fontFamily: 'Manrope, sans-serif',
            margin: 0,
            maxWidth: '700px'
          }}>
            Get 50% off your first 3 months when you start your trial today!
          </p>
          {/* Download Buttons */}
          <div style={{ 
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {/* Apple Download Button */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '14px 28px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '94.27px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Image 
                src="/images/appleLogo.png"
                alt="Apple"
                width={24}
                height={24}
              />
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '22px',
                color: '#111827',
                fontFamily: 'Manrope, sans-serif'
              }}>
                Download
              </span>
            </button>

            {/* Google Play Download Button */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '14px 28px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '94.27px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Image 
                src="/images/playlogo.png"
                alt="Google Play"
                width={24}
                height={24}
              />
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '22px',
                color: '#111827',
                fontFamily: 'Manrope, sans-serif'
              }}>
                Download
              </span>
            </button>
          </div>

        </div>
      </div>

      <style jsx>{`
     

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @media (max-width: 1200px) {
          .floating-icon {
            display: none !important;
          }
        }

        @media (max-width: 1024px) {
          h2 {
            font-size: 48px !important;
          }
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 36px !important;
          }

          p {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
