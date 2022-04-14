import type { Ref, UnwrapNestedRefs } from 'vue';
import type { FuzzyBaseModel, Pagination } from '../types';
import type { RequestFuzzy } from '.';
declare class PagingModel implements FuzzyBaseModel<any> {
    config: Pagination;
    model: UnwrapNestedRefs<any>;
    size: number;
    requestFuzzy: any;
    constructor(getFieldOfTmpl: any, requestFuzzy: Ref<RequestFuzzy>);
    initModel(): void;
    handleEvent(currentSize: number, data?: {}): void;
}
export { PagingModel, };
