import ChatMode from '@/components/ChatMode'
import { EVENT_NAMES, NODE_TYPES, consume, state } from './enums'
import TextBubble from '@/components/ChatMode/components/TextBubble'
import CurrentMultiSelect from '@/components/ChatMode/overrides/Current_MultiSelect'
import CurrentSelect from '@/components/ChatMode/overrides/Current_Select'
import CurrentTemplate from '@/components/ChatMode/overrides/Current_Template'
import { substituteNodeText, setupListeners } from '@/utils'
import FormMode from '@/components/FormMode'
import textInputMixin from '@/components/FormMode/text-input-mixin'
import WizardMode from '@/components/WizardMode'
import widgeti18nMixin from '@/components/widgeti18nMixin'
import formmodeWrapperMixin from '@/components/ChatMode/overrides/formmodeWrapperMixin'

const ChatBot = {
  ChatMode,
  TextBubble,
  overrides: {
    CurrentMultiSelect,
    CurrentSelect,
    CurrentTemplate,
  },
}

export {
  EVENT_NAMES,
  NODE_TYPES,
  consume,
  state,
  ChatBot,
  substituteNodeText,
  setupListeners,
  FormMode,
  WizardMode,
  widgeti18nMixin,
  textInputMixin,
  formmodeWrapperMixin,
}
