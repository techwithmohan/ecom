'use client';
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const iconMap = {
    ShoppingBag: <ShoppingBag className="text-orange-600" />,
    DollarSign: <DollarSign className="text-blue-600" />,
    Users: <Users className="text-purple-600" />,
    TrendingUp: <TrendingUp className="text-green-600" />
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading Dashboard...</p>
      </div>
    );
  }

  const stats = data?.stats || [];
  const categoryStats = data?.categoryStats || [];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary-900 uppercase tracking-tight">Dashboard <span className="text-accent">Overview</span></h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Welcome back, here is what's happening today.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2.5 bg-white border border-gray-200 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-colors">Export Report</button>
           <button className="px-6 py-2.5 bg-primary-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200">View Live Store</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform">
                   {iconMap[stat.icon]}
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                   {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                   {stat.trend}
                </div>
             </div>
             <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.name}</p>
             <p className="text-2xl font-black text-primary-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Analytics Visuals Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-96 flex flex-col">
            <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary-900">Live Traffic</h3>
              <span className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                12 Active Users
              </span>
            </div>
            <div className="flex-1 flex items-end gap-2 px-4 pb-4">
               {[40, 70, 45, 90, 65, 85, 100, 75, 55, 80, 95, 110].map((h, i) => (
                 <div key={i} className="flex-1 bg-gray-50 rounded-t-lg relative group transition-all duration-500 hover:bg-accent cursor-pointer" style={{ height: `${h}%` }}>
                 </div>
               ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">
               <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
         </div>

         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary-900 mb-8 border-b border-gray-50 pb-4">Inventory Mix</h3>
            <div className="space-y-6 flex-1 flex flex-col justify-center">
               {categoryStats.map((c) => (
                 <div key={c.name} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-primary-900">{c.name}</span>
                       <span className="text-gray-400">{c.val}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                       <div className={`${c.color} h-full transition-all duration-1000`} style={{ width: `${c.val}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
