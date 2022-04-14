<template>
  <div class="flex justify-center align-middle mt-8 mb-8">
    <el-pagination
      background
      hide-on-single-page
      :layout="layout"
      :page-size="pagingModel.size"
      :total="pagingModel.model.total"
      :current-page="pagingModel.model.currentSize"
      @current-change="handleEvent"
    />
  </div>
</template>

<script setup lang='ts'>
import type { FuzzyHandler } from '../types'
import { FuzzyHandlerProvide, PagingModelProvide, QueryModelProvide } from '../types'

const pagingModel = inject(PagingModelProvide)
const queryModel = inject(QueryModelProvide)
const fuzzyHandler: FuzzyHandler = inject(FuzzyHandlerProvide)

const layout = computed(() => {
  if (pagingModel.value.total / pagingModel.value.size >= 20)
    return 'prev, pager, next, jumper'

  return 'prev, pager, next'
})
const handleEvent = (e: number) => {
  if (fuzzyHandler && fuzzyHandler.queryBefore) {
    fuzzyHandler.queryBefore({ data: queryModel.value.model, current: queryModel.value }).then((data: any) => {
      pagingModel.value.handleEvent(e, data)
    })
  }
  else {
    pagingModel.value.handleEvent(e)
  }
}

</script>
<style lang='scss' scoped>
</style>
