<template>
  <div>
    <Survey
      v-if="survey"
      :survey="survey"
      :customer="customer" 
      :app="app_key" 
      :project_id="project_id"
    />
    <NotificationWidget v-if="notificationData" :data="notificationData" />
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios';
import Survey from './surveys/Survey.vue';

const props = defineProps({
  instance : Object,
  customer : String
})

// Reactive reference to hold the notification data
const notificationData = ref(null);
const app_key = ref(null);
const survey = ref(null);

// Accessing the global properties safely using getCurrentInstance
const instance = getCurrentInstance();
const globalProperties = instance?.appContext.config.globalProperties;
const project_id = globalProperties?.$config?.project_id;

const postData = async () => {
  try {
    const response = await axios.post('http://local.dawnvox.com:8000/api/user', 
      {
        project_id: project_id,
        customer : props.customer
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data) {
      notificationData.value = response.data.notifications;
      app_key.value = response.data.app


      if (response.data.survey.length == 0) {
        survey.value = response.data.default_survey
      }
      else {
        survey.value = response.data.survey
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
