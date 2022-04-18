import type { Ref, VNode } from 'vue'
import type { DialogStyle } from '../components/Dialog/types'

interface TemplateConfiguration {
  title?: string | { // 页面标题 可传递自定义图片
    text: string
    icon: string
  }
  tabList?: Array<{ // 多页面启用
    label: string
    value: any
  }>
  dialogStyle?: DialogStyle | Array<DialogStyle> // 对话框样式
  api: string | Api | Array<string> | Array<Api> // 增删改查接口地址
  feature: Feature | Array<Feature> // 是否开启增删改查中其中一项功能
  tableOperation?: tableOperation | Array<tableOperation> // 表格操作栏放置的自定义内容
  pagination?: Pagination // 分页的配置 一页展示10条？
  templates: Array<Templates> | Array<Array<Templates>> // 需要展示的每个字段 可配置每个字段对应的功能
  isShownDialog?: Boolean | Array<Boolean> // 是否开启对话框
}

// 是否开启增删改查中其中一项功能
interface Feature {
  create?: boolean
  update?: boolean
  delete?: boolean
}

// 每个字段对应的相关信息
interface Templates {
  label?: string // 字段名称
  value: string // 后端需要的字段值
  type?: FormItemEnum // 该字段展示的表单类型 输入框？ 下拉框？ 时间选择器？
  datePickerType?: string // 时间选择器类型 对照element-plus的时间选择器类型
  rangeSeparator?: string
  startPlaceholder?: string
  endPlaceholder?: string
  defaultQueryValue?: string // 表单展示的默认值
  rules?: [] // 该字段的表单规则 参照element-plus
  require?: boolean // 是否必填
  placeholder?: string
  items?: Array<{ // type 为下拉框时的options
    label: {} | string
    value: string | number
    type?: number | string
  }>
  width?: number | string
  visible?: { // 是否在增删改查中包含此字段
    query?: boolean
    table?: boolean
    create?: boolean
    update?: boolean
  }
  fetchQuery?: (temp: Templates) => any // 异步加载下拉框的options
  render?(param: any): any // 在表格中如何展示该字段的样子
}
interface tableOperation {
  show?: boolean
  operator?: Array<{
    label: string
    value: string
    color?: string
    onClick: (param: any) => void
  }>
}
interface Pagination {
  total?: number
  size?: number
}
interface FuzzyBaseModel<T> {
  config: TemplateConfiguration | Templates[] | Pagination
  data?: Ref<Array<T>>
  mapDataAccordConfig?: () => void
  handleEvent: (param?: any) => void
}
interface Api {
  create: string
  update: string
  delete: string
  query: string
}
interface AllModels {
  tableModel: any
  queryModel: any
  pagingModel: any
}

// 表单类型
enum FormItemEnum {
  select = 1,
  input = 2,
  switch = 3,
  radio = 4,
  datePicker = 5,
  datePickerRange = 6,
  cascader = 7,
}
enum OperatorCmd {
  detail = 1,
  delete = 2,
  update = 3,
}
interface HandlerParams {
  data: any
  current: any
}

// 提供Fuzzy自动处理增删改查时的生命周期
// 查询时与要添加业务无关的字段？
// 更新时要再次修改字段的value？
// 删除时要多带一些数据给后端？
interface FuzzyHandler {
  queryBefore?: (params: HandlerParams) => any // 查询前
  createBeforePop?: (params: HandlerParams) => any // 点击更新对话框出来前
  updateBeforePop?: (params: HandlerParams) => any // 点击编辑对话框出来前
  deleteBefore?: (params: HandlerParams) => any // 删除前
  createConfirm?: (params: HandlerParams) => Promise<any> // 确认更新时
  updateConfirm?: (params: HandlerParams) => Promise<any> // 新增更新时
  createCancel?: (params: HandlerParams) => any // 取消更新时
  updateCancel?: (params: HandlerParams) => any // 取消编辑时
}

// 因公司项目新增表单、编辑表单比较复杂 暂未实现自动更新、编辑
// 选择让用户自己提供编辑或新增时的组件
// 点击确定、取消事件 会触发FuzzyHandler.createConfirm ....
interface RenderDialog {
  UpdateRender?: VNode // 编辑对话框内展示的内容
  CreateRender?: VNode // 更新对话框内展示的内容
}
interface DialogChanageable {
  text: string
  data: any
  current: any
}
interface ItemProp {
  label: string
  value: any
}
export { FormItemEnum, OperatorCmd }
export type { AllModels, TemplateConfiguration, Templates, FuzzyBaseModel, tableOperation, Pagination, Api, Feature, FuzzyHandler, RenderDialog, DialogChanageable, HandlerParams, ItemProp }
export * from './symbols'
export * from '../components/Dialog/types'
