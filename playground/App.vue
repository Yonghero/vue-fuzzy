<script setup lang="ts">
import Fuzzy from '../core/Fuzzy/index.vue'
import { config } from './assets/config.ts'
</script>

<template>
  <div class="w-full h-full box-border bg-light-100">
    <Fuzzy :config="config" />
  </div>
</template>
<style>
</style>
