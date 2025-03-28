import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  MediaUpload,
  InspectorControls,
  URLInput,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  Button,
} from '@wordpress/components';

registerBlockType('expressanalytics/hero', {
  edit: ({ attributes, setAttributes }) => {
    const {
      heading,
      description,
      primaryButtonText,
      primaryButtonUrl,
      secondaryButtonText,
      secondaryButtonUrl,
      backgroundImage,
      overlayOpacity,
    } = attributes;

    const blockProps = useBlockProps({
      className: 'wp-block-expressanalytics-hero',
      style: backgroundImage?.url ? {
        backgroundImage: `url(${backgroundImage.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      } : {},
    });

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Background Settings', 'expressanalytics')}>
            <MediaUpload
              onSelect={(media) => {
                setAttributes({
                  backgroundImage: {
                    url: media.url,
                    id: media.id,
                    alt: media.alt,
                  },
                });
              }}
              allowedTypes={['image']}
              value={backgroundImage?.id}
              render={({ open }) => (
                <Button
                  onClick={open}
                  variant="secondary"
                  isLarge
                >
                  {backgroundImage?.url
                    ? __('Replace Image', 'expressanalytics')
                    : __('Add Image', 'expressanalytics')}
                </Button>
              )}
            />
            {backgroundImage?.url && (
              <Button
                onClick={() => {
                  setAttributes({
                    backgroundImage: {
                      url: '',
                      id: null,
                      alt: '',
                    },
                  });
                }}
                variant="link"
                isDestructive
              >
                {__('Remove Image', 'expressanalytics')}
              </Button>
            )}
            <RangeControl
              label={__('Overlay Opacity', 'expressanalytics')}
              value={overlayOpacity}
              onChange={(value) => setAttributes({ overlayOpacity: value })}
              min={0}
              max={1}
              step={0.1}
            />
          </PanelBody>
          <PanelBody title={__('Button Settings', 'expressanalytics')}>
            <URLInput
              label={__('Primary Button URL', 'expressanalytics')}
              value={primaryButtonUrl}
              onChange={(url) => setAttributes({ primaryButtonUrl: url })}
            />
            <URLInput
              label={__('Secondary Button URL', 'expressanalytics')}
              value={secondaryButtonUrl}
              onChange={(url) => setAttributes({ secondaryButtonUrl: url })}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          {backgroundImage?.url && (
            <div
              className="wp-block-expressanalytics-hero__overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
              }}
            />
          )}
          <div className="wp-block-expressanalytics-hero__content">
            <RichText
              tagName="h1"
              className="wp-block-expressanalytics-hero__heading"
              value={heading}
              onChange={(content) => setAttributes({ heading: content })}
              placeholder={__('Add heading...', 'expressanalytics')}
            />
            <RichText
              tagName="p"
              className="wp-block-expressanalytics-hero__description"
              value={description}
              onChange={(content) => setAttributes({ description: content })}
              placeholder={__('Add description...', 'expressanalytics')}
            />
            <div className="wp-block-expressanalytics-hero__buttons">
              <RichText
                tagName="span"
                className="wp-block-button__link wp-element-button"
                value={primaryButtonText}
                onChange={(content) => setAttributes({ primaryButtonText: content })}
                placeholder={__('Add primary button text...', 'expressanalytics')}
              />
              <RichText
                tagName="span"
                className="wp-block-button__link wp-element-button is-style-outline"
                value={secondaryButtonText}
                onChange={(content) => setAttributes({ secondaryButtonText: content })}
                placeholder={__('Add secondary button text...', 'expressanalytics')}
              />
            </div>
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const {
      heading,
      description,
      primaryButtonText,
      primaryButtonUrl,
      secondaryButtonText,
      secondaryButtonUrl,
      backgroundImage,
      overlayOpacity,
    } = attributes;

    const blockProps = useBlockProps.save({
      className: 'wp-block-expressanalytics-hero',
      style: backgroundImage?.url ? {
        backgroundImage: `url(${backgroundImage.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      } : {},
    });

    return (
      <div {...blockProps}>
        {backgroundImage?.url && (
          <div
            className="wp-block-expressanalytics-hero__overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            }}
          />
        )}
        <div className="wp-block-expressanalytics-hero__content">
          <RichText.Content
            tagName="h1"
            className="wp-block-expressanalytics-hero__heading"
            value={heading}
          />
          <RichText.Content
            tagName="p"
            className="wp-block-expressanalytics-hero__description"
            value={description}
          />
          <div className="wp-block-expressanalytics-hero__buttons">
            <a
              href={primaryButtonUrl}
              className="wp-block-button__link wp-element-button"
            >
              <RichText.Content value={primaryButtonText} />
            </a>
            <a
              href={secondaryButtonUrl}
              className="wp-block-button__link wp-element-button is-style-outline"
            >
              <RichText.Content value={secondaryButtonText} />
            </a>
          </div>
        </div>
      </div>
    );
  },
});
