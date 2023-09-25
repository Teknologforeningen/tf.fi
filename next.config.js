/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tf.fi', 'cms.tf.fi', 'localhost', 'test.tf.fi'],
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
}
