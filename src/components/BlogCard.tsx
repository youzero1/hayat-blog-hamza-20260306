import Link from 'next/link';
import Image from 'next/image';
import { PostType } from '@/types';

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-700',
  lifestyle: 'bg-purple-100 text-purple-700',
  travel: 'bg-green-100 text-green-700',
  food: 'bg-orange-100 text-orange-700',
  health: 'bg-red-100 text-red-700',
  business: 'bg-yellow-100 text-yellow-700',
};

export default function BlogCard({ post }: { post: PostType }) {
  const categorySlug = post.category?.slug || '';
  const colorClass = categoryColors[categorySlug] || 'bg-gray-100 text-gray-700';

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-white rounded-xl overflow-hidden shadow-sm blog-card-hover cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden">
          <Image
            src={post.thumbnailUrl || 'https://picsum.photos/seed/default/400/250'}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          {post.category && (
            <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
              {post.category.name}
            </span>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-earth-900 text-lg leading-snug mb-2 line-clamp-2 hover:text-hayat-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-earth-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-earth-400 border-t border-earth-100 pt-3">
            <div className="flex items-center gap-2">
              {post.author?.avatarUrl && (
                <Image
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="font-medium text-earth-600">{post.author?.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{post.readTime} min read</span>
              <span>·</span>
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
