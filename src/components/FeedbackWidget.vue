<script setup>
import { ref } from 'vue';
import ButtonWidget from './ButtonWidget.vue';
import GeneralFeedback from './GeneralFeedback.vue';

const showFeedback = ref(false);

// Toggle function
const toggleFeedback = () => {
  showFeedback.value = !showFeedback.value;
};

const props = defineProps({
  app : String,
  project_id : String,
  customer: String,
  survey: String,
})
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div class="pointer-events-auto ml-auto max-w-xl">
            <ButtonWidget v-if="!showFeedback" @click="toggleFeedback" />
            <GeneralFeedback v-if="showFeedback" 
            :project_id="project_id" 
            :app="app"
            :customer="customer"
            :survey="survey"
            @close="toggleFeedback"  />
      </div>
  </div>
</template>
