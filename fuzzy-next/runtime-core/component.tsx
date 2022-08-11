import type { PropType } from 'vue'
import type { LayoutProvider, OptionsConfiguration, Renderer } from '../types'
import type { RequestProvider } from '../types/requestProvider'
import { LiftOff } from './lift-off'

export function createComponent(globalRenderer: Renderer, globalLayoutProvider: LayoutProvider, requestProvider: RequestProvider) {
  return defineComponent({
    props: {
      a: String,
      options: {
        type: Object as (PropType<OptionsConfiguration<any>>),
        default: () => ({ template: [] }),
        required: true,
      },
      renderer: {
        type: Object as (PropType<Renderer>),
        default: () => globalRenderer,
      },
      layoutProvider: {
        type: Object as (PropType<LayoutProvider>),
        default: () => globalLayoutProvider,
      },
      mock: {
        type: Array,
        default: () => ([]),
      },
    },
    setup(props) {
      console.log(`%c${'component setup-----'}`, 'color: #008c8c', props)

      // 合并options 为多tab页做准备
      const mergeOptions = computed(() => {
        if (Array.isArray(props.options))
          return props.options
        else
          return [props.options]
      })

      // 当前选中的tab下标
      const activeTabIndex = ref(0)

      // 最新的页面配置
      const activeOptions = computed(() => {
        return mergeOptions.value[activeTabIndex.value]
      })

      // Tab Component
      const computedTab = computed(() => {
        return <props.renderer.tab.render
          vModel={activeTabIndex.value}
          options={mergeOptions.value.map((i, idx) => ({ label: i.title, value: idx }))}
        />
      })

      // 根据activeOptions页面配置动态渲染
      const dynamicLayout = computed(() => {
        const components = LiftOff(props.renderer, activeOptions.value, props.mock, requestProvider)
        return props.layoutProvider.render({ ...components, Tab: computedTab.value })
      })

      return () => (
        <>
          {
            dynamicLayout.value
          }
        </>
      )
    },
  })
}