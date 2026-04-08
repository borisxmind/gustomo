/* ─────────────────────────────────────────────
   GUSTOMO B2B – Scripts
   ───────────────────────────────────────────── */

/* ── SCROLL FADE-IN ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      // close mobile nav if open
      closeMobileNav();
    }
  });
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('nav-mobile');

function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function openMobileNav() {
  mobileNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileNav();
  });
}

/* ── CONTACT FORM ── */
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const data = {
      name: form.querySelector('[name="name"]').value.trim(),
      company: form.querySelector('[name="company"]').value.trim(),
      email: form.querySelector('[name="email"]').value.trim(),
      phone: form.querySelector('[name="phone"]').value.trim(),
      interest: form.querySelector('[name="interest"]').value,
      message: form.querySelector('[name="message"]').value.trim(),
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) return;

    // Build mailto body
    const body = [
      `Name: ${data.name}`,
      `Unternehmen: ${data.company || '–'}`,
      `E-Mail: ${data.email}`,
      `Telefon: ${data.phone || '–'}`,
      `Interesse: ${data.interest || '–'}`,
      '',
      `Nachricht:`,
      data.message,
    ].join('\n');

    const subject = encodeURIComponent(`B2B-Anfrage von ${data.name}${data.company ? ' (' + data.company + ')' : ''}`);
    const encodedBody = encodeURIComponent(body);

    window.location.href = `mailto:info@gustomo.de?subject=${subject}&body=${encodedBody}`;

    // Show success message
    form.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';
  });
}
