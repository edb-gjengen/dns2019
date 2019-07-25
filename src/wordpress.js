const Entities = require('html-entities').AllHtmlEntities

const htmlEntities = new Entities()

const decodeTitles = entities => {
  return entities.map(e => {
    if (e.title) {
      e.title = htmlEntities.decode(e.title)
    }
    return e
  })
}

const mapEventsToEventTypes = entities => {
  const eventTaxonomies = [`wordpress__wp_event_types`]
  const eventTypes = entities.filter(e => eventTaxonomies.includes(e.__type))

  return entities.map(e => {
    // Replace event types with links to their nodes.
    const eventHasType =
      e.event_types && Array.isArray(e.event_types) && e.event_types.length
    if (eventTypes.length && eventHasType) {
      e.event_types___NODE = e.event_types.map(
        t =>
          eventTypes.find(
            tObj =>
              (Number.isInteger(t) ? t : t.wordpress_id) === tObj.wordpress_id
          ).id
      )
      delete e.event_types
    }

    return e
  })
}

const mapEventsToEventOrganizers = entities => {
  const eventTaxonomies = [`wordpress__wp_event_organizers`]
  const eventOrganizers = entities.filter(e =>
    eventTaxonomies.includes(e.__type)
  )

  return entities.map(e => {
    // Replace event organizers with links to their nodes.
    const eventHasOrganizer =
      e.event_organizers &&
      Array.isArray(e.event_organizers) &&
      e.event_organizers.length
    if (eventOrganizers.length && eventHasOrganizer) {
      e.event_organizers___NODE = e.event_organizers.map(
        t =>
          eventOrganizers.find(
            tObj =>
              (Number.isInteger(t) ? t : t.wordpress_id) === tObj.wordpress_id
          ).id
      )
      delete e.event_organizers
    }

    return e
  })
}

const mapEventOrganizersToAssociations = entities => {
  const associations = entities.filter(
    e => e.__type === 'wordpress__wp_associations'
  )

  return entities.map(e => {
    if (e.__type !== 'wordpress__wp_event_organizers') {
      return e
    }
    // Replace venue IDs with links to their nodes.
    const associationId = e.association_id
    if (associationId !== null) {
      e.association___NODE = associations.find(
        obj => associationId === obj.wordpress_id
      ).id
    }
    delete e.association_id
    return e
  })
}

const mapEventsToVenues = entities => {
  const venues = entities.filter(e => e.__type === 'wordpress__wp_venues')

  return entities.map(e => {
    if (e.__type !== 'wordpress__wp_events') {
      return e
    }
    // Replace venue IDs with links to their nodes.
    const venueId = parseInt(e.venue_id, 10)
    const eventHasVenueId = !Number.isNaN(venueId)
    if (!eventHasVenueId) {
      e.venue_custom = e.venue
    } else {
      e.venue_custom = null
      e.venue___NODE = venues.find(obj => venueId === obj.wordpress_id).id
    }
    delete e.venue
    delete e.venue_id
    return e
  })
}

const neufNormalizer = ({ entities }) => {
  entities = decodeTitles(entities)
  entities = mapEventsToEventTypes(entities)
  entities = mapEventsToEventOrganizers(entities)
  entities = mapEventOrganizersToAssociations(entities)
  entities = mapEventsToVenues(entities)
  return entities
}

exports.neufNormalizer = neufNormalizer
