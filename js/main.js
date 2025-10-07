// ===========================
// PRELOADER
// ===========================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});

// ===========================
// HERO SLIDER
// ===========================
const slides = [
  { src: 'assets/images/banner1.jpg', alt: 'Banner 1' },
  { src: 'assets/images/banner2.jpg', alt: 'Banner 2' },
  { src: 'assets/images/banner3.jpg', alt: 'Banner 3' }
];

const slider = document.getElementById('heroSlider');
const dotsContainer = document.getElementById('dots');
let currentSlide = 0;

// Create slide elements
slides.forEach((slide, index) => {
  const img = document.createElement('img');
  img.src = slide.src;
  img.alt = slide.alt;
  img.style.display = index === 0 ? 'block' : 'none';
  slider.appendChild(img);

  const dot = document.createElement('span');
  dot.className = 'dot';
  dot.addEventListener('click', () => showSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');
dots[0].classList.add('active');

function showSlide(index) {
  const allSlides = slider.querySelectorAll('img');
  allSlides.forEach((img, i) => {
    img.style.display = i === index ? 'block' : 'none';
    dots[i].classList.toggle('active', i === index);
  });
  currentSlide = index;
}

// Next / Prev buttons
document.getElementById('nextSlide').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});
document.getElementById('prevSlide').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Auto-slide every 5s
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// ===========================
// BACK TO TOP BUTTON
// ===========================
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) backTop.style.display = 'block';
  else backTop.style.display = 'none';
});
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// MOBILE NAVBAR TOGGLE
// ===========================
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('mainNav').querySelector('.nav-list');

navToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// ===========================
// PRODUCT BUTTON CLICK
// ===========================
const productButtons = document.querySelectorAll('.go-product');
productButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = btn.getAttribute('data-target');
    if (target) window.location.href = target;
  });
});

// ===========================
// CONTACT FORM SUBMISSION
// ===========================
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formMsg.textContent = 'Thank you! Your request has been received.';
  formMsg.style.color = '#00cb00';
  contactForm.reset();
});

// ===========================
// SET CURRENT YEAR IN FOOTER
// ===========================
document.getElementById('year').textContent = new Date().getFullYear();
