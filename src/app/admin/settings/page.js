'use client';
import { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  Globe, 
  Mail, 
  ShieldCheck, 
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { storage } from '@/lib/storage';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    store_name: 'Urban Threads',
    contact_email: 'contact@urbanthreads.com',
    contact_phone: '+91 98765 43210',
    currency: 'INR',
    maintenance_mode: 'false',
    meta_title: 'Urban Threads | Premium Oversized T-Shirts',
    meta_description: 'Shop the latest in premium oversized t-shirts.'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    setLoading(true);
    const data = storage.getSettings();
    if (data) {
      setSettings(prev => ({ ...prev, ...data }));
    }
    setLoading(false);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: '' });

    setTimeout(() => {
      storage.saveSettings(settings);
      setStatus({ type: 'success', message: 'Settings saved to browser!' });
      setSaving(false);
      setTimeout(() => setStatus({ type: null, message: '' }), 3000);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading settings...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'general', name: 'General', icon: <Settings size={18} /> },
    { id: 'seo', name: 'SEO & Meta', icon: <Globe size={18} /> },
    { id: 'security', name: 'Security', icon: <ShieldCheck size={18} /> }
  ];

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary-900 uppercase tracking-tight">Store <span className="text-accent">Settings</span></h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Manage global configurations (Local Storage).</p>
        </div>
        
        {status.message && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest animate-fade-in ${
            status.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
          }`}>
            {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {status.message}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Tab Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab.id 
                ? 'bg-primary-900 text-white shadow-lg shadow-gray-200' 
                : 'bg-white text-gray-400 hover:bg-gray-50 hover:text-primary-900 border border-gray-100'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Settings Form */}
        <div className="flex-1">
          <form onSubmit={handleSave} className="bg-white p-8 md:p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            
            {activeTab === 'general' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Store Name</label>
                  <input 
                    type="text" 
                    value={settings.store_name}
                    onChange={(e) => setSettings({...settings, store_name: e.target.value})}
                    placeholder="Urban Threads" 
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Contact Email</label>
                    <input 
                      type="email" 
                      value={settings.contact_email}
                      onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
                      placeholder="contact@urbanthreads.com" 
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Currency</label>
                    <select 
                      value={settings.currency}
                      onChange={(e) => setSettings({...settings, currency: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none appearance-none font-bold text-gray-500"
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Meta Title</label>
                  <input 
                    type="text" 
                    value={settings.meta_title}
                    onChange={(e) => setSettings({...settings, meta_title: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 ml-1">Meta Description</label>
                  <textarea 
                    value={settings.meta_description}
                    onChange={(e) => setSettings({...settings, meta_description: e.target.value})}
                    rows={4}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold resize-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="space-y-1">
                    <p className="text-sm font-black text-primary-900 uppercase tracking-tight">Maintenance Mode</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Client-side simulation</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSettings({...settings, maintenance_mode: settings.maintenance_mode === 'true' ? 'false' : 'true'})}
                    className={`w-14 h-8 rounded-full p-1 transition-all duration-500 ${settings.maintenance_mode === 'true' ? 'bg-accent' : 'bg-gray-200'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-all duration-500 shadow-sm ${settings.maintenance_mode === 'true' ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={saving}
              className="w-full bg-primary-900 text-white h-16 font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all duration-500 shadow-xl shadow-gray-200 mt-6 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
