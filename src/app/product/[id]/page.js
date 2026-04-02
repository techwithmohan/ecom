'use client';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import { Truck, RotateCcw, ShieldCheck, Star, Heart, Share2, Info } from 'lucide-react';
import products from '@/data/products.json';
import ProductCard from '@/components/common/ProductCard';
import { useCart } from '@/context/CartContext';

export default function ProductPage({ params }) {
  const { id } = params;
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState('M');
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen pb-20 pt-10 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Product Gallery */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4">
              <div className="aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Thumbnail row if we had more images */}
              <div className="grid grid-cols-4 gap-4">
                <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 border-primary-900">
                   <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-gray-50 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                       <Info size={24} strokeWidth={1} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Urban Threads Premium</span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-primary-900"><Share2 size={18} /></button>
                  <button className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-accent"><Heart size={18} /></button>
                </div>
              </div>

              <h1 className="text-4xl font-black text-primary-900 mb-4 tracking-tight uppercase leading-tight">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border-l border-gray-200 pl-4">48 Reviews</span>
              </div>

              <div className="flex items-baseline gap-4 mb-10 pb-8 border-b border-gray-100">
                <span className="text-4xl font-black text-primary-900 tracking-tighter">₹{product.price}</span>
                {product.mrp && (
                  <span className="text-xl text-gray-400 line-through font-medium">₹{product.mrp}</span>
                )}
                {product.discount && (
                  <span className="text-sm font-black text-accent uppercase tracking-widest">
                    Save {product.discount}
                  </span>
                )}
              </div>

              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-xs uppercase tracking-widest text-primary-900">Select Size</h3>
                  <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest underline decoration-gray-200 underline-offset-4 hover:text-primary-900 transition-colors">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[56px] h-14 border-2 transition-all duration-300 font-bold text-sm flex items-center justify-center ${
                        selectedSize === size 
                          ? 'border-primary-900 bg-primary-900 text-white shadow-lg shadow-gray-200' 
                          : 'border-gray-100 bg-white text-primary-900 hover:border-primary-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mb-12">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-900 text-white h-16 font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all duration-300 active:scale-[0.98] shadow-xl shadow-gray-200"
                >
                  Add to Cart
                </button>
              </div>

              {/* USP List */}
              <div className="space-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-primary-900"><Truck size={20} strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary-900 mb-1">Express Delivery</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Free delivery above ₹999. Usually arrives in 3-5 business days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-primary-900"><RotateCcw size={20} strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary-900 mb-1">Easy Exchanges</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Not the right fit? Exchange within 10 days of delivery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs Placeholder */}
        <div className="border-t border-gray-100 pt-16 mb-24">
           <div className="flex justify-center gap-12 mb-12 border-b border-gray-100 pb-4">
              <button className="text-xs font-black uppercase tracking-[0.2em] text-primary-900 border-b-2 border-primary-900 pb-4">Description</button>
              <button className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary-900 pb-4 transition-colors">Specifications</button>
              <button className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary-900 pb-4 transition-colors">Shipping Info</button>
           </div>
           <div className="max-w-3xl mx-auto">
              <p className="text-gray-500 leading-relaxed text-center mb-10">
                {product.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-50">
                 {product.features.map((feature, i) => (
                    <div key={i} className="text-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">Feature 0{i+1}</p>
                       <p className="text-xs font-bold text-primary-900">{feature}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-20">
            <h2 className="text-3xl font-black text-primary-900 mb-12 tracking-tight uppercase">You May <span className="text-accent">Also Like</span></h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
