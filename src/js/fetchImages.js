export async function fetchImages(query, page=1, perPage=12) {
  const API_KEY = 'YOUR_PIXABAY_API_KEY';
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await fetch(URL);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}
