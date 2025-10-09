// ===========================
// PRELOADER WITH SMOOTH EXIT
// ===========================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.6s ease-out';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }, 800);
  }
});

// ===========================
// SCROLL SHADOW ON HEADER
// ===========================
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===========================
// HERO SLIDER WITH ENHANCEMENTS
// ===========================
const slides = [
  { src: 'images/banner.jpg', alt: 'Banner 1' },
  { src: 'images/banner2.png', alt: 'Banner 2' },
  { src: 'images/banner3.png', alt: 'Banner 3' },
  { src: 'images/banner4.png', alt: 'Banner 3' }
];

const slider = document.getElementById('heroSlider');
const dotsContainer = document.getElementById('dots');
let currentSlide = 0;
let autoSlideInterval;

// Create slide elements
if (slider) {
  slides.forEach((slide, index) => {
    const img = document.createElement('img');
    img.src = slide.src;
    img.alt = slide.alt;
    slider.appendChild(img);

    const dot = document.createElement('span');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      showSlide(index);
      startAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function showSlide(index) {
    const allSlides = slider.querySelectorAll('img');
    allSlides.forEach((img, i) => {
      img.style.display = i === index ? 'block' : 'none';
      dots[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
  }

  // Event listeners for buttons
  const nextBtn = document.getElementById('nextSlide');
  const prevBtn = document.getElementById('prevSlide');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      nextSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      prevSlide();
      startAutoSlide();
    });
  }

  // Start auto-slide
  startAutoSlide();

  // Pause on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  slider.addEventListener('mouseleave', () => {
    startAutoSlide();
  });
}

// ===========================
// BACK TO TOP BUTTON
// ===========================
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.style.display = 'block';
  } else {
    backTop.style.display = 'none';
  }
});

backTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===========================
// MOBILE NAVBAR TOGGLE
// ===========================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const navList = mainNav ? mainNav.querySelector('.nav-list') : null;

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
  });

  // Close menu when link is clicked
  const navLinks = navList.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
    });
  });
}

// ===========================
// PRODUCT BUTTON CLICK
// ===========================
const productButtons = document.querySelectorAll('.go-product');
productButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = btn.getAttribute('data-target');
    if (target) {
      window.location.href = target;
    }
  });
});

// ===========================
// CONTACT FORM SUBMISSION
// ===========================
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form fields
    const name = contactForm.querySelector('input[name="name"]');
    const email = contactForm.querySelector('input[name="email"]');

    // Validate form
    if (!name || !name.value.trim()) {
      showMessage('আপনার নাম দিন।', 'error');
      return;
    }

    if (!email || !isValidEmail(email.value)) {
      showMessage('সঠিক ইমেইল ঠিকানা দিন।', 'error');
      return;
    }

    // Show success message
    showMessage('ধন্যবাদ! আপনার অনুরোধ পাওয়া গেছে। আমরা শীঘ্রই যোগাযোগ করব।', 'success');

    // Reset form
    contactForm.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
      if (formMsg) {
        formMsg.classList.remove('show');
      }
    }, 5000);
  });
}

function showMessage(text, type) {
  if (formMsg) {
    formMsg.textContent = text;
    formMsg.classList.add('show');
    if (type === 'error') {
      formMsg.style.background = '#fef2f2';
      formMsg.style.color = '#dc2626';
      formMsg.style.borderColor = '#dc2626';
    } else {
      formMsg.style.background = '#f0fdf4';
      formMsg.style.color = '#10b981';
      formMsg.style.borderColor = '#10b981';
    }
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ===========================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards for fade-in animation
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// ===========================
// SET CURRENT YEAR IN FOOTER
// ===========================
document.getElementById('year').textContent = new Date().getFullYear();

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});