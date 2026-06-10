// Domyślne dane, jeśli nic nie ma w pamięci
const defaultProjects = [
    {
        title: "Outletix",
        img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=1000",
        desc: "Kompleksowy sklep e-commerce Outletix sprzedający przedmioty outletowe AGD z Amazon. Projekt zajął 30 dni intensywnych prac deweloperskich. Klient jest w pełni zadowolony z wdrożenia."
    }
];

// Pobierz projekty z pamięci przeglądarki lub użyj domyślnych
let projects = JSON.parse(localStorage.getItem('myProjects')) || defaultProjects;

// Funkcja zapisywania (dla admin.html)
function saveProject() {
    const title = document.getElementById('pTitle').value;
    const img = document.getElementById('pImg').value;
    const desc = document.getElementById('pDesc').value;

    if(title && desc) {
        projects.push({title, img, desc});
        localStorage.setItem('myProjects', JSON.stringify(projects));
        alert("Projekt dodany! Odśwież stronę portfolio.");
        window.location.href = "index.html";
    }
}

// Funkcja wyświetlania kart (dla index.html)
function displayProjects() {
    const list = document.getElementById('projectList');
    if(!list) return;

    list.innerHTML = projects.map((p, index) => `
        <div class="card" onclick="openModal(${index})">
            <img src="${p.img || 'https://via.placeholder.com/400x200'}" class="card-img">
            <div class="card-body">
                <h3>${p.title}</h3>
                <p>${p.desc.substring(0, 80)}...</p>
            </div>
        </div>
    `).join('');
}

// Obsługa Modala
function openModal(index) {
    const p = projects[index];
    document.getElementById('modalTitle').innerText = p.title;
    document.getElementById('modalDesc').innerText = p.desc;
    document.getElementById('modalImg').src = p.img || 'https://via.placeholder.com/400x200';
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Zamknij modal po kliknięciu poza nim
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) closeModal();
}

document.addEventListener('DOMContentLoaded', displayProjects);