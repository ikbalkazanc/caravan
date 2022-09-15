import { configureStore } from '@reduxjs/toolkit'
import siteReducer from './site'
import themeReducer from './theme'

export default configureStore({
  reducer: {
    site: siteReducer,
    theme: themeReducer
  }
})
