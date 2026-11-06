
    
document.addEventListener('DOMContentLoaded', function () {
  const contactInfo = {
    email: 'danielaspitaleri3@gmail.com',
    linkedin: 'https://www.linkedin.com/in/daniela-spitaleri/',
    location: 'Minturno, LT'
  };

  function openExternalLink(url) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    }
  }

  function animateHomeElements() {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 180 + 250);
    });
  }

  function initTypeEffect() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const text = typingText.textContent.trim();
    typingText.textContent = '';
    typingText.style.visibility = 'hidden';

    let index = 0;
    const speed = 90;

    function typeWriter() {
      if (index === 0) {
        typingText.style.visibility = 'visible';
      }

      if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index += 1;
        setTimeout(typeWriter, speed);
      }
    }

    setTimeout(typeWriter, 700);
  }

  function initProgressBars() {
    const bars = document.querySelectorAll('.progress-bar');
    if (!bars.length) return;

    const animateBar = (bar) => {
      const value = Number.parseInt(bar.getAttribute('data-progress') || '0', 10);
      bar.style.width = '0%';

      setTimeout(() => {
        bar.style.width = `${value}%`;

        const span = bar.querySelector('span');
        if (!span) return;

        let current = 0;
        const target = value;
        const increment = Math.max(1, Math.ceil(target / 50));

        const updateNumber = () => {
          if (current < target) {
            current += increment;
            if (current > target) current = target;
            span.textContent = `${current}%`;
            setTimeout(updateNumber, 20);
          }
        };

        updateNumber();
      }, 150);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bars.forEach(animateBar);
            observer.disconnect();
          }
        });
      }, { threshold: 0.3, rootMargin: '0px 0px -30px 0px' });

      const skillsSection = document.getElementById('sectionC');
      if (skillsSection) observer.observe(skillsSection);
    } else {
      bars.forEach(animateBar);
    }
  }

  function initMobileMenu() {
    const toggler = document.getElementById('navbar-toggler');
    const overlayMenu = document.getElementById('overlayMenu');

    if (!toggler || !overlayMenu) return;

    const closeMenu = () => {
      toggler.classList.remove('active');
      overlayMenu.classList.remove('show');
      toggler.setAttribute('aria-expanded', 'false');
    };

    toggler.addEventListener('click', () => {
      const isOpen = overlayMenu.classList.toggle('show');
      toggler.classList.toggle('active', isOpen);
      toggler.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.overlay-menu-item').forEach((item) => {
      item.addEventListener('click', closeMenu);
    });
  }

  function initButtons() {
    const downloadBtn = document.getElementById('download-cv-button');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', async () => {
        const cvUrl = 'cv.pdf';
        try {
          const response = await fetch(cvUrl, { method: 'HEAD' });
          if (!response.ok) throw new Error('CV not found');

          const link = document.createElement('a');
          link.href = cvUrl;
          link.download = 'Daniela_Spitaleri_CV.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          window.alert('Il file CV non è disponibile al momento.');
        }
      });
    }

    const linkedinBtn = document.getElementById('linkedin-button');
    if (linkedinBtn) {
      linkedinBtn.addEventListener('click', () => {
        openExternalLink(contactInfo.linkedin);
      });
    }

    const locationBtn = document.getElementById('location-button');
    if (locationBtn) {
      locationBtn.addEventListener('click', () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.location)}`;
        openExternalLink(url);
      });
    }
  }

  function initEmailPopup() {
    const emailBtn = document.getElementById('send-email-button');
    const popup = document.getElementById('popAlert');
    const copyBtn = document.getElementById('copy');
    const openBtn = document.getElementById('open');
    const closeBtn = document.getElementById('close-email-popup');
    const notification = document.getElementById('notification');

    const closePopup = () => {
      if (popup) popup.classList.remove('active');
    };

    if (emailBtn && popup) {
      emailBtn.addEventListener('click', () => {
        popup.classList.add('active');
      });

      popup.addEventListener('click', (event) => {
        if (event.target === popup) {
          closePopup();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closePopup);
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && popup && popup.classList.contains('active')) {
        closePopup();
      }
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(contactInfo.email);
          } else {
            const textArea = document.createElement('textarea');
            textArea.value = contactInfo.email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }

          if (notification) {
            notification.classList.remove('visible');
            notification.classList.add('visible');
            setTimeout(() => notification.classList.remove('visible'), 1800);
          }
        } catch (error) {
          console.error('Errore copia email:', error);
        }
      });
    }

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        const subject = encodeURIComponent('Richiesta informazioni');
        const body = encodeURIComponent('Ciao Daniela,\n\nTi scrivo in merito a ...');
        openExternalLink(`mailto:${contactInfo.email}?subject=${subject}&body=${body}`);
      });
    }
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (event) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        const overlayMenu = document.getElementById('overlayMenu');
        if (overlayMenu && overlayMenu.classList.contains('show')) {
          overlayMenu.classList.remove('show');
          const toggler = document.getElementById('navbar-toggler');
          if (toggler) {
            toggler.classList.remove('active');
            toggler.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    const updateButton = () => {
      btn.classList.toggle('visible', window.scrollY > 300);
    };

    updateButton();
    window.addEventListener('scroll', updateButton);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initResponsiveState() {
    const toggler = document.getElementById('navbar-toggler');
    const overlayMenu = document.getElementById('overlayMenu');

    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && overlayMenu && overlayMenu.classList.contains('show')) {
        overlayMenu.classList.remove('show');
      }

      if (toggler) {
        toggler.classList.remove('active');
        toggler.setAttribute('aria-expanded', 'false');
      }
    });
  }

  animateHomeElements();
  initTypeEffect();
  initProgressBars();
  initMobileMenu();
  initButtons();
  initEmailPopup();
  initSmoothScroll();
  initBackToTop();
  initResponsiveState();

  setTimeout(() => {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }, 500);
});