<script  lang="tsx" setup>
import { mergeFuzzyOptions } from '../../../fuzzy-next/utils'
import { ElementUIRenderer } from '../../../fuzzy-next/impl-renderer/element-ui-renderer'
import { ArcoUIRenderer } from '../../../fuzzy-next/impl-renderer/arco-ui-renderer'
import { CreateComponent, UpdateComponent, handlers, options, options2 } from './template'

const _options = mergeFuzzyOptions(options, options2)
const isArco = ref(false)
const uiRenderer = computed(() => isArco.value ? new ArcoUIRenderer() : new ElementUIRenderer())

const onChange = () => {
  isArco.value = !isArco.value
}

</script>

<template>
  <el-button @click="onChange">
    换肤
  </el-button>
  <Fuzzy
    :options="_options"
    :renderer="uiRenderer"
    :handlers="handlers"
    :modal-renderer="{
      UpdateComponent,
      CreateComponent
    }"
  />
</template>
