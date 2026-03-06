import Link from 'next/link';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const ds = await getDataSource();
  const postRepo = ds.getRepository(Post);

  const posts = await postRepo.find({
    relations: ['category'],
    order: { createdAt: 'DESC' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-warm-900">Posts</h1>
          <p className="text-warm-500">{posts.length} total posts</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin" className="text-warm-600 hover:text-warm-800 px-4 py-2">
            ← Dashboard
          </Link>
          <Link
            href="/admin/posts/new"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700"
          >
            + New Post
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-warm-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-warm-50 border-b border-warm-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-warm-700">Title</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-warm-700">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-warm-700">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-warm-700">Created</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-warm-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-warm-50 hover:bg-warm-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-warm-900 max-w-xs truncate">{post.title}</div>
                  <div className="text-xs text-warm-400">/blog/{post.slug}</div>
                </td>
                <td className="px-6 py-4 text-sm text-warm-600">
                  {post.category?.name || '—'}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    post.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-warm-500">
                  {formatDate(post.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link href={`/admin/posts/${post.id}`} className="text-primary-600 hover:underline text-sm">Edit</Link>
                    {post.isPublished && (
                      <Link href={`/blog/${post.slug}`} target="_blank" className="text-warm-500 hover:underline text-sm">
                        View
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="text-center py-12 text-warm-500">No posts yet.</div>
        )}
      </div>
    </div>
  );
}
