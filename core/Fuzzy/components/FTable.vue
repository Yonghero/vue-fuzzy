<template>
  <div class="flex flex-wrap px-6">
    <el-table
      v-loading="tableModel.tableLoading"
      :data="tableModel.model"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
      <el-table-column
        v-if="tableModel.data.filter((e: any) => e.label === '选择框').length"
        type="selection"
        width="60"
      />
      <el-table-column
        v-for="item in tableModel.data.filter((e: any) => e.label !== '选择框')"
        :key="item.value"
        :prop="item.value"
        :label="item.label"
        :width="item.width ? item.width : (item.label === '序号' ? 70: '')"
        align="center"
        show-overflow-tooltip
      >
        <template
          v-if="item.label === '序号'"
          #default="scope"
        >
          {{ scope.$index + 1 + (pagingModel.model.currentSize - 1) * pagingModel.size }}
        </template>
        <template
          v-else-if="item.render"
          #default="scope"
        >
          <component :is="item.render(scope)" />
        </template>
        <template
          v-else
          #default="scope"
        >
          {{ scope.row[item.value] || scope.row[item.value] === 0 ? scope.row[item.value] : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableModel.tableOperation?.show !== false"
        align="center"
        label="操作"
        :width="operatorWidth"
        class="flex justify-evenly"
      >
        <template
          #default="scope"
        >
          <div class="flex justify-evenly w-full h-full items-center text-xl">
            <div
              v-for="(operator, index) in tableModel?.tableOperation?.operator"
              :key="index"
              style="color:#4278F6"
              @click="operator.onClick(scope, barModel)"
            >
              {{ operator.label }}
            </div>

            <div
              v-if="tableModel?.feature?.update"
              style="color:#4278F6"
              @click="handleOperator(OperatorCmd.update, scope)"
            >
              编辑
            </div>
            <div
              v-if="tableModel?.feature?.delete"
              type="text"
              size="small"
              style="color: #F64F42"
              @click="handleOperator(OperatorCmd.delete, scope)"
            >
              删除
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang='ts'>
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FuzzyHandler } from '../types'
import { BarModelProvide, FuzzyHandlerProvide, OperatorCmd, PagingModelProvide, RequestModelProvide, TableModelProvide } from '../types'

const tableModel = inject(TableModelProvide)
const pagingModel = inject(PagingModelProvide)
const requestFuzzy = inject(RequestModelProvide)
const barModel = inject(BarModelProvide)
const fuzzyHandler = inject(FuzzyHandlerProvide)

const emits = defineEmits(['dialogChangeable'])

const handleSelectionChange = (val: any) => {
  tableModel.value.multipleSelection.value = val
}
const operatorWidth = computed(() => {
  try {
    let widthSum = 0
    if (tableModel.value && tableModel.value.feature) {
      Object.keys(tableModel.value.feature).forEach((key: any) => {
        if (key !== 'create' && tableModel.value.feature[key])
          widthSum++
      })
    }
    if (tableModel.value.tableOperation.operator.length)
      widthSum += tableModel.value.tableOperation.operator.length
    if (widthSum === 1)
      return '100'

    return (widthSum * 60).toString()
  }
  catch (e) {
    return '160'
  }
})
const handleOperator = (cmd: OperatorCmd, row: any) => {
  const handler = {
    [OperatorCmd.detail]: (row: any) => {
      console.log('click tab detail')
    },
    [OperatorCmd.delete]: (row: any) => {
      console.log('click tab delete', row)

      ElMessageBox.confirm(
        '此操作将永久删除数据,是否继续',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(() => {
          requestFuzzy.value.delete(row.row.id).then(() => {
            ElMessage({
              type: 'success',
              message: '已成功删除数据',
            })
            requestFuzzy.value.get()
          }).catch(() => {
            ElMessage({
              type: 'warning',
              message: '删除数据失败',
            })
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已经取消删除',
          })
        })
    },
    [OperatorCmd.update]: (row: any) => {
      const expose = { data: { ...row }, current: barModel }
      emits('dialogChangeable', { ...expose, text: `编辑${barModel.activeTitle.value}` })
      fuzzyHandler && fuzzyHandler.updateBeforePop && fuzzyHandler.updateBeforePop({ data: { ...row }, current: barModel })
    },
  }

  handler[cmd](row)
}

</script>
<style lang='scss'>
</style>
