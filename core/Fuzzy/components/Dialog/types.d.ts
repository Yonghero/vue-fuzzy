interface FuzzyDialogHandler {
  onCancel?: () => any
  onConfirm?: (emitClose: () => any) => any
}
interface DialogStyle {
  width?: string | number
  top?: string
  isCustomFooter?: boolean
}
export type { FuzzyDialogHandler, DialogStyle }
