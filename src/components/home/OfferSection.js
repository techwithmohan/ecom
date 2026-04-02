import Link from 'next/link';
import { Tag, Truck } from 'lucide-react';

export default function OfferSection() {
  return (
    <section className="bg-primary-900 py-16 relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/5 whitespace-nowrap pointer-events-none select-none">
        SALE 50% OFF
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Tag size={14} /> Seasonal Offer
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
              MORE STYLE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-400">LESS PRICE.</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium mb-8 max-w-lg">
              Unlock exclusive savings on our premium collection. Limited time only.
            </p>
            <Link href="/collection/sale" className="inline-block px-10 py-4 bg-white text-primary-900 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300">
              Claim Offer Now
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-center md:text-left group hover:bg-white hover:text-primary-900 transition-all duration-500">
              <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-2">Buy 2 Get 1</p>
              <p className="text-3xl font-black mb-2">FREE</p>
              <p className="text-gray-500 text-sm group-hover:text-primary-800 transition-colors">On all T-Shirts</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-center md:text-left group hover:bg-white hover:text-primary-900 transition-all duration-500">
              <div className="flex items-center justify-center md:justify-start gap-2 text-accent mb-2">
                <Truck size={20} />
                <p className="text-xs font-bold uppercase tracking-[0.2em]">Free Shipping</p>
              </div>
              <p className="text-3xl font-black mb-2">ABOVE ₹999</p>
              <p className="text-gray-500 text-sm group-hover:text-primary-800 transition-colors">Fast doorstep delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
