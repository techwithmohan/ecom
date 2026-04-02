'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check auth status
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) setUser(data.user);
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Men', href: '/category/men' },
    { name: 'Women', href: '/category/women' },
    { name: 'Kids', href: '/category/kids' },
    { name: 'Trending', href: '/collection/trending', isAccent: true },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4'
    } border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button 
              className="text-gray-600 hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black tracking-tighter text-primary-900 group">
              URBAN<span className="text-accent group-hover:translate-x-0.5 inline-block transition-transform duration-300">THREADS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:opacity-70 ${
                  link.isAccent ? 'text-accent' : 'text-primary-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 hover:text-black transition-colors"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            <Link 
              href={user ? (user.role === 'admin' ? '/admin' : '/profile') : '/login'} 
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
            >
              <User size={20} strokeWidth={1.5} />
              {user && (
                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </Link>

            <Link href="/checkout" className="text-gray-700 hover:text-black transition-colors relative group">
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span className="absolute -top-2 -right-2 bg-primary-900 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-4 text-base font-bold uppercase tracking-wider border-b border-gray-50 last:border-0 ${
                link.isAccent ? 'text-accent' : 'text-primary-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link 
              href={user.role === 'admin' ? '/admin' : '/profile'}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-4 text-base font-bold uppercase tracking-wider text-accent"
            >
              My Dashboard
            </Link>
          )}
        </div>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
