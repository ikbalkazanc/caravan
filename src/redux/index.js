import { configureStore } from '@reduxjs/toolkit'
import siteReducer from './site'

export default configureStore({
  reducer: {
    site: siteReducer
  }
})
