export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
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
      name: 'caption',
      title: 'Caption',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Travel', value: 'travel'},
          {title: 'Portraits', value: 'portraits'},
          {title: 'Random', value: 'random'},
          {title: 'Nature', value: 'nature'},
          {title: 'Architecture', value: 'architecture'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'uploadedAt',
      title: 'Uploaded At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
    },
    prepare(selection: any) {
      const {category} = selection
      return Object.assign({}, selection, {
        subtitle: category && `Category: ${category}`,
      })
    },
  },
  orderings: [
    {
      title: 'Upload date new–>old',
      name: 'uploadDateDesc',
      by: [
        {field: 'uploadedAt', direction: 'desc'},
        {field: 'title', direction: 'asc'},
      ],
    },
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
    {
      title: 'Category',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
}
