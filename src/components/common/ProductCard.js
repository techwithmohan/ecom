'use client';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'M'); // Default size M for quick add
  };

  return (
    <div className="group relative bg-white transition-all duration-500 hover:shadow-xl hover:shadow-gray-100 rounded-xl overflow-hidden border border-gray-100">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.discount && (
              <span className="bg-accent text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-tighter rounded-sm">
                {product.discount} OFF
              </span>
            )}
            {product.isNewArrival && (
              <span className="bg-primary-900 text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-tighter rounded-sm">
                NEW
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-accent hover:text-white transition-colors">
              <Heart size={18} strokeWidth={1.5} />
            </button>
            <button 
              onClick={handleQuickAdd}
              className="bg-white p-2 rounded-full shadow-md hover:bg-accent hover:text-white transition-colors"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Urban Threads</p>
          <h3 className="text-sm font-bold text-primary-900 mb-2 truncate group-hover:text-accent transition-colors">{product.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-primary-900 tracking-tight">₹{product.price}</span>
              {product.mrp && (
                <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
              )}
            </div>
            {/* Color Dot placeholders */}
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-black"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-blue-900"></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
