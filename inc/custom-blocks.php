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

// Register block categories for both editor and front-end
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
		'express-analytics/hello-world',
		'express-analytics/hero-section-solution',
		'express-analytics/repeater-ea',
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
add_action('init', 'expressanalytics_register_blocks', 20);

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

	// Enqueue repeater-ea block styles
	$style_path = "/build/repeater-ea/style-index.css";
	$style_url = get_theme_file_uri($style_path);
	$style_file = get_theme_file_path($style_path);

	if (file_exists($style_file)) {
		wp_enqueue_style(
			"express-analytics-repeater-ea-style",
			$style_url,
			[],
			filemtime($style_file)
		);
	}
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

	// Enqueue repeater-ea editor styles
	$editor_style_path = "/build/repeater-ea/editor.css";
	$editor_style_url = get_theme_file_uri($editor_style_path);
	$editor_style_file = get_theme_file_path($editor_style_path);

	if (file_exists($editor_style_file)) {
		wp_enqueue_style(
			"express-analytics-repeater-ea-editor",
			$editor_style_url,
			[],
			filemtime($editor_style_file)
		);
	}

	// Editor script
	wp_enqueue_script(
		'express-analytics-blocks-editor',
		get_theme_file_uri('/assets/js/blocks-editor.js'),
		['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-block-editor'],
		_S_VERSION,
		true
	);

	// Enqueue block's script
	$script_path = "/build/hello-world/index.js";
	$script_url = get_theme_file_uri($script_path);
	$script_file = get_theme_file_path($script_path);

	if (file_exists($script_file)) {
		wp_enqueue_script(
			"express-analytics-hello-world-block",
			$script_url,
			['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-block-editor'],
			filemtime($script_file)
		);
	}

	// Enqueue block's script
	$script_path = "/build/hero-section-solution/index.js";
	$script_url = get_theme_file_uri($script_path);
	$script_file = get_theme_file_path($script_path);

	if (file_exists($script_file)) {
		wp_enqueue_script(
			"express-analytics-hero-section-solution-block",
			$script_url,
			['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-block-editor'],
			filemtime($script_file)
		);
	}

	// Enqueue repeater-ea block's script
	$script_path = "/build/repeater-ea/index.js";
	$script_url = get_theme_file_uri($script_path);
	$script_file = get_theme_file_path($script_path);

	if (file_exists($script_file)) {
		wp_enqueue_script(
			"express-analytics-repeater-ea-block",
			$script_url,
			['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-block-editor'],
			filemtime($script_file)
		);
	}
}
add_action('enqueue_block_editor_assets', 'expressanalytics_enqueue_block_editor_assets');
