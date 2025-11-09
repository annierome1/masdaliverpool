import type {StructureResolver} from 'sanity/structure'

const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Upcoming Events')
        .child(
          S.documentList()
            .title('Upcoming Events')
            .filter('_type == "upcomingEvent" && dateTime >= now()')
            .defaultOrdering([{field: 'dateTime', direction: 'asc'}])
        ),
      S.listItem()
        .title('Past Events')
        .child(
          S.documentList()
            .title('Past Events')
            .filter('_type == "upcomingEvent" && dateTime < now()')
            .defaultOrdering([{field: 'dateTime', direction: 'desc'}])
        ),
      // Include the rest of the document types except upcomingEvent to avoid duplicates.
      ...S.documentTypeListItems().filter((listItem) => listItem.getId() !== 'upcomingEvent'),
    ])

export default deskStructure

