"use client";

import type React from "react";
import Link from "next/link";
import { Film, Users, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/action";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="flex h-screen bg-black">
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-4 hidden md:block">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            StreamFlix
          </Link>
          <span className="ml-2 text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
            ADMIN
          </span>
        </div>

        <nav className="space-y-1">
          <Link
            href="/admin/shows"
            className="flex items-center px-4 py-3 text-white hover:bg-gray-800 rounded-md"
          >
            <Film className="mr-3 h-5 w-5 text-orange-500" />
            Shows
          </Link>
          <Link
            href="/admin/shows/new"
            className="flex items-center px-4 py-3 text-white hover:bg-gray-800 rounded-md"
          >
            <Upload className="mr-3 h-5 w-5 text-orange-500" />
            Upload
          </Link>
          <Link
            href="/admin/user-management"
            className="flex items-center px-4 py-3 text-white hover:bg-gray-800 rounded-md"
          >
            <Users className="mr-3 h-5 w-5 text-orange-500" />
            Users
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-800">
          <div className="space-y-1">
            <button
              onClick={async () => {
                await logout(); // Call your logout function
                router.push("/"); // Redirect if needed
              }}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
