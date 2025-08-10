import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Search bar can go here */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring"
          />
        </div>
        {/* User profile section can go here */}
        <div className="flex items-center">
          <button className="text-white">Add New</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
