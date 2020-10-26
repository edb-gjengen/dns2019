const { neufNormalizer } = require('./src/wordpress')

module.exports = {
  siteMetadata: {
    title: 'Det Norske Studentersamfund',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/gatsby-config.js`,
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: 'studentersamfundet.no',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: false,
        auth: {},
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false,
        includedRoutes: [
          '**/*/*/associations',
          '**/*/*/categories',
          '**/*/*/events',
          '**/*/*/event_types',
          '**/*/*/event_organizers',
          '**/*/*/posts',
          '**/*/*/pages',
          '**/*/*/media',
          '**/*/*/tags',
          '**/*/*/taxonomies',
          '**/*/*/users',
          '**/*/*/venues',
        ],
        excludedRoutes: [
          '/yoast/**',
          '**/*/*/comments',
          '**/*/*/settings',
          '**/*/*/users/me',
        ],
        normalizer: neufNormalizer,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-52914-1',
        head: false,
        anonymize: true,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        // we can silence this if we know we're doing it right
        // https://github.com/gatsbyjs/gatsby/issues/21776
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://studentersamfundet.no',
      },
    },
    // {
    //   resolve: 'gatsby-plugin-purgecss',
    //   options: {
    //     printRejected: true,
    //     whitelistPatterns: [/^(.*)-content(.*)/, /^event-grouped-by-(.*)/],
    //   },
    // },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
