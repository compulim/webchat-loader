module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        version: '7.20.6'
      }
    ],
    [
      'babel-plugin-transform-define',
      {
        'WebChatLoader.npm_package_name': process.env.npm_package_name,
        'WebChatLoader.npm_package_version': process.env.npm_package_version
      }
    ]
  ],
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          ie: '11'
        }
      }
    ],
    '@babel/preset-react'
  ]
};
