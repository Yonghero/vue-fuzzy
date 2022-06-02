import type { Ref } from 'vue'
import type { FuzzyBaseModel, TemplateConfiguration } from '../types'
import IconImg from '../../assets/public-icon.png'
import './index.css'

interface tabItem {
  label?: string
  value?: string
  onClick?: () => void
}

class BarModel implements FuzzyBaseModel<tabItem> {
  config!: TemplateConfiguration
  data: Ref<tabItem[]> = ref([])
  activeIndex: Ref<number> = ref(0)
  activeTitle: Ref<string | undefined> = ref('')

  constructor(config: TemplateConfiguration) {
    this.config = config
    this.mapDataAccordConfig()
    this.mapTitle()
  }

  /**
   * 根据配置文件更新顶部栏的初始配置
   * @param config
   * @returns
   */
  mapDataAccordConfig() {
    if (this.config.tabList) {
      this.data.value = this.config.tabList.map((tab, tabIndex) => {
        const _tab = { ...tab, onClick: () => {} }
        _tab.onClick = () => {
          this.activeIndex.value = tabIndex
          this.activeTitle.value = tab.label
        }
        return _tab
      })
    }
  }

  mapTitle() {
    if (typeof this.config.title === 'object')
      this.activeTitle.value = this.config.title.text
    else
      this.activeTitle.value = this.config.title
    if (this.config.tabList)
      this.activeTitle.value = this.config.tabList[0].label
  }

  handleEvent() {
  }

  render() {
    let renderTitle = null
    if (!this.config.tabList && this.config.title) {
      // 带有图片的title
      if (typeof this.config.title === 'object') {
        renderTitle = <>
          <img src={IconImg} class="w-4 h-5 mr-2 mb-2" />
          <h2 class="mb-2 text-base">{this.config.title.text}</h2>
        </>
      }
      // 普通文本
      else {
        renderTitle = <>
          <div class="w-1 h-4 mb-2 rounded-sm bg-primary-100 mr-2"></div>
          <h2 class="mb-2 text-base">{this.config.title}</h2>
        </>
      }
    }
    // 切换按钮
    else if (this.config.tabList && this.config.tabList.length > 0) {
      renderTitle = this.data.value.map((tab, tabIndex) => {
        return <div
          key={tab.value}
          onClick={tab.onClick}
          class={[
            this.activeIndex.value === tabIndex ? 'bg-primary-100 text-white' : 'bg-gray-200 text-gray-700',
            'py-2', 'px-8',
            'rounded-t-lg', 'flex', 'items-center', 'mr-3', ' shadow-primary-50', 'cursor-pointer',
          ].join(' ')}
        >{tab.label}</div>
      })
    }
    // 按钮切换
    return <div>
      <div class="overflow-hidden relative">
        <div class="w-full h-full flex items-center flex-wrap box-border">
          { renderTitle }
        </div>
        <div class="w-full h-px bg-indigo-50 absolute bottom-0 left-0"></div>
      </div>
    </div>
  }
}

export {
  BarModel,
}
