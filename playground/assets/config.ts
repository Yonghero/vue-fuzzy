// import type { TemplateConfiguration } from '~/components/Fuzzy/types'
import { FormItemEnum } from '../../core/Fuzzy/types'
import type { TemplateConfiguration } from '../../core/Fuzzy/types'

export const config = {
  api: ['/v1/user', 'v2/user'],
  title: '这是标题aaa',
  tabList: [{ label: '牛哈', value: '1' }, { label: '哈哈哈', value: '1' }],
  feature: [{ create: true, delete: true, update: true }, { create: true, delete: false }],
  pagination: {
    size: 10,
  },
  templates: [[
    {
      label: '序号',
      value: 'serialNumber',
      visible: {
        table: true,
      },
    },
    {
      label: '选择框',
      value: 'selectBox',
      visible: {
        table: true,
      },
    },
    {
      label: '姓名',
      value: 'name',
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
      render: (row: any) => h('div', { style: 'color: red' }, [row.$index]),
    },
    {
      label: '年龄',
      value: 'age',
      defaultQueryValue: '12',
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
    },
    {
      label: '年龄',
      value: 'age',
      defaultQueryValue: '12',
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
    },
    {
      label: '年龄',
      value: 'age',
      defaultQueryValue: '12',
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
    },
    {
      label: '年龄',
      value: 'age',
      defaultQueryValue: '12',
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
    },
    {
      label: '爱好',
      value: 'hobby',
      type: FormItemEnum.select,
      items: [],
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
      fetchQuery() {
        setTimeout(() => {
          this.items?.push(...[{ label: '打篮球', value: 'bk' }, { label: '打篮', value: 'bk' }, { label: '打', value: 'bk' }])
        }, 500)
      },
    },
    {
      label: '时间',
      value: 'time',
      type: FormItemEnum.datePicker,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
    },
  ], [
    {
      label: '姓名1',
      value: 'name',
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
    },
    {
      label: '年龄1',
      value: 'age',
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
    },
    {
      label: '爱好1',
      value: 'hobby',
      items: [{ label: '打篮球', value: 'bk' }, { label: '打篮球', value: 'bk' }, { label: '打篮球', value: 'bk' }],
      require: true,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
    },
    {
      label: '时间',
      value: 'time',
      type: FormItemEnum.datePicker,
      visible: {
        query: true,
        table: true,
        create: true,
        update: true,
      },
    },
  ]],
  tableOperation: [{
    show: true,
    operator: [
      {
        label: '自定义',
        value: 'diy',
        onClick: (row: any) => {
          // param.setVisible(true)
          console.log('自定义按钮', row)
        },
      },
    ],
  },
  {
    show: true,
    operator: [
      {
        label: '自定义',
        value: 'diy',
        onClick: (row: any) => {
          console.log('自定义按钮', row)
        },
      },
    ],
  }],
} as TemplateConfiguration
