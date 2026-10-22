'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav-links');
menu.hidden = false;
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
function openLinkedStudy() {
  const target = document.getElementById(location.hash.slice(1));
  if (target instanceof HTMLDetailsElement) { target.open = true; target.scrollIntoView({ block: 'start' }); }
}
window.addEventListener('hashchange', openLinkedStudy);
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => { const target = document.getElementById(link.hash.slice(1)); if (target instanceof HTMLDetailsElement) target.open = true; }));
openLinkedStudy();
const dialog = document.querySelector('.evidence-dialog');
const photo = dialog.querySelector('img');
const status = dialog.querySelector('.image-status');
let evidenceTrigger;
let previousOverflow = '';
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-evidence]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); evidenceTrigger = link;
    dialog.querySelector('#evidence-title').textContent = link.dataset.evidence;
    photo.alt = link.dataset.evidence; photo.hidden = true;
    status.textContent = 'Loading project evidence…';
    photo.onload = () => { status.textContent = ''; photo.hidden = false; };
    photo.onerror = () => { status.textContent = 'The image could not load. You can try the original image link below.'; photo.hidden = true; };
    dialog.querySelector('.original-link').href = link.href;
    photo.src = link.href;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; dialog.showModal();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; evidenceTrigger?.focus(); });
}
