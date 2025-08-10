import React, { useState, useEffect } from 'react';

const BookmarkEditor = ({ bookmark, onSave, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [type, setType] = useState('standard');

  useEffect(() => {
    if (bookmark) {
      setFormData(bookmark);
      setType(bookmark.type);
    } else {
      setFormData({ title: '', notes: '' });
      setType('standard');
    }
  }, [bookmark]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [`${type}_data`]: {
            ...prev[`${type}_data`],
            [name]: value
        }
    }));
  }

  const handleSave = () => {
    onSave({ ...formData, type });
  };

  const renderTypeSpecificFields = () => {
    switch (type) {
        case 'standard':
            return (
                <input name="url" value={formData.standard_data?.url || ''} onChange={handleDataChange} placeholder="URL" className="w-full bg-gray-700 p-2 rounded mt-2"/>
            );
        case 'people':
            return (
                <input name="bio" value={formData.people_data?.bio || ''} onChange={handleDataChange} placeholder="Bio" className="w-full bg-gray-700 p-2 rounded mt-2"/>
            );
        case 'torrent':
            return (
                <input name="magnetLink" value={formData.torrent_data?.magnetLink || ''} onChange={handleDataChange} placeholder="Magnet Link" className="w-full bg-gray-700 p-2 rounded mt-2"/>
            )
        default:
            return null;
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">{bookmark ? 'Edit Bookmark' : 'Create Bookmark'}</h2>

        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-gray-700 p-2 rounded mb-4">
            <option value="standard">Standard</option>
            <option value="people">People</option>
            <option value="torrent">Torrent</option>
        </select>

        <input name="title" value={formData.title || ''} onChange={handleChange} placeholder="Title" className="w-full bg-gray-700 p-2 rounded"/>

        {renderTypeSpecificFields()}

        <textarea name="notes" value={formData.notes || ''} onChange={handleChange} placeholder="Notes" className="w-full bg-gray-700 p-2 rounded mt-4 h-32"/>

        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="bg-gray-600 px-4 py-2 rounded mr-2">Cancel</button>
          <button onClick={handleSave} className="bg-blue-600 px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkEditor;
