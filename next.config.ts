/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this block:
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;