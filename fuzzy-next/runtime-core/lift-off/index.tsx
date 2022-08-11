import type { VNode } from 'vue'
interface CombineProps {
  Table: VNode<any>
  FilterFrom: { render: VNode; model: any }
  Button: any
}
export function combination({ Table, FilterFrom, Button }: CombineProps) {
  function FilterButton() {
    return <Button onClick={() => {
      console.log('filter button click', FilterFrom.model)
    }
    }>查询</Button>
  }

  return {
    FilterButton,
    Table,
    FilterFrom,
  }
}
