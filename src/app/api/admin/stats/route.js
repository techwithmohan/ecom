import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [productCount] = await query('SELECT COUNT(*) as count FROM products');
    const [avgPrice] = await query('SELECT AVG(price) as avg FROM products');
    const categoryStats = await query(`
      SELECT category, COUNT(*) as count 
      FROM products 
      GROUP BY category
    `);

    // Mock revenue/orders since we don't have orders table yet
    const stats = [
      { name: 'Total Products', value: productCount.count, icon: 'ShoppingBag', trend: '+2', isUp: true },
      { name: 'Avg Price', value: `₹${Math.round(avgPrice.avg || 0)}`, icon: 'DollarSign', trend: '+5%', isUp: true },
      { name: 'Categories', value: categoryStats.length, icon: 'Users', trend: 'Steady', isUp: true },
    ];

    return NextResponse.json({
      stats,
      categoryStats: categoryStats.map(c => ({
        name: c.category.charAt(0).toUpperCase() + c.category.slice(1),
        val: Math.round((c.count / productCount.count) * 100) || 0,
        color: c.category === 'men' ? 'bg-accent' : c.category === 'women' ? 'bg-primary-900' : 'bg-gray-300'
      }))
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
