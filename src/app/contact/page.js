import { Mail, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 border-b border-gray-100 pb-8 text-center">Get in Touch</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-lg text-gray-600">
              Have questions or need help? We’re here for you. 
              Our team usually responds within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Mail className="text-black" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Email Us</p>
                  <p className="text-lg font-medium text-gray-900">support@urbanthreads.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Phone className="text-black" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Call Us</p>
                  <p className="text-lg font-medium text-gray-900">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Clock className="text-black" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Response Time</p>
                  <p className="text-lg font-medium text-gray-900">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-black"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-black"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Message</label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:outline-none focus:border-black h-32"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button className="w-full bg-black text-white py-4 font-bold rounded uppercase tracking-widest hover:bg-gray-800 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
