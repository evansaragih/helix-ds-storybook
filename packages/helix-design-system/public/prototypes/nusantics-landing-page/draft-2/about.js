// About Us Page Interaction & Motion Scripts
(() => {
  'use strict';

  // 1. Reduced Motion Preference Check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Core Values Carousel
  const valuesCarousel = document.getElementById('values-carousel');
  if (valuesCarousel) {
    const viewport = valuesCarousel.querySelector('.about-values__viewport');
    const track = valuesCarousel.querySelector('.about-values__track');
    const cards = [...valuesCarousel.querySelectorAll('.value-card')];
    const prevBtn = valuesCarousel.querySelector('.carousel-btn--prev');
    const nextBtn = valuesCarousel.querySelector('.carousel-btn--next');

    if (viewport && cards.length) {
      function getCardWidth() {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return cards[0].offsetWidth + gap; // width + gap
      }

      function scrollToIndex(index) {
        const targetX = index * getCardWidth();
        viewport.scrollTo({
          left: targetX,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }

      function updateControls() {
        const scrollLeft = viewport.scrollLeft;
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        if (prevBtn) prevBtn.disabled = scrollLeft <= 4;
        if (nextBtn) nextBtn.disabled = scrollLeft >= maxScroll - 4;
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          const currentIdx = Math.round(viewport.scrollLeft / getCardWidth());
          scrollToIndex(Math.max(0, currentIdx - 1));
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const currentIdx = Math.round(viewport.scrollLeft / getCardWidth());
          scrollToIndex(Math.min(cards.length - 1, currentIdx + 1));
        });
      }

      viewport.addEventListener('scroll', () => {
        requestAnimationFrame(updateControls);
      }, { passive: true });

      // Keyboard arrow navigation
      viewport.addEventListener('keydown', (e) => {
        const currentIdx = Math.round(viewport.scrollLeft / getCardWidth());
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          scrollToIndex(Math.max(0, currentIdx - 1));
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          scrollToIndex(Math.min(cards.length - 1, currentIdx + 1));
        }
      });

      updateControls();
    }
  }

  // 3. Interactive Timeline (Our Story)
  const timelineItems = [...document.querySelectorAll('.timeline-item')];
  if (timelineItems.length) {
    timelineItems.forEach((item) => {
      item.addEventListener('click', () => {
        timelineItems.forEach((el) => el.classList.remove('is-active'));
        item.classList.add('is-active');
      });
    });

    // Activate on scroll into view via IntersectionObserver
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              timelineItems.forEach((el) => el.classList.remove('is-active'));
              entry.target.classList.add('is-active');
            }
          });
        },
        { rootMargin: '-20% 0px -40% 0px', threshold: 0.2 }
      );

      timelineItems.forEach((item) => observer.observe(item));
    }
  }

  // 4. Animated Stats Counter (Intro Section)
  const statElements = [...document.querySelectorAll('[data-counter]')];
  if (statElements.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.counter, 10);
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const duration = 1400; // ms
            const start = performance.now();

            function updateCounter(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out quad
              const ease = 1 - (1 - progress) * (1 - progress);
              const current = Math.floor(ease * target);
              el.textContent = `${prefix}${current}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                el.textContent = `${prefix}${target}${suffix}`;
              }
            }

            requestAnimationFrame(updateCounter);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    statElements.forEach((el) => counterObserver.observe(el));
  }

  // 5. Subtle Hero Parallax: the photo trails the scroll by 8% (was 22% with a 1.2s ease on top, which made it float)
  const heroBg = document.querySelector('.about-hero__bg');
  if (heroBg && !prefersReducedMotion) {
    const HERO_PARALLAX = 0.08;
    let ticking = false;
    heroBg.style.transition = 'none'; // the offset follows the scroll position directly
    heroBg.style.willChange = 'transform';
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      if (y < window.innerHeight) heroBg.style.transform = `scale(1.02) translate3d(0, ${(y * HERO_PARALLAX).toFixed(1)}px, 0)`;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }

  // 6. CTA: 3D pointer-tracking scientist stage (same micro-interaction as Product Pipeline)
  const ctaSection = document.querySelector('.about-cta');
  const stage = document.getElementById('about-scientist-stage');
  if (ctaSection && stage && !prefersReducedMotion) {
    let curX = 0, curY = 0, targetX = 0, targetY = 0, curAura = 0, targetAura = 0, rafId = null;

    function updateSpring() {
      curX += (targetX - curX) * 0.11;
      curY += (targetY - curY) * 0.11;
      curAura += (targetAura - curAura) * 0.1;

      stage.style.setProperty('--ry', (curX * 13).toFixed(2) + 'deg');
      stage.style.setProperty('--rx', (-curY * 8).toFixed(2) + 'deg');
      stage.style.setProperty('--tx', (curX * 16).toFixed(2) + 'px');
      stage.style.setProperty('--ty', (curY * 9).toFixed(2) + 'px');
      stage.style.setProperty('--shadow-x', (-curX * 22).toFixed(1) + 'px');
      stage.style.setProperty('--shadow-y', (18 - curY * 10).toFixed(1) + 'px');
      stage.style.setProperty('--aura', curAura.toFixed(3));

      if (Math.abs(targetX - curX) > 0.002 || Math.abs(targetY - curY) > 0.002 || Math.abs(targetAura - curAura) > 0.003) {
        rafId = requestAnimationFrame(updateSpring);
      } else {
        rafId = null;
      }
    }

    function scheduleSpring() {
      if (!rafId) rafId = requestAnimationFrame(updateSpring);
    }

    ctaSection.addEventListener('pointermove', (e) => {
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.5;
      const nx = Math.max(-1.15, Math.min(1.15, (e.clientX - cx) / (rect.width * 0.55)));
      const ny = Math.max(-1.0, Math.min(1.0, (e.clientY - cy) / (rect.height * 0.55)));
      targetX = nx;
      targetY = ny;

      // Full aura over the stage, subtle aura across the rest of the section
      const dist = Math.hypot(nx, ny);
      targetAura = dist < 1.05 ? 1.0 : 0.45;

      const ctaRect = ctaSection.getBoundingClientRect();
      ctaSection.style.setProperty('--cta-spot-x', (((e.clientX - ctaRect.left) / ctaRect.width) * 100).toFixed(1) + '%');
      ctaSection.style.setProperty('--cta-spot-y', (((e.clientY - ctaRect.top) / ctaRect.height) * 100).toFixed(1) + '%');

      stage.classList.add('is-tracking');
      stage.classList.toggle('is-active', dist < 1.05);
      scheduleSpring();
    });

    ctaSection.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
      targetAura = 0;
      stage.classList.remove('is-tracking', 'is-active');
      scheduleSpring();
    });

    // Keyboard focus on the CTA button also wakes the stage
    ctaSection.querySelectorAll('.about-cta__btn').forEach((btn) => {
      btn.addEventListener('focus', () => {
        targetX = 0.65;
        targetY = -0.15;
        targetAura = 0.95;
        stage.classList.add('is-active');
        scheduleSpring();
      });
      btn.addEventListener('blur', () => {
        targetX = 0;
        targetY = 0;
        targetAura = 0;
        stage.classList.remove('is-active');
        scheduleSpring();
      });
    });
  }

  // 7. YouTube embeds refuse to play (error 153) when the page has no web origin, e.g. opened as file://.
  // In that case show the video poster as a link to YouTube; over http(s) the iframe plays inline.
  if (location.protocol === 'file:') {
    document.querySelectorAll('.about-leading__video-card iframe').forEach((frame) => {
      const id = (frame.src.match(/\/embed\/([\w-]+)/) || [])[1];
      if (!id) return;
      const link = document.createElement('a');
      link.className = 'video-poster';
      link.href = `https://www.youtube.com/watch?v=${id}`;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', 'Watch the video on YouTube');
      link.innerHTML = `<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt=""><span class="video-poster__play" aria-hidden="true"></span>`;
      frame.replaceWith(link);
    });
  }

})();
