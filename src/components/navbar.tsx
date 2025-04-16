"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/lib/action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/user/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-black border-b border-gray-800 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/user/watch"
            className="text-3xl font-bold text-orange-500 mr-8"
          >
            StreamFlix
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link
              href="/user/watch"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/user/shows"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Shows
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger
              className="focus:outline-none focus:ring-0"
              asChild
            >
              <button className="flex items-center text-white hover:text-orange-500 transition-colors">
                <div className="w-8 h-8 relative mr-2">
                  <Image
                    src="/images/default-profile.png"
                    alt="User"
                    fill={true}
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                  />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute w-48 mt-3 -right-6 bg-black border-black rounded-none shadow-lg py-1">
              <Link
                href="/user/profile"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
              >
                Profile
              </Link>
              <Link
                href="/user/favorite"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
              >
                Favorite Videos
              </Link>
              <Link
                href="/user/watch-history"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
              >
                Watch History
              </Link>
              <Link
                href="/user/subscription"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
              >
                Subscription
              </Link>
              <button
                onClick={async () => {
                  setDropdownOpen(false);
                  await logout(); // Call your logout function
                  router.push("/"); // Redirect if needed
                }}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
              >
                Sign out
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
