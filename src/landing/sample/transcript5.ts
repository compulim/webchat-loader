export default [
  {
    from: {
      role: 'bot'
    },
    text: 'Great! Please rate your experience.',
    type: 'message',
    entities: [
      {
        content: {
          '@context': 'https://schema.org',
          '@type': 'ReviewAction',
          actionStatus: 'PotentialActionStatus',
          resultReview: {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              description: ['Bad', 'Poor', 'Average', 'Good', 'Excellent'],
              'ratingValue-input': {
                '@type': 'PropertyValueSpecification',
                valueName: 'rate'
              }
            }
          },
          target: {
            '@type': 'EntryPoint',
            actionPlatform: 'https://directline.botframework.com',
            urlTemplate: 'ms-directline://messageback'
          }
        },
        contentType: 'application/ld+json'
      }
    ],
    timestamp: new Date().toISOString()
  }
];
