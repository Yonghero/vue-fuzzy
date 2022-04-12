import type { Component } from 'vue'
import { markRaw } from 'vue'
import { ElCascader, ElDatePicker, ElInput, ElRadio, ElSwitch } from 'element-plus'
import { FormItemEnum } from '../types'

const Components: Record<string, Component> = {
  [FormItemEnum.input]: ElInput,
  [FormItemEnum.switch]: ElSwitch,
  [FormItemEnum.radio]: ElRadio,
  [FormItemEnum.datePicker]: ElDatePicker,
  [FormItemEnum.datePickerRange]: ElDatePicker,
  [FormItemEnum.cascader]: ElCascader,
}
function filterCompOfType(type: FormItemEnum): Component {
  return markRaw(Components[type])
}

export {
  filterCompOfType,
}
