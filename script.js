// =========================================================
// NTA · Código compartido por todas las páginas
// =========================================================

// 1) Año automático en el pie de página
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// 2) Menú en celulares (botón ☰)
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? '✕' : '☰';
  });
}

// 3) Marca en rojo la página actual del menú
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu a').forEach(a => {
  if (a.getAttribute('href') === current) a.classList.add('active');
});

// 4) Elementos que aparecen suavemente al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 5) Formulario de cotización: abre WhatsApp con el mensaje armado
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const text =
      `Hola NTA, quisiera una cotización.%0A` +
      `Nombre: ${encodeURIComponent(d.get('nombre'))}%0A` +
      `Empresa: ${encodeURIComponent(d.get('empresa') || '-')}%0A` +
      `Servicio: ${encodeURIComponent(d.get('servicio'))}%0A` +
      `Origen: ${encodeURIComponent(d.get('origen'))} → Destino: ${encodeURIComponent(d.get('destino'))}%0A` +
      `Detalle: ${encodeURIComponent(d.get('mensaje') || '-')}`;
    window.open(`https://wa.me/593994269944?text=${text}`, '_blank');
  });
}
