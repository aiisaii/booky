import React, { useState, useEffect } from 'react';
import * as api from '../services/api';

const QuickAddForm = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('standard');
  const [status, setStatus] = useState(''); // '' | 'saving' | 'success' | 'error'

  useEffect(() => {
    // This code runs in the extension's context, where `chrome` is available.
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          setTitle(tabs[0].title);
          setUrl(tabs[0].url);
        }
      });
    } else {
      // For development outside the extension environment
      setTitle('Example Title');
      setUrl('http://example.com');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');

    const bookmarkData = {
      title,
      type,
      standard_data: { url, description: '' },
      notes: '',
    };

    try {
      await api.createBookmark(bookmarkData);
      setStatus('success');
      setTimeout(() => window.close(), 1000); // Close popup on success
    } catch (error) {
      console.error('Failed to save bookmark:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-300">URL</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <button type="submit" disabled={status === 'saving'} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
          {status === 'saving' ? 'Saving...' : 'Add Bookmark'}
        </button>
      </div>
      {status === 'success' && <p className="text-green-500 text-center">Bookmark saved!</p>}
      {status === 'error' && <p className="text-red-500 text-center">Failed to save. Is the backend running?</p>}
    </form>
  );
};

export default QuickAddForm;
