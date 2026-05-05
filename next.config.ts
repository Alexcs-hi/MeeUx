import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 reactStrictMode: false,
  allowedDevOrigins: ['192.168.29.6'],
  devIndicators: false,
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
