import Link from 'next/link';
import Image from 'next/image';
import { PostType, CategoryType } from '@/types';

interface SidebarProps {
  popularPosts?: PostType[];
  categories?: CategoryType[];
}

export default function Sidebar({ popularPosts = [], categories = [] }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-earth-800 mb-4 text-lg">Popular Posts</h3>
          <div className="space-y-4">
            {popularPosts.map((post, idx) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="flex gap-3 group">
                  <div className="text-2xl font-bold text-earth-200 w-6 flex-shrink-0">{idx + 1}</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-earth-800 group-hover:text-hayat-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-earth-400 mt-0.5">{post.views.toLocaleString()} views</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-earth-800 mb-4 text-lg">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`}>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-hayat-50 transition-colors group">
                  <span className="text-sm font-medium text-earth-700 group-hover:text-hayat-600 transition-colors">
                    {cat.name}
                  </span>
                  {cat.postCount !== undefined && (
                    <span className="text-xs bg-earth-100 text-earth-500 px-2 py-0.5 rounded-full">
                      {cat.postCount}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
