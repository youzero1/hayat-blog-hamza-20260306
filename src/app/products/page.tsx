import Link from 'next/link';
import { getDataSource } from '@/lib/database';
import { Product } from '@/entities/Product';
import { Category } from '@/entities/Category';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: { category?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const ds = await getDataSource();
  const productRepo = ds.getRepository(Product);
  const categoryRepo = ds.getRepository(Category);

  const categorySlug = searchParams.category || '';

  const queryBuilder = productRepo
    .createQueryBuilder('product')
    .leftJoinAndSelect('product.category', 'category');

  if (categorySlug) {
    queryBuilder.where('category.slug = :categorySlug', { categorySlug });
  }

  const products = await queryBuilder.orderBy('product.createdAt', 'DESC').getMany();
  const categories = await categoryRepo.find({ order: { name: 'ASC' } });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-warm-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Products
        </h1>
        <p className="text-warm-600 text-lg">Handpicked products we love and recommend</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        <Link
          href="/products"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !categorySlug
              ? 'bg-primary-600 text-white'
              : 'bg-warm-100 text-warm-700 hover:bg-primary-100 hover:text-primary-700'
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              categorySlug === cat.slug
                ? 'bg-primary-600 text-white'
                : 'bg-warm-100 text-warm-700 hover:bg-primary-100 hover:text-primary-700'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛍️</div>
          <h3 className="text-xl font-semibold text-warm-700 mb-2">No products found</h3>
          <p className="text-warm-500">Check back soon for new products!</p>
        </div>
      )}
    </div>
  );
}
