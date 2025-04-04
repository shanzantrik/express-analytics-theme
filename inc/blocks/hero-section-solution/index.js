import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody, Button } from '@wordpress/components';
import './index.scss';
import './style-index.scss';

const Edit = ({ attributes, setAttributes }) => {
  const { description, buttonText, imageUrl, link } = attributes;

  const blockProps = useBlockProps();

  const onSelectImage = (media) => {
    setAttributes({ imageUrl: media.url });
  };

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Hero Section Settings">
          <TextControl
            label="Button Link"
            value={link}
            onChange={(url) => setAttributes({ link: url })}
            type="url"
          />
          <TextControl
            label="Button Text"
            value={buttonText}
            onChange={(val) => setAttributes({ buttonText: val })}
          />
        </PanelBody>
      </InspectorControls>

      <div className="hero-content">
        {imageUrl && (
          <div className="hero-image">
            <img src={imageUrl} alt="" />
          </div>
        )}
        <div className="hero-text">
          <RichText
            tagName="div"
            className="hero-description"
            value={description || ''}
            onChange={(val) => setAttributes({ description: val })}
            placeholder="Enter hero description..."
          />
          <div className="button-controls">
            <MediaUpload
              onSelect={onSelectImage}
              type="image"
              render={({ open }) => (
                <Button onClick={open} isPrimary className="image-button">
                  {imageUrl ? 'Change Image' : 'Upload Image'}
                </Button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const save = ({ attributes }) => {
  const { description, buttonText, imageUrl, link } = attributes;

  return (
    <div {...useBlockProps.save()}>
      <div className="hero-content">
        {imageUrl && (
          <div className="hero-image">
            <img src={imageUrl} alt="" />
          </div>
        )}
        <div className="hero-text">
          <RichText.Content
            tagName="div"
            className="hero-description"
            value={description}
          />
          {buttonText && link && (
            <a href={link} className="hero-button">
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Register the block
registerBlockType('express-analytics/hero-section-solution', {
  title: 'Hero Section',
  icon: 'shield',
  category: 'express-analytics',
  attributes: {
    description: {
      type: 'string',
      source: 'html',
      selector: '.hero-description',
    },
    buttonText: {
      type: 'string',
      default: 'Click Here',
    },
    imageUrl: {
      type: 'string',
      default: '',
    },
    link: {
      type: 'string',
      default: '',
    },
  },
  edit: Edit,
  save: save,
});
// End of block
