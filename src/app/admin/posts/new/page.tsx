'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CategoryType } from '@/types';

export default function NewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    author: '',
    categoryId: '',
    isFeatured: false,
    isPublished: true,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) setCategories(await res.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          categoryId: form.categoryId ? parseInt(form.categoryId) : null,
        }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create post');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="text-warm-500 hover:text-warm-700 transition-colors">
          ← Back to Admin
        </Link>
        <h1 className="text-2xl font-serif font-bold text-warm-900">Create New Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6 space-y-5">
          <h2 className="text-lg font-bold text-warm-800 border-b border-warm-100 pb-3">Post Details</h2>

          <div>
            <label className="block text-sm font-semibold text-warm-700 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter post title..."
              className="w-full border border-warm-300 rounded-xl px-4 py-2.5 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-warm-700 mb-2">Author *</label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              placeholder="Author name..."
              className="w-full border border-warm-300 rounded-xl px-4 py-2.5 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-warm-700 mb-2">Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full border border-warm-300 rounded-xl px-4 py-2.5 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white"
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-warm-700 mb-2">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-warm-300 rounded-xl px-4 py-2.5 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-warm-700 mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={3}
              maxLength={300}
              placeholder="Brief summary of the post (max 300 characters)..."
              className="w-full border border-warm-300 rounded-xl px-4 py-2.5 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
            />
            <p className="text-xs text-warm-400 mt-1">{form.excerpt.length}/300 characters</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-warm-700 mb-2">Content *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={16}
              placeholder="Write your post content here (HTML supported)..."
              className="w-full border border-warm-300 rounded-xl px-4 py-2.5 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent font-mono text-sm resize-y"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${form.isFeatured ? 'bg-primary-500' : 'bg-warm-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mt-1 ml-1 ${form.isFeatured ? 'translate-x-4' : ''}`}></div>
                </div>
              </div>
              <span className="text-sm font-medium text-warm-700">Featured Post</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${form.isPublished ? 'bg-green-500' : 'bg-warm-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mt-1 ml-1 ${form.isPublished ? 'translate-x-4' : ''}`}></div>
                </div>
              </div>
              <span className="text-sm font-medium text-warm-700">Published</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin"
            className="px-6 py-2.5 border border-warm-300 text-warm-700 rounded-xl font-medium hover:bg-warm-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-2.5 rounded-xl font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-md"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
