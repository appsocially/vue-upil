import { formatISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'

export const formatAsDate = (date) =>
  formatISO(date, { representation: 'date' })

const formatString = 'yyyy年MM月dd日(EEEEE)'
export const formatTextbox = (date) =>
  format(date, formatString, { locale: ja })
