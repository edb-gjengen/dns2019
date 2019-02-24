const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { paginate } = require('gatsby-awesome-pagination')

const getOnlyPublished = edges =>
  _.filter(edges, ({ node }) => node.status === 'publish')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
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
      _.each(pages, ({ node: page }) => {
        createPage({
          path: `/${page.slug}/`,
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
                slug
                status
                fields {
                  link
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
          path: post.fields.link,
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
        pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? `/` : `/page`),
        component: blogTemplate,
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressWpEvents {
            edges {
              node {
                id
                slug
                status
                fields {
                  link
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
          path: event.fields.link,
          component: eventTemplate,
          context: {
            id: event.id,
          },
        })
      })

      // Create the event program
      const programTemplate = path.resolve(`./src/templates/event-program.js`)
      createPage({
        path: `/program/`,
        component: programTemplate,
      })
    })
    .then(() => {
      return graphql(`
        {
          allWordpressWpEventTypes(filter: { count: { gt: 0 } }) {
            edges {
              node {
                id
                name
                slug
                fields {
                  link
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

      const eventTypeTemplate = path.resolve(`./src/templates/event-type.js`)

      _.each(
        result.data.allWordpressWpEventTypes.edges,
        ({ node: event_type }) => {
          createPage({
            path: event_type.fields.link,
            component: eventTypeTemplate,
            context: {
              name: event_type.name,
              slug: event_type.slug,
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
                slug
                status
                fields {
                  link
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
          path: association.fields.link,
          component: associationTemplate,
          context: {
            id: association.id,
          },
        })
      })

      // Create the list of associations
      const associationListTemplate = path.resolve(
        `./src/templates/association-list.js`
      )
      createPage({
        path: `/foreningene/`,
        component: associationListTemplate,
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

  relativeLinksFor = [
    'wordpress__POST',
    'wordpress__wp_associations',
    'wordpress__wp_events',
    'wordpress__wp_event_types',
  ]
  if (relativeLinksFor.includes(node.internal.type)) {
    const link = new URL(node.link).pathname
    createNodeField({
      node,
      name: `link`,
      value: link,
    })
  }
}
