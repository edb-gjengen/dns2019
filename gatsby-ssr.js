const React = require('react')

const SCRIPTS = {
  Twitter: 'https://platform.twitter.com/widgets.js',
  Instagram: 'https://www.instagram.com/embed.js',
}

const createScriptTag = (key, scriptSrc) => {
  return React.createElement(
    'script',
    { src: scriptSrc, key: `gatsby-plugin-oembed-${key.toLowerCase()}` },
    null
  )
}

exports.onRenderBody = ({ setPostBodyComponents }, options) => {
  const scriptKeys = ['Twitter', 'Instagram']

  const scripts = scriptKeys.map(key => createScriptTag(key, SCRIPTS[key]))
  setPostBodyComponents(scripts)
}
