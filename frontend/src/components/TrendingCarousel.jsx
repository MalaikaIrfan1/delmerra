'use client';
import { useRef } from 'react';
import ProductCard from './ProductCard';

export default function TrendingCarousel({ products }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <h2 className="font-display text-2xl md:text-3xl text-center mb-10 md:mb-14">
        Trending Now
      </h2>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-black/10 items-center justify-center shadow-sm hover:bg-bgalt"
          aria-label="Scroll left"
        >
          ←
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-7 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((p) => (
            <div key={p._id} className="w-[200px] md:w-[250px] flex-shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-black/10 items-center justify-center shadow-sm hover:bg-bgalt"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </section>
  );
}