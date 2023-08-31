/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tf.fi', 'cms.tf.fi', 'localhost'],
  },
  output: 'standalone',
}
