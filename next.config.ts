/** @type {import('next').NextConfig} */
// Portfolio V4.4 - Static-Production-Ready
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/my-portfolio',
  assetPrefix: '/my-portfolio',
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
