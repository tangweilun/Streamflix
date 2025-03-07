import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard", "/admin"];
const publicRoutes = ["/sign-in", "/register"];

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

function getIsAdmin(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "Admin";
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
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
    const isAdmin = getIsAdmin(token);
    if (isAdmin && path !== "/admin") {
      console.log("Admin user detected, redirecting to /admin");
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    } else {
      console.log("User already signed in, redirecting to /dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
}
