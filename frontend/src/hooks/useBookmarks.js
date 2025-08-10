import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import * as api from '../services/api';

export const useBookmarks = (type = null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Subscribe to live changes in the Dexie table
  const bookmarks = useLiveQuery(
    () => {
      const query = type ? db.bookmarks.where('type').equals(type) : db.bookmarks;
      return query.toArray();
    },
    [type], // Rerun query if type changes
    [] // Default value
  );

  useEffect(() => {
    const fetchAndCache = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch fresh data from the API
        const response = await api.getBookmarks(type);
        const freshBookmarks = response.data.data;

        // Clear existing cache for this type and add new data
        await db.transaction('rw', db.bookmarks, async () => {
          if (type) {
            const keysToDelete = await db.bookmarks.where('type').equals(type).primaryKeys();
            await db.bookmarks.bulkDelete(keysToDelete);
          } else {
            // If no type, clear the whole table (for initial full fetch)
            await db.bookmarks.clear();
          }
          await db.bookmarks.bulkAdd(freshBookmarks);
        });

      } catch (e) {
        console.error('Failed to fetch bookmarks:', e);
        setError('Failed to load bookmarks. Showing offline data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndCache();
  }, [type]); // Refetch when the type filter changes

  return { bookmarks, loading, error };
};
