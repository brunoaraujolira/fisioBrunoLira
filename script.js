// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
});

// Header Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled', 'shadow-md');
  } else {
    header.classList.remove('scrolled', 'shadow-md');
  }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Hide form and show success message
  contactForm.classList.add('hidden');
  successMessage.classList.remove('hidden');
  
  // Reset form after 3 seconds
  setTimeout(() => {
    contactForm.classList.remove('hidden');
    successMessage.classList.add('hidden');
    contactForm.reset();
  }, 3000);
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Add intersection observer for fade-in animations (optional enhancement)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Legal Modal (Política de Privacidade / Termos de Uso)
const legalModal = document.getElementById('legal-modal');
const legalOverlay = document.getElementById('legal-modal-overlay');
const legalCloseBtn = document.getElementById('legal-modal-close');
const openPrivacyBtn = document.getElementById('open-privacy');
const openTermsBtn = document.getElementById('open-terms');
const tabPrivacy = document.getElementById('tab-privacy');
const tabTerms = document.getElementById('tab-terms');
const contentPrivacy = document.getElementById('content-privacy');
const contentTerms = document.getElementById('content-terms');
const modalTitle = document.getElementById('legal-modal-title');

function setLegalTab(tab) {
  const isPrivacy = tab === 'privacy';

  if (isPrivacy) {
    contentPrivacy.classList.remove('hidden');
    contentTerms.classList.add('hidden');

    tabPrivacy.classList.add('bg-teal-600', 'text-white');
    tabPrivacy.classList.remove('bg-gray-100', 'text-gray-700');

    tabTerms.classList.add('bg-gray-100', 'text-gray-700');
    tabTerms.classList.remove('bg-teal-600', 'text-white');

    modalTitle.textContent = 'Política de Privacidade';
  } else {
    contentTerms.classList.remove('hidden');
    contentPrivacy.classList.add('hidden');

    tabTerms.classList.add('bg-teal-600', 'text-white');
    tabTerms.classList.remove('bg-gray-100', 'text-gray-700');

    tabPrivacy.classList.add('bg-gray-100', 'text-gray-700');
    tabPrivacy.classList.remove('bg-teal-600', 'text-white');

    modalTitle.textContent = 'Termos de Uso';
  }
}

function openLegalModal(tab) {
  if (!legalModal) return;
  setLegalTab(tab);
  legalModal.classList.remove('hidden');
  legalModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLegalModal() {
  if (!legalModal) return;
  legalModal.classList.add('hidden');
  legalModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Bindings (only if elements exist)
if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', () => openLegalModal('privacy'));
if (openTermsBtn) openTermsBtn.addEventListener('click', () => openLegalModal('terms'));
if (tabPrivacy) tabPrivacy.addEventListener('click', () => setLegalTab('privacy'));
if (tabTerms) tabTerms.addEventListener('click', () => setLegalTab('terms'));
if (legalCloseBtn) legalCloseBtn.addEventListener('click', closeLegalModal);
if (legalOverlay) legalOverlay.addEventListener('click', closeLegalModal);

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && legalModal && !legalModal.classList.contains('hidden')) {
    closeLegalModal();
  }
});

