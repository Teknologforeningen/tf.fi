/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tf.fi', 'cms.tf.fi'],
  },
  transpilePackages: ['@hipsquare/react-strapi-keycloak-auth-context'],
  output: 'standalone',
}
