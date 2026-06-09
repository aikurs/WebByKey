const projects = [
    { title: "Sklep eCommerce", desc: "Kompleksowy sklep na WooCommerce z szybką płatnością." },
    { title: "Strona Wizytówka", desc: "Responsywna strona dla lokalnego biznesu." },
    { title: "Optymalizacja", desc: "Przyspieszenie strony o 50% i poprawa SEO." },
    { title: "Dashboard", desc: "Autorski panel do zarządzania treścią." }
];

function loadProjects() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = projects.map(p => `
        <div class="card">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadProjects);
