import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Providers from "@/lib/provider";

export const metadata: Metadata = {
  title: "Streamflix",
  description: "Video streaming Platform",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
    shortcut: "/favicon-16x16.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen overflow-y-hidden">
        <Providers>{children}</Providers>
        <ToastContainer position="bottom-right" theme="light" />
        <footer className="relative z-10 py-10 px-4 text-gray-300 bg-black">
          <div className="container mx-auto text-center">
            <p className="text-md">
              Questions? Email us at{" "}
              <a href="mailto:help@streamflix.com" className="hover:underline">
                help@streamflix.com
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
