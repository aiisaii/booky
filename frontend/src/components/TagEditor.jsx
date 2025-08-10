import React, { useState } from 'react';
import * as api from '../services/api';

const TagEditor = ({ tags, setTags, textForSuggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleGetSuggestions = async () => {
    if (!textForSuggestions) return;
    setLoadingSuggestions(true);
    try {
      const response = await api.suggestTags(textForSuggestions);
      const suggestedTags = response.data.data;
      // Add only new tags
      const newTags = suggestedTags.filter(t => !tags.includes(t));
      setTags([...tags, ...newTags]);
    } catch (error) {
      console.error("Failed to get AI tag suggestions", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <div key={tag} className="bg-blue-600 px-3 py-1 rounded-full flex items-center">
            <span>{tag}</span>
            <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-white font-bold">x</button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          placeholder="Add a tag"
          className="flex-grow bg-gray-700 p-2 rounded"
        />
        <button onClick={handleAddTag} className="bg-gray-600 px-4 py-2 rounded">Add</button>
      </div>
      <div className="mt-2">
        <button onClick={handleGetSuggestions} disabled={loadingSuggestions || !textForSuggestions} className="text-sm text-blue-400 hover:underline disabled:opacity-50">
          {loadingSuggestions ? 'Getting suggestions...' : 'Get AI Suggestions'}
        </button>
      </div>
    </div>
  );
};

export default TagEditor;
