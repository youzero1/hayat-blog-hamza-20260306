import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    author: string;
    createdAt: string;
    isFeatured: boolean;
    category?: { name: string; slug: string };
  };
  featured?: boolean;
}

export default function BlogCard({ post, featured }: BlogCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className={`card h-full flex flex-col ${featured ? 'ring-2 ring-gold-200' : ''}`}>
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-forest-200 to-forest-400 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
          )}
          {post.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="badge bg-gold-500 text-white">⭐ Featured</span>
            </div>
          )}
          {post.category && (
            <div className="absolute top-3 right-3">
              <span className="badge-forest">{post.category.name}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-serif font-bold text-lg text-gray-900 mb-2 group-hover:text-forest-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-forest-200 flex items-center justify-center text-forest-700 font-bold text-xs">
                {post.author?.[0]?.toUpperCase() || 'A'}
              </div>
              <span className="text-xs text-gray-500 font-medium">{post.author}</span>
            </div>
            <time className="text-xs text-gray-400">{formattedDate}</time>
          </div>
        </div>
      </div>
    </Link>
  );
}
