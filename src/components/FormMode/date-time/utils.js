import { formatISO, format } from 'date-fns'
import { ja, enUS } from 'date-fns/locale'

const locales = {
  ja,
  en: enUS,
}

export const formatAsDate = (date) =>
  formatISO(date, { representation: 'date' })

const formatStringDateTime = 'yyyy-MM-dd (eee) @ HH:mm'
export const formatTextbox = (date, locale = 'en') =>
  format(date, formatStringDateTime, {
    locale: locales[locale],
  })
