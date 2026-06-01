import { loadProjects, upsertProject, removeProject, resetProjects, ADMIN_PASS } from './data.js';

const root = document.getElementById('root');
const SESSION = 'mm_admin_session';

function toast(msg){
  const t = document.createElement('div'); t.className='toast'; t.textContent=msg;
  document.body.appendChild(t); setTimeout(()=>t.remove(),2500);
}

function renderLogin(){
  root.innerHTML = `
    <div class="login-box">
      <h2>Admin Login</h2>
      <form id="loginForm">
        <label>Password</label>
        <input type="password" id="pw" placeholder="Enter admin password" required />
        <button class="btn btn-primary" style="width:100%;margin-top:14px" type="submit">Login</button>
        <p style="color:var(--muted);font-size:12px;margin-top:14px;text-align:center">Default password: <b>admin123</b></p>
      </form>
    </div>`;
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if(document.getElementById('pw').value === ADMIN_PASS){
      sessionStorage.setItem(SESSION, '1'); renderPanel();
    } else toast('Wrong password');
  });
}

let editingId = null;

function blankForm(){
  editingId = null;
  return {
    id: 'p' + Date.now(),
    title: '', category: '', cover: '', images: '',
    description: '', highlights: ''
  };
}

function projectToForm(p){
  return { ...p, images: (p.images||[]).join('\n'), highlights: (p.highlights||[]).join('\n') };
}

function formToProject(f){
  const imgs = f.images.split('\n').map(s=>s.trim()).filter(Boolean);
  const hl = f.highlights.split('\n').map(s=>s.trim()).filter(Boolean);
  return {
    id: f.id || ('p'+Date.now()),
    title: f.title.trim(),
    category: f.category.trim(),
    cover: f.cover.trim() || imgs[0] || '',
    images: imgs.length ? imgs : (f.cover ? [f.cover.trim()] : []),
    description: f.description.trim(),
    highlights: hl,
  };
}

function renderPanel(form){
  const projects = loadProjects();
  const f = form || blankForm();
  root.innerHTML = `
    <div class="admin-wrap">
      <div class="admin-head">
        <div>
          <h1 style="font-size:24px">Admin Panel</h1>
          <p style="color:var(--muted);font-size:14px">Manage projects shown on your portfolio</p>
        </div>
        <div style="display:flex;gap:8px">
          <a class="btn btn-ghost" href="/" target="_blank">View Site</a>
          <button class="btn btn-ghost" id="resetBtn">Reset to defaults</button>
          <button class="btn btn-primary" id="logoutBtn">Logout</button>
        </div>
      </div>

      <div class="admin-card">
        <h3>${editingId ? 'Edit Project' : 'Add New Project'}</h3>
        <form id="projForm">
          <input type="hidden" name="id" value="${f.id}" />
          <div class="form-row">
            <div><label>Title</label><input name="title" value="${escape(f.title)}" required /></div>
            <div><label>Category</label><input name="category" value="${escape(f.category)}" placeholder="e.g. Poster Design" /></div>
          </div>
          <div class="form-row">
            <div><label>Cover image URL</label><input name="cover" value="${escape(f.cover)}" placeholder="/assets/projects/p1.jpg or https://..." /></div>
            <div><label>Gallery images (one URL per line)</label><textarea name="images" placeholder="One image URL per line">${escape(f.images)}</textarea></div>
          </div>
          <div class="form-row full"><div><label>Description</label><textarea name="description">${escape(f.description)}</textarea></div></div>
          <div class="form-row full"><div><label>Highlights (one per line)</label><textarea name="highlights">${escape(f.highlights)}</textarea></div></div>
          <div style="display:flex;gap:10px;margin-top:12px">
            <button class="btn btn-primary" type="submit">${editingId ? 'Update Project' : 'Add Project'}</button>
            ${editingId ? '<button class="btn btn-ghost" type="button" id="cancelBtn">Cancel</button>' : ''}
          </div>
        </form>
      </div>

      <div class="admin-card">
        <h3>All Projects (${projects.length})</h3>
        <div class="admin-list">
          ${projects.map(p => `
            <div class="admin-item">
              <img src="${p.cover || ''}" alt="" onerror="this.style.opacity=.2"/>
              <div class="info">
                <h4>${escape(p.title)}</h4>
                <p>${escape(p.category||'')}</p>
                <div class="row">
                  <button class="btn-edit" data-edit="${p.id}">Edit</button>
                  <button class="btn-del" data-del="${p.id}">Delete</button>
                  <a class="btn-edit" href="/project.html?id=${encodeURIComponent(p.id)}" target="_blank">View</a>
                </div>
              </div>
            </div>`).join('') || '<p style="color:var(--muted)">No projects yet.</p>'}
        </div>
      </div>
    </div>`;

  document.getElementById('logoutBtn').onclick = () => { sessionStorage.removeItem(SESSION); renderLogin(); };
  document.getElementById('resetBtn').onclick = () => { if(confirm('Reset to default 7 projects?')){ resetProjects(); editingId=null; renderPanel(); toast('Reset done'); } };
  document.getElementById('projForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    if(!data.title){ toast('Title is required'); return; }
    const p = formToProject(data);
    upsertProject(p);
    toast(editingId ? 'Project updated' : 'Project added');
    editingId = null;
    renderPanel();
  });
  const cancel = document.getElementById('cancelBtn'); if(cancel) cancel.onclick = () => { editingId=null; renderPanel(); };
  root.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => {
    const id = b.getAttribute('data-edit');
    const p = loadProjects().find(x => x.id === id);
    editingId = id; renderPanel(projectToForm(p));
    window.scrollTo({top:0,behavior:'smooth'});
  });
  root.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
    const id = b.getAttribute('data-del');
    if(confirm('Delete this project?')){ removeProject(id); toast('Deleted'); renderPanel(); }
  });
}

function escape(s){ return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

if(sessionStorage.getItem(SESSION)) renderPanel(); else renderLogin();