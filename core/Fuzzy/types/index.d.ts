import type { Ref, VNode } from 'vue'
import type { DialogStyle } from '../components/Dialog/types'
// import type { PagingModel, QueryModel, TableModel } from '../models'
interface TemplateConfiguration {
  title?: string | {
    text: string
    icon: string
  }
  tabList?: Array<{
    label: string
    value: any
  }>
  dialogStyle?: DialogStyle | Array<DialogStyle>
  api: string | Api | Array<string> | Array<Api>
  feature: Feature | Array<Feature>
  tableOperation?: tableOperation | Array<tableOperation>
  pagination?: Pagination
  templates: Array<Templates> | Array<Array<Templates>>
  isShownDialog?: Boolean | Array<Boolean>
}
interface Feature {
  create?: boolean
  update?: boolean
  delete?: boolean
}
interface Templates {
  label?: string
  value: string
  type?: FormItemEnum
  datePickerType?: string
  rangeSeparator?: string
  startPlaceholder?: string
  endPlaceholder?: string
  defaultQueryValue?: string
  rules?: []
  require?: boolean
  placeholder?: string
  items?: Array<{
    label: {} | string
    value: string | number
    type?: number | string
  }>
  width?: number | string
  visible?: {
    query?: boolean
    table?: boolean
    create?: boolean
    update?: boolean
  }
  fetchQuery?: (temp: Templates) => any
  render?(param: any): any
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
declare enum FormItemEnum {
  select = 1,
  input = 2,
  switch = 3,
  radio = 4,
  datePicker = 5,
  datePickerRange = 6,
  cascader = 7,
}
declare enum OperatorCmd {
  detail = 1,
  delete = 2,
  update = 3,
}
interface HandlerParams {
  data: any
  current: any
}
interface FuzzyHandler {
  queryBefore?: (params: HandlerParams) => any
  createBeforePop?: (params: HandlerParams) => any
  updateBeforePop?: (params: HandlerParams) => any
  deleteBefore?: (params: HandlerParams) => any
  createConfirm?: (params: HandlerParams) => Promise<any>
  updateConfirm?: (params: HandlerParams) => Promise<any>
  createCancel?: (params: HandlerParams) => any
  updateCancel?: (params: HandlerParams) => any
}
interface RenderDialog {
  UpdateRender?: VNode
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
export { FormItemEnum, OperatorCmd }
export type { AllModels, TemplateConfiguration, Templates, FuzzyBaseModel, tableOperation, Pagination, Api, Feature, FuzzyHandler, RenderDialog, DialogChanageable, HandlerParams, ItemProp }
export * from './symbols'
export * from '../components/Dialog/types'
