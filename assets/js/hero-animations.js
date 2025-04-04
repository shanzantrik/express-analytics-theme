document.addEventListener('DOMContentLoaded', function () {
  // Parallax effect for floating shapes
  const shapes = document.querySelectorAll('.shape');
  if (!shapes.length) return; // Exit if no shapes found

  let mouseX = 0;
  let mouseY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  // Update mouse position
  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  });

  // Animate shapes based on mouse position
  function animateShapes() {
    shapes.forEach((shape, index) => {
      if (!shape) return; // Skip if shape is null
      const speed = 0.03 - (index * 0.005);
      const x = (mouseX * speed);
      const y = (mouseY * speed);

      shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.02}deg)`;
    });

    requestAnimationFrame(animateShapes);
  }

  // Initialize animation
  animateShapes();

  // Handle window resize
  window.addEventListener('resize', () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
  });

  // Add scroll-based parallax effect
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');

    if (!heroSection) return; // Exit if hero section not found

    if (scrolled <= window.innerHeight) {
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
      shapes.forEach((shape, index) => {
        if (!shape) return; // Skip if shape is null
        shape.style.transform = `translateY(${scrolled * (0.2 + index * 0.1)}px)`;
      });
    }
  });

  // Add intersection observer for animation triggers
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe animated elements
  const animatedElements = document.querySelectorAll('.animate-text, .animate-text-delay, .animate-text-delay-2');
  if (animatedElements.length) {
    animatedElements.forEach(el => {
      if (el) {
        observer.observe(el);
        el.style.animationPlayState = 'paused';
      }
    });
  }
});
