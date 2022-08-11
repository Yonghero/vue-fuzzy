import { ElDialog } from 'element-plus'
import type { DialogRenderProps, DialogRenderer } from '../../types'
import { ElementUIButton } from './ElementUIButton'

export class ElementUIDialog implements DialogRenderer {
  render(props: Readonly<DialogRenderProps>, { slots }) {
    const button = new ElementUIButton()

    const _slots = {
      header: () => (
        <div class="flex items-center">
          <div class="w-1 h-4.5 rounded-sm bg-primary-100 mr-2"/>
          <h1>{props.title}</h1>
        </div>
      ),
      footer: () => props.footer
        ? props.footer
        : <div
          class="dialog-footer-box"
        >
          <button.render
            type="primary"
            class="btn reset"
            plain
          >取消</button.render>
          <button.render
            type="primary"
            class="btn confirm"
          >确定
          </button.render>
        </div>,
    }

    return (
      <ElDialog
        v-slots={_slots}
        closeOnClickModal={false}
        modelValue={props.modelValue}
        width={'50%'}
        top={'15vh'}
        destroyOnClose
        {...props.style}
      >
        {
          slots.default && slots.default()
        }
      </ElDialog>
    )
  }
}
