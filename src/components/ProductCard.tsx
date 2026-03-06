import Link from 'next/link';
import { Product } from '@/entities/Product';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="w-full h-52 bg-gradient-to-br from-primary-100 to-warm-200 flex items-center justify-center relative">
        <span className="text-5xl">🛍️</span>
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Category */}
        {product.category && (
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
            {product.category.name}
          </span>
        )}

        {/* Name */}
        <h3 className="font-bold text-warm-900 mt-1 mb-2 leading-tight line-clamp-2 group-hover:text-primary-600 transition-colors">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Description */}
        <p className="text-warm-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          <div className="flex gap-2">
            <Link
              href={`/products/${product.id}`}
              className="text-sm font-medium text-warm-600 hover:text-warm-800 border border-warm-200 px-3 py-1.5 rounded-lg hover:border-warm-400"
            >
              Details
            </Link>
            {product.affiliateLink && (
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700"
              >
                Buy
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
