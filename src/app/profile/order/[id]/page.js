'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard,
  Loader2,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/user/orders/${id}`);
        const data = await res.json();
        if (res.ok) {
          setOrder(data);
        } else {
          router.push('/profile');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  const steps = [
    { label: 'Order Placed', status: 'pending', icon: <Clock size={20} /> },
    { label: 'Processing', status: 'processing', icon: <Package size={20} /> },
    { label: 'Shipped', status: 'shipped', icon: <Truck size={20} /> },
    { label: 'Delivered', status: 'delivered', icon: <CheckCircle2 size={20} /> },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order?.status);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container-custom pt-10">
        <Link href="/profile" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary-900 transition-colors mb-10">
          <ArrowLeft size={16} /> Back to History
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <p className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-2">Detailed Tracking</p>
              <h1 className="text-4xl font-black text-primary-900 uppercase tracking-tight">Order #UT-{id?.toString().padStart(6, '0')}</h1>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-2">Placed on {new Date(order?.order_date).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
            </div>

            {/* Visual Tracker */}
            <div className="relative pt-10 pb-10">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-1000 ease-out"
                  style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                />
              </div>
              <div className="relative flex justify-between">
                {steps.map((step, i) => {
                  const isCompleted = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <div key={i} className="flex flex-col items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                        isCompleted ? 'bg-accent border-accent text-white scale-110 shadow-lg shadow-accent/20' : 'bg-white border-gray-100 text-gray-300'
                      }`}>
                        {step.icon}
                      </div>
                      <div className="text-center">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-primary-900' : 'text-gray-400'}`}>{step.label}</p>
                        {isCurrent && <p className="text-[9px] font-bold text-accent uppercase mt-1 animate-pulse">In Progress</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tracking Log Placeholder */}
            <div className="bg-gray-50 rounded-[40px] p-8 md:p-10 space-y-8">
               <h3 className="text-sm font-black text-primary-900 uppercase tracking-widest border-b border-gray-200 pb-6">Shipment Activity</h3>
               <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-sm" />
                    <p className="text-xs font-black text-primary-900 uppercase tracking-widest">Out for Delivery</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Today, 09:42 AM • Local Hub</p>
                  </div>
                  <div className="relative pl-10 opacity-50">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-gray-300 rounded-full border-4 border-white shadow-sm" />
                    <p className="text-xs font-black text-primary-900 uppercase tracking-widest">Arrived at Sort Facility</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Yesterday, 11:20 PM • Regional Center</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <div>
                <h3 className="text-xs font-black text-primary-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <MapPin size={14} className="text-accent" /> Delivery Address
                </h3>
                <p className="text-sm font-bold text-gray-600 leading-relaxed capitalize">
                  {order?.shipping_address || 'John Doe\nHouse No. 123, Sector 4\nGurgaon, Haryana - 122001'}
                </p>
              </div>

              <div className="pt-8 border-t border-gray-50">
                <h3 className="text-xs font-black text-primary-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CreditCard size={14} className="text-accent" /> Payment Method
                </h3>
                <p className="text-sm font-bold text-gray-600 uppercase">
                  {order?.payment_method || 'Credit Card (Ending 4242)'}
                </p>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>₹{(order?.total_amount - 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Shipping</span>
                    <span>₹100</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                    <span className="text-sm font-black text-primary-900 uppercase tracking-widest">Total Amount</span>
                    <span className="text-xl font-black text-accent tracking-tighter">₹{order?.total_amount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-primary-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200">
              Download Invoice
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
