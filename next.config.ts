import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  output: 'export',
};

export default nextConfig;
