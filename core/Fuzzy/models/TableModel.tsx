import type { Ref } from 'vue'
import type { Feature, FuzzyHandler, Templates } from '../types'
import type { RequestFuzzy } from '../utils'

interface TableInterface {
  tableLoading: Ref<boolean>
}

class TableModel implements TableInterface {
  config: Templates[]
  data!: Templates[]
  model: Ref<Array<keyof Templates>> = ref([])
  tableOperation: any
  requestFuzzy: any
  feature: Feature
  multipleSelection: any = ref([])
  tableLoading: Ref<boolean> = ref(false)
  handler!: FuzzyHandler

  constructor(getFieldOfTmpl: any, requestFuzzy: Ref<RequestFuzzy>) {
    const [templates, tableOperation, feature] = getFieldOfTmpl(['templates', 'tableOperation', 'feature'])
    this.config = templates
    this.tableOperation = tableOperation
    this.feature = feature
    this.requestFuzzy = requestFuzzy
    this.mapDataAccordConfig()
    this.initModel()
  }

  /**
   * 映射表头展示的数据
   */
  mapDataAccordConfig() {
    this.data = this.config
      .filter(item => item?.visible?.table)
  }

  /**
   * 初始化表格数据
   */
  initModel() {
  }

  handleEvent() {
    console.log(this.handler)
    // debugger
    this.requestFuzzy.get()
  }
}

export {
  TableModel,
}
