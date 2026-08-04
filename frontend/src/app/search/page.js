'use client';
import { useState } from 'react';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const all = await getProducts();
    const filtered = all.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setSearched(true);
  };

  return (
    <main className="max-w-6xl mx-auto px-8 py-16">
      <h1 className="font-display text-3xl mb-8">Search Products</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-10 max-w-xl">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="flex-1 border border-black/10 rounded px-3 py-2.5 text-sm"
        />
        <button className="bg-ink text-white px-6 py-2.5 rounded font-medium">Search</button>
      </form>

      {searched && results.length === 0 && (
        <p className="text-inksoft">No products found for "{query}".</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {results.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </main>
  );
}