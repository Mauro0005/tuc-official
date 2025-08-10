const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['contentlayer/generated'] = path.join(process.cwd(), '.contentlayer/generated');
    return config;
  },
};
module.exports = nextConfig;
