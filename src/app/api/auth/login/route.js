import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { email, password, role: requestedRole } = await request.json();

    let user = null;
    let finalRole = requestedRole;

    // 1. Try to find in admins table first if it's an admin login OR if no role specified
    if (!requestedRole || requestedRole === 'admin') {
      const [admins] = await query('SELECT id, username as name, email, password FROM admins WHERE email = ?', [email]);
      if (admins) {
        // Compare hashed password
        const isMatch = await bcrypt.compare(password, admins.password);
        if (isMatch) {
          user = admins;
          finalRole = 'admin';
        }
      }
    }

    // 2. If not found and not explicitly forced to be admin, try customers table
    if (!user && (requestedRole === 'user' || !requestedRole)) {
      const [customers] = await query('SELECT id, name, email, password FROM customers WHERE email = ?', [email]);
      if (customers) {
        // Compare hashed password
        const isMatch = await bcrypt.compare(password, customers.password);
        if (isMatch) {
          user = customers;
          finalRole = 'user';
        }
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Set session cookie
    const sessionData = JSON.stringify({ id: user.id, email: user.email, name: user.name, role: finalRole });
    cookies().set('session', sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json({ 
      message: 'Login successful', 
      user: { id: user.id, name: user.name, email: user.email, role: finalRole },
      redirectTo: finalRole === 'admin' ? '/admin' : '/profile'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
