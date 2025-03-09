import { AuthBarWithSignInButton } from "@/components/auth-navbar/auth-navbar-sign-in";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('/images/netflix-background-home.jpg')] bg-cover bg-center bg-no-repeat brightness-200" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/75" />

      <AuthBarWithSignInButton />

      <div className="relative z-10 px-4">
        <div className="container mx-auto min-h-[80vh] flex flex-col items-center justify-center text-center">
          <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Unlimited movies,
            <br />
            TV shows, and more
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-6">
            Starts at RM35.99. Cancel anytime.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-xl h-14 px-8"
            >
              Get Started
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
