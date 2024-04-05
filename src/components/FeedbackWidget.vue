<script setup>
import { ref } from 'vue';
import ButtonWidget from './ButtonWidget.vue';
import GeneralFeedback from './GeneralFeedback.vue';

const showFeedback = ref(false);

// Toggle function
const toggleFeedback = () => {
  showFeedback.value = !showFeedback.value;
};
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div class="pointer-events-auto ml-auto max-w-xl">
            <ButtonWidget v-if="!showFeedback" @click="toggleFeedback" />
            <GeneralFeedback v-if="showFeedback" @close="toggleFeedback" />
      </div>
  </div>
</template>
