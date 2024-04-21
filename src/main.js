import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import helpers from '@/helpers';
import axios from 'axios';

function initVueApp(project_id) {
  const app = createApp(App);

  // Pass configuration settings as a global property
  app.config.globalProperties.$config = { project_id: project_id };

  app.config.globalProperties.$helpers = helpers;

  app.mount('#dawn_vox_app');

  // Expose the event method globally
  window.Dawnvox = {
    async set_event(event_name, user_id = null) {
      // API URL where events are logged
      const apiUrl = 'http://local.dawnvox.com:8000/api/events';
      try {
        const response = await axios.post(apiUrl, 
          {
            project_id: project_id,
            name : event_name,
            user_id : (user_id) ? user_id : helpers.unique_id()
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status != 200) {
          throw new Error('Network response was not ok.');
        }
        else {
          console.log('successful')
        }

      } catch (error) {
        console.error("Failed to connect to Dawnvox:", error);
      }

    }
  };
}

// Check if the config object exists and initialize the app
if (window.Dawnvox && window.Dawnvox.project_id) {
  initVueApp(window.Dawnvox.project_id);
} else {
  console.error('Dawnvox project key missing');
}
