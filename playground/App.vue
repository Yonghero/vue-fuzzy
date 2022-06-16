<script setup lang="ts">
import Fuzzy from '../core/Fuzzy/index.vue'
import type { FuzzyHandler } from '../core/Fuzzy/types'
import { singleConfig } from './assets/config'

const handler: FuzzyHandler = {
  queryBefore: async({ data }) => {
    console.log(11)
    data.entName = '22'
    return data
  },
}
</script>

<template>
  <div class="w-full h-full box-border bg-light-100">
    <Fuzzy :config="singleConfig" :handler="handler" />
  </div>
</template>
<style>
</style>
