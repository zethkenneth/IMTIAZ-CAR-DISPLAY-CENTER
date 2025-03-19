/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  experimental: {
    serverActions: true,
  },
  webpack(config, { isServer }) {
    // Enable top-level await
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Suppress Sequelize warnings about dynamic imports
    config.ignoreWarnings = [
      {
        module: /sequelize/,
        message: /the request of a dependency is an expression/,
      },
    ];

    // Optionally mark Sequelize as external for server-side builds
    if (isServer) {
      config.externals.push("sequelize");
    }

    return config;
  },
};

export default nextConfig;
