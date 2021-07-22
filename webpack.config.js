const { join } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin, ProvidePlugin } = require('webpack');

module.exports = {
  entry: {
    landing: './lib/landing/index.js',
    pull: './lib/pull/index.js',
    webchat: './lib/webchat/index.js'
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: join(__dirname, 'build')
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '.' }]
    }),
    new DefinePlugin({
      setImmediate: 'setTimeout'
    }),
    new ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
    new ProvidePlugin({ process: ['process'] }),
  ],
  resolve: {
    fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      fs: false,
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
      zlib: require.resolve('browserify-zlib')
    }
  }
};
