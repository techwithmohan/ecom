import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await query('SELECT * FROM products');
    
    // Parse JSON fields
    const formattedProducts = products.map(p => ({
      ...p,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || []),
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : (p.tags || []),
      isBestSeller: Boolean(p.isBestSeller),
      isNewArrival: Boolean(p.isNewArrival),
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, title, category, price, mrp, discount, description, features, image, stock_quantity, isBestSeller, isNewArrival, tags } = body;

    const sql = `
      INSERT INTO products (id, title, category, price, mrp, discount, description, features, image, stock_quantity, isBestSeller, isNewArrival, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await query(sql, [
      id,
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
    ]);

    return NextResponse.json({ message: 'Product created successfully', id }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
