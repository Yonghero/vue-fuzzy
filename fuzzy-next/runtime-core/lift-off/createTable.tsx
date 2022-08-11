import type { Feature, TableRenderer, TableTemplate, Templates } from '../../types'
import type { RequestCallback } from '../../types/requestProvider'
import type { DataProvider } from './createDataProvide'

export function createTable(table: TableRenderer, templates: Partial<Templates>[], dataProvider: DataProvider, requestCallback: RequestCallback, feature: Feature | undefined): any {
  function onUpdate(item: Templates, scope) {
    console.log(item, scope, 'update')
  }

  function onDelete(item: Templates, scope) {
    console.log(item, scope, 'delete')
  }

  templates.push({
    width: 200,
    value: 'fuzzy-table-operate',
    render(item, scope) {
      return <div class="w-full h-full flex justify-center items-center gap-x-3">
        <div class="text-blue-500 cursor-pointer" onClick={() => onUpdate(item, scope)}>编辑</div>
        <div class="text-red-500 cursor-pointer" onClick={() => onDelete(item, scope)}>删除</div>
      </div>
    },
  } as TableTemplate)

  const Table = table.render({
    templates: templates as any,
    feature,
  })

  return <Table data={dataProvider.tableData} loading={dataProvider.tableLoading}></Table>
}
