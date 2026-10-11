const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
$('#year').textContent = new Date().getFullYear();

// Mobile navigation
$('#menuToggle').addEventListener('click', () => {
  const nav = $('#nav');
  const open = nav.classList.toggle('open');
  $('#menuToggle').setAttribute('aria-expanded', String(open));
});
$$('#nav a').forEach(a => a.addEventListener('click', () => {
  $('#nav').classList.remove('open');
  $('#menuToggle').setAttribute('aria-expanded', 'false');
}));

// Gentle reveal animations
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
$$('.reveal').forEach(el => revealObserver.observe(el));

// Gallery filters
$$('.filter').forEach(btn => btn.addEventListener('click', () => {
  $$('.filter').forEach(b => b.classList.toggle('active', b === btn));
  const chosen = btn.dataset.filter;
  $$('.photo-card').forEach(card => {
    card.classList.toggle('hidden', chosen !== 'all' && card.dataset.category !== chosen);
  });
}));

// Image lightbox
const lightbox = $('#lightbox');
$$('.photo-open').forEach(btn => btn.addEventListener('click', () => {
  const img = $('img', btn.closest('.photo'));
  $('#lightboxImg').src = img.src;
  $('#lightboxImg').alt = img.alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}));
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}
$('#lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Simple built-in editor: edit text inline and replace image files.
const EDIT_KEY = 'framePortfolioEdits_v1';
const editableTextSelectors = [
  '.brand > span:last-child', '.hero h1', '.hero-description', '.hero-note',
  '.section-heading h2', '.section-intro', '.about h2', '.about-lead',
  '.about-body', '.signature', '.contact h2', '.contact-top > p:not(.eyebrow)',
  '.photo-meta h3', '.photo-meta p', '.image-label'
];
let editMode = false;
let currentImage = null;
const imagePicker = $('#imagePicker');

function setEditMode(on) {
  editMode = on;
  document.body.classList.toggle('edit-mode', on);
  $('#editToggle').setAttribute('aria-pressed', String(on));
  $('#editToggle').innerHTML = on ? '<span>✳</span> Exit edit mode' : '<span>✳</span> Edit website';
  editableTextSelectors.forEach(selector => $$(selector).forEach(el => {
    if (on) {
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('spellcheck', 'true');
    } else {
      el.removeAttribute('contenteditable');
      el.removeAttribute('spellcheck');
    }
  }));
  $$('.image-editable').forEach(el => {
    el.setAttribute('title', on ? 'Click to replace this image' : '');
  });
}
$('#editToggle').addEventListener('click', () => setEditMode(!editMode));

$$('.image-editable').forEach(el => el.addEventListener('click', e => {
  if (!editMode) return;
  if (e.target.closest('button')) return;
  currentImage = $('img', el);
  imagePicker.click();
}));
imagePicker.addEventListener('change', () => {
  const file = imagePicker.files && imagePicker.files[0];
  if (!file || !currentImage) return;
  if (!file.type.startsWith('image/')) return alert('Please choose an image file.');
  const reader = new FileReader();
  reader.onload = () => {
    currentImage.src = reader.result;
    currentImage.dataset.localImage = 'true';
  };
  reader.readAsDataURL(file);
  imagePicker.value = '';
});

function collectEdits() {
  const text = [];
  editableTextSelectors.forEach(selector => {
    $$(selector).forEach(el => text.push({selector, index: $$(selector).indexOf(el), html: el.innerHTML}));
  });
  const images = $$('.image-editable img').map((img, index) => ({
    index, src: img.src, alt: img.alt, local: img.dataset.localImage === 'true'
  }));
  return {text, images, email: $('#emailLink').getAttribute('href'), instagram: $('#instagramLink').getAttribute('href')};
}
function applyEdits(data) {
  if (!data) return;
  (data.text || []).forEach(item => {
    const el = $$(item.selector)[item.index];
    if (el && typeof item.html === 'string') el.innerHTML = item.html;
  });
  (data.images || []).forEach(item => {
    const img = $$('.image-editable img')[item.index];
    if (img && item.src && !item.local) img.src = item.src;
    if (img && item.alt) img.alt = item.alt;
    // Browser storage can keep local image data, but those changes only live on this device.
    if (img && item.local && item.src.startsWith('data:')) img.src = item.src;
  });
  if (data.email) $('#emailLink').href = data.email;
  if (data.instagram) $('#instagramLink').href = data.instagram;
}
try { applyEdits(JSON.parse(localStorage.getItem(EDIT_KEY) || 'null')); } catch (e) { console.warn('Saved edits could not be loaded.'); }

$('#saveChanges').addEventListener('click', () => {
  try {
    localStorage.setItem(EDIT_KEY, JSON.stringify(collectEdits()));
    alert('Saved in this browser! To publish the changes for everyone, update the website files and upload them again. See README for details.');
  } catch (e) {
    alert('Your browser storage is full. Large photos should be added to the images folder and linked in index.html instead.');
  }
});
$('#cancelEdit').addEventListener('click', () => setEditMode(false));

// Make contact links easy to change from the editor with a quick prompt.
$('#emailLink').addEventListener('contextmenu', e => {
  if (!editMode) return;
  e.preventDefault();
  const current = $('#emailLink').href.replace('mailto:', '');
  const email = prompt('Enter your contact email:', current);
  if (email && email.includes('@')) $('#emailLink').href = 'mailto:' + email.trim();
});
$('#instagramLink').addEventListener('contextmenu', e => {
  if (!editMode) return;
  e.preventDefault();
  const url = prompt('Enter your Instagram profile URL:', $('#instagramLink').href);
  if (url && /^https?:\/\//i.test(url)) $('#instagramLink').href = url.trim();
});
