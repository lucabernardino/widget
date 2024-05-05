<script setup>
import axios from 'axios';
import UserNotification from '../UserNotification.vue';
import { surveyStore } from '../../store/store.vue';
const store = surveyStore()
import { ref } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'


const props = defineProps({
  app: String,  // Define 'name' as a prop
  project_id: String,  // Define 'name' as a prop
  customer: String,  // Define 'name' as a prop
  survey: Object,  // Define 'name' as a prop
})

const submitForm = async (selectedSetting) => {
    try {

      if (!selectedSetting) {
        error.value = true
        return false
      }
      else {
        error.value = false
      }

      loading.value = !loading.value

      const response = await axios.post('http://local.dawnvox.com:8000/api/feedback',
        {
          project_id: store.project_id,
          survey_id : store.survey.id,
          user_id : store.user_id,
          dawnvox_user_id : store.dawnvox_user_id,
          content : selectedSetting,
          type: store.survey.type  // Add the selected option to the payload
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.api_key}`
          }
        }
      );

      if (response.status != 200) {
        throw new Error('Network response was not ok.');
      }
      else {
        store.show_notification = true
        store.toggle_show_survey()
      }
      
      // Optionally, handle success (e.g., setting a success message state)
    } catch (error) {
      console.log(error)
    } finally {
      // Optionally, handle any final logic (e.g., cleanup or resetting the form)
    }
}

const settings = props.survey.poll_statements

const selected = ref(null)

const loading = ref(false)
const success = ref(false)
const error = ref(false)
const show_container = ref(true)
</script>
<template>
<div v-if="show_container" class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
  <div class="px-4 py-5 sm:p-6">
    <svg @click="store.toggle_show_survey()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 float-right cursor-pointer">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
    <p class="font-semibold text-sm text-indigo-500">Tell us how you feel</p>
    <h3 class="font-semibold text-lg">{{ survey.statement }}</h3>
    <form action="#" class="relative mt-4">
      <RadioGroup v-model="selected">
    <RadioGroupLabel class="sr-only">Privacy setting</RadioGroupLabel>
    <div class="-space-y-px rounded-md bg-white">
      <RadioGroupOption as="template" v-for="(setting, settingIdx) in settings" :key="setting" :value="setting" v-slot="{ checked, active }">
        <div :class="[settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '', settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '', checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200', 'relative flex cursor-pointer border p-4 focus:outline-none']">
          <span :class="[checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-indigo-600' : '', 'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center']" aria-hidden="true">
            <span class="rounded-full bg-white w-1.5 h-1.5" />
          </span>
          <span class="ml-3 flex items-center">
            <RadioGroupLabel as="span" :class="[checked ? 'text-indigo-900' : 'text-gray-900', 'text-sm font-medium']">
              {{ setting }}
            </RadioGroupLabel>
          </span>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
    </form>
    <div class="mt-6" v-if="!success">
            <button v-if="!loading" @click.prevent="submitForm(selected)" type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
            <button v-if="loading" :disabled="loading" type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Submit
              </span>
            </button>
          </div>
          <div v-if="error" class="text-red-600 text-sm mt-2">Please fill out the form </div>
  </div>
</div>
</template>