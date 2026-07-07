import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <React.StrictMode><App /></React.StrictMode>);
} else {
  createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
}

reportWebVitals();
