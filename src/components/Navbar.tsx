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
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === link.href
                ? 'bg-primary-50 text-primary-600'
                : 'text-warm-600 hover:text-warm-900 hover:bg-warm-50'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/admin"
          className="ml-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          Admin
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-warm-600"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="space-y-1.5">
          <span className={`block w-6 h-0.5 bg-warm-600 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-warm-600 transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-warm-600 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-warm-100 shadow-lg md:hidden">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-warm-600 hover:bg-warm-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="mt-2 bg-primary-600 text-white px-4 py-3 rounded-lg text-sm font-medium text-center"
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
