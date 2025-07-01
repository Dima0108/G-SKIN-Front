/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['en', 'ru', 'de', 'es', 'fr', 'kk'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};

module.exports = nextConfig;
