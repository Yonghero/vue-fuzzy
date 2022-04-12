<template>
  <div class="zinc rounded-sm h-full w-full">
    <Bar ref="bar" />
    <el-scrollbar
      ref="scrollBar"
      class="table-h-scrollbar"
    >
      <Query
        :render-right-query="renderRightQuery"
        @dialogChangeable="dialogChangeable"
      />
      <FTable
        @dialogChangeable="dialogChangeable"
      />
      <Dialog
        v-if="renderDialog"
        v-model="dialogVisible"
        is-loading
        destroy-on-close
        :title="dialogTitle"
        :handler="dialogHandler"
        :dialog-style="dialogStyle"
      >
        <DialogRender />
      </Dialog>
      <Pagination />
    </el-scrollbar>
  </div>
</template>

<script setup lang='ts'>
import type { PropType } from 'vue'
import type { FuzzyHandler, RenderDialog, TemplateConfiguration } from './types'
import { Bar, FTable, Pagination, Query } from './components'
import { initializeFuzzy, useFuzzyDialog } from './utils'
import Dialog from './components/Dialog/index.vue'
import 'virtual:windi.css'

const props = defineProps({
  config: Object,
  renderRightQuery: [Function, Array],
  renderDialog: Object as PropType<RenderDialog>,
  handler: Object as PropType<FuzzyHandler>,
})

// 动态滚动条高度设置
const bar = ref()
const scrollBar = ref()
onMounted(() => {
  scrollBar.value.$el.style.height = `calc(100% - ${`${bar.value.$el.clientHeight}px`})`
})
// 初始化
const { requestFuzzyRef } = initializeFuzzy(props.config as TemplateConfiguration, props.handler as FuzzyHandler)
defineExpose({
  request: requestFuzzyRef,
})

// dialog 配置
const {
  dialogVisible,
  dialogHandler,
  dialogTitle,
  dialogStyle,
  DialogRender,
  dialogChangeable,
} = useFuzzyDialog({
  handler: props.handler,
  renderDialog: props.renderDialog,
  requestFuzzyRef,
  style: props.config?.dialogStyle,
})

</script>

<style>
</style>
