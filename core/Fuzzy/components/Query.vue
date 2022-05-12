<template>
  <div
    class="flex flex-wrap px-6 pt-6 pb-2 items-start justify-between restful_query"
    style="align-items: end;"
  >
    <el-form
      v-if="queryModel.data.length > 0"
      size="default"
      :inline="true"
      :model="queryModel.model"
      class="demo-form-inline"
      style="flex: 10"
    >
      <el-form-item
        v-for="{ value,
                 label,
                 width,
                 placeholder,
                 component,
                 items,
                 multiple,
                 type,
                 size,
                 datePickerType,
                 rangeSeparator,
                 startPlaceholder,
                 endPlaceholder
        } of queryModel.data"
        :key="value"
        :label="label"
        :style="{width: width ? width : 'auto'}"
      >
        <el-select
          v-if="type === FormItemEnum.select"
          v-model="queryModel.model[value]"
          filterable
          :placeholder="placeholder || '请选择' + label"
          :size="size || 'default'"
          @change="selectChange(value)"
        >
          <el-option
            v-for="item in items"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-else-if="type === FormItemEnum.datePickerRange"
          v-model="queryModel.model[value]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD"
        />
        <el-cascader
          v-else-if="type === FormItemEnum.cascader"
          v-model="queryModel.model[value]"
          :options="items"
        />
        <el-input
          v-else-if="type === FormItemEnum.input"
          v-model="queryModel.model[value]"
          :placeholder="placeholder"
        />
        <component
          :is="component"
          v-else
          v-model="queryModel.model[value]"
          :placeholder="placeholder"
          :options="items"
          :multiple="multiple"
          :type="datePickerType"
          :range-separator="rangeSeparator"
          :start-placeholder="startPlaceholder"
          :end-placeholder="endPlaceholder"
        />
      </el-form-item>
      <el-button
        type="primary"
        size="default"
        style="margin-bottom: 18px;"
        @click="handleEvent"
      >
        搜索111
      </el-button>
    </el-form>
    <div
      class="flex items-center h-full"
      style="justify-content: right;align-items: end;margin-bottom: 18px;"
    >
      <template v-if="renderRightQuery">
        <component
          :is="RenderRight"
          :props="RenderRightProps"
        />
      </template>
      <img
        v-if="queryModel?.feature?.create"
        class="w-8 h-8 ml-3 cursor-pointer"
        :src="createIcon"
        alt="create"
        @click="handleCreate"
      >
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { FuzzyHandler } from '../types'
import { BarModelProvide, FormItemEnum, FuzzyHandlerProvide, QueryModelProvide, RequestModelProvide, TableModelProvide } from '../types'
import createIcon from '../../assets/create-icon.png'

const props = defineProps({
  renderRightQuery: [Function, Array],
})

const emits = defineEmits(['dialogChangeable'])

const barModel = inject(BarModelProvide)
const queryModel = inject(QueryModelProvide)
const tableModel = inject(TableModelProvide)
const fuzzyHandler: FuzzyHandler = inject(FuzzyHandlerProvide)
const requestFuzzy = inject(RequestModelProvide)

// 右侧slot
const RenderRight = shallowRef()
const RenderRightProps = readonly({ tableModel, barModel, requestFuzzy, queryModel })
watch(
  barModel.activeIndex,
  () => {
    if (!props.renderRightQuery) return undefined
    if (Array.isArray(props.renderRightQuery))
      RenderRight.value = props.renderRightQuery[barModel.activeIndex.value]
    else
      RenderRight.value = props.renderRightQuery
  }, {
    immediate: true,
  })

const handleCreate = () => {
  const expose = { data: tableModel, current: barModel }
  emits('dialogChangeable', { ...expose, text: `新增${barModel.activeTitle.value}` })
  fuzzyHandler && fuzzyHandler.createBeforePop && fuzzyHandler.createBeforePop(expose)
}
const handleEvent = () => {
  if (fuzzyHandler && fuzzyHandler.queryBefore) {
    fuzzyHandler.queryBefore({ data: queryModel.value.model, current: queryModel.value }).then((data: any) => {
      queryModel.value.handleEvent(data)
    })
  }
  else {
    queryModel.value.handleEvent({})
  }
}

const selectChange = (val: string) => {
  // if (fuzzyHandler && fuzzyHandler.querySelectChange)
  //   fuzzyHandler.querySelectChange({ trigger: val, model: queryModel.value })
}

</script>
<style lang='scss'>
.restful_query{
   .el-button{
      padding: 8px 25px;
    }
  .el-form{
    flex: 4;
    .el-form-item{
      margin-right: 30px;
      .el-form-item__content{
        min-width: 240px;
        .el-date-editor--date,.el-date-editor--datetime,.el-select{
          min-width: 240px;
        }
      }
    }
  }
}
</style>
