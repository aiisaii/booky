import React from 'react';
import BookmarkCard from './BookmarkCard';

const TorrentCard = ({ torrent }) => {
  // Assuming the 'torrent' prop has the same structure as a 'torrent' type bookmark
  return <BookmarkCard bookmark={torrent} />;
};

export default TorrentCard;
