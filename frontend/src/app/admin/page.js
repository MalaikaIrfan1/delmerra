'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { getOrders } from '@/lib/api';

export default function AdminLoginPage() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAdminKey } = useAdmin();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Test the key by trying a protected request
      await getOrders(input);
      setAdminKey(input);
      router.push('/admin/products');
    } catch (err) {
      setError('Invalid admin key. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-sm mx-auto px-8 py-24">
      <h1 className="font-display text-2xl mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter admin key"
          className="w-full border border-black/10 rounded px-3 py-2.5 text-sm mb-3"
          required
        />
        {error && <p className="text-rosedeep text-sm mb-3">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-ink text-white py-3 rounded font-medium disabled:opacity-50">
          {loading ? 'Checking...' : 'Login'}
        </button>
      </form>
    </main>
  );
}