// ===========================
// ENHANCED NEXTSURE JAVASCRIPT
// Professional, Interactive & Optimized
// ===========================

'use strict';

// ===========================
// UTILITY FUNCTIONS
// ===========================
const utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// ===========================
// PRELOADER WITH ANIMATION
// ===========================
class Preloader {
  constructor() {
    this.element = document.getElementById('preloader');
    this.init();
  }

  init() {
    if (!this.element) return;

    window.addEventListener('load', () => {
      this.hide();
    });

    // Fallback: force hide after 3 seconds
    setTimeout(() => this.hide(), 3000);
  }

  hide() {
    if (!this.element) return;
    
    this.element.style.transition = 'opacity 0.8s ease-out, visibility 0.8s ease-out';
    this.element.style.opacity = '0';
    this.element.style.visibility = 'hidden';
    
    setTimeout(() => {
      this.element.style.display = 'none';
      document.body.style.overflow = 'visible';
    }, 800);
  }
}

// ===========================
// HEADER SCROLL EFFECTS
// ===========================
class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.scrollThreshold = 50;
    this.init();
  }

  init() {
    if (!this.header) return;

    const handleScroll = utils.throttle(() => {
      if (window.scrollY > this.scrollThreshold) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
  }
}

// ===========================
// HERO SLIDER (ADVANCED)
// ===========================
class HeroSlider {
  constructor() {
    this.slides = [
      {
        src: 'images/travel.webp',
        alt: 'Travel Insurance',
        title: 'Travel with Confidence',
        text: 'Explore the world safely with our comprehensive travel insurance.',
        btn: 'Learn More',
        link: '#products'
      },
      {
        src: 'images/fire.webp',
        alt: 'Fire Insurance',
        title: 'Fire Protection Plans',
        text: 'Protect your home and business from unexpected fire damage.',
        btn: 'View Details',
        link: '#products'
      },
      {
        src: 'images/car.jpg',
        alt: 'Car Insurance',
        title: 'Drive Without Worries',
        text: 'Enjoy every ride with full car insurance coverage.',
        btn: 'Get a Quote',
        link: '#quote'
      },
      {
        src: 'images/marine.webp',
        alt: 'Marine Insurance',
        title: 'Marine Cargo Protection',
        text: 'Ensure your cargo and vessel are always secure.',
        btn: 'Discover More',
        link: '#products'
      }
    ];

    this.slider = document.getElementById('heroSlider');
    this.dotsContainer = document.getElementById('dots');
    this.nextBtn = document.getElementById('nextSlide');
    this.prevBtn = document.getElementById('prevSlide');
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 6000;
    this.isTransitioning = false;

    this.init();
  }

  init() {
    if (!this.slider || !this.dotsContainer) return;

    this.createSlides();
    this.createDots();
    this.attachEventListeners();
    this.startAutoPlay();
    this.showSlide(0);
  }

  createSlides() {
    this.slides.forEach((slide, index) => {
      const slideDiv = document.createElement('div');
      slideDiv.classList.add('slide');
      if (index === 0) slideDiv.classList.add('active');

      slideDiv.innerHTML = `
        <img src="${slide.src}" alt="${slide.alt}" loading="${index === 0 ? 'eager' : 'lazy'}">
        <div class="slide-content">
          <h1>${slide.title}</h1>
          <p>${slide.text}</p>
          <a href="${slide.link}">${slide.btn}</a>
        </div>
      `;
      this.slider.appendChild(slideDiv);
    });

    this.slideElements = this.slider.querySelectorAll('.slide');
  }

  createDots() {
    this.slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Slide ${index + 1}`);
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });

      dot.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.goToSlide(index);
          this.resetAutoPlay();
        }
      });

      this.dotsContainer.appendChild(dot);
    });

    this.dotElements = this.dotsContainer.querySelectorAll('.dot');
  }

  showSlide(index) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Remove active class from all
    this.slideElements.forEach(slide => slide.classList.remove('active'));
    this.dotElements.forEach(dot => dot.classList.remove('active'));

    // Add active class to current
    this.slideElements[index].classList.add('active');
    this.dotElements[index].classList.add('active');
    
    this.currentIndex = index;

    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  goToSlide(index) {
    if (index === this.currentIndex) return;
    this.showSlide(index);
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  attachEventListeners() {
    // Button controls
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }
    
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }

    // Pause on hover
    this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.slider.addEventListener('mouseleave', () => this.startAutoPlay());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
        this.resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetAutoPlay();
      }
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    this.slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });

    // Visibility change - pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
    });
  }

  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.resetAutoPlay();
    }
  }
}

// ===========================
// MOBILE NAVIGATION
// ===========================
class MobileNav {
  constructor() {
    this.navToggle = document.getElementById('navToggle');
    this.mainNav = document.getElementById('mainNav');
    this.navList = this.mainNav ? this.mainNav.querySelector('.nav-list') : null;
    this.init();
  }

  init() {
    if (!this.navToggle || !this.navList) return;

    // Toggle menu
    this.navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Close menu when clicking on links
    this.navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.mainNav.contains(e.target) && 
          !this.navToggle.contains(e.target) && 
          this.navList.classList.contains('active')) {
        this.closeMenu();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navList.classList.contains('active')) {
        this.closeMenu();
      }
    });

    // Prevent body scroll when menu is open
    const observer = new MutationObserver(() => {
      if (this.navList.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    observer.observe(this.navList, { attributes: true, attributeFilter: ['class'] });
  }

  toggleMenu() {
    this.navList.classList.toggle('active');
    this.navToggle.classList.toggle('active');
    this.navToggle.setAttribute('aria-expanded', 
      this.navList.classList.contains('active')
    );
  }

  closeMenu() {
    this.navList.classList.remove('active');
    this.navToggle.classList.remove('active');
    this.navToggle.setAttribute('aria-expanded', 'false');
  }
}

// ===========================
// BACK TO TOP BUTTON
// ===========================
class BackToTop {
  constructor() {
    this.button = document.getElementById('backTop');
    this.scrollThreshold = 400;
    this.init();
  }

  init() {
    if (!this.button) return;

    const handleScroll = utils.throttle(() => {
      if (window.scrollY > this.scrollThreshold) {
        this.show();
      } else {
        this.hide();
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    
    this.button.addEventListener('click', () => {
      this.scrollToTop();
    });

    handleScroll(); // Initial check
  }

  show() {
    this.button.style.display = 'flex';
    setTimeout(() => {
      this.button.style.opacity = '1';
      this.button.style.transform = 'scale(1)';
    }, 10);
  }

  hide() {
    this.button.style.opacity = '0';
    this.button.style.transform = 'scale(0.8)';
    setTimeout(() => {
      this.button.style.display = 'none';
    }, 300);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// ===========================
// FORM VALIDATION & SUBMISSION
// ===========================
class FormHandler {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.formMsg = document.getElementById('formMsg');
    this.init();
  }

  init() {
    if (!this.form || !this.formMsg) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Remove previous error
    field.classList.remove('error');
    const errorMsg = field.parentElement.querySelector('.error-msg');
    if (errorMsg) errorMsg.remove();

    // Check required fields
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      this.showFieldError(field, 'এই ফিল্ডটি আবশ্যক');
    }

    // Email validation
    if (field.type === 'email' && value) {
      if (!this.isValidEmail(value)) {
        isValid = false;
        this.showFieldError(field, 'সঠিক ইমেইল ঠিকানা দিন');
      }
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#dc2626';
    
    const errorMsg = document.createElement('span');
    errorMsg.classList.add('error-msg');
    errorMsg.textContent = message;
    errorMsg.style.color = '#dc2626';
    errorMsg.style.fontSize = '0.875rem';
    errorMsg.style.marginTop = '0.25rem';
    errorMsg.style.display = 'block';
    
    field.parentElement.appendChild(errorMsg);
  }

  handleSubmit() {
    // Validate all fields
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showMessage('দয়া করে সকল আবশ্যক ফিল্ড সঠিকভাবে পূরণ করুন', 'error');
      return;
    }

    // Simulate form submission
    this.submitForm();
  }

  async submitForm() {
    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'পাঠানো হচ্ছে...';
    submitBtn.disabled = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success
    this.showMessage('ধন্যবাদ! আপনার অনুরোধ পাওয়া গেছে। আমরা শীঘ্রই যোগাযোগ করব।', 'success');
    this.form.reset();
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Clear all error states
    this.form.querySelectorAll('.error').forEach(field => {
      field.classList.remove('error');
      field.style.borderColor = '';
    });
    this.form.querySelectorAll('.error-msg').forEach(msg => msg.remove());
  }

  showMessage(text, type) {
    this.formMsg.textContent = text;
    this.formMsg.className = 'form-msg show';
    
    if (type === 'error') {
      this.formMsg.style.background = '#fef2f2';
      this.formMsg.style.color = '#dc2626';
      this.formMsg.style.borderColor = '#dc2626';
    } else {
      this.formMsg.style.background = '#f0fdf4';
      this.formMsg.style.color = '#10b981';
      this.formMsg.style.borderColor = '#10b981';
    }

    // Auto hide after 6 seconds
    setTimeout(() => {
      this.formMsg.classList.remove('show');
    }, 6000);
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// ===========================
// INTERSECTION OBSERVER (ANIMATIONS)
// ===========================
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.card, .partner, .why-choose li');
    this.init();
  }

  init() {
    if (!this.animatedElements.length) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(element);
    });
  }
}

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    if (!this.links.length) return;

    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Skip if href is just "#"
        if (targetId === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(targetId);
        
        if (target) {
          e.preventDefault();
          
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      });
    });
  }
}

// ===========================
// CURRENT YEAR IN FOOTER
// ===========================
class FooterYear {
  constructor() {
    this.yearElement = document.getElementById('year');
    this.init();
  }

  init() {
    if (!this.yearElement) return;
    this.yearElement.textContent = new Date().getFullYear();
  }
}

// ===========================
// PARALLAX EFFECT (OPTIONAL)
// ===========================
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('.slide img');
    this.init();
  }

  init() {
    if (!this.elements.length) return;

    const handleScroll = utils.throttle(() => {
      const scrolled = window.pageYOffset;
      
      this.elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = 0.5;
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px) scale(1.15)`;
        }
      });
    }, 50);

    window.addEventListener('scroll', handleScroll);
  }
}

