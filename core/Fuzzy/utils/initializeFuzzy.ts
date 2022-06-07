import type { FuzzyHandler, TemplateConfiguration } from '../types'
import { BarModelProvide, FuzzyHandlerProvide, PagingModelProvide, QueryModelProvide, RequestModelProvide, TableModelProvide } from '../types'
import { BarModel, PagingModel, QueryModel, RequestFuzzy, TableModel } from '../models'

function initializeFuzzy(config: TemplateConfiguration, handler: FuzzyHandler) {
  // 事件传递
  provide(FuzzyHandlerProvide, handler)
  // 顶栏逻辑
  const barModel = new BarModel(config)
  // 搜索区 数据源
  const queryModel = ref()
  // 表格区 数据源
  const tableModel = ref()
  // 分页器数据源
  const pagingModel = ref()

  // 请求数据
  const requestFuzzyRef = ref()

  // 获取当前页面配置
  const getTmpl = catchTmpl(config)

  // 多tab应用 重新拉取对应模型数据
  const reRender = () => {
    const getFieldOfTmpl = computed(() => {
      return getTmpl(barModel.activeIndex.value)
    })
    pagingModel.value = new PagingModel(getFieldOfTmpl.value, requestFuzzyRef)
    tableModel.value = new TableModel(getFieldOfTmpl.value, requestFuzzyRef)
    queryModel.value = new QueryModel(getFieldOfTmpl.value, requestFuzzyRef, pagingModel)
    // 初始化结束开始请求数据
    requestFuzzyRef.value = new RequestFuzzy(
      getFieldOfTmpl.value,
      reactive({ pagingModel: pagingModel.value, queryModel: queryModel.value, tableModel: tableModel.value }),
    )
  }

  // 是否为多tab应用
  watch(
    barModel.activeIndex,
    () => {
      reRender()
    }, {
      immediate: true,
    })

  provide(BarModelProvide, barModel)
  provide(QueryModelProvide, queryModel)
  provide(TableModelProvide, tableModel)
  provide(PagingModelProvide, pagingModel)
  provide(RequestModelProvide, requestFuzzyRef)

  return {
    requestFuzzyRef,
  }
}

export {
  initializeFuzzy,
}

/**
 * 获取当前页面配置
 * @param config
 * @returns
 */
function catchTmpl(config: TemplateConfiguration) {
  const catchConfig = config as any
  return (index: number) => {
    return (fields: string[] | string): any => {
      if (Array.isArray(fields)) {
        return fields.map((field) => {
          if (field === 'templates') {
            if (Array.isArray(catchConfig.templates) && catchConfig.templates.length > 0 && Array.isArray(catchConfig.templates[0]))
              return catchConfig.templates[index]
            else
              return catchConfig.templates
          }
          if (Array.isArray(catchConfig[field]))
            return catchConfig[field][index]
          else
            return catchConfig[field]
        })
      }
      else {
        if (fields === 'templates' && Array.isArray(catchConfig.templates) && catchConfig.templates.length > 0 && Array.isArray(catchConfig.templates[0]))
          return catchConfig.templates[index]
        else if (Array.isArray(catchConfig[fields]))
          return catchConfig[fields][index]
        else
          return catchConfig[fields]
      }
    }
  }
}
