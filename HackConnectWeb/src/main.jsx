import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />

  <Toaster
    position="bottom-center"
    toastOptions={{
      duration: 4000,
      style: {
        background: '#6366F1',
        color: '#fff',
        fontSize: '1rem',
        padding: '1rem 1.5rem',
        borderRadius: '0.75rem',
      },
    }}
  />
  </React.StrictMode>
);
