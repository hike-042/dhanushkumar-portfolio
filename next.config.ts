import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.16.16.216'],

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;