import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

registerBlockType('express-analytics/hello-world', {
  title: __('Hello World', 'express-analytics'),
  icon: 'smiley',
  category: 'express-analytics',
  edit: () => {
    const blockProps = useBlockProps();
    return (
      <div {...blockProps}>
        <p>{__('Hello World!', 'express-analytics')}</p>
      </div>
    );
  },
  save: () => {
    const blockProps = useBlockProps.save();
    return (
      <div {...blockProps}>
        <p>{__('Hello World!', 'express-analytics')}</p>
      </div>
    );
  },
});
