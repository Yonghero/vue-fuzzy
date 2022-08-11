import type { LayoutProvider, Renderer } from '../types'
import type { FuzzyInstall } from '../types/install'
import { createComponent } from './component'

export function createFuzzy(): FuzzyInstall {
  let implRenderer: Renderer | undefined
  let implLayoutProvider: LayoutProvider | undefined

  const install = {
    renderer,
    layoutProvider,
  }

  // 安装UI渲染器
  function renderer(renderer: () => Renderer) {
    implRenderer = renderer()
    return install
  }

  // 实现布局提供器
  function layoutProvider(layoutProvider: LayoutProvider) {
    implLayoutProvider = layoutProvider
    return component()
  }

  // 生成组件
  function component() {
    if (!implRenderer)
      throw new Error('Renderer is not defined')
    if (implRenderer)
      return createComponent(implRenderer, implLayoutProvider)
  }

  return install
}
