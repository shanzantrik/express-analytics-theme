import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
  Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

registerBlockType('expressanalytics/case-studies', {
  edit: ({ attributes, setAttributes }) => {
    const {
      heading,
      description,
      columns,
      showFilters,
      selectedIndustry,
      postsToShow,
      orderBy,
      order,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps({
      className: `wp-block-expressanalytics-case-studies has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    const { caseStudies, industries, isLoading } = useSelect((select) => {
      const { getEntityRecords, getTaxonomyTerms } = select('core');

      const caseStudiesQuery = {
        per_page: postsToShow,
        _embed: true,
        orderby: orderBy,
        order: order,
      };

      if (selectedIndustry) {
        caseStudiesQuery.industry = selectedIndustry;
      }

      return {
        caseStudies: getEntityRecords('postType', 'case-study', caseStudiesQuery),
        industries: getTaxonomyTerms('industry'),
        isLoading: !getEntityRecords('postType', 'case-study', caseStudiesQuery) || !getTaxonomyTerms('industry'),
      };
    }, [postsToShow, selectedIndustry, orderBy, order]);

    const industryOptions = industries ? [
      { label: __('All Industries', 'expressanalytics'), value: '' },
      ...industries.map((industry) => ({
        label: industry.name,
        value: industry.id,
      })),
    ] : [];

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
            <RangeControl
              label={__('Number of Case Studies', 'expressanalytics')}
              value={postsToShow}
              onChange={(value) => setAttributes({ postsToShow: value })}
              min={1}
              max={12}
            />
            <ToggleControl
              label={__('Show Filters', 'expressanalytics')}
              checked={showFilters}
              onChange={(value) => setAttributes({ showFilters: value })}
            />
            <SelectControl
              label={__('Order By', 'expressanalytics')}
              value={orderBy}
              options={[
                { label: __('Date', 'expressanalytics'), value: 'date' },
                { label: __('Title', 'expressanalytics'), value: 'title' },
                { label: __('Menu Order', 'expressanalytics'), value: 'menu_order' },
              ]}
              onChange={(value) => setAttributes({ orderBy: value })}
            />
            <SelectControl
              label={__('Order', 'expressanalytics')}
              value={order}
              options={[
                { label: __('Descending', 'expressanalytics'), value: 'desc' },
                { label: __('Ascending', 'expressanalytics'), value: 'asc' },
              ]}
              onChange={(value) => setAttributes({ order: value })}
            />
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div className="wp-block-expressanalytics-case-studies__content">
            <RichText
              tagName="h2"
              className="wp-block-expressanalytics-case-studies__heading"
              value={heading}
              onChange={(content) => setAttributes({ heading: content })}
              placeholder={__('Add heading...', 'expressanalytics')}
            />
            <RichText
              tagName="p"
              className="wp-block-expressanalytics-case-studies__description"
              value={description}
              onChange={(content) => setAttributes({ description: content })}
              placeholder={__('Add description...', 'expressanalytics')}
            />

            {showFilters && industries && (
              <div className="wp-block-expressanalytics-case-studies__filters">
                <SelectControl
                  value={selectedIndustry}
                  options={industryOptions}
                  onChange={(value) => setAttributes({ selectedIndustry: value })}
                />
              </div>
            )}

            {isLoading ? (
              <div className="wp-block-expressanalytics-case-studies__loading">
                <Spinner />
              </div>
            ) : (
              <div
                className="wp-block-expressanalytics-case-studies__grid"
                style={{
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                }}
              >
                {caseStudies?.map((post) => (
                  <div key={post.id} className="wp-block-expressanalytics-case-studies__item">
                    {post._embedded?.['wp:featuredmedia']?.[0] && (
                      <img
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={post._embedded['wp:featuredmedia'][0].alt_text}
                        className="wp-block-expressanalytics-case-studies__image"
                      />
                    )}
                    <h3 className="wp-block-expressanalytics-case-studies__item-title">
                      {post.title.rendered}
                    </h3>
                    <div
                      className="wp-block-expressanalytics-case-studies__item-excerpt"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <a
                      href={post.link}
                      className="wp-block-expressanalytics-case-studies__link"
                    >
                      {__('Read Case Study', 'expressanalytics')}
                    </a>
                  </div>
                ))}
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
      columns,
      showFilters,
      backgroundColor,
      textColor,
      gradient,
    } = attributes;

    const blockProps = useBlockProps.save({
      className: `wp-block-expressanalytics-case-studies has-${backgroundColor}-background-color has-${textColor}-color has-text-color has-background`,
      style: {
        backgroundColor,
        color: textColor,
        backgroundImage: gradient,
      },
    });

    return (
      <div {...blockProps}>
        <div className="wp-block-expressanalytics-case-studies__content">
          <RichText.Content
            tagName="h2"
            className="wp-block-expressanalytics-case-studies__heading"
            value={heading}
          />
          <RichText.Content
            tagName="p"
            className="wp-block-expressanalytics-case-studies__description"
            value={description}
          />
          {showFilters && (
            <div className="wp-block-expressanalytics-case-studies__filters"></div>
          )}
          <div
            className="wp-block-expressanalytics-case-studies__grid"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          ></div>
        </div>
      </div>
    );
  },
});
