import type { LayoutProviderRenderer, ModalRenderer, OptionsConfiguration, Renderer, Templates } from '../../types'
import type { FuzzyNextHandlers } from '../../types/handler'
import type { RequestProvider } from '../../types/requestProvider'
import { createDataProvide } from './createDataProvide'
import { createDialog } from './createDialog'
import { createFilter } from './createFilter'
import { createPage } from './createPage'
import { createRequest } from './createRequest'
import { createTable } from './createTable'
import { createCreateButton } from './createCreateButton'

export function LiftOff(
  renderer: Renderer,
  modalRenderer: ModalRenderer,
  handlers: FuzzyNextHandlers,
  options: OptionsConfiguration<any>,
  mock: any[],
  request: RequestProvider): Omit<LayoutProviderRenderer, 'Tab'> {
  console.log('----LiftOff----')

  // global data provide
  // dispatch data
  const dataProvide = createDataProvide()

  // provide request's methods
  const requestCallback = createRequest(options, request, handlers, dataProvide)

  const Dialog = createDialog(renderer, modalRenderer, handlers, requestCallback, dataProvide, options)

  // Table Component
  const Table = createTable(
    renderer,
    modalRenderer,
    handlers,
    getTemplatesWithFeature(options.template, 'table'),
    dataProvide,
    requestCallback,
    options,
  )

  // Page Component
  const Page = createPage(renderer, handlers, requestCallback, dataProvide)

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

  const CreateButton = createCreateButton(renderer, modalRenderer, getTemplatesWithFeature(options.template, 'create'), handlers, requestCallback, dataProvide, options)

  return {
    Filter,
    FilterButton,
    Table,
    Page,
    Dialog,
    CreateButton,
  }
}

function getTemplatesWithFeature(templates: Templates[], feature: string): Templates[] {
  return templates.filter((item) => {
    return !(item.visible && item.visible[feature] === false)
  })
}
