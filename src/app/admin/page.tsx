import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import { Product } from '@/entities/Product';
import { Subscriber } from '@/entities/Subscriber';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const ds = await getDataSource();
  const postRepo = ds.getRepository(Post);
  const productRepo = ds.getRepository(Product);
  const subscriberRepo = ds.getRepository(Subscriber);

  const [totalPosts, publishedPosts, totalProducts, featuredProducts, totalSubscribers] =
    await Promise.all([
      postRepo.count(),
      postRepo.count({ where: { isPublished: true } }),
      productRepo.count(),
      productRepo.count({ where: { isFeatured: true } }),
      subscriberRepo.count(),
    ]);

  const recentPosts = await postRepo.find({
    order: { createdAt: 'DESC' },
    take: 5,
    relations: ['category'],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-warm-900">Admin Dashboard</h1>
          <p className="text-warm-500 mt-1">Manage your blog content</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/posts/new"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            + New Post
          </Link>
          <Link
            href="/admin/products/new"
            className="bg-warm-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-warm-700 transition-colors"
          >
            + New Product
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm">
          <div className="text-3xl mb-2">📝</div>
          <div className="text-3xl font-bold text-warm-900">{totalPosts}</div>
          <div className="text-warm-500 text-sm mt-1">Total Posts</div>
          <div className="text-xs text-green-600 mt-2">{publishedPosts} published</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm">
          <div className="text-3xl mb-2">🛍️</div>
          <div className="text-3xl font-bold text-warm-900">{totalProducts}</div>
          <div className="text-warm-500 text-sm mt-1">Products</div>
          <div className="text-xs text-yellow-600 mt-2">{featuredProducts} featured</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm">
          <div className="text-3xl mb-2">📧</div>
          <div className="text-3xl font-bold text-warm-900">{totalSubscribers}</div>
          <div className="text-warm-500 text-sm mt-1">Subscribers</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-3xl font-bold text-warm-900">{publishedPosts}</div>
          <div className="text-warm-500 text-sm mt-1">Published Posts</div>
          <div className="text-xs text-warm-400 mt-2">{totalPosts - publishedPosts} drafts</div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <div className="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-warm-900">Recent Posts</h2>
            <Link href="/admin/posts" className="text-primary-600 text-sm hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between py-2 border-b border-warm-50 last:border-0">
                <div>
                  <p className="font-medium text-warm-900 text-sm truncate max-w-xs">{post.title}</p>
                  <p className="text-xs text-warm-400">{post.category?.name || 'Uncategorized'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    post.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <Link href={`/admin/posts/${post.id}`} className="text-xs text-primary-600 hover:underline">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-warm-100 shadow-sm">
          <h2 className="text-lg font-bold text-warm-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { href: '/admin/posts', label: 'Manage Posts', emoji: '📝', color: 'bg-blue-50 text-blue-700' },
              { href: '/admin/posts/new', label: 'Create New Post', emoji: '✏️', color: 'bg-green-50 text-green-700' },
              { href: '/admin/products', label: 'Manage Products', emoji: '🛍️', color: 'bg-purple-50 text-purple-700' },
              { href: '/admin/products/new', label: 'Add New Product', emoji: '➕', color: 'bg-orange-50 text-orange-700' },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`flex items-center gap-3 p-3 rounded-xl ${action.color} hover:opacity-80 transition-opacity`}
              >
                <span className="text-xl">{action.emoji}</span>
                <span className="font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
