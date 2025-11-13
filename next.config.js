/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        hostname: "s3.us-west-2.amazonaws.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "pub-d7e41567b8c441739981cf0a85cfe38b.r2.dev",
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
};
