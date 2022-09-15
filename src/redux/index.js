import { configureStore } from '@reduxjs/toolkit'
import siteReducer from './site'
import themeReducer from './theme'
import languageReducer from './language'

export default configureStore({
  reducer: {
    site: siteReducer,
    theme: themeReducer,
    language: languageReducer
  }
})
