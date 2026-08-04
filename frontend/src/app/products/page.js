import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category;

  const products = await getProducts(category);

  return (
    <main className="max-w-6xl mx-auto px-8 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-inksoft mb-2">
          {category ? category : 'All Products'}
        </p>
        <h1 className="font-display text-3xl">
          {category ? category : 'Shop the full collection'}
        </h1>
      </div>

      {products.length === 0 ? (
        <p className="text-inksoft">No products found in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}