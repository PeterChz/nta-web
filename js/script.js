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
  // Al elegir una opción en el celular, el menú se cierra
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }));
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
    const lines = [
      'Hola NTA, quisiera una cotización.',
      `Nombre: ${d.get('nombre')}`,
      `Empresa: ${d.get('empresa') || '-'}`,
      `Servicio: ${d.get('servicio')}`,
      `Origen: ${d.get('origen')} | Destino: ${d.get('destino')}`,
      `Detalle: ${d.get('mensaje') || '-'}`
    ];
    // encodeURIComponent se aplica una sola vez, al mensaje completo
    window.open(`https://wa.me/593994269944?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  });
}

// 6) Botón de modo claro / oscuro (la elección se guarda en el navegador)
const themeBtn = document.querySelector('.theme-toggle');
const root = document.documentElement;
function applyTheme(theme, save) {
  root.setAttribute('data-theme', theme);
  if (themeBtn) themeBtn.setAttribute('aria-label', theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
  if (save) { try { localStorage.setItem('nta-theme', theme); } catch (e) {} }
}
applyTheme(root.getAttribute('data-theme') || 'dark', false);
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
  });
}
// Si la persona no eligió un tema, la página sigue el modo del sistema
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  let saved = null;
  try { saved = localStorage.getItem('nta-theme'); } catch (err) {}
  if (!saved) applyTheme(e.matches ? 'light' : 'dark', false);
});
