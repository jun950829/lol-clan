const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath : "",
  distDir : '.next',
  // experimental: {
  //   concurrentFeatures: true,
  //   serverComponents: true,
  // },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  trailingSlash : true,
  productionBrowserSourceMaps : false,
  reactStrictMode: true,
  useFileSystemPublicRoutes: true,
  swcMinify: true,
  pageExtensions : ['tsx', 'ts', 'jsx', 'js'],
  sassOptions : {
    includePaths: [path.join(__dirname, 'styles')]
  },
  compiler : {
    emotion : true,
  },
  images : {
    unoptimized : true,
  },
}

module.exports = nextConfig
