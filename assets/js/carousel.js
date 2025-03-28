/**
 * Client logo carousel functionality
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the client logo slider
  if (document.querySelector('.client-logo-slider')) {
    const slider = tns({
      container: '.client-logo-slider',
      items: 2,
      slideBy: 1,
      autoplay: true,
      autoplayButtonOutput: false,
      autoplayTimeout: 3000,
      speed: 800,
      gutter: 20,
      controls: false,
      nav: false,
      loop: true,
      responsive: {
        640: {
          items: 3
        },
        768: {
          items: 4
        },
        1024: {
          items: 5
        }
      }
    });
  }
  
  // Initialize testimonials slider if needed
  if (document.querySelector('.testimonials-slider')) {
    const testimonialSlider = tns({
      container: '.testimonials-slider',
      items: 1,
      slideBy: 1,
      autoplay: true,
      autoplayButtonOutput: false,
      autoplayTimeout: 5000,
      speed: 800,
      controls: true,
      nav: true,
      loop: true,
      responsive: {
        768: {
          items: 2
        },
        1024: {
          items: 3
        }
      }
    });
  }
});
