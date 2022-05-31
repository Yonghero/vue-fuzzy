import type { Ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { DialogChanageable, DialogStyle, FuzzyDialogHandler, FuzzyHandler, RenderDialog } from '../types'
import type { RequestFuzzy } from '../models/RequestFuzzy'

export function useFuzzyDialog(props: {
  handler: FuzzyHandler | undefined
  renderDialog: RenderDialog | undefined
  requestFuzzyRef: Ref<RequestFuzzy>
  style: DialogStyle | Array<DialogStyle> | undefined
}) {
  const dialogVisible = ref(false)
  const dialogTitle = ref('新增')
  const dialogData = ref()
  const dialogStyle = ref()
  const DialogRender = shallowRef()
  // 事件封装
  const onConfirm = computed(() => {
    if (dialogTitle.value.includes('新增')) {
      if (props.handler && props.handler.createConfirm)
        return props.handler.createConfirm
      else
        return async() => ({})
    }
    else if (dialogTitle.value.includes('编辑')) {
      if (props.handler && props.handler.updateConfirm)
        return props!.handler.updateConfirm
      else
        return async() => ({})
    }
    else {
      return async() => ({})
    }
  })

  const onCancel = computed(() => {
    if (dialogTitle.value.includes('新增')) {
      if (props.handler && props.handler.createCancel)
        return props.handler.createCancel
      else
        return async() => ({})
    }
    else if (dialogTitle.value.includes('编辑')) {
      if (props.handler && props.handler.updateCancel)
        return props!.handler.updateCancel
      else
        return async() => ({})
    }
    else {
      return async() => ({})
    }
  })

  const dialogHandler: FuzzyDialogHandler = {
    onCancel: () => {
      onCancel.value({ data: readonly(dialogData), current: null })
    },
    onConfirm: (emitClose) => {
      return new Promise((resolve, reject) => {
        onConfirm.value({ data: readonly(dialogData), current: { api: props.requestFuzzyRef.value.api } })
          .then(() => {
            ElMessage({
              type: 'success',
              message: `${dialogTitle.value}成功`,
            })
            resolve(true)
            props.requestFuzzyRef.value.get()
          })
          .catch((error) => {
            console.log(error)
            ElMessage({
              type: 'error',
              message: `${dialogTitle.value}失败`,
            })
            reject(new Error('fail'))
          })
          .finally(() => {
            emitClose()
          })
      })
    },
  }

  const dialogChangeable = ({ text, data, current }: DialogChanageable) => {
    const activeIndex = current.activeIndex.value
    dialogStyle.value = Array.isArray(props.style) ? props.style[activeIndex] : props.style

    // FIXME 组件替换
    DialogRender.value = text.includes('新增')
      ? props.renderDialog?.CreateRender
      : props.renderDialog?.UpdateRender

    // 数据传递
    dialogData.value = { data, current }
    // 状态修改
    dialogTitle.value = text
    dialogVisible.value = true
  }

  return {
    DialogRender,
    dialogVisible,
    dialogTitle,
    dialogHandler,
    dialogStyle,
    dialogChangeable,
  }
}
