<?php

/**
 * Express Analytics Theme: Custom Blocks
 *
 * @package ExpressAnalytics
 */

/**
 * Register custom block categories.
 *
 * @param array $categories Block categories.
 * @return array
 */
function expressanalytics_block_categories($categories)
{
	return array_merge(
		[
			[
				'slug'  => 'express-analytics',
				'title' => __('Express Analytics', 'express-analytics'),
				'icon'  => 'chart-bar',
			],
		],
		$categories
	);
}
add_filter('block_categories_all', 'expressanalytics_block_categories', 10, 1);

/**
 * Register custom blocks.
 */
function expressanalytics_register_blocks()
{
	if (!function_exists('register_block_type')) {
		return;
	}

	// Define blocks with their namespaces
	$blocks = [
		'express-analytics/header',
		'express-analytics/footer',
		'express-analytics/adminlte-multi-tabs',
		'express-analytics/contact',
		'express-analytics/case-studies',
		'express-analytics/services',
		'express-analytics/testimonials',
		'express-analytics/features',
		'express-analytics/hero'
	];

	// Register each block
	foreach ($blocks as $block) {
		$block_name = explode('/', $block)[1];
		$block_path = get_template_directory() . '/inc/blocks/' . $block_name;

		if (file_exists($block_path . '/block.json')) {
			register_block_type($block_path);
		}
	}
}
add_action('init', 'expressanalytics_register_blocks');

/**
 * Registers JS and CSS for custom blocks.
 */
function expressanalytics_enqueue_block_assets()
{
	// Enqueue block editor CSS for both admin and front-end
	wp_enqueue_style(
		'express-analytics-blocks',
		get_theme_file_uri('/assets/css/blocks-editor.css'),
		[],
		_S_VERSION
	);
}
add_action('enqueue_block_assets', 'expressanalytics_enqueue_block_assets');

/**
 * Enqueue editor-specific assets
 */
function expressanalytics_enqueue_block_editor_assets()
{
	// Editor styles
	wp_enqueue_style(
		'express-analytics-block-editor',
		get_theme_file_uri('/assets/css/blocks-editor.css'),
		[],
		_S_VERSION
	);

	// Editor script
	wp_enqueue_script(
		'express-analytics-blocks-editor',
		get_theme_file_uri('/assets/js/blocks-editor.js'),
		['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
		_S_VERSION,
		true
	);
}
add_action('enqueue_block_editor_assets', 'expressanalytics_enqueue_block_editor_assets');
