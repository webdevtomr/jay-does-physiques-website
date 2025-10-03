// Year stamp
document.getElementById('year').textContent = new Date().getFullYear();

// Typewriter animation for "confident"
const typewriter = document.getElementById('typewriter');
if (typewriter) {
  const text = 'confident';
  let index = 0;

  // Add typing class for cursor
  typewriter.classList.add('typing');

  const type = () => {
    if (index < text.length) {
      typewriter.textContent += text.charAt(index);
      index++;
      setTimeout(type, 150); // 150ms delay between characters
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        typewriter.classList.remove('typing');
      }, 500);
    }
  };

  // Start typing after a brief delay
  setTimeout(type, 800);
}

// Mobile menu
const toggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('active');
    nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close menu when clicking on a nav link
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Handle window resize
  const mq = window.matchMedia('(min-width: 860px)');
  const sync = () => {
    if (mq.matches) {
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  };
  mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);
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

