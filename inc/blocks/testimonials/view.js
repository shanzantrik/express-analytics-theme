document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.wp-block-expressanalytics-testimonials__grid[data-layout="carousel"]');

  carousels.forEach(carousel => {
    const items = carousel.querySelectorAll('.wp-block-expressanalytics-testimonials__item');
    const columns = parseInt(carousel.style.getPropertyValue('--columns')) || 3;
    let currentIndex = 0;

    // Create navigation buttons
    const nav = document.createElement('div');
    nav.className = 'wp-block-expressanalytics-testimonials__nav';

    const prevButton = document.createElement('button');
    prevButton.className = 'wp-block-expressanalytics-testimonials__nav-button prev';
    prevButton.innerHTML = '←';
    prevButton.setAttribute('aria-label', 'Previous testimonials');

    const nextButton = document.createElement('button');
    nextButton.className = 'wp-block-expressanalytics-testimonials__nav-button next';
    nextButton.innerHTML = '→';
    nextButton.setAttribute('aria-label', 'Next testimonials');

    nav.appendChild(prevButton);
    nav.appendChild(nextButton);
    carousel.parentNode.appendChild(nav);

    // Update visibility
    const updateVisibility = () => {
      items.forEach((item, index) => {
        const isVisible = index >= currentIndex && index < currentIndex + columns;
        item.style.transform = `translateX(${-100 * currentIndex}%)`;
        item.setAttribute('aria-hidden', !isVisible);
      });

      // Update button states
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex >= items.length - columns;
    };

    // Event listeners for navigation
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateVisibility();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentIndex < items.length - columns) {
        currentIndex++;
        updateVisibility();
      }
    });

    // Touch events for swipe
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentIndex < items.length - columns) {
          // Swipe left
          currentIndex++;
          updateVisibility();
        } else if (diff < 0 && currentIndex > 0) {
          // Swipe right
          currentIndex--;
          updateVisibility();
        }
      }
    };

    // Auto-advance carousel
    let autoplayInterval;
    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        if (currentIndex < items.length - columns) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateVisibility();
      }, 5000); // Change slide every 5 seconds
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    // Start autoplay and handle hover pause
    startAutoplay();
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Handle window resize
    const handleResize = () => {
      const newColumns = window.innerWidth <= 781 ? 1 : columns;
      carousel.style.setProperty('--columns', newColumns);
      currentIndex = Math.min(currentIndex, items.length - newColumns);
      updateVisibility();
    };

    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();
    updateVisibility();

    // Keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        updateVisibility();
      } else if (e.key === 'ArrowRight' && currentIndex < items.length - columns) {
        currentIndex++;
        updateVisibility();
      }
    });
  });
});
