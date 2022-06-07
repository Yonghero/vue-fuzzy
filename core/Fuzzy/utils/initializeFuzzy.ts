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
    return (fields: string[] | string): keyof TemplateConfiguration => {
      return Array.isArray(fields)
        ? fields.map((field) => {
          if ((catchConfig[field] && Array.isArray(catchConfig[field][index])) && field !== 'templates')
            return catchConfig[field] ? catchConfig[field][index] : undefined

          else if (catchConfig[field] && !Array.isArray(catchConfig[field]))
            return catchConfig[field]

          else
            return catchConfig[field]
        },
        )
        : Array.isArray(catchConfig[fields])
          ? ((fields !== 'templates' || Array.isArray(catchConfig[fields][index])) ? catchConfig[fields][index] : catchConfig[fields])
          : catchConfig[fields]
    }
  }
}
