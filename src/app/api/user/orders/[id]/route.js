import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request, { params }) {
  const { id } = params;
  const session = cookies().get('session');
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userData = JSON.parse(session.value);
    
    const [orders] = await query(`
      SELECT * FROM orders 
      WHERE id = ? AND customer_id = ?
    `, [id, userData.id]);

    if (!orders) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...orders,
      total_amount: parseFloat(orders.total_amount)
    });
  } catch (error) {
    console.error('Order tracking error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
