import type { Renderer } from '../../types'
import type { DataProvider } from './createDataProvide'

export function createDialog(renderer: Renderer, dataProvide: DataProvider) {
  const Dialog = renderer.dialog.render

  const visible = computed(() => {
    return dataProvide.dialog.value.visible
  })

  const title = computed(() => {
    return dataProvide.dialog.value.title
  })

  return <Dialog
    modelValue={visible.value}
    title={title.value}>
    {
      dataProvide.dialog.value.render
    }
  </Dialog>
}
