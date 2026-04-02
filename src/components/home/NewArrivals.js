import ProductCard from '@/components/common/ProductCard';
import products from '@/data/products.json';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NewArrivals() {
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 mb-4 tracking-tight uppercase">
              Latest <span className="text-accent">Drops</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Fresh styles, premium fabrics, and contemporary designs. Be the first to wear the future of urban fashion.
            </p>
          </div>
          <Link href="/shop?filter=new-arrivals" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-900 border-b-2 border-primary-900 pb-1 hover:text-accent hover:border-accent transition-all duration-300">
            View All Arrivals <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
