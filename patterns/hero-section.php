<?php

/**
 * Title: Hero Section
 * Slug: expressanalytics/hero-section
 * Categories: featured, hero
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"className":"hero-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull hero-section" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80);">
  <!-- wp:group {"className":"hero-content","layout":{"type":"constrained","contentSize":"1200px"}} -->
  <div class="wp-block-group hero-content">
    <!-- wp:columns {"verticalAlignment":"top"} -->
    <div class="wp-block-columns are-vertically-aligned-top">
      <!-- wp:column {"verticalAlignment":"top","width":"60%"} -->
      <div class="wp-block-column is-vertically-aligned-top" style="flex-basis:60%">
        <!-- wp:heading {"level":1,"className":"hero-title animate-text"} -->
        <h1 class="wp-block-heading hero-title animate-text">Transform Data into Actionable Insights with AI-Powered Smarter Marketing</h1>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"className":"hero-description animate-text-delay"} -->
        <p class="hero-description animate-text-delay">We convert raw data into actionable insights, enabling enterprises and organizations to make smarter decisions and drive sustainable growth with AI-powered solutions in data management, marketing analytics, and business intelligence.</p>
        <!-- /wp:paragraph -->

        <!-- wp:buttons {"className":"hero-cta animate-text-delay-2"} -->
        <div class="wp-block-buttons hero-cta animate-text-delay-2">
          <!-- wp:button {"className":"primary-button"} -->
          <div class="wp-block-button primary-button"><a class="wp-block-button__link wp-element-button">Let's Connect</a></div>
          <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
      </div>
      <!-- /wp:column -->

      <!-- wp:column {"verticalAlignment":"center","width":"40%"} -->
      <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:40%">
        <!-- wp:group {"className":"hero-animation-container"} -->
        <div class="wp-block-group hero-animation-container">
          <!-- Left floating cards -->
          <div class="floating-cards floating-cards-left">
            <div class="floating-card card-1">
              <div class="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#6366F1" stroke-width="2" />
                  <path d="M8 12l3 3 5-5" stroke="#6366F1" stroke-width="2" stroke-linecap="round" />
                </svg>
              </div>
              <div class="card-text">Diving Enthusiast</div>
            </div>
            <div class="floating-card card-2">
              <div class="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#6366F1" />
                </svg>
              </div>
              <div class="card-text">Male, 25-35 Years</div>
            </div>
            <div class="floating-card card-3">
              <div class="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z" fill="#6366F1" />
                </svg>
              </div>
              <div class="card-text">Summer Traveler</div>
            </div>
          </div>

          <!-- Animated Arrow -->
          <div class="animated-arrow">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
              <path d="M0 20h100" stroke="#6366F1" stroke-width="2" stroke-dasharray="4 4" />
              <path d="M90 10l20 10-20 10" stroke="#6366F1" stroke-width="2" />
            </svg>
          </div>

          <!-- Center Image -->
          <div class="center-image">
            <img src="<?php echo esc_url(get_theme_file_uri('assets/images/diving-mask.png')); ?>" alt="Diving Mask" />
            <div class="image-dots">
              <span class="dot active"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>

          <!-- Right floating cards -->
          <div class="floating-cards floating-cards-right">
            <div class="floating-card product-card">
              <div class="product-image">
                <img src="<?php echo esc_url(get_theme_file_uri('assets/images/diving-mask-product.png')); ?>" alt="Diving Mask Product" />
              </div>
              <div class="product-info">
                <div class="rating">★★★★★</div>
                <div class="product-details">
                  <span class="tag">Scuba tank</span>
                  <span class="tag">Wetsuit</span>
                  <span class="tag">Diving mask</span>
                  <span class="tag">Fins</span>
                </div>
                <div class="product-id">#14231</div>
              </div>
            </div>
          </div>
        </div>
        <!-- /wp:group -->
      </div>
      <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
  </div>
  <!-- /wp:group -->
</div>
<!-- /wp:group -->
