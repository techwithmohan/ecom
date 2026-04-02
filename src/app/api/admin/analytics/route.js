import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Sales Analytics
    const [totalRevenue] = await query('SELECT SUM(total_amount) as total FROM orders WHERE status = "delivered"');
    const [totalOrders] = await query('SELECT COUNT(*) as total FROM orders');
    const [avgOrderValue] = await query('SELECT AVG(total_amount) as avg FROM orders');

    // Customer Analytics
    const [totalCustomers] = await query('SELECT COUNT(*) as total FROM customers');
    const [newCustomersThisMonth] = await query(`
      SELECT COUNT(*) as total FROM customers
      WHERE MONTH(registration_date) = MONTH(CURRENT_DATE())
      AND YEAR(registration_date) = YEAR(CURRENT_DATE())
    `);

    // Product Analytics
    const [totalProducts] = await query('SELECT COUNT(*) as total FROM products');
    const [lowStockProducts] = await query('SELECT COUNT(*) as total FROM products WHERE stock_quantity < 10');
    const topProducts = await query(`
      SELECT p.title, COUNT(o.id) as order_count, SUM(o.total_amount) as revenue
      FROM products p
      LEFT JOIN orders o ON 1=1
      GROUP BY p.id, p.title
      ORDER BY order_count DESC
      LIMIT 5
    `);

    // Order Status Distribution
    const orderStatuses = await query(`
      SELECT status, COUNT(*) as count
      FROM orders
      GROUP BY status
    `);

    // Category Performance
    const categoryPerformance = await query(`
      SELECT c.name, COUNT(p.id) as products_count, SUM(p.price) as total_value
      FROM categories c
      LEFT JOIN products p ON c.id = p.category
      GROUP BY c.id, c.name
    `);

    // Monthly Revenue (last 12 months)
    const monthlyRevenue = await query(`
      SELECT
        DATE_FORMAT(order_date, '%Y-%m') as month,
        SUM(total_amount) as revenue,
        COUNT(*) as orders
      FROM orders
      WHERE order_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
      AND status = 'delivered'
      GROUP BY DATE_FORMAT(order_date, '%Y-%m')
      ORDER BY month
    `);

    // Recent Orders
    const recentOrders = await query(`
      SELECT o.*, c.name as customer_name
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.order_date DESC
      LIMIT 10
    `);

    const analytics = {
      overview: {
        totalRevenue: parseFloat(totalRevenue?.total || 0),
        totalOrders: parseInt(totalOrders?.total || 0),
        avgOrderValue: parseFloat(avgOrderValue?.avg || 0),
        totalCustomers: parseInt(totalCustomers?.total || 0),
        newCustomersThisMonth: parseInt(newCustomersThisMonth?.total || 0),
        totalProducts: parseInt(totalProducts?.total || 0),
        lowStockProducts: parseInt(lowStockProducts?.total || 0)
      },
      topProducts: topProducts.map(p => ({
        ...p,
        order_count: parseInt(p.order_count),
        revenue: parseFloat(p.revenue || 0)
      })),
      orderStatuses: orderStatuses.map(s => ({
        status: s.status,
        count: parseInt(s.count)
      })),
      categoryPerformance: categoryPerformance.map(c => ({
        category: c.name,
        products_count: parseInt(c.products_count),
        total_value: parseFloat(c.total_value || 0)
      })),
      monthlyRevenue: monthlyRevenue.map(m => ({
        month: m.month,
        revenue: parseFloat(m.revenue),
        orders: parseInt(m.orders)
      })),
      recentOrders: recentOrders.map(o => ({
        ...o,
        total_amount: parseFloat(o.total_amount)
      }))
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
