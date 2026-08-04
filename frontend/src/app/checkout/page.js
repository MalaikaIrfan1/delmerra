'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { placeOrder } from '@/lib/api';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    address: '',
    city: 'Karachi',
    postalCode: '',
    deliveryNotes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shippingFee = subtotal >= 3500 ? 0 : 200;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        ...form,
        items: items.map((i) => ({
          product: i.product._id,
          name: i.product.name,
          quantity: i.quantity,
          price: i.product.salePrice || i.product.price,
        })),
      };

      const order = await placeOrder(orderData);
      clearCart();
      router.push('/order-confirmed?id=' + order._id);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-8 py-24 text-center">
        <h1 className="font-display text-3xl mb-4">Your cart is empty</h1>
        <p className="text-inksoft">Add something to your cart before checking out.</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-14">
      <h1 className="font-display text-3xl mb-10">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 bg-bgalt rounded p-7">
          <h3 className="font-display text-lg mb-5">Delivery Details</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">Full Name</label>
              <input
                required
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="e.g. Ayesha Khan"
                className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Phone Number</label>
              <input
                required
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="03XX-XXXXXXX"
                className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5">Street Address</label>
            <input
              required
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House no, street, area"
              className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">City</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
              >
                <option>Karachi</option>
                <option>Lahore</option>
                <option>Islamabad</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Postal Code (optional)</label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="75500"
                className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-xs font-semibold mb-1.5">Delivery Notes (optional)</label>
            <textarea
              name="deliveryNotes"
              value={form.deliveryNotes}
              onChange={handleChange}
              placeholder="Landmark, preferred delivery time, etc."
              className="w-full border border-black/10 rounded px-3 py-2.5 text-sm bg-white min-h-[70px]"
            />
          </div>

          <div className="flex items-center gap-2.5 bg-white border border-sage rounded p-3.5 text-sm mt-5">
            💵 <span><b>Cash on Delivery</b> — pay the rider when your order arrives.</span>
          </div>
        </div>

        <div className="bg-bgalt rounded p-6 h-fit">
          <h3 className="font-display text-lg mb-5">Order Summary</h3>
          {items.map((item) => {
            const price = item.product.salePrice || item.product.price;
            return (
              <div key={item.product._id} className="flex justify-between text-sm text-inksoft mb-2.5">
                <span>{item.product.name} × {item.quantity}</span>
                <span>Rs. {price * item.quantity}</span>
              </div>
            );
          })}
          <div className="flex justify-between text-sm text-inksoft mb-2.5 border-t border-black/10 pt-3 mt-3">
            <span>Subtotal</span><span>Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-inksoft mb-2.5">
            <span>Shipping</span><span>{shippingFee === 0 ? "Free" : "Rs. " + shippingFee}</span>
          </div>
          <div className="flex justify-between font-semibold border-t border-black/10 mt-3 pt-3 mb-5">
            <span>Total (Payable on Delivery)</span><span>Rs. {total}</span>
          </div>

          {error && <p className="text-rosedeep text-sm mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-white py-3.5 rounded font-medium disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Place Order — Cash on Delivery'}
          </button>
        </div>
      </form>
    </main>
  );
}