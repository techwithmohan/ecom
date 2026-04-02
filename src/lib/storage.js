/**
 * Client-side Storage Utility (localStorage)
 * Replaces the MySQL database for demo purposes
 */

const KEYS = {
  PRODUCTS: 'ut_products',
  CUSTOMERS: 'ut_customers',
  ORDERS: 'ut_orders',
  SETTINGS: 'ut_settings',
  SESSION: 'ut_session'
};

const isBrowser = typeof window !== 'undefined';

const getJSON = (key, defaultValue = []) => {
  if (!isBrowser) return defaultValue;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const setJSON = (key, value) => {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const storage = {
  // PRODUCTS
  getProducts: () => getJSON(KEYS.PRODUCTS, []),
  saveProducts: (products) => setJSON(KEYS.PRODUCTS, products),
  addProduct: (product) => {
    const products = storage.getProducts();
    storage.saveProducts([...products, product]);
  },
  updateProduct: (id, updatedProduct) => {
    const products = storage.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      storage.saveProducts(products);
    }
  },
  deleteProduct: (id) => {
    const products = storage.getProducts();
    storage.saveProducts(products.filter(p => p.id !== id));
  },

  // CUSTOMERS
  getCustomers: () => getJSON(KEYS.CUSTOMERS, []),
  saveCustomers: (customers) => setJSON(KEYS.CUSTOMERS, customers),
  addCustomer: (customer) => {
    const customers = storage.getCustomers();
    const newCustomer = { ...customer, id: Date.now(), registration_date: new Date().toISOString() };
    storage.saveCustomers([...customers, newCustomer]);
    return newCustomer;
  },

  // ORDERS
  getOrders: () => getJSON(KEYS.ORDERS, []),
  saveOrders: (orders) => setJSON(KEYS.ORDERS, orders),
  addOrder: (order) => {
    const orders = storage.getOrders();
    const newOrder = { ...order, id: Date.now(), order_date: new Date().toISOString() };
    storage.saveOrders([...orders, newOrder]);
    return newOrder;
  },

  // SETTINGS
  getSettings: () => getJSON(KEYS.SETTINGS, {
    store_name: 'Urban Threads',
    contact_email: 'contact@urbanthreads.com',
    currency: 'INR',
    maintenance_mode: 'false'
  }),
  saveSettings: (settings) => setJSON(KEYS.SETTINGS, settings),

  // AUTH
  getSession: () => getJSON(KEYS.SESSION, null),
  login: (user) => setJSON(KEYS.SESSION, user),
  logout: () => localStorage.removeItem(KEYS.SESSION),

  // INITIALIZE WITH DATA (Mock Seeding)
  init: (initialProducts = [], initialCategories = []) => {
    if (!isBrowser) return;
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      storage.saveProducts(initialProducts);
    }
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      storage.saveSettings({
        store_name: 'Urban Threads',
        contact_email: 'contact@urbanthreads.com',
        currency: 'INR',
        maintenance_mode: 'false'
      });
    }
  }
};
