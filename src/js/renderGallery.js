export function renderGallery(hits, refs, append = false) {
  const markup = hits.map(hit => {
    return `<div class="card">
      <img src="${hit.webformatURL}" alt="${hit.tags}" width="200"/>
      <p>Likes: ${hit.likes}</p>
      <p>Views: ${hit.views}</p>
    </div>`;
  }).join('');
  if (!append) refs.gallery.innerHTML = markup;
  else refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery(refs) {
  refs.gallery.innerHTML = '';
}
