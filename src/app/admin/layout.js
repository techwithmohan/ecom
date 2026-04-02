'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell,
  Search
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    { name: 'Products', icon: <Package size={20} />, href: '/admin/products' },
    { name: 'Customers', icon: <Users size={20} />, href: '/admin/customers' },
    { name: 'Analytics', icon: <BarChart3 size={20} />, href: '/admin/analytics' },
    { name: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-gray-50">
          <Link href="/" className="text-xl font-black tracking-tighter text-primary-900">
            URBAN<span className="text-accent">THREADS</span>
            <span className="ml-2 text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-400 font-bold uppercase">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                pathname === item.href
                  ? 'bg-primary-900 text-white shadow-lg shadow-gray-200'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-primary-900'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50">
           <button
             onClick={handleLogout}
             className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
           >
              <LogOut size={20} /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="relative w-96 hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search analytics, orders..." 
                className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-primary-900 transition-all"
              />
           </div>
           
           <div className="flex items-center gap-6">
              <button className="relative text-gray-400 hover:text-primary-900 transition-colors p-2 bg-gray-50 rounded-full">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-primary-900 uppercase tracking-widest">Admin User</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Super Admin</p>
                 </div>
                 <div className="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center text-white font-black text-xs">
                    AU
                 </div>
              </div>
           </div>
        </header>

        {/* Page Area */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}