<script setup>
import { ref, computed } from 'vue';
import ButtonWidget from '../ButtonWidget.vue';
import CollectFeedback from './CollectFeedback.vue';
import CollectPoll from './CollectPoll.vue';
import { surveyStore } from '@/store/store.vue';
import UserNotification from '../UserNotification.vue';
const store = surveyStore()

const props = defineProps({
  app : String,
  project_id : String,
  customer: Number,
  survey: Object,
})

store.show_or_not()
</script>

<template>
  <UserNotification v-if="store.show_notification" title="Feedback received" description="We really appreciate it" />
  <div class="pointer-events-none fixed inset-x-0 bottom-14 px-6 pb-6">
      <div class="pointer-events-auto ml-auto max-w-xl">
             <CollectPoll 
              v-if="store.get_survey.type == 'poll' && store.get_show_survey"
              :project_id="store.get_project_id" 
              :app="store.get_api_key"
              :customer="store.get_customer"
              :survey="store.get_survey" 
            />

            <CollectFeedback 
              v-if="store.get_survey.type == 'qa' && store.get_show_survey"
              :project_id="store.get_project_id" 
              :app="store.get_api_key"
              :customer="store.get_customer"
              :survey="store.get_survey" 
            />
      </div>
      <div class="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
        <div class="pointer-events-auto ml-auto max-w-40">
        <ButtonWidget @click="store.toggle_show_survey()"  />
      </div>
      </div>
  </div>
</template>
