<script setup>
import { ref, computed } from 'vue';
import ButtonWidget from '../ButtonWidget.vue';
import CollectFeedback from './CollectFeedback.vue';
import CollectPoll from './CollectPoll.vue';
import TriggeredSurvey from './TriggeredSurvey.vue';
import { surveyStore } from '@/store/store.vue';
const store = surveyStore()

const props = defineProps({
  app : String,
  project_id : String,
  customer: Number,
  survey: Object,
})

// Toggle function
const toggleFeedback = () => {
  return true
};

store.set_survey_to_customer()

</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div class="pointer-events-auto ml-auto max-w-xl">        
             <CollectPoll 
              v-if="store.show_survey && store.get_survey.type == 'poll'"
              :project_id="store.get_project_id" 
              :app="store.get_api_key"
              :customer="store.get_customer"
              :survey="store.get_survey" 
            />

            <CollectFeedback 
              v-if="store.show_survey && store.get_survey.type == 'qa'"
              :project_id="store.get_project_id" 
              :app="store.get_api_key"
              :customer="store.get_customer"
              :survey="store.get_survey" 
            />

            <ButtonWidget />
      </div>
  </div>
</template>
