import type { UnwrapNestedRefs, WritableComputedRef } from 'vue'
import { watchEffect } from 'vue'
import _ from 'lodash'
import type { AllModels, Api, QueryMode, Templates } from '../types'
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
  deleteResponse: any
  allModels: UnwrapNestedRefs<AllModels>
  // 缓存请求参数
  requestParams!: WritableComputedRef<Record<string, any>>
  queryMode: QueryMode
  axiosInstance

  constructor(getFieldOfTmpl: any, allModels: UnwrapNestedRefs<AllModels>) {
    this.axiosInstance = getRequest()
    this.api = getFieldOfTmpl('api')
    this.queryMode = getFieldOfTmpl('queryMode')
    this.allModels = allModels
    this.initRequestParams()
    // getData
    this.get({}).then()
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
    console.log('this.queryMode: ', this.queryMode)
    if (this.queryMode === 'advanced') {
      requestConfig.paramsSerializer = (params: any) => {
        let str = ''
        for (const temp of queryModel.data) {
          const { queryOperator } = temp as Templates
          for (const key of Object.keys(params)) {
            // 分页参数安装简单查询处理
            if (key === 'size' || key === 'current')
              str += `${key}=${params[key]}&`

            else
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
        this.getReqDo(params)
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
