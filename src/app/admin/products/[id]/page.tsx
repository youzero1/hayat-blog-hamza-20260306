import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';
import { getDataSource } from '@/lib/database';
import { Product } from '@/entities/Product';
import { Category } from '@/entities/Category';

export const dynamic = 'force-dynamic';

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const ds = await getDataSource();
  const productRepo = ds.getRepository(Product);
  const categoryRepo = ds.getRepository(Category);

  const [product, categories] = await Promise.all([
    productRepo.findOne({ where: { id: parseInt(params.id) }, relations: ['category'] }),
    categoryRepo.find({ order: { name: 'ASC' } }),
  ]);

  if (!product) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="text-warm-500 hover:text-warm-700">
          ← Back to Products
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-warm-900 mb-8">Edit Product</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
