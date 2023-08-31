/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "raw-loader",
    });
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["pdfreader"],
  },
};

module.exports = nextConfig;
