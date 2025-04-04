/**
 * Express Analytics custom JavaScript functions
 */
document.addEventListener('DOMContentLoaded', function () {
  // Cookie notice functionality
  handleCookieNotice();

  // Service tabs functionality
  initServiceTabs();

  // Solution tabs functionality
  initSolutionTabs();

  // Smooth scroll for anchor links
  initSmoothScroll();

  // Mobile menu toggle
  initMobileMenu();

  // Initialize animation last
  setTimeout(() => {
    EAAnimation.init();
  }, 100);
});

/**
 * Handle cookie notice display and actions
 */
function handleCookieNotice() {
  const cookieNotice = document.getElementById('cookie-notice');
  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  if (!cookieNotice) return;

  // Check if the user has already made a choice
  if (!localStorage.getItem('cookie-notice-dismissed')) {
    cookieNotice.style.display = 'flex';
  }

  // Cookie accept button
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem('cookie-notice-dismissed', 'accepted');
      cookieNotice.style.display = 'none';
    });
  }

  // Cookie decline button
  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      localStorage.setItem('cookie-notice-dismissed', 'declined');
      cookieNotice.style.display = 'none';
    });
  }
}

/**
 * Initialize service tabs functionality
 */
function initServiceTabs() {
  const serviceTabs = document.querySelectorAll('.service-tabs');

  if (serviceTabs.length === 0) return;

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active class from all tabs
      serviceTabs.forEach(t => t.classList.remove('active-tab'));

      // Add active class to clicked tab
      this.classList.add('active-tab');

      // Here you would normally load the content for the selected service
      // For a static theme, you could toggle pre-rendered content

      // Example of how to handle tab content in a real implementation
      const tabId = this.textContent.trim().toLowerCase().replace(/\s+/g, '-');
      loadServiceContent(tabId);
    });
  });
}

/**
 * Load service content based on selected tab
 * In a real implementation, this would fetch content via AJAX
 * or toggle pre-rendered content
 */
function loadServiceContent(serviceId) {
  console.log('Loading content for service: ' + serviceId);
  // For demonstration purposes
  // In a real implementation, you would show/hide content here
}

/**
 * Initialize solution tabs functionality
 */
function initSolutionTabs() {
  const solutionTabs = document.querySelectorAll('.solution-tabs');

  if (solutionTabs.length === 0) return;

  solutionTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active class from all tabs
      solutionTabs.forEach(t => t.classList.remove('active-tab'));

      // Add active class to clicked tab
      this.classList.add('active-tab');

      // Load the content for the selected solution
      const tabId = this.textContent.trim().toLowerCase().replace(/\s+/g, '-');
      loadSolutionContent(tabId);
    });
  });
}

/**
 * Load solution content based on selected tab
 */
function loadSolutionContent(solutionId) {
  console.log('Loading content for solution: ' + solutionId);
  // In a real implementation, this would show/hide or fetch content
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');

  if (!menuToggle) return;

  menuToggle.addEventListener('click', function () {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('mobile-menu-open');
      this.setAttribute('aria-expanded',
        this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    }
  });
}

document.addEventListener('scroll', () => {
  const header = document.querySelector('.mainheader');
  if (header) {
    if (window.scrollY > 50) { /* Trigger after 50px of scrolling */
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const tabTitles = document.querySelectorAll(".tab-title");
  const tabContents = document.querySelectorAll(".tab-content");

  function activateTab(index) {
    tabTitles.forEach((tab, i) => {
      tab.classList.toggle("active", i === index);
    });
    tabContents.forEach((content, i) => {
      content.classList.toggle("active", i === index);
    });
  }

  tabTitles.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(index);
    });
  });

  // Initialize first tab
  activateTab(0);
});

// Wrap the animation code in a namespace to avoid conflicts
// const EAAnimation = {
//   init() {
//     const canvas = document.getElementById('animationCanvas');
//     if (!canvas) return; // Exit if canvas doesn't exist

//     const ctx = canvas.getContext('2d');

//     // Move all your constants here
//     const baseParticlesNum = 150;
//     const denseParticlesNum = 50;
//     const techTextsNum = 30;
//     const baseSpeed = 0.4;
//     const maxParticles = 500;
//     const spawnRate = 8; // Increased from 3 for denser bursts
//     const spawnInterval = 20; // Reduced from 60 for more frequent bursts (~0.33s at 60 FPS)

//     // Create animation state object
//     const state = {
//       baseParticles: [],
//       denseParticles: [],
//       chartShapes: [],
//       techTexts: [],
//       frameCount: 0
//     };

//     // Convert your existing functions to methods
//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       initializeParticles();
//       initializeChartShapes();
//       initializeTechTexts();
//     };

//     function initializeParticles() {
//       state.baseParticles = Array.from({ length: baseParticlesNum }, () => createParticle(false));
//       state.denseParticles = Array.from({ length: denseParticlesNum }, () => createParticle(true));
//     }