// ===========================
// CURSOR EFFECTS (PREMIUM FEATURE)
// ===========================
class CursorEffect {
  constructor() {
    this.cursor = null;
    this.cursorFollower = null;
    this.init();
  }

  init() {
    // Only on desktop devices
    if (window.innerWidth < 768 || 'ontouchstart' in window) return;

    this.createCursor();
    this.attachEventListeners();
  }

  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.style.cssText = `
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10b981;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
      mix-blend-mode: difference;
    `;

    this.cursorFollower = document.createElement('div');
    this.cursorFollower.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #10b981;
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease;
      mix-blend-mode: difference;
    `;

    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorFollower);
  }

  attachEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
      
      this.cursorFollower.style.left = (e.clientX - 20) + 'px';
      this.cursorFollower.style.top = (e.clientY - 20) + 'px';
    });

    // Enlarge on hoverable elements
    const hoverElements = document.querySelectorAll('a, button, .card, .btn');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'scale(2)';
        this.cursorFollower.style.width = '60px';
        this.cursorFollower.style.height = '60px';
        this.cursorFollower.style.left = `${parseInt(this.cursorFollower.style.left) - 10}px`;
        this.cursorFollower.style.top = `${parseInt(this.cursorFollower.style.top) - 10}px`;
      });

      element.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'scale(1)';
        this.cursorFollower.style.width = '40px';
        this.cursorFollower.style.height = '40px';
      });
    });
  }
}

// ===========================
// PERFORMANCE MONITOR
// ===========================
class PerformanceMonitor {
  constructor() {
    this.logPerformance();
  }

  logPerformance() {
    if (!window.performance) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.log('🚀 Performance Metrics:');
        console.log(`   Page Load Time: ${pageLoadTime}ms`);
        console.log(`   Connection Time: ${connectTime}ms`);
        console.log(`   Render Time: ${renderTime}ms`);
      }, 0);
    });
  }
}

// ===========================
// LOADING LAZY IMAGES
// ===========================
class LazyImageLoader {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"]');
    this.init();
  }

  init() {
    if (!this.images.length || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    this.images.forEach(img => imageObserver.observe(img));
  }
}

// ===========================
// PRODUCT LINKS UPDATER
// ===========================
class ProductLinksUpdater {
  constructor() {
    this.updateLinks();
  }

  updateLinks() {
    // Update product card links
    const productCards = document.querySelectorAll('#products .card');
    const products = ['travel.html', 'fire.html', 'car.html', 'marine.html'];
    
    productCards.forEach((card, index) => {
      const link = card.querySelector('.btn-link');
      if (link && products[index]) {
        link.href = products[index];
      }
    });
  }
}

// ===========================
// SCROLL PROGRESS BAR
// ===========================
class ScrollProgressBar {
  constructor() {
    this.progressBar = null;
    this.init();
  }

  init() {
    this.createProgressBar();
    this.attachScrollListener();
  }

  createProgressBar() {
    this.progressBar = document.createElement('div');
    this.progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(90deg, #1e1b4b, #10b981, #3b82f6);
      width: 0%;
      z-index: 10000;
      transition: width 0.1s ease;
      box-shadow: 0 2px 10px rgba(16, 185, 129, 0.5);
    `;
    document.body.appendChild(this.progressBar);
  }

  attachScrollListener() {
    const updateProgress = utils.throttle(() => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      this.progressBar.style.width = scrolled + '%';
    }, 50);

    window.addEventListener('scroll', updateProgress);
  }
}

