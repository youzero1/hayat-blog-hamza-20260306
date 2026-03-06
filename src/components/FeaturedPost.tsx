import Link from 'next/link';
import Image from 'next/image';
import { PostType } from '@/types';

export default function FeaturedPost({ post }: { post: PostType }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="relative rounded-2xl overflow-hidden h-96 group cursor-pointer">
        <Image
          src={post.thumbnailUrl || 'https://picsum.photos/seed/featured/800/500'}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {post.category && (
            <span className="inline-block bg-hayat-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {post.category.name}
            </span>
          )}
          <h2 className="text-white text-2xl font-bold leading-tight mb-2">{post.title}</h2>
          <p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-3 mt-3 text-gray-400 text-xs">
            <span>{post.author?.name}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
            <span>·</span>
            <span>{post.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
