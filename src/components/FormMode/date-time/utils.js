import { formatISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'

export const formatAsDate = (date) =>
  formatISO(date, { representation: 'date' })

const formatStringDateTime = 'yyyy年MM月dd日(EEEEE) @ HH:mm'
export const formatTextbox = (date) =>
  format(date, formatStringDateTime, {
    locale: ja,
  })
