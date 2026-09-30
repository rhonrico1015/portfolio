// ── Theme ────────────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const next = theme === 'dark' ? 'light' : 'dark';
  themeToggle?.setAttribute('aria-label', `Switch to ${next} mode`);
}

applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ── Loader ───────────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader?.classList.add('hidden'), 600);
});

// ── Mobile nav toggle ────────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('nav-open', open);
});

function closeNav() {
  navMenu?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}

document.querySelectorAll('.nav__menu a').forEach(link => {
  link.addEventListener('click', closeNav);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeNav();
});

// ── Header scroll state ──────────────────────────────────────
const siteHeader = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  siteHeader?.classList.toggle('scrolled', window.scrollY > 10);
});

// ── Active nav link ──────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
  });
});

// ── Scroll reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Lightbox ─────────────────────────────────────────────────
function openModal(src, caption) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-img').src = src;
  document.getElementById('modal-caption').textContent = caption;
  modal.hidden = false;
  document.body.classList.add('lightbox-open');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.hidden = true;
  document.body.classList.remove('lightbox-open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
