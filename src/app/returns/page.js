import { RotateCcw, ShieldCheck, Wallet, HelpCircle } from 'lucide-react';

export default function ReturnPolicy() {
  const policies = [
    { icon: <RotateCcw size={24} />, title: "7-Day Easy Return", content: "We offer a 7-day easy return policy. If you're not satisfied with your purchase, you can return it within 7 days of delivery." },
    { icon: <ShieldCheck size={24} />, title: "Original Condition", content: "Items must be unused, unwashed, and in their original packaging with tags intact." },
    { icon: <Wallet size={24} />, title: "Quick Refund", content: "Refunds are processed within 5–7 business days once the returned item reaches our warehouse." },
    { icon: <HelpCircle size={24} />, title: "Need Help?", content: "Our support team is always here to assist you with any return or exchange requests." },
  ];

  return (
    <main className="min-h-screen py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 border-b border-gray-100 pb-8 text-center md:text-left">Return & Refund Policy</h1>
        
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policies.map((policy, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-black mb-6">{policy.icon}</div>
                <h3 className="font-bold text-xl mb-4">{policy.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {policy.content}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-black text-white p-10 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">How to Initiate a Return</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-300">
              <li>Log in to your account and go to 'My Orders'.</li>
              <li>Select the item you wish to return and click 'Request Return'.</li>
              <li>Choose the reason for return and upload images if required.</li>
              <li>Once approved, a reverse pickup will be scheduled within 24–48 hours.</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
