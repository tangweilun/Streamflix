import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Providers from "@/lib/provider";

export const metadata: Metadata = {
  title: "Streamflix",
  description: "Video streaming Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers> {children}</Providers>
        <ToastContainer position="bottom-right" theme="light" />
      </body>
    </html>
  );
}
