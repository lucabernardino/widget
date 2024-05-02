import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import './index.css';
import helpers from '@/helpers';
import { surveyStore } from '@/store/store.vue';

function initVueApp(project_id, user_id) {
  const pinia = createPinia();
  const app = createApp(App);

  app.config.globalProperties.$helpers = helpers;

  app.use(pinia)

  const store = surveyStore()
  const dawnvox_user_id = helpers.unique_id()
  const unique_user_id = user_id
  store.set_project_id(project_id)
  store.set_user_id(unique_user_id)
  store.set_dawnvox_user_id(dawnvox_user_id)

  app.mount('#dawn_vox_app');

  window.Dawnvox = {
    async set_event(event_name) {
      store.set_event(event_name)
    },
    set_user_id(user_id) {
      store.set_user_id(user_id);
      return store.get_user_id
    },
    get_user_id() {
      return store.get_user_id;
    },
    update_user(user_id, data) {
      if ((typeof data === 'undefined') || typeof data.name === 'undefined' && typeof data.email === 'undefined') return false;

      store.update_user(user_id, data);
      return data
    },
    async trigger_survey(survey_id) {
      await store.trigger_survey(survey_id);
    }
  }
};

// Check if the config object exists and initialize the app
if (window.Dawnvox && window.Dawnvox.project_id) {
  initVueApp(window.Dawnvox.project_id, window.Dawnvox.user_id);
} else {
  console.error('Dawnvox project key missing');
}
