const projects = [];

function addProject() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    
    if(title && desc) {
        projects.push({ title, desc });
        renderProjects();
    }
}

function renderProjects() {
    const list = document.getElementById('projectList');
    list.innerHTML = projects.map(p => `
        <div class="card">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
        </div>
    `).join('');
}
