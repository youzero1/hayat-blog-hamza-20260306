import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warm-900 text-warm-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-warm-700">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold">H</span>
              </div>
              <span className="text-lg font-serif font-bold text-white">Hayat Blog</span>
            </div>
            <p className="text-warm-400 text-sm leading-relaxed max-w-sm">
              A modern blog platform celebrating the richness of human experience.
              &quot;Hayat&quot; means life in Arabic — and that\'s what we write about.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-warm-500 hover:text-warm-200 text-sm transition-colors px-2 py-1 rounded hover:bg-warm-800"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/posts', label: 'All Posts' },
                { href: '/categories', label: 'Categories' },
                { href: '/about', label: 'About Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-400 hover:text-warm-200 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Topics</h3>
            <ul className="space-y-2">
              {[
                { slug: 'technology', name: 'Technology' },
                { slug: 'lifestyle', name: 'Lifestyle' },
                { slug: 'travel', name: 'Travel' },
                { slug: 'food-recipes', name: 'Food & Recipes' },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-warm-400 hover:text-warm-200 text-sm transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-warm-500 text-sm">
            © {currentYear} Hayat Blog. All rights reserved.
          </p>
          <p className="text-warm-600 text-xs">
            Built with Next.js & TypeORM
          </p>
        </div>
      </div>
    </footer>
  );
}
