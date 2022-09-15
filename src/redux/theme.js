import { createSlice } from '@reduxjs/toolkit'
import { defaultState } from '../constants/data/default-state'

export const theme = createSlice({
  name: 'theme',
  initialState: {
    dark: false
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.dark = action.payload
    }
  }
})

export const { setDarkMode } = theme.actions

export default theme.reducer
