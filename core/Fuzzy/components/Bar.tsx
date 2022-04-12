// import type { TemplateConfiguration } from '../types'
import { defineComponent, inject } from 'vue'
import { BarModelProvide } from '../types'
export default defineComponent({
  setup() {
    const barModel = inject(BarModelProvide)
    console.log(barModel)
    return {
      barModel,
    }
  },
  render() {
    return this.barModel.render()
  },
})
