import ChatMode from '@/components/ChatMode'
import { EVENT_NAMES, NODE_TYPES, consume, state } from './enums'
import TextBubble from '@/components/ChatMode/components/TextBubble'
import CurrentMultiSelect from '@/components/ChatMode/overrides/Current_MultiSelect'
import CurrentSelect from '@/components/ChatMode/overrides/Current_Select'
import CurrentTemplate from '@/components/ChatMode/overrides/Current_Template'
import { substituteNodeText } from '@/utils'
import FormMode from '@/components/FormMode'

const ChatBot = {
  ChatMode,
  TextBubble,
  overrides: {
    CurrentMultiSelect,
    CurrentSelect,
    CurrentTemplate
  }
}

export {
  EVENT_NAMES,
  NODE_TYPES,
  consume,
  state,
  ChatBot,
  substituteNodeText,
  FormMode
}
