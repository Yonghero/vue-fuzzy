import type { LayoutProvider, LayoutProviderRenderer } from '../../types'

export class DefaultLayoutProvider implements LayoutProvider {
  render(renderer: LayoutProviderRenderer) {
    return (
      <div>
        <div class="flex flex-wrap px-6 pt-6 pb-2 items-start justify-between">
          { renderer.Filter}
          { renderer.FilterButton }
        </div>
        <div class="relative top-100">
          { renderer.Table }
        </div>
      </div>
    )
  }
}
