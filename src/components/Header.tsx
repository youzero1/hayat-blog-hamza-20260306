import Link from 'next/link';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌿</span>
            <div>
              <span className="text-xl font-serif font-bold text-forest-800 group-hover:text-forest-600 transition-colors">
                Hayat
              </span>
              <span className="text-xl font-serif font-light text-gold-600 ml-1">
                Blog
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <Navbar />
        </div>
      </div>
    </header>
  );
}
