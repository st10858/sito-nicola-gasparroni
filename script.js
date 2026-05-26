// ============================================================
// SCRIPT.JS — Nicola Gasparroni · Esame di Stato 2026
// Script condiviso da tutte le pagine del sito.
// ============================================================

// === SCROLL REVEAL ===
// Quando un elemento con classe 'reveal' entra nel viewport,
// aggiunge la classe 'visible' che in CSS sblocca l'animazione
// (opacity e translateY). Usato per far apparire i contenuti
// gradualmente durante lo scroll.
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Piccolo ritardo progressivo per gli elementi figli (effetto a cascata)
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target); // smette di osservare dopo l'animazione
        }
    });
}, { threshold: 0.1 });

// Collega l'observer a tutti gli elementi con classe .reveal
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// === HEADER SHADOW ON SCROLL ===
// Aggiunge un'ombra alla navbar quando l'utente scrolla verso il basso,
// per dare profondità visiva e separare header dal contenuto.
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.boxShadow = window.scrollY > 10
            ? '0 4px 20px rgba(0,0,0,0.4)'
            : 'none';
    }
});


// === TABS PASSIONI ===
// Gestione dei bottoni tab nella pagina passioni.html.
// Al click su un .tab-btn:
//   1. Toglie 'active' da tutti i bottoni e lo aggiunge a quello cliccato
//   2. Nasconde tutti i .passione-panel, mostra quello col data-target corrispondente
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target; // legge data-target dal bottone

        // Aggiorna stato attivo dei bottoni
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Mostra il pannello giusto, nasconde gli altri
        document.querySelectorAll('.passione-panel').forEach(p => p.classList.remove('active'));
        const panel = document.getElementById('panel-' + target);
        if (panel) panel.classList.add('active');
    });
});


// === MODALE MATERIE ===
// Mostra una modale con titolo e descrizione di una materia.
// apriModale() è chiamata direttamente dall'HTML con onclick.
function apriModale(titolo, descrizione) {
    document.getElementById('modal-titolo').innerText = titolo;
    document.getElementById('modal-descrizione').innerText = descrizione;
    document.getElementById('modale-materia').classList.add('open');
    document.body.style.overflow = 'hidden'; // blocca lo scroll di sfondo
}

// chiudiModale() rimuove la classe open e ripristina lo scroll
function chiudiModale() {
    document.getElementById('modale-materia').classList.remove('open');
    document.body.style.overflow = '';
}

// Chiude la modale cliccando sull'overlay scuro (fuori dal box)
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modale-materia');
    if (modal && e.target === modal) chiudiModale();
});

// Chiude la modale premendo Escape (accessibilità da tastiera)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') chiudiModale();
});


// === SMOOTH SCROLL ===
// Per i link interni (#ancora), scorri in modo fluido
// compensando l'altezza della navbar fissa (64px).
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
