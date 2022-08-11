import type { LayoutProviderRenderer, OptionsConfiguration, Renderer, Templates } from '../../types'
import type { RequestProvider } from '../../types/requestProvider'
import { createDataProvide } from './createDataProvide'
import { createDialog } from './createDialog'
import { createFilter } from './createFilter'
import { createPage } from './createPage'
import { createRequest } from './createRequest'
import { createTable } from './createTable'

export function LiftOff(renderer: Renderer, options: OptionsConfiguration<any>, mock: any[], request: RequestProvider): Omit<LayoutProviderRenderer, 'Tab'> {
  console.log('LiftOff----', options)

  // global data provide
  // dispatch data
  const dataProvide = createDataProvide()

  // provide request's methods
  const requestCallback = createRequest(options, request)

  // Table Component
  const Table = createTable(
    renderer.table,
    getTemplatesWithFeature(options.template, 'table'),
    dataProvide,
    requestCallback,
    options.feature,
  )

  // Page Component
  const Page = createPage(renderer, requestCallback, dataProvide)

  // Filter Component
  const {
    Filter,
    FilterButton,
  } = createFilter(
    renderer,
    getTemplatesWithFeature(options.template, 'filter'),
    options?.feature,
    requestCallback,
    dataProvide,
  )

  const Dialog = createDialog(renderer, dataProvide)

  return {
    Filter,
    FilterButton,
    Table,
    Page,
    Dialog,
  }
}

function getTemplatesWithFeature(templates: Templates[], feature: string): Templates[] {
  return templates.filter((item) => {
    return !(item.visible && item.visible[feature] === false)
  })
}
