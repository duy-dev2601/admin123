/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  fallback: false,
  webpack: (config) => {
    config.resolve.preferRelative = true;
    return config;
  },
};

export default nextConfig;
