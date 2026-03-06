import Link from 'next/link';
import Image from 'next/image';
import { PostType } from '@/types';
import CategoryBadge from './CategoryBadge';

interface FeaturedPostProps {
  post: PostType;
  large?: boolean;
}

export default function FeaturedPost({ post, large = false }: FeaturedPostProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article
      className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${
        large ? 'h-full min-h-[400px]' : 'h-64'
      }`}
    >
      <Link href={`/posts/${post.id}`} className="absolute inset-0">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-warm-700 to-warm-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-warm-900/90 via-warm-900/30 to-transparent" />
      </Link>

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-primary-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
          {post.category && (
            <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
              {post.category.name}
            </span>
          )}
        </div>
        <Link href={`/posts/${post.id}`}>
          <h2
            className={`font-serif font-bold text-white leading-snug mb-2 group-hover:text-primary-200 transition-colors ${
              large ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
            }`}
          >
            {post.title}
          </h2>
        </Link>
        {large && post.excerpt && (
          <p className="text-warm-300 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-3 text-warm-400 text-xs">
          <span className="text-warm-300 font-medium">{post.author}</span>
          <span>·</span>
          <time dateTime={post.createdAt}>{formattedDate}</time>
        </div>
      </div>
    </article>
  );
}
