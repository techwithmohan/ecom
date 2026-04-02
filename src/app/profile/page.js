'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  MapPin, 
  LogOut, 
  User, 
  ChevronRight,
  Loader2,
  Calendar,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { storage } from '@/lib/storage';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = storage.getSession();
    if (!session) {
      router.push('/login');
      return;
    }
    setUser(session);
    setOrders(storage.getOrders().filter(o => o.customer_id === session.id));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    storage.logout();
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-orange-600 bg-orange-50';
      case 'shipped': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 text-center">
              <div className="w-24 h-24 bg-primary-900 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-6">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-black text-primary-900 uppercase tracking-tight">{user?.name}</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">{user?.email}</p>
              
              <button 
                onClick={handleLogout}
                className="mt-8 flex items-center justify-center gap-2 w-full py-4 text-xs font-black uppercase tracking-widest text-red-500 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            <div>
              <h1 className="text-3xl font-black text-primary-900 uppercase tracking-tight">Order <span className="text-accent">History</span></h1>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Stored in your browser (LocalStorage Mode).</p>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white p-20 rounded-[40px] border border-gray-100 shadow-sm text-center">
                <Package size={64} className="mx-auto text-gray-200 mb-6" />
                <h3 className="text-xl font-black text-primary-900 uppercase tracking-tight">No Orders Yet</h3>
                <Link href="/" className="px-10 py-5 bg-primary-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl mt-8 inline-block">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 flex items-center justify-between">
                     <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Order #UT-{order.id}</p>
                        <p className="text-lg font-black text-primary-900">₹{order.total_amount}</p>
                     </div>
                     <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                        {order.status}
                     </span>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
