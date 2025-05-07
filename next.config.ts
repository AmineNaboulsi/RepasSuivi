import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'localhost:8040','foodimgsrepassuivi.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*', 
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
