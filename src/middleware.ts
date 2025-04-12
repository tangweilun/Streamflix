import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Update protected routes to check for path prefixes instead of exact matches
const protectedPrefixes = ["/admin", "/user"];
const publicRoutes = ["/sign-in", "/register", "/", "/reset-password"];

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const exp = payload.exp; // Expiration timestamp
    if (!exp) return true; // If no exp, assume expired

    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return now >= exp; // Expired if now >= exp
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // Treat invalid token as expired
  }
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // Check if path starts with any protected prefix
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    path.startsWith(prefix)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const token = (await cookies()).get("authToken")?.value;
  if (token && isTokenExpired(token)) {
    console.log("Token expired! Clearing cookie and redirecting...");
    const response = NextResponse.redirect(new URL("/sign-in", req.nextUrl));
    response.cookies.delete("authToken"); // Remove expired token
    return response;
  }

  if (isProtectedRoute && !token) {
    console.log("Unauthorized access! Redirecting to /sign-in");
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (isPublicRoute && token) {
    console.log("User already signed in. Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/user/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
