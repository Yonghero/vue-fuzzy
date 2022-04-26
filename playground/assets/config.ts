// import type { TemplateConfiguration } from '~/components/Fuzzy/types'
import { FormItemEnum } from '../../core/Fuzzy/types'
import type { TemplateConfiguration } from '../../core/Fuzzy/types'

export const config = {
  api: ['/safety/ent/base', '/safety/ent/base'],
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
      label: '企业简称',
      value: 'entName',
      type: FormItemEnum.select,
      items: [
        { label: '全部', value: '' }],
      visible: {
        query: true,
      },
    },
    {
      label: '企业名称',
      width: '300px',
      value: 'enterpriseName',
      visible: {
        table: true,
      },
    },
    {
      label: '企业简称',
      value: 'abbreviation',
      visible: {
        table: true,
      },
    },
    {
      label: '社会统一代码',
      value: 'enterpriseCode',
      width: 230,
      visible: {
        table: true,
      },
    },
    {
      label: '企业类型',
      value: 'enterpriseType',
      visible: {
        table: true,
      },
    },
    {
      label: '行业类型',
      value: 'enterpriseCategory',
      visible: {
        table: true,
      },
    },
    {
      label: '规模',
      value: 'enterpriseScale',
      visible: {
        table: true,
      },
    },
    {
      label: '生产状态',
      value: 'produceStatus',
      type: FormItemEnum.select,
      items: [{ label: '全部', value: '' }],
      visible: {
        query: true,
        table: true,
      },
      render({ row }: any) {
        return h('div', {}, row.produceStatus)
      },
    },
    {
      label: '面积',
      value: 'totalArea',
      visible: {
        table: true,
      },
      render({ row }: any) {
        return h('div', {}, [row.totalArea ? `${row.totalArea}㎡` : '-'])
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
