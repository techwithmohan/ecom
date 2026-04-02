import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const session = cookies().get('session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const sessionData = JSON.parse(session.value);
    const [user] = await query('SELECT name, email, phone, address FROM customers WHERE id = ?', [sessionData.id]);
    
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = cookies().get('session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const sessionData = JSON.parse(session.value);
    const { name, phone, address } = await request.json();

    await query(
      'UPDATE customers SET name = ?, phone = ?, address = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, phone || null, address || null, sessionData.id]
    );

    // Update session cookie with new name
    const newSessionData = JSON.stringify({ ...sessionData, name });
    cookies().set('session', newSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
