import ProductCard from './ProductCard';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateLink: string;
  category?: { name: string; slug: string };
}

interface ProductShowcaseProps {
  products: Product[];
}

export default function ProductShowcase({ products }: ProductShowcaseProps) {
  if (!products.length) return null;

  return (
    <section className="py-16 px-4 bg-cream-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Curated Products</h2>
          <p className="section-subtitle">Products we love and recommend</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products" className="btn-outline">View All Products →</Link>
        </div>
      </div>
    </section>
  );
}
