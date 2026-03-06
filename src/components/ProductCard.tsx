import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    affiliateLink: string;
    category?: { name: string; slug: string };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card flex flex-col group">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cream-200 to-cream-400 flex items-center justify-center">
              <span className="text-4xl">🛍️</span>
            </div>
          )}
          {product.category && (
            <div className="absolute top-3 left-3">
              <span className="badge-gold">{product.category.name}</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif font-bold text-gray-900 mb-2 hover:text-forest-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-forest-600">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>
          {product.affiliateLink && (
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full block text-center bg-gold-500 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-gold-600 transition-colors duration-200"
            >
              Buy Now →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
