'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const displayPrice = product.salePrice || product.price;

  return (
    <>
      <button onClick={handleAdd} className="w-full bg-ink text-white py-3.5 rounded mb-3 font-medium">
        {added ? "Added to Cart ✓" : "Add to Cart — $" + displayPrice}
      </button>
      <Link href="/checkout" className="block">
        <button
          onClick={() => addItem(product, 1)}
          className="w-full border border-ink text-ink py-3.5 rounded font-medium"
        >
          Buy Now (Cash on Delivery)
        </button>
      </Link>
    </>
  );
}