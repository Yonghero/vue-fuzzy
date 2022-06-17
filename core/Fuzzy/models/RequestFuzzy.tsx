import type { UnwrapNestedRefs, WritableComputedRef } from 'vue'
import { watchEffect } from 'vue'
import _ from 'lodash'
import type { AllModels, Api, FuzzyHandler, QueryMode, Templates } from '../types'
import { getRequest, getResponse } from '../../shared'

interface Request<g, p, d> {
  api: string | Api
  get: (params: object) => g
  post: () => p
  delete: (param: any) => d
}

export class RequestFuzzy implements Request<any, any, any> {
  api: string | Api
  postResponse: any
  handler: FuzzyHandler
  deleteResponse: any
  allModels: UnwrapNestedRefs<AllModels>
  // 缓存请求参数
  requestParams!: WritableComputedRef<Record<string, any>>
  queryMode: QueryMode
  axiosInstance

  constructor(getFieldOfTmpl: any, allModels: UnwrapNestedRefs<AllModels>, handler: FuzzyHandler) {
    this.axiosInstance = getRequest()
    this.api = getFieldOfTmpl('api')
    this.queryMode = getFieldOfTmpl('queryMode')
    this.allModels = allModels
    this.handler = handler
    this.initRequestParams()
    // getData

    // if (handler?.queryBefore) {
    //   handler.queryBefore({ data: this.allModels.queryModel.model, current: this.allModels.queryModel }).then((data) => {
    //     this.get({ ...data })
    //   })
    // }
    // else {
    //   this.get({})
    // }
    this.get({})
  }

  /**
   * 初始化get请求参数
   */
  initRequestParams() {
    // 依赖query参数、分页器参数
    this.requestParams = computed(() => ({
      ...this.allModels.queryModel.model,
      size: this.allModels.pagingModel.size,
      // FIXME: 根据后端配置
      current: this.allModels.pagingModel.model.currentSize,
    }))
  }

  /**
   * 返回对应请求的url
   * @param mode Api
   * @returns
   */
  getApiOfReqMode(mode: keyof Api) {
    let api: Api = {
      query: '',
      create: '',
      delete: '',
      update: '',
    }

    if (typeof this.api === 'string')
      Object.keys(api).forEach(mode => api[mode] = this.api)
    else
      api = this.api

    return api[mode]
  }

  /**
   * get request to do
   */
  private async getReqDo(params: object): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const { tableModel, pagingModel, queryModel } = this.allModels
    tableModel.tableLoading = true

    const requestConfig = {
      params: Object.assign({}, this.getRequestParams(), params),
    } as any
    // 高级查询特殊操作
    if (this.queryMode === 'advanced') {
      requestConfig.paramsSerializer = (params: any) => {
        let str = ''
        for (const key of Object.keys(params)) {
          // 分页参数安装简单查询处理
          if (key === 'size' || key === 'current')
            str += `${key}=${params[key]}&`
          for (const temp of queryModel.data) {
            const { queryOperator, value } = temp as Templates
            if (key === value)
              str += `${encodeURIComponent(`q[${key}][${queryOperator || 'like'}]`)}=${params[key]}&`
          }
        }

        return str.substring(0, str.length - 1)
      }
    }

    const response: any = await this.axiosInstance
      .get(
        this.getApiOfReqMode('query'),
        requestConfig,
      )
    const { data, success, total } = getResponse(response)
    // 请求成功
    if (success) {
      pagingModel.model.total = total
      tableModel.model = data
      tableModel.tableLoading = false
    }
    return true
  }

  async get(params: object = {}) {
    watchEffect(async() => {
      _.debounce(() => {
        if (this.handler?.queryBefore) {
          this.handler.queryBefore({ data: { ...this.allModels.queryModel.model, ...params }, current: this.allModels.queryModel })
            .then((data) => {
              this.getReqDo({ ...data })
            })
        }
        else {
          this.getReqDo(params)
        }
      }, 100)()
    })
  }

  getRequestParams() {
    return this.requestParams.value
      ? this.requestParams.value
      : this.requestParams
  }

  post() {
    this.postResponse = {
      code: 1000,
      message: 'success',
    }
  }

  delete(id: number | string) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete(`${this.getApiOfReqMode('delete')}?id=${[id]}`)
        .then((response: any) => {
          const { success } = response
          if (success)
            resolve(true)
          else
            reject(new Error('fail'))
        })
    })
  }
}
