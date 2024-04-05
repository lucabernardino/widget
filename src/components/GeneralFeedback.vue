<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <form action="#" class="relative">
        <!-- Cross Icon button -->
        <div class="absolute top-0 right-0 pt-4 pr-4">
      <button type="button" @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <div class="p-3 overflow-hidden rounded-lg border border-gray-300 rounded-lg bg-white shadow-lg focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
      General feedback
      <label for="description" class="sr-only">Description</label>
      <textarea rows="5" name="description" id="description" class="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Tell us how you feel about the product..." />

      <!-- Spacer element to match the height of the toolbar -->
      <div aria-hidden="true">
        <div class="py-2">
          <div class="h-9" />
        </div>
        <div class="h-px" />
        <!-- <div class="py-2">
          <div class="py-px">
            <div class="h-9" />
          </div>
        </div> -->
      </div>
    </div>

    <div class="absolute inset-x-px bottom-0">
      <div class="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">

      </div>
      <div class="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
        <div class="flex-shrink-0">
          <button type="submit" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/20/solid';
</script>