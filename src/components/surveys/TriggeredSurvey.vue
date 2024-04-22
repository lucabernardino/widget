<script setup>
import { ref } from 'vue';
import CollectFeedback from './CollectFeedback.vue';
import CollectPoll from './CollectPoll.vue';

// Toggle function
const toggleFeedback = () => {
  showFeedback.value = !showFeedback.value;
};

const props = defineProps({
  app : String,
  project_id : String,
  customer: String,
  survey: Object,
})

const showFeedback = ref(true);
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div class="pointer-events-auto ml-auto max-w-xl">
            <CollectPoll 
              v-if="showFeedback && survey.value.type == 'poll'"
              :project_id="project_id" 
              :app="app"
              :customer="customer"
              :survey="survey.value"
              @close="toggleFeedback"  
            />

            <CollectFeedback 
              v-if="showFeedback && survey.value.type == 'qa'"
              :project_id="project_id" 
              :app="app"
              :customer="customer"
              :survey="survey.value"
              @close="toggleFeedback"  
            />
      </div>
  </div>
</template>
