import Link from 'next/link';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-warm-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-warm-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-warm-900" style={{ fontFamily: 'Georgia, serif' }}>
              Hayat Blog
            </span>
          </Link>

          <Navbar />
        </div>
      </div>
    </header>
  );
}
