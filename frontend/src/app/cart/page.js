'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-8 py-24 text-center">
        <h1 className="font-display text-3xl mb-4">Your cart is empty</h1>
        <p className="text-inksoft mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/products" className="bg-ink text-white px-6 py-3.5 rounded inline-block">
          Browse Products
        </Link> 
      </main>
    );
  }

  const shippingFee = subtotal >= 3500 ? 0 : 200;
  const total = subtotal + shippingFee;

  return (
    <main className="max-w-4xl mx-auto px-8 py-14">
      <h1 className="font-display text-3xl mb-10">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          {items.map((item) => {
            const price = item.product.salePrice || item.product.price;
            return (
              <div key={item.product._id} className="flex gap-5 items-center py-5 border-b border-black/10">
                <div className="w-20 h-20 bg-[#EDEBE6] rounded overflow-hidden flex-shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="text-sm font-medium mb-2">{item.product.name}</div>
                  <div className="flex items-center border border-black/10 rounded w-fit">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="w-8 h-8 text-sm"
                    >
                      –
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="w-8 h-8 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-display font-semibold text-rose mb-2">
                    $ {price * item.quantity}
                  </div>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="text-xs text-inksoft border-b border-black/10"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-bgalt rounded p-6 h-fit">
          <h3 className="font-display text-lg mb-5">Order Summary</h3>
          <div className="flex justify-between text-sm text-inksoft mb-2.5">
            <span>Subtotal</span><span>$ {subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-inksoft mb-2.5">
            <span>Shipping</span><span>{shippingFee === 0 ? "Free" : "$ " + shippingFee}</span>
          </div>
          <div className="flex justify-between font-semibold border-t border-black/10 mt-3 pt-3">
            <span>Total (Payable on Delivery)</span><span>$ {total}</span>
          </div>
          <Link href="/checkout">
            <button className="w-full bg-ink text-white py-3.5 rounded mt-5 font-medium">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}