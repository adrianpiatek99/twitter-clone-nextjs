/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["media2.giphy.com", "abs.twimg.com", "res.cloudinary.com", "pbs.twimg.com"]
  },
  compiler: {
    styledComponents: true
  }
};
