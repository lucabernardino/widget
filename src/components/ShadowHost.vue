<template>
  <div>
    <NotificationWidget v-if="notificationData" :notifications="notificationData" />
    <Survey
      v-if="survey"
      :survey="survey"
      :customer="customer" 
      :app="app_key" 
      :project_id="project_id"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios';
import Survey from './surveys/Survey.vue';
import NotificationWidget from './NotificationWidget.vue';
import { surveyStore } from '../store/store.vue';

const props = defineProps({
  customer : Number
})

// Reactive reference to hold the notification data
const notificationData = ref(null);
const app_key = ref(null);
const survey = ref(null);

const store = surveyStore()

</script>
