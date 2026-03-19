const terminal = document.getElementById('terminal');
const lines = terminal.querySelectorAll('.line');
lines.forEach((line, idx) => {
  line.style.opacity = 0;
  line.style.transform = 'translateY(6px)';
  setTimeout(() => {
    line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    line.style.opacity = 1;
    line.style.transform = 'translateY(0)';
  }, 200 + idx * 180);
});

const copyBtn = document.getElementById('copy-handle');
copyBtn.addEventListener('click', async () => {
  const text = 'asuna@0xA';
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'copied ✓';
    setTimeout(() => (copyBtn.textContent = 'copy handle'), 1800);
  } catch (err) {
    copyBtn.textContent = text;
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.card, .project, .about, .hero-text, .hero-panel').forEach((el) => {
  el.classList.add('fade');
  observer.observe(el);
});
