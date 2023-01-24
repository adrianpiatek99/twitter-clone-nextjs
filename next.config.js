/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["media2.giphy.com"]
  },
  compiler: {
    styledComponents: true
  }
};

export default config;
