/**
 * 组件渲染器接口
 */
import type { SetupContext } from '@vue/runtime-core'
import type { Component, Ref, VNode } from 'vue'
import type { Feature, FormTemplate, Templates } from './options'

export interface Renderer {
  table: TableRenderer
  button: ButtonRenderer
  form: FormRenderer
  // dialog: DialogRenderer
  // tab: TabRenderer
  // page: PageRenderer
}

export interface TableRenderer {
  render: (props: TableRenderProps) => VNode
  shouldFeaturesRender: (feature: Feature | undefined) => boolean
  getColumns: (templates: Templates[], feature: Feature | undefined) => VNode[]
}

/**
 * 表格渲染器参数
 */
export interface TableRenderProps {
  templates: Templates[]
  feature: Feature | undefined
  data: any[]
}

export interface FormComponent {
  select: VNode
  input: VNode
}

export type FormItemExtra<cmpName extends string, cmp extends Component> = {
  [key in cmpName]: cmp
}

export type FormCompProps = Partial<FormTemplate> & { model: any; value: any }

export interface FormRenderer extends FormItemExtra<any, any>{
  render: (props: FormRenderProps) => { render: VNode; model: any }
  getModel: (templates: Templates[]) => Record<string, any> | Ref<Record<string, any>>
  getFromItems: (templates: Templates[], model) => VNode[]
  select: (props: FormCompProps) => VNode
  input: (props: FormCompProps) => VNode
}

export interface FormRenderProps{
  templates: Templates[]
  feature: Feature | undefined
  isHorizontal: boolean
}

/**
 * 按钮无状态组件渲染器接口
 */
export interface ButtonRenderer {
  render: (props: Readonly<any>, context: SetupContext) => VNode
}

export interface TabRenderer {
  render: () => VNode
}

export interface PageRenderer{
  render: () => VNode

}

export interface DialogRenderer{
  render: () => VNode
}
