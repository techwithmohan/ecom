'use client';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/common/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { storage } from '@/lib/storage';

export default function BestSellers() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const products = storage.getProducts();
    setBestSellers(products.filter(p => p.isBestSeller).slice(0, 4));
  }, []);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 mb-4 tracking-tight uppercase">
              Bestselling <span className="text-accent">Pieces</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Explore the styles everyone is talking about. (Local Storage Mode)
            </p>
          </div>
          <Link href="/shop?filter=bestsellers" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-900 bg-white px-8 py-4 shadow-sm border border-gray-100 hover:bg-primary-900 hover:text-white transition-all duration-300">
            Shop All Bestsellers <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {bestSellers.length === 0 && (
            <p className="col-span-full text-center text-gray-400 font-bold uppercase tracking-widest py-10">No bestsellers in storage</p>
          )}
        </div>
      </div>
    </section>
  );
}
