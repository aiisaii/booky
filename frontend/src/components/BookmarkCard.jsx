import React from 'react';

const BookmarkCard = ({ bookmark }) => {
  const renderCardContent = () => {
    switch (bookmark.type) {
      case 'standard':
        return (
          <div>
            <a href={bookmark.standard_data?.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {bookmark.standard_data?.url}
            </a>
            <p className="text-sm text-gray-400 mt-2">{bookmark.standard_data?.description}</p>
          </div>
        );
      case 'people':
        return (
          <div>
            <p className="text-sm text-gray-400">{bookmark.people_data?.bio}</p>
            <div className="flex space-x-4 mt-2">
              {Object.entries(bookmark.people_data?.socialLinks || {}).map(([platform, link]) => (
                <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline capitalize">
                  {platform}
                </a>
              ))}
            </div>
          </div>
        );
      case 'torrent':
        return (
          <div>
            <p className="text-sm text-gray-400">Size: {bookmark.torrent_data?.size || 'N/A'}</p>
            <p className="text-sm text-gray-400">Files: {bookmark.torrent_data?.files?.length || 0}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{bookmark.title}</h3>
        {bookmark.preview_image && <img src={bookmark.preview_image} alt={bookmark.title} className="rounded-md mb-2" />}
        {renderCardContent()}
      </div>
      <div className="mt-4">
        {/* Actions like edit/delete can go here */}
        <button className="text-sm text-gray-400 hover:text-white">Edit</button>
      </div>
    </div>
  );
};

export default BookmarkCard;
