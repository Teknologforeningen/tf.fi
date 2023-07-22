/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tf.fi', 'cms.tf.fi', 'localhost'],
  },
  transpilePackages: ['@hipsquare/react-strapi-keycloak-auth-context'],
}
