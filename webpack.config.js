const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    'hello-world/index': path.resolve(__dirname, 'inc/blocks/hello-world/index.js'),
    'hero-section-solution/index': path.resolve(__dirname, 'inc/blocks/hero-section-solution/index.js'),
    'hero-section-solution/style-index': path.resolve(__dirname, 'inc/blocks/hero-section-solution/style-index.scss'),
    'repeater-ea/index': path.resolve(__dirname, 'inc/blocks/repeater-ea/index.js'),
    'repeater-ea/style-index': path.resolve(__dirname, 'inc/blocks/repeater-ea/style-index.scss'),
    'repeater-ea/editor': path.resolve(__dirname, 'inc/blocks/repeater-ea/index.scss'),
    'js/custom': path.resolve(__dirname, 'assets/js/custom.js'),
    'js/hero-animations': path.resolve(__dirname, 'assets/js/hero-animations.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  externals: {
    jquery: 'jQuery'
  }
};
