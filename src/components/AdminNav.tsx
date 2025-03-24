import Link from "next/link"
import { Home, Film, Users, Settings } from "lucide-react"

export default function AdminNav() {
  return (
    <nav className="fixed top-0 w-full bg-black border-b border-gray-800 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin" className="text-2xl font-bold text-orange-500">
            MyFlix Admin
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="flex items-center px-3 py-2 text-gray-300 hover:text-orange-500 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
            <Link
              href="/admin/shows"
              className="flex items-center px-3 py-2 text-gray-300 hover:text-orange-500 transition-colors"
            >
              <Film className="w-5 h-5 mr-2" />
              Shows
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center px-3 py-2 text-gray-300 hover:text-orange-500 transition-colors"
            >
              <Users className="w-5 h-5 mr-2" />
              Users
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center px-3 py-2 text-gray-300 hover:text-orange-500 transition-colors"
            >
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

