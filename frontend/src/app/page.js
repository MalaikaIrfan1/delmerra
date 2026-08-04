import Link from 'next/link';
import { Sofa, Leaf, Sparkles, Truck } from 'lucide-react';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import CategoryGrid from '@/components/CategoryGrid';
import TrendingCarousel from '@/components/TrendingCarousel';
export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();
  const trendingProducts = products.filter(
    (p) => p.tag === 'Bestseller' || p.tag === 'Trending'
  );
  return (
    <main>
      {/* Hero section */}
      <section className="relative max-w-6xl mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-24 md:pb-32">
        {/* Decorative background blobs */}
        <div className="hidden md:block absolute -top-10 left-0 w-64 h-64 rounded-full bg-rose/10 -z-10" />
        <div className="hidden md:block absolute top-1/3 left-20 w-40 h-40 rounded-full bg-sage/10 -z-10" />

        <div className="grid md:grid-cols-2 items-center gap-10">
          <div>
            <p className="text-rose uppercase text-xs tracking-widest font-semibold mb-4">
              Thoughtful Spaces
            </p>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-5">
              Decor that reflects <span className="italic text-sage">you.</span>
            </h1>
            <p className="text-inksoft mb-8 max-w-sm text-base md:text-lg">
              Curated pieces and timeless designs to elevate every corner of your home.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/products">
                <button className="bg-sagedeep text-white pl-6 pr-2 py-2 rounded-full font-medium flex items-center gap-3">
                  Explore Collection
                  <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">→</span>
                </button>
              </Link>
              <Link href="/products" className="text-sm font-medium underline underline-offset-4">
                View all products
              </Link>
            </div>
            <div className="flex items-center gap-3 mt-10 text-xs text-inksoft">
              <span>01</span>
              <span className="w-10 h-px bg-black/20" />
              <span>03</span>
            </div>
          </div>

          <div className="aspect-square md:aspect-[4/5] rounded-lg overflow-hidden">
            <img src="/images/hero-entryway.jpg" alt="Considered home decor" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Overlapping feature card */}
        <div className="mt-10 md:mt-0 md:absolute md:-bottom-16 md:left-0 md:right-0 bg-white rounded-xl shadow-lg border border-black/5">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/5">
            {[
              { icon: Sofa, label: 'Curated Collections', sub: 'Handpicked pieces for every space' },
              { icon: Leaf, label: 'Sustainable Materials', sub: 'Eco-friendly choices for a better planet' },
              { icon: Sparkles, label: 'Designed to Inspire', sub: 'Timeless designs that speak to you' },
              { icon: Truck, label: 'Safe & Fast Delivery', sub: 'Carefully delivered to your doorstep' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center px-4 py-6 gap-2.5">
                <div className="w-11 h-11 rounded-full bg-bgalt flex items-center justify-center text-sage">
                  <Icon size={20} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
                <p className="text-[11px] text-inksoft leading-snug">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer for overlapping card on desktop */}
      <div className="hidden md:block h-16" />

      <CategoryGrid />

      {/* New Arrivals dark section */}
      <section className="bg-sagedeep text-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20 grid md:grid-cols-2 items-center gap-8">
          <div>
            <p className="text-rose uppercase text-xs tracking-widest font-semibold mb-3">
              New Arrivals
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6">
              Fresh additions for beautiful living.
            </h2>
            <Link href="/products">
              <button className="bg-white text-ink pl-6 pr-2 py-2 rounded-full font-medium flex items-center gap-3">
                Shop Now
                <span className="bg-black/10 rounded-full w-8 h-8 flex items-center justify-center">→</span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 2).map((p) => (
              <Link key={p._id} href={`/products/${p.slug}`} className="block">
                <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-white/10">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-sm text-rose">Rs. {p.salePrice || p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrendingCarousel products={trendingProducts} />

      {/* Product grid */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="font-display text-3xl mb-10">New on the shelf</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}