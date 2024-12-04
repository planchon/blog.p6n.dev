/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        hostname: "s3-us-west-2.amazonaws.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "user-images.githubusercontent.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "fly.io",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
}
