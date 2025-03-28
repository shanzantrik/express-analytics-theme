const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    'hello-world': './inc/blocks/hello-world/index.js',
    'hero-section-solution': './inc/blocks/hero-section-solution/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]/index.js',
  }
};
