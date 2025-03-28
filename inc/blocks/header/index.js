import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
} from '@wordpress/block-editor';
import {
  PanelBody,
  ToggleControl,
  RangeControl,
  TextControl,
  Button,
} from '@wordpress/components';

registerBlockType('expressanalytics/header', {
  edit: ({ attributes, setAttributes }) => {
    const {
      showLogo,
      logoUrl,
      logoWidth,
      showNav,
      isSticky,
      showCta,
      ctaText,
      ctaUrl,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps({
      className: `wp-block-expressanalytics-header has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background ${isSticky ? 'is-sticky' : ''}`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

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

          <PanelBody title={__('Navigation Settings', 'expressanalytics')}>
            <ToggleControl
              label={__('Show Navigation', 'expressanalytics')}
              checked={showNav}
              onChange={(value) => setAttributes({ showNav: value })}
            />
            <ToggleControl
              label={__('Sticky Header', 'expressanalytics')}
              checked={isSticky}
              onChange={(value) => setAttributes({ isSticky: value })}
            />
          </PanelBody>

          <PanelBody title={__('CTA Button Settings', 'expressanalytics')}>
            <ToggleControl
              label={__('Show CTA Button', 'expressanalytics')}
              checked={showCta}
              onChange={(value) => setAttributes({ showCta: value })}
            />
            {showCta && (
              <>
                <TextControl
                  label={__('Button Text', 'expressanalytics')}
                  value={ctaText}
                  onChange={(value) => setAttributes({ ctaText: value })}
                />
                <TextControl
                  label={__('Button URL', 'expressanalytics')}
                  value={ctaUrl}
                  onChange={(value) => setAttributes({ ctaUrl: value })}
                />
              </>
            )}
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div className="wp-block-expressanalytics-header__inner">
            {showLogo && logoUrl && (
              <div className="wp-block-expressanalytics-header__logo">
                <img
                  src={logoUrl}
                  alt={__('Site Logo', 'expressanalytics')}
                  style={{ width: logoWidth }}
                />
              </div>
            )}

            {showNav && (
              <nav className="wp-block-expressanalytics-header__nav">
                <div className="wp-block-expressanalytics-header__nav-placeholder">
                  {__('Primary Navigation', 'expressanalytics')}
                </div>
              </nav>
            )}

            {showCta && (
              <div className="wp-block-expressanalytics-header__cta">
                <a href={ctaUrl} className="wp-block-expressanalytics-header__cta-button">
                  {ctaText}
                </a>
              </div>
            )}
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
      showNav,
      isSticky,
      showCta,
      ctaText,
      ctaUrl,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps.save({
      className: `wp-block-expressanalytics-header has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background ${isSticky ? 'is-sticky' : ''}`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    return (
      <div {...blockProps}>
        <div className="wp-block-expressanalytics-header__inner">
          {showLogo && logoUrl && (
            <div className="wp-block-expressanalytics-header__logo">
              <a href="/">
                <img
                  src={logoUrl}
                  alt={__('Site Logo', 'expressanalytics')}
                  style={{ width: logoWidth }}
                />
              </a>
            </div>
          )}

          {showNav && (
            <nav className="wp-block-expressanalytics-header__nav">
              <div className="wp-block-expressanalytics-header__menu"></div>
            </nav>
          )}

          {showCta && (
            <div className="wp-block-expressanalytics-header__cta">
              <a href={ctaUrl} className="wp-block-expressanalytics-header__cta-button">
                {ctaText}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  },
});
