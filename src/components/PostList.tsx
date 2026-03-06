import PostCard from './PostCard';
import { PostType } from '@/types';

interface PostListProps {
  posts: PostType[];
  columns?: 2 | 3;
}

export default function PostList({ posts, columns = 3 }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📝</div>
        <p className="text-warm-500 text-lg">No posts found.</p>
      </div>
    );
  }

  const gridClass =
    columns === 2
      ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

  return (
    <div className={gridClass}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
