import { notFound } from 'next/navigation';
import ProductCard from '@/components/common/ProductCard';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import { Filter, ChevronDown } from 'lucide-react';

export default function CategoryPage({ params }) {
  const { slug } = params;
  const category = categories.find((c) => c.id === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === slug);

  return (
    <main className="min-h-screen pb-20 bg-white">
      {/* Category Hero/Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-16 md:py-24 mb-12">
        <div className="container-custom">
          <div className="max-w-3xl">
            <nav className="flex mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              <ol className="flex items-center space-x-2">
                <li><a href="/" className="hover:text-primary-900 transition-colors">Home</a></li>
                <li><span className="mx-2">/</span></li>
                <li className="text-primary-900">Shop</li>
                <li><span className="mx-2">/</span></li>
                <li className="text-accent">{category.name}</li>
              </ol>
            </nav>
            <h1 className="text-5xl md:text-7xl font-black text-primary-900 mb-6 tracking-tight uppercase leading-none">
              {category.name}<span className="text-accent">’s</span> Collection
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              {category.id === 'men' && "Upgrade your wardrobe with our collection of men’s T-shirts — designed for comfort, durability, and effortless style. From minimal basics to bold prints, find your perfect fit."}
              {category.id === 'women' && "Discover trendy and comfortable T-shirts made to match your mood. Soft fabrics, flattering fits, and designs you’ll love to wear every day."}
              {category.id === 'kids' && "Fun, colorful, and super comfy T-shirts for kids. Made for play, laughter, and all-day comfort."}
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-gray-100 pb-8">
           <div className="flex items-center gap-8">
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-900 group">
                <Filter size={16} className="group-hover:text-accent transition-colors" /> Filter
              </button>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {categoryProducts.length} Results</p>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sort By:</span>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-900 group">
                Newest <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
           </div>
        </div>

        {/* Product Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No products found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
