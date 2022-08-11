import type { VNode } from 'vue'
import type { Renderer } from '../../types'
import type { RequestCallback } from '../../types/requestProvider'
import type { DataProvider } from './createDataProvide'

export function createPage(renderer: Renderer, requestCallback: RequestCallback, dataProvide: DataProvider): VNode {
  const onUpdatePage = async(page: number) => {
    const {
      success,
      message,
      data,
      total,
    } = await requestCallback.get({ current: page })

    if (success) {
      dataProvide.dispatch.setTableData(data)
      dataProvide.dispatch.setTotal(total)
      return
    }
    renderer.message.warning(message)
  }

  return <renderer.page.render
    onUpdatePage={onUpdatePage}
    total={dataProvide.total}
  />
}
