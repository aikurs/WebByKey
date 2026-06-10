let projects = JSON.parse(localStorage.getItem('myProjects')) || [
    
];

function displayProjects() {
    const list = document.getElementById('projectList');
    if(!list) return;
    list.innerHTML = projects.map((p, i) => `
        <div class="card" onclick="openModal(${i})">
            <img src="${p.img}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/400x200'">
            <h3>${p.title}</h3>
        </div>
    `).join('');
}

function openModal(i) {
    document.getElementById('modalTitle').innerText = projects[i].title;
    document.getElementById('modalDesc').innerText = projects[i].desc;
    document.getElementById('modalImg').src = projects[i].img;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }

function saveProject() {
    const title = document.getElementById('pTitle').value;
    const img = document.getElementById('pImg').value;
    const desc = document.getElementById('pDesc').value;
    if(title && img && desc) {
        projects.push({title, img, desc});
        localStorage.setItem('myProjects', JSON.stringify(projects));
        alert("Projekt dodany!");
        window.location.href = "index.html";
    }
}

document.addEventListener('DOMContentLoaded', displayProjects);
