/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/chat-interface-project' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/chat-interface-project' : '',
}

module.exports = nextConfig
