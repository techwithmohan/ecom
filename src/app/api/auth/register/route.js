import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Check if user already exists
    const [existing] = await query('SELECT id FROM customers WHERE email = ?', [email]);
    if (existing) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new customer
    const sql = 'INSERT INTO customers (name, email, password) VALUES (?, ?, ?)';
    const [result] = await query(sql, [name, email, hashedPassword]);

    return NextResponse.json({ message: 'Registration successful', id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
