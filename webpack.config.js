const { join } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    landing: './lib/landing.js',
    webchat: './lib/webchat.js'
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: join(__dirname, 'build')
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'public', to: '.' }])
  ]
};
