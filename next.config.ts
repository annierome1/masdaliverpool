// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Ensures ISR works — do NOT set output: 'export'
  trailingSlash: false,

  // If you ever need to allow Sanity webhook calls from their servers
  // without CORS headaches for API routes
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },

  // Optional: so you can fetch images directly from Sanity
  images: {
    domains: ["cdn.sanity.io"],
  },

  // Ensure dynamic routes like /team/[slug] can revalidate without a rebuild
  experimental: {
    workerThreads: false,
    cpus: 1, // helps avoid ISR race conditions in some Vercel builds
  },
};

export default nextConfig;
