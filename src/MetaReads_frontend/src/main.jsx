import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CollapsedProvider } from './lib/collapsed_provider';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <CollapsedProvider>
        <App />
      </CollapsedProvider>
    </React.StrictMode>
  );
}
