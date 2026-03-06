import { Suspense } from 'react';
import type { Metadata } from 'next';
import BlogListContent from './BlogListContent';

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse all articles on Hayat Blog – stories about technology, lifestyle, travel, food, health, and business.',
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; search?: string; sort?: string };
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-hayat-50 flex items-center justify-center"><div className="text-earth-500 text-xl">Loading articles...</div></div>}>
      <BlogListContent searchParams={searchParams} />
    </Suspense>
  );
}
