import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './Context/ThemeContext'; // Import the ThemeProvider
import './i18n';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider> {/* Wrap the App component with ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
