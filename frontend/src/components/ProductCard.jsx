import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <div className="relative">
        {product.tag && (
          <span className="absolute top-2.5 left-2.5 bg-rosedeep text-white text-[10.5px] uppercase tracking-wide px-2.5 py-1 rounded-sm z-10">
            {product.tag}
          </span>
        )}
        <div className="aspect-[4/5] bg-[#EDEBE6] rounded-t overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-px bg-sage shadow-[0_6px_10px_-6px_rgba(32,31,29,0.35)]" />
      </div>
      <div className="pt-4">
        <div className="text-sm font-medium mb-1">{product.name}</div>
        <div className="flex gap-2 text-sm items-baseline">
          <span className="text-sage font-semibold">
            ${product.salePrice || product.price}
          </span>
          {product.salePrice && (
            <span className="text-inksoft line-through text-xs">
              ${product.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}