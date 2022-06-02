import type { Ref, VNode } from 'vue'
import type { DialogStyle } from '../components/Dialog/types'

interface TemplateConfiguration {
  /**
   * 页面标题 可传递自定义图片
   */
  title?: string | {
    text: string
    icon: string
  }
  /**
   * 多页面启用
   */
  tabList?: Array<{
    label: string
    value: any
  }>
  /**
   * 对话框样式
   */
  dialogStyle?: DialogStyle | Array<DialogStyle>
  /**
   * 增删改查接口地址
   */
  api: string | Api | Array<string> | Array<Api>
  /**
   * 是否开启增删改查中其中一项功能
   */
  feature: Feature | Array<Feature>
  /**
   * 表格操作栏放置的自定义内容
   */
  tableOperation?: tableOperation | Array<tableOperation>
  /**
   * 分页的配置 一页展示10条？
   */
  pagination?: Pagination
  /**
   * 需要展示的每个字段 可配置每个字段对应的功能
   */
  templates: Array<Templates> | Array<Array<Templates>>
  /**
   * 是否开启对话框
   */
  isShownDialog?: Boolean | Array<Boolean>
}

/**
 * 是否开启增删改查中其中一项功能
 */
interface Feature {
  create?: boolean
  update?: boolean
  delete?: boolean
}

/**
 * 每个字段对应的相关信息
 */
interface Templates {
  /**
   *  字段名称
   */
  label?: string
  /**
   *  后端需要的字段值
   */
  value: string
  /**
   * 该字段展示的表单类型 输入框？ 下拉框？ 时间选择器？
   */
  type?: FormItemEnum
  /**
   * 时间选择器类型 对照element-plus的时间选择器类型
   */
  datePickerType?: string
  /**
   * 时间选择器选择范围分割符
   */
  rangeSeparator?: string
  /**
   * 时间段选择器右边占位符
   */
  startPlaceholder?: string
  /**
   * 时间段选择器右边占位符
   */
  endPlaceholder?: string
  /**
   * 查询区域该字段展示的默认值
   */
  defaultQueryValue?: string
  /**
   *  该字段的表单规则 参照element-plus
   */
  rules?: []
  /**
   * 是否必填
   */
  require?: boolean
  /**
   * 占位符
   */
  placeholder?: string
  /**
   * type 为下拉框时的options
   */
  items?: Array<{
    label: {} | string
    value: string | number
    type?: number | string
  }>
  /**
   * 在表格中多宽
   */
  width?: number | string
  /**
   * 是否在增删改查中包含此字段
   *
   */
  visible?: {
    query?: boolean
    table?: boolean
    create?: boolean
    update?: boolean
  }
  /**
   * 是否需要展示
   * 不展示 仅会在请求中带上该条件
   */
  queryUnShow?: boolean
  /**
   * 异步加载下拉框的options
   */
  fetchQuery?: (temp: Templates) => any
  /**
   * 在表格中自定义展示该字段
   * 按钮的形式？
   * 给字段带点颜色？
   */
  render?(param: any): any
}

/**
 * 表格操作区自定义
 * 不需要编辑？ 删除？
 * 需要下载？
 */
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

/**
 * 表单类型
 */
enum FormItemEnum {
  select = 1,
  input = 2,
  switch = 3,
  radio = 4,
  datePicker = 5,
  datePickerRange = 6,
  cascader = 7,
}

// export const FormItemEnum =  {
//   select:1,
//   input : 2,
//   switch : 3,
//   radio : 4,
//   datePicker : 5,
//   datePickerRange : 6,
//   cascader : 7,
// }
enum OperatorCmd {
  detail = 1,
  delete = 2,
  update = 3,
}
interface HandlerParams {
  data: any
  current: any
}

/**
 * 提供Fuzzy自动处理增删改查时的生命周期
 * 查询时与要添加业务无关的字段？
 * 更新时要再次修改字段的value？
 * 删除时要多带一些数据给后端？
 */
interface FuzzyHandler {
  /**
   * 查询前
   */
  queryBefore?: (params: HandlerParams) => any //
  /**
   * 查询点击下拉框事件
   */
  querySelectChange?: ({ value, model }: any) => any
  /**
   * 点击更新对话框出来前
   */
  createBeforePop?: (params: HandlerParams) => any //
  /**
   * 点击编辑对话框出来前
   */
  updateBeforePop?: (params: HandlerParams) => any //
  /**
   * 删除前
   */
  deleteBefore?: (params: HandlerParams) => any //
  /**
   * 确认更新时
   */
  createConfirm?: (params: HandlerParams) => Promise<any> //
  /**
   * 新增更新时
   */
  updateConfirm?: (params: HandlerParams) => Promise<any> //
  /**
   * 取消更新时
   */
  createCancel?: (params: HandlerParams) => any //
  /**
   * 取消编辑时
   */
  updateCancel?: (params: HandlerParams) => any
}

/**
 * 因公司项目新增表单、编辑表单比较复杂 暂未实现自动更新、编辑
 * 选择让用户自己提供编辑或新增时的组件
 * 点击确定、取消事件 会触发FuzzyHandler.createConfirm ....
 */
interface RenderDialog {
  /**
   * 编辑对话框内展示的内容
   */
  UpdateRender?: VNode
  /**
   * 更新对话框内展示的内容
   */
  CreateRender?: VNode
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

export interface ResponseHandler {
  data: Array<any>
  success: boolean
  total: string | number
}

export type ImplResponseType = (response: any) => ResponseHandler

export { FormItemEnum, OperatorCmd }
export type { AllModels, TemplateConfiguration, Templates, FuzzyBaseModel, tableOperation, Pagination, Api, Feature, FuzzyHandler, RenderDialog, DialogChanageable, HandlerParams, ItemProp }
export * from './symbols'
export * from '../components/Dialog/types'
