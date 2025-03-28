/* global wp */

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, Button, SelectControl } = wp.components;
const { useState } = wp.element;
const { __ } = wp.i18n;

registerBlockType('express-analytics/adminlte-multi-tabs', {
  apiVersion: 2,
  title: __('AdminLTE Multi Tabs', 'express-analytics'),
  description: __('A custom block with vertical tabs styled like AdminLTE sidebar', 'express-analytics'),
  icon: 'grid-view',
  category: 'express-analytics',
  keywords: [__('tabs', 'express-analytics'), __('adminlte', 'express-analytics'), __('vertical tabs', 'express-analytics')],
  supports: {
    html: false,
    anchor: true,
    align: ['wide', 'full']
  },
  attributes: {
    tabs: {
      type: 'array',
      default: [
        { title: 'Tab 1', icon: 'fas fa-home', content: '' },
        { title: 'Tab 2', icon: 'fas fa-cog', content: '' },
      ],
    },
  },

  edit: function Edit({ attributes, setAttributes }) {
    const { tabs } = attributes;
    const [activeTab, setActiveTab] = useState(0);
    const blockProps = useBlockProps({
      className: 'adminlte-multi-tabs-block'
    });

    const iconOptions = [
      { label: __('None', 'express-analytics'), value: '' },
      { label: __('Home', 'express-analytics'), value: 'fas fa-home' },
      { label: __('Cog', 'express-analytics'), value: 'fas fa-cog' },
      { label: __('User', 'express-analytics'), value: 'fas fa-user' },
      { label: __('Chart', 'express-analytics'), value: 'fas fa-chart-bar' },
      { label: __('Envelope', 'express-analytics'), value: 'fas fa-envelope' },
    ];

    const addTab = () => {
      const newTabs = [...tabs, { title: `Tab ${tabs.length + 1}`, icon: '', content: '' }];
      setAttributes({ tabs: newTabs });
    };

    const updateTabTitle = (index, value) => {
      const newTabs = [...tabs];
      newTabs[index].title = value;
      setAttributes({ tabs: newTabs });
    };

    const updateTabIcon = (index, value) => {
      const newTabs = [...tabs];
      newTabs[index].icon = value;
      setAttributes({ tabs: newTabs });
    };

    return (
      <div {...blockProps}>
        <InspectorControls>
          <PanelBody title={__('Tab Settings', 'express-analytics')}>
            <Button
              variant="primary"
              onClick={addTab}
              className="components-button is-primary"
            >
              {__('Add New Tab', 'express-analytics')}
            </Button>
            {tabs.map((tab, index) => (
              <PanelBody key={index} title={__(`Tab ${index + 1}`, 'express-analytics')} initialOpen={false}>
                <TextControl
                  label={__('Tab Title', 'express-analytics')}
                  value={tab.title}
                  onChange={(value) => updateTabTitle(index, value)}
                />
                <SelectControl
                  label={__('Tab Icon', 'express-analytics')}
                  value={tab.icon}
                  options={iconOptions}
                  onChange={(value) => updateTabIcon(index, value)}
                />
              </PanelBody>
            ))}
          </PanelBody>
        </InspectorControls>

        <div className="adminlte-multi-tabs">
          <div className="sidebar">
            <ul className="nav nav-pills nav-sidebar flex-column">
              {tabs.map((tab, index) => (
                <li className="nav-item" key={index}>
                  <a
                    href="#"
                    className={`nav-link ${activeTab === index ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(index);
                    }}
                  >
                    {tab.icon && <i className={`${tab.icon} mr-2`}></i>}
                    <RichText
                      tagName="span"
                      value={tab.title}
                      onChange={(value) => updateTabTitle(index, value)}
                      placeholder={__('Tab Title', 'express-analytics')}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="content">
            <div className={`tab-pane active`}>
              <InnerBlocks
                allowedBlocks={['core/paragraph', 'core/heading', 'core/image', 'core/list']}
                template={[['core/paragraph']]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },

  save: function Save({ attributes }) {
    const { tabs } = attributes;
    const blockProps = useBlockProps.save({
      className: 'adminlte-multi-tabs-block'
    });

    return (
      <div {...blockProps}>
        <div className="adminlte-multi-tabs">
          <div className="sidebar">
            <ul className="nav nav-pills nav-sidebar flex-column">
              {tabs.map((tab, index) => (
                <li className="nav-item" key={index}>
                  <a
                    href={`#tab-${index}`}
                    className={`nav-link ${index === 0 ? 'active' : ''}`}
                    data-tab={index}
                  >
                    {tab.icon && <i className={`${tab.icon} mr-2`}></i>}
                    <RichText.Content tagName="span" value={tab.title} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="content">
            {tabs.map((tab, index) => (
              <div
                className={`tab-pane ${index === 0 ? 'active' : ''}`}
                id={`tab-${index}`}
                key={index}
              >
                <InnerBlocks.Content />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
});
