// Year stamp
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    toggle.setAttribute('aria-expanded', String(!open));
  });
  const mq = window.matchMedia('(min-width: 860px)');
  const sync = () => { nav.style.display = mq.matches ? 'flex' : 'none'; toggle.setAttribute('aria-expanded','false'); };
  mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);
  sync();
}

// Hero micro-parallax (motion-safe)
const media = document.getElementById('parallax');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (media && !prefersReduced) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 4;  // max 4px offset
    const y = (e.clientY / window.innerHeight - 0.5) * 4;
    media.style.transform = `translate(${x}px, ${y}px)`;
  }, {passive:true});
}

// Section reveal
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
  }
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contact: mailto fallback with validation
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const phone = data.get('phone')?.toString().trim();
    const message = data.get('message')?.toString().trim();

    if (!name || !email) {
      note.textContent = 'Please include at least your name and email.';
      note.style.color = '#b91c1c';
      return;
    }
    const subject = encodeURIComponent('Training Enquiry');
    const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Phone: ${phone || '-'}
—
${message || 'Hi Jay, I would like to book a consultation to get started with training.'}`
    );
    window.location.href = `mailto:enquiries@jaydoesphysiques.com?subject=${subject}&body=${body}`;
    note.textContent = 'Opening your email client…';
    note.style.color = '#166534';
  });
}