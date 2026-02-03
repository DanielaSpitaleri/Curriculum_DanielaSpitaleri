
    
// 1. ANIMAZIONI INIZIALI AL CARICAMENTO
document.addEventListener('DOMContentLoaded', function() {
  // Funzione per animare gli elementi della home
  function animateHomeElements() {
    const elements = document.querySelectorAll('.animate-on-load');
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200 + 300); // Delay progressivo
    });
  }
  
  // 2. EFFETTO DI DIGITAZIONE
  function initTypeEffect() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.visibility = 'hidden';
    
    let index = 0;
    const speed = 100;
    
    function typeWriter() {
      if (index === 0) {
        typingText.style.visibility = 'visible';
      }
      
      if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      }
    }
    
    // Avvia dopo che gli elementi sono apparsi
    setTimeout(typeWriter, 1000);
  }
  
  // 3. ANIMAZIONE PROGRESS BARS CON SCROLL
  function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBar(bar) {
      const value = bar.getAttribute('data-progress');
      bar.style.width = '0%';
      
      setTimeout(() => {
        bar.style.width = value + '%';
        
        // Anima il numero
        const span = bar.querySelector('span');
        if (span) {
          let current = 0;
          const target = parseInt(value);
          const increment = Math.ceil(target / 50);
          
          function updateNumber() {
            if (current < target) {
              current += increment;
              if (current > target) current = target;
              span.textContent = current + '%';
              setTimeout(updateNumber, 20);
            }
          }
          
          updateNumber();
        }
      }, 100);
    }
    
    // Observer per animare quando visibili
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            animateProgressBar(bar);
          });
          observer.disconnect(); // Animiamo solo una volta
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Osserva la sezione competenze
    const skillsSection = document.getElementById('sectionC');
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  }
  
  // 4. MENU MOBILE
  function initMobileMenu() {
    const toggler = document.getElementById('navbar-toggler');
    const overlayMenu = document.getElementById('overlayMenu');
    
    if (toggler && overlayMenu) {
      toggler.addEventListener('click', () => {
        toggler.classList.toggle('active');
        overlayMenu.classList.toggle('show');
      });
      
      // Chiudi menu quando si clicca su un link
      document.querySelectorAll('.overlay-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          toggler.classList.remove('active');
          overlayMenu.classList.remove('show');
        });
      });
    }
  }
  
  // 5. BOTTONI VARII
  function initButtons() {
    // Download CV
    const downloadBtn = document.getElementById('download-cv-button');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const cvUrl = 'cv.pdf';
        // Simula il download
        const link = document.createElement('a');
        link.href = cvUrl;
        link.download = 'Daniela_Spitaleri_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
    
    // LinkedIn
    const linkedinBtn = document.getElementById('linkedin-button');
    if (linkedinBtn) {
      linkedinBtn.addEventListener('click', () => {
        window.open('https://www.linkedin.com', '_blank');
      });
    }
    
    // Location
    const locationBtn = document.getElementById('location-button');
    if (locationBtn) {
      locationBtn.addEventListener('click', () => {
        const location = 'Minturno, LT';
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
        window.open(url, '_blank');
      });
    }
  }
  
  // 6. EMAIL POPUP
  function initEmailPopup() {
    const emailBtn = document.getElementById('send-email-button');
    const popup = document.getElementById('popAlert');
    const copyBtn = document.getElementById('copy');
    const openBtn = document.getElementById('open');
    const notification = document.getElementById('notification');
    
    if (emailBtn && popup) {
      emailBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
        popup.classList.add('active');
      });
      
      // Chiudi quando si clicca fuori
      popup.addEventListener('click', (e) => {
        if (e.target === popup) {
          popup.style.display = 'none';
          popup.classList.remove('active');
        }
      });
    }
    
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('danielaspitaleri3@gmail.com')
          .then(() => {
            if (notification) {
              notification.classList.remove('hidden');
              notification.classList.add('visible');
              setTimeout(() => {
                notification.classList.remove('visible');
                notification.classList.add('hidden');
              }, 1500);
            }
          })
          .catch(err => console.error('Errore copia:', err));
      });
    }
    
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        window.location.href = 'mailto:danielaspitaleri3@gmail.com';
      });
    }
  }
  
  // 7. SMOOTH SCROLL
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navbarHeight = document.querySelector('.navbar').offsetHeight || 70;
          const targetPosition = target.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Chiudi menu mobile se aperto
          const overlayMenu = document.getElementById('overlayMenu');
          if (overlayMenu && overlayMenu.classList.contains('show')) {
            overlayMenu.classList.remove('show');
            const toggler = document.getElementById('navbar-toggler');
            if (toggler) toggler.classList.remove('active');
          }
        }
      });
    });
  }
  
  // 8. BACK TO TOP
  function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // INIZIALIZZA TUTTO
  animateHomeElements();
  initTypeEffect();
  initProgressBars();
  initMobileMenu();
  initButtons();
  initEmailPopup();
  initSmoothScroll();
  initBackToTop();
  
  // Refresh AOS dopo il caricamento
  setTimeout(() => {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }, 500);
});

// 9. GESTIONE RESIZE
window.addEventListener('resize', () => {
  const overlayMenu = document.getElementById('overlayMenu');
  if (window.innerWidth > 992 && overlayMenu && overlayMenu.classList.contains('show')) {
    overlayMenu.classList.remove('show');
    const toggler = document.getElementById('navbar-toggler');
    if (toggler) toggler.classList.remove('active');
  }
});