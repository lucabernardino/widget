<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import CollectFeedback from './CollectFeedback.vue';
import CollectPoll from './CollectPoll.vue';
import { surveyStore } from '../../store/store.vue';

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

const store = surveyStore()

</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div class="pointer-events-auto ml-auto max-w-xl">
            <CollectPoll 
              v-if="store.get_survey && store.get_survey.type == 'poll'"
              :project_id="store.get_project_id" 
              :app="store.get_api_key"
              :customer="customer"
              :survey="store.get_survey"
              @close="toggleFeedback"  
            />

            <CollectFeedback 
              v-if="store.get_survey && store.get_survey.type == 'qa'"
              :project_id="store.get_project_id" 
              :app="store.get_api_key"
              :customer="customer"
              :survey="store.get_survey"
              @close="toggleFeedback"  
            /> 
      </div>
  </div>
</template>
