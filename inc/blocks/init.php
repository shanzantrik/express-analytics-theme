<?php

/**
 * Initialize blocks for Express Analytics theme
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Register block categories
 */
function express_analytics_block_categories($categories)
{
  return array_merge(
    [
      [
        'slug' => 'express-analytics',
        'title' => __('Express Analytics', 'express-analytics'),
        'icon' => 'chart-bar',
      ],
    ],
    $categories
  );
}
add_filter('block_categories_all', 'express_analytics_block_categories', 10, 1);

/**
 * Enqueue block assets
 */
function express_analytics_enqueue_block_assets()
{
  // Block editor script
  wp_enqueue_script(
    'express-analytics-blocks',
    get_template_directory_uri() . '/inc/blocks/adminlte-multi-tabs/block.js',
    [
      'wp-blocks',
      'wp-i18n',
      'wp-element',
      'wp-components',
      'wp-block-editor'
    ],
    filemtime(get_template_directory() . '/inc/blocks/adminlte-multi-tabs/block.js')
  );

  // Block styles for both frontend & backend
  wp_enqueue_style(
    'express-analytics-blocks',
    get_template_directory_uri() . '/inc/blocks/adminlte-multi-tabs/style.css',
    [],
    filemtime(get_template_directory() . '/inc/blocks/adminlte-multi-tabs/style.css')
  );

  // Font Awesome
  wp_enqueue_style(
    'font-awesome',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
    [],
    '5.15.4'
  );
}
add_action('enqueue_block_editor_assets', 'express_analytics_enqueue_block_assets');

/**
 * Register blocks
 */
function express_analytics_register_blocks()
{
  if (!function_exists('register_block_type')) {
    return;
  }

  register_block_type(
    'express-analytics/adminlte-multi-tabs',
    [
      'editor_script' => 'express-analytics-blocks',
      'editor_style' => 'express-analytics-blocks',
      'style' => 'express-analytics-blocks',
    ]
  );
}
add_action('init', 'express_analytics_register_blocks');

/**
 * Enqueue frontend assets
 */
function express_analytics_enqueue_frontend_assets()
{
  if (has_block('express-analytics/adminlte-multi-tabs')) {
    wp_enqueue_script(
      'express-analytics-frontend',
      get_template_directory_uri() . '/inc/blocks/adminlte-multi-tabs/frontend.js',
      ['jquery'],
      filemtime(get_template_directory() . '/inc/blocks/adminlte-multi-tabs/frontend.js'),
      true
    );
    wp_enqueue_style('font-awesome');
  }
}
add_action('wp_enqueue_scripts', 'express_analytics_enqueue_frontend_assets');
