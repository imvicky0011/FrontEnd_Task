/** @type {import('next').NextConfig} */


module.exports = {
  env: {
    MONGO_URI:process.env.NEXT_PUBLIC_MONGO_URI
  },
  nextConfig: {
    reactStrictMode: true,
  },
  experimental: {
    swcMinify: false,
  },
}
