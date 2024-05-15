/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'tf.fi' },
      { protocol: 'https', hostname: 'cms.tf.fi' },
      { protocol: 'https', hostname: 'test.tf.fi' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  output: 'standalone',
}
