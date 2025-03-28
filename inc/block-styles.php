<?php

/**
 * Express Analytics Theme: Block Styles
 *
 * @package ExpressAnalytics
 */

/**
 * Register Block Styles
 */
function expressanalytics_register_block_styles()
{
	// Button styles.
	register_block_style(
		'core/button',
		array(
			'name'         => 'fill-primary',
			'label'        => __('Fill Primary', 'expressanalytics'),
			'inline_style' => '.wp-block-button.is-style-fill-primary .wp-block-button__link { background-color: var(--wp--preset--color--primary); color: var(--wp--preset--color--background); }',
		)
	);

	register_block_style(
		'core/button',
		array(
			'name'         => 'outline-primary',
			'label'        => __('Outline Primary', 'expressanalytics'),
			'inline_style' => '.wp-block-button.is-style-outline-primary .wp-block-button__link { border: 2px solid var(--wp--preset--color--primary); color: var(--wp--preset--color--primary); background-color: transparent; }',
		)
	);

	// Group styles.
	register_block_style(
		'core/group',
		array(
			'name'         => 'card',
			'label'        => __('Card', 'expressanalytics'),
			'inline_style' => '
				.is-style-card {
					border-radius: 10px;
					box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
					overflow: hidden;
				}
			',
		)
	);

	// Columns styles.
	register_block_style(
		'core/columns',
		array(
			'name'         => 'card-grid',
			'label'        => __('Card Grid', 'expressanalytics'),
			'inline_style' => '
				.is-style-card-grid .wp-block-column {
					border-radius: 10px;
					box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
					overflow: hidden;
					transition: transform 0.3s ease;
				}
				.is-style-card-grid .wp-block-column:hover {
					transform: translateY(-5px);
				}
			',
		)
	);

	// List styles.
	register_block_style(
		'core/list',
		array(
			'name'         => 'check-list',
			'label'        => __('Check List', 'expressanalytics'),
			'inline_style' => '
				.is-style-check-list {
					list-style: none;
					padding-left: 0;
				}
				.is-style-check-list li {
					position: relative;
					padding-left: 30px;
					margin-bottom: 10px;
				}
				.is-style-check-list li:before {
					content: "✓";
					color: var(--wp--preset--color--primary);
					position: absolute;
					left: 0;
					font-weight: bold;
				}
			',
		)
	);
}
add_action('init', 'expressanalytics_register_block_styles');
