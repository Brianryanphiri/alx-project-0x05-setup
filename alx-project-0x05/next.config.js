/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // This ensures that path aliases work in both .ts and .js files
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
  // Enable CSS modules
  sassOptions: {
    includePaths: [__dirname],
  },
};

module.exports = nextConfig;
