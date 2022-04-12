<template>
  <el-dialog
    :close-on-click-modal="false"
    :model-value="props.modelValue"
    :before-close="handleBeforeClose"
    :width="dialogStyle.width"
    :top="dialogStyle.top"
    destroy-on-close
  >
    <template #title>
      <div class="flex items-center">
        <div class="w-1 h-4.5 rounded-sm bg-primary-100 mr-2" />
        <h1>{{ props.title }}</h1>
      </div>
    </template>
    <div class="">
      <slot />
    </div>
    <template #footer>
      <div
        v-if="isCustomCompunted"
        class="dialog-footer-box"
      >
        <el-button
          type="primary"
          class="btn reset"
          plain
          @click="cancel"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          class="btn confirm"
          :loading="loadingStatus"
          @click="confirm"
        >
          确定
        </el-button>
      </div>
      <slot v-else name="footer" />
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import type { PropType } from 'vue'
import type { DialogStyle, FuzzyDialogHandler } from './types'

const props = defineProps({
  title: String,
  modelValue: {
    prop: Boolean,
    default: false,
  },
  isCustomFooter: {
    prop: Boolean,
    default: false,
  },
  handler: Object as PropType<FuzzyDialogHandler>,
  isLoading: {
    type: Boolean,
    default: false,
  },
  dialogStyle: {
    prop: Object as PropType<DialogStyle>,
    default: {
      width: '50%',
      top: '15vh',
      isCustomFooter: undefined,
    },
  },
})
const isCustomCompunted = computed(() => {
  // 不传时
  if (props.dialogStyle.isCustomFooter === undefined)
    return !props.isCustomFooter

  else
    return props.dialogStyle.isCustomFooter
})
const emit = defineEmits(['update:modelValue'])

const loadingStatus = ref(false)

// 关闭前事件
const handleBeforeClose = () => {
  loadingStatus.value = false
  emit('update:modelValue', false)
}
// 确定 & 取消事件
const cancel = () => {
  loadingStatus.value = false
  emit('update:modelValue', false)
  props.handler && props.handler.onCancel && props.handler.onCancel()
}
const confirm = () => {
  props.handler
  && props.handler.onConfirm
  && props.handler.onConfirm(() => emit('update:modelValue', false))
    .then(() => loadingStatus.value = false)
    .catch(() => loadingStatus.value = false)
}
</script>
<style lang='scss' scoped>
</style>