//     function createParticle(isDense = false, x = Math.random() * canvas.width, y = Math.random() * canvas.height) {
//       const shapeTypes = ['circle', 'triangle', 'pentagon', 'hexagon', 'star'];
//       return {
//         x,
//         y,
//         radius: Math.random() * 5 + 2,
//         speedX: (Math.random() - 0.5) * baseSpeed * (isDense ? 2.5 : 1), // Increased speed for dense particles
//         speedY: (Math.random() - 0.5) * baseSpeed * (isDense ? 2.5 : 1),
//         color: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
//         connectionStrength: Math.random() * 0.4 + 0.4,
//         connectionDistance: Math.random() * 100 + 50,
//         shapeType: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
//         scale: 1,
//         rotation: Math.random() * Math.PI * 2,
//         isDense,
//         life: isDense ? 90 : null // Reduced from 120 for faster turnover (~1.5s)
//       };
//     }

//     function initializeChartShapes() {
//       state.chartShapes = [
//         createLineChart(canvas.width * 0.2, canvas.height * 0.8),
//         createCandlestickChart(canvas.width * 0.8, canvas.height * 0.2),
//         createLineChart(canvas.width * 0.4, canvas.height * 0.3),
//         createCandlestickChart(canvas.width * 0.6, canvas.height * 0.6),
//         createLineChart(canvas.width * 0.3, canvas.height * 0.5),
//         createCandlestickChart(canvas.width * 0.7, canvas.height * 0.4),
//         createBubbleChart(canvas.width * 0.5, canvas.height * 0.7),
//         createBubbleChart(canvas.width * 0.25, canvas.height * 0.25),
//         createSankeyChart(canvas.width * 0.75, canvas.height * 0.75)
//       ];
//     }

//     function initializeTechTexts() {
//       state.techTexts = Array.from({ length: techTextsNum }, () => createTechText());
//     }

//     function createTechText() {
//       const texts = [
//         "data = pd.read_csv('analytics.csv')",
//         "Machine Learning Insights",
//         "def analyze_data(x): return stats",
//         "Big Data Trends",
//         "SELECT * FROM analytics WHERE value > 0",
//         "Predictive Modeling",
//         "import numpy as np # Data Analytics",
//         "Real-Time Dashboards",
//         "stats = model.fit(X, y)",
//         "Data Visualization Tools",
//         "df.groupby('category').sum()",
//         "Deep Learning Algorithms",
//         "spark.sql('SELECT * FROM data')",
//         "Business Intelligence Growth"
//       ];
//       const direction = Math.floor(Math.random() * 4);
//       let x, y, speedX, speedY;
//       switch (direction) {
//         case 0: // Top to bottom
//           x = Math.random() * canvas.width;
//           y = -20;
//           speedX = 0;
//           speedY = 0.8;
//           break;
//         case 1: // Right to left
//           x = canvas.width;
//           y = Math.random() * canvas.height;
//           speedX = -0.8;
//           speedY = 0;
//           break;
//         case 2: // Bottom to top
//           x = Math.random() * canvas.width;
//           y = canvas.height + 20;
//           speedX = 0;
//           speedY = -0.8;
//           break;
//         case 3: // Left to right
//           x = -100;
//           y = Math.random() * canvas.height;
//           speedX = 0.8;
//           speedY = 0;
//           break;
//       }
//       return {
//         x,
//         y,
//         speedX,
//         speedY,
//         text: texts[Math.floor(Math.random() * texts.length)],
//         opacity: 0,
//         baseOpacity: 0.3,
//         animationPhase: Math.random() * Math.PI * 2,
//         isCode: texts.indexOf(texts[Math.floor(Math.random() * texts.length)]) % 2 === 0,
//         typeProgress: 0
//       };
//     }

//     function createLineChart(x, y) {
//       const dummyData = [20, 35, 15, 45, 30, 25];
//       return {
//         x,
//         y,
//         points: dummyData,
//         type: 'line',
//         width: 100,
//         height: 60,
//         baseOpacity: 0.3,
//         opacity: 0,
//         scale: 0,
//         animationPhase: Math.random() * Math.PI * 2
//       };
//     }

//     function createCandlestickChart(x, y) {
//       const dummyData = [
//         { open: 50, close: 60, high: 65, low: 45 },
//         { open: 60, close: 55, high: 62, low: 50 },
//         { open: 55, close: 58, high: 60, low: 52 },
//         { open: 58, close: 54, high: 59, low: 51 }
//       ];
//       return {
//         x,
//         y,
//         candles: dummyData,
//         type: 'candlestick',
//         width: 100,
//         height: 60,
//         baseOpacity: 0.3,
//         opacity: 0,
//         scale: 0,
//         animationPhase: Math.random() * Math.PI * 2
//       };
//     }

