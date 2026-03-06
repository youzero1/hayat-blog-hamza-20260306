'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PostType } from '@/types';

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  totalComments: number;
  totalCategories: number;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsRes, statsRes] = await Promise.all([
        fetch('/api/posts?limit=100&all=true'),
        fetch('/api/categories'),
      ]);

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        const allPosts: PostType[] = postsData.data || [];
        setPosts(allPosts);

        const totalComments = allPosts.reduce(
          (acc, p) => acc + (p.comments?.length || 0),
          0
        );

        if (statsRes.ok) {
          const categories = await statsRes.json();
          setStats({
            totalPosts: allPosts.length,
            publishedPosts: allPosts.filter((p) => p.isPublished).length,
            totalComments,
            totalCategories: categories.length,
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        if (stats) {
          setStats({ ...stats, totalPosts: stats.totalPosts - 1 });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-warm-900">Admin Dashboard</h1>
          <p className="text-warm-500 mt-1">Manage your blog posts and content</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          + New Post
        </Link>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Posts', value: stats.totalPosts, icon: '📝', color: 'bg-blue-50 text-blue-700 border-blue-100' },
            { label: 'Published', value: stats.publishedPosts, icon: '✅', color: 'bg-green-50 text-green-700 border-green-100' },
            { label: 'Comments', value: stats.totalComments, icon: '💬', color: 'bg-primary-50 text-primary-700 border-primary-100' },
            { label: 'Categories', value: stats.totalCategories, icon: '📂', color: 'bg-purple-50 text-purple-700 border-purple-100' },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-2xl border p-5 ${stat.color}`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-warm-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-warm-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-warm-900">All Posts</h2>
          <span className="text-sm text-warm-500">{posts.length} total</span>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary-300 border-t-primary-600 rounded-full mx-auto"></div>
            <p className="text-warm-500 mt-3">Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-warm-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wider">Author</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wider">Featured</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wider">Date</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-warm-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/posts/${post.id}`}
                        className="font-medium text-warm-800 hover:text-primary-600 transition-colors line-clamp-1 max-w-xs block"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-warm-600">{post.author}</td>
                    <td className="px-6 py-4">
                      {post.category ? (
                        <span className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-full font-medium">
                          {post.category.name}
                        </span>
                      ) : (
                        <span className="text-warm-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          post.isPublished
                            ? 'bg-green-100 text-green-700'
                            : 'bg-warm-100 text-warm-600'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${post.isPublished ? 'bg-green-500' : 'bg-warm-400'}`}></span>
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {post.isFeatured ? (
                        <span className="text-primary-500 text-lg">★</span>
                      ) : (
                        <span className="text-warm-300 text-lg">☆</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-warm-500">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
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
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-warm-700 mb-2">No posts yet</h3>
            <p className="text-warm-500 mb-4">Get started by creating your first post.</p>
            <Link
              href="/admin/posts/new"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              Create Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
