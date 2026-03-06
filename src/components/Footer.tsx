import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-white text-lg font-bold" style={{ fontFamily: 'Georgia, serif' }}>Hayat Blog</span>
            </Link>
            <p className="text-warm-400 text-sm leading-relaxed max-w-sm">
              Your daily source of inspiration for lifestyle, technology, fashion, health, and home living.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/products', label: 'Products' },
                { href: '/categories', label: 'Categories' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Info</h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/admin', label: 'Admin' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-800 mt-8 pt-8 text-center">
          <p className="text-warm-500 text-sm">
            © {new Date().getFullYear()} Hayat Blog. Made with ❤️ for the love of life.
          </p>
        </div>
      </div>
    </footer>
  );
}
