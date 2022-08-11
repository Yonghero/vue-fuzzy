import type { Api, OptionsConfiguration } from '../../types'
import type { RequestCallback, RequestProvider } from '../../types/requestProvider'

/**
 * 创建请求模块
 */
export function createRequest(options: OptionsConfiguration<any>, request: RequestProvider): RequestCallback {
  const filterParams = ref({})

  const getApiOfMode = (mode: keyof Api) => {
    if (typeof options.api === 'string') return options.api
    return options.api[mode]
  }

  return {
    get: (params) => {
      filterParams.value = { ...filterParams.value, ...params }
      console.log(filterParams.value, 'filter')
      return request.get(getApiOfMode('filter'), filterParams.value)
    },
  }
}
