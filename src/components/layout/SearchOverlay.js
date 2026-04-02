'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import products from '@/data/products.json';

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white animate-fade-in">
      <div className="container-custom pt-8">
        <div className="flex items-center justify-between mb-12">
          <div className="text-xl font-black tracking-tighter text-primary-900">
            URBAN<span className="text-accent">THREADS</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-primary-900"
          >
            <X size={24} />
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative mb-12 group">
            <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={32} strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              placeholder="What are you looking for?"
              className="w-full bg-transparent border-b-2 border-gray-100 py-6 pl-12 text-3xl md:text-5xl font-black tracking-tight outline-none focus:border-accent transition-all uppercase placeholder:text-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Results */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Search Results</h4>
              {results.length > 0 ? (
                <div className="space-y-6">
                  {results.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex gap-4 group"
                    >
                      <div className="w-20 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                        <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{product.category}</p>
                        <h3 className="text-sm font-bold text-primary-900 group-hover:text-accent transition-colors mb-1">{product.title}</h3>
                        <p className="text-sm font-black text-primary-900 tracking-tight">₹{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm font-medium italic">
                  {searchQuery.length > 1 ? "No products found for this search." : "Start typing to see results..."}
                </p>
              )}
            </div>

            {/* Suggestions/Trending */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Popular Searches</h4>
              <div className="flex flex-wrap gap-3">
                {['Oversized', 'Graphics', 'Summer', 'Black T-Shirt', 'Anime'].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-6 py-3 bg-gray-50 rounded-full text-xs font-bold text-primary-900 hover:bg-accent hover:text-white transition-all duration-300"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              
              <div className="mt-12 bg-primary-900 p-8 rounded-2xl relative overflow-hidden group cursor-pointer">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                 <h5 className="text-white text-xl font-black mb-2 uppercase tracking-tight relative z-10">Limited Edition</h5>
                 <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-6 relative z-10">Up to 40% Off</p>
                 <Link href="/collection/sale" onClick={onClose} className="inline-flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors relative z-10">
                    Shop The Sale <ArrowRight size={14} />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}