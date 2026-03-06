'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/admin', label: 'Admin' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-white font-serif font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-serif font-bold text-warm-900">
              Hayat <span className="text-primary-600">Blog</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-warm-600 hover:text-warm-900 hover:bg-warm-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-warm-600 hover:text-warm-900 hover:bg-warm-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-warm-200 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-warm-600 hover:text-warm-900 hover:bg-warm-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
