import type { Ref } from 'vue';
import type { Feature, FuzzyHandler, Templates } from '../types';
import type { RequestFuzzy } from '../utils';
interface TableInterface {
    tableLoading: Ref<boolean>;
}
declare class TableModel implements TableInterface {
    config: Templates[];
    data: Templates[];
    model: Ref<Array<keyof Templates>>;
    tableOperation: any;
    requestFuzzy: any;
    feature: Feature;
    multipleSelection: any;
    tableLoading: Ref<boolean>;
    handler: FuzzyHandler;
    constructor(getFieldOfTmpl: any, requestFuzzy: Ref<RequestFuzzy>);
    /**
     * 映射表头展示的数据
     */
    mapDataAccordConfig(): void;
    /**
     * 初始化表格数据
     */
    initModel(): void;
    handleEvent(): void;
}
export { TableModel, };
