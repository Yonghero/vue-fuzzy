import type { RequestProvider, Response } from '../../types/requestProvider'

/**
 * 联图请求提供器
 */
export interface LTResponse {
  code: number
  message: string
  data: any
  total: number
  size: number
  page: number
}

export class DefaultRequestProvider implements RequestProvider {
  _instance: any

  constructor(instance: any) {
    this._instance = instance
  }

  delete(url: string, params: any): Promise<any> {
    return Promise.resolve(undefined)
  }

  get(url: string, params: any): Promise<Required<Response>> {
    return this._instance.get(
      url,
      { params: { size: 10, current: 1, ...params } },
    )
      .then(res => this.implResponse(res.data))
  }

  post(url: string, params: any): Promise<any> {
    return Promise.resolve(undefined)
  }

  implResponse(response: LTResponse): Response {
    return {
      data: response.data,
      message: response.message,
      total: response.total,
      size: response.size,
      success: response.code === 10000,
    }
  }
}
