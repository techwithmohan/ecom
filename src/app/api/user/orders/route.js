import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const session = cookies().get('session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userData = JSON.parse(session.value);
    
    // Fetch orders with their items and product images
    const orders = await query(`
      SELECT 
        o.*,
        GROUP_CONCAT(p.image) as item_images,
        COUNT(oi.id) as item_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.customer_id = ? 
      GROUP BY o.id
      ORDER BY o.order_date DESC
    `, [userData.id]);

    return NextResponse.json(orders.map(o => ({
      ...o,
      total_amount: parseFloat(o.total_amount),
      item_images: o.item_images ? o.item_images.split(',') : []
    })));
  } catch (error) {
    console.error('User orders error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
