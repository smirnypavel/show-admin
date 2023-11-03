/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn-icons-png.flaticon.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
