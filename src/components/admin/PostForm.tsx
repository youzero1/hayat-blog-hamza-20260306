'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/entities/Category';
import { Post } from '@/entities/Post';

interface PostFormProps {
  categories: Category[];
  post?: Post;
}

export default function PostForm({ categories, post }: PostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    categoryId: post?.categoryId?.toString() || '',
    isPublished: post?.isPublished || false,
    featuredImage: post?.featuredImage || '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const url = post ? `/api/posts/${post.id}` : '/api/posts';
      const method = post ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        router.push('/admin/posts');
        router.refresh();
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMsg(data.error || 'Failed to save post');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error');
    }
  };

  const handleDelete = async () => {
    if (!post) return;
    try {
      const res = await fetch(`/api/posts/${post.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/posts');
        router.refresh();
      }
    } catch {
      setErrorMsg('Failed to delete post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errorMsg}
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 border border-warm-100 space-y-5">
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            placeholder="Post title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
            className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 resize-none"
            placeholder="Brief description of the post..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">Content * (HTML supported)</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={15}
            className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 font-mono text-sm resize-y"
            placeholder="<h2>Introduction</h2><p>Your content here...</p>"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">Featured Image URL</label>
            <input
              type="text"
              value={formData.featuredImage}
              onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
              className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isPublished"
            checked={formData.isPublished}
            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
            className="w-4 h-4 text-primary-600 rounded"
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-warm-700">
            Publish immediately
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>

        {post && (
          <div>
            {deleteConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-warm-600">Are you sure?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(false)}
                  className="text-warm-500 px-4 py-2 rounded-full text-sm border border-warm-200 hover:bg-warm-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setDeleteConfirm(true)}
                className="text-red-600 px-4 py-2 rounded-full text-sm border border-red-200 hover:bg-red-50"
              >
                Delete Post
              </button>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
