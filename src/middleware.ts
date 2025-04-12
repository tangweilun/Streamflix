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

function getUserRoleFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.role || null;
  } catch (error) {
    console.error("Error extracting role from token:", error);
    return null;
  }
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // Check if path starts with any protected prefix
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    path.startsWith(prefix)
  );
  const isPublicRoute = publicRoutes.includes(path);
  const isAdminRoute = path.startsWith("/admin");

  const token = (await cookies()).get("authToken")?.value;
  
  // Check if token is expired
  if (token && isTokenExpired(token)) {
    console.log("Token expired! Clearing cookie and redirecting...");
    const response = NextResponse.redirect(new URL("/sign-in", req.nextUrl));
    response.cookies.delete("authToken"); // Remove expired token
    return response;
  }

  // If trying to access protected route without token
  if (isProtectedRoute && !token) {
    console.log("Unauthorized access! Redirecting to /sign-in");
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  // If trying to access admin route, check if user is admin
  if (isAdminRoute && token) {
    const role = getUserRoleFromToken(token);
    if (role !== "Admin") {
      console.log("Non-admin trying to access admin route! Redirecting to /user/watch");
      return NextResponse.redirect(new URL("/user/watch", req.nextUrl));
    }
  }

  // If user is already signed in and trying to access public route
  if (isPublicRoute && token) {
    const role = getUserRoleFromToken(token);
    
    if (role === "Admin") {
      console.log("Admin already signed in. Redirecting to /admin/dashboard");
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    } else {
      console.log("User already signed in. Redirecting to /user/watch");
      return NextResponse.redirect(new URL("/user/watch", req.nextUrl));
    }
  }

  return NextResponse.next();
}
