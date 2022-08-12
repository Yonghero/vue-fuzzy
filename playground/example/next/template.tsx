import type { OptionsConfiguration } from '../../../fuzzy-next/types'
import type { FuzzyNextHandlers } from '../../../fuzzy-next/types/handler'

export interface CustomTemplate {
  placeholder?: string
}

export const options: OptionsConfiguration<CustomTemplate> = {
  title: '这是tab111',
  api: '/safety/major-hazard',
  feature: {
    update: true,
    delete: true,
  },
  template: [
    {
      type: 'input',
      label: '企业名称',
      value: 'enterpriseName',
      placeholder: '来吧占位置',
      visible: {
        table: true,
      },
    },
    {
      type: 'select',
      options: [
        { label: 'hhh', value: 'hhh' },
      ],
      label: '企业code',
      value: 'enterpriseCode',
      render() {
        return <div>123hhh</div>
      },
      visible: {
        table: true,
      },
    },
    {
      label: '级别',
      value: 'level',
      type: 'input',
      visible: {
        table: true,
      },
    },
    {
      label: '两重点名称',
      value: 'name',
      type: 'input',
      visible: {
        table: true,
      },
    },
  ],
}

export const options2: OptionsConfiguration<CustomTemplate> = {
  title: '这是tab2',
  api: '/safety/ent/base',
  template: [
    {
      type: 'input',
      label: '企业名2',
      value: 'entName',
      placeholder: '来吧占位置',
      visible: {
        table: true,
      },
    },
    {
      type: 'select',
      options: [
        { label: 'hhh', value: 'hhh' },
      ],
      label: '企业code',
      value: 'enterpriseCode',
      render() {
        return <div>123hhh</div>
      },
      visible: {
        table: true,
      },
    },
  ],
}

export const mockData = [
  {
    field1: 'field1',
    field2: 'field2',
  },
  {
    field1: 'field1',
    field2: 'field2',
  },
  {
    field1: 'field1',
    field2: 'field2',
  },
]

// eslint-disable-next-line vue/one-component-per-file
export const UpdateComponent = defineComponent({
  props: ['row'],
  render(this) {
    console.log(this.row, '-update')
    return <div>update</div>
  },
})

export const CreateComponent = defineComponent({
  render() {
    return <div>create</div>
  },
})

export const handlers: FuzzyNextHandlers = {
  queryBefore: async(params) => {
    console.log('queryBefore', params)
    return params
  },
  updateBeforePop: (params) => {
    console.log('updateBeforePop', params)
  },
  deleteBefore: async(params) => {
    console.log('deleteBefore', params)

    return true
  },
  updateConfirm: async() => {
    return true
  },
}
