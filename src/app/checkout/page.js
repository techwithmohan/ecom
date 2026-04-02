'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ChevronRight, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartCount, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (isOrderPlaced) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center pt-20 pb-20">
        <div className="container-custom text-center animate-scale-in">
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
             <ShieldCheck size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary-900 mb-6 uppercase tracking-tight">Order <span className="text-accent">Placed!</span></h1>
          <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto">
             Thank you for shopping with URBAN THREADS. Your order is being processed and will arrive in 3-5 business days.
          </p>
          <Link href="/" className="inline-block px-12 py-4 bg-primary-900 text-white font-black uppercase tracking-widest text-sm hover:bg-accent transition-all duration-300">
             Back To Home
          </Link>
        </div>
      </main>
    );
  }

  if (cartCount === 0) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center pt-20 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-black text-primary-900 mb-6 uppercase tracking-tight">Your Cart is <span className="text-accent">Empty.</span></h1>
          <p className="text-gray-500 mb-12">Looks like you haven't added anything yet.</p>
          <Link href="/" className="inline-block px-12 py-4 bg-primary-900 text-white font-black uppercase tracking-widest text-sm hover:bg-accent transition-all duration-300">
             Explore Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="container-custom">
        <div className="flex items-center gap-4 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
           <Link href="/" className="hover:text-primary-900 transition-colors flex items-center gap-2"><ArrowLeft size={14} /> Home</Link>
           <ChevronRight size={14} />
           <span className="text-primary-900">Checkout</span>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-primary-900 mb-8 uppercase tracking-tight">Shipping <span className="text-accent">Address</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required type="text" placeholder="First Name" className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm outline-none focus:ring-1 focus:ring-accent transition-all" />
                <input required type="text" placeholder="Last Name" className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm outline-none focus:ring-1 focus:ring-accent transition-all" />
                <input required type="email" placeholder="Email Address" className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm outline-none focus:ring-1 focus:ring-accent transition-all md:col-span-2" />
                <input required type="text" placeholder="Address line 1" className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm outline-none focus:ring-1 focus:ring-accent transition-all md:col-span-2" />
                <input required type="text" placeholder="City" className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm outline-none focus:ring-1 focus:ring-accent transition-all" />
                <input required type="text" placeholder="Pincode" className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl text-sm outline-none focus:ring-1 focus:ring-accent transition-all" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-primary-900 mb-8 uppercase tracking-tight">Payment <span className="text-accent">Method</span></h2>
              <div className="space-y-4">
                 <label className="flex items-center gap-4 p-6 border-2 border-primary-900 rounded-2xl cursor-pointer bg-primary-900 text-white transition-all">
                    <input defaultChecked type="radio" name="payment" className="w-4 h-4 accent-accent" />
                    <div>
                       <p className="text-sm font-black uppercase tracking-widest">Cash on Delivery</p>
                       <p className="text-[10px] opacity-60">Pay when your order arrives at your doorstep.</p>
                    </div>
                 </label>
                 <label className="flex items-center gap-4 p-6 border-2 border-gray-100 rounded-2xl cursor-pointer hover:border-accent transition-all">
                    <input type="radio" name="payment" className="w-4 h-4 accent-accent" disabled />
                    <div className="opacity-40">
                       <p className="text-sm font-black uppercase tracking-widest">Online Payment</p>
                       <p className="text-[10px]">Credit Card, UPI, Wallets (Temporarily Disabled)</p>
                    </div>
                 </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-black text-primary-900 mb-8 uppercase tracking-tight">Order <span className="text-accent">Summary</span></h2>
              
              <div className="max-h-[320px] overflow-y-auto pr-4 mb-8 space-y-6 custom-scrollbar">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-1">{item.size}</p>
                      <h3 className="text-sm font-black text-primary-900 mb-1 leading-tight uppercase line-clamp-2">{item.title}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-bold text-gray-400">Qty: {item.quantity}</p>
                        <p className="text-sm font-black text-primary-900">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-8 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-primary-900 font-black">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="text-primary-900 font-black">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-xl border-t border-gray-100 pt-4">
                  <span className="text-primary-900 font-black uppercase tracking-tight">Total</span>
                  <span className="text-accent font-black tracking-tighter">₹{total}</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-primary-900 text-white h-16 font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all duration-500 shadow-xl shadow-gray-200 mb-8">
                Place Order
              </button>

              <div className="space-y-4 pt-4">
                 <div className="flex items-center gap-3 text-gray-400">
                    <ShieldCheck size={18} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</p>
                 </div>
                 <div className="flex items-center gap-3 text-gray-400">
                    <Truck size={18} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">3-5 Day Delivery</p>
                 </div>
                 <div className="flex items-center gap-3 text-gray-400">
                    <RotateCcw size={18} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">10 Day Easy Return</p>
                 </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}