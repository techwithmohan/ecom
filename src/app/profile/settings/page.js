'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Save, 
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  LogOut,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/user/profile');
        const data = await res.json();
        if (res.ok) {
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || ''
          });
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address
        })
      });

      if (res.ok) {
        setStatus({ type: 'success', message: 'Profile updated successfully!' });
        router.refresh();
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
      setTimeout(() => setStatus({ type: null, message: '' }), 3000);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 text-center">
              <div className="w-24 h-24 bg-primary-900 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-6">
                {formData.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-black text-primary-900 uppercase tracking-tight">{formData.name}</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{formData.email}</p>
              
              <button 
                onClick={handleLogout}
                className="mt-8 flex items-center justify-center gap-2 w-full py-4 text-xs font-black uppercase tracking-widest text-red-500 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>

            <nav className="bg-white p-4 rounded-[30px] shadow-sm border border-gray-100 space-y-1">
              <Link href="/profile" className="flex items-center justify-between px-6 py-4 rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-primary-900 transition-all font-bold text-sm">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} /> Order History
                </div>
                <ChevronRight size={16} />
              </Link>
              <Link href="/profile/settings" className="flex items-center justify-between px-6 py-4 rounded-2xl bg-gray-50 text-primary-900 font-bold text-sm">
                <div className="flex items-center gap-3">
                  <User size={18} /> Account Settings
                </div>
                <ChevronRight size={16} />
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-primary-900 uppercase tracking-tight">Account <span className="text-accent">Settings</span></h1>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Update your personal details and delivery address.</p>
              </div>
              
              {status.message && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest animate-fade-in ${
                  status.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {status.message}
                </div>
              )}
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
               <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          required 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your Name" 
                          className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Email Address (Read Only)</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                          disabled
                          type="email" 
                          value={formData.email}
                          className="w-full bg-gray-50/50 text-gray-400 border-none rounded-2xl pl-14 pr-6 py-4 text-sm outline-none font-bold cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+91 98765 43210" 
                          className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Default Delivery Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-6 text-gray-400" size={18} />
                      <textarea 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="House No, Street, City, State, Pincode" 
                        rows={4}
                        className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex flex-col md:flex-row items-center gap-6">
                    <button 
                      type="submit" 
                      disabled={saving}
                      className="w-full md:w-auto px-12 h-16 bg-primary-900 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-black transition-all duration-500 shadow-xl shadow-gray-200 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                      {saving ? 'Updating...' : 'Save Changes'}
                    </button>
                    
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center md:text-left">
                       Your data is secure and never shared with third parties.
                    </p>
                  </div>
               </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
