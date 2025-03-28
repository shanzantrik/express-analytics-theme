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
  SelectControl,
  RangeControl,
  Button,
  ToggleControl,
} from '@wordpress/components';

const ICONS = [
  { value: 'chart-line', label: __('Chart Line', 'expressanalytics') },
  { value: 'chart-bar', label: __('Chart Bar', 'expressanalytics') },
  { value: 'chart-pie', label: __('Chart Pie', 'expressanalytics') },
  { value: 'analytics', label: __('Analytics', 'expressanalytics') },
  { value: 'database', label: __('Database', 'expressanalytics') },
  { value: 'cogs', label: __('Settings', 'expressanalytics') },
  { value: 'users', label: __('Users', 'expressanalytics') },
  { value: 'shield-alt', label: __('Security', 'expressanalytics') },
  { value: 'code', label: __('Code', 'expressanalytics') },
  { value: 'cloud', label: __('Cloud', 'expressanalytics') },
];

registerBlockType('expressanalytics/services', {
  edit: ({ attributes, setAttributes }) => {
    const {
      heading,
      description,
      services,
      columns,
      showIcons,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps({
      className: `wp-block-expressanalytics-services has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    const updateService = (index, property, value) => {
      const newServices = [...services];
      newServices[index] = {
        ...newServices[index],
        [property]: value,
      };
      setAttributes({ services: newServices });
    };

    const updateFeature = (serviceIndex, featureIndex, value) => {
      const newServices = [...services];
      newServices[serviceIndex].features[featureIndex] = value;
      setAttributes({ services: newServices });
    };

    const addService = () => {
      setAttributes({
        services: [
          ...services,
          {
            title: '',
            description: '',
            icon: 'chart-line',
            features: [''],
            image: null,
            link: '#',
          },
        ],
      });
    };

    const removeService = (index) => {
      const newServices = services.filter((_, i) => i !== index);
      setAttributes({ services: newServices });
    };

    const addFeature = (serviceIndex) => {
      const newServices = [...services];
      newServices[serviceIndex].features.push('');
      setAttributes({ services: newServices });
    };

    const removeFeature = (serviceIndex, featureIndex) => {
      const newServices = [...services];
      newServices[serviceIndex].features.splice(featureIndex, 1);
      setAttributes({ services: newServices });
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
            <ToggleControl
              label={__('Show Icons', 'expressanalytics')}
              checked={showIcons}
              onChange={(value) => setAttributes({ showIcons: value })}
            />
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div className="wp-block-expressanalytics-services__content">
            <RichText
              tagName="h2"
              className="wp-block-expressanalytics-services__heading"
              value={heading}
              onChange={(content) => setAttributes({ heading: content })}
              placeholder={__('Add heading...', 'expressanalytics')}
            />
            <RichText
              tagName="p"
              className="wp-block-expressanalytics-services__description"
              value={description}
              onChange={(content) => setAttributes({ description: content })}
              placeholder={__('Add description...', 'expressanalytics')}
            />

            <div
              className="wp-block-expressanalytics-services__grid"
              style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
              }}
            >
              {services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="wp-block-expressanalytics-services__item">
                  <Button
                    className="wp-block-expressanalytics-services__remove-button"
                    onClick={() => removeService(serviceIndex)}
                    isDestructive
                    isSmall
                  >
                    {__('Remove Service', 'expressanalytics')}
                  </Button>

                  {showIcons && (
                    <SelectControl
                      value={service.icon}
                      options={ICONS}
                      onChange={(value) => updateService(serviceIndex, 'icon', value)}
                    />
                  )}

                  <MediaUpload
                    onSelect={(media) => updateService(serviceIndex, 'image', media)}
                    allowedTypes={['image']}
                    value={service.image?.id}
                    render={({ open }) => (
                      <Button
                        className="wp-block-expressanalytics-services__image-button"
                        onClick={open}
                      >
                        {service.image ? (
                          <img
                            src={service.image.url}
                            alt={service.image.alt}
                          />
                        ) : (
                          __('Upload Image', 'expressanalytics')
                        )}
                      </Button>
                    )}
                  />

                  <RichText
                    tagName="h3"
                    className="wp-block-expressanalytics-services__item-title"
                    value={service.title}
                    onChange={(content) => updateService(serviceIndex, 'title', content)}
                    placeholder={__('Add service title...', 'expressanalytics')}
                  />

                  <RichText
                    tagName="p"
                    className="wp-block-expressanalytics-services__item-description"
                    value={service.description}
                    onChange={(content) => updateService(serviceIndex, 'description', content)}
                    placeholder={__('Add service description...', 'expressanalytics')}
                  />

                  <div className="wp-block-expressanalytics-services__features">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="wp-block-expressanalytics-services__feature">
                        <RichText
                          tagName="div"
                          className="wp-block-expressanalytics-services__feature-text"
                          value={feature}
                          onChange={(content) => updateFeature(serviceIndex, featureIndex, content)}
                          placeholder={__('Add feature...', 'expressanalytics')}
                        />
                        <Button
                          onClick={() => removeFeature(serviceIndex, featureIndex)}
                          isDestructive
                          isSmall
                        >
                          {__('Remove', 'expressanalytics')}
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() => addFeature(serviceIndex)}
                      variant="secondary"
                      isSmall
                    >
                      {__('Add Feature', 'expressanalytics')}
                    </Button>
                  </div>

                  <URLInput
                    className="wp-block-expressanalytics-services__link-input"
                    value={service.link}
                    onChange={(url) => updateService(serviceIndex, 'link', url)}
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={addService}
              variant="primary"
              className="wp-block-expressanalytics-services__add-button"
            >
              {__('Add Service', 'expressanalytics')}
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
      services,
      columns,
      showIcons,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps.save({
      className: `wp-block-expressanalytics-services has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    return (
      <div {...blockProps}>
        <div className="wp-block-expressanalytics-services__content">
          <RichText.Content
            tagName="h2"
            className="wp-block-expressanalytics-services__heading"
            value={heading}
          />
          <RichText.Content
            tagName="p"
            className="wp-block-expressanalytics-services__description"
            value={description}
          />

          <div
            className="wp-block-expressanalytics-services__grid"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {services.map((service, serviceIndex) => (
              <div key={serviceIndex} className="wp-block-expressanalytics-services__item">
                {showIcons && service.icon && (
                  <i className={`fas fa-${service.icon}`} />
                )}

                {service.image && (
                  <img
                    className="wp-block-expressanalytics-services__image"
                    src={service.image.url}
                    alt={service.image.alt}
                  />
                )}

                <RichText.Content
                  tagName="h3"
                  className="wp-block-expressanalytics-services__item-title"
                  value={service.title}
                />

                <RichText.Content
                  tagName="p"
                  className="wp-block-expressanalytics-services__item-description"
                  value={service.description}
                />

                <ul className="wp-block-expressanalytics-services__features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <RichText.Content value={feature} />
                    </li>
                  ))}
                </ul>

                <a
                  href={service.link}
                  className="wp-block-expressanalytics-services__link"
                >
                  {__('Learn More', 'expressanalytics')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
