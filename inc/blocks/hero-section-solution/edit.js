import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody, Button, URLInput } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { description, buttonText, imageUrl, link } = attributes;

  const blockProps = useBlockProps();

  const onSelectImage = (media) => {
    setAttributes({ imageUrl: media.url });
  };

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Hero Section Settings">
          <URLInput
            label="Button Link"
            value={link}
            onChange={(url) => setAttributes({ link: url })}
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
                <Button onClick={open} variant="primary" className="image-button">
                  {imageUrl ? 'Change Image' : 'Upload Image'}
                </Button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
