import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fighter_card',
  title: 'Fighter Cards',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'number',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'stance',
      title: 'Stance',
      type: 'string',
      description: 'Orthodox, Southpaw, Switch, etc.',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      description: 'e.g., Muay Femur, Muay Mat, Muay Khao',
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'string',
      description: 'Age in years',
    }),
    defineField({
      name: 'totalFights',
      title: 'Total Fights',
      type: 'number',
    }),
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'string',
      description: 'e.g., 135lbs / 61.2kg',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'record',
      title: 'Record',
      type: 'string',
      description: 'Format: wins-losses-draws, e.g., 19-6-0',
    }),
    defineField({
      name: 'accomplishments',
      title: 'Accomplishments',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Rich text is supported in Studio',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
        }),
      ],
    }),
  ],
})
