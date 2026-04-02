'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { storage } from '@/lib/storage';

export default function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAction = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (isLogin) {
        // Admin Hack for Demo
        if (formData.email === 'admin@urbanthreads.com' && formData.password === 'admin123') {
           storage.login({ id: 0, name: 'Admin', email: formData.email, role: 'admin' });
           router.push('/admin');
           return;
        }

        // Regular User
        const customers = storage.getCustomers();
        const user = customers.find(c => c.email === formData.email);
        
        if (user) {
          storage.login({ ...user, role: 'user' });
          router.push('/profile');
        } else {
          setError('Invalid credentials or account does not exist.');
          setLoading(false);
        }
      } else {
        // Register
        const customers = storage.getCustomers();
        if (customers.find(c => c.email === formData.email)) {
          setError('Email already registered.');
          setLoading(false);
          return;
        }
        const newUser = storage.addCustomer(formData);
        storage.login({ ...newUser, role: 'user' });
        router.push('/profile');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="text-4xl font-black tracking-tighter text-primary-900 inline-block mb-8">
            URBAN<span className="text-accent">THREADS</span>
          </Link>
          <h1 className="text-2xl font-black text-primary-900 uppercase tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-2">
            Local Storage Mode Enabled
          </p>
        </div>

        <div className="space-y-8">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-3 animate-fade-in">
              <AlertCircle size={20} />
              <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
            </div>
          )}

          <form onSubmit={handleAction} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="name@example.com" className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary-900 text-white h-16 font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all duration-500 shadow-xl shadow-gray-200 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 mt-4">
              {loading ? <Loader2 className="animate-spin" size={18} /> : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary-900 transition-colors">
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
