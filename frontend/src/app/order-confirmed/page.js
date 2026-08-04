'use client';

export default function OrderConfirmedPage() {
  return (
    <main className="max-w-2xl mx-auto px-8 py-24 text-center">
      <div className="text-5xl mb-6">✅</div>
      <h1 className="font-display text-3xl mb-4">Order Placed Successfully!</h1>
      <p className="text-inksoft mb-8">
        Thank you for your order. We'll call you shortly to confirm delivery details.
        Pay the rider in cash when your order arrives.
      </p>
      <a href="/products" className="bg-ink text-white px-6 py-3.5 rounded inline-block">
        Continue Shopping
      </a>
    </main>
  );
}