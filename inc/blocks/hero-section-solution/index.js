import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import './index.scss';
import './style-index.scss';

registerBlockType('express-analytics/hero-section-solution', {
  title: 'Hero Section',
  description: 'A custom hero section block for Solutions Custom Post Type.',
  category: 'express-analytics',
  icon: 'cover-image',
  supports: {
    html: false
  },
  attributes: {
    description: {
      type: 'string',
      source: 'html',
      selector: '.hero-description'
    },
    buttonText: {
      type: 'string'
    },
    imageUrl: {
      type: 'string'
    },
    link: {
      type: 'string'
    }
  },
  edit: Edit,
  save: Save
});
