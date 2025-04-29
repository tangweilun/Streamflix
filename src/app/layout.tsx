import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Providers from "@/lib/provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://streamsflix.online"),
  title: {
    default: "Streamflix - Stream Movies and TV Shows Online",
    template: "%s | Streamflix",
  },
  description:
    "Streamflix is a premium video streaming platform offering unlimited movies, TV shows, and more. Start watching today with plans from RM35.99.",
  keywords: [
    "streaming",
    "movies",
    "TV shows",
    "watch online",
    "Streamflix",
    "entertainment",
  ],
  authors: [{ name: "Streamflix" }],
  creator: "Streamflix",
  publisher: "Streamflix",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://streamsflix.online",
    title: "Streamflix - Stream Movies and TV Shows Online",
    description:
      "Streamflix is a premium video streaming platform offering unlimited movies, TV shows, and more.",
    siteName: "Streamflix",
    images: [
      {
        url: "https://streamsflix.online/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Streamflix - Stream Movies and TV Shows Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Streamflix - Stream Movies and TV Shows Online",
    description:
      "Streamflix is a premium video streaming platform offering unlimited movies, TV shows, and more.",
    images: ["https://streamsflix.online/images/twitter-image.jpg"],
    creator: "@streamflix",
  },
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
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://streamsflix.online",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://streamsflix.online" />
      </head>
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
