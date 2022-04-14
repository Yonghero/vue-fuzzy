import type { Ref } from 'vue';
import type { DialogChanageable, DialogStyle, FuzzyDialogHandler, FuzzyHandler, RenderDialog } from '../types';
import type { RequestFuzzy } from '../models/RequestFuzzy';
export declare function useFuzzyDialog(props: {
    handler: FuzzyHandler | undefined;
    renderDialog: RenderDialog | undefined;
    requestFuzzyRef: Ref<RequestFuzzy>;
    style: DialogStyle | Array<DialogStyle> | undefined;
}): {
    DialogRender: any;
    dialogVisible: any;
    dialogTitle: any;
    dialogHandler: FuzzyDialogHandler;
    dialogStyle: any;
    dialogChangeable: ({ text, data, current }: DialogChanageable) => void;
};
