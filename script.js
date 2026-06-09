const projects = [
    { title: "Ultra Shop", desc: "Szybki sklep zintegrowany z systemem płatności." },
    { title: "Landing Page", desc: "Konwersyjna strona typu One-Page dla startupu." },
    { title: "Custom UI", desc: "Nowoczesny interfejs stworzony od zera w CSS." }
];

const list = document.getElementById('projectList');
list.innerHTML = projects.map(p => `
    <div class="card">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
    </div>
`).join('');
