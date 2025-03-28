<?php

/**
 * Express Analytics Theme: Block Patterns
 *
 * @package ExpressAnalytics
 */

/**
 * Register Block Pattern Category.
 */
function expressanalytics_register_block_pattern_category()
{
	register_block_pattern_category(
		'expressanalytics',
		array('label' => __('Express Analytics', 'expressanalytics'))
	);
}
add_action('init', 'expressanalytics_register_block_pattern_category');

/**
 * Register Block Patterns.
 */
function expressanalytics_register_block_patterns()
{
	// Hero Section Pattern
	// register_block_pattern(
	// 	'expressanalytics/hero-section',
	// 	array(
	// 		'title'       => __('Hero Section', 'expressanalytics'),
	// 		'description' => _x('A hero section with heading, text, and CTA buttons.', 'Block pattern description', 'expressanalytics'),
	// 		'categories'  => array('expressanalytics'),
	// 		'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70","right":"var:preset|spacing|50","left":"var:preset|spacing|50"}}},"backgroundColor":"background","layout":{"type":"constrained"}} -->
	// 		<div class="wp-block-group alignfull has-background-background-color has-background" style="padding-top:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--70);padding-left:var(--wp--preset--spacing--50)">
	// 			<!-- wp:columns {"verticalAlignment":"top","align":"wide"} -->
	// 			<div class="wp-block-columns alignwide are-vertically-aligned-top">
	// 				<!-- wp:column {"verticalAlignment":"top","width":"60%"} -->
	// 				<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:60%">
	// 					<!-- wp:heading {"level":1,"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}}} -->
	// 					<h1 style="font-style:normal;font-weight:700">Transform Your Data into Actionable Insights</h1>
	// 					<!-- /wp:heading -->

	// 					<!-- wp:paragraph {"fontSize":"large"} -->
	// 					<p class="has-large-font-size">Unlock the power of your data with our advanced analytics solutions. Make informed decisions and drive business growth.</p>
	// 					<!-- /wp:paragraph -->

	// 					<!-- wp:buttons -->
	// 					<div class="wp-block-buttons">
	// 						<!-- wp:button {"backgroundColor":"primary","textColor":"background"} -->
	// 						<div class="wp-block-button"><a class="wp-block-button__link has-background-color has-primary-background-color has-text-color has-background">Get Started</a></div>
	// 						<!-- /wp:button -->

	// 						<!-- wp:button {"textColor":"primary","className":"is-style-outline"} -->
	// 						<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-primary-color has-text-color">Learn More</a></div>
	// 						<!-- /wp:button -->
	// 					</div>
	// 					<!-- /wp:buttons -->
	// 				</div>
	// 				<!-- /wp:column -->

	// 				<!-- wp:column {"verticalAlignment":"center","width":"40%"} -->
	// 				<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:40%">
	// 					<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
	// 					<figure class="wp-block-image size-large"><img src="' . esc_url(get_template_directory_uri()) . '/assets/images/hero-image.png" alt="Analytics Dashboard"/></figure>
	// 					<!-- /wp:image -->
	// 				</div>
	// 				<!-- /wp:column -->
	// 			</div>
	// 			<!-- /wp:columns -->
	// 		</div>
	// 		<!-- /wp:group -->'
	// 	)
	// );
}
add_action('init', 'expressanalytics_register_block_patterns');
