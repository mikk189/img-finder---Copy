
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

function cardTemplate({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
  <div class="photo-card">
    <a class="gallery-link" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p><b>Likes:</b> ${likes}</p>
      <p><b>Views:</b> ${views}</p>
      <p><b>Comments:</b> ${comments}</p>
      <p><b>Downloads:</b> ${downloads}</p>
    </div>
  </div>`;
}

function clearGallery(refs) {
  refs.gallery.innerHTML = '';
  if (lightbox) { lightbox.destroy(); lightbox = null; }
}

function renderGallery(hits, refs, append = false) {
  const markup = hits.map(cardTemplate).join('');
  if (!append) refs.gallery.innerHTML = markup;
  else refs.gallery.insertAdjacentHTML('beforeend', markup);
  if (!lightbox) lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
  else lightbox.refresh();
}

export { clearGallery, renderGallery };
