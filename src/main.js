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
    async set_event(event_name) {
      store.set_event(event_name)
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
