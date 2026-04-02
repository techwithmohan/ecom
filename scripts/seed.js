const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const categories_data = [
  { id: 'men', name: 'MEN', tagline: 'Bold. Minimal. Confident.', description: 'Explore everyday essentials and statement styles.', cta: 'Shop Men’s T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
  { id: 'women', name: 'WOMEN', tagline: 'Soft. Stylish. Expressive.', description: 'Trendy fits designed to match your vibe.', cta: 'Shop Women’s T-Shirts', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=800' },
  { id: 'kids', name: 'KIDS', tagline: 'Fun. Colorful. Playful.', description: 'Comfortable tees for every adventure.', cta: 'Shop Kids’ T-Shirts', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=800' }
];

const generateProducts = (category, count) => {
  const products = [];
  const styles = ['Oversized', 'Classic', 'Graphic', 'Vintage', 'Premium', 'Streetwear', 'Minimalist', 'Cotton', 'Summer', 'Printed'];
  const colors = ['Black', 'White', 'Navy Blue', 'Forest Green', 'Sand', 'Pastel Pink', 'Cream', 'Charcoal', 'Burgundy', 'Sky Blue'];

  for (let i = 1; i <= count; i++) {
    const style = styles[i-1];
    const color = colors[i-1];
    const price = 299 + (Math.floor(Math.random() * 10) * 50);
    const mrp = Math.round(price * 1.4);

    products.push({
      id: `${category}-${i}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)}’s ${style} Tee – ${color}`,
      category: category,
      price: price,
      mrp: mrp,
      discount: `${Math.round((1 - price/mrp) * 100)}% OFF`,
      description: `This ${style.toLowerCase()} T-shirt in ${color.toLowerCase()} is designed for maximum comfort and style.`,
      features: JSON.stringify(["100% Premium Cotton", "Durable Print", "Breathable Fabric"]),
      image: category === 'men' 
        ? `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800&sig=${i}`
        : category === 'women'
        ? `https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=800&sig=${i}`
        : `https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=800&sig=${i}`,
      stock_quantity: Math.floor(Math.random() * 50) + 10,
      isBestSeller: i <= 3,
      isNewArrival: i > 7,
      tags: JSON.stringify(i % 2 === 0 ? ["trending"] : ["summer"])
    });
  }
  return products;
};

async function seed() {
  console.log('--- Database Seeding Process (Secure Mode) ---');
  
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });
    console.log('✅ Connected to MySQL server');
    
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\``);
    await connection.changeUser({ database: process.env.MYSQL_DATABASE });
    console.log(`✅ Database "${process.env.MYSQL_DATABASE}" ready`);
  } catch (error) {
    console.error('❌ CONNECTION FAILED!', error.message);
    return;
  }

  try {
    // 1. Tables Creation
    await connection.execute(`CREATE TABLE IF NOT EXISTS admins (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) UNIQUE, email VARCHAR(100) UNIQUE, password VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
    await connection.execute(`CREATE TABLE IF NOT EXISTS settings (setting_key VARCHAR(50) PRIMARY KEY, setting_value TEXT, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);
    await connection.execute(`CREATE TABLE IF NOT EXISTS categories (id VARCHAR(50) PRIMARY KEY, name VARCHAR(100), tagline VARCHAR(255), description TEXT, cta VARCHAR(100), image VARCHAR(255))`);
    await connection.execute(`CREATE TABLE IF NOT EXISTS products (id VARCHAR(50) PRIMARY KEY, title VARCHAR(255), category VARCHAR(50), price DECIMAL(10, 2), mrp DECIMAL(10, 2), discount VARCHAR(50), description TEXT, features JSON, image VARCHAR(255), stock_quantity INT DEFAULT 0, isBestSeller BOOLEAN DEFAULT FALSE, isNewArrival BOOLEAN DEFAULT FALSE, tags JSON, FOREIGN KEY (category) REFERENCES categories(id))`);
    await connection.execute(`CREATE TABLE IF NOT EXISTS customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, phone VARCHAR(20), address TEXT)`);
    await connection.execute(`CREATE TABLE IF NOT EXISTS orders (id INT AUTO_INCREMENT PRIMARY KEY, customer_id INT, total_amount DECIMAL(10, 2), status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending', order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, shipping_address TEXT, payment_method VARCHAR(50), tracking_number VARCHAR(100), FOREIGN KEY (customer_id) REFERENCES customers(id))`);
    await connection.execute(`CREATE TABLE IF NOT EXISTS order_items (id INT AUTO_INCREMENT PRIMARY KEY, order_id INT, product_id VARCHAR(50), quantity INT DEFAULT 1, price_at_purchase DECIMAL(10, 2), FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE, FOREIGN KEY (product_id) REFERENCES products(id))`);

    // Ensure columns exist
    try { await connection.execute('ALTER TABLE products ADD COLUMN stock_quantity INT DEFAULT 0 AFTER image'); } catch(e) {}
    try { await connection.execute('ALTER TABLE orders ADD COLUMN tracking_number VARCHAR(100) AFTER payment_method'); } catch(e) {}

    // 2. Hash Passwords
    const adminPass = await bcrypt.hash('admin123', 10);
    const userPass = await bcrypt.hash('user123', 10);

    // 3. Seed Admin
    await connection.execute('INSERT INTO admins (username, email, password) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password=VALUES(password)', ['admin', 'admin@urbanthreads.com', adminPass]);
    console.log('✅ Admin account secured with hashing');

    // 4. Seed Demo User
    await connection.execute(
      'INSERT INTO customers (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE password=VALUES(password)', 
      ['Demo User', 'user@example.com', userPass, '+91 9988776655', 'Apartment 402, Skyline Towers, Mumbai']
    );
    console.log('✅ Demo user account secured with hashing');

    // 5. Seed Categories & 6. Seed 30 Products
    for (const cat of categories_data) {
      await connection.execute('INSERT INTO categories (id, name, tagline, description, cta, image) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)', [cat.id, cat.name, cat.tagline, cat.description, cat.cta, cat.image]);
    }
    const allProducts = [...generateProducts('men', 10), ...generateProducts('women', 10), ...generateProducts('kids', 10)];
    for (const prod of allProducts) {
      await connection.execute(
        'INSERT INTO products (id, title, category, price, mrp, discount, description, features, image, stock_quantity, isBestSeller, isNewArrival, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title), price=VALUES(price)',
        [prod.id, prod.title, prod.category, prod.price, prod.mrp, prod.discount, prod.description, prod.features, prod.image, prod.stock_quantity, prod.isBestSeller, prod.isNewArrival, prod.tags]
      );
    }
    console.log('✅ Catalog synchronized');

    // 7. Seed Demo Orders
    const [userRows] = await connection.execute('SELECT id FROM customers WHERE email = "user@example.com"');
    if (userRows.length > 0) {
      const uid = userRows[0].id;
      await connection.execute('DELETE FROM orders WHERE customer_id = ?', [uid]);
      const demoOrders = [
        { amt: 1299, status: 'delivered', track: 'UT-948271', date: '2024-03-15 10:30:00', items: ['men-1', 'men-2'] },
        { amt: 499, status: 'shipped', track: 'UT-382910', date: '2024-03-28 14:20:00', items: ['women-1'] }
      ];
      for (const o of demoOrders) {
        const [res] = await connection.execute('INSERT INTO orders (customer_id, total_amount, status, order_date, shipping_address, payment_method, tracking_number) VALUES (?, ?, ?, ?, ?, ?, ?)', [uid, o.amt, o.status, o.date, 'Apartment 402, Skyline Towers, Mumbai', 'Credit Card', o.track]);
        for (const pid of o.items) { await connection.execute('INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)', [res.insertId, pid, 1, 499]); }
      }
    }

    console.log('\n🎉 ALL DONE! Your database is now SECURE with hashed passwords.');
  } catch (error) {
    console.error('❌ SEEDING ERROR:', error);
  } finally {
    if (connection) await connection.end();
  }
}

seed();
