// Default projects (used if nothing in localStorage)
export const DEFAULT_PROJECTS = [
  { id: 'p1', title: 'Premium Food Poster Design', category: 'Poster Design', cover: '/assets/projects/p1.jpg', images: ['/assets/projects/p1.jpg'], description: 'A bold, mouth-watering poster crafted to make customers stop scrolling and crave the food instantly.', highlights: ['Bold typography','High-quality visuals','Clean modern layout'] },
  { id: 'p2', title: 'Restaurant Brand Campaign', category: 'Social Media', cover: '/assets/projects/p2.jpg', images: ['/assets/projects/p2.jpg'], description: 'A full social media campaign delivering engaging brand visuals for a restaurant launch.', highlights: ['Brand-aligned visuals','Attention-grabbing layouts','Multi-platform ready'] },
  { id: 'p3', title: 'YouTube Thumbnail Series', category: 'Thumbnail Design', cover: '/assets/projects/p3.jpg', images: ['/assets/projects/p3.jpg'], description: 'High click-through-rate thumbnails created with bold typography and vivid contrast.', highlights: ['CTR optimized','Bold readable text','Eye-catching colors'] },
  { id: 'p4', title: 'Product Promo Design', category: 'Ad Design', cover: '/assets/projects/p4.jpg', images: ['/assets/projects/p4.jpg'], description: 'A high-converting product promotion creative designed for Facebook & Instagram ads.', highlights: ['Conversion focused','Mobile first','Brand consistent'] },
  { id: 'p5', title: 'Café Menu & Poster', category: 'Print Design', cover: '/assets/projects/p5.jpg', images: ['/assets/projects/p5.jpg'], description: 'Elegant café branding featuring a menu and matching promotional poster.', highlights: ['Premium feel','Consistent style','Print-ready files'] },
  { id: 'p6', title: 'Social Media Ad Creative', category: 'Ad Design', cover: '/assets/projects/p6.jpg', images: ['/assets/projects/p6.jpg'], description: 'Scroll-stopping creative built for paid social campaigns with strong CTAs.', highlights: ['Strong CTA','High contrast','Tested layouts'] },
  { id: 'p7', title: 'Brand Identity Set', category: 'Branding', cover: '/assets/projects/p7.jpg', images: ['/assets/projects/p7.jpg'], description: 'A clean and modern brand identity set delivered with full visual guidelines.', highlights: ['Logo + palette','Typography system','Usage guidelines'] },
];

const KEY = 'mm_projects_v1';

export function loadProjects(){
  try {
    const raw = localStorage.getItem(KEY);
    if(!raw){ localStorage.setItem(KEY, JSON.stringify(DEFAULT_PROJECTS)); return [...DEFAULT_PROJECTS]; }
    return JSON.parse(raw);
  } catch { return [...DEFAULT_PROJECTS]; }
}
export function saveProjects(list){ localStorage.setItem(KEY, JSON.stringify(list)); }
export function getProject(id){ return loadProjects().find(p => p.id === id); }
export function upsertProject(p){
  const list = loadProjects();
  const i = list.findIndex(x => x.id === p.id);
  if(i >= 0) list[i] = p; else list.push(p);
  saveProjects(list); return list;
}
export function removeProject(id){
  const list = loadProjects().filter(p => p.id !== id);
  saveProjects(list); return list;
}
export function resetProjects(){ localStorage.removeItem(KEY); return loadProjects(); }

export const ADMIN_PASS = 'admin123';