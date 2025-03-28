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
	register_block_pattern(
		'expressanalytics/hero-section',
		array(
			'title'       => __('Hero Section', 'expressanalytics'),
			'description' => _x('A hero section with heading, text, and CTA buttons.', 'Block pattern description', 'expressanalytics'),
			'categories'  => array('expressanalytics'),
			'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70","right":"var:preset|spacing|50","left":"var:preset|spacing|50"}}},"backgroundColor":"background","layout":{"type":"constrained"}} -->
			<div class="wp-block-group alignfull has-background-background-color has-background" style="padding-top:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--70);padding-left:var(--wp--preset--spacing--50)">
				<!-- wp:columns {"verticalAlignment":"top","align":"wide"} -->
				<div class="wp-block-columns alignwide are-vertically-aligned-top">
					<!-- wp:column {"verticalAlignment":"top","width":"60%"} -->
					<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:60%">
						<!-- wp:heading {"level":1,"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}}} -->
						<h1 style="font-style:normal;font-weight:700">Transform Your Data into Actionable Insights</h1>
						<!-- /wp:heading -->

						<!-- wp:paragraph {"fontSize":"large"} -->
						<p class="has-large-font-size">Unlock the power of your data with our advanced analytics solutions. Make informed decisions and drive business growth.</p>
						<!-- /wp:paragraph -->

						<!-- wp:buttons -->
						<div class="wp-block-buttons">
							<!-- wp:button {"backgroundColor":"primary","textColor":"background"} -->
							<div class="wp-block-button"><a class="wp-block-button__link has-background-color has-primary-background-color has-text-color has-background">Get Started</a></div>
							<!-- /wp:button -->

							<!-- wp:button {"textColor":"primary","className":"is-style-outline"} -->
							<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-primary-color has-text-color">Learn More</a></div>
							<!-- /wp:button -->
						</div>
						<!-- /wp:buttons -->
					</div>
					<!-- /wp:column -->

					<!-- wp:column {"verticalAlignment":"center","width":"40%"} -->
					<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:40%">
						<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
						<figure class="wp-block-image size-large"><img src="' . esc_url(get_template_directory_uri()) . '/assets/images/hero-image.png" alt="Analytics Dashboard"/></figure>
						<!-- /wp:image -->
					</div>
					<!-- /wp:column -->
				</div>
				<!-- /wp:columns -->
			</div>
			<!-- /wp:group -->'
		)
	);

	// Features Grid Pattern
	register_block_pattern(
		'expressanalytics/features-grid',
		array(
			'title'       => __('Features Grid', 'expressanalytics'),
			'description' => _x('A grid of features with icons and text.', 'Block pattern description', 'expressanalytics'),
			'categories'  => array('expressanalytics'),
			'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60","right":"var:preset|spacing|50","left":"var:preset|spacing|50"}}},"backgroundColor":"background","layout":{"type":"constrained"}} -->
			<div class="wp-block-group alignfull has-background-background-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--50)">
				<!-- wp:heading {"textAlign":"center"} -->
				<h2 class="has-text-align-center">Our Features</h2>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"align":"center","fontSize":"large"} -->
				<p class="has-text-align-center has-large-font-size">Discover what makes our analytics solutions stand out</p>
				<!-- /wp:paragraph -->

				<!-- wp:columns {"align":"wide"} -->
				<div class="wp-block-columns alignwide">
					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|40","right":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40"}},"border":{"radius":"8px"}},"backgroundColor":"background-alt"} -->
						<div class="wp-block-group has-background-alt-background-color has-background" style="border-radius:8px;padding-top:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--40)">
							<!-- wp:heading {"level":3} -->
							<h3>Real-time Analytics</h3>
							<!-- /wp:heading -->

							<!-- wp:paragraph -->
							<p>Monitor your data in real-time and make instant decisions based on live insights.</p>
							<!-- /wp:paragraph -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:column -->

					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|40","right":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40"}},"border":{"radius":"8px"}},"backgroundColor":"background-alt"} -->
						<div class="wp-block-group has-background-alt-background-color has-background" style="border-radius:8px;padding-top:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--40)">
							<!-- wp:heading {"level":3} -->
							<h3>Custom Dashboards</h3>
							<!-- /wp:heading -->

							<!-- wp:paragraph -->
							<p>Create personalized dashboards that focus on the metrics that matter most to your business.</p>
							<!-- /wp:paragraph -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:column -->

					<!-- wp:column -->
					<div class="wp-block-column">
						<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|40","right":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40"}},"border":{"radius":"8px"}},"backgroundColor":"background-alt"} -->
						<div class="wp-block-group has-background-alt-background-color has-background" style="border-radius:8px;padding-top:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--40)">
							<!-- wp:heading {"level":3} -->
							<h3>Advanced Reporting</h3>
							<!-- /wp:heading -->

							<!-- wp:paragraph -->
							<p>Generate comprehensive reports with actionable insights and predictive analytics.</p>
							<!-- /wp:paragraph -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:column -->
				</div>
				<!-- /wp:columns -->
			</div>
			<!-- /wp:group -->'
		)
	);

	// CTA Section Pattern
	register_block_pattern(
		'expressanalytics/cta-section',
		array(
			'title'       => __('CTA Section', 'expressanalytics'),
			'description' => _x('A call-to-action section with background color.', 'Block pattern description', 'expressanalytics'),
			'categories'  => array('expressanalytics'),
			'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60","right":"var:preset|spacing|50","left":"var:preset|spacing|50"}}},"backgroundColor":"primary","textColor":"background","layout":{"type":"constrained"}} -->
			<div class="wp-block-group alignfull has-background-color has-primary-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--50);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--50)">
				<!-- wp:heading {"textAlign":"center","textColor":"background"} -->
				<h2 class="has-text-align-center has-background-color has-text-color">Ready to Get Started?</h2>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"align":"center","fontSize":"large"} -->
				<p class="has-text-align-center has-large-font-size">Transform your business with data-driven insights today.</p>
				<!-- /wp:paragraph -->

				<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
				<div class="wp-block-buttons">
					<!-- wp:button {"backgroundColor":"background","textColor":"primary"} -->
					<div class="wp-block-button"><a class="wp-block-button__link has-primary-color has-background-background-color has-text-color has-background">Schedule a Demo</a></div>
					<!-- /wp:button -->
				</div>
				<!-- /wp:buttons -->
			</div>
			<!-- /wp:group -->'
		)
	);
}
add_action('init', 'expressanalytics_register_block_patterns');
