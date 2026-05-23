import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      'randomuser.me',
      'logo.clearbit.com',
      'api.dicebear.com',
      "cdn-icons-png.flaticon.com",
      "upload.wikimedia.org",
      "img.icons8.com",
      "framerusercontent.com",
      "www.tpisoftware.com"
    ],
  },
};

export default nextConfig;
