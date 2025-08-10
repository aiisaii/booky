import React from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import BookmarkCard from '../components/BookmarkCard';

const Dashboard = () => {
  const { bookmarks, loading, error } = useBookmarks();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

      {loading && <p className="text-gray-400">Loading bookmarks...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
       {!loading && bookmarks.length === 0 && (
        <p className="text-gray-400">No bookmarks yet. Add one to get started!</p>
      )}
    </div>
  );
};

export default Dashboard;
