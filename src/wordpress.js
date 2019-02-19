const Entities = require('html-entities').AllHtmlEntities;

const htmlEntities = new Entities();

const neufNormalizer = ({ entities }) => {
  entities = decodeTitles(entities)
  return entities
}

exports.neufNormalizer = neufNormalizer
  
const decodeTitles = entities => {
  return entities.map(e => {
    if (e.title) {
      e.title = htmlEntities.decode(e.title)
    }
    return e
  })
}