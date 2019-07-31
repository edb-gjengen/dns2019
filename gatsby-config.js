const { neufNormalizer } = require('./src/wordpress')

module.exports = {
  siteMetadata: {
    title: 'Det Norske Studentersamfund',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: 'beta.studentersamfundet.no',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: false,
        auth: {},
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: true,
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
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
