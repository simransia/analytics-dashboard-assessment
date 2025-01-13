/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  // Ensure CSS modules are handled properly
  webpack: (config) => {
    return config;
  },
  // Optimize CSS loading
  optimizeFonts: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
