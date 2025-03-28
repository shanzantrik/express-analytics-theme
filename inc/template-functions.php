<?php

/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package ExpressAnalytics
 */

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function expressanalytics_pingback_header()
{
  if (is_singular() && pings_open()) {
    printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
  }
}
add_action('wp_head', 'expressanalytics_pingback_header');

/**
 * Add custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function expressanalytics_body_classes($classes)
{
  // Adds a class of hfeed to non-singular pages.
  if (! is_singular()) {
    $classes[] = 'hfeed';
  }

  // Adds a class of no-sidebar when there is no sidebar present.
  if (! is_active_sidebar('sidebar-1')) {
    $classes[] = 'no-sidebar';
  }

  // Add a class if the site header is sticky.
  if (get_theme_mod('sticky_header', true)) {
    $classes[] = 'has-sticky-header';
  }

  // Add page slug as class
  if (is_singular()) {
    global $post;
    $classes[] = 'page-' . $post->post_name;
  }

  return $classes;
}
add_filter('body_class', 'expressanalytics_body_classes');

/**
 * Add preconnect for Google Fonts.
 *
 * @param array  $urls           URLs to print for resource hints.
 * @param string $relation_type  The relation type the URLs are printed.
 * @return array $urls           URLs to print for resource hints.
 */
function expressanalytics_resource_hints($urls, $relation_type)
{
  if (wp_style_is('expressanalytics-fonts', 'queue') && 'preconnect' === $relation_type) {
    $urls[] = array(
      'href' => 'https://fonts.gstatic.com',
      'crossorigin',
    );
  }

  return $urls;
}
add_filter('wp_resource_hints', 'expressanalytics_resource_hints', 10, 2);

/**
 * Adds custom classes to the array of post classes.
 *
 * @param array $classes Classes for the post element.
 * @return array
 */
function expressanalytics_post_classes($classes)
{
  // Add 'has-post-thumbnail' class if the post has a thumbnail.
  if (has_post_thumbnail()) {
    $classes[] = 'has-post-thumbnail';
  }

  return $classes;
}
add_filter('post_class', 'expressanalytics_post_classes');

/**
 * Filter the excerpt length to 20 words.
 *
 * @param int $length Excerpt length.
 * @return int Modified excerpt length.
 */
function expressanalytics_excerpt_length($length)
{
  return 20;
}
add_filter('excerpt_length', 'expressanalytics_excerpt_length');

/**
 * Filter the excerpt "read more" string.
 *
 * @param string $more "Read more" excerpt string.
 * @return string Modified read more string.
 */
function expressanalytics_excerpt_more($more)
{
  return sprintf(
    '... <a class="read-more" href="%1$s">%2$s</a>',
    esc_url(get_permalink(get_the_ID())),
    sprintf(
      /* translators: %s: Post title. */
      __('Read More<span class="screen-reader-text"> "%s"</span>', 'expressanalytics'),
      get_the_title(get_the_ID())
    )
  );
}
add_filter('excerpt_more', 'expressanalytics_excerpt_more');

/**
 * Add Schema.org markup to the authors posts link.
 */
function expressanalytics_get_the_author_posts_link()
{
  global $authordata;
  if (! is_object($authordata)) {
    return;
  }

  $link = sprintf(
    '<a href="%1$s" title="%2$s" rel="author" itemprop="url"><span itemprop="name">%3$s</span></a>',
    esc_url(get_author_posts_url($authordata->ID, $authordata->user_nicename)),
    /* translators: %s: Author's display name. */
    esc_attr(sprintf(__('Posts by %s', 'expressanalytics'), get_the_author())),
    get_the_author()
  );

  return '<span itemscope itemtype="https://schema.org/Person">' . $link . '</span>';
}

/**
 * Add Schema.org markup to the post date.
 */
function expressanalytics_get_posted_on()
{
  $time_string = '<time class="entry-date published updated" datetime="%1$s" itemprop="datePublished">%2$s</time>';
  if (get_the_time('U') !== get_the_modified_time('U')) {
    $time_string = '<time class="entry-date published" datetime="%1$s" itemprop="datePublished">%2$s</time><time class="updated" datetime="%3$s" itemprop="dateModified">%4$s</time>';
  }

  $time_string = sprintf(
    $time_string,
    esc_attr(get_the_date(DATE_W3C)),
    esc_html(get_the_date()),
    esc_attr(get_the_modified_date(DATE_W3C)),
    esc_html(get_the_modified_date())
  );

  return '<span class="posted-on">' . $time_string . '</span>';
}

/**
 * Add custom image sizes attribute to enhance responsive images functionality.
 *
 * @param array $attr       Attributes for the image markup.
 * @param WP_Post $attachment Image attachment post.
 * @param string|array $size Requested size.
 */
