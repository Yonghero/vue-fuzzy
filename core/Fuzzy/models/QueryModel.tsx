import type { Ref } from 'vue'
import type { Feature, FuzzyBaseModel, Templates } from '../types'
import { FormItemEnum } from '../types'
import { filterCompOfType } from './filterCompOfType'
import type { RequestFuzzy } from './RequestFuzzy'
import type { PagingModel } from '.'

class QueryModel implements FuzzyBaseModel<Templates> {
  data = ref()
  model: Ref<Record<string, any>> = ref({})
  config!: Templates[]
  pagingModel!: Ref<PagingModel>
  feature: Feature
  requestFuzzy: any

  constructor(getFieldOfTmpl: any, requestFuzzy: Ref<RequestFuzzy>, pagingModel: Ref<PagingModel>) {
    const [templates, feature] = getFieldOfTmpl(['templates', 'feature'])
    this.config = templates
    this.feature = feature
    this.requestFuzzy = requestFuzzy
    this.pagingModel = pagingModel
    this.mapDataAccordConfig()
    this.initModel()
  }

  /**
   * 根据配置映射query区域的展示项
   */
  mapDataAccordConfig() {
    this.data.value = this.config
      .filter(item => item.visible?.query)
      .map((item) => {
        const _item: any = reactive({ ...item })
        _item.component = filterCompOfType(
          item.type && item.type !== FormItemEnum.select
            ? item.type
            : FormItemEnum.input,
        )
        if (item.fetchQuery)
          item.fetchQuery(item)

        return _item
      })
  }

  /**
   * 初始化query_form的模型
   */
  initModel() {
    this.data.value.forEach((tempItem: Templates) => {
      const key = tempItem.value
      if (tempItem?.defaultQueryValue) {
        console.log(tempItem, 'tempItem')
        this.model.value[key] = tempItem.defaultQueryValue
        console.log(this.model.value, 'this.model.value')
      }
      else {
        this.model.value[key] = ''
      }
    })
  }

  handleEvent(data: any) {
    // 触发表格数据更新
    this.requestFuzzy.get({ index: 1, ...data })
    this.pagingModel.model.currentSize = 1
  }
}

export {
  QueryModel,
}
