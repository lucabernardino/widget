<template>
  <div>
    <NotificationWidget v-if="notificationData" :data="notificationData" />
    <FeedbackWidget :app="app_key" :project_id="project_id" />
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios';
import NotificationWidget from './NotificationWidget.vue';
import FeedbackWidget from './FeedbackWidget.vue';

const props = defineProps({
  instance : Object,
  customer : Object
})

// Reactive reference to hold the notification data
const notificationData = ref(null);
const app_key = ref(null);

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
    }
  } catch (error) {
    console.error("Failed to connect to Dawnvox:", error);
  }
};

onMounted(() => {
  postData();
});

</script>
