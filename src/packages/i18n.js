import I18n from 'i18n-js'
import * as RNLocalize from 'react-native-localize'
import { I18nManager } from 'react-native'
import tr from '../constants/lang/tr'
import en from '../constants/lang/en'
import { useSelector, useDispatch, connect } from 'react-redux'
const locales = RNLocalize.getLocales()
I18n.locale = locales[0].languageTag
export const isRtl = locales[0].isRTL
I18nManager.forceRTL(isRtl)
I18n.fallbacks = true
I18n.locales.no = 'en'
I18n.translations = {
  en,
  tr
}

export const text = (key) => {
  const state = useSelector((state) => state.site)
  return I18n.t(key, { locale: state.lang })
}

export const getCurrentLanguage = () => {
  const state = useSelector((state) => state.site)
  return state.lang
}
