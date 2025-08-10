import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navLinkClasses = "flex items-center px-4 py-2 mt-5 text-gray-400 hover:bg-gray-700 hover:text-gray-100 rounded-md";
  const activeLinkClasses = "bg-gray-700 text-white";

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-700">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold text-2xl">Vaultify</span>
      </div>
      <nav className="flex-1 px-2 py-4">
        <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/collections" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          Collections
        </NavLink>
        <NavLink to="/people" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          People
        </NavLink>
        <NavLink to="/torrents" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          Torrents
        </NavLink>
        <NavLink to="/ai-tag-editor" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
          AI Tag Editor
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
