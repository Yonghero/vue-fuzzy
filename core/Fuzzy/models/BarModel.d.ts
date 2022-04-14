import type { Ref } from 'vue';
import type { FuzzyBaseModel, TemplateConfiguration } from '../types';
interface tabItem {
    label?: string;
    value?: string;
    onClick?: () => void;
}
declare class BarModel implements FuzzyBaseModel<tabItem> {
    config: TemplateConfiguration;
    data: Ref<tabItem[]>;
    activeIndex: Ref<number>;
    activeTitle: Ref<string | undefined>;
    constructor(config: TemplateConfiguration);
    /**
     * 根据配置文件更新顶部栏的初始配置
     * @param config
     * @returns
     */
    mapDataAccordConfig(): void;
    mapTitle(): void;
    handleEvent(): void;
    render(): JSX.Element;
}
export { BarModel, };
