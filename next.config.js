/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["media2.giphy.com", "abs.twimg.com", "res.cloudinary.com"]
  },
  compiler: {
    styledComponents: true
  }
};

module.export = config;
