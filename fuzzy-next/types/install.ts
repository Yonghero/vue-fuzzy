import type { ComponentOptionsMixin } from '@vue/runtime-core'

import type { LayoutProvider } from './layoutProvider'
import type { Renderer } from './renderer'

export interface FuzzyInstall {
  renderer: (renderer: () => Renderer) => FuzzyInstall
  layoutProvider: (layoutProvider: LayoutProvider) => (ComponentOptionsMixin | undefined)
}
