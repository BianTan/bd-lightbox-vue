import { ObjectDirective, DirectiveBinding } from 'vue'
import LightboxReplace from './LighboxReplace'
import { OptionProps } from '../types'

export default {
  mounted(el: HTMLElement, binding = { value: undefined } as DirectiveBinding) {
    const _ops: OptionProps | undefined = binding.value
    new LightboxReplace(el, _ops)
  }
} as ObjectDirective
