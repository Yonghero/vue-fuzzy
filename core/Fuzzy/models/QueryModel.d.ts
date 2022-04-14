import type { Ref } from 'vue';
import type { Feature, FuzzyBaseModel, Templates } from '../types';
import type { RequestFuzzy } from './RequestFuzzy';
import type { PagingModel } from '.';
declare class QueryModel implements FuzzyBaseModel<Templates> {
    data: any;
    model: Ref<Record<string, any>>;
    config: Templates[];
    pagingModel: Ref<PagingModel>;
    feature: Feature;
    requestFuzzy: any;
    constructor(getFieldOfTmpl: any, requestFuzzy: Ref<RequestFuzzy>, pagingModel: Ref<PagingModel>);
    /**
     * 根据配置映射query区域的展示项
     */
    mapDataAccordConfig(): void;
    /**
     * 初始化query_form的模型
     */
    initModel(): void;
    handleEvent(data: any): void;
}
export { QueryModel, };
