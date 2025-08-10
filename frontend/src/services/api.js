import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const API_SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY || 'your-super-secret-key';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_SECRET_KEY}`,
  },
});

// Generic GET request
export const get = (endpoint, params = {}) => api.get(endpoint, { params });

// Generic POST request
export const post = (endpoint, data) => api.post(endpoint, data);

// Generic PUT request
export const put = (endpoint, data) => api.put(endpoint, data);

// Generic DELETE request
export const del = (endpoint) => api.delete(endpoint);

// --- Bookmarks ---
export const getBookmarks = (type) => get('/bookmarks', { type });
export const getBookmarkById = (id) => get(`/bookmarks/${id}`);
export const createBookmark = (data) => post('/bookmarks', data);
export const updateBookmark = (id, data) => put(`/bookmarks/${id}`, data);
export const deleteBookmark = (id) => del(`/bookmarks/${id}`);

// --- AI Tags ---
export const suggestTags = (text) => post('/ai/suggest-tags', { text });

// --- Raindrop Sync ---
export const syncRaindrop = () => post('/raindrop/sync');

export default api;
