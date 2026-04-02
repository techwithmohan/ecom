import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const body = await request.json();
    const { title, category, price, mrp, discount, description, features, image, stock_quantity, isBestSeller, isNewArrival, tags } = body;

    const sql = `
      UPDATE products
      SET title = ?, category = ?, price = ?, mrp = ?, discount = ?, description = ?,
          features = ?, image = ?, stock_quantity = ?, isBestSeller = ?, isNewArrival = ?, tags = ?
      WHERE id = ?
    `;

    await query(sql, [
      title,
      category,
      price,
      mrp || null,
      discount || null,
      description || null,
      JSON.stringify(features || []),
      image,
      stock_quantity || 0,
      isBestSeller ? 1 : 0,
      isNewArrival ? 1 : 0,
      JSON.stringify(tags || []),
      id
    ]);

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await query('DELETE FROM products WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
