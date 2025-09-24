export default {
  name: 'now',
  title: 'Now Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'What I\'m doing now',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'currentWork',
      title: 'Currently Building',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Project Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        {
          name: 'progress',
          title: 'Progress (%)',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(100),
        },
        {
          name: 'link',
          title: 'Project Link',
          type: 'url',
        },
      ],
    },
    {
      name: 'currentLearning',
      title: 'Currently Learning',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'skill',
              title: 'Skill/Technology',
              type: 'string',
            },
            {
              name: 'description',
              title: 'What I\'m learning',
              type: 'text',
            },
            {
              name: 'resources',
              title: 'Learning Resources',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Resource Title',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'url',
                    },
                    {
                      name: 'type',
                      title: 'Resource Type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Course', value: 'course'},
                          {title: 'Book', value: 'book'},
                          {title: 'Article', value: 'article'},
                          {title: 'Video', value: 'video'},
                          {title: 'Documentation', value: 'docs'},
                          {title: 'Other', value: 'other'},
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'currentBooks',
      title: 'Currently Reading',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Book Title',
              type: 'string',
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string',
            },
            {
              name: 'cover',
              title: 'Book Cover',
              type: 'image',
              options: {hotspot: true},
            },
            {
              name: 'progress',
              title: 'Progress (%)',
              type: 'number',
              validation: (Rule: any) => Rule.min(0).max(100),
            },
            {
              name: 'thoughts',
              title: 'Current Thoughts',
              type: 'text',
            },
            {
              name: 'startedDate',
              title: 'Started Reading',
              type: 'date',
            },
            {
              name: 'goodreadsLink',
              title: 'Goodreads Link',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'currentMusic',
      title: 'Currently Listening',
      type: 'object',
      fields: [
        {
          name: 'topArtists',
          title: 'Top Artists',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'topTracks',
          title: 'Top Tracks',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Track Title',
                  type: 'string',
                },
                {
                  name: 'artist',
                  title: 'Artist',
                  type: 'string',
                },
                {
                  name: 'album',
                  title: 'Album',
                  type: 'string',
                },
                {
                  name: 'spotifyUrl',
                  title: 'Spotify URL',
                  type: 'url',
                },
              ],
            },
          ],
        },
        {
          name: 'recentlyDiscovered',
          title: 'Recently Discovered',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'currentPlaylist',
          title: 'Current Favorite Playlist',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Playlist Name',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'spotifyUrl',
              title: 'Spotify URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'currentTravel',
      title: 'Travel Status',
      type: 'object',
      fields: [
        {
          name: 'status',
          title: 'Current Status',
          type: 'string',
          options: {
            list: [
              {title: 'At Home', value: 'home'},
              {title: 'Traveling', value: 'traveling'},
              {title: 'Planning Trip', value: 'planning'},
            ],
          },
        },
        {
          name: 'currentLocation',
          title: 'Current Location',
          type: 'string',
        },
        {
          name: 'nextDestination',
          title: 'Next Destination',
          type: 'object',
          fields: [
            {
              name: 'location',
              title: 'Location',
              type: 'string',
            },
            {
              name: 'plannedDate',
              title: 'Planned Date',
              type: 'date',
            },
            {
              name: 'excitement',
              title: 'Excitement Level (1-10)',
              type: 'number',
              validation: (Rule: any) => Rule.min(1).max(10),
            },
          ],
        },
        {
          name: 'recentTrip',
          title: 'Most Recent Trip',
          type: 'object',
          fields: [
            {
              name: 'location',
              title: 'Location',
              type: 'string',
            },
            {
              name: 'date',
              title: 'Date',
              type: 'date',
            },
            {
              name: 'highlight',
              title: 'Trip Highlight',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'personalNote',
      title: 'Personal Note',
      type: 'text',
      description: 'A personal message or reflection for this update',
    },
    {
      name: 'mood',
      title: 'Current Mood',
      type: 'string',
      options: {
        list: [
          {title: '😊 Happy', value: 'happy'},
          {title: '🚀 Motivated', value: 'motivated'},
          {title: '🤔 Contemplative', value: 'contemplative'},
          {title: '😌 Peaceful', value: 'peaceful'},
          {title: '🔥 Energetic', value: 'energetic'},
          {title: '😴 Tired', value: 'tired'},
          {title: '🙂 Content', value: 'content'},
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      lastUpdated: 'lastUpdated',
      mood: 'mood',
    },
    prepare(selection: any) {
      const {lastUpdated, mood} = selection
      return Object.assign({}, selection, {
        subtitle: `Updated: ${lastUpdated && new Date(lastUpdated).toLocaleDateString()} ${mood ? `• ${mood}` : ''}`,
      })
    },
  },
}
