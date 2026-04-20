import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app/globals.css'; // File CSS toàn cục của bạn

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);