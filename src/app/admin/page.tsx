'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PostType, CategoryType } from '@/types';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<PostType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, views: 0 });

  useEffect(() => {
    const auth = sessionStorage.getItem('hayat_admin');
    if (auth === 'true') {
      setAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsRes, catsRes] = await Promise.all([
        fetch('/api/posts?limit=100'),
        fetch('/api/categories'),
      ]);
      const postsData = await postsRes.json();
      const catsData = await catsRes.json();
      const allPosts: PostType[] = postsData.data || [];
      setPosts(allPosts);
      setCategories(catsData.data || []);
      setStats({
        total: allPosts.length,
        published: allPosts.filter((p) => p.published).length,
        drafts: allPosts.filter((p) => !p.published).length,
        views: allPosts.reduce((sum, p) => sum + p.views, 0),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('hayat_admin', 'true');
        setAuthenticated(true);
        fetchData();
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const togglePublish = async (post: PostType) => {
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, published: !post.published }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-hayat-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-earth-900">Admin Login</h1>
            <p className="text-earth-500 mt-2">Enter your admin password to continue</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-earth-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-earth-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-hayat-400"
                placeholder="Enter admin password"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-hayat-600 text-white font-semibold py-3 rounded-lg hover:bg-hayat-700 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-center text-earth-400 text-xs mt-4">Default password: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hayat-50">
      {/* Admin Header */}
      <div className="bg-earth-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-hayat-400 font-bold text-xl">⚙️ Admin Panel</span>
            <span className="text-earth-400 text-sm">Hayat Blog</span>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/posts/new"
              className="bg-hayat-600 hover:bg-hayat-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              + New Post
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem('hayat_admin');
                setAuthenticated(false);
              }}
              className="text-earth-400 hover:text-white text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Posts', value: stats.total, icon: '📄', color: 'bg-blue-50 text-blue-700' },
            { label: 'Published', value: stats.published, icon: '✅', color: 'bg-green-50 text-green-700' },
            { label: 'Drafts', value: stats.drafts, icon: '📝', color: 'bg-yellow-50 text-yellow-700' },
            { label: 'Total Views', value: stats.views.toLocaleString(), icon: '👁️', color: 'bg-purple-50 text-purple-700' },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-earth-100 flex items-center justify-between">
            <h2 className="font-bold text-earth-800 text-lg">All Posts</h2>
            <Link
              href="/admin/posts/new"
              className="text-sm text-hayat-600 hover:text-hayat-700 font-medium"
            >
              + Add New
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-earth-500">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-earth-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-earth-500 font-medium">Title</th>
                    <th className="text-left px-6 py-3 text-earth-500 font-medium">Category</th>
                    <th className="text-left px-6 py-3 text-earth-500 font-medium">Status</th>
                    <th className="text-left px-6 py-3 text-earth-500 font-medium">Views</th>
                    <th className="text-left px-6 py-3 text-earth-500 font-medium">Date</th>
                    <th className="text-left px-6 py-3 text-earth-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth-50">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-earth-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-earth-800 line-clamp-1 max-w-xs">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 text-earth-500">{post.category?.name || '—'}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublish(post)}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.published
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          } transition-colors`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-earth-500">{post.views.toLocaleString()}</td>
                      <td className="px-6 py-4 text-earth-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-earth-400 hover:text-earth-600 transition-colors"
                            title="View"
                          >
                            👁️
                          </Link>
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="text-blue-500 hover:text-blue-700 transition-colors text-sm font-medium"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-400 hover:text-red-600 transition-colors text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-earth-100">
            <h2 className="font-bold text-earth-800 text-lg">Categories</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-earth-50 rounded-lg p-3 text-center">
                  <div className="font-medium text-earth-700 text-sm">{cat.name}</div>
                  <div className="text-earth-400 text-xs mt-0.5">{cat.slug}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
