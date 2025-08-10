import React from 'react';
import ReactDOM from 'react-dom/client';
import QuickAddForm from './components/QuickAddForm';
import './index.css'; // Assuming you might add some global styles

const Popup = () => {
  return (
    <div style={{ width: '350px' }} className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Vaultify</h1>
        {/* Link to open the full dashboard */}
        <a href={import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000'} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:underline">
          Open Dashboard
        </a>
      </div>
      <QuickAddForm />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
