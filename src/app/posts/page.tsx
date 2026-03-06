'use client';

import { useState, useEffect, useCallback } from 'react';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import CategoryBadge from '@/components/CategoryBadge';
import { PostType, CategoryType } from '@/types';

export default function PostsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '9');
      if (search) params.set('search', search);
      if (selectedCategory) params.set('category', selectedCategory);

      const res = await fetch(`/api/posts?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.data || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryFilter = (slug: string) => {
    setSelectedCategory(slug === selectedCategory ? '' : slug);
    setPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-warm-900 mb-4">All Posts</h1>
        <p className="text-warm-500 text-lg max-w-xl mx-auto">
          Explore our collection of articles, stories, and guides.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} initialValue={search} />
          </div>
        </div>
        {categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryFilter('')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !selectedCategory
                  ? 'bg-warm-900 text-white'
                  : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryFilter(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-primary-500 text-white'
                    : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-warm-500 text-sm mb-6">
          {total > 0 ? `Showing ${posts.length} of ${total} posts` : 'No posts found'}
          {search && <span> for &quot;{search}&quot;</span>}
          {selectedCategory && (
            <span> in &quot;{categories.find(c => c.slug === selectedCategory)?.name}&quot;</span>
          )}
        </p>
      )}

      {/* Posts Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-warm-200 overflow-hidden animate-pulse">
              <div className="h-48 bg-warm-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-warm-200 rounded w-1/4"></div>
                <div className="h-6 bg-warm-200 rounded w-3/4"></div>
                <div className="h-4 bg-warm-200 rounded"></div>
                <div className="h-4 bg-warm-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-warm-700 mb-2">No posts found</h3>
          <p className="text-warm-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
