import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  ToggleControl,
} from '@wordpress/components';

registerBlockType('expressanalytics/contact', {
  edit: ({ attributes, setAttributes }) => {
    const {
      heading,
      description,
      contactInfo,
      formShortcode,
      showMap,
      mapEmbedUrl,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps({
      className: `wp-block-expressanalytics-contact has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    const updateContactInfo = (key, value) => {
      setAttributes({
        contactInfo: {
          ...contactInfo,
          [key]: value,
        },
      });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Contact Settings', 'expressanalytics')}>
            <TextControl
              label={__('Contact Form 7 Shortcode', 'expressanalytics')}
              value={formShortcode}
              onChange={(value) => setAttributes({ formShortcode: value })}
              help={__('Enter the Contact Form 7 shortcode to display the form.', 'expressanalytics')}
            />
            <ToggleControl
              label={__('Show Map', 'expressanalytics')}
              checked={showMap}
              onChange={(value) => setAttributes({ showMap: value })}
            />
            {showMap && (
              <TextControl
                label={__('Google Maps Embed URL', 'expressanalytics')}
                value={mapEmbedUrl}
                onChange={(value) => setAttributes({ mapEmbedUrl: value })}
                help={__('Enter the Google Maps embed URL for your location.', 'expressanalytics')}
              />
            )}
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div className="wp-block-expressanalytics-contact__content">
            <div className="wp-block-expressanalytics-contact__header">
              <RichText
                tagName="h2"
                className="wp-block-expressanalytics-contact__heading"
                value={heading}
                onChange={(content) => setAttributes({ heading: content })}
                placeholder={__('Add heading...', 'expressanalytics')}
              />
              <RichText
                tagName="p"
                className="wp-block-expressanalytics-contact__description"
                value={description}
                onChange={(content) => setAttributes({ description: content })}
                placeholder={__('Add description...', 'expressanalytics')}
              />
            </div>

            <div className="wp-block-expressanalytics-contact__grid">
              <div className="wp-block-expressanalytics-contact__info">
                <div className="wp-block-expressanalytics-contact__info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <RichText
                    tagName="div"
                    className="wp-block-expressanalytics-contact__address"
                    value={contactInfo.address}
                    onChange={(content) => updateContactInfo('address', content)}
                    placeholder={__('Enter address...', 'expressanalytics')}
                  />
                </div>
                <div className="wp-block-expressanalytics-contact__info-item">
                  <i className="fas fa-phone"></i>
                  <RichText
                    tagName="div"
                    className="wp-block-expressanalytics-contact__phone"
                    value={contactInfo.phone}
                    onChange={(content) => updateContactInfo('phone', content)}
                    placeholder={__('Enter phone number...', 'expressanalytics')}
                  />
                </div>
                <div className="wp-block-expressanalytics-contact__info-item">
                  <i className="fas fa-envelope"></i>
                  <RichText
                    tagName="div"
                    className="wp-block-expressanalytics-contact__email"
                    value={contactInfo.email}
                    onChange={(content) => updateContactInfo('email', content)}
                    placeholder={__('Enter email address...', 'expressanalytics')}
                  />
                </div>
              </div>

              <div className="wp-block-expressanalytics-contact__form">
                <div className="wp-block-expressanalytics-contact__form-placeholder">
                  {formShortcode || __('Enter a Contact Form 7 shortcode in the block settings.', 'expressanalytics')}
                </div>
              </div>
            </div>

            {showMap && mapEmbedUrl && (
              <div className="wp-block-expressanalytics-contact__map">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const {
      heading,
      description,
      contactInfo,
      formShortcode,
      showMap,
      mapEmbedUrl,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps.save({
      className: `wp-block-expressanalytics-contact has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    return (
      <div {...blockProps}>
        <div className="wp-block-expressanalytics-contact__content">
          <div className="wp-block-expressanalytics-contact__header">
            <RichText.Content
              tagName="h2"
              className="wp-block-expressanalytics-contact__heading"
              value={heading}
            />
            <RichText.Content
              tagName="p"
              className="wp-block-expressanalytics-contact__description"
              value={description}
            />
          </div>

          <div className="wp-block-expressanalytics-contact__grid">
            <div className="wp-block-expressanalytics-contact__info">
              <div className="wp-block-expressanalytics-contact__info-item">
                <i className="fas fa-map-marker-alt"></i>
                <RichText.Content
                  tagName="div"
                  className="wp-block-expressanalytics-contact__address"
                  value={contactInfo.address}
                />
              </div>
              <div className="wp-block-expressanalytics-contact__info-item">
                <i className="fas fa-phone"></i>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                  className="wp-block-expressanalytics-contact__phone"
                >
                  <RichText.Content value={contactInfo.phone} />
                </a>
              </div>
              <div className="wp-block-expressanalytics-contact__info-item">
                <i className="fas fa-envelope"></i>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="wp-block-expressanalytics-contact__email"
                >
                  <RichText.Content value={contactInfo.email} />
                </a>
              </div>
            </div>

            <div className="wp-block-expressanalytics-contact__form">
              {formShortcode && (
                <div dangerouslySetInnerHTML={{ __html: formShortcode }}></div>
              )}
            </div>
          </div>

          {showMap && mapEmbedUrl && (
            <div className="wp-block-expressanalytics-contact__map">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    );
  },
});
