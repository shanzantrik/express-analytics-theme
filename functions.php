<?php

/**
 * Express Analytics Theme functions and definitions
 *
 * @package ExpressAnalytics
 */

if (! defined('_S_VERSION')) {
	define('_S_VERSION', '1.0.0');
}

/**
 * Include the TGM_Plugin_Activation class.
 */
require_once get_template_directory() . '/inc/class-tgm-plugin-activation.php';

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function expressanalytics_setup()
{
	// Add default posts and comments RSS feed links to head.
	add_theme_support('automatic-feed-links');

	// Let WordPress manage the document title.
	add_theme_support('title-tag');

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support('post-thumbnails');

	// Add support for responsive embeds.
	add_theme_support('responsive-embeds');

	// Add support for editor styles.
	add_theme_support('editor-styles');

	// Add support for custom units.
	add_theme_support('custom-units');

	// Add support for custom line height controls.
	add_theme_support('custom-line-height');

	// Add support for custom spacing control.
	add_theme_support('custom-spacing');

	// Add support for Block Styles.
	add_theme_support('wp-block-styles');

	// Add support for full and wide align images.
	add_theme_support('align-wide');

	// Remove core block patterns.
	remove_theme_support('core-block-patterns');

	// Register nav menus.
	register_nav_menus(
		array(
			'primary'      => esc_html__('Primary Menu', 'expressanalytics'),
			'footer-1'     => esc_html__('Footer Menu 1', 'expressanalytics'),
			'footer-2'     => esc_html__('Footer Menu 2', 'expressanalytics'),
			'footer-3'     => esc_html__('Footer Menu 3', 'expressanalytics'),
			'footer-legal' => esc_html__('Footer Legal Menu', 'expressanalytics'),
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support('customize-selective-refresh-widgets');

	// Add support for custom logo.
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 100,
			'width'       => 400,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action('after_setup_theme', 'expressanalytics_setup');

/**
 * Set the content width in pixels.
 */
function expressanalytics_content_width()
{
	$GLOBALS['content_width'] = apply_filters('expressanalytics_content_width', 1200);
}
add_action('after_setup_theme', 'expressanalytics_content_width', 0);

/**
 * Enqueue scripts and styles.
 */
function expressanalytics_scripts()
{
	// Enqueue theme stylesheet.
	wp_enqueue_style('expressanalytics-style', get_stylesheet_uri(), array(), _S_VERSION);

	// Enqueue custom styles.
	wp_enqueue_style('expressanalytics-custom', get_theme_file_uri('/assets/css/custom.css'), array(), _S_VERSION);

	// Enqueue Montserrat and Open Sans fonts from Google.
	wp_enqueue_style('expressanalytics-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), null);

	// Enqueue Font Awesome icons.
	wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', array(), '6.0.0');

	// Enqueue carousel script.
	wp_enqueue_script('tiny-slider', 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.3/min/tiny-slider.js', array(), '2.9.3', true);

	// Enqueue custom scripts.
	wp_enqueue_script('expressanalytics-carousel', get_theme_file_uri('/assets/js/carousel.js'), array('tiny-slider'), _S_VERSION, true);
	wp_enqueue_script('expressanalytics-custom', get_theme_file_uri('/assets/js/custom.js'), array('jquery'), _S_VERSION, true);

	// Localize script for AJAX functionality
	wp_localize_script('expressanalytics-custom', 'expressAnalytics', array(
		'ajaxurl' => admin_url('admin-ajax.php'),
		'nonce'   => wp_create_nonce('expressanalytics-nonce'),
	));

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}

	// Cookie notice script
	wp_enqueue_script('expressanalytics-cookie-notice', get_template_directory_uri() . '/assets/js/cookie-notice.js', array('jquery'), _S_VERSION, true);
	wp_localize_script('expressanalytics-cookie-notice', 'expressAnalytics', array(
		'ajaxurl' => admin_url('admin-ajax.php'),
		'nonce'   => wp_create_nonce('expressanalytics-cookie-nonce'),
	));
}
add_action('wp_enqueue_scripts', 'expressanalytics_scripts');

/**
 * Register widget areas.
 */
function expressanalytics_widgets_init()
{
	register_sidebar(
		array(
			'name'          => esc_html__('Blog Sidebar', 'expressanalytics'),
			'id'            => 'sidebar-1',
			'description'   => esc_html__('Add widgets here.', 'expressanalytics'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => esc_html__('Footer Widget Area 1', 'expressanalytics'),
			'id'            => 'footer-1',
			'description'   => esc_html__('Add footer widgets here.', 'expressanalytics'),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);

	register_sidebar(
		array(
			'name'          => esc_html__('Footer Widget Area 2', 'expressanalytics'),
			'id'            => 'footer-2',
			'description'   => esc_html__('Add footer widgets here.', 'expressanalytics'),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);

	register_sidebar(
		array(
			'name'          => esc_html__('Footer Widget Area 3', 'expressanalytics'),
			'id'            => 'footer-3',
			'description'   => esc_html__('Add footer widgets here.', 'expressanalytics'),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);
}
add_action('widgets_init', 'expressanalytics_widgets_init');

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Include block patterns registration.
 */
require get_template_directory() . '/inc/block-patterns.php';

/**
 * Include block styles registration.
 */
require get_template_directory() . '/inc/block-styles.php';

/**
 * Include custom blocks registration.
 */
require get_template_directory() . '/inc/custom-blocks.php';

/**
 * Include customizer options.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Cookie notice functionality
 */
function expressanalytics_cookie_notice_ajax()
{
	check_ajax_referer('expressanalytics-nonce', 'nonce');

	$choice = isset($_POST['choice']) ? sanitize_text_field($_POST['choice']) : '';

	if ($choice === 'accept' || $choice === 'decline') {
		setcookie('expressanalytics_cookie_notice', $choice, time() + (365 * 24 * 60 * 60), '/');
		wp_send_json_success();
	}

	wp_send_json_error();
}
add_action('wp_ajax_expressanalytics_cookie_notice', 'expressanalytics_cookie_notice_ajax');
add_action('wp_ajax_nopriv_expressanalytics_cookie_notice', 'expressanalytics_cookie_notice_ajax');

/**
 * Add custom image sizes
 */
function expressanalytics_add_image_sizes()
{
	add_image_size('hero-image', 1920, 800, true);
	add_image_size('featured-image', 800, 450, true);
	add_image_size('blog-thumbnail', 400, 260, true);
	add_image_size('case-study-thumbnail', 600, 400, true);
	add_image_size('client-logo', 180, 90, false);
}
add_action('after_setup_theme', 'expressanalytics_add_image_sizes');

/**
 * Enqueue hero section assets
 */
function expressanalytics_hero_section_scripts()
{
	// Check if files exist in the build directory first
	$build_css_file = get_theme_file_path('/build/hero-section.css');
	$build_js_file = get_theme_file_path('/build/hero-section.js');

	// If files exist in build directory, use those
	if (file_exists($build_css_file)) {
		wp_enqueue_style(
			'express-analytics-hero',
			get_theme_file_uri('/build/hero-section.css'),
			[],
			filemtime($build_css_file)
		);
	} else {
		// Fallback to assets directory
		$assets_css_file = get_theme_file_path('/assets/css/hero-section.css');
		if (file_exists($assets_css_file)) {
			wp_enqueue_style(
				'express-analytics-hero',
				get_theme_file_uri('/assets/css/hero-section.css'),
				[],
				filemtime($assets_css_file)
			);
		}
	}

	if (file_exists($build_js_file)) {
		wp_enqueue_script(
			'express-analytics-hero-animations',
			get_theme_file_uri('/build/hero-section.js'),
			['jquery'],
			filemtime($build_js_file),
			true
		);
	} else {
		// Fallback to assets directory
		$assets_js_file = get_theme_file_path('/assets/js/hero-animations.js');
		if (file_exists($assets_js_file)) {
			wp_enqueue_script(
				'express-analytics-hero-animations',
				get_theme_file_uri('/assets/js/hero-animations.js'),
				['jquery'],
				filemtime($assets_js_file),
				true
			);
		}
	}
}
add_action('wp_enqueue_scripts', 'expressanalytics_hero_section_scripts');

/**
 * Enqueue Montserrat font from Google Fonts
 */
function express_analytics_enqueue_fonts()
{
	wp_enqueue_style(
		'express-analytics-fonts',
		'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
		array(),
		null
	);
}
add_action('wp_enqueue_scripts', 'express_analytics_enqueue_fonts');

function add_svg_support($mimes)
{
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'add_svg_support');

// Optional: Sanitize SVG uploads to improve security
function svg_sanitization($data, $file, $filename, $mimes)
{
	// Skip sanitization if not an SVG
	if (strpos($filename, '.svg') === false) {
		return $data;
	}

	// Ensure valid SVG mime type
	$data['type'] = 'image/svg+xml';
	$data['ext'] = 'svg';

	return $data;
}
add_filter('wp_check_filetype_and_ext', 'svg_sanitization', 10, 4);

function sanitize_svg_uploads($file)
{
	if ($file['type'] === 'image/svg+xml') {
		// Load the SVG content
		$file_content = file_get_contents($file['tmp_name']);

		// Use DOMDocument to sanitize
		$doc = new DOMDocument();
		$doc->loadXML($file_content);

		// Remove potentially harmful elements/attributes
		// (This is a basic implementation - consider using a dedicated library)
		$dangerous_elements = ['script', 'use', 'foreignObject'];
		foreach ($dangerous_elements as $element) {
			$elements = $doc->getElementsByTagName($element);
			for ($i = $elements->length - 1; $i >= 0; $i--) {
				$node = $elements->item($i);
				$node->parentNode->removeChild($node);
			}
		}

		// Save sanitized content
		file_put_contents($file['tmp_name'], $doc->saveXML());
	}

	return $file;
}
add_filter('wp_handle_upload_prefilter', 'sanitize_svg_uploads');

function display_svg_in_media_library()
{
	echo '
    <style>
        .attachment-266x266, .thumbnail img {
            width: auto;
            height: auto;
            max-width: 100%;
        }
    </style>';
}
add_action('admin_head', 'display_svg_in_media_library');

/**
 * Enqueue theme fonts
 */
function ea_theme_fonts()
{
	wp_enqueue_style(
		'ea-theme-fonts',
		get_template_directory_uri() . '/assets/css/fonts.css',
		array(),
		wp_get_theme()->get('Version')
	);
}
add_action('wp_enqueue_scripts', 'ea_theme_fonts');
add_action('enqueue_block_editor_assets', 'ea_theme_fonts');
