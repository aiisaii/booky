import axios from 'axios';

// The VITE_ variables will be replaced by Vite during the build process.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const API_SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY || 'your-super-secret-key';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_SECRET_KEY}`,
  },
});

export const createBookmark = (data) => api.post('/bookmarks', data);

export default api;
