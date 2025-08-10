import React from 'react';
import BookmarkCard from './BookmarkCard';

const PeopleCard = ({ person }) => {
  // Assuming the 'person' prop has the same structure as a 'people' type bookmark
  return <BookmarkCard bookmark={person} />;
};

export default PeopleCard;
