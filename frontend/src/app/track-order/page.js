'use client';
import { useState } from 'react';
import { trackOrder } from '@/lib/api';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);
    try {
      const data = await trackOrder(orderId.trim());
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not find that order.');
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <main className="max-w-2xl mx-auto px-8 py-16">
      <h1 className="font-display text-3xl mb-3">Track Your Order</h1>
      <p className="text-inksoft mb-8">Enter the Order ID you received in your confirmation page.</p>

      <form onSubmit={handleTrack} className="flex gap-3 mb-8">
        <input
          required
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
          className="flex-1 border border-black/10 rounded px-3 py-2.5 text-sm"
        />
        <button disabled={loading} className="bg-ink text-white px-6 py-2.5 rounded font-medium disabled:opacity-50">
          {loading ? 'Checking...' : 'Track'}
        </button>
      </form>

      {error && <p className="text-rosedeep text-sm mb-6">{error}</p>}

      {order && (
        <div className="bg-bgalt rounded p-6">
          <p className="text-sm text-inksoft mb-1">Order for {order.customerName}</p>
          <p className="text-xs text-inksoft mb-5">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <div className="flex justify-between mb-6">
            {statusSteps.map((step) => {
              const currentIndex = statusSteps.indexOf(order.status);
              const stepIndex = statusSteps.indexOf(step);
              const isActive = stepIndex <= currentIndex && order.status !== 'Cancelled';
              return (
                <div key={step} className="flex-1 text-center">
                  <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${isActive ? 'bg-sage' : 'bg-black/10'}`} />
                  <p className={`text-xs ${isActive ? 'text-ink font-medium' : 'text-inksoft'}`}>{step}</p>
                </div>
              );
            })}
          </div>

          {order.status === 'Cancelled' && (
            <p className="text-rosedeep text-sm font-medium mb-4">This order was cancelled.</p>
          )}

          <div className="border-t border-black/10 pt-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm text-inksoft mb-2">
                <span>{item.name} × {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold border-t border-black/10 pt-3 mt-3">
              <span>Total</span><span>${order.total}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}