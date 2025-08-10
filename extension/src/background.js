import * as api from './services/api';

// Create the context menu when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'vaultify-save-page',
    title: 'Save Page to Vaultify',
    contexts: ['page'],
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'vaultify-save-page') {
    console.log('Saving page to Vaultify:', tab.title, tab.url);

    const bookmarkData = {
      title: tab.title,
      type: 'standard',
      standard_data: {
        url: tab.url,
        description: '', // Context menu doesn't have access to page content directly
      },
      notes: `Saved from Chrome context menu on ${new Date().toISOString()}`,
    };

    try {
      // Attempt to save to the backend API
      await api.createBookmark(bookmarkData);
      console.log('Bookmark saved successfully via API.');

      // Optional: Show a notification to the user
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/icon48.png',
        title: 'Vaultify',
        message: `Bookmark "${tab.title}" saved successfully!`,
      });

    } catch (error) {
      console.error('Failed to save bookmark via API. Saving to local storage for later.', error);

      // If API fails, save to local storage for later sync
      chrome.storage.local.get({ pendingBookmarks: [] }, (result) => {
        const pending = [...result.pendingBookmarks, bookmarkData];
        chrome.storage.local.set({ pendingBookmarks: pending });
      });

      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/icon48.png',
        title: 'Vaultify - Offline',
        message: `Could not connect to backend. Bookmark saved locally and will sync later.`,
      });
    }
  }
});

// Optional: Add a listener for when the browser comes online to sync pending bookmarks
chrome.runtime.onStartup.addListener(() => {
  // In a real app, you'd attempt to sync pending bookmarks here
  console.log('Browser started. Check for pending bookmarks to sync.');
});

console.log('Vaultify background service worker started.');
