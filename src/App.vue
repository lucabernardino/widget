<template>
  <div id="dawn_vox_app">
    <ShadowHost :instance="instance" />
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';


const instance = getCurrentInstance();

// console.log(instance?.appContext.config.globalProperties.$helpers.unique_id())
import ShadowHost from './components/ShadowHost.vue';
</script>
