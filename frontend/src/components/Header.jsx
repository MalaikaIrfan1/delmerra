'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const categories = ['Wall Decor', 'Table Decor', 'Storage', 'Lighting', 'Rugs', 'Textiles'];

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <>
      <div className="bg-rosedeep text-white text-center text-[11px] md:text-xs uppercase tracking-wider py-2.5 overflow-hidden">
        <div className="marquee-text inline-block">
          ✦ Cash on Delivery ✦ Free shipping on orders over $50 ✦ Delmerra — Considered Home Decor ✦
        </div>
      </div>

      <header className="border-b border-black/10 sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between py-4 md:py-5">
          <Link href="/" className="font-display text-xl md:text-2xl tracking-tight">
            Delmerra
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
            <Link href="/" className="hover:text-sage transition-colors">Home</Link>

            <div
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <Link href="/products" className="hover:text-sage transition-colors">All Products</Link>

              {showCategories && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-white border border-black/10 rounded shadow-lg px-5 py-3 flex gap-5 whitespace-nowrap">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={"/products?category=" + encodeURIComponent(cat)}
                        className="text-xs text-inksoft hover:text-sage"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-4 md:gap-5 text-sm">
            <Link href="/search" className="hidden sm:inline">Search</Link>
            <Link href="/account" className="hidden sm:inline">Account</Link>
            <Link href="/cart" className="font-medium">Cart ({totalItems})</Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center"
              aria-label="Toggle menu"
            >
              <span className={`block h-[1.5px] bg-ink transition-transform ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block h-[1.5px] bg-ink transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] bg-ink transition-transform ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-black/10 bg-white px-5 py-4 flex flex-col gap-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm py-2.5 border-b border-black/5">Home</Link>
            <Link href="/products" onClick={() => setMenuOpen(false)} className="text-sm py-2.5 border-b border-black/5">All Products</Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={"/products?category=" + encodeURIComponent(cat)}
                onClick={() => setMenuOpen(false)}
                className="text-xs text-inksoft py-2 pl-3"
              >
                {cat}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}