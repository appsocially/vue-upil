import { schema, Event } from '@appsocially/userpil-core'
export const EVENT_NAMES = Event.EVENT_NAMES
export const NODE_TYPES = schema.enums.NODE_TYPES

export const consume = Symbol('consume')
export const state = Symbol('state')
