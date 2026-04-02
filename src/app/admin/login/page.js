'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'admin' }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid admin credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black tracking-tighter text-primary-900 inline-block mb-4">
            URBAN<span className="text-accent">THREADS</span>
          </Link>
          <h1 className="text-xl font-black text-primary-900 uppercase tracking-widest">Admin Control Panel</h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-2">Secure access for authorized personnel only.</p>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-3 animate-shake">
              <AlertCircle size={20} />
              <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@urbanthreads.com" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-900 text-white h-16 font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all duration-500 shadow-xl shadow-gray-200 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : null}
              {loading ? 'Authenticating...' : 'Enter Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Forget password? Contact technical support.
        </p>
      </div>
    </div>
  );
}
