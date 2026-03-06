'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostType, CategoryType } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-700',
  lifestyle: 'bg-purple-100 text-purple-700',
  travel: 'bg-green-100 text-green-700',
  food: 'bg-orange-100 text-orange-700',
  health: 'bg-red-100 text-red-700',
  business: 'bg-yellow-100 text-yellow-700',
};

interface BlogListProps {
  searchParams: { page?: string; category?: string; search?: string; sort?: string };
}

export default function BlogListContent({ searchParams }: BlogListProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const page = parseInt(searchParams.page || '1');
  const categoryFilter = searchParams.category || '';
  const search = searchParams.search || '';
  const sort = searchParams.sort || 'newest';

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
        published: 'true',
        ...(categoryFilter && { category: categoryFilter }),
        ...(search && { search }),
        ...(sort && { sort }),
      });
      const res = await fetch(`/api/posts?${params}`);
      const data = await res.json();
      setPosts(data.data || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, categoryFilter, search, sort]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const updateQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams({
      ...(categoryFilter && { category: categoryFilter }),
      ...(search && { search }),
      ...(sort && { sort }),
      page: '1',
      ...updates,
    });
    // Remove empty params
    for (const [key, value] of Array.from(params.entries())) {
      if (!value) params.delete(key);
    }
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-hayat-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-hayat-700 to-hayat-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">All Articles</h1>
          <p className="text-hayat-200">
            {total > 0 ? `${total} stories waiting to be explored` : 'Explore our collection of stories'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-48">
            <input
              type="text"
              placeholder="Search articles..."
              defaultValue={search}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateQuery({ search: (e.target as HTMLInputElement).value });
                }
              }}
              className="w-full border border-earth-200 rounded-lg px-4 py-2 text-sm text-earth-800 focus:outline-none focus:ring-2 focus:ring-hayat-400"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => updateQuery({ category: e.target.value })}
            className="border border-earth-200 rounded-lg px-4 py-2 text-sm text-earth-800 focus:outline-none focus:ring-2 focus:ring-hayat-400"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => updateQuery({ sort: e.target.value })}
            className="border border-earth-200 rounded-lg px-4 py-2 text-sm text-earth-800 focus:outline-none focus:ring-2 focus:ring-hayat-400"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>

          {(categoryFilter || search) && (
            <button
              onClick={() => router.push('/blog')}
              className="text-sm text-hayat-600 hover:text-hayat-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => updateQuery({ category: '' })}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !categoryFilter
                ? 'bg-hayat-600 text-white'
                : 'bg-white text-earth-600 hover:bg-hayat-50 border border-earth-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateQuery({ category: cat.slug })}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                categoryFilter === cat.slug
                  ? 'bg-hayat-600 text-white'
                  : 'bg-white text-earth-600 hover:bg-hayat-50 border border-earth-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-earth-200" />
                <div className="p-5">
                  <div className="h-4 bg-earth-200 rounded mb-2" />
                  <div className="h-4 bg-earth-200 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-earth-100 rounded mb-1" />
                  <div className="h-3 bg-earth-100 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-earth-700 mb-2">No articles found</h3>
            <p className="text-earth-500">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              onClick={() => updateQuery({ page: Math.max(1, page - 1).toString() })}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-earth-200 text-earth-600 hover:bg-earth-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => updateQuery({ page: p.toString() })}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  p === page
                    ? 'bg-hayat-600 text-white border-hayat-600'
                    : 'border-earth-200 text-earth-600 hover:bg-earth-50'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => updateQuery({ page: Math.min(totalPages, page + 1).toString() })}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-earth-200 text-earth-600 hover:bg-earth-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: PostType }) {
  const categorySlug = post.category?.slug || '';
  const colorClass = categoryColors[categorySlug] || 'bg-gray-100 text-gray-700';

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-white rounded-xl overflow-hidden shadow-sm blog-card-hover cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden">
          <Image
            src={post.thumbnailUrl || 'https://picsum.photos/seed/default/400/250'}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          {post.category && (
            <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
              {post.category.name}
            </span>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-earth-900 text-lg leading-snug mb-2 line-clamp-2 hover:text-hayat-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-earth-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-earth-400 border-t border-earth-100 pt-3">
            <div className="flex items-center gap-2">
              <Image
                src={post.author?.avatarUrl || 'https://picsum.photos/seed/avatar/32/32'}
                alt={post.author?.name || 'Author'}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-medium text-earth-600">{post.author?.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{post.readTime} min</span>
              <span>·</span>
              <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
