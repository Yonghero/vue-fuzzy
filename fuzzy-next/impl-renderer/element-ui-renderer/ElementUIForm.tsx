import { ElForm, ElFormItem } from 'element-plus'
import type { VNode } from 'vue'
import type { FormCompProps, FormItem, FormRenderProps, FormRenderer, Templates } from '../../types'

export class ElementUIForm implements FormRenderer {
  render({ templates }: FormRenderProps) {
    const model = this.getModel(templates)
    const FormItems = this.getFromItems(templates, model)

    return {
      render: (
        <ElForm model={model} class="flex flex-wrap gap-x-5"
          style={{
            display: 'flex',
          }}
        >
          {
            FormItems
          }
        </ElForm>
      ),
      model,
    }
  }

  /**
   * 获取绑定表单的数据迷行
   * @param templates
   */
  getModel(templates: Templates[]) {
    const model = reactive({})
    templates.forEach((item) => {
      if (item.value)
        model[item.value] = item.defaultQueryValue ? item.defaultQueryValue : ''
    })
    return model
  }

  /**
   * 根据templates 生产表单项组件
   * @param templates
   * @param model
   */
  getFromItems(templates: Templates[], model) {
    return templates.map((item) => {
      const FormItemComp = this._getFormComponent(item.type)
      return (
        <ElFormItem
          label={item.label}
          key={item.value}>
          <FormItemComp {...item} model={model}/>
        </ElFormItem>
      )
    })
  }

  _getFormComponent(type: FormItem) {
    const COMPS_MAP = {
      input: this.input,
      select: this.select,
    }
    return COMPS_MAP[type]
  }

  input(props: FormCompProps) {
    const _props = computed(() => {
      const p = { ...props }
      delete p.value
      return p
    })
    return (
      <el-input
        v-model={props.model[props.value]}
        placeholder="请输入"
        size="default"
        {..._props.value}
      />
    )
  }

  select(props: FormCompProps): VNode {
    return (
      <el-select
        v-model={props.model[props.value]}
        {...props}
      >
        {
          props.options
            && props.options.map(item => (
              <el-option
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))
        }
      </el-select>
    )
  }
}