//     function createBubbleChart(x, y) {
//       const dummyData = [
//         { x: 20, y: 30, r: 10, label: 'A' },
//         { x: 40, y: 50, r: 15, label: 'B' },
//         { x: 60, y: 20, r: 12, label: 'C' },
//         { x: 80, y: 40, r: 8, label: 'D' }
//       ];
//       return {
//         x,
//         y,
//         bubbles: dummyData,
//         type: 'bubble',
//         width: 100,
//         height: 60,
//         baseOpacity: 0.3,
//         opacity: 0,
//         scale: 0,
//         animationPhase: Math.random() * Math.PI * 2
//       };
//     }

//     function createSankeyChart(x, y) {
//       const dummyData = {
//         nodes: [
//           { x: 0, y: 0 },
//           { x: 100, y: -20 },
//           { x: 100, y: 20 },
//           { x: 200, y: 0 }
//         ],
//         links: [
//           { source: 0, target: 1, value: 30 },
//           { source: 0, target: 2, value: 20 },
//           { source: 1, target: 3, value: 25 },
//           { source: 2, target: 3, value: 15 }
//         ]
//       };
//       return {
//         x,
//         y,
//         nodes: dummyData.nodes,
//         links: dummyData.links,
//         type: 'sankey',
//         baseOpacity: 0.3,
//         opacity: 0,
//         scale: 0,
//         animationPhase: Math.random() * Math.PI * 2
//       };
//     }

//     function drawShape(particle) {
//       ctx.save();
//       ctx.translate(particle.x, particle.y);
//       ctx.rotate(particle.rotation);
//       ctx.scale(particle.scale, particle.scale);
//       ctx.beginPath();

//       switch (particle.shapeType) {
//         case 'circle': ctx.arc(0, 0, particle.radius, 0, Math.PI * 2); break;
//         case 'triangle': drawPolygon(3, particle.radius); break;
//         case 'pentagon': drawPolygon(5, particle.radius); break;
//         case 'hexagon': drawPolygon(6, particle.radius); break;
//         case 'star': drawStar(particle.radius); break;
//       }

//       ctx.fillStyle = particle.color;
//       ctx.fill();
//       ctx.restore();
//     }

//     function drawPolygon(sides, radius) {
//       for (let i = 0; i < sides; i++) {
//         const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
//         const x = radius * Math.cos(angle);
//         const y = radius * Math.sin(angle);
//         i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
//       }
//       ctx.closePath();
//     }

//     function drawStar(radius) {
//       for (let i = 0; i < 10; i++) {
//         const r = i % 2 === 0 ? radius : radius / 2;
//         const angle = (i * Math.PI / 5) - Math.PI / 2;
//         const x = r * Math.cos(angle);
//         const y = r * Math.sin(angle);
//         i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
//       }
//       ctx.closePath();
//     }

//     function drawTechText(item) {
//       ctx.save();
//       ctx.translate(item.x, item.y);
//       ctx.fillStyle = `rgba(255, 255, 255, ${item.opacity})`;
//       ctx.font = item.isCode ? '12px monospace' : '12px Arial';
//       ctx.textAlign = 'left';
//       const displayText = item.text.substring(0, Math.floor(item.typeProgress));
//       ctx.fillText(displayText, 0, 0);
//       ctx.restore();
//     }

//     function drawChartShape(shape) {
//       ctx.save();
//       ctx.translate(shape.x, shape.y);
//       ctx.rotate(shape.rotation);
//       ctx.scale(shape.scale, shape.scale);

//       switch (shape.type) {
//         case 'line':
//           ctx.beginPath();
//           ctx.moveTo(-shape.width / 2, 0);
//           ctx.lineTo(shape.width / 2, 0);
//           ctx.moveTo(0, -shape.height / 2);
//           ctx.lineTo(0, shape.height / 2);
//           ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
//           ctx.lineWidth = 1;
//           ctx.stroke();

//           ctx.beginPath();
//           shape.points.forEach((value, i) => {
//             const x = -shape.width / 2 + (i * shape.width / (shape.points.length - 1));
//             const y = -value;
//             i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
//             ctx.fillStyle = `rgba(255, 255, 255, ${shape.opacity})`;
//             ctx.font = '10px Arial';
//             ctx.fillText(value, x + 2, y - 5);
//           });
//           ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
//           ctx.lineWidth = 1;
//           ctx.stroke();
//           break;
//         case 'candlestick':
//           ctx.beginPath();
//           ctx.moveTo(-shape.width / 2, 0);
//           ctx.lineTo(shape.width / 2, 0);
//           ctx.moveTo(0, -shape.height);
//           ctx.lineTo(0, shape.height);
//           ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
//           ctx.lineWidth = 1;
//           ctx.stroke();

