import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false, // keeps paths clean; matches ISR default
  // no `output: 'export'` — keep it serverless/standalone so ISR works
};

export default nextConfig;
