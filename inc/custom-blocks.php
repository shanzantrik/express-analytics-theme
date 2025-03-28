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
		$categories,
		array(
			array(
				'slug'  => 'expressanalytics',
				'title' => __('Express Analytics Blocks', 'expressanalytics'),
			),
		)
	);
}
add_filter('block_categories_all', 'expressanalytics_block_categories', 10, 1);

/**
 * Register custom blocks.
 */
function expressanalytics_register_blocks()
{
	// Register header block
	register_block_type(get_template_directory() . '/inc/blocks/header');

	// Register footer block
	register_block_type(get_template_directory() . '/inc/blocks/footer');
}
add_action('init', 'expressanalytics_register_blocks');

/**
 * Registers JS and CSS for custom blocks.
 */
function expressanalytics_enqueue_block_assets()
{
	// Skip if not in admin.
	if (! is_admin()) {
		return;
	}

	// Enqueue block editor CSS.
	wp_enqueue_style(
		'expressanalytics-block-editor',
		get_theme_file_uri('/assets/css/blocks-editor.css'),
		array(),
		_S_VERSION
	);
}
add_action('enqueue_block_editor_assets', 'expressanalytics_enqueue_block_assets');
