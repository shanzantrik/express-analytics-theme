import { registerBlockType } from '@wordpress/blocks';
import {
  useBlockProps,
  RichText,
  MediaUpload,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  RangeControl,
  Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('expressanalytics/testimonials', {
  edit: ({ attributes, setAttributes }) => {
    const {
      heading,
      description,
      layout,
      columns,
      testimonials,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps({
      className: `wp-block-expressanalytics-testimonials layout-${layout}`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    const updateTestimonial = (index, property, value) => {
      const newTestimonials = [...testimonials];
      newTestimonials[index] = {
        ...newTestimonials[index],
        [property]: value,
      };
      setAttributes({ testimonials: newTestimonials });
    };

    const addTestimonial = () => {
      setAttributes({
        testimonials: [
          ...testimonials,
          {
            quote: '',
            author: '',
            position: '',
            company: '',
            image: null,
          },
        ],
      });
    };

    const removeTestimonial = (index) => {
      const newTestimonials = testimonials.filter((_, i) => i !== index);
      setAttributes({ testimonials: newTestimonials });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Layout Settings', 'expressanalytics')}>
            <SelectControl
              label={__('Layout', 'expressanalytics')}
              value={layout}
              options={[
                { label: __('Carousel', 'expressanalytics'), value: 'carousel' },
                { label: __('Grid', 'expressanalytics'), value: 'grid' },
              ]}
              onChange={(value) => setAttributes({ layout: value })}
            />
            {layout === 'grid' && (
              <RangeControl
                label={__('Columns', 'expressanalytics')}
                value={columns}
                onChange={(value) => setAttributes({ columns: value })}
                min={1}
                max={4}
              />
            )}
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div className="wp-block-expressanalytics-testimonials__content">
            <RichText
              tagName="h2"
              className="wp-block-expressanalytics-testimonials__heading"
              value={heading}
              onChange={(value) => setAttributes({ heading: value })}
              placeholder={__('Enter heading...', 'expressanalytics')}
            />
            <RichText
              tagName="p"
              className="wp-block-expressanalytics-testimonials__description"
              value={description}
              onChange={(value) => setAttributes({ description: value })}
              placeholder={__('Enter description...', 'expressanalytics')}
            />

            <div
              className="wp-block-expressanalytics-testimonials__grid"
              style={{
                gridTemplateColumns: layout === 'grid' ? `repeat(${columns}, 1fr)` : 'none',
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="wp-block-expressanalytics-testimonials__item">
                  <Button
                    className="wp-block-expressanalytics-testimonials__remove-button"
                    onClick={() => removeTestimonial(index)}
                    isSmall
                    isDestructive
                  >
                    {__('Remove', 'expressanalytics')}
                  </Button>

                  <MediaUpload
                    onSelect={(media) => updateTestimonial(index, 'image', media)}
                    allowedTypes={['image']}
                    value={testimonial.image}
                    render={({ open }) => (
                      <Button
                        className="wp-block-expressanalytics-testimonials__image-button"
                        onClick={open}
                      >
                        {testimonial.image ? (
                          <img
                            src={testimonial.image.url}
                            alt={testimonial.image.alt}
                          />
                        ) : (
                          __('Upload Image', 'expressanalytics')
                        )}
                      </Button>
                    )}
                  />

                  <RichText
                    tagName="blockquote"
                    className="wp-block-expressanalytics-testimonials__quote"
                    value={testimonial.quote}
                    onChange={(value) => updateTestimonial(index, 'quote', value)}
                    placeholder={__('Enter testimonial...', 'expressanalytics')}
                  />

                  <div className="wp-block-expressanalytics-testimonials__meta">
                    <RichText
                      tagName="span"
                      className="wp-block-expressanalytics-testimonials__author"
                      value={testimonial.author}
                      onChange={(value) => updateTestimonial(index, 'author', value)}
                      placeholder={__('Author name...', 'expressanalytics')}
                    />
                    <RichText
                      tagName="span"
                      className="wp-block-expressanalytics-testimonials__position"
                      value={testimonial.position}
                      onChange={(value) => updateTestimonial(index, 'position', value)}
                      placeholder={__('Position...', 'expressanalytics')}
                    />
                    <RichText
                      tagName="span"
                      className="wp-block-expressanalytics-testimonials__company"
                      value={testimonial.company}
                      onChange={(value) => updateTestimonial(index, 'company', value)}
                      placeholder={__('Company...', 'expressanalytics')}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="wp-block-expressanalytics-testimonials__add-button"
              onClick={addTestimonial}
              variant="secondary"
            >
              {__('Add Testimonial', 'expressanalytics')}
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
      layout,
      columns,
      testimonials,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps.save({
      className: `wp-block-expressanalytics-testimonials layout-${layout}`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    return (
      <div {...blockProps}>
        <div className="wp-block-expressanalytics-testimonials__content">
          <RichText.Content
            tagName="h2"
            className="wp-block-expressanalytics-testimonials__heading"
            value={heading}
          />
          <RichText.Content
            tagName="p"
            className="wp-block-expressanalytics-testimonials__description"
            value={description}
          />

          <div
            className="wp-block-expressanalytics-testimonials__grid"
            style={{
              gridTemplateColumns: layout === 'grid' ? `repeat(${columns}, 1fr)` : 'none',
            }}
            data-layout={layout}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="wp-block-expressanalytics-testimonials__item">
                {testimonial.image && (
                  <img
                    className="wp-block-expressanalytics-testimonials__image"
                    src={testimonial.image.url}
                    alt={testimonial.image.alt}
                  />
                )}
                <RichText.Content
                  tagName="blockquote"
                  className="wp-block-expressanalytics-testimonials__quote"
                  value={testimonial.quote}
                />
                <div className="wp-block-expressanalytics-testimonials__meta">
                  <RichText.Content
                    tagName="span"
                    className="wp-block-expressanalytics-testimonials__author"
                    value={testimonial.author}
                  />
                  <RichText.Content
                    tagName="span"
                    className="wp-block-expressanalytics-testimonials__position"
                    value={testimonial.position}
                  />
                  <RichText.Content
                    tagName="span"
                    className="wp-block-expressanalytics-testimonials__company"
                    value={testimonial.company}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
