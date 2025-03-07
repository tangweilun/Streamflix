"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Bell, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black border-b border-gray-800 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-orange-500 mr-8">
            StreamFlix
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link
              href="/"
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
            <Link
              href="/new"
              className="text-white hover:text-orange-500 transition-colors"
            >
              New & Popular
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-orange-500 transition-colors">
            <Search />
          </button>
          <button className="text-white hover:text-orange-500 transition-colors">
            <Bell />
          </button>

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
            <DropdownMenuContent className="absolute w-48 mt-4 -right-6 bg-black border-black rounded-sm shadow-lg py-1">
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
