export interface RequestProvider {
  get: (url: string, params?: any) => Promise<Required<Response>>
  post: (url: string, params?: any) => Promise<Pick<Response, 'message' | 'success' | 'data'>>
  delete: (url: string, params?: any) => Promise<Pick<Response, 'success' | 'message'>>
  implResponse(response: any): Response
}

export interface Response {
  data: any
  message: string
  total: number
  size: number
  success: boolean
}

export interface RequestCallback {
  get(params: Record<string, any>): Promise<Required<Response>>
  delete(params: Record<string, any>): Promise<Pick<Response, 'success' | 'message'>>
  urls: {
    filter: string
    update: string
    delete: string
    create: string
  }
}
