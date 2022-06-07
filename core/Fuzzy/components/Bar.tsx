// import type { TemplateConfiguration } from '../types'
import { defineComponent, inject } from 'vue'
import { BarModelProvide } from '../types'
export default defineComponent({
  setup() {
    const barModel = inject(BarModelProvide)
    return {
      barModel,
    }
  },
  render() {
    return this.barModel.render()
  },
})
