const STORAGE_KEY = 'wds_projects_v2';

let projects = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

/* ====== PORTFOLIO ====== */

function displayProjects() {
  const list = document.getElementById('projectList');
  if (!list) return;

  const countEl = document.getElementById('project-count');
  const statEl = document.getElementById('stat-projects');

  if (countEl) countEl.textContent = projects.length + ' realizacji';
  if (statEl) animateCount(statEl, projects.length);

  if (projects.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <p>Brak projektów w portfolio.</p>
        <a href="admin.html">Dodaj pierwszy projekt →</a>
      </div>`;
    return;
  }

  list.innerHTML = projects.map((p, i) => `
    <div class="card" onclick="openModal(${i})">
      <div class="card-img-wrap">
        <img
          src="${escHtml(p.img)}"
          alt="${escHtml(p.title)}"
          onerror="this.src='https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80'"
          loading="lazy">
        <div class="card-overlay">
          <span class="card-overlay-text">Zobacz szczegóły →</span>
        </div>
      </div>
      <div class="card-body">
        ${p.category ? `<span class="card-tag">${escHtml(p.category)}</span>` : ''}
        <h3>${escHtml(p.title)}</h3>
      </div>
    </div>
  `).join('');
}

function openModal(i) {
  const p = projects[i];
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.body.style.overflow = '';
}

function handleModalClick(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ====== ADMIN ====== */

function saveProject() {
  const title    = document.getElementById('pTitle')?.value.trim();
  const img      = document.getElementById('pImg')?.value.trim();
  const desc     = document.getElementById('pDesc')?.value.trim();
  const category = document.getElementById('pCategory')?.value.trim();

  if (!title || !img || !desc) {
    alert('Wypełnij tytuł, URL zdjęcia oraz opis.');
    return;
  }

  try { new URL(img); } catch (_) {
    alert('Podaj prawidłowy URL zdjęcia (zacznij od https://).');
    return;
  }

  projects.push({ title, img, desc, category: category || '' });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  alert('Projekt dodany pomyślnie!');
  window.location.href = 'index.html';
}

function deleteProject(i) {
  if (!confirm(`Usunąć projekt "${projects[i].title}"?`)) return;
  projects.splice(i, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  displayAdminProjects();
}

function displayAdminProjects() {
  const list = document.getElementById('adminProjectList');
  if (!list) return;

  if (projects.length === 0) {
    list.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">Brak projektów.</p>';
    return;
  }

  list.innerHTML = projects.map((p, i) => `
    <div class="admin-card">
      <img
        src="${escHtml(p.img)}"
        alt="${escHtml(p.title)}"
        onerror="this.src='https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80'">
      <div class="admin-card-body">
        <span class="admin-card-title">${escHtml(p.title)}</span>
        <button class="btn-delete" onclick="deleteProject(${i})">Usuń</button>
      </div>
    </div>
  `).join('');
}

/* ====== UTILITIES ====== */

function animateCount(el, target) {
  if (target === 0) { el.textContent = '0'; return; }
  const duration = 1200;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + '+';
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ====== INIT ====== */

document.addEventListener('DOMContentLoaded', () => {
  displayProjects();
  displayAdminProjects();
});
