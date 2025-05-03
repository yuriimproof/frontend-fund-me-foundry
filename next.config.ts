import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // We're using Biome instead of ESLint
    ignoreDuringBuilds: true,
  },

  devIndicators: false,
};

export default nextConfig;
