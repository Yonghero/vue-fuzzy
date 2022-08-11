import type { OptionsConfiguration } from '../../../fuzzy-next/types'

export interface CustomTemplate {
  placeholder?: string
}

export const options: OptionsConfiguration<CustomTemplate> = {
  title: '这是tab111',
  api: '/safety/ent/base',
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
      type: 'select',
      options: [
        { label: '正常', value: 0 },
        { label: '异常', value: 1 },
        { label: '注销', value: 2 },
      ],
      label: '生产状态',
      value: 'produceStatus',
      render({ row }) {
        return <div>{
          this.options && this.options.find(i => i.value === row.produceStatus)?.label
        }</div>
      },
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
