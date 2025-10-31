import { fetchImages } from './fetchImages.js';
import { renderGallery, clearGallery } from './renderGallery.js';
const { alert, info, success } = PNotify;

const refs = {
  form: document.getElementById('search-form'),
  input: document.getElementById('searchQuery'),
  gallery: document.getElementById('gallery'),
  loadMoreBtn: document.getElementById('load-more'),
};

let query = '', page = 1, perPage = 12, totalHits = 0, fetchedHits = 0;

function showInfo(msg) { info({ text: msg, delay: 2000 }); }
function showSuccess(msg) { success({ text: msg, delay: 2000 }); }
function showError(msg) { alert({ text: msg, delay: 3000 }); }

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  const value = refs.input.value.trim();
  if (!value) { showInfo('Введіть пошуковий запит'); return; }
  query = value; page = 1; fetchedHits = 0; refs.loadMoreBtn.hidden = true;
  clearGallery(refs);
  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits || 0;
    if (!data.hits || data.hits.length===0) { showInfo('Нічого не знайдено'); return; }
    renderGallery(data.hits, refs, false);
    fetchedHits += data.hits.length;
    showSuccess(`Знайдено ${totalHits} зображень, показано ${fetchedHits}`);
    if (fetchedHits < totalHits) refs.loadMoreBtn.hidden = false;
  } catch(err) { console.error(err); showError('Помилка запиту'); }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1; refs.loadMoreBtn.disabled = true;
  try {
    const data = await fetchImages(query, page, perPage);
    if (!data.hits || data.hits.length===0) { showInfo('Більше результатів немає'); refs.loadMoreBtn.hidden=true; return; }
    renderGallery(data.hits, refs, true);
    fetchedHits += data.hits.length;
    if (fetchedHits >= totalHits) refs.loadMoreBtn.hidden=true; else refs.loadMoreBtn.hidden=false;
  } catch(err) { console.error(err); showError('Помилка завантаження'); }
  finally { refs.loadMoreBtn.disabled = false; }
});
