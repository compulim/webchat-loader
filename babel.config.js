module.exports = {
  plugins: [
    '@babel/plugin-proposal-object-rest-spread'
  ],
  presets: [
    ['@babel/preset-env', {
      targets: {
        chrome: 67
      }
    }],
    '@babel/preset-react'
  ]
}
