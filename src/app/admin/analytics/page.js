'use client';
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  Loader2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { storage } from '@/lib/storage';

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const products = storage.getProducts();
    const orders = storage.getOrders();
    const customers = storage.getCustomers();

    const totalRevenue = orders.reduce((acc, curr) => acc + (parseFloat(curr.total_amount) || 0), 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    setData({
      overview: {
        totalRevenue,
        totalOrders: orders.length,
        totalCustomers: customers.length,
        avgOrderValue
      },
      recentOrders: orders.slice(-5).reverse(),
      categoryStats: [
        { name: 'Men', val: products.filter(p => p.category === 'men').length },
        { name: 'Women', val: products.filter(p => p.category === 'women').length },
        { name: 'Kids', val: products.filter(p => p.category === 'kids').length }
      ]
    });
    setLoading(false);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Calculating analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-primary-900 uppercase tracking-tight">Analytics <span className="text-accent">& Insights</span></h1>
        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Live data from browser local storage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-2xl"><DollarSign className="text-green-600" size={24} /></div>
            <div className="flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full bg-green-50 text-green-600"><ArrowUpRight size={12} /> Live</div>
          </div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Revenue</p>
          <p className="text-2xl font-black text-primary-900 tracking-tight">{formatCurrency(data.overview.totalRevenue)}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl"><ShoppingBag className="text-blue-600" size={24} /></div>
            <div className="flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full bg-blue-50 text-blue-600"><ArrowUpRight size={12} /> Live</div>
          </div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Orders</p>
          <p className="text-2xl font-black text-primary-900 tracking-tight">{data.overview.totalOrders}</p>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-md">
        <h3 className="text-lg font-black uppercase tracking-widest text-primary-900 mb-8">Inventory Mix</h3>
        <div className="space-y-6">
          {data.categoryStats.map((category) => {
            const total = data.categoryStats.reduce((acc, curr) => acc + curr.val, 0) || 1;
            const width = (category.val / total) * 100;
            return (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-primary-900">{category.name}</span>
                  <span className="text-gray-400">{category.val} items</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${width}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
