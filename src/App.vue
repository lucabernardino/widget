<template>
  <div id="dawn_vox_app">
    <ShadowHost :instance="instance" :customer="customer" />
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';


const instance = getCurrentInstance();
const customer = 4543
import ShadowHost from './components/ShadowHost.vue';
</script>