//           shape.candles.forEach((candle, i) => {
//             const x = -shape.width / 2 + (i * shape.width / (shape.candles.length - 1));
//             ctx.beginPath();
//             ctx.moveTo(x, -candle.high);
//             ctx.lineTo(x, -candle.low);
//             ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
//             ctx.lineWidth = 1;
//             ctx.stroke();
//             ctx.beginPath();
//             ctx.rect(x - shape.width / (shape.candles.length * 2), -candle.close, shape.width / shape.candles.length, candle.close - candle.open);
//             ctx.stroke();
//             ctx.fillStyle = `rgba(255, 255, 255, ${shape.opacity})`;
//             ctx.font = '10px Arial';
//             ctx.fillText(candle.close, x + 2, -candle.close - 5);
//           });
//           break;
//         case 'bubble':
//           ctx.beginPath();
//           ctx.moveTo(-shape.width / 2, 0);
//           ctx.lineTo(shape.width / 2, 0);
//           ctx.moveTo(0, -shape.height / 2);
//           ctx.lineTo(0, shape.height / 2);
//           ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
//           ctx.lineWidth = 1;
//           ctx.stroke();

//           shape.bubbles.forEach(bubble => {
//             const x = -shape.width / 2 + bubble.x;
//             const y = -shape.height / 2 + bubble.y;
//             ctx.beginPath();
//             ctx.arc(x, y, bubble.r, 0, Math.PI * 2);
//             ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
//             ctx.lineWidth = 1;
//             ctx.stroke();
//             ctx.fillStyle = `rgba(255, 255, 255, ${shape.opacity})`;
//             ctx.font = '10px Arial';
//             ctx.textAlign = 'center';
//             ctx.fillText(bubble.label, x, y - bubble.r - 2);
//           });
//           break;
//         case 'sankey':
//           shape.links.forEach(link => {
//             const s = shape.nodes[link.source];
//             const t = shape.nodes[link.target];
//             ctx.beginPath();
//             ctx.moveTo(s.x, s.y);
//             ctx.quadraticCurveTo(s.x + 50, s.y, t.x, t.y);
//             ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity * (link.value / 30)})`;
//             ctx.lineWidth = link.value / 10;
//             ctx.stroke();
//           });
//           shape.nodes.forEach((node, i) => {
//             ctx.beginPath();
//             ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
//             ctx.fillStyle = `rgba(255, 255, 255, ${shape.opacity})`;
//             ctx.fill();
//             ctx.fillText(i, node.x + 7, node.y);
//           });
//           break;
//       }
//       ctx.restore();
//     }

//     function drawLines(particlesArray) {
//       for (let i = 0; i < particlesArray.length; i++) {
//         for (let j = i + 1; j < particlesArray.length; j++) {
//           const p1 = particlesArray[i];
//           const p2 = particlesArray[j];
//           const dx = p1.x - p2.x;
//           const dy = p1.y - p2.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < p1.connectionDistance) {
//             const opacity = 1 - (distance / p1.connectionDistance);
//             ctx.beginPath();
//             ctx.moveTo(p1.x, p1.y);
//             ctx.lineTo(p2.x, p2.y);
//             ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25 * p1.connectionStrength})`;
//             ctx.lineWidth = 0.8;
//             ctx.stroke();
//           }
//         }
//       }
//     }

//     function spawnDenseParticles() {
//       // Bias toward left side with 70% chance, otherwise random across canvas
//       const isLeft = Math.random() < 0.7;
//       const spawnX = isLeft ? Math.random() * (canvas.width / 3) : Math.random() * canvas.width;
//       const spawnY = Math.random() * canvas.height;

//       for (let i = 0; i < spawnRate; i++) {
//         const angle = Math.random() * Math.PI * 2;
//         const radius = Math.random() * 30; // Increased from 20 for wider dispersion
//         state.denseParticles.push(createParticle(true, spawnX + Math.cos(angle) * radius, spawnY + Math.sin(angle) * radius));
//       }
//       if (state.denseParticles.length > maxParticles - baseParticlesNum) {
//         state.denseParticles.splice(0, state.denseParticles.length - (maxParticles - baseParticlesNum));
//       }
//     }

//     function updateParticles(particlesArray) {
//       for (let i = particlesArray.length - 1; i >= 0; i--) {
//         const particle = particlesArray[i];
//         particle.x += particle.speedX;
//         particle.y += particle.speedY;
//         particle.rotation += 0.02;

//         if (particle.isDense && particle.life !== null) {
//           particle.life--;
//           particle.scale = Math.max(0.5, particle.life / 90); // Scale fades with life
//           if (particle.life <= 0) {
//             particlesArray.splice(i, 1);
//             continue;
//           }
//         }

//         if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) {
//           particle.speedX = -particle.speedX;
//         }
//         if (particle.y + particle.radius > canvas.height || particle.y - particle.radius < 0) {
//           particle.speedY = -particle.speedY;
//         }
//       }
//     }

//     function updateChartShapes() {
//       state.chartShapes.forEach(shape => {
//         shape.rotation += 0.01;
//         shape.animationPhase += 0.02;
//         const phase = shape.animationPhase % (Math.PI * 2);
//         if (phase < Math.PI) {
//           shape.scale = phase / Math.PI;
//           shape.opacity = shape.baseOpacity * (phase / Math.PI);
//         } else {
//           shape.scale = 1;
//           shape.opacity = shape.baseOpacity * (1 - (phase - Math.PI) / Math.PI);
//           if (phase >= Math.PI * 1.99) {
//             shape.animationPhase = 0;
//           }
//         }
//       });
//     }

