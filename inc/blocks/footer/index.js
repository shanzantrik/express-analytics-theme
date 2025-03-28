import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  RichText,
} from '@wordpress/block-editor';
import {
  PanelBody,
  ToggleControl,
  RangeControl,
  Button,
  TextControl,
} from '@wordpress/components';

registerBlockType('expressanalytics/footer', {
  edit: ({ attributes, setAttributes }) => {
    const {
      showLogo,
      logoUrl,
      logoWidth,
      showSocial,
      socialLinks,
      copyrightText,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps({
      className: `wp-block-expressanalytics-footer has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    const updateSocialLink = (index, key, value) => {
      const newSocialLinks = [...socialLinks];
      newSocialLinks[index] = {
        ...newSocialLinks[index],
        [key]: value,
      };
      setAttributes({ socialLinks: newSocialLinks });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Logo Settings', 'expressanalytics')}>
            <ToggleControl
              label={__('Show Logo', 'expressanalytics')}
              checked={showLogo}
              onChange={(value) => setAttributes({ showLogo: value })}
            />
            {showLogo && (
              <>
                <MediaUpload
                  onSelect={(media) => setAttributes({ logoUrl: media.url })}
                  allowedTypes={['image']}
                  value={logoUrl}
                  render={({ open }) => (
                    <Button
                      onClick={open}
                      variant="secondary"
                      className="editor-post-featured-image__toggle"
                    >
                      {logoUrl ? __('Replace Logo', 'expressanalytics') : __('Add Logo', 'expressanalytics')}
                    </Button>
                  )}
                />
                <RangeControl
                  label={__('Logo Width', 'expressanalytics')}
                  value={logoWidth}
                  onChange={(value) => setAttributes({ logoWidth: value })}
                  min={100}
                  max={300}
                />
              </>
            )}
          </PanelBody>

          <PanelBody title={__('Social Links', 'expressanalytics')}>
            <ToggleControl
              label={__('Show Social Links', 'expressanalytics')}
              checked={showSocial}
              onChange={(value) => setAttributes({ showSocial: value })}
            />
            {showSocial && socialLinks.map((link, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <TextControl
                  label={__(`${link.platform} URL`, 'expressanalytics')}
                  value={link.url}
                  onChange={(value) => updateSocialLink(index, 'url', value)}
                />
              </div>
            ))}
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div className="wp-block-expressanalytics-footer__inner">
            <div className="wp-block-expressanalytics-footer__top">
              {showLogo && logoUrl && (
                <div className="wp-block-expressanalytics-footer__logo">
                  <img
                    src={logoUrl}
                    alt={__('Site Logo', 'expressanalytics')}
                    style={{ width: logoWidth }}
                  />
                </div>
              )}

              <nav className="wp-block-expressanalytics-footer__nav">
                <div className="wp-block-expressanalytics-footer__menu-placeholder">
                  {__('Footer Navigation', 'expressanalytics')}
                </div>
              </nav>

              {showSocial && (
                <div className="wp-block-expressanalytics-footer__social">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className={`wp-block-expressanalytics-footer__social-link wp-block-expressanalytics-footer__social-${link.platform}`}
                    >
                      <i className={`fab fa-${link.icon}`}></i>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="wp-block-expressanalytics-footer__bottom">
              <RichText
                tagName="div"
                className="wp-block-expressanalytics-footer__copyright"
                value={copyrightText}
                onChange={(content) => setAttributes({ copyrightText: content })}
                placeholder={__('Add copyright text...', 'expressanalytics')}
              />
            </div>
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const {
      showLogo,
      logoUrl,
      logoWidth,
      showSocial,
      socialLinks,
      copyrightText,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps.save({
      className: `wp-block-expressanalytics-footer has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    return (
      <div {...blockProps}>
        <div className="wp-block-expressanalytics-footer__inner">
          <div className="wp-block-expressanalytics-footer__top">
            {showLogo && logoUrl && (
              <div className="wp-block-expressanalytics-footer__logo">
                <a href="/">
                  <img
                    src={logoUrl}
                    alt={__('Site Logo', 'expressanalytics')}
                    style={{ width: logoWidth }}
                  />
                </a>
              </div>
            )}

            <nav className="wp-block-expressanalytics-footer__nav">
              <div className="wp-block-expressanalytics-footer__menu"></div>
            </nav>

            {showSocial && (
              <div className="wp-block-expressanalytics-footer__social">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className={`wp-block-expressanalytics-footer__social-link wp-block-expressanalytics-footer__social-${link.platform}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`fab fa-${link.icon}`}></i>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="wp-block-expressanalytics-footer__bottom">
            <RichText.Content
              tagName="div"
              className="wp-block-expressanalytics-footer__copyright"
              value={copyrightText}
            />
          </div>
        </div>
      </div>
    );
  },
});
