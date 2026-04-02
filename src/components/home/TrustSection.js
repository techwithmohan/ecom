import { Users, ShieldCheck, RotateCcw, Truck, Award, Zap } from 'lucide-react';

export default function TrustSection() {
  const features = [
    { 
      icon: <Users size={28} strokeWidth={1.5} />, 
      title: "50k+ Customers",
      desc: "Trusted by fashion lovers"
    },
    { 
      icon: <ShieldCheck size={28} strokeWidth={1.5} />, 
      title: "Premium Fabric",
      desc: "100% Breathable cotton"
    },
    { 
      icon: <RotateCcw size={28} strokeWidth={1.5} />, 
      title: "Easy Returns",
      desc: "10-Day no question return"
    },
    { 
      icon: <Truck size={28} strokeWidth={1.5} />, 
      title: "Fast Delivery",
      desc: "Free shipping over ₹999"
    },
  ];

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-primary-900 mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
