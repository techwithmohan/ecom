'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=2000",
      title: "WEAR YOUR <span class='text-accent'>STORY.</span>",
      subtitle: "Premium Cotton Essentials",
      desc: "Discover the perfect blend of comfort and contemporary style. Crafted for every body, every day.",
      link: "/category/men",
      linkText: "Shop Men"
    },
    {
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000",
      title: "OWN THE <span class='text-accent'>COMFORT.</span>",
      subtitle: "Exclusive Women's Collection",
      desc: "Soft fabrics, flattering fits, and designs that match your mood. Elevate your everyday wardrobe.",
      link: "/category/women",
      linkText: "Shop Women"
    },
    {
      image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=2000",
      title: "NEW DROPS <span class='text-accent'>LIVE.</span>",
      subtitle: "Summer Arrival 2026",
      desc: "Fresh styles, premium fabrics, and contemporary designs. Be the first to wear the future.",
      link: "/collection/trending",
      linkText: "Explore Trending"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-primary-950">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="container-custom relative z-20">
        <div className="max-w-3xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${index === currentSlide ? 'block' : 'hidden animate-fade-in'}`}
            >
              <div className="animate-slide-up">
                <span className="inline-block text-accent font-black tracking-[0.3em] uppercase text-xs mb-4">
                  {slide.subtitle}
                </span>
                <h1 
                  className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight uppercase"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
                <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl leading-relaxed">
                  {slide.desc}
                </p>
                
                <div className="flex flex-wrap gap-5">
                  <Link href={slide.link} className="group flex items-center gap-2 px-10 py-4 bg-white text-primary-900 font-black uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-all duration-500 shadow-xl shadow-black/20">
                    {slide.linkText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/about" className="group flex items-center gap-2 px-10 py-4 border border-white/30 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-500">
                    Our Story
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-4">
        <button 
          onClick={prevSlide}
          className="p-3 border border-white/20 text-white hover:bg-white hover:text-primary-900 transition-all duration-300 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 border border-white/20 text-white hover:bg-white hover:text-primary-900 transition-all duration-300 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-500 ${
              index === currentSlide ? 'w-12 bg-accent' : 'w-4 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Vertical decoration text */}
      <div className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden h-64">
        <p className="text-white/5 text-9xl font-black whitespace-nowrap rotate-90 origin-center tracking-tighter">
          COLLECTION 2026
        </p>
      </div>
    </section>
  );
}
