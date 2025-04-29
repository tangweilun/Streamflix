import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found",
  description: "Sorry, the page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button className="bg-orange-500 hover:bg-orange-600">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}