import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Hayat Blog — Live Better Every Day',
    template: '%s | Hayat Blog',
  },
  description: 'Hayat Blog is your guide to living a fuller, healthier, and more intentional life. Explore articles on lifestyle, health, travel, food, and technology.',
  keywords: ['lifestyle', 'health', 'travel', 'food', 'technology', 'wellness', 'blog'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Hayat Blog',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
