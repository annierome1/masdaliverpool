import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'upcomingEvent',
  title: 'Upcoming Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Event Title',
      description: 'e.g. "Fight Night 12"',
    }),
    defineField({
      name: 'fightTitle',
      type: 'string',
      title: 'Fight Title',
      description: 'Specific title of this fight (e.g. "Main Event")',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      description: 'Venue or city where the fight takes place',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Promotional Image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'dateTime',
      type: 'datetime',
      title: 'Date & Time',
    }),
    defineField({
      name: 'fighterA',
      type: 'string',
      title: 'Fighter A',
      description: 'Name of the first fighter',
    }),
    defineField({
      name: 'fighterB',
      type: 'string',
      title: 'Fighter B',
      description: 'Name of the second fighter',
    }),
  ],
})
