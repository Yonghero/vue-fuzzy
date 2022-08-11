import { ElButton } from 'element-plus'
import type { ButtonRenderer } from '../../types'

export class ElementUIButton implements ButtonRenderer {
  render(props, { slots }) {
    return (
      <ElButton type="primary">
        {
          slots.default && slots.default()
        }
      </ElButton>
    )
  }
}
