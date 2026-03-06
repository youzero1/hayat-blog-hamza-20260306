import Link from 'next/link';
import { getDataSource } from '@/lib/database';
import { Product } from '@/entities/Product';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const ds = await getDataSource();
  const productRepo = ds.getRepository(Product);

  const products = await productRepo.find({
    relations: ['category'],
    order: { createdAt: 'DESC' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-warm-900">Products</h1>
          <p className="text-warm-500">{products.length} total products</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin" className="text-warm-600 hover:text-warm-800 px-4 py-2">
            ← Dashboard
          </Link>
          <Link
            href="/admin/products/new"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700"
          >
            + New Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-warm-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-warm-50 border-b border-warm-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-warm-700">Name</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-warm-700">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-warm-700">Price</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-warm-700">Featured</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-warm-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-warm-50 hover:bg-warm-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-warm-900 max-w-xs truncate">{product.name}</div>
                </td>
                <td className="px-6 py-4 text-sm text-warm-600">
                  {product.category?.name || '—'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-primary-600">
                  {formatPrice(product.price)}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    product.isFeatured ? 'bg-yellow-100 text-yellow-700' : 'bg-warm-100 text-warm-600'
                  }`}>
                    {product.isFeatured ? '⭐ Featured' : 'Standard'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link href={`/admin/products/${product.id}`} className="text-primary-600 hover:underline text-sm">Edit</Link>
                    <Link href={`/products/${product.id}`} target="_blank" className="text-warm-500 hover:underline text-sm">View</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center py-12 text-warm-500">No products yet.</div>
        )}
      </div>
    </div>
  );
}
