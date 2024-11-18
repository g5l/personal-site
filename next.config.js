// @ts-check
/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: 'dist',
  compiler: {
    styledComponents: true
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i
    }

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack']
      }
    )

    return config
  },
  devIndicators: {
    autoPrerender: false
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL
  }
}

module.exports = nextConfig