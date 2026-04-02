import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // Protect Admin Routes
  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      const user = JSON.parse(session.value);
      if (user.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect Profile Routes
  if (pathname.startsWith('/profile')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*'],
};