function expressanalytics_custom_image_sizes_attr($attr, $attachment, $size)
{
  // Add custom image sizes here if needed
  return $attr;
}
add_filter('wp_get_attachment_image_attributes', 'expressanalytics_custom_image_sizes_attr', 10, 3);

/**
 * Register required plugins for the theme.
 */
function expressanalytics_register_required_plugins()
{
  $plugins = array(
    array(
      'name'      => 'Contact Form 7',
      'slug'      => 'contact-form-7',
      'required'  => false,
    ),
    array(
      'name'      => 'Yoast SEO',
      'slug'      => 'wordpress-seo',
      'required'  => false,
    ),
  );

  $config = array(
    'id'           => 'expressanalytics',
    'default_path' => '',
    'menu'         => 'tgmpa-install-plugins',
    'parent_slug'  => 'themes.php',
    'capability'   => 'edit_theme_options',
    'has_notices'  => true,
    'dismissable'  => true,
    'dismiss_msg'  => '',
    'is_automatic' => true,
    'message'      => '',
  );

  tgmpa($plugins, $config);
}
add_action('tgmpa_register', 'expressanalytics_register_required_plugins');

/**
 * Add custom post types.
 */
function expressanalytics_register_post_types()
{
  // Case Studies
  register_post_type(
    'case-study',
    array(
      'labels' => array(
        'name'               => __('Case Studies', 'expressanalytics'),
        'singular_name'      => __('Case Study', 'expressanalytics'),
        'add_new'           => __('Add New', 'expressanalytics'),
        'add_new_item'      => __('Add New Case Study', 'expressanalytics'),
        'edit_item'         => __('Edit Case Study', 'expressanalytics'),
        'new_item'          => __('New Case Study', 'expressanalytics'),
        'view_item'         => __('View Case Study', 'expressanalytics'),
        'search_items'      => __('Search Case Studies', 'expressanalytics'),
        'not_found'         => __('No case studies found', 'expressanalytics'),
        'not_found_in_trash' => __('No case studies found in trash', 'expressanalytics'),
      ),
      'public'      => true,
      'has_archive' => true,
      'menu_icon'   => 'dashicons-portfolio',
      'supports'    => array('title', 'editor', 'thumbnail', 'excerpt'),
      'rewrite'     => array('slug' => 'case-studies'),
      'show_in_rest' => true,
    )
  );

  // Services
  register_post_type(
    'service',
    array(
      'labels' => array(
        'name'               => __('Services', 'expressanalytics'),
        'singular_name'      => __('Service', 'expressanalytics'),
        'add_new'           => __('Add New', 'expressanalytics'),
        'add_new_item'      => __('Add New Service', 'expressanalytics'),
        'edit_item'         => __('Edit Service', 'expressanalytics'),
        'new_item'          => __('New Service', 'expressanalytics'),
        'view_item'         => __('View Service', 'expressanalytics'),
        'search_items'      => __('Search Services', 'expressanalytics'),
        'not_found'         => __('No services found', 'expressanalytics'),
        'not_found_in_trash' => __('No services found in trash', 'expressanalytics'),
      ),
      'public'      => true,
      'has_archive' => true,
      'menu_icon'   => 'dashicons-analytics',
      'supports'    => array('title', 'editor', 'thumbnail', 'excerpt'),
      'rewrite'     => array('slug' => 'services'),
      'show_in_rest' => true,
    )
  );

  // Solutions
  register_post_type(
    'solution',
    array(
      'labels' => array(
        'name'               => __('Solutions', 'expressanalytics'),
        'singular_name'      => __('Solution', 'expressanalytics'),
        'add_new'           => __('Add New', 'expressanalytics'),
        'add_new_item'      => __('Add New Solution', 'expressanalytics'),
        'edit_item'         => __('Edit Solution', 'expressanalytics'),
        'new_item'          => __('New Solution', 'expressanalytics'),
        'view_item'         => __('View Solution', 'expressanalytics'),
        'search_items'      => __('Search Solutions', 'expressanalytics'),
        'not_found'         => __('No solutions found', 'expressanalytics'),
        'not_found_in_trash' => __('No solutions found in trash', 'expressanalytics'),
      ),
      'public'      => true,
      'has_archive' => true,
      'menu_icon'   => 'dashicons-chart-area',
      'supports'    => array('title', 'editor', 'thumbnail', 'excerpt'),
      'rewrite'     => array('slug' => 'solutions'),
      'show_in_rest' => true,
    )
  );
}
add_action('init', 'expressanalytics_register_post_types');

/**
 * Add custom taxonomies.
 */
