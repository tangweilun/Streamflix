import { AuthBarWithSignInButton } from "@/components/navbar/auth-navbar-sign-in";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 bg-[url('/images/netflix-background-home.jpg')] bg-cover bg-center bg-no-repeat brightness-200" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/75" />

      {/* <div className="fixed inset-0 -z-10">
        <Image
          src=""
          alt="StreamFlix Background"
          fill={true}
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/90 via-black/40 to-black/90" />
      </div> */}

      <AuthBarWithSignInButton />

      <main className="relative z-10 px-4">
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
      </main>

      <footer className="relative z-10 py-10 px-4 text-gray-300">
        <div className="container mx-auto text-center">
          <p className="text-md">
            Questions? Email us at{" "}
            <a href="mailto:help@streamflix.com" className="hover:underline">
              help@streamflix.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
