import BlogCard from './BlogCard';
import { PostType } from '@/types';

interface BlogListProps {
  posts: PostType[];
  loading?: boolean;
}

export default function BlogList({ posts, loading = false }: BlogListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
            <div className="h-48 bg-earth-200" />
            <div className="p-5">
              <div className="h-4 bg-earth-200 rounded mb-2" />
              <div className="h-4 bg-earth-200 rounded w-3/4 mb-4" />
              <div className="h-3 bg-earth-100 rounded mb-1" />
              <div className="h-3 bg-earth-100 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">📭</div>
        <p className="text-earth-500">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