//     function updateTechTexts() {
//       state.techTexts.forEach(item => {
//         item.x += item.speedX;
//         item.y += item.speedY;
//         item.animationPhase += 0.015;
//         const phase = item.animationPhase % (Math.PI * 2);
//         if (phase < Math.PI) {
//           item.opacity = item.baseOpacity * (phase / Math.PI);
//           if (item.typeProgress < item.text.length) {
//             item.typeProgress += 0.2;
//           }
//         } else {
//           item.opacity = item.baseOpacity * (1 - (phase - Math.PI) / Math.PI);
//           if (phase >= Math.PI * 1.99) {
//             switch (true) {
//               case item.speedY > 0: // Top to bottom
//                 item.x = Math.random() * canvas.width;
//                 item.y = -20;
//                 break;
//               case item.speedX < 0: // Right to left
//                 item.x = canvas.width;
//                 item.y = Math.random() * canvas.height;
//                 break;
//               case item.speedY < 0: // Bottom to top
//                 item.x = Math.random() * canvas.width;
//                 item.y = canvas.height + 20;
//                 break;
//               case item.speedX > 0: // Left to right
//                 item.x = -100;
//                 item.y = Math.random() * canvas.height;
//                 break;
//             }
//             item.animationPhase = 0;
//             item.typeProgress = 0;
//           }
//         }
//       });
//     }

//     // Modified animate function
//     const animate = () => {
//       if (!document.hidden) { // Only animate when page is visible
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         state.frameCount++;
//         if (state.frameCount % spawnInterval === 0) {
//           spawnDenseParticles();
//         }

//         state.techTexts.forEach(drawTechText);
//         updateTechTexts();

//         drawLines(state.baseParticles);
//         state.baseParticles.forEach(drawShape);
//         updateParticles(state.baseParticles);

//         drawLines(state.denseParticles);
//         state.denseParticles.forEach(drawShape);
//         updateParticles(state.denseParticles);

//         state.chartShapes.forEach(drawChartShape);
//         updateChartShapes();
//       }
//       requestAnimationFrame(animate);
//     };

//     // Initialize and start animation
//     resizeCanvas();
//     animate();

//     // Handle window resize
//     window.addEventListener('resize', resizeCanvas, { passive: true });

