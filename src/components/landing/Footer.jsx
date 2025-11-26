'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '60px 40px 0'
      }}>
        {/* Top Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '3rem',
          paddingBottom: '40px'
        }}>
          {/* Left Section - Logo & Description */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '425px',
            flexShrink: 0
          }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Image 
                  src="/images/logo-64.svg" 
                  alt="Reppoo Logo"
                  width={32}
                  height={32}
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

            {/* Description */}
            <p style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '160%',
              color: '#1F221E',
              fontFamily: 'Manrope, sans-serif',
              letterSpacing:'0%',
              margin: 0
            }}>
              innovative health assistant app that leverages artificial intelligence to provide personalized wellness recommendations.
            </p>

            {/* Email */}
            <a 
              href="mailto:hello@reppoo.com"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '160%',
                color: '#23262F',
                fontFamily: 'Manrope, sans-serif',
                textDecoration: 'none',
                transition: 'color 0.2s',
                letterSpacing:'0%'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#3772FF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#23262F'}
            >
              hello@reppoo.com
            </a>
          </div>

          {/* Right Section - All Links */}
          <div style={{
            display: 'flex',
            gap: '4rem',
            flexShrink: 0
          }}>
            {/* Company Links */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minWidth: '150px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: '160%',
                color: '#23262F',
                fontFamily: 'Manrope, sans-serif',
                margin: 0,
                marginBottom: '8px'
              }}>
                Company
              </h3>
              <Link 
                href="/"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '160%',
                  color: '#777E90',
                  fontFamily: 'Manrope, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#23262F'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#777E90'}
              >
                Home
              </Link>
              <Link 
                href="/early-access"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '160%',
                  color: '#777E90',
                  fontFamily: 'Manrope, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#23262F'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#777E90'}
              >
                Early Access
              </Link>
              <Link 
                href="/404"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '160%',
                  color: '#777E90',
                  fontFamily: 'Manrope, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#23262F'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#777E90'}
              >
                404
              </Link>
            </div>

            {/* App Links */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minWidth: '180px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: '160%',
                color: '#23262F',
                fontFamily: 'Manrope, sans-serif',
                margin: 0,
                marginBottom: '8px'
              }}>
                App
              </h3>
              <Link 
                href="#"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '160%',
                  color: '#777E90',
                  fontFamily: 'Manrope, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#23262F'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#777E90'}
              >
                Download For IOS
              </Link>
              <Link 
                href="#"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '160%',
                  color: '#777E90',
                  fontFamily: 'Manrope, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#23262F'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#777E90'}
              >
                Download For Android
              </Link>
            </div>

            {/* Legal Pages Links */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minWidth: '180px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: '160%',
                color: '#23262F',
                fontFamily: 'Manrope, sans-serif',
                margin: 0,
                marginBottom: '8px'
              }}>
                Legal Pages
              </h3>
              <Link 
                href="/privacy-policy"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '160%',
                  color: '#777E90',
                  fontFamily: 'Manrope, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#23262F'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#777E90'}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-conditions"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '160%',
                  color: '#777E90',
                  fontFamily: 'Manrope, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#23262F'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#777E90'}
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div style={{
          width: '100%',
          height: '1px',
          background: '#E6E8EC',
          margin: '0 0 24px 0'
        }}></div>

        {/* Bottom Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '40px',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Copyright */}
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '160%',
            color: '#777E90',
            fontFamily: 'Manrope, sans-serif',
            margin: 0
          }}>
            © Copyright Reppoo
          </p>

          {/* Social Icons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center'
          }}>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(35, 38, 47, 0.16)',
                borderRadius: '50%',
                transition: 'all 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F4F5F6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Image 
                src="/images/fb_icon.png"
                alt="Facebook"
                width={20}
                height={20}
              />
            </a>

            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(35, 38, 47, 0.16)',
                borderRadius: '50%',
                transition: 'all 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F4F5F6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Image 
                src="/images/x_icon.png"
                alt="Twitter"
                width={20}
                height={20}
              />
            </a>

            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(35, 38, 47, 0.16)',
                borderRadius: '50%',
                transition: 'all 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F4F5F6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Image 
                src="/images/insta_icon.png"
                alt="Instagram"
                width={20}
                height={20}
              />
            </a>

            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(35, 38, 47, 0.16)',
                borderRadius: '50%',
                transition: 'all 0.3s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F4F5F6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Image 
                src="/images/linkdn_icon.png"
                alt="LinkedIn"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          footer > div > div:first-child {
            flex-direction: column !important;
          }

          footer > div > div:first-child > div:last-child {
            flex-direction: column !important;
            gap: 2rem !important;
          }
        }

        @media (max-width: 768px) {
          footer > div > div:first-child > div:first-child {
            width: 100% !important;
          }
        }
      `}</style>
    </footer>
  );
}