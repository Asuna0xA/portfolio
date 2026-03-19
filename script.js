// Matrix rain effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[];';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(5, 8, 16, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#5df0a0';
  ctx.font = `${fontSize}px JetBrains Mono, monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);
window.addEventListener('resize', () => {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

// Terminal typing animation
function animateTerminal() {
  const lines = document.querySelectorAll('.t-line');
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('visible');
    }, 600 + i * 320);
  });
}

// Skill bars on scroll
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach(fill => {
    const width = fill.getAttribute('data-width');
    setTimeout(() => {
      fill.style.width = width + '%';
    }, 200);
  });
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.num[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      counter.textContent = current + (target >= 1000 ? '+' : '+');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// Copy handle button
const copyBtn = document.getElementById('copy-handle');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('asuna@0xA');
    copyBtn.textContent = 'copied ✓';
    setTimeout(() => (copyBtn.textContent = 'copy handle'), 2000);
  } catch {
    copyBtn.textContent = 'asuna@0xA';
  }
});

// Intersection observer for scroll reveals
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');

      // Trigger skill bars when skills section is visible
      if (entry.target.closest('#skills')) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.getAttribute('data-width') + '%';
          }, i * 150);
        });
      }
    }
  });
}, { threshold: 0.15 });

// Hero animations trigger on load
window.addEventListener('load', () => {
  animateTerminal();

  // Observe metrics for counter animation
  const metricsSection = document.querySelector('.hero-metrics');
  if (metricsSection) {
    setTimeout(() => {
      metricsSection.style.opacity = '1';
      animateCounters();
    }, 900);
  }
});

// Observe all fade-in elements
document.querySelectorAll('.fade-in, .skill-category, .project-card, .about-card, .contact-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Project card hover sound effect (subtle)
// Just visual feedback - no audio

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Nav background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(5, 8, 16, 0.98)';
    nav.style.borderBottomColor = 'rgba(93, 240, 160, 0.1)';
  } else {
    nav.style.background = 'linear-gradient(180deg, rgba(5, 8, 16, 0.95), rgba(5, 8, 16, 0.6))';
    nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
  }
});

// Glitch effect on logo hover
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', () => {
  logo.style.textShadow = '2px 0 #ff6ac1, -2px 0 #5df0a0';
  setTimeout(() => {
    logo.style.textShadow = 'none';
  }, 150);
});
