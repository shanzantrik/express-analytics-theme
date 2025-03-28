<?php

/**
 * Express Analytics Theme Customizer
 *
 * @package ExpressAnalytics
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function expressanalytics_customize_register($wp_customize)
{
  $wp_customize->get_setting('blogname')->transport         = 'postMessage';
  $wp_customize->get_setting('blogdescription')->transport  = 'postMessage';
  $wp_customize->get_setting('header_textcolor')->transport = 'postMessage';

  // Header Options
  $wp_customize->add_section(
    'expressanalytics_header_options',
    array(
      'title'    => __('Header Options', 'expressanalytics'),
      'priority' => 30,
    )
  );

  // Sticky Header
  $wp_customize->add_setting(
    'sticky_header',
    array(
      'default'           => true,
      'sanitize_callback' => 'expressanalytics_sanitize_checkbox',
    )
  );

  $wp_customize->add_control(
    'sticky_header',
    array(
      'type'    => 'checkbox',
      'section' => 'expressanalytics_header_options',
      'label'   => __('Enable Sticky Header', 'expressanalytics'),
    )
  );

  // Contact Information Section
  $wp_customize->add_section(
    'expressanalytics_contact_info',
    array(
      'title'    => __('Contact Information', 'expressanalytics'),
      'priority' => 120,
    )
  );

  // Phone Number
  $wp_customize->add_setting(
    'contact_phone',
    array(
      'default'           => '+1 (234) 567-89',
      'sanitize_callback' => 'sanitize_text_field',
    )
  );

  $wp_customize->add_control(
    'contact_phone',
    array(
      'type'    => 'text',
      'section' => 'expressanalytics_contact_info',
      'label'   => __('Phone Number', 'expressanalytics'),
    )
  );

  // Email Address
  $wp_customize->add_setting(
    'contact_email',
    array(
      'default'           => 'info@expressanalytics.com',
      'sanitize_callback' => 'sanitize_email',
    )
  );

  $wp_customize->add_control(
    'contact_email',
    array(
      'type'    => 'email',
      'section' => 'expressanalytics_contact_info',
      'label'   => __('Email Address', 'expressanalytics'),
    )
  );

  // Social Media Section
  $wp_customize->add_section(
    'expressanalytics_social_media',
    array(
      'title'    => __('Social Media', 'expressanalytics'),
      'priority' => 130,
    )
  );

  // Facebook URL
  $wp_customize->add_setting(
    'social_facebook',
    array(
      'default'           => '#',
      'sanitize_callback' => 'esc_url_raw',
    )
  );

  $wp_customize->add_control(
    'social_facebook',
    array(
      'type'    => 'url',
      'section' => 'expressanalytics_social_media',
      'label'   => __('Facebook URL', 'expressanalytics'),
    )
  );

  // Twitter URL
  $wp_customize->add_setting(
    'social_twitter',
    array(
      'default'           => '#',
      'sanitize_callback' => 'esc_url_raw',
    )
  );

  $wp_customize->add_control(
    'social_twitter',
    array(
      'type'    => 'url',
      'section' => 'expressanalytics_social_media',
      'label'   => __('Twitter URL', 'expressanalytics'),
    )
  );

  // LinkedIn URL
  $wp_customize->add_setting(
    'social_linkedin',
    array(
      'default'           => '#',
      'sanitize_callback' => 'esc_url_raw',
    )
  );

  $wp_customize->add_control(
    'social_linkedin',
    array(
      'type'    => 'url',
      'section' => 'expressanalytics_social_media',
      'label'   => __('LinkedIn URL', 'expressanalytics'),
    )
  );

  // Instagram URL
  $wp_customize->add_setting(
    'social_instagram',
    array(
      'default'           => '#',
      'sanitize_callback' => 'esc_url_raw',
    )
  );

  $wp_customize->add_control(
    'social_instagram',
    array(
      'type'    => 'url',
      'section' => 'expressanalytics_social_media',
      'label'   => __('Instagram URL', 'expressanalytics'),
    )
  );

  // Footer Options
  $wp_customize->add_section(
    'expressanalytics_footer_options',
    array(
      'title'    => __('Footer Options', 'expressanalytics'),
      'priority' => 140,
    )
  );

  // Copyright Text
  $wp_customize->add_setting(
    'footer_copyright',
    array(
      'default'           => sprintf('© %s Express Analytics. All Rights Reserved.', date('Y')),
      'sanitize_callback' => 'wp_kses_post',
    )
  );

  $wp_customize->add_control(
    'footer_copyright',
    array(
      'type'    => 'textarea',
      'section' => 'expressanalytics_footer_options',
      'label'   => __('Copyright Text', 'expressanalytics'),
    )
  );

  // Cookie Notice Options
  $wp_customize->add_section(
    'expressanalytics_cookie_notice',
    array(
      'title'    => __('Cookie Notice', 'expressanalytics'),
      'priority' => 150,
    )
  );

  // Enable Cookie Notice
  $wp_customize->add_setting(
    'enable_cookie_notice',
    array(
      'default'           => true,
      'sanitize_callback' => 'expressanalytics_sanitize_checkbox',
    )
  );

  $wp_customize->add_control(
    'enable_cookie_notice',
    array(
      'type'    => 'checkbox',
      'section' => 'expressanalytics_cookie_notice',
      'label'   => __('Enable Cookie Notice', 'expressanalytics'),
    )
  );

  // Cookie Notice Text
  $wp_customize->add_setting(
    'cookie_notice_text',
    array(
      'default'           => __('This website stores cookies on your computer. We use this information in order to improve and customize your browsing experience.', 'expressanalytics'),
      'sanitize_callback' => 'wp_kses_post',
    )
  );

  $wp_customize->add_control(
    'cookie_notice_text',
    array(
      'type'    => 'textarea',
      'section' => 'expressanalytics_cookie_notice',
      'label'   => __('Cookie Notice Text', 'expressanalytics'),
    )
  );
}
add_action('customize_register', 'expressanalytics_customize_register');

/**
 * Sanitize checkbox values
 *
 * @param bool $checked Whether the checkbox is checked.
 * @return bool
 */
function expressanalytics_sanitize_checkbox($checked)
{
  return ((isset($checked) && true == $checked) ? true : false);
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function expressanalytics_customize_preview_js()
{
  wp_enqueue_script(
    'expressanalytics-customizer',
    get_template_directory_uri() . '/assets/js/customizer.js',
    array('customize-preview'),
    _S_VERSION,
    true
  );
}
add_action('customize_preview_init', 'expressanalytics_customize_preview_js');
