"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-black border-b border-gray-800 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/watch"
            className="text-2xl font-bold text-orange-500 mr-8"
          >
            StreamFlix
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link
              href="/watch"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/series"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Series
            </Link>
            <Link
              href="/movies"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Movies
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="relative animate-in">
              <input
                type="text"
                placeholder="Search for movies, TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white rounded-full py-1 pl-4 pr-10 w-[250px] focus:outline-none focus:ring-2 focus:ring-orange-500"
                autoFocus
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={10} />
              </button>
            </form>
          ) : (
            <button
              className="text-white hover:text-orange-500 transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search />
            </button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger
              className="focus:outline-none focus:ring-0"
              asChild
            >
              <button className="flex items-center text-white hover:text-orange-500 transition-colors">
                <div className="w-8 h-8 relative mr-2">
                  <Image
                    src="/placeholder.svg"
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
                href="/profile"
                className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
              >
                Profile
              </Link>
              <Link
                href="/account"
                className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
              >
                Account
              </Link>
              <Link
                href="/subscription"
                className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
              >
                Subscription
              </Link>
              <Link
                href="/logout"
                className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
              >
                Sign out
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
