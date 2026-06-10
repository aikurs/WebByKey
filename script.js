const projects = [
    {
        title: "Outletix",
        img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1000",
        desc: "Outlet AGD z Amazon. Projekt zrealizowany w 30 dni. Klient w pełni zadowolony z wdrożenia."
    }
];

function displayProjects() {
    const list = document.getElementById('projectList');
    list.innerHTML = projects.map((p, i) => `
        <div class="card" onclick="openModal(${i})">
            <img src="${p.img}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p>${p.desc.substring(0, 50)}...</p>
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
displayProjects();