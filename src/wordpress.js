const Entities = require('html-entities').AllHtmlEntities;

const htmlEntities = new Entities();

const neufNormalizer = ({ entities }) => {
  entities = decodeTitles(entities)
  entities = mapEventsToEventTypes(entities)
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

const mapEventsToEventTypes = entities => {
  const eventTaxonomies = [`wordpress__wp_event_type`, ]
  const eventTypes = entities.filter(e => eventTaxonomies.includes(e.__type))

  return entities.map(e => {
    // Replace event types with links to their nodes.
    let eventHasType = e.event_type && Array.isArray(e.event_type) && e.event_type.length
    if (eventTypes.length && eventHasType) {
      e.event_type___NODE = e.event_type.map(
        t =>
          eventTypes.find(
            tObj =>
              (Number.isInteger(t) ? t : t.wordpress_id) === tObj.wordpress_id
          ).id
      )
      delete e.event_type
    }

    return e
  })
}
