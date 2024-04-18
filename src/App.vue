<template>
  <div id="dawn_vox_app">
    <ShadowHost :instance="instance" :customer="customer" />
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';


const instance = getCurrentInstance();
const customer = helpers.unique_id()
import ShadowHost from './components/ShadowHost.vue';
import helpers from '@/helpers';
</script>
