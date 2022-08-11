/**
 * 组件渲染器接口
 */
import type { SetupContext } from '@vue/runtime-core'
import type { Component, Ref, VNode } from 'vue'
import type { Feature, FormTemplate, Option, Templates } from './options'

export interface Renderer {
  table: TableRenderer
  button: ButtonRenderer
  form: FormRenderer
  dialog: DialogRenderer
  tab: TabRenderer
  page: PageRenderer
  message: MessageRender
}

/**
 * 表格渲染器接口
 */
export interface TableRenderer {
  render: (props: TableRenderProps) => (props: { data: Ref<any>; loading: Ref<boolean> }) => VNode
  getColumns: (templates: Templates[], feature: Feature | undefined) => VNode[]
  shouldFeaturesRender: (feature: Feature | undefined) => boolean

}

/**
 * 表格渲染器参数
 */
export interface TableRenderProps {
  templates: Templates[]
  feature: Feature | undefined
}

/**
 * 表格渲染器接口
 */
export type FormItemExtra<cmpName extends string, cmp extends Component> = {
  [key in cmpName]: cmp
}

export type FormCompProps = Partial<FormTemplate> & { model: any; value: any }

export interface FormRenderer extends FormItemExtra<any, any>{
  render: (props: FormRenderProps) => { render: VNode; model: any }
  getModel: (templates: Templates[]) => Record<string, any> | Ref<Record<string, any>>
  getFromItems: (templates: Templates[], model) => VNode[]
  select: (props: FormCompProps, context: SetupContext) => VNode
  input: (props: FormCompProps, context: SetupContext) => VNode
}

export interface FormRenderProps{
  templates: Templates[]
  feature: Feature | undefined
  isHorizontal: boolean
}

/**
 * 按钮渲染器接口 (函数式受控组件)
 */
export interface ButtonRenderer {
  render: (props: Readonly<any>, context: SetupContext) => VNode
}

/**
 * 选项卡渲染器接口 (/**)
 */
export interface TabRenderer {
  render: (props: Readonly<TabRenderProps>, context: SetupContext) => VNode
}
export interface TabRenderProps {
  options: Option[]
  vModel: number
  modelValue?: any
}

export interface PageRenderer{
  render: (props: Readonly<PageProps>, context: SetupContext) => VNode

}
export interface PageProps {
  total: Ref<number>
  onUpdatePage?: (page: number) => void // vue emit
}

/**
 * dialog渲染器接口 (函数式受控组件)
 */

export interface DialogRenderer{
  render: (props: Readonly<DialogRenderProps>, context: SetupContext) => VNode
}
export interface DialogRenderProps {
  modelValue: boolean
  title: string
  footer?: VNode[]
  style?: Record<string, any>
}

export interface MessageRender {
  success: (message) => any
  warning: (message) => any
  error: (message) => any
}
