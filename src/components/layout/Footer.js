import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube, Send } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Men', href: '/category/men' },
      { name: 'Women', href: '/category/women' },
      { name: 'Kids', href: '/category/kids' },
      { name: 'Trending', href: '/collection/trending' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Brand Story', href: '/about' },
      { name: 'Sustainability', href: '/about' },
    ],
    support: [
      { name: 'Track Order', href: '/track-order' },
      { name: 'Shipping Policy', href: '/shipping' },
      { name: 'Return Policy', href: '/returns' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-black tracking-tighter text-primary-900 mb-6 block">
              URBAN<span className="text-accent">THREADS</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
              Premium apparel designed for the modern individual. We blend comfort with contemporary style to help you wear your story every day.
            </p>
            <div className="flex space-x-5">
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors"><Instagram size={20} strokeWidth={1.5} /></Link>
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors"><Facebook size={20} strokeWidth={1.5} /></Link>
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors"><Twitter size={20} strokeWidth={1.5} /></Link>
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors"><Youtube size={20} strokeWidth={1.5} /></Link>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-900 mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-primary-900 text-sm transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-900 mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-primary-900 text-sm transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-900 mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 hover:text-primary-900 text-sm transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary-900 mb-6">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4">Stay updated with our latest drops.</p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-gray-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-primary-900 transition-all outline-none pr-10"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary-900 transition-colors"
              >
                <Send size={18} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs tracking-wide">
            © {currentYear} URBAN THREADS PVT LTD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             {/* Payment Icons Placeholder */}
             <div className="text-[10px] font-bold border border-gray-200 px-2 py-0.5 rounded text-gray-400">VISA</div>
             <div className="text-[10px] font-bold border border-gray-200 px-2 py-0.5 rounded text-gray-400">MASTERCARD</div>
             <div className="text-[10px] font-bold border border-gray-200 px-2 py-0.5 rounded text-gray-400">UPI</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
