'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  Edit3,
  Trash2,
  ShoppingBag,
  DollarSign,
  Calendar,
  Loader2,
  Plus,
  Mail,
  Phone,
  MapPin,
  X
} from 'lucide-react';
import { storage } from '@/lib/storage';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const loadCustomers = () => {
    setLoading(true);
    const data = storage.getCustomers();
    setCustomers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    const allCustomers = storage.getCustomers();
    storage.saveCustomers(allCustomers.filter(c => c.id !== id));
    loadCustomers();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storage.addCustomer(formData);
    setIsAddModalOpen(false);
    setFormData({ name: '', email: '', phone: '', address: '' });
    loadCustomers();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary-900 uppercase tracking-tight">Customer <span className="text-accent">Management</span></h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Manage registered customers (Local Storage Mode).</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-primary-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200"
        >
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search customers..." className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3 text-xs focus:ring-1 focus:ring-primary-900 outline-none" />
         </div>
         <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-primary-900 transition-colors">
               <Filter size={14} /> Filter
            </button>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100 pl-4 ml-2 hidden md:block">
               {customers.length} Customers Found
            </p>
         </div>
      </div>

      {/* Customer List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-accent" size={40} />
          <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading customer data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {customers.map((customer) => (
            <div key={customer.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h3 className="text-lg font-black text-primary-900 uppercase tracking-tight">{customer.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Mail size={14} />
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>Registered: {formatDate(customer.registration_date)}</span>
                    <span>ID: #{customer.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-3 hover:bg-gray-50 text-gray-400 hover:text-primary-900 rounded-xl transition-colors">
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="p-3 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {customers.length === 0 && (
             <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No customers found.</p>
             </div>
          )}
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
           <div className="bg-white rounded-[40px] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl">
              <div className="p-10">
                 <div className="flex justify-between items-start mb-10">
                    <div>
                       <h2 className="text-3xl font-black text-primary-900 uppercase tracking-tight">Add <span className="text-accent">New Customer</span></h2>
                       <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Register a new customer account locally.</p>
                    </div>
                    <button onClick={() => setIsAddModalOpen(false)} className="p-3 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400"><X size={24} /></button>
                 </div>

                 <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 mb-2 block ml-1">Full Name</label>
                          <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold" />
                       </div>
                       <div className="md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 mb-2 block ml-1">Email Address</label>
                          <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold" />
                       </div>
                    </div>

                    <button type="submit" className="w-full bg-primary-900 text-white h-16 font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all duration-500 shadow-xl shadow-gray-200 mt-4 rounded-2xl">
                       Create Customer Account
                    </button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
