<template>
  <div class="text-right">
    <button 
      type="button" 
      :class="['inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600', { 'animate-bounce': isBouncing }]"
    >
      Share feedback
      <CheckCircleIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/20/solid'

const isBouncing = ref(false);

onMounted(() => {
  const delay = Math.random() * 5000; // Random delay up to 5 seconds.
  setTimeout(() => {
    isBouncing.value = true;
    setTimeout(() => {
      isBouncing.value = false;
    }, 5000);
  }, delay);
});
</script>
