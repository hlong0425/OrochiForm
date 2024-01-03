import { AppProvider } from "@shopify/polaris";
import '@shopify/polaris/build/esm/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
