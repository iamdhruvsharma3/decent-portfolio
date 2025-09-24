export default {
  name: 'blog',
  title: 'Blog Post',
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
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
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
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  {title: 'JavaScript', value: 'javascript'},
                  {title: 'TypeScript', value: 'typescript'},
                  {title: 'HTML', value: 'html'},
                  {title: 'CSS', value: 'css'},
                  {title: 'React JSX', value: 'jsx'},
                  {title: 'React TSX', value: 'tsx'},
                  {title: 'JSON', value: 'json'},
                  {title: 'Bash', value: 'bash'},
                  {title: 'Other', value: 'text'},
                ],
              },
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'filename',
              title: 'Filename (optional)',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
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
      date: 'publishedAt',
    },
    prepare(selection: any) {
      const {date} = selection
      return Object.assign({}, selection, {
        subtitle: date && new Date(date).toLocaleDateString(),
      })
    },
  },
  orderings: [
    {
      title: 'Publishing date new–>old',
      name: 'publishingDateDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'},
        {field: 'title', direction: 'asc'},
      ],
    },
    {
      title: 'Publishing date old–>new',
      name: 'publishingDateAsc',
      by: [
        {field: 'publishedAt', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
}
