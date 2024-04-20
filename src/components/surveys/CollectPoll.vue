<script setup>
import UserNotification from '../UserNotification.vue';
import { ref } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'


const props = defineProps({
  app: String,  // Define 'name' as a prop
  project_id: String,  // Define 'name' as a prop
  customer: String,  // Define 'name' as a prop
  survey: Object,  // Define 'name' as a prop
})

const settings = props.survey.poll_statements

const selected = ref(settings[0])

</script>
<template>
<UserNotification v-if="this.success" :title="this.title" :description="this.description" />
<div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
  <div class="px-4 py-5 sm:p-6">
    <p class="font-semibold text-sm text-indigo-500">Tell us how you feel</p>
    <h3 class="font-semibold text-lg">{{ survey.statement }}</h3>
    <form action="#" class="relative mt-4">
      <RadioGroup v-model="selected">
    <RadioGroupLabel class="sr-only">Privacy setting</RadioGroupLabel>
    <div class="-space-y-px rounded-md bg-white">
      <RadioGroupOption as="template" v-for="(setting, settingIdx) in settings" :key="setting.name" :value="setting" v-slot="{ checked, active }">
        <div :class="[settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '', settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '', checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200', 'relative flex cursor-pointer border p-4 focus:outline-none']">
          <span :class="[checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-indigo-600' : '', 'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center']" aria-hidden="true">
            <span class="rounded-full bg-white w-1.5 h-1.5" />
          </span>
          <span class="ml-3 flex flex-col">
            <RadioGroupLabel as="span" :class="[checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium']">{{ setting }}</RadioGroupLabel>
            <!-- <RadioGroupDescription as="span" :class="[checked ? 'text-indigo-700' : 'text-gray-500', 'block text-sm']">{{ setting.description }}</RadioGroupDescription> -->
          </span>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
      <!-- <label for="description" class="sr-only">Description</label> -->
      <!-- <textarea :class="textareaClass" v-model="textareaContent" rows="5" name="description" id="description" class="border border-gray-300 rounded-lg p-4 block w-full resize-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" :placeholder="textareaPlaceholder" /> -->
    </form>
  </div>
  <!-- <div class="flex justify-end px-4 py-4 sm:px-6">
    <button @click="submitForm" v-if="!isLoading" type="submit" class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Share feedback</button>
    <button @click="submitForm" v-if="isLoading" :disabled="isLoading" type="submit" class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Share feedback
      </span>
    </button>
  </div> -->
</div>
</template>