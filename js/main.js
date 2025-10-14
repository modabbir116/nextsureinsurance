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
// HERO SLIDER
// ===========================
class HeroSlider {
  constructor() {
    this.slides = [
      {
        src: 'images/travel2.jpg',
        alt: 'Travel Insurance',
        title: 'Travel with Confidence',
        text: 'Explore the world safely with our comprehensive travel insurance.',
        btn: 'View Details',
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
        btn: 'View Details',
        link: '#quote'
      },
      {
        src: 'images/marine.webp',
        alt: 'Marine Insurance',
        title: 'Marine Cargo Protection',
        text: 'Ensure your cargo and vessel are always secure.',
        btn: 'View Details',
        link: '#products'
      }
    ];

    this.slider = document.getElementById('heroSlider');
    this.dotsContainer = document.getElementById('dots');
    this.nextBtn = document.getElementById('nextSlide');
    this.prevBtn = document.getElementById('prevSlide');
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 3000;

    this.init();
  }

  init() {
    if (!this.slider || !this.dotsContainer) return;

    this.slider.innerHTML = "";
    this.dotsContainer.innerHTML = "";

    this.createSlides();
    this.createDots();
    this.showSlide(0);
    this.startAutoPlay();
    this.attachEventListeners();
  }

  createSlides() {
    this.slides.forEach((slide, index) => {
      const div = document.createElement('div');
      div.classList.add('slide');
      if (index === 0) div.classList.add('active');

      div.innerHTML = `
        <img src="${slide.src}" alt="${slide.alt}">
        <div class="slide-content">
          <h1>${slide.title}</h1>
          <p>${slide.text}</p>
          <a href="${slide.link}" class="btn">${slide.btn}</a>
        </div>
      `;
      this.slider.appendChild(div);
    });

    this.slideElements = this.slider.querySelectorAll('.slide');
  }

  createDots() {
    this.slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        this.showSlide(i);
        this.resetAutoPlay();
      });
      this.dotsContainer.appendChild(dot);
    });
    this.dotElements = this.dotsContainer.querySelectorAll('.dot');
  }

  showSlide(index) {
    this.slideElements.forEach(slide => slide.classList.remove('active'));
    this.dotElements.forEach(dot => dot.classList.remove('active'));

    this.slideElements[index].classList.add('active');
    this.dotElements[index].classList.add('active');
    this.currentIndex = index;
  }

  nextSlide() {
    const next = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(next);
  }

  prevSlide() {
    const prev = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prev);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }

  attachEventListeners() {
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
  }
}

// ===========================
// MOBILE NAVIGATION (FIXED & IMPROVED)
// ===========================
class MobileNav {
  constructor() {
    this.navToggle = document.querySelector('.nav-toggle');
    this.navList = document.querySelector('.nav-list');
    this.hasSubmenuItems = document.querySelectorAll('.has-submenu');
    this.overlay = null;
    this.init();
  }

  init() {
    if (!this.navToggle || !this.navList) return;

    // Create or get overlay element
    this.overlay = document.querySelector('.menu-overlay') || this.createOverlay();

    // Toggle menu
    this.navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Close menu when clicking overlay
    this.overlay.addEventListener('click', () => {
      this.closeMenu();
    });

    // Close menu when clicking on regular links
    this.navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        const parentLi = link.closest('li');
        const hasSubmenu = parentLi && parentLi.classList.contains('has-submenu');
        
        // যদি submenu না থাকে তাহলে menu close করবে
        if (!hasSubmenu || window.innerWidth > 992) {
          this.closeMenu();
        }
      });
    });

    // Submenu toggle for mobile
    this.hasSubmenuItems.forEach(item => {
      const mainLink = item.querySelector('a:first-child');
      
      mainLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          e.stopPropagation();
          
          const submenu = item.querySelector('.submenu');
          const isActive = item.classList.contains('active');
          
          // Close other submenus
          this.hasSubmenuItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherSubmenu = otherItem.querySelector('.submenu');
              if (otherSubmenu) otherSubmenu.classList.remove('active');
            }
          });
          
          // Toggle current submenu
          if (isActive) {
            item.classList.remove('active');
            if (submenu) submenu.classList.remove('active');
          } else {
            item.classList.add('active');
            if (submenu) submenu.classList.add('active');
          }
        }
      });

      // Close menu when clicking submenu links
      const submenuLinks = item.querySelectorAll('.submenu a');
      submenuLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.closeMenu();
        });
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const isClickInsideNav = this.navList.contains(e.target);
      const isClickOnToggle = this.navToggle.contains(e.target);
      
      if (!isClickInsideNav && !isClickOnToggle && this.navList.classList.contains('active')) {
        this.closeMenu();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navList.classList.contains('active')) {
        this.closeMenu();
      }
    });

    // Close submenu when screen size changes
    window.addEventListener('resize', utils.debounce(() => {
      if (window.innerWidth > 992) {
        this.closeMenu();
        this.hasSubmenuItems.forEach(item => {
          item.classList.remove('active');
          const submenu = item.querySelector('.submenu');
          if (submenu) submenu.classList.remove('active');
        });
      }
    }, 250));
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('menu-overlay');
    document.body.appendChild(overlay);
    return overlay;
  }

  toggleMenu() {
    const isActive = this.navList.classList.toggle('active');
    this.navToggle.classList.toggle('active');
    this.overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    this.navToggle.setAttribute('aria-expanded', isActive);
  }

  closeMenu() {
    this.navList.classList.remove('active');
    this.navToggle.classList.remove('active');
    this.overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    this.navToggle.setAttribute('aria-expanded', 'false');
    
    // Close all submenus
    this.hasSubmenuItems.forEach(item => {
      item.classList.remove('active');
      const submenu = item.querySelector('.submenu');
      if (submenu) submenu.classList.remove('active');
    });
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

    handleScroll();
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

    this.submitForm();
  }

  async submitForm() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'পাঠানো হচ্ছে...';
    submitBtn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 1500));

    this.showMessage('ধন্যবাদ! আপনার অনুরোধ পাওয়া গেছে। আমরা শীঘ্রই যোগাযোগ করব।', 'success');
    this.form.reset();
    
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

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
// PRODUCT LINKS UPDATER
// ===========================
class ProductLinksUpdater {
  constructor() {
    this.updateLinks();
  }

  updateLinks() {
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
// LAZY IMAGE LOADER
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
// INITIALIZE ALL MODULES
// ===========================
class App {
  constructor() {
    this.init();
  }

  init() {
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
      
      // Optional features
      new ScrollProgressBar();
      new LazyImageLoader();
      
      // Performance monitoring (development only)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        new PerformanceMonitor();
      }
      
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
// EXPORT FOR TESTING
// ===========================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { App, utils };
}