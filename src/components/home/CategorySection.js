import Link from 'next/link';
import categories from '@/data/categories.json';
import { ArrowUpRight } from 'lucide-react';

export default function CategorySection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-primary-900 mb-4 tracking-tight uppercase">
              Curated <span className="text-accent">Collections</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Explore our latest arrivals tailored for every style and occasion. From casual essentials to bold statements.
            </p>
          </div>
          <Link href="/shop" className="text-sm font-bold uppercase tracking-widest text-primary-900 border-b-2 border-primary-900 pb-1 hover:text-accent hover:border-accent transition-all shrink-0">
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`} className="group relative overflow-hidden bg-gray-100 aspect-[3/4] block">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white transition-opacity duration-500">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-xs font-bold mb-2 uppercase tracking-[0.2em] text-accent">{category.tagline}</p>
                  <h3 className="text-3xl font-black mb-3 tracking-tight">{category.name}</h3>
                  <p className="text-sm text-gray-300 mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{category.description}</p>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-white text-primary-900 px-6 py-3 w-fit group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    {category.cta} <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
