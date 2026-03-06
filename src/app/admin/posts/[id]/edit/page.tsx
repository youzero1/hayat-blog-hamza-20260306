'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CategoryType, PostType } from '@/types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  const fetchPost = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts/${params.id}`);
      const data = await res.json();
      if (data.data) {
        const post: PostType = data.data;
        setForm({
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          thumbnailUrl: post.thumbnailUrl || '',
          readTime: post.readTime,
          categoryId: post.categoryId?.toString() || '',
          published: post.published,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  }, [params.id]);

  useEffect(() => {
    const auth = sessionStorage.getItem('hayat_admin');
    if (auth !== 'true') router.push('/admin');
    fetchPost();
    fetchCategories();
  }, [router, fetchPost]);

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
      const res = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          categoryId: form.categoryId ? parseInt(form.categoryId) : null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Failed to update post');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-hayat-50 flex items-center justify-center">
        <div className="text-earth-500">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hayat-50">
      <div className="bg-earth-900 text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="text-earth-400 hover:text-white transition-colors">← Admin</Link>
          <h1 className="text-xl font-bold text-hayat-300">Edit Post</h1>
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Content (HTML supported)</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={15}
                  className="w-full border border-earth-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-hayat-400 text-earth-800 font-mono text-sm"
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
                  Published
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
              {loading ? 'Saving...' : 'Save Changes'}
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
