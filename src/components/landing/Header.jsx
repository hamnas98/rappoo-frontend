'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full  border-b" style={{ borderColor: 'var(--color-border-primary)' }}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-2.5 min-h-[95.76px]">
          {/* Logo Section */}
          <Link href="/">
            <div className="flex items-center gap-2">
            <img 
              src="/images/logo-64.svg" 
              alt="Reppoo Logo"
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-semibold leading-[33px] text-gray-900 font-[Manrope]">
              Reppoo
            </h1>
          </div>
          </Link>

          {/* Desktop Admin Login Button */}
          <div className="hidden lg:flex items-center">
            <Link href="/admin/login">
              <Button
                text="Admin login"
                text_font_size="18px"
                text_font_family="Manrope"
                text_font_weight="700"
                text_line_height="25px"
                text_text_align="center"
                text_color="#000000"
                fill_background_color="#ffffff"
                border_border="1px solid rgba(0, 0, 0, 0.07)"
                border_border_radius="26px"
                padding="12px 30px"
                className="transition-all duration-200 hover:bg-gray-50 active:bg-gray-100"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="flex lg:hidden p-2"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="lg:hidden pb-4 border-t pt-4 animate-slide-down" style={{ borderColor: 'var(--color-border-primary)' }}>
            <Link href="/admin/login" onClick={() => setMenuOpen(false)}>
              <Button
                text="Admin login"
                text_font_size="16px"
                text_font_family="Manrope"
                text_font_weight="600"
                text_line_height="22px"
                text_text_align="center"
                text_color="#000000"
                fill_background_color="#ffffff"
                border_border="1px solid rgba(0, 0, 0, 0.07)"
                border_border_radius="26px"
                padding="10px 24px"
                layout_width="full"
                className="transition-all duration-200 hover:bg-gray-50 active:bg-gray-100"
              />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;