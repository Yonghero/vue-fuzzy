import type { UnwrapNestedRefs, WritableComputedRef } from 'vue';
import type { AllModels, Api } from '../types';
interface Request<g, p, d> {
    api: string | Api;
    get: (params: object) => g;
    post: () => p;
    delete: (param: any) => d;
}
export declare class RequestFuzzy implements Request<any, any, any> {
    api: string | Api;
    postResponse: any;
    deleteResponse: any;
    allModels: UnwrapNestedRefs<AllModels>;
    requestParams: WritableComputedRef<Record<string, any>>;
    axiosInstance: import("axios").AxiosInstance;
    constructor(getFieldOfTmpl: any, allModels: UnwrapNestedRefs<AllModels>);
    /**
     * 初始化get请求参数
     */
    initRequestParams(): void;
    /**
     * 返回对应请求的url
     * @param mode Api
     * @returns
     */
    getApiOfReqMode(mode: keyof Api): string;
    /**
     * get request to do
     */
    private getReqDo;
    get(params?: object): Promise<void>;
    getRequestParams(): Record<string, any>;
    post(): void;
    delete(id: number | string): Promise<unknown>;
}
export {};
