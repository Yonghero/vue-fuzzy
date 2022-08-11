<script setup lang="ts">
import Fuzzy from '../../../core/Fuzzy/index.vue'
import type { FuzzyHandler } from '../../../core/Fuzzy/types/index'
import { singleConfig } from './config'

const fuzzy = ref()

const handler: FuzzyHandler = {
  queryBefore: async({ data }) => {
    console.log('query before')
    // data.entName = '22'
    return data
  },
  deleteBefore: ({ url }) => {
    console.log('delete before url: ', url)
    return {}
  },
}

const onClick = () => {
  fuzzy.value.request.get({})
}
</script>

<template>
  <button @click="onClick">
    111
  </button>
  <div class="w-full h-full box-border bg-light-100">
    <Fuzzy ref="fuzzy" :config="singleConfig" :handler="handler" />
  </div>
</template>
<style>
</style>
