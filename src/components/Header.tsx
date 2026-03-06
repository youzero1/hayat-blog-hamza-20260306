'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Articles' },
  { href: '/categories/technology', label: 'Technology' },
  { href: '/categories/travel', label: 'Travel' },
  { href: '/categories/lifestyle', label: 'Lifestyle' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-hayat-600 to-hayat-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-bold text-xl text-earth-900">
              <span className="text-hayat-600">Hayat</span> Blog
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-hayat-50 text-hayat-600'
                    : 'text-earth-600 hover:bg-earth-50 hover:text-earth-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-sm font-medium text-earth-400 hover:text-earth-600 transition-colors"
            >
              Admin
            </Link>
            <Link
              href="/blog"
              className="bg-hayat-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-hayat-700 transition-colors"
            >
              Read Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-earth-600 hover:bg-earth-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-earth-100 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-hayat-50 text-hayat-600'
                  : 'text-earth-600 hover:bg-earth-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-earth-400 hover:bg-earth-50"
          >
            Admin Panel
          </Link>
        </div>
      )}
    </header>
  );
}
