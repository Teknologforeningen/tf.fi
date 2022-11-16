/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tf.fi', 'cms.tf.fi'],
  },
  i18n: {
    locales: ['sv-FI', 'fi-FI', 'en-GB'],
    defaultLocale: 'sv-FI',
    localeDetection: false,
  },
}
