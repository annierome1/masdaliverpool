// schemas/fighterStats.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'fighterStats',
  title: 'Fighter Stats (Overrides)',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'data/team.json' }), // match this to JSON name
    defineField({ name: 'totalFights', type: 'number', title: 'Total Fights' }),
    defineField({ name: 'record', type: 'string', title: 'Record (e.g. 19-6-0)' }),
    defineField({
      name: 'accomplishments',
      type: 'array',
      title: 'Accomplishments',
      of: [{ type: 'string' }],
    }),
  ],
})
