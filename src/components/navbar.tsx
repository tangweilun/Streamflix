"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { logout } from "@/lib/action";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
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
          <div className="relative group">
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
            <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-90 rounded-md shadow-lg py-1 hidden group-hover:block">
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
              <button
                onClick={() => logout()}
                className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-black"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
