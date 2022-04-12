import type { InjectionKey } from 'vue'
import type { TemplateConfiguration } from '.'
const ConfigProvide: InjectionKey<TemplateConfiguration> = Symbol('ConfigProvide')
const UpdateModelProvide: InjectionKey<(index: number) => void> = Symbol('UpdateModel')
const QueryModelProvide: InjectionKey<any> = Symbol('QueryModel')
const BarModelProvide: InjectionKey<any> = Symbol('BarModel')
const TableModelProvide: InjectionKey<any> = Symbol('TableModel')
const PagingModelProvide: InjectionKey<any> = Symbol('PagingModel')
const RequestModelProvide: InjectionKey<any> = Symbol('RequestModel')
const FuzzyHandlerProvide: InjectionKey<any> = Symbol('FuzzyHandlerProvide')

export {
  ConfigProvide,
  UpdateModelProvide,
  QueryModelProvide,
  BarModelProvide,
  TableModelProvide,
  PagingModelProvide,
  RequestModelProvide,
  FuzzyHandlerProvide,
}
