import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  // Only use export mode for production builds
  ...(isDev ? {} : { output: "export" }),
  images: { unoptimized: true },
  // Rewrite API calls to Firebase emulator during development
  ...(isDev ? {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:5001/project-template-7b1d0/europe-west1/api/:path*',
        },
      ];
    },
  } : {}),
};

export default nextConfig;
