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
        forceAllTransforms: true
      }
    ],
    '@babel/preset-react'
  ]
};
