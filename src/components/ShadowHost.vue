<template>
  <div>
    <!-- Conditionally render NotificationWidget if there is data -->
    <NotificationWidget v-if="notificationData" :data="notificationData" />
    <FeedbackWidget />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests
import NotificationWidget from './NotificationWidget.vue';
import FeedbackWidget from './FeedbackWidget.vue';

// Reactive reference to hold the notification data
const notificationData = ref(null);

const postData = async () => {
  try {
    const response = await axios.post('http://local.dawnvox.com:8000/api/fetch-notification', 
      {
        // Your data payload here
        user_id: 4,
      },
      {
        headers: {
          'Authorization': 'Bearer 1YEQd7jramJQJKDYS6015rpc1O1xJhXiwueH9bKm50426279',
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
  // postData();
});

</script>
