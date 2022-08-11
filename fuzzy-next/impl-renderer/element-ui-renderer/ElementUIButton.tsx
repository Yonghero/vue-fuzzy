import { ElButton } from 'element-plus'
import type { ButtonRenderer } from '../../types'

export class ElementUIButton implements ButtonRenderer {
  render(props, { slots }) {
    return (
      <ElButton {...props}>
        {
          slots.default && slots.default()
        }
      </ElButton>
    )
  }
}
