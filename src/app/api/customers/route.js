import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const customers = await query(`
      SELECT
        c.*,
        COUNT(o.id) as total_orders,
        SUM(o.total_amount) as total_spent,
        MAX(o.order_date) as last_order_date
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      GROUP BY c.id
      ORDER BY c.registration_date DESC
    `);

    // Format the data
    const formattedCustomers = customers.map(customer => ({
      ...customer,
      total_orders: parseInt(customer.total_orders) || 0,
      total_spent: parseFloat(customer.total_spent) || 0,
      last_order_date: customer.last_order_date || null,
      registration_date: customer.registration_date,
    }));

    return NextResponse.json(formattedCustomers);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, address } = body;

    const sql = `
      INSERT INTO customers (name, email, phone, address)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await query(sql, [name, email, phone || null, address || null]);

    return NextResponse.json({
      message: 'Customer created successfully',
      id: result.insertId
    }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
