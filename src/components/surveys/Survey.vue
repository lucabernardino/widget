<script setup>
import { ref } from 'vue';
import ButtonWidget from '../ButtonWidget.vue';
import CollectFeedback from './CollectFeedback.vue';
import CollectPoll from './CollectPoll.vue';

// Toggle function
const toggleFeedback = () => {
  showFeedback.value = !showFeedback.value;
};

const props = defineProps({
  app : String,
  project_id : String,
  customer: Number,
  survey: Object,
})

const show_or_not = (survey) => {
    if (survey.default) {
        const randomChance = Math.floor(Math.random() * 5); // Generates a number from 0 to 4
        if (randomChance === 0) { // Has a 1 in 5 chance to be true (20% probability)
            return true;
        }

        return false;
    }

    return true
}

const showFeedback = ref(show_or_not(props.survey));
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6" v-if="!showFeedback && !$surveyTriggered.value">
    <div class="pointer-events-auto ml-auto max-w-48 rounded-xl">
      <ButtonWidget @click="toggleFeedback" />
    </div>
  </div>
  <div class="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
      <div class="pointer-events-auto ml-auto max-w-xl">
            <CollectPoll 
              v-if="showFeedback && survey.type == 'poll'"
              :project_id="project_id" 
              :app="app"
              :customer="customer"
              :survey="survey"
              @close="toggleFeedback"  
            />

            <CollectFeedback 
              v-if="showFeedback && survey.type == 'qa'"
              :project_id="project_id" 
              :app="app"
              :customer="customer"
              :survey="survey"
              @close="toggleFeedback"  
            />
      </div>
  </div>
</template>
