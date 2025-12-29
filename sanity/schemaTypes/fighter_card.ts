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
      name: 'isCoach',
      title: 'Is this a coach?',
      type: 'boolean',
      description: 'Toggle this if this person is a coach. When enabled, coach-specific fields (bio, specialty) will be shown, and fighter-specific fields will be hidden.',
      initialValue: false,
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      hidden: ({ document }) => document?.isCoach === true,
    }),
    defineField({
      name: 'stance',
      title: 'Stance',
      type: 'string',
      description: 'Orthodox, Southpaw, Switch, etc.',
      hidden: ({ document }) => document?.isCoach === true,
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      description: 'e.g., Muay Femur, Muay Mat, Muay Khao',
      hidden: ({ document }) => document?.isCoach === true,
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'string',
      description: 'Age in years',
      hidden: ({ document }) => document?.isCoach === true,
    }),
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'string',
      description: 'e.g., 135lbs / 61.2kg',
      hidden: ({ document }) => document?.isCoach === true,
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
      hidden: ({ document }) => document?.isCoach === true,
    }),
    defineField({
      name: 'accomplishments',
      title: 'Accomplishments',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ document }) => document?.isCoach === true,
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Biography for coaches',
      rows: 5,
      hidden: ({ document }) => document?.isCoach !== true,
    }),
    defineField({
      name: 'specialty',
      title: 'Specialty',
      type: 'string',
      description: 'e.g., Muay Thai, Boxing, MMA, Strength & Conditioning',
      hidden: ({ document }) => document?.isCoach !== true,
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
    defineField({
      name: 'website',
      title: 'Personal Website',
      type: 'url',
      description: 'Personal website URL (optional)',
    }),
  ],
})
