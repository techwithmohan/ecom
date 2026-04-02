'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Package,
  Loader2,
  Edit3,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function CustomerDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`/api/customers/${id}`);
        const data = await res.json();
        setCustomer(data);
      } catch (error) {
        console.error('Failed to fetch customer:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-50 text-green-600';
      case 'processing': return 'bg-orange-50 text-orange-600';
      case 'shipped': return 'bg-blue-50 text-blue-600';
      case 'pending': return 'bg-yellow-50 text-yellow-600';
      case 'cancelled': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading customer details...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-40">
        <h2 className="text-2xl font-black text-primary-900 uppercase tracking-tight mb-4">Customer Not Found</h2>
        <p className="text-gray-500 mb-8">The requested customer could not be found.</p>
        <Link href="/admin/customers" className="px-6 py-3 bg-primary-900 text-white text-sm font-black uppercase tracking-widest rounded-xl">
          Back to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/customers" className="p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <ArrowLeft size={20} className="text-gray-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-primary-900 uppercase tracking-tight">{customer.name}</h1>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Customer ID: #{customer.id}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-colors">
            <Edit3 size={16} /> Edit Customer
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-100 transition-colors">
            <Trash2 size={16} /> Delete Customer
          </button>
        </div>
      </div>

      {/* Customer Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-primary-900 uppercase tracking-tight mb-6">Contact Information</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <Mail className="text-blue-600" size={20} />
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                <p className="text-sm font-bold text-primary-900">{customer.email}</p>
              </div>
            </div>

            {customer.phone && (
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <Phone className="text-green-600" size={20} />
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                  <p className="text-sm font-bold text-primary-900">{customer.phone}</p>
                </div>
              </div>
            )}

            {customer.address && (
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <MapPin className="text-orange-600 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Address</p>
                  <p className="text-sm font-bold text-primary-900">{customer.address}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <Calendar className="text-purple-600" size={20} />
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Registration Date</p>
                <p className="text-sm font-bold text-primary-900">{formatDate(customer.registration_date)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="text-blue-600" size={24} />
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Orders</p>
                <p className="text-2xl font-black text-primary-900">{customer.total_orders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="text-green-600" size={24} />
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Spent</p>
                <p className="text-2xl font-black text-primary-900">{formatCurrency(customer.total_spent)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Package className="text-orange-600" size={24} />
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Last Order</p>
                <p className="text-sm font-bold text-primary-900">
                  {customer.last_order_date ? formatDate(customer.last_order_date) : 'No orders yet'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <h3 className="text-lg font-black text-primary-900 uppercase tracking-tight">Order History</h3>
          <p className="text-gray-500 text-sm mt-1">Recent orders placed by this customer</p>
        </div>

        <div className="overflow-x-auto">
          {customer.orders && customer.orders.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <th className="px-8 py-4 text-left">Order ID</th>
                  <th className="px-8 py-4 text-left">Date</th>
                  <th className="px-8 py-4 text-left">Status</th>
                  <th className="px-8 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {customer.orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6 text-sm font-bold text-primary-900 uppercase tracking-widest">
                      #{order.id}
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-600">
                      {formatDate(order.order_date)}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right text-sm font-black text-primary-900">
                      {formatCurrency(order.total_amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-300 mb-4" size={48} />
              <h4 className="text-lg font-black text-gray-400 uppercase tracking-tight mb-2">No Orders Yet</h4>
              <p className="text-gray-500 text-sm">This customer hasn't placed any orders.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