// ===========================
// TYPING EFFECT (FOR HERO TEXT)
// ===========================
class TypingEffect {
  constructor(element, texts, typingSpeed = 100, deletingSpeed = 50, delay = 2000) {
    this.element = element;
    this.texts = texts;
    this.typingSpeed = typingSpeed;
    this.deletingSpeed = deletingSpeed;
    this.delay = delay;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
  }

  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = this.delay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ===========================
// INITIALIZE ALL MODULES
// ===========================
class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeModules());
    } else {
      this.initializeModules();
    }
  }

  initializeModules() {
    try {
      // Core modules
      new Preloader();
      new HeaderScroll();
      new HeroSlider();
      new MobileNav();
      new BackToTop();
      new FormHandler();
      new SmoothScroll();
      new FooterYear();
      new ScrollAnimations();
      new ProductLinksUpdater();
      
      // Optional premium features
      new ScrollProgressBar();
      new LazyImageLoader();
      
      // Performance monitoring (development only)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        new PerformanceMonitor();
      }

      // Custom cursor (optional - can be disabled)
      // new CursorEffect();
      
      console.log('✅ NextSure: All modules initialized successfully!');
    } catch (error) {
      console.error('❌ Error initializing modules:', error);
    }
  }
}

// ===========================
// START APPLICATION
// ===========================
new App();

// ===========================
// SERVICE WORKER (OPTIONAL PWA)
// ===========================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to enable PWA features
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('✅ Service Worker registered'))
    //   .catch(err => console.log('❌ Service Worker registration failed:', err));
  });
}

// ===========================
// EXPORT FOR TESTING
// ===========================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { App, utils };
}