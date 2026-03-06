'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              pathname === link.href
                ? 'bg-forest-50 text-forest-700 font-semibold'
                : 'text-gray-600 hover:text-forest-700 hover:bg-forest-50'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden z-50">
          <nav className="container-custom py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'bg-forest-50 text-forest-700 font-semibold'
                    : 'text-gray-600 hover:text-forest-700 hover:bg-forest-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
