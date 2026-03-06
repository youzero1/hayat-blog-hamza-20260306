'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CategoryType } from '@/types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function NewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    thumbnailUrl: '',
    readTime: 5,
    categoryId: '',
    published: false,
  });

  useEffect(() => {
    const auth = sessionStorage.getItem('hayat_admin');
    if (auth !== 'true') router.push('/admin');
    fetchCategories();
  }, [router]);

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data.data || []);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, slug: slugify(title) }));
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
          authorId: 1,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Failed to create post');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hayat-50">
      <div className="bg-earth-900 text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="text-earth-400 hover:text-white transition-colors">← Admin</Link>
          <h1 className="text-xl font-bold text-hayat-300">New Post</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-earth-800 mb-4">Post Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={handleTitleChange}
                  className="w-full border border-earth-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-hayat-400 text-earth-800"
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full border border-earth-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-hayat-400 text-earth-800 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Excerpt *</label>
                <textarea
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full border border-earth-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-hayat-400 text-earth-800"
                  placeholder="Brief description of the post"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Content * (HTML supported)</label>
                <textarea
                  required
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={15}
                  className="w-full border border-earth-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-hayat-400 text-earth-800 font-mono text-sm"
                  placeholder="<h2>Introduction</h2><p>Your content here...</p>"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-earth-800 mb-4">Post Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Thumbnail URL</label>
                <input
                  type="url"
                  value={form.thumbnailUrl}
                  onChange={(e) => setForm((f) => ({ ...f, thumbnailUrl: e.target.value }))}
                  className="w-full border border-earth-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-hayat-400 text-earth-800"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Read Time (minutes)</label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={form.readTime}
                  onChange={(e) => setForm((f) => ({ ...f, readTime: parseInt(e.target.value) }))}
                  className="w-full border border-earth-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-hayat-400 text-earth-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Category</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                  className="w-full border border-earth-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-hayat-400 text-earth-800"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4 text-hayat-600"
                />
                <label htmlFor="published" className="text-sm font-medium text-earth-700">
                  Publish immediately
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-hayat-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-hayat-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
            <Link
              href="/admin"
              className="bg-earth-100 text-earth-700 font-semibold px-8 py-3 rounded-lg hover:bg-earth-200 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
