
import '../css/styles.css';
import { fetchImages } from './fetchImages.js';
import { renderGallery, clearGallery } from './renderGallery.js';
import { alert, info, success } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  form: document.getElementById('search-form'),
  input: document.getElementById('searchQuery'),
  gallery: document.getElementById('gallery'),
  loadMoreBtn: document.getElementById('load-more'),
};

let query = '', page = 1, PER_PAGE = 12, totalHits = 0, fetchedHits = 0;

function showInfo(message) { info({ text: message, delay: 2000 }); }
function showSuccess(message) { success({ text: message, delay: 2000 }); }
function showError(message) { alert({ text: message, delay: 3000 }); }

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  const value = refs.input.value.trim();
  if (!value) { showInfo('Введіть пошуковий запит, будь ласка.'); return; }
  query = value; page = 1; fetchedHits = 0; refs.loadMoreBtn.hidden = true;
  clearGallery(refs);
  try {
    const data = await fetchImages(query, page, PER_PAGE);
    totalHits = data.totalHits || 0;
    if (!data.hits || data.hits.length === 0) { showInfo('На жаль, нічого не знайдено.'); return; }
    renderGallery(data.hits, refs, false);
    fetchedHits += data.hits.length;
    showSuccess(`Знайдено ${totalHits} зображень. Показано ${fetchedHits}.`);
    if (fetchedHits < totalHits) refs.loadMoreBtn.hidden = false; else refs.loadMoreBtn.hidden = true;
  } catch (err) { console.error(err); showError('Помилка запиту.'); }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1; refs.loadMoreBtn.disabled = true;
  try {
    const data = await fetchImages(query, page, PER_PAGE);
    if (!data.hits || data.hits.length === 0) { showInfo('Більше результатів не знайдено.'); refs.loadMoreBtn.hidden = true; return; }
    renderGallery(data.hits, refs, true); fetchedHits += data.hits.length;
    if (fetchedHits >= totalHits) refs.loadMoreBtn.hidden = true; else refs.loadMoreBtn.hidden = false;
  } catch (err) { console.error(err); showError('Помилка при завантаженні.'); }
  finally { refs.loadMoreBtn.disabled = false; }
});
