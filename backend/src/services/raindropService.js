const axios = require('axios');
require('dotenv').config();

const RAINDROP_API_KEY = process.env.RAINDROP_API_KEY;
const RAINDROP_API_URL = 'https://api.raindrop.io/rest/v1';

const api = axios.create({
  baseURL: RAINDROP_API_URL,
  headers: {
    'Authorization': `Bearer ${RAINDROP_API_KEY}`,
  },
});

/**
 * Creates a new bookmark in Raindrop.io.
 * @param {object} bookmarkData - The bookmark data to create.
 * @param {string} bookmarkData.url - The URL of the bookmark.
 * @param {string} [bookmarkData.title] - The title of the bookmark.
 * @param {string[]} [bookmarkData.tags] - An array of tags.
 * @returns {Promise<object>} The created bookmark from the Raindrop.io API.
 */
const createRaindrop = async (bookmarkData) => {
  if (!RAINDROP_API_KEY) {
    throw new Error('Raindrop API key is not configured.');
  }
  try {
    const response = await api.post('/raindrop', bookmarkData);
    return response.data;
  } catch (error) {
    console.error('Error creating Raindrop bookmark:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create Raindrop bookmark.');
  }
};

/**
 * Fetches all bookmarks from Raindrop.io.
 * @returns {Promise<object[]>} An array of bookmarks from the Raindrop.io API.
 */
const getRaindrops = async () => {
    if (!RAINDROP_API_KEY) {
        throw new Error('Raindrop API key is not configured.');
    }
    try {
        const response = await api.get('/raindrops/0'); // 0 is the default "Unsorted" collection
        return response.data.items;
    } catch (error) {
        console.error('Error fetching Raindrop bookmarks:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch Raindrop bookmarks.');
    }
};

module.exports = {
  createRaindrop,
  getRaindrops,
};
