import type { Ref } from 'vue'
import type { Feature, FuzzyBaseModel, QueryMode, Templates } from '../types'
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
  queryMode!: QueryMode
  requestFuzzy: any

  constructor(getFieldOfTmpl: any, requestFuzzy: Ref<RequestFuzzy>, pagingModel: Ref<PagingModel>) {
    const [templates, feature, queryMode] = getFieldOfTmpl(['templates', 'feature', 'queryMode'])
    this.queryMode = queryMode
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
      .filter(item => item.visible?.query && !item.queryUnShow)
      .map((item) => {
        const _item: any = reactive({ ...item })
        if (!_item.type)
          _item.type = FormItemEnum.input

        _item.component = filterCompOfType(
          item.type && item.type !== FormItemEnum.select
            ? item.type
            : FormItemEnum.input,
        )
        if (item.fetchQuery)
          item.fetchQuery(item)
        return _item
      })
    console.log('this.data.value: ', this.data.value)
  }

  /**
   * 初始化query_form的模型
   */
  initModel() {
    this.data.value.forEach((tempItem: Templates) => {
      const key = tempItem.value
      if (tempItem?.defaultQueryValue)
        this.model.value[key] = tempItem.defaultQueryValue

      else
        this.model.value[key] = ''
    })
  }

  handleEvent(data: any) {
    // 触发表格数据更新
    this.requestFuzzy.get({ index: 1, ...data })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.pagingModel.model.currentSize = 1
  }
}

export {
  QueryModel,
}
