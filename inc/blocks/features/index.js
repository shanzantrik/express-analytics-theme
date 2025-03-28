import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  Button,
  TextControl,
  SelectControl,
} from '@wordpress/components';

const ICONS = [
  { value: 'chart-line', label: __('Chart Line', 'expressanalytics') },
  { value: 'desktop', label: __('Desktop', 'expressanalytics') },
  { value: 'chart-bar', label: __('Chart Bar', 'expressanalytics') },
  { value: 'chart-pie', label: __('Chart Pie', 'expressanalytics') },
  { value: 'analytics', label: __('Analytics', 'expressanalytics') },
  { value: 'dashboard', label: __('Dashboard', 'expressanalytics') },
  { value: 'database', label: __('Database', 'expressanalytics') },
  { value: 'cog', label: __('Settings', 'expressanalytics') },
  { value: 'users', label: __('Users', 'expressanalytics') },
  { value: 'shield-alt', label: __('Security', 'expressanalytics') },
];

registerBlockType('expressanalytics/features', {
  edit: ({ attributes, setAttributes }) => {
    const {
      heading,
      description,
      columns,
      features,
      backgroundColor,
      textColor,
    } = attributes;

    const blockProps = useBlockProps({
      className: `wp-block-expressanalytics-features has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background`,
    });

    const updateFeature = (index, property, value) => {
      const newFeatures = [...features];
      newFeatures[index] = {
        ...newFeatures[index],
        [property]: value,
      };
      setAttributes({ features: newFeatures });
    };

    const addFeature = () => {
      setAttributes({
        features: [
          ...features,
          {
            icon: 'chart-line',
            title: __('New Feature', 'expressanalytics'),
            description: __('Add a description for this feature.', 'expressanalytics'),
          },
        ],
      });
    };

    const removeFeature = (index) => {
      const newFeatures = features.filter((_, i) => i !== index);
      setAttributes({ features: newFeatures });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Layout Settings', 'expressanalytics')}>
            <RangeControl
              label={__('Columns', 'expressanalytics')}
              value={columns}
              onChange={(value) => setAttributes({ columns: value })}
              min={1}
              max={4}
            />
          </PanelBody>
          <PanelColorSettings
            title={__('Color Settings', 'expressanalytics')}
            colorSettings={[
              {
                value: backgroundColor,
                onChange: (value) => setAttributes({ backgroundColor: value }),
                label: __('Background Color', 'expressanalytics'),
              },
              {
                value: textColor,
                onChange: (value) => setAttributes({ textColor: value }),
                label: __('Text Color', 'expressanalytics'),
              },
            ]}
          />
        </InspectorControls>
        <div {...blockProps}>
          <div className="wp-block-expressanalytics-features__content">
            <RichText
              tagName="h2"
              className="wp-block-expressanalytics-features__heading"
              value={heading}
              onChange={(content) => setAttributes({ heading: content })}
              placeholder={__('Add heading...', 'expressanalytics')}
            />
            <RichText
              tagName="p"
              className="wp-block-expressanalytics-features__description features-description"
              value={description}
              onChange={(content) => setAttributes({ description: content })}
              placeholder={__('Add description...', 'expressanalytics')}
            />
            <div
              className="wp-block-expressanalytics-features__grid"
              style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
              }}
            >
              {features.map((feature, index) => (
                <div key={index} className="wp-block-expressanalytics-features__item">
                  <SelectControl
                    value={feature.icon}
                    options={ICONS}
                    onChange={(value) => updateFeature(index, 'icon', value)}
                  />
                  <i className={`fas fa-${feature.icon}`} />
                  <RichText
                    tagName="h3"
                    className="wp-block-expressanalytics-features__item-title"
                    value={feature.title}
                    onChange={(content) => updateFeature(index, 'title', content)}
                    placeholder={__('Add feature title...', 'expressanalytics')}
                  />
                  <RichText
                    tagName="p"
                    className="wp-block-expressanalytics-features__item-description"
                    value={feature.description}
                    onChange={(content) => updateFeature(index, 'description', content)}
                    placeholder={__('Add feature description...', 'expressanalytics')}
                  />
                  <Button
                    isDestructive
                    onClick={() => removeFeature(index)}
                    className="wp-block-expressanalytics-features__remove-button"
                  >
                    {__('Remove Feature', 'expressanalytics')}
                  </Button>
                </div>
              ))}
            </div>
            <Button
              isPrimary
              onClick={addFeature}
              className="wp-block-expressanalytics-features__add-button"
            >
              {__('Add Feature', 'expressanalytics')}
            </Button>
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const {
      heading,
      description,
      columns,
      features,
      backgroundColor,
      textColor,
    } = attributes;

    const blockProps = useBlockProps.save({
      className: `wp-block-expressanalytics-features has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background`,
    });

    return (
      <div {...blockProps}>
        <div className="wp-block-expressanalytics-features__content">
          <RichText.Content
            tagName="h2"
            className="wp-block-expressanalytics-features__heading"
            value={heading}
          />
          <RichText.Content
            tagName="p"
            className="wp-block-expressanalytics-features__description features-description"
            value={description}
          />
          <div
            className="wp-block-expressanalytics-features__grid"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {features.map((feature, index) => (
              <div key={index} className="wp-block-expressanalytics-features__item">
                <i className={`fas fa-${feature.icon}`} />
                <RichText.Content
                  tagName="h3"
                  className="wp-block-expressanalytics-features__item-title"
                  value={feature.title}
                />
                <RichText.Content
                  tagName="p"
                  className="wp-block-expressanalytics-features__item-description"
                  value={feature.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
