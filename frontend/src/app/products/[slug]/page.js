import { getProduct } from '@/lib/api';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  let product;
  try {
    product = await getProduct(slug);
  } catch (err) {
    notFound();
  }

  if (!product) notFound();

  const displayPrice = product.salePrice || product.price;
  const hasDiscount = !!product.salePrice;

  return (
    <main className="max-w-6xl mx-auto px-8 py-10">
      <div className="text-xs text-inksoft mb-6">
        <a href="/">Home</a> / <a href="/products">Products</a> / <span className="text-ink">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-14">
        <div className="aspect-[4/5] bg-[#EDEBE6] rounded overflow-hidden">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          {product.tag && (
            <span className="inline-block bg-sage text-white text-[10.5px] uppercase tracking-wide px-2.5 py-1 rounded-sm mb-4">
              {product.tag}
            </span>
          )}

          <h1 className="font-display text-3xl mb-3">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-rose font-semibold text-2xl font-display">${displayPrice}</span>
            {hasDiscount && (
              <span className="text-inksoft line-through text-base">${product.price}</span>
            )}
          </div>

          <p className="text-inksoft leading-relaxed mb-6 max-w-md">{product.description}</p>

          <p className="text-sm text-sage mb-6">
            {product.stock > 0 ? product.stock + " left in stock" : "Out of stock"}
          </p>

          <AddToCartButton product={product} />

          <div className="flex items-center gap-2.5 bg-bgalt rounded p-4 mt-5 text-sm text-inksoft">
            💵 <span><b className="text-ink">Pay when it arrives.</b> No card or advance payment needed.</span>
          </div>

          {product.careInstructions && (
            <div className="border-t border-black/10 mt-8 pt-6">
              <h3 className="text-sm font-semibold mb-2">Materials & Care</h3>
              <p className="text-sm text-inksoft">{product.careInstructions}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}