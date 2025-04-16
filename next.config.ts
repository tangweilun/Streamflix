import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          process.env.S3_BUCKET_HOSTNAME || "streamflixbucket.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
