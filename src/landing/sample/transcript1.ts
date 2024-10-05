const NOW = Date.now();

export default [
  {
    id: 'a-00001',
    text: 'What can I do for you?',
    timestamp: new Date(NOW - 120000).toISOString(),
    type: 'message',
    attachments: [
      {
        content: {
          type: 'AdaptiveCard',
          body: [
            {
              type: 'TextBlock',
              text: 'You can choose one of the followings.'
            }
          ],
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          version: '1.2',
          actions: [
            {
              type: 'Action.Submit',
              title: 'What time is it?'
            },
            {
              type: 'Action.Submit',
              title: 'What is the weather?'
            }
          ]
        },
        contentType: 'application/vnd.microsoft.card.adaptive'
      }
    ]
  },
  {
    from: {
      role: 'user'
    },
    id: 'a-00002',
    text: 'What time is it?',
    timestamp: new Date(NOW - 60000).toISOString(),
    type: 'message'
  },
  {
    id: 'a-00003',
    text: `It's ${new Date(NOW).toLocaleTimeString()}.`,
    timestamp: new Date(NOW).toISOString(),
    type: 'message'
  }
];
