import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';
import { getDataSource } from '@/lib/database';
import { Category } from '@/entities/Category';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const ds = await getDataSource();
  const categoryRepo = ds.getRepository(Category);
  const categories = await categoryRepo.find({ order: { name: 'ASC' } });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="text-warm-500 hover:text-warm-700">
          ← Back to Products
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-warm-900 mb-8">Add New Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
