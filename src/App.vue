<template>
  <div id="dawn_vox_app">
    <Survey
      v-if="store.get_survey"
      :survey="store.get_survey"
      :customer="store.get_customer" 
      :app="store.get_api_key" 
      :project_id="store.get_project_id"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { surveyStore } from '@/store/store.vue';
import Survey from '@/components/surveys/Survey.vue';
import helpers from '@/helpers';
import axios from 'axios';
const store = surveyStore()

const postData = async () => {
  try {
    const response = await axios.post('http://local.dawnvox.com:8000/api/user', 
      {
        project_id: store.get_project_id,
        user_id : store.user_id
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data) {
      // notificationData.value = response.data.notifications;
      store.set_api_key(response.data.app)

      if (response.data.survey.length == 0) {
        store.set_survey(response.data.default_survey)
      }
      else {
        store.set_survey(response.data.survey)
      }
    }
  } catch (error) {
    console.error("Failed to connect to Dawnvox:", error);
  }
};

onMounted(() => {
  postData();
});
</script>
