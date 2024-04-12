<template>
  <div>
    <!-- Conditionally render NotificationWidget if there is data -->
    <NotificationWidget v-if="notificationData" :data="notificationData" />
    <FeedbackWidget />
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests
import NotificationWidget from './NotificationWidget.vue';
import FeedbackWidget from './FeedbackWidget.vue';

// Reactive reference to hold the notification data
const notificationData = ref(null);

// Accessing the global properties safely
const instance = getCurrentInstance();
const apiKey = instance?.appContext.config.globalProperties.$config.apiKey;

const postData = async () => {
  try {
    const response = await axios.post('http://local.dawnvox.com:8000/api/fetch-notification', 
      {
        // Your data payload here
        user_id: 4,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data.notification) {
      notificationData.value = response.data.notification;
    }
  } catch (error) {
    console.error("Failed to fetch notification data:", error);
    // Handle error appropriately
  }
};

onMounted(() => {
  postData();
});

</script>
