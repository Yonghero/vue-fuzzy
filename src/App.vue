<script setup lang="ts">
import Fuzzy from '../core/Fuzzy/index.vue'
import { config } from './assets/config.ts'
</script>

<template>
  <Fuzzy :config="config" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
