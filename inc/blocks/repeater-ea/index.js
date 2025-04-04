// Importing code libraries for this block
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, useBlockProps } from '@wordpress/block-editor';
import { TextControl, SelectControl, Button } from '@wordpress/components';
import './index.scss';
import './style-index.scss';



// Register the block
registerBlockType('express-analytics/repeater-ea', {
  title: __('Repeater Block'),
  icon: 'layout',
  category: 'express-analytics',
  keywords: [__('Service'), __('Solution'), __('Repeater')],
  attributes: {
    info: {
      type: 'array',
      default: [],
      selector: '.info-wrap'
    }
  },

  edit: ({ attributes, setAttributes }) => {
    const { items = [] } = attributes;
    const blockProps = useBlockProps();

    const addItem = () => {
      const newItem = {
        index: items.length,
        heading: '',
        description: '',
        imageUrl: '',
        imageAlt: '',
        imageId: 0,
        url: '',
        imagePosition: 'left'
      };
      setAttributes({ items: [...items, newItem] });
    };

    const updateItem = (updatedItem, index) => {
      const newItems = [...items];
      newItems[index] = updatedItem;
      setAttributes({ items: newItems });
    };

    const removeItem = (indexToRemove) => {
      const newItems = items.filter((item, index) => index !== indexToRemove);
      setAttributes({ items: newItems });
    };

    return (
      <div {...blockProps}>
        {items.map((item, index) => (
          <div key={index} className="service-solution-item-editor">
            <Button
              className="remove-item"
              onClick={() => removeItem(index)}
            >&times;</Button>

            <RichText
              tagName="h4"
              className="item-heading"
              placeholder="Enter Heading"
              value={item.heading}
              onChange={(value) => updateItem({ ...item, heading: value }, index)}
            />

            <RichText
              tagName="p"
              className="item-description"
              placeholder="Enter Description"
              value={item.description}
              onChange={(value) => updateItem({ ...item, description: value }, index)}
            />

            <MediaUpload
              onSelect={(media) => updateItem({
                ...item,
                imageUrl: media.url,
                imageAlt: media.alt || '',
                imageId: media.id
              }, index)}
              allowedTypes={['image']}
              value={item.imageId}
              render={({ open }) => (
                <Button onClick={open} className="image-upload-button">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.imageAlt} style={{ maxWidth: '100%' }} />
                  ) : 'Upload Image'}
                </Button>
              )}
            />

            <TextControl
              label="URL"
              value={item.url}
              onChange={(value) => updateItem({ ...item, url: value }, index)}
            />

            <SelectControl
              label="Image Position"
              value={item.imagePosition}
              options={[
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' }
              ]}
              onChange={(value) => updateItem({ ...item, imagePosition: value }, index)}
            />
          </div>
        ))}

        <Button onClick={addItem}>Add Service/Solution</Button>
      </div>
    );
  },

  save: ({ attributes }) => {
    const { items = [] } = attributes;

    return (
      <div>
        {items.map((item, index) => (
          <div key={index} className={`service-item two-column image-${item.imagePosition}`}>
            <div className="service-image-column">
              {item.imageUrl && <img src={item.imageUrl} alt={item.imageAlt || ''} />}
            </div>
            <div className="service-content-column">
              {item.heading && (
                <RichText.Content tagName="h3" value={item.heading} />
              )}
              {item.description && (
                <RichText.Content tagName="p" value={item.description} />
              )}
              {item.url && (
                <a href={item.url} className="service-button">Learn More</a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
});
