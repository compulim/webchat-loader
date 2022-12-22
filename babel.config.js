module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        version: '7.20.6'
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
