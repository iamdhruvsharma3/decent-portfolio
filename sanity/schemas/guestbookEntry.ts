export default {
  name: 'guestbookEntry',
  title: 'Guestbook Entry',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(50),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.email(),
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: any) => Rule.required().max(500),
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Only approved entries will be displayed publicly',
    },
    {
      name: 'featured',
      title: 'Featured Entry',
      type: 'boolean',
      initialValue: false,
      description: 'Featured entries will be highlighted',
    },
    {
      name: 'adminNotes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes (not displayed publicly)',
    },
    {
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      readOnly: true,
      description: 'Automatically captured for moderation',
    },
    {
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true,
      description: 'Automatically captured for moderation',
    },
  ],
  preview: {
    select: {
      name: 'name',
      message: 'message',
      submittedAt: 'submittedAt',
      approved: 'approved',
    },
    prepare(selection: any) {
      const {message, submittedAt, approved} = selection
      const truncatedMessage = message?.length > 50 ? message.slice(0, 50) + '...' : message
      return Object.assign({}, selection, {
        subtitle: `${truncatedMessage} • ${submittedAt && new Date(submittedAt).toLocaleDateString()} ${approved ? '• ✅' : '• ⏳'}`,
      })
    },
  },
  orderings: [
    {
      title: 'Submission date new–>old',
      name: 'submissionDateDesc',
      by: [
        {field: 'submittedAt', direction: 'desc'},
        {field: 'name', direction: 'asc'},
      ],
    },
    {
      title: 'Submission date old–>new',
      name: 'submissionDateAsc',
      by: [
        {field: 'submittedAt', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
    {
      title: 'Approval status',
      name: 'approvalStatus',
      by: [
        {field: 'approved', direction: 'desc'},
        {field: 'submittedAt', direction: 'desc'},
      ],
    },
  ],
}
