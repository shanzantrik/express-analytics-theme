const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
  ...defaultConfig,
  entry: {
    'adminlte-multi-tabs': './inc/blocks/adminlte-multi-tabs/block.js',
    'header': './inc/blocks/header/index.js',
    'footer': './inc/blocks/footer/index.js',
    'contact': './inc/blocks/contact/index.js',
    'case-studies': './inc/blocks/case-studies/index.js',
    'services': './inc/blocks/services/index.js',
    'testimonials': './inc/blocks/testimonials/index.js',
    'features': './inc/blocks/features/index.js',
    'hero': './inc/blocks/hero/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]/block.js',
  },
};
