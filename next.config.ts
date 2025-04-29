import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          process.env.NEXT_PUBLIC_S3_BUCKET_HOSTNAME ||
          "streamflixbucket.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
