import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-serif font-bold">
                Hayat <span className="text-gold-400">Blog</span>
              </span>
            </div>
            <p className="text-forest-300 leading-relaxed max-w-sm">
              Your guide to a fuller, healthier, and more intentional life. <em>Hayat</em> means life — and we're here to help you live it fully.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-gold-400">Explore</h3>
            <ul className="space-y-2">
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/products', label: 'Products' },
                { href: '/categories', label: 'Categories' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-forest-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-gold-400">Categories</h3>
            <ul className="space-y-2">
              {[
                { href: '/categories/lifestyle', label: '🌿 Lifestyle' },
                { href: '/categories/health-wellness', label: '💚 Health' },
                { href: '/categories/travel', label: '✈️ Travel' },
                { href: '/categories/food-recipes', label: '🍽️ Food' },
                { href: '/categories/technology', label: '💻 Tech' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-forest-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-forest-400 text-sm">
            © {currentYear} Hayat Blog. All rights reserved.
          </p>
          <p className="text-forest-400 text-sm">
            Built with ❤️ for better living
          </p>
        </div>
      </div>
    </footer>
  );
}
