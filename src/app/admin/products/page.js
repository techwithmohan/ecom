'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Image as ImageIcon,
  ExternalLink,
  Loader2,
  X
} from 'lucide-react';
import { storage } from '@/lib/storage';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'men',
    price: '',
    image: '',
    description: '',
    stock_quantity: ''
  });

  const loadProducts = () => {
    setLoading(true);
    const data = storage.getProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ id: '', title: '', category: 'men', price: '', image: '', description: '', stock_quantity: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setIsEditMode(true);
    setFormData({
      id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description || '',
      stock_quantity: product.stock_quantity || 0
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    storage.deleteProduct(id);
    loadProducts();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      mrp: parseFloat(formData.price) * 1.2,
      stock_quantity: parseInt(formData.stock_quantity) || 0,
      features: [],
      tags: []
    };

    if (isEditMode) {
      storage.updateProduct(formData.id, productData);
    } else {
      storage.addProduct(productData);
    }

    setIsModalOpen(false);
    loadProducts();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary-900 uppercase tracking-tight">Product <span className="text-accent">Management</span></h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Manage your inventory (Local Storage Mode).</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-8 py-4 bg-primary-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search products by title or ID..." className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3 text-xs focus:ring-1 focus:ring-primary-900 outline-none" />
         </div>
         <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-primary-900 transition-colors">
               <Filter size={14} /> Filter
            </button>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-l border-gray-100 pl-4 ml-2 hidden md:block">
               {products.length} Products Found
            </p>
         </div>
      </div>

      {/* Product List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-accent" size={40} />
          <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading your collection...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500">
               <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                  <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               </div>
               
               <div className="flex-1 text-center md:text-left space-y-1">
                  <p className="text-[10px] font-black text-accent uppercase tracking-widest">{product.category}</p>
                  <h3 className="text-sm font-black text-primary-900 uppercase tracking-tight">{product.title}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {product.id}</p>
               </div>

               <div className="grid grid-cols-3 gap-8 px-8 border-x border-gray-50 hidden lg:grid">
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</p>
                     <p className="text-sm font-black text-primary-900 tracking-tight">₹{product.price}</p>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Stock</p>
                     <p className={`text-sm font-black tracking-tight ${
                        product.stock_quantity > 20 ? 'text-green-600' : 
                        product.stock_quantity > 0 ? 'text-orange-600' : 'text-red-600'
                     }`}>
                        {product.stock_quantity > 0 ? `${product.stock_quantity} Units` : 'Out of Stock'}
                     </p>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sales</p>
                     <p className="text-sm font-black text-primary-900 tracking-tight">0</p>
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openEditModal(product)}
                    className="p-3 hover:bg-gray-50 text-gray-400 hover:text-primary-900 rounded-xl transition-colors"
                  >
                     <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-3 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors"
                  >
                     <Trash2 size={18} />
                  </button>
                  <Link href={`/product/${product.id}`} className="p-3 hover:bg-blue-50 text-gray-400 hover:text-blue-500 rounded-xl transition-colors">
                     <ExternalLink size={18} />
                  </Link>
               </div>
            </div>
          ))}
          {products.length === 0 && (
             <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No products in local storage.</p>
                <button onClick={() => {
                   storage.init(); // You can pass actual product JSON here if needed
                   loadProducts();
                }} className="mt-4 text-xs font-black text-accent uppercase tracking-widest hover:underline">Initialize with defaults</button>
             </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
           <div className="bg-white rounded-[40px] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl">
              <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                 <div className="flex justify-between items-start mb-10">
                    <div>
                       <h2 className="text-3xl font-black text-primary-900 uppercase tracking-tight">
                         {isEditMode ? 'Edit' : 'Add'} <span className="text-accent">Product</span>
                       </h2>
                       <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                         {isEditMode ? 'Update existing product in local storage.' : 'Save to browser local storage.'}
                       </p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400">
                      <X size={24} />
                    </button>
                 </div>

                 <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {!isEditMode && (
                         <div className="md:col-span-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 mb-2 block ml-1">Product ID</label>
                           <input required type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} placeholder="e.g. men-new-tee" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold" />
                         </div>
                       )}
                       <div className="md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 mb-2 block ml-1">Product Title</label>
                          <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Classic Oversized White T-Shirt" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold" />
                       </div>
                       <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 mb-2 block ml-1">Category</label>
                          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none appearance-none font-bold text-gray-500">
                             <option value="men">Men</option>
                             <option value="women">Women</option>
                             <option value="kids">Kids</option>
                          </select>
                       </div>
                       <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 mb-2 block ml-1">Price (₹)</label>
                          <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="499" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold" />
                       </div>
                       <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 mb-2 block ml-1">Stock Quantity</label>
                          <input required type="number" value={formData.stock_quantity} onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})} placeholder="50" min="0" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold" />
                       </div>
                       <div className="md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-primary-900 mb-2 block ml-1">Image URL</label>
                          <div className="relative">
                             <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                             <input required type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="https://unsplash.com/..." className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-1 focus:ring-accent outline-none font-bold" />
                          </div>
                       </div>
                    </div>
                    
                    <button type="submit" className="w-full bg-primary-900 text-white h-16 font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all duration-500 shadow-xl shadow-gray-200 mt-4 rounded-2xl">
                       {isEditMode ? 'Update Product' : 'Create Product'}
                    </button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
