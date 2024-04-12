import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

function initVueApp(apiKey) {
  const app = createApp(App);

  // Pass configuration settings as a global property
  app.config.globalProperties.$config = { apiKey: apiKey };

  app.mount('#dawn_vox_app');

  // Expose the event method globally
  window.DawnVox = {
    set_event(eventName) {
      // API URL where events are logged
      const apiUrl = 'https://yourapi.com/events';

      // Make an API call to log the event
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ eventName })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Event logged:', data);
      })
      .catch(error => {
        console.error('Error logging event:', error);
      });
    }
  };
}

// Check if the config object exists and initialize the app
if (window.DawnVox && window.DawnVox.apiKey) {
  initVueApp(window.DawnVox.apiKey);
} else {
  console.error('Dawnvox api key missing');
}
