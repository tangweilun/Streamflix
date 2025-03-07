import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-6xl font-bold text-orange-500">404</h2>
        <h3 className="text-4xl font-semibold">Oops! Page Not Found</h3>
        <p className="text-xl text-gray-400 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-orange-600 text-black rounded-md hover:bg-orange-500 transition-colors text-lg font-semibold"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

