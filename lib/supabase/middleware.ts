import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

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
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/login",
    "/signup",
    "/auth",
    "/code", // Email confirmation page
    "/", // Home page
    "/reset-password",
    "/public", // Any other public routes
  ];

  // Define routes that authenticated users should not access
  const unauthenticatedOnlyRoutes = ["/login", "/signup", "/reset-password"];

  const currentPath = request.nextUrl.pathname;
  console.log("Current path:", currentPath);

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.some((route) => {
    const matches =
      currentPath === route || currentPath.startsWith(`${route}/`);
    console.log(`Checking public route ${route}: ${matches}`);
    return matches;
  });

  // Check if the current route is only for unauthenticated users
  const isUnauthenticatedOnlyRoute = unauthenticatedOnlyRoutes.some((route) => {
    const matches =
      currentPath === route || currentPath.startsWith(`${route}/`);
    console.log(`Checking unauthenticated route ${route}: ${matches}`);
    return matches;
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("User:", user ? "authenticated" : "not authenticated");
  console.log("Is public route:", isPublicRoute);
  console.log("Is unauthenticated only route:", isUnauthenticatedOnlyRoute);

  // Redirect unauthenticated users from protected routes
  if (!user && !isPublicRoute) {
    console.log(
      "Redirecting to login - user not authenticated and route not public"
    );
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users from unauthenticated-only routes
  if (user && isUnauthenticatedOnlyRoute) {
    console.log(
      "Redirecting to dashboard - user authenticated trying to access unauthenticated route"
    );
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}
