import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#e2e8f0',
            border: '1px solid #2a2a3e',
            fontFamily: '"Space Grotesk", sans-serif',
          },
          success: {
            iconTheme: { primary: '#00ff88', secondary: '#0a0a0f' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#0a0a0f' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);