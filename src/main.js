import { createApp, ref } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import './index.css';
import helpers from '@/helpers';
import axios from 'axios';
import { surveyStore } from '@/store/store.vue';

function initVueApp(project_id) {
  const pinia = createPinia();
  const app = createApp(App);

  app.config.globalProperties.$helpers = helpers;

  app.use(pinia)

  const store = surveyStore()
  store.set_project_id(project_id)

  app.mount('#dawn_vox_app');

  window.Dawnvox = {
    async set_event(event_name, user_id = null) {
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
              'Authorization': `Bearer ${window.Dawnvox.api_key}`
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

    },
    async trigger_survey(survey_id) {
      await store.trigger_survey(survey_id);
    }
  }
};

// Check if the config object exists and initialize the app
if (window.Dawnvox && window.Dawnvox.project_id) {
  initVueApp(window.Dawnvox.project_id);
} else {
  console.error('Dawnvox project key missing');
}
