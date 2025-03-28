<?php

/**
 * Custom template tags for Express Analytics theme
 *
 * @package ExpressAnalytics
 */

if (! function_exists('expressanalytics_posted_on')) :
  /**
   * Prints HTML with meta information for the current post-date/time.
   */
  function expressanalytics_posted_on()
  {
    $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
    if (get_the_time('U') !== get_the_modified_time('U')) {
      $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
    }

    $time_string = sprintf(
      $time_string,
      esc_attr(get_the_date(DATE_W3C)),
      esc_html(get_the_date()),
      esc_attr(get_the_modified_date(DATE_W3C)),
      esc_html(get_the_modified_date())
    );

    echo '<span class="posted-on">' . $time_string . '</span>';
  }
endif;

if (! function_exists('expressanalytics_posted_by')) :
  /**
   * Prints HTML with meta information for the current author.
   */
  function expressanalytics_posted_by()
  {
    $byline = sprintf(
      /* translators: %s: post author. */
      esc_html_x('by %s', 'post author', 'expressanalytics'),
      '<span class="author vcard"><a class="url fn n" href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . esc_html(get_the_author()) . '</a></span>'
    );

    echo '<span class="byline"> ' . $byline . '</span>';
  }
endif;

if (! function_exists('expressanalytics_entry_footer')) :
  /**
   * Prints HTML with meta information for categories, tags and comments.
   */
  function expressanalytics_entry_footer()
  {
    // Hide category and tag text for pages.
    if ('post' === get_post_type()) {
      /* translators: used between list items, there is a space after the comma */
      $categories_list = get_the_category_list(esc_html__(', ', 'expressanalytics'));
      if ($categories_list) {
        printf('<span class="cat-links">%1$s</span>', $categories_list);
      }

      /* translators: used between list items, there is a space after the comma */
      $tags_list = get_the_tag_list('', esc_html_x(', ', 'list item separator', 'expressanalytics'));
      if ($tags_list) {
        printf('<span class="tags-links">%1$s</span>', $tags_list);
      }
    }

    if (! is_single() && ! post_password_required() && (comments_open() || get_comments_number())) {
      echo '<span class="comments-link">';
      comments_popup_link(
        sprintf(
          wp_kses(
            /* translators: %s: post title */
            __('Leave a Comment<span class="screen-reader-text"> on %s</span>', 'expressanalytics'),
            array(
              'span' => array(
                'class' => array(),
              ),
            )
          ),
          wp_kses_post(get_the_title())
        )
      );
      echo '</span>';
    }

    edit_post_link(
      sprintf(
        wp_kses(
          /* translators: %s: Name of current post. Only visible to screen readers */
          __('Edit <span class="screen-reader-text">%s</span>', 'expressanalytics'),
          array(
            'span' => array(
              'class' => array(),
            ),
          )
        ),
        wp_kses_post(get_the_title())
      ),
      '<span class="edit-link">',
      '</span>'
    );
  }
endif;

if (! function_exists('expressanalytics_post_thumbnail')) :
  /**
   * Displays an optional post thumbnail.
   */
  function expressanalytics_post_thumbnail()
  {
    if (post_password_required() || is_attachment() || ! has_post_thumbnail()) {
      return;
    }

    if (is_singular()) :
?>
      <div class="post-thumbnail">
        <?php the_post_thumbnail(); ?>
      </div>
    <?php else : ?>
      <a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
        <?php
        the_post_thumbnail(
          'blog-thumbnail',
          array(
            'alt' => the_title_attribute(
              array(
                'echo' => false,
              )
            ),
          )
        );
        ?>
      </a>
<?php
    endif;
  }
endif;

if (! function_exists('expressanalytics_get_related_posts')) :
  /**
   * Get related posts based on categories.
   *
   * @param int $post_id Current post ID.
   * @param int $related_count Number of related posts to return.
   * @return WP_Query
   */
  function expressanalytics_get_related_posts($post_id, $related_count = 3)
  {
    $args = array(
      'post_type'      => 'post',
      'posts_per_page' => $related_count,
      'post_status'    => 'publish',
      'post__not_in'   => array($post_id),
      'orderby'        => 'rand',
    );

    $categories = get_the_category($post_id);
    if ($categories) {
      $category_ids = array();
      foreach ($categories as $category) {
        $category_ids[] = $category->term_id;
      }
      $args['category__in'] = $category_ids;
    }

    return new WP_Query($args);
  }
endif;

if (! function_exists('expressanalytics_social_share')) :
  /**
   * Display social sharing buttons.
   */
  function expressanalytics_social_share()
  {
    $post_url = urlencode(get_permalink());
    $post_title = urlencode(get_the_title());

    $social_networks = array(
      'twitter' => array(
        'url'  => "https://twitter.com/intent/tweet?text={$post_title}&url={$post_url}",
        'icon' => 'fab fa-twitter',
      ),
      'facebook' => array(
        'url'  => "https://www.facebook.com/sharer/sharer.php?u={$post_url}",
        'icon' => 'fab fa-facebook-f',
      ),
      'linkedin' => array(
        'url'  => "https://www.linkedin.com/shareArticle?mini=true&url={$post_url}&title={$post_title}",
        'icon' => 'fab fa-linkedin-in',
      ),
    );

    echo '<div class="social-share">';
    echo '<span class="share-title">' . esc_html__('Share:', 'expressanalytics') . '</span>';
    foreach ($social_networks as $network => $data) {
      printf(
        '<a href="%1$s" class="share-link share-%2$s" target="_blank" rel="noopener noreferrer"><i class="%3$s"></i><span class="screen-reader-text">%4$s</span></a>',
        esc_url($data['url']),
        esc_attr($network),
        esc_attr($data['icon']),
        /* translators: %s: Social network name */
        sprintf(esc_html__('Share on %s', 'expressanalytics'), ucfirst($network))
      );
    }
    echo '</div>';
  }
endif;

if (! function_exists('expressanalytics_get_custom_logo_url')) :
  /**
   * Get custom logo URL.
   *
   * @return string Logo URL or empty string if no logo is set.
   */
  function expressanalytics_get_custom_logo_url()
  {
    $custom_logo_id = get_theme_mod('custom_logo');
    $logo_url = '';

    if ($custom_logo_id) {
      $logo_url = wp_get_attachment_image_url($custom_logo_id, 'full');
    }

    return $logo_url;
  }
endif;
