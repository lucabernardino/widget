<template>
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition-group 
        name="fade"
        enter-active-class="transform ease-out duration-300 transition" 
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" 
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" 
        leave-active-class="transition ease-in duration-100" 
        leave-from-class="opacity-100" 
        leave-to-class="opacity-0">
        <div v-for="(notification, index) in notifications" :key="notification.id" class="pointer-events-auto w-full max-w-sm">
          <div class="p-4 mb-5 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                <p class="mt-1 text-sm text-gray-500">{{ notification.description }}</p>
                <div class="mt-3 flex space-x-7">
                  <button @click="sendNotification(index)" type="button" class="rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-600 shadow-sm hover:bg-green-100">
                    It's working
                  </button>
                  <button type="button" class="rounded-md bg-white text-sm font-medium text-red-700 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">It's not working</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue'
import axios from 'axios'

const props = defineProps({
data: {
  type: Array,
  default: () => []
}
})

const notifications = reactive([...props.data])

const sendNotification = async (index) => {
const notification = notifications[index]
try {
  const response = await axios.post('http://local.dawnvox.com:8000/notifications', {
    title: notification.title,
    description: notification.description
  })
  console.log('Notification sent:', response.data)
  notifications.splice(index, 1)  // Remove the notification from the list after sending
} catch (error) {
  console.error('Error sending notification:', error)
}
}
</script>
