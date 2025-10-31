
import axios from 'axios';
export const API_KEY = '53035826-19815b244b6c6156687bcf4fd';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 12) {
  const params = { key: API_KEY, q: query, image_type: 'photo', orientation: 'horizontal', safesearch: true, page, per_page: perPage };
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
