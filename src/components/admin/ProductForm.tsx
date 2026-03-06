'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/entities/Category';
import { Product } from '@/entities/Product';

interface ProductFormProps {
  categories: Category[];
  product?: Product;
}

export default function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    imageUrl: product?.imageUrl || '',
    affiliateLink: product?.affiliateLink || '',
    categoryId: product?.categoryId?.toString() || '',
    isFeatured: product?.isFeatured || false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        router.push('/admin/products');
        router.refresh();
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMsg(data.error || 'Failed to save product');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error');
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    try {
      const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      }
    } catch {
      setErrorMsg('Failed to delete product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errorMsg}
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 border border-warm-100 space-y-5">
        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            placeholder="Product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 resize-none"
            placeholder="Describe the product..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">Price *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
              placeholder="29.99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-1">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">Image URL</label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-warm-700 mb-1">Affiliate Link</label>
          <input
            type="text"
            value={formData.affiliateLink}
            onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
            className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            placeholder="https://..."
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="w-4 h-4 text-primary-600 rounded"
          />
          <label htmlFor="isFeatured" className="text-sm font-medium text-warm-700">
            Mark as Featured
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>

        {product && (
          <div>
            {deleteConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-warm-600">Are you sure?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(false)}
                  className="text-warm-500 px-4 py-2 rounded-full text-sm border border-warm-200 hover:bg-warm-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setDeleteConfirm(true)}
                className="text-red-600 px-4 py-2 rounded-full text-sm border border-red-200 hover:bg-red-50"
              >
                Delete Product
              </button>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
