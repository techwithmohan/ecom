import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    // Get customer details with order summary
    const [customers] = await query(`
      SELECT
        c.*,
        COUNT(o.id) as total_orders,
        SUM(o.total_amount) as total_spent,
        MAX(o.order_date) as last_order_date
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      WHERE c.id = ?
      GROUP BY c.id
    `, [id]);

    if (!customers) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Get order history
    const orders = await query(`
      SELECT
        id,
        total_amount,
        status,
        order_date,
        payment_method
      FROM orders
      WHERE customer_id = ?
      ORDER BY order_date DESC
      LIMIT 10
    `, [id]);

    const customer = {
      ...customers,
      total_orders: parseInt(customers.total_orders) || 0,
      total_spent: parseFloat(customers.total_spent) || 0,
      last_order_date: customers.last_order_date || null,
      orders: orders.map(order => ({
        ...order,
        total_amount: parseFloat(order.total_amount)
      }))
    };

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const body = await request.json();
    const { name, email, phone, address } = body;

    const sql = `
      UPDATE customers
      SET name = ?, email = ?, phone = ?, address = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await query(sql, [name, email, phone || null, address || null, id]);

    return NextResponse.json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await query('DELETE FROM customers WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
