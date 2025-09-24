export default {
  name: 'travelPost',
  title: 'Travel Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Travel Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        },
      ],
    },
    {
      name: 'images',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.min(1),
    },
    {
      name: 'highlights',
      title: 'Trip Highlights',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'duration',
      title: 'Trip Duration (days)',
      type: 'number',
    },
    {
      name: 'travelBuddies',
      title: 'Travel Companions',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      location: 'location',
      date: 'date',
    },
    prepare(selection: any) {
      const {location, date} = selection
      return Object.assign({}, selection, {
        subtitle: `${location} • ${date && new Date(date).toLocaleDateString()}`,
      })
    },
  },
  orderings: [
    {
      title: 'Travel date new–>old',
      name: 'travelDateDesc',
      by: [
        {field: 'date', direction: 'desc'},
        {field: 'title', direction: 'asc'},
      ],
    },
    {
      title: 'Travel date old–>new',
      name: 'travelDateAsc',
      by: [
        {field: 'date', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
}