//     // Handle visibility change
//     document.addEventListener('visibilitychange', () => {
//       if (!document.hidden) {
//         resizeCanvas(); // Reinitialize when becoming visible
//       }
//     });
//   }
// };
const EAAnimation = {
  init() {
    const canvas = document.getElementById('animationCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const baseParticlesNum = 150;
    const denseParticlesNum = 50;
    const techTextsNum = 30;
    const baseSpeed = 0.4;
    const maxParticles = 500;
    const spawnRate = 3;
    const spawnInterval = 60;
    const earthParticleNum = 200;
    const countrySpawnRate = 0.1;

    let baseParticles = [];
    let denseParticles = [];
    let chartShapes = [];
    let techTexts = [];
    let earthParticles = [];
    let frameCount = 0;
    let globeRotationZ = 0;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
      initializeChartShapes();
      initializeTechTexts();
      initializeEarthParticles();
    }

    function initializeParticles() {
      baseParticles = Array.from({ length: baseParticlesNum }, () => createParticle(false));
      denseParticles = Array.from({ length: denseParticlesNum }, () => createParticle(true));
    }

    function initializeEarthParticles() {
      earthParticles = [];
      const earthRadius = canvas.height * 0.4;
      for (let i = 0; i < earthParticleNum; i++) {
        const lat = (Math.random() - 0.5) * Math.PI;
        const lon = Math.random() * Math.PI;
        const x = earthRadius * Math.cos(lon) * Math.cos(lat);
        const y = earthRadius * Math.sin(lat);
        earthParticles.push(createParticle(false, x, y, true));
      }
    }

    function createParticle(isDense = false, x = Math.random() * canvas.width, y = Math.random() * canvas.height, isEarth = false) {
      const shapeTypes = ['circle', 'triangle', 'pentagon', 'hexagon', 'star', 'cube', 'hexagonMedium'];
      return {
        x,
        y,
        radius: Math.random() * 5 + 2,
        speedX: isEarth ? 0 : (Math.random() - 0.5) * baseSpeed * (isDense ? 2.5 : 1),
        speedY: isEarth ? 0 : (Math.random() - 0.5) * baseSpeed * (isDense ? 2.5 : 1),
        color: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
        connectionStrength: Math.random() * 0.4 + 0.4,
        connectionDistance: Math.random() * 150 + 100,
        shapeType: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        scale: 1,
        rotation: Math.random() * Math.PI * 2,
        isDense,
        life: isDense ? 90 : null,
        isEarth
      };
    }

    function initializeChartShapes() {
      chartShapes = [
        createLineChart(canvas.width * 0.2, canvas.height * 0.8),
        createCandlestickChart(canvas.width * 0.8, canvas.height * 0.2),
        createLineChart(canvas.width * 0.4, canvas.height * 0.3),
        createCandlestickChart(canvas.width * 0.6, canvas.height * 0.6),
        createLineChart(canvas.width * 0.3, canvas.height * 0.5),
        createCandlestickChart(canvas.width * 0.7, canvas.height * 0.4),
        createBubbleChart(canvas.width * 0.5, canvas.height * 0.7),
        createBubbleChart(canvas.width * 0.25, canvas.height * 0.25),
        createSankeyChart(canvas.width * 0.75, canvas.height * 0.75)
      ];
    }

    function initializeTechTexts() {
      techTexts = Array.from({ length: techTextsNum }, () => createTechText());
    }

    function createTechText() {
      const texts = [
        "data = pd.read_csv('analytics.csv')",
        "Machine Learning Insights",
        "def analyze_data(x): return stats",
        "Big Data Trends",
        "SELECT * FROM analytics WHERE value > 0",
        "Predictive Modeling",
        "import numpy as np # Data Analytics",
        "Real-Time Dashboards",
        "stats = model.fit(X, y)",
        "Data Visualization Tools",
        "df.groupby('category').sum()",
        "Deep Learning Algorithms",
        "spark.sql('SELECT * FROM data')",
        "Business Intelligence Growth"
      ];
      const direction = Math.floor(Math.random() * 4);
      let x, y, speedX, speedY;
      switch (direction) {
        case 0: x = Math.random() * canvas.width; y = -20; speedX = 0; speedY = 0.8; break;
        case 1: x = canvas.width; y = Math.random() * canvas.height; speedX = -0.8; speedY = 0; break;
        case 2: x = Math.random() * canvas.width; y = canvas.height + 20; speedX = 0; speedY = -0.8; break;
        case 3: x = -100; y = Math.random() * canvas.height; speedX = 0.8; speedY = 0; break;
      }
      return {
        x,
        y,
        speedX,
        speedY,
        text: texts[Math.floor(Math.random() * texts.length)],
        opacity: 0,
        baseOpacity: 0.3,
        animationPhase: Math.random() * Math.PI * 2,
        isCode: texts.indexOf(texts[Math.floor(Math.random() * texts.length)]) % 2 === 0,
        typeProgress: 0
      };
    }

    function createLineChart(x, y) {
      const dummyData = [20, 35, 15, 45, 30, 25];
      return { x, y, points: dummyData, type: 'line', width: 100, height: 60, baseOpacity: 0.3, opacity: 0, scale: 0, animationPhase: Math.random() * Math.PI * 2 };
    }

    function createCandlestickChart(x, y) {
      const dummyData = [
        { open: 50, close: 60, high: 65, low: 45 },
        { open: 60, close: 55, high: 62, low: 50 },
        { open: 55, close: 58, high: 60, low: 52 },
        { open: 58, close: 54, high: 59, low: 51 }
      ];
      return { x, y, candles: dummyData, type: 'candlestick', width: 100, height: 60, baseOpacity: 0.3, opacity: 0, scale: 0, animationPhase: Math.random() * Math.PI * 2 };
    }

    function createBubbleChart(x, y) {
      const dummyData = [
        { x: 20, y: 30, r: 10, label: 'A' },
        { x: 40, y: 50, r: 15, label: 'B' },
        { x: 60, y: 20, r: 12, label: 'C' },
        { x: 80, y: 40, r: 8, label: 'D' }
      ];
      return { x, y, bubbles: dummyData, type: 'bubble', width: 100, height: 60, baseOpacity: 0.3, opacity: 0, scale: 0, animationPhase: Math.random() * Math.PI * 2 };
    }

    function createSankeyChart(x, y) {
      const dummyData = {
        nodes: [{ x: 0, y: 0 }, { x: 100, y: -20 }, { x: 100, y: 20 }, { x: 200, y: 0 }],
        links: [{ source: 0, target: 1, value: 30 }, { source: 0, target: 2, value: 20 }, { source: 1, target: 3, value: 25 }, { source: 2, target: 3, value: 15 }]
      };
      return { x, y, nodes: dummyData.nodes, links: dummyData.links, type: 'sankey', baseOpacity: 0.3, opacity: 0, scale: 0, animationPhase: Math.random() * Math.PI * 2 };
    }

    function drawShape(particle) {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.scale(particle.scale, particle.scale);
      ctx.beginPath();
      switch (particle.shapeType) {
        case 'circle': ctx.arc(0, 0, particle.radius, 0, Math.PI * 2); break;
        case 'triangle': drawPolygon(3, particle.radius); break;
        case 'pentagon': drawPolygon(5, particle.radius); break;
        case 'hexagon': drawPolygon(6, particle.radius); break;
        case 'star': drawStar(particle.radius); break;
        case 'cube': drawCube(particle.radius * 1.5); break;
        case 'hexagonMedium': drawPolygon(6, particle.radius * 2); break;
      }
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.restore();
    }

    function drawPolygon(sides, radius) {
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    function drawStar(radius) {
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? radius : radius / 2;
        const angle = (i * Math.PI / 5) - Math.PI / 2;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    function drawCube(size) {
      // Front face
      ctx.beginPath();
      ctx.moveTo(-size / 2, -size / 2);
      ctx.lineTo(size / 2, -size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.closePath();
      // Simple 3D effect with offset lines
      ctx.moveTo(size / 2, -size / 2);
      ctx.lineTo(size / 2 + size / 4, -size / 2 - size / 4);
      ctx.lineTo(size / 2 + size / 4, size / 2 - size / 4);
      ctx.lineTo(size / 2, size / 2);
      ctx.moveTo(-size / 2, -size / 2);
      ctx.lineTo(-size / 2 + size / 4, -size / 2 - size / 4);
    }

    function drawTechText(item) {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.fillStyle = `rgba(255, 255, 255, ${item.opacity})`;
      ctx.font = item.isCode ? '12px monospace' : '12px Arial';
      ctx.textAlign = 'left';
      const displayText = item.text.substring(0, Math.floor(item.typeProgress));
      ctx.fillText(displayText, 0, 0);
      ctx.restore();
    }

    function drawChartShape(shape) {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.scale(shape.scale, shape.scale);
      switch (shape.type) {
        case 'line':
          ctx.beginPath();
          ctx.moveTo(-shape.width / 2, 0); ctx.lineTo(shape.width / 2, 0);
          ctx.moveTo(0, -shape.height / 2); ctx.lineTo(0, shape.height / 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          shape.points.forEach((value, i) => {
            const x = -shape.width / 2 + (i * shape.width / (shape.points.length - 1));
            const y = -value;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            ctx.fillStyle = `rgba(255, 255, 255, ${shape.opacity})`;
            ctx.font = '10px Arial';
            ctx.fillText(value, x + 2, y - 5);
          });
          ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          break;
        case 'candlestick':
          ctx.beginPath();
          ctx.moveTo(-shape.width / 2, 0); ctx.lineTo(shape.width / 2, 0);
          ctx.moveTo(0, -shape.height); ctx.lineTo(0, shape.height);
          ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          shape.candles.forEach((candle, i) => {
            const x = -shape.width / 2 + (i * shape.width / (shape.candles.length - 1));
            ctx.beginPath();
            ctx.moveTo(x, -candle.high); ctx.lineTo(x, -candle.low);
            ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.rect(x - shape.width / (shape.candles.length * 2), -candle.close, shape.width / shape.candles.length, candle.close - candle.open);
            ctx.stroke();
            ctx.fillStyle = `rgba(255, 255, 255, ${shape.opacity})`;
            ctx.font = '10px Arial';
            ctx.fillText(candle.close, x + 2, -candle.close - 5);
          });
          break;
        case 'bubble':
          ctx.beginPath();
          ctx.moveTo(-shape.width / 2, 0); ctx.lineTo(shape.width / 2, 0);
          ctx.moveTo(0, -shape.height / 2); ctx.lineTo(0, shape.height / 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          shape.bubbles.forEach(bubble => {
            const x = -shape.width / 2 + bubble.x;
            const y = -shape.height / 2 + bubble.y;
            ctx.beginPath();
            ctx.arc(x, y, bubble.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = `rgba(255, 255, 255, ${shape.opacity})`;
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(bubble.label, x, y - bubble.r - 2);
          });
          break;
        case 'sankey':
          shape.links.forEach(link => {
            const s = shape.nodes[link.source];
            const t = shape.nodes[link.target];
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.quadraticCurveTo(s.x + 50, s.y, t.x, t.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity * (link.value / 30)})`;
            ctx.lineWidth = link.value / 10;
            ctx.stroke();
          });
          shape.nodes.forEach((node, i) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${shape.opacity})`;
            ctx.fill();
            ctx.fillText(i, node.x + 7, node.y);
          });
          break;
      }
      ctx.restore();
    }

    function drawLines(particlesArray) {
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const p1 = particlesArray[i];
          const p2 = particlesArray[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < p1.connectionDistance) {
            const opacity = 1 - (distance / p1.connectionDistance);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25 * p1.connectionStrength})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    function spawnDenseParticles() {
      const isLeft = Math.random() < 0.7;
      const spawnX = isLeft ? Math.random() * (canvas.width / 3) : Math.random() * canvas.width;
      const spawnY = Math.random() * canvas.height;
      for (let i = 0; i < spawnRate; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 20;
        denseParticles.push(createParticle(true, spawnX + Math.cos(angle) * radius, spawnY + Math.sin(angle) * radius));
      }
      if (denseParticles.length > maxParticles - baseParticlesNum - earthParticles.length) {
        denseParticles.splice(0, denseParticles.length - (maxParticles - baseParticlesNum - earthParticles.length));
      }
    }

    function drawHalfEarth() {
      const earthRadius = canvas.height * 0.4;
      const earthX = earthRadius;
      const earthY = canvas.height / 2;
      const pulse = Math.sin(frameCount * 0.05) * 0.1 + 0.3;

      ctx.save();
      ctx.translate(earthX, earthY);
      ctx.rotate(globeRotationZ);

      earthParticles.forEach(particle => {
        const rotatedX = particle.x * Math.cos(globeRotationZ) - particle.y * Math.sin(globeRotationZ);
        const rotatedY = particle.x * Math.sin(globeRotationZ) + particle.y * Math.cos(globeRotationZ);
        particle.x = rotatedX;
        particle.y = rotatedY;
        drawShape({ ...particle, x: earthX + rotatedX, y: earthY + rotatedY });
      });

      const countries = [
        { name: 'USA', lat: Math.PI / 6, lon: Math.PI / 4, size: 0.2 },
        { name: 'India', lat: Math.PI / 12, lon: 3 * Math.PI / 4, size: 0.15 }
      ];

      countries.forEach(country => {
        if (Math.random() < countrySpawnRate) {
          const lat = country.lat + (Math.random() - 0.5) * country.size * Math.PI;
          const lon = country.lon + (Math.random() - 0.5) * country.size * Math.PI;
          const x = earthRadius * Math.cos(lon) * Math.cos(lat);
          const y = earthRadius * Math.sin(lat);
          const projX = earthX + x * Math.cos(globeRotationZ) - y * Math.sin(globeRotationZ);
          const projY = earthY + x * Math.sin(globeRotationZ) + y * Math.cos(globeRotationZ);
          const speedX = Math.cos(lon) * baseSpeed * 2;
          const speedY = Math.sin(lat) * baseSpeed * 2;
          denseParticles.push({
            ...createParticle(true, projX, projY),
            speedX,
            speedY
          });
        }
      });

      if (denseParticles.length > maxParticles - baseParticlesNum - earthParticles.length) {
        denseParticles.splice(0, denseParticles.length - (maxParticles - baseParticlesNum - earthParticles.length));
      }

      ctx.restore();
    }

    function updateParticles(particlesArray) {
      for (let i = particlesArray.length - 1; i >= 0; i--) {
        const particle = particlesArray[i];
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += 0.02;
        if (particle.isDense && particle.life !== null) {
          particle.life--;
          particle.scale = Math.max(0.5, particle.life / 90);
          if (particle.life <= 0) {
            particlesArray.splice(i, 1);
            continue;
          }
        }
        if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y + particle.radius > canvas.height || particle.y - particle.radius < 0) {
          particle.speedY = -particle.speedY;
        }
      }
    }

    function updateChartShapes() {
      chartShapes.forEach(shape => {
        shape.rotation += 0.01;
        shape.animationPhase += 0.02;
        const phase = shape.animationPhase % (Math.PI * 2);
        if (phase < Math.PI) {
          shape.scale = phase / Math.PI;
          shape.opacity = shape.baseOpacity * (phase / Math.PI);
        } else {
          shape.scale = 1;
          shape.opacity = shape.baseOpacity * (1 - (phase - Math.PI) / Math.PI);
          if (phase >= Math.PI * 1.99) {
            shape.animationPhase = 0;
          }
        }
      });
    }

    function updateTechTexts() {
      techTexts.forEach(item => {
        item.x += item.speedX;
        item.y += item.speedY;
        item.animationPhase += 0.015;
        const phase = item.animationPhase % (Math.PI * 2);
        if (phase < Math.PI) {
          item.opacity = item.baseOpacity * (phase / Math.PI);
          if (item.typeProgress < item.text.length) {
            item.typeProgress += 0.2;
          }
        } else {
          item.opacity = item.baseOpacity * (1 - (phase - Math.PI) / Math.PI);
          if (phase >= Math.PI * 1.99) {
            switch (true) {
              case item.speedY > 0: item.x = Math.random() * canvas.width; item.y = -20; break;
              case item.speedX < 0: item.x = canvas.width; item.y = Math.random() * canvas.height; break;
              case item.speedY < 0: item.x = Math.random() * canvas.width; item.y = canvas.height + 20; break;
              case item.speedX > 0: item.x = -100; item.y = Math.random() * canvas.height; break;
            }
            item.animationPhase = 0;
            item.typeProgress = 0;
          }
        }
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCount++;
      if (frameCount % spawnInterval === 0) {
        spawnDenseParticles();
      }

      globeRotationZ += 0.01;
      drawHalfEarth();

      techTexts.forEach(drawTechText);
      updateTechTexts();

      drawLines(baseParticles);
      baseParticles.forEach(drawShape);
      updateParticles(baseParticles);

      drawLines(denseParticles);
      denseParticles.forEach(drawShape);
      updateParticles(denseParticles);

      chartShapes.forEach(drawChartShape);
      updateChartShapes();

      requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);
  }
};

EAAnimation.init();
