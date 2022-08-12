import type { ModalRenderer, OptionsConfiguration, Renderer } from '../../types'
import type { FuzzyNextHandlers } from '../../types/handler'
import type { RequestCallback } from '../../types/requestProvider'
import type { DataProvider } from './createDataProvide'

export function createDialog(renderer: Renderer, modalRenderer: ModalRenderer, handlers: FuzzyNextHandlers, requestCallback: RequestCallback, dataProvide: DataProvider, options: OptionsConfiguration<any>) {
  // 点击确定按钮触发
  async function onUpdate(scope) {
    if (dataProvide.dialog.value.title.includes('新增')) {
      if (handlers.createConfirm) {
        const isOk = await handlers.createConfirm({ data: scope, url: requestCallback.urls.update })
        if (isOk) {
          // 确认更新操作 关闭弹窗
          dataProvide.dispatch.setDialog({ visible: false })
          // 重新获取最新数据
          await requestCallback.get({})
        }
      }
    }
    else {
      if (handlers.updateConfirm) {
        // invoke update confirm hook
        const isOk = await handlers.updateConfirm({ data: scope, url: requestCallback.urls.update })

        if (isOk) {
          // 确认更新操作 关闭弹窗
          dataProvide.dispatch.setDialog({ visible: false })
          // 重新获取最新数据
          await requestCallback.get({})
        }
      }
    }
  }

  const WrapDialog = defineComponent({
    setup() {
      return () => (
        <renderer.dialog.render
          v-model={dataProvide.dialog.value.visible}
          title={dataProvide.dialog.value.title}
          onUpdate={onUpdate}
          style={options?.modalStyle || {}}
        >
          {
            dataProvide.dialog.value.render
          }
        </renderer.dialog.render>
      )
    },
  })

  return <WrapDialog/>
}
