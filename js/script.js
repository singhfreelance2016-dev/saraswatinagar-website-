// Close mobile menu function
function closeMenu() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  if (nav && hamburger) {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  
  // ========== STICKY HEADER ==========
  const header = document.getElementById('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // ========== MOBILE NAVIGATION ==========
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      nav.classList.toggle('active');
      
      if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking nav links
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('active') && 
          !nav.contains(e.target) && 
          !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  }
  
  // ========== SCROLL TO TOP BUTTON ==========
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ========== ANIMATED COUNTERS ==========
  const statNumbers = document.querySelectorAll('[data-count]');
  
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    if (isNaN(target)) return;
    
    const duration = 2000;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(function() {
      step++;
      current += increment;
      
      if (step >= steps) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, duration / steps);
  }
  
  // Only run counter once
  let countersAnimated = false;
  
  function checkCounters() {
    if (countersAnimated) return;
    
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
      countersAnimated = true;
      statNumbers.forEach(function(num) {
        animateCounter(num);
      });
    }
  }
  
  window.addEventListener('scroll', checkCounters);
  window.addEventListener('load', checkCounters);
  checkCounters(); // Check on init
  
  // ========== FADE UP ANIMATIONS ==========
  const fadeElements = document.querySelectorAll('.fade-up');
  
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -30px 0px'
    });
    
    fadeElements.forEach(function(el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    fadeElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }
  
  // ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========== FORM VALIDATION ==========
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const fullName = this.querySelector('input[name="fullName"]');
      const phone = this.querySelector('input[name="phone"]');
      
      if (!fullName.value.trim()) {
        e.preventDefault();
        fullName.style.borderColor = '#dc3545';
        fullName.focus();
        setTimeout(function() {
          fullName.style.borderColor = '';
        }, 3000);
        return;
      }
      
      if (!phone.value.trim()) {
        e.preventDefault();
        phone.style.borderColor = '#dc3545';
        phone.focus();
        setTimeout(function() {
          phone.style.borderColor = '';
        }, 3000);
        return;
      }
      
      // Form is valid, will submit to Formspree
    });
  }
  
  // ========== ACTIVE NAV LINK ON SCROLL ==========
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(function(link) {
          link.style.opacity = '0.7';
          if (link.getAttribute('href') === '#' + sectionId) {
            link.style.opacity = '1';
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateNavLinkOpacity);
  
  function updateNavLinkOpacity() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.style.opacity = '0.9';
      link.style.color = '';
    });
  }
  
});

// ========== HANDLE WINDOW RESIZE ==========
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      closeMenu();
    }
  }, 250);
});