/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 */

(function ($) {
  'use strict';

  // Site title and description.
  wp.customize('blogname', function (value) {
    value.bind(function (to) {
      $('.site-title a').text(to);
    });
  });

  wp.customize('blogdescription', function (value) {
    value.bind(function (to) {
      $('.site-description').text(to);
    });
  });

  // Header text color.
  wp.customize('header_textcolor', function (value) {
    value.bind(function (to) {
      if ('blank' === to) {
        $('.site-title, .site-description').css({
          clip: 'rect(1px, 1px, 1px, 1px)',
          position: 'absolute',
        });
      } else {
        $('.site-title, .site-description').css({
          clip: 'auto',
          position: 'relative',
        });
        $('.site-title a, .site-description').css({
          color: to,
        });
      }
    });
  });

  // Contact Information
  wp.customize('contact_phone', function (value) {
    value.bind(function (to) {
      $('.contact-phone').text(to);
      $('.contact-phone-link').attr('href', 'tel:' + to.replace(/\s+/g, ''));
    });
  });

  wp.customize('contact_email', function (value) {
    value.bind(function (to) {
      $('.contact-email').text(to);
      $('.contact-email-link').attr('href', 'mailto:' + to);
    });
  });

  // Social Media URLs
  wp.customize('social_facebook', function (value) {
    value.bind(function (to) {
      $('.social-facebook').attr('href', to);
    });
  });

  wp.customize('social_twitter', function (value) {
    value.bind(function (to) {
      $('.social-twitter').attr('href', to);
    });
  });

  wp.customize('social_linkedin', function (value) {
    value.bind(function (to) {
      $('.social-linkedin').attr('href', to);
    });
  });

  wp.customize('social_instagram', function (value) {
    value.bind(function (to) {
      $('.social-instagram').attr('href', to);
    });
  });

  // Footer Copyright
  wp.customize('footer_copyright', function (value) {
    value.bind(function (to) {
      $('.footer-copyright').html(to);
    });
  });

  // Cookie Notice
  wp.customize('enable_cookie_notice', function (value) {
    value.bind(function (to) {
      if (to) {
        $('#cookie-notice').removeClass('hidden');
      } else {
        $('#cookie-notice').addClass('hidden');
      }
    });
  });

  wp.customize('cookie_notice_text', function (value) {
    value.bind(function (to) {
      $('#cookie-notice p').html(to);
    });
  });

})(jQuery);
