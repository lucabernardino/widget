<script>
import axios from 'axios';
import UserNotification from './UserNotification.vue';
export default {
  props: {
    app: String,  // Define 'name' as a prop
    project_id: String,  // Define 'name' as a prop
    customer: String,  // Define 'name' as a prop
    survey: String,  // Define 'name' as a prop
  },
  components: {
    UserNotification // Register the component
  },
  data() {
    return {
      textareaContent: '',
      isLoading: false,
      success: false,
      show_container: true,
      title: 'Feedback received',
      description: 'We really appreciate it',
      textareaClass: 'border-gray-300',
      textareaPlaceholder: 'Share your thoughts'
    };
  },
  methods: {
    submitForm() {
      if (!this.textareaContent) {
        this.textareaClass = 'border-red-500'; // Change border color to red
        this.textareaPlaceholder = 'Please enter some feedback'; 
        return;
      }
      this.isLoading = true; // Start loading
      this.makeApiRequest();
    },
    async makeApiRequest() {
      try {
        const response = await axios.post('http://local.dawnvox.com:8000/api/feedback',
          {
            project_id: this.project_id,
            survey_id : this.survey.id,
            customer_id : this.customer,
            content : this.textareaContent
          },
          {
            headers : {
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.status != 200) {
          throw new Error('Network response was not ok.');
        }
        {
          this.success = true
          this.show_container = false
        }

      } catch (error) {

      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>
<template>
<UserNotification v-if="this.success" :title="this.title" :description="this.description" />
<div v-if="this.show_container" class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
  <div class="px-4 py-5 sm:p-6">
    <p class="font-semibold text-sm text-indigo-500">Tell us how you feel</p>
    <h3 class="font-semibold text-lg">This is the question i am asking?</h3>
    <form action="#" class="relative mt-4">
      <label for="description" class="sr-only">Description</label>
      <textarea :class="textareaClass" v-model="textareaContent" rows="5" name="description" id="description" class="border border-gray-300 rounded-lg p-4 block w-full resize-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" :placeholder="textareaPlaceholder" />
    </form>
  </div>
  <div class="flex justify-end px-4 py-4 sm:px-6">
    <button @click="submitForm" v-if="!isLoading" type="submit" class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Share feedback</button>
    <button @click="submitForm" v-if="isLoading" :disabled="isLoading" type="submit" class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Share feedback
      </span>
    </button>
  </div>
</div>
</template>