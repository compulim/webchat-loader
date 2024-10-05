export default [
  {
    from: {
      role: 'bot'
    },
    type: 'message',
    attachments: [
      {
        content: {
          '@context': 'https://schema.org',
          '@type': 'ReviewAction',
          actionStatus: 'PotentialActionStatus',
          description: 'Great! Please rate your experience.',
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
            urlTemplate: 'ms-directline-postback:?valuetype=application/json&value=%7B%22rate%22%3A%22{rate}%22%7D'
          }
        },
        contentType: 'application/ld+json'
      }
    ],
    timestamp: new Date().toISOString()
  }
];
