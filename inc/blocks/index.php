<?php

/**
 * Custom Blocks Registration
 *
 * @package ExpressAnalytics
 */

/**
 * Register custom blocks.
 */
function expressanalytics_register_blocks()
{
  // Check if Gutenberg is active.
  if (! function_exists('register_block_type')) {
    return;
  }

  // Register blocks directory.
  register_block_type(get_template_directory() . '/inc/blocks/hero');
  register_block_type(get_template_directory() . '/inc/blocks/features');
  register_block_type(get_template_directory() . '/inc/blocks/testimonials');
  register_block_type(get_template_directory() . '/inc/blocks/case-studies');
  register_block_type(get_template_directory() . '/inc/blocks/services');
  register_block_type(get_template_directory() . '/inc/blocks/contact');
}
add_action('init', 'expressanalytics_register_blocks');

/**
 * Register block categories.
 *
 * @param array $categories Block categories.
 * @return array
 */
function expressanalytics_block_categories($categories)
{
  return array_merge(
    array(
      array(
        'slug'  => 'expressanalytics',
        'title' => __('Express Analytics', 'expressanalytics'),
      ),
    ),
    $categories
  );
}
add_filter('block_categories_all', 'expressanalytics_block_categories', 10, 1);

/**
 * Enqueue block assets.
 */
function expressanalytics_enqueue_block_assets()
{
  // Enqueue block styles.
  wp_enqueue_style(
    'expressanalytics-block-styles',
    get_template_directory_uri() . '/assets/css/blocks.css',
    array(),
    _S_VERSION
  );

  // Enqueue block scripts.
  wp_enqueue_script(
    'expressanalytics-block-scripts',
    get_template_directory_uri() . '/assets/js/blocks.js',
    array('wp-blocks', 'wp-element', 'wp-editor'),
    _S_VERSION,
    true
  );
}
add_action('enqueue_block_assets', 'expressanalytics_enqueue_block_assets');
