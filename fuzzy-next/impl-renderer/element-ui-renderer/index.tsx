
import type { Renderer } from '../../types'
import { ElementUIButton } from './ElementUIButton'
import { ElementUIForm } from './ElementUIForm'
import { ElementUITable } from './ElementUITable'

export function ElementUIRenderer(): Renderer {
  return {
    button: new ElementUIButton(),
    table: new ElementUITable(),
    form: new ElementUIForm(),
  }
}
