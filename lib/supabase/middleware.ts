import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/login',
    '/signup',
    '/auth',
    '/code', // Email confirmation page
    '/', // Home page
    '/reset-password',
    '/public', // Any other public routes,
    '/check-email',
    '/features',
    '/pricing',
    '/blog',
    '/about',
    '/profile/:username',
  ];

  // Define routes that authenticated users should not access
  const unauthenticatedOnlyRoutes = ['/login', '/signup', '/reset-password'];

  const currentPath = request.nextUrl.pathname;

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.some((route) => {
    // Special handling for profile routes
    if (route === '/profile/:username') {
      return true;
    }
    // Regular route matching
    return currentPath === route || currentPath.startsWith(`${route}/`);
  });

  // Check if the current route is only for unauthenticated users
  const isUnauthenticatedOnlyRoute = unauthenticatedOnlyRoutes.some((route) => {
    const matches = currentPath === route || currentPath.startsWith(`${route}/`);
    return matches;
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users from protected routes
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users from unauthenticated-only routes
  if (user && isUnauthenticatedOnlyRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return supabaseResponse;
}
