const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { paginate } = require('gatsby-awesome-pagination')
const moment = require('moment')

const getOnlyPublished = edges =>
  _.filter(edges, ({ node }) => node.status === 'publish')

// Used to filter out older events from queries
const eventsNotBefore = moment()
  .startOf('day')
  .subtract(1, 'days')
  .toISOString()

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            path
            slug
            status
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const pageTemplate = path.resolve(`./src/templates/page.js`)

      // Only publish pages with a `status === 'publish'` in production. This
      // excludes drafts, future posts, etc. They will appear in development,
      // but not in a production build.

      const allPages = result.data.allWordpressPage.edges
      const pages =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allPages)
          : allPages

      // Call `createPage()` once per WordPress page
      const ignoreSlugs = ['program', 'foreningene', 'profil', 'booking']
      _.each(pages, ({ node: page }) => {
        if (ignoreSlugs.includes(page.slug)) {
          return
        }
        createPage({
          path: page.path,
          component: pageTemplate,
          context: {
            id: page.id,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressPost {
            edges {
              node {
                id
                path
                slug
                status
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const postTemplate = path.resolve(`./src/templates/post.js`)
      const blogTemplate = path.resolve(`./src/templates/blog.js`)

      // In production builds, filter for only published posts.
      const allPosts = result.data.allWordpressPost.edges
      const posts =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allPosts)
          : allPosts

      // Iterate over the array of posts
      _.each(posts, ({ node: post }) => {
        // Create the Gatsby page for this WordPress post
        createPage({
          path: post.path,
          component: postTemplate,
          context: {
            id: post.id,
          },
        })
      })

      // Create a paginated blog, e.g., /, /page/2, /page/3
      paginate({
        createPage,
        items: posts,
        itemsPerPage: 10,
        pathPrefix: ({ pageNumber }) =>
          pageNumber === 0 ? `/nyheter/` : `/nyheter/page`,
        component: blogTemplate,
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressWpVenues {
            edges {
              node {
                id
                path
                slug
                status
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const venueTemplate = path.resolve(`./src/templates/venue.js`)

      // In production builds, filter for only published venues.
      const allVenues = result.data.allWordpressWpVenues.edges
      const venues =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allVenues)
          : allVenues

      // Iterate over the array of venues
      _.each(venues, ({ node: venue }) => {
        // Create the Gatsby page for this WordPress venue
        createPage({
          path: venue.path,
          component: venueTemplate,
          context: {
            id: venue.id,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressWpEvents {
            edges {
              node {
                id
                path
                slug
                status
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const eventTemplate = path.resolve(`./src/templates/event.js`)

      // In production builds, filter for only published events.
      const allEvents = result.data.allWordpressWpEvents.edges
      const events =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allEvents)
          : allEvents

      // Iterate over the array of events
      _.each(events, ({ node: event }) => {
        // Create the Gatsby page for this WordPress event
        createPage({
          path: event.path,
          component: eventTemplate,
          context: {
            id: event.id,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressWpEventTypes(filter: { count: { gt: 0 } }) {
            edges {
              node {
                id
                path
                name
                slug
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const eventTypeTemplate = path.resolve(`./src/templates/event-type.js`)

      _.each(
        result.data.allWordpressWpEventTypes.edges,
        ({ node: eventType }) => {
          createPage({
            path: eventType.path,
            component: eventTypeTemplate,
            context: {
              name: eventType.name,
              slug: eventType.slug,
            },
          })
        }
      )
    })
    .then(() => {
      return graphql(`
        {
          allWordpressWpEventOrganizers {
            edges {
              node {
                id
                path
                name
                slug
                description
                association {
                  path
                }
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const eventOrganizerTemplate = path.resolve(
        `./src/templates/event-organizer.js`
      )

      _.each(
        result.data.allWordpressWpEventOrganizers.edges,
        ({ node: eventOrganizer }) => {
          createPage({
            path: eventOrganizer.path,
            component: eventOrganizerTemplate,
            context: {
              name: eventOrganizer.name,
              slug: eventOrganizer.slug,
              description: eventOrganizer.description,
              association: eventOrganizer.association,
              after: eventsNotBefore,
            },
          })
        }
      )
    })
    .then(() => {
      return graphql(`
        {
          allWordpressWpAssociations {
            edges {
              node {
                id
                path
                slug
                status
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const associationTemplate = path.resolve(`./src/templates/association.js`)

      // In production builds, filter for only published associations.
      const allAssociations = result.data.allWordpressWpAssociations.edges
      const associations =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allAssociations)
          : allAssociations

      // Iterate over the array of associations
      _.each(associations, ({ node: association }) => {
        // Create the Gatsby page for this WordPress event
        createPage({
          path: association.path,
          component: associationTemplate,
          context: {
            id: association.id,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressCategory(filter: { count: { gt: 0 } }) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const categoriesTemplate = path.resolve(`./src/templates/category.js`)

      // Create a Gatsby page for each WordPress Category
      _.each(result.data.allWordpressCategory.edges, ({ node: cat }) => {
        createPage({
          path: `/categories/${cat.slug}/`,
          component: categoriesTemplate,
          context: {
            name: cat.name,
            slug: cat.slug,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressTag(filter: { count: { gt: 0 } }) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      `)
    })

    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const tagsTemplate = path.resolve(`./src/templates/tag.js`)

      // Create a Gatsby page for each WordPress tag
      _.each(result.data.allWordpressTag.edges, ({ node: tag }) => {
        createPage({
          path: `/tags/${tag.slug}/`,
          component: tagsTemplate,
          context: {
            name: tag.name,
            slug: tag.slug,
          },
        })
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressWpUsers {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `)
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const authorTemplate = path.resolve(`./src/templates/author.js`)

      _.each(result.data.allWordpressWpUsers.edges, ({ node: author }) => {
        createPage({
          path: `/author/${author.slug}`,
          component: authorTemplate,
          context: {
            id: author.id,
          },
        })
      })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // We need to add context to a few pages
  const pagesWithContext = ['/', '/program/']
  if (!pagesWithContext.includes(page.path)) {
    return
  }

  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      after: eventsNotBefore,
    },
  })
}
