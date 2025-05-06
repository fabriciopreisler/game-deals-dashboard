import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Helmet } from 'react-helmet';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          :root {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                         Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 
                         'Helvetica Neue', sans-serif;
          }
        `}
      </style>
    </Helmet>
    <App />
  </React.StrictMode>
);

reportWebVitals();