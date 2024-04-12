// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

function initVueApp(apiKey) {
  const app = createApp(App);

  // Pass configuration settings as a global property
  app.config.globalProperties.$config = { apiKey: apiKey };

  app.mount('#dawn_vox_app');
}

// Check if the config object exists and initialize the app
if (window.dawnVoxConfig && window.dawnVoxConfig.apiKey) {
  initVueApp(window.dawnVoxConfig.apiKey);
} else {
  // Initialize with default config if not provided
  console.error('Dawnvox api key missing')
}
