import { loadProjects } from './data.js';

const PAGE = 6;
let shown = 0;
let projects = [];

function renderMore(){
  const grid = document.getElementById('projectGrid');
  const next = projects.slice(shown, shown + PAGE);
  next.forEach((p, i) => {
    const a = document.createElement('a');
    a.className = 'project reveal';
    a.style.transitionDelay = `${Math.min(i, 5) * 0.08}s`;
    a.href = `/project.html?id=${encodeURIComponent(p.id)}`;
    a.innerHTML = `
      <div class="thumb"><img src="${p.cover}" alt="${p.title}" loading="lazy"/></div>
      <div class="body">
        <div class="tag">${p.category || 'Project'}</div>
        <h4>${p.title} <span class="arrow">→</span></h4>
      </div>`;
    grid.appendChild(a);
    // trigger reveal immediately if already in view
    requestAnimationFrame(() => a.classList.add('visible'));
  });
  shown += next.length;
  const btn = document.getElementById('showMoreBtn');
  if(shown >= projects.length) btn.style.display = 'none';
  else btn.style.display = 'inline-flex';
}

function initRevealObserver(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        // For staggered children inside a container with .reveal-group
        const group = entry.target.closest('.reveal-group');
        if(group){
          group.querySelectorAll('.reveal-child').forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 100);
          });
        }
      }
    });
  }, { threshold: 0.08, rootMargin: '1px 1px -40px 1px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el));
}

function init(){
  projects = loadProjects();
  shown = 1;
  document.getElementById('projectGrid').innerHTML = '';
  renderMore();
  document.getElementById('showMoreBtn').addEventListener('click', renderMore);
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open')));
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    toast('Message sent — I will get back to you soon!');
    e.target.reset();
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  initRevealObserver();
}

function toast(msg){
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateY(20px)';
    setTimeout(() => t.remove(), 300);
  }, 2501);
}

init();
