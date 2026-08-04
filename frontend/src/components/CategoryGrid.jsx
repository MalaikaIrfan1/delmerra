import Link from 'next/link';

const categories = [
  { name: 'Wall Decor', count: '18 Items', image: '/images/category-wall-decor.jpg' },
  { name: 'Lighting', count: '12 Items', image: '/images/category-lighting.jpg' },
  { name: 'Table Decor', count: '24 Items', image: '/images/category-table-decor.jpg' },
  { name: 'Textiles', count: '16 Items', image: '/images/category-textiles.jpg' },
];      

export default function CategoryGrid() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xs uppercase tracking-widest font-semibold">Shop by Category</h2>
        <Link href="/products" className="text-rose text-xs font-semibold flex items-center gap-1">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {categories.map((cat) => {
          const link = "/products?category=" + encodeURIComponent(cat.name);
          return (
            <Link key={cat.name} href={link} className="group relative aspect-[3/4] rounded-lg overflow-hidden block">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 text-white">
                <p className="text-sm font-semibold">{cat.name}</p>
                <p className="text-[11px] opacity-80">{cat.count}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}