'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '', image: '' });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message, image = '') => {
    setToast({ visible: true, message, image });
    setTimeout(() => {
      setToast({ visible: false, message: '', image: '' });
    }, 4000);
  };

  const addToCart = (product, size) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      return [...prevCart, { ...product, size, quantity: 1 }];
    });
    
    showToast(`${product.title} (Size: ${size}) added to cart!`, product.image);
  };

  const removeFromCart = (id, size) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
      
      {/* Custom Toast Notification */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${
        toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-white shadow-2xl rounded-2xl p-4 flex items-center gap-4 border border-gray-100 min-w-[320px] max-w-[400px]">
          {toast.image ? (
            <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
               <img src={toast.image} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="p-2 bg-green-50 text-green-600 rounded-full shrink-0">
               <CheckCircle2 size={24} />
            </div>
          )}
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-widest text-accent mb-1">Success!</p>
            <p className="text-sm font-bold text-primary-900 leading-tight mb-2">{toast.message}</p>
            <Link 
              href="/checkout" 
              onClick={() => setToast({ ...toast, visible: false })}
              className="text-[10px] font-black uppercase tracking-widest text-primary-900 border-b border-primary-900 pb-0.5 hover:text-accent hover:border-accent transition-colors"
            >
              Checkout Now
            </Link>
          </div>
          <button 
            onClick={() => setToast({ ...toast, visible: false })}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}