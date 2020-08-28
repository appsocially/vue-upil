import { formatISO, format } from 'date-fns'
import { ja, enUS } from 'date-fns/locale'

const locales = {
  ja,
  en: enUS,
}

export const formatAsDate = (date) =>
  formatISO(date, { representation: 'date' })

const formatString = 'yyyy-MM-dd (eee)'
export const formatTextbox = (date, locale = 'en') =>
  format(date, formatString, { locale: locales[locale] })
