<script  lang="tsx" setup>
import { mergeFuzzyOptions } from '../../../fuzzy-next/utils'
import { mockData, options, options2 } from './template'

const _options = mergeFuzzyOptions(options, options2)

</script>

<template>
  <Fuzzy
    :options="_options"
  />
</template>
