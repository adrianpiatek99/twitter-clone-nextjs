/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media2.giphy.com"]
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
