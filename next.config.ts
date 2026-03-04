// next.config.ts
import type { NextConfig } from "next";

const PRODUCTION_ORIGIN = 'https://www.masdaliverpool.com';

// Content Security Policy — locks down script/style/media sources to known origins.
// 'unsafe-inline' is required for Next.js inline scripts and CSS Modules; a nonce-based
// approach would remove it but requires custom middleware.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://cdn.sanity.io https://www.google-analytics.com https://www.googletagmanager.com https://*.amazonaws.com https://*.cdninstagram.com https://*.fbcdn.net",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://api.sanity.io https://cdn.sanity.io https://*.sanity.io https://www.google-analytics.com https://www.googletagmanager.com https://graph.instagram.com https://*.mux.com",
  "media-src 'self' blob: https://*.amazonaws.com https://stream.mux.com https://*.mux.com",
  "frame-src 'self' https://*.sanity.io https://*.sanity.studio",
  "object-src 'none'",
  "base-uri 'self'",
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,

  trailingSlash: false,

  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      // --- Security headers on every response ---
      {
        source: '/:path*',
        headers: [
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Control referrer leakage
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Enforce HTTPS for 2 years, include subdomains
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Restrict browser feature APIs
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          // Content Security Policy
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },

      // --- CORS for API routes: restrict to own origin only ---
      // Only cross-origin callers (e.g. Sanity webhooks) need CORS headers.
      // Same-origin requests from the site itself do not require them.
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: PRODUCTION_ORIGIN },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },

      // --- Sanity Studio: restrict CORS to own origin ---
      {
        source: '/studio/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: PRODUCTION_ORIGIN },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
