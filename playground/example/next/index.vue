<script  lang="tsx" setup>
import { mergeFuzzyOptions } from '../../../fuzzy-next/utils'
import { ElementUIRenderer } from '../../../fuzzy-next/impl-renderer/element-ui-renderer'
import { options, options2 } from './template'

const _options = mergeFuzzyOptions(options, options2)
const uiRenderer = new ElementUIRenderer()

</script>

<template>
  <Fuzzy
    :options="_options"
    :renderer="uiRenderer"
  />
</template>
