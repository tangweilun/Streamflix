import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "streamflixtest.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
