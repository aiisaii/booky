import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Collections from './pages/Collections';
import People from './pages/People';
import Torrents from './pages/Torrents';
import TagEditorPage from './pages/TagEditorPage';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/people" element={<People />} />
              <Route path="/torrents" element={<Torrents />} />
              <Route path="/ai-tag-editor" element={<TagEditorPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
