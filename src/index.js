import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// This is the recommended approach in React 18
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);