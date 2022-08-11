module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        version: '7.18.9'
      }
    ]
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        forceAllTransforms: true
      }
    ],
    '@babel/preset-react'
  ]
};
