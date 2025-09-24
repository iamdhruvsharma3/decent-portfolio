export default {
  name: 'hobby',
  title: 'Hobby',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Hobby Type',
      type: 'string',
      options: {
        list: [
          {title: 'Reading', value: 'reading'},
          {title: 'Music', value: 'music'},
          {title: 'Photography', value: 'photography'},
          {title: 'Sports', value: 'sports'},
          {title: 'Gaming', value: 'gaming'},
          {title: 'Cooking', value: 'cooking'},
          {title: 'Travel', value: 'travel'},
          {title: 'Fitness', value: 'fitness'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'currentStatus',
      title: 'Current Status/Progress',
      type: 'text',
    },
    {
      name: 'links',
      title: 'Related Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Link Title',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'media',
      title: 'Media',
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
    },
    {
      name: 'stats',
      title: 'Statistics/Metrics',
      type: 'object',
      fields: [
        {
          name: 'timeSpent',
          title: 'Time Spent (hours per week)',
          type: 'number',
        },
        {
          name: 'level',
          title: 'Skill Level',
          type: 'string',
          options: {
            list: [
              {title: 'Beginner', value: 'beginner'},
              {title: 'Intermediate', value: 'intermediate'},
              {title: 'Advanced', value: 'advanced'},
              {title: 'Expert', value: 'expert'},
            ],
          },
        },
        {
          name: 'yearsOfExperience',
          title: 'Years of Experience',
          type: 'number',
        },
        {
          name: 'customMetrics',
          title: 'Custom Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Metric Label',
                  type: 'string',
                },
                {
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      title: 'Featured Hobby',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'isActive',
      title: 'Currently Active',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'media.0',
      isActive: 'isActive',
    },
    prepare(selection: any) {
      const {type, isActive} = selection
      return Object.assign({}, selection, {
        subtitle: `${type} ${isActive ? '• Active' : '• Inactive'}`,
      })
    },
  },
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [
        {field: 'displayOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
    {
      title: 'Hobby type',
      name: 'typeOrder',
      by: [
        {field: 'type', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
    {
      title: 'Last updated',
      name: 'lastUpdated',
      by: [
        {field: 'lastUpdated', direction: 'desc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
}
