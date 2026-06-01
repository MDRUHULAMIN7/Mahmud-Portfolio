import { getProject } from './data.js';

const id = new URLSearchParams(location.search).get('id');
const p = id ? getProject(id) : null;
const el = document.getElementById('detail');

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// Smooth scroll for anchor links on this page too
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if(href.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function initRevealObserver(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '1px 1px -40px 1px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el));
}

if(!p){
  el.innerHTML = `<h1>Project not found</h1><p style="color:var(--muted)">This project may have been removed.</p>`;
} else {
  document.title = `${p.title} — Md Mahmud`;
  const imgs = (p.images && p.images.length) ? p.images : [p.cover];
  const cat = (p.category || 'Project').toUpperCase();
  const likes = 600 + Math.floor(Math.random()*400);
  const views = 2000 + Math.floor(Math.random()*3000);
  el.innerHTML = `
    <a class="back reveal" href="/#projects">← All projects</a>
    <div class="pd-layout">
      <aside class="pd-left reveal">
        <div class="pd-tag">${cat} · 2026</div>
        <h1 class="pd-title">${p.title}</h1>
        <p class="pd-lede">${p.description || ''}</p>
        ${p.highlights && p.highlights.length ? `
          <div class="pd-block">
            <div class="pd-block-title">🍕 Perfect for:</div>
            <ul class="pd-check">
              ${p.highlights.slice(1, Math.ceil(p.highlights.length/2)).map(h=>`<li>${h}</li>`).join('')}
            </ul>
          </div>
          <div class="pd-block">
            <div class="pd-block-title">🥡 What you'll get:</div>
            <ul class="pd-check">
              ${p.highlights.slice(Math.ceil(p.highlights.length/2)).map(h=>`<li>${h}</li>`).join('')}
            </ul>
          </div>` : ''}
        <div class="pd-line">📞 <b>WhatsApp:</b> +8801701541689</div>
        <p class="pd-lede">Let's make your brand impossible to ignore 🎨<br/>Send me your number, and I'll personally reach out to you.</p>
        <a class="btn-pill" href="https://wa.me/8801345347968" target="_blank">💬 Order on WhatsApp</a>
      </aside>
      <section class="pd-center">
        ${imgs.map((src, i) => `<div class="pd-shot reveal stagger-${Math.min(i+1,5)}"><img src="${src}" alt="${p.title}" loading="lazy"/></div>`).join('')}
      </section>
      <aside class="pd-right reveal-right">
        <div class="pd-stats">
          <div class="pd-stat">♡ <span>${likes} Likes</span></div>
          <div class="pd-stat">👁 <span>${views.toLocaleString()} Views</span></div>
          <div class="pd-stat">💬 <span>0 Comments</span></div>
          <div class="pd-stat">⇪ <span>Share</span></div>
        </div>
        <div class="pd-socials">
          <a href="#" aria-label="Instagram">◉</a>
          <a href="#" aria-label="Behance">B</a>
          <a href="#" aria-label="Dribbble">●</a>
          <a href="https://wa.me/8801345347968" aria-label="WhatsApp">✆</a>
        </div>
        <div class="pd-meta-card">
          <div class="pd-section-label">Social</div>
          <a href="mailto:mdmahmud59yy@gmail.com">mdmahmud59yy@gmail.com</a>
          <div>+880 1345 347968</div>
        </div>
        <div class="pd-meta-card">
          <div class="pd-section-label">Pages</div>
          <a href="/#home">Home</a>
          <a href="/#about">About</a>
          <a href="/#projects">Projects</a>
          <a href="/#services">Services</a>
          <a href="/#contact">Contact</a>
        </div>
        <div class="pd-cta-card">
          <h3>Let's create<br/>something bold.</h3>
          <a class="btn-pill" href="https://wa.me/8801345347968" target="_blank">Start a Project →</a>
        </div>
      </aside>
    </div>
  `;
  initRevealObserver();
}
