import type { VNode } from 'vue'

export interface LayoutProvider{
  render: (renderer: LayoutProviderRenderer) => VNode
}

export interface LayoutProviderRenderer{
  Table: () => VNode<any>
  FilterButton: VNode<any>
  Filter: VNode<any>
  Page: VNode
  Tab: VNode
  Dialog: VNode
}
