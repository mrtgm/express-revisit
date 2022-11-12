/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    auth0Domain: process.env.AUTH0_DOMAIN || '',
    auth0ClientId: process.env.AUTH0_CLIENT_ID || '',
    auth0Audience: process.env.AUTH0_AUDIENCE || '',
  },
};

module.exports = nextConfig;
