import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'localhost:8040'],
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
