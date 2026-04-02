import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = cookies().get('session');
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const userData = JSON.parse(session.value);
    return NextResponse.json({ authenticated: true, user: userData });
  } catch (e) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
