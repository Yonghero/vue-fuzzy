import type { PropType } from 'vue'
import { DefaultLayoutProvider } from '../impl-layout-provider/default-layout-provider'
import type { LayoutProvider, LayoutProviderRenderer, OptionsConfiguration, Renderer } from '../types'
import { combination } from './combination'
import 'virtual:windi.css'

export function createComponent(renderer: Renderer, layoutProvider: LayoutProvider | undefined) {
  const Layout = layoutProvider || new DefaultLayoutProvider()

  return defineComponent({
    props: {
      options: {
        type: Object as (PropType<OptionsConfiguration<any>>),
        default: () => ({
          template: [],
        }),
      },
      mock: {
        type: Array,
        default: () => ([]),
      },
    },
    setup(props) {
      console.log(`%c${'component setup-----'}`, 'color: #008c8c', props)

      const data = computed(() => {
        if (props.mock?.length) return props.mock
        return []
      })

      const Table = renderer.table.render({
        templates: props.options?.template,
        data: data.value,
        feature: props.options?.feature,
      })

      const FilterFrom = renderer.form.render({
        templates: props.options?.template.filter(item => !(item.visible && item.visible.filter === false)),
        feature: props.options?.feature,
        isHorizontal: true,
      })

      const Button = renderer.button.render

      function FilterButton() {
        return <Button onClick={() => {
          console.log('filter button click', FilterFrom.model)
        }
        }>查询</Button>
      }

      combination({ Table, FilterFrom, Button })

      const providerRender = {
        Table,
        Filter: FilterFrom.render,
        FilterButton: <FilterButton/>,
      } as LayoutProviderRenderer

      return () => (
        <>
          {
            Layout.render(providerRender)
          }
        </>
      )
    },
  })
}
