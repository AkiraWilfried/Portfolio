// script.js - version corrigée avec ScrollSpy fonctionnel
(() => {

  /* ---------- HELPERS ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));

  const debounce = (fn, wait = 16) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  /* ---------- TYPEWRITER ---------- */
  const phrases = ["Développeur web", "Développeur mobile", "UI/UX designer", "Rédacteur web"];
  const typingElement = $('#typewriter');
  let cp = 0;
  let cc = 0;
  const typingSpeed = 100;
  const erasingSpeed = 75;
  const delayBetween = 1500;

  function type() {
    if (!typingElement) return;
    if (cc < phrases[cp].length) {
      typingElement.textContent += phrases[cp].charAt(cc++);
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, delayBetween);
    }
  }

  function erase() {
    if (!typingElement) return;
    if (cc > 0) {
      typingElement.textContent = phrases[cp].substring(0, --cc);
      setTimeout(erase, erasingSpeed);
    } else {
      cp = (cp + 1) % phrases.length;
      setTimeout(type, typingSpeed);
    }
  }

  /* ---------- THEME TOGGLE ---------- */
  const themeToggle = $('.theme-toggle');

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun" aria-hidden="true"></i><span class="theme-label"></span>'
        : '<i class="fas fa-moon" aria-hidden="true"></i><span class="theme-label"></span>';
      themeToggle.setAttribute('aria-label', `Activer le thème ${(theme === 'dark') ? 'clair' : 'sombre'}`);
    }
  }

  // Charger le thème sauvegardé
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(current);
    });
  }

  /* ---------- MOBILE MENU ---------- */
  const mobileMenu = $('.mobile-menu');
  const navMenu = $('.nav-menu');

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = mobileMenu.querySelectorAll('span');
      const open = navMenu.classList.contains('active');

      if (open) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px,6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px,-6px)';
      } else {
        spans[0].style.transform = spans[2].style.transform = 'none';
        spans[1].style.opacity = '1';
      }
    });
  }

  /* ---------- INTERSECTION OBSERVER POUR ANIMATION AU SCROLL ---------- */
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, appearOptions);

  $$('.fade-in').forEach(el => appearOnScroll.observe(el));

  /* ---------- SKILLS FILTER & PROGRESS BAR ---------- */
  const skillsBtns = $$('.skills-filter .filter-btn');
  const skillCards = $$('.skill-card');

  function animateProgress(card) {
    const fill = card.querySelector('.progress-fill');
    const val = fill?.dataset?.progress || fill?.getAttribute('data-progress');
    if (!fill || !val) return;

    fill.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => fill.style.width = `${val}%`, 80);
    });
  }

  skillsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillsBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.category;
      skillCards.forEach(card => {
        if (card.dataset.category === cat) {
          card.classList.remove('hidden');
          card.classList.add('show');
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          animateProgress(card);
        } else {
          card.classList.remove('show');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => card.classList.add('hidden'), 250);
        }
      });
    });
  });

  const skillsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(ent => {
      if (ent.isIntersecting && !ent.target.classList.contains('hidden')) {
        animateProgress(ent.target);
        obs.unobserve(ent.target);
      }
    });
  }, { threshold: 0.45 });

  skillCards.forEach(c => skillsObserver.observe(c));

  /* ---------- PROJECTS FILTER ---------- */
  const projectBtns = $$('.projects-filter .filter-btn');
  const projectCards = $$('.project-card');

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;

      projectCards.forEach(card => {
        if (card.dataset.category === cat) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  /* ---------- SMOOTH SCROLL ---------- */
  $$('.nav-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const headerH = $('.header')?.offsetHeight || 0;
      const targetPos = target.offsetTop - headerH;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });

      if (navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileMenu) {
          const spans = mobileMenu.querySelectorAll('span');
          spans[0].style.transform = spans[2].style.transform = 'none';
          spans[1].style.opacity = '1';
        }
      }
    });
  });

  /* ---------- CONTACT FORM AVEC AJAX ---------- */
  const contactForm = $('.contact-form');

  function showToast(text, type = 'info', ms = 3000) {
    let toast = $('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), ms);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
      
      const formData = new FormData(contactForm);
      
      try {
        const response = await fetch('contact.php', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
          showToast('Message envoyé avec succès! Je vous répondrai bientôt.', 'success');
          contactForm.reset();
        } else {
          showToast(data.message || 'Erreur lors de l\'envoi du message', 'error');
        }
        
      } catch (error) {
        showToast('Erreur de connexion. Veuillez réessayer.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  /* ---------- SCROLLSPY CORRIGÉ ---------- */
  function initScrollSpy() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-menu a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;

    function updateActiveLink() {
      const scrollPos = window.scrollY + 150; // Offset pour le header
      
      let currentSection = '';
      
      // Trouver la section actuellement visible
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      // Si on est tout en haut de la page
      if (window.scrollY < 100) {
        currentSection = 'hero';
      }
      
      // Si on est tout en bas de la page
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        currentSection = sections[sections.length - 1].getAttribute('id');
      }
      
      // Mettre à jour les liens
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
    
    // Écouter le scroll avec debounce
    window.addEventListener('scroll', debounce(updateActiveLink, 100));
    
    // Initialiser au chargement
    updateActiveLink();
  }

  /* ---------- LAZY LOAD IMAGES ---------- */
  function initLazy() {
    const images = $$('[data-src]');
    if (images.length === 0) return;
    
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const img = en.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        obs.unobserve(img);
      });
    }, { rootMargin: "100px 0px" });

    images.forEach(img => io.observe(img));
  }

  /* ---------- SCROLL-TO-TOP BUTTON ---------- */
  function initScrollTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    btn.setAttribute('aria-label', 'Remonter en haut');
    document.body.appendChild(btn);

    window.addEventListener('scroll', debounce(() => {
      if (window.pageYOffset > 300) btn.classList.add('show');
      else btn.classList.remove('show');
    }, 100));

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- PARALLAX HERO AVATAR ---------- */
  function initParallax() {
    const heroAvatar = $('.hero-avatar');
    if (!heroAvatar) return;
    
    window.addEventListener('scroll', debounce(() => {
      const sc = window.pageYOffset;
      if (sc < window.innerHeight) {
        heroAvatar.style.transform = `translateY(${sc * -0.5}px)`;
      }
    }, 10));
  }

  /* ---------- INIT AU DOM READY ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Démarrer typewriter
    setTimeout(type, 800);

    // Initialiser filtres par défaut
    const defaultSkillBtn = $('.skills-filter .filter-btn[data-category="frontend"]');
    if (defaultSkillBtn) defaultSkillBtn.click();
    
    const defaultProjBtn = $('.projects-filter .filter-btn[data-category="web"]');
    if (defaultProjBtn) defaultProjBtn.click();

    // Initialiser fonctionnalités
    initLazy();
    initScrollTop();
    initParallax();
    initScrollSpy(); // SCROLLSPY ICI

    // Animation des progress bars visibles au chargement
    $$('.skill-card').forEach(card => {
      if (card.getBoundingClientRect().top < window.innerHeight && !card.classList.contains('hidden')) {
        animateProgress(card);
      }
    });

    // Accessibility: activer boutons au clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const el = document.activeElement;
        if (el && el.classList.contains('filter-btn')) {
          e.preventDefault();
          el.click();
        }
      }
    });

    // Fade-in des images au load
    $$('img').forEach(img => {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    });
  });

})();