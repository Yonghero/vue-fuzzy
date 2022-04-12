import type { Ref, UnwrapNestedRefs } from 'vue'
import type { FuzzyBaseModel, Pagination } from '../types'
import type { RequestFuzzy } from '.'

class PagingModel implements FuzzyBaseModel<any> {
  config: Pagination
  model: UnwrapNestedRefs<any> = reactive({ currentSize: 1, total: 0 })
  size = 10
  requestFuzzy: any

  constructor(getFieldOfTmpl: any, requestFuzzy: Ref<RequestFuzzy>) {
    this.config = getFieldOfTmpl('pagination')
    this.requestFuzzy = requestFuzzy
    this.initModel()
  }

  initModel() {
  }

  handleEvent(currentSize: number, data = {}) {
    this.model.currentSize = currentSize
    this.requestFuzzy.get({ ...data })
  }
}

export {
  PagingModel,
}
