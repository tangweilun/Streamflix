// app/components/navbar/auth-navbar.tsx

import Link from "next/link";

export function AuthNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 p-3 sm:p-4 md:px-8 md:py-5">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Logo - responsive text size */}
        <Link
          href="/"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 transition-colors hover:text-orange-600"
        >
          STREAMFLIX
        </Link>

        {/* Sign In Button - responsive padding and text size */}
        <Link
          href="/sign-in"
          className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-orange-600 bg-orange-500 rounded transition-colors"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}
