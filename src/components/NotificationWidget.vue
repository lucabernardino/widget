<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition v-for="(notification, index) in notifications" :key="notification.id" enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
            </svg>

              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p v-if="notification.title" class="text-sm font-medium text-gray-900">{{notification.title}}</p>
                <p class="text-sm text-gray-500">{{ notification.message }}</p>
                <div class="mt-3">
                  <button type="button" class="mr-3 rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">Respond</button>
                  <button type="button" class="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-700  ring-inset ring-gray-300 hover:bg-gray-50" @click="removeNotification(index)">Mark as read</button>
                </div>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button @click="removeNotification(index)" type="button" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>



<script setup>
import { ref, watch } from 'vue'
import { InboxIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'

const props = defineProps({
  notifications: Array
})

const notifications = ref([...props.notifications])

watch(() => props.notifications, (newVal) => {
  notifications.value = [...newVal];
}, { deep: true });

const removeNotification = async (index) => {
  const id = notifications.value[index].id;
  try {
    notifications.value.splice(index, 1);  // Remove the notification from the list
    await axios.put(`http://local.dawnvox.com:8000/api/notifications/${id}`);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
</script>
