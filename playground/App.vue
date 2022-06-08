<script setup lang="ts">
import Fuzzy from '../core/Fuzzy/index.vue'
import type { FuzzyHandler } from '../core/Fuzzy/types'
import { config } from './assets/config'

const handler: FuzzyHandler = {
  queryBefore: async() => {
    console.log(11)
  },
}
</script>

<template>
  <div class="w-full h-full box-border bg-light-100">
    <Fuzzy :config="config" :handler="handler" />
  </div>
</template>
<style>
</style>
