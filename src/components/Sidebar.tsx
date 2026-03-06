import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
  relatedPosts?: any[];
  products?: any[];
}

export default function Sidebar({ relatedPosts = [], products = [] }: SidebarProps) {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
      {relatedPosts.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-serif font-bold text-xl text-forest-800 mb-4">Related Posts</h3>
          <div className="space-y-4">
            {relatedPosts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                <div className="flex gap-3">
                  {post.coverImage && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-forest-600 transition-colors text-sm line-clamp-2">
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{post.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-serif font-bold text-xl text-forest-800 mb-4">🛍️ Recommended</h3>
          <div className="space-y-4">
            {products.map((product: any) => (
              <Link key={product.id} href={`/products/${product.id}`} className="block group">
                <div className="flex gap-3">
                  {product.imageUrl && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-forest-600 transition-colors text-sm">
                      {product.name}
                    </p>
                    <p className="text-forest-600 font-bold text-sm">${Number(product.price).toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