function expressanalytics_register_taxonomies()
{
  // Industry taxonomy for Case Studies
  register_taxonomy(
    'industry',
    array('case-study'),
    array(
      'labels' => array(
        'name'              => __('Industries', 'expressanalytics'),
        'singular_name'     => __('Industry', 'expressanalytics'),
        'search_items'      => __('Search Industries', 'expressanalytics'),
        'all_items'         => __('All Industries', 'expressanalytics'),
        'edit_item'         => __('Edit Industry', 'expressanalytics'),
        'update_item'       => __('Update Industry', 'expressanalytics'),
        'add_new_item'      => __('Add New Industry', 'expressanalytics'),
        'new_item_name'     => __('New Industry Name', 'expressanalytics'),
        'menu_name'         => __('Industries', 'expressanalytics'),
      ),
      'hierarchical'      => true,
      'show_ui'          => true,
      'show_admin_column' => true,
      'query_var'        => true,
      'rewrite'          => array('slug' => 'industry'),
      'show_in_rest'     => true,
    )
  );

  // Service Category taxonomy
  register_taxonomy(
    'service-category',
    array('service'),
    array(
      'labels' => array(
        'name'              => __('Service Categories', 'expressanalytics'),
        'singular_name'     => __('Service Category', 'expressanalytics'),
        'search_items'      => __('Search Service Categories', 'expressanalytics'),
        'all_items'         => __('All Service Categories', 'expressanalytics'),
        'edit_item'         => __('Edit Service Category', 'expressanalytics'),
        'update_item'       => __('Update Service Category', 'expressanalytics'),
        'add_new_item'      => __('Add New Service Category', 'expressanalytics'),
        'new_item_name'     => __('New Service Category Name', 'expressanalytics'),
        'menu_name'         => __('Categories', 'expressanalytics'),
      ),
      'hierarchical'      => true,
      'show_ui'          => true,
      'show_admin_column' => true,
      'query_var'        => true,
      'rewrite'          => array('slug' => 'service-category'),
      'show_in_rest'     => true,
    )
  );
  // Solutions Category taxonomy
  register_taxonomy(
    'solution-category',
    array('solution'),
    array(
      'labels' => array(
        'name'              => __('Solution Categories', 'expressanalytics'),
        'singular_name'     => __('Solution Category', 'expressanalytics'),
        'search_items'      => __('Search Solution Categories', 'expressanalytics'),
        'all_items'         => __('All Solution Categories', 'expressanalytics'),
        'edit_item'         => __('Edit Solution Category', 'expressanalytics'),
        'update_item'       => __('Update Solution Category', 'expressanalytics'),
        'add_new_item'      => __('Add New Solution Category', 'expressanalytics'),
        'new_item_name'     => __('New Solution Category Name', 'expressanalytics'),
        'menu_name'         => __('Categories', 'expressanalytics'),
      ),
      'hierarchical'      => true,
      'show_ui'          => true,
      'show_admin_column' => true,
      'query_var'        => true,
      'rewrite'          => array('slug' => 'solution-category'),
      'show_in_rest'     => true,
    )
  );
}
add_action('init', 'expressanalytics_register_taxonomies');



/**
 * Add schema markup to the site.
 */
function expressanalytics_schema_org()
{
  // Get the schema type based on the current page
  $schema = array(
    '@context'  => 'http://schema.org',
    '@type'     => 'Organization',
    'name'      => get_bloginfo('name'),
    'url'       => home_url(),
    'logo'      => expressanalytics_get_custom_logo_url(),
    'contactPoint' => array(
      '@type'     => 'ContactPoint',
      'telephone' => get_theme_mod('contact_phone', '+1 (234) 567-89'),
      'email'     => get_theme_mod('contact_email', 'info@expressanalytics.com'),
      'contactType' => 'customer service'
    ),
    'sameAs'    => array(
      get_theme_mod('social_facebook', '#'),
      get_theme_mod('social_twitter', '#'),
      get_theme_mod('social_linkedin', '#'),
      get_theme_mod('social_instagram', '#')
    )
  );

  if (is_singular('post')) {
    $schema = array(
      '@context'  => 'http://schema.org',
      '@type'     => 'Article',
      'headline'  => get_the_title(),
      'author'    => array(
        '@type' => 'Person',
        'name'  => get_the_author()
      ),
      'datePublished' => get_the_date('c'),
      'dateModified'  => get_the_modified_date('c'),
      'image'     => get_the_post_thumbnail_url(null, 'full'),
      'publisher' => array(
        '@type' => 'Organization',
        'name'  => get_bloginfo('name'),
        'logo'  => array(
          '@type' => 'ImageObject',
          'url'   => expressanalytics_get_custom_logo_url()
        )
      )
    );
  }

  echo '<script type="application/ld+json">' . wp_json_encode($schema) . '</script>';
}
add_action('wp_head', 'expressanalytics_schema_org');
