import { Truck, Package, Clock, Globe } from 'lucide-react';

export default function ShippingPolicy() {
  const steps = [
    { icon: <Clock size={24} />, title: "Order Processing", content: "Orders are processed within 24 hours of being placed." },
    { icon: <Truck size={24} />, title: "Delivery Time", content: "Standard delivery takes 3–7 business days depending on your location." },
    { icon: <Package size={24} />, title: "Shipping Cost", content: "Free shipping on orders above ₹999. Standard shipping charges apply for orders below that." },
    { icon: <Globe size={24} />, title: "Nationwide Coverage", content: "We deliver across all major cities and towns in India." },
  ];

  return (
    <main className="min-h-screen py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 border-b border-gray-100 pb-8">Shipping Policy</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex space-x-6 p-6 border border-gray-100 rounded-xl">
              <div className="text-black shrink-0">{step.icon}</div>
              <div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-sm text-gray-500 max-w-none space-y-4">
          <p>
            Please note that during peak sale periods or holiday seasons, delivery times may be slightly longer. 
            Once your order is shipped, you will receive a tracking ID via email/SMS to monitor your delivery status.
          </p>
          <p>
            If you have any specific delivery requests or need assistance with your shipment, 
            please contact our support team at support@urbanthreads.com.
          </p>
        </div>
      </div>
    </main>
  );
}
